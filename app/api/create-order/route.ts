import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: Request) {
  try {
    const { items, addressId, appliedPromo, pointsToRedeem = 0 } = await request.json();
    
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Calculate Server-Side Amount
    const { getProducts } = await import("@/app/actions/products");
    const products = await getProducts();

    let total = 0;
    for (const item of items) {
      const dbProduct = products.find((p: any) => 
        p.id === item.productId || 
        p.slug === item.productId ||
        (p.id && item.productId.startsWith(p.id)) ||
        (p.slug && item.productId.startsWith(p.slug))
      );
      if (!dbProduct) {
        console.error("Product match failed for ID:", item.productId);
        return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 400 });
      }
      
      let parsedPrice = 0;
      const { productVariantsMap } = await import("@/lib/pricing");
      const variants = productVariantsMap[dbProduct.slug];
      
      if (variants && item.variant) {
        const matchedVariant = variants.find(v => v.label === item.variant);
        if (matchedVariant) {
          parsedPrice = matchedVariant.price;
        }
      }
      
      if (!parsedPrice) {
        const priceMatch = dbProduct.starting_price_label?.match(/[\d,]+\.?\d*/);
        parsedPrice = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, "")) : 0;
      }
      
      total += parsedPrice * item.quantity;
    }

    // Dynamic Delivery Fee
    const hasOnlyDigitalItems = items.length > 0 && items.every((item: any) => {
      const dbProduct = products.find((p: any) => 
        p.id === item.productId || 
        p.slug === item.productId ||
        (p.id && item.productId.startsWith(p.id)) ||
        (p.slug && item.productId.startsWith(p.slug))
      );
      return dbProduct?.is_digital === true;
    });
    const deliveryFee = hasOnlyDigitalItems ? 0 : 90;

    // Maximum Discount Ceiling (based purely on product subtotal)
    let maxAllowedDiscount = 50;
    if (total >= 1000) {
      maxAllowedDiscount = 150;
    } else if (total >= 500) {
      maxAllowedDiscount = 100;
    }

    // Mutually Exclusive Fallback Logic
    // If client bypassed UI and sent both, prioritize points and ignore promo
    let activePromo = appliedPromo;
    if (pointsToRedeem > 0 && appliedPromo) {
      activePromo = null;
    }

    // Promo Logic
    let discountAmount = 0;
    if (activePromo) {
      const { validatePromoCode } = await import("@/app/actions/promo-codes");
      const res = await validatePromoCode(activePromo);
      if (!res.error) {
        if (res.discount_type === 'percentage') {
          discountAmount = (total * res.discount_value) / 100;
        } else {
          discountAmount = res.discount_value;
        }
        // Apply ceiling to promo code
        discountAmount = Math.min(discountAmount, maxAllowedDiscount);
      }
    }

    // Points Logic (Secure server-side validation)
    let validatedPointsToRedeem = 0;
    if (pointsToRedeem > 0) {
      const { data: pointsData } = await supabase
        .from('reward_points')
        .select('points, transaction_type')
        .eq('user_id', user.id);
        
      if (pointsData) {
        const availableBalance = pointsData.reduce((acc: number, curr: any) => {
          if (curr.transaction_type === 'earned' || curr.transaction_type === 'refunded') return acc + curr.points;
          if (curr.transaction_type === 'redeemed') return acc - curr.points;
          return acc;
        }, 0);
        // Apply ceiling to reward points (instead of allowing it to consume delivery fee)
        const maxRedeemable = Math.min(availableBalance, maxAllowedDiscount);
        validatedPointsToRedeem = pointsToRedeem > maxRedeemable ? maxRedeemable : pointsToRedeem;
      }
    }

    const orderTotal = Math.max(0, total + deliveryFee - discountAmount - validatedPointsToRedeem);

    // 2. Create Razorpay Order
    const options = {
      amount: Math.round(orderTotal * 100), // Amount in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    };

    const razorpayOrder = await razorpay.orders.create(options);
    
    // 3. Insert Pending Order into DB
    let insertData: any = {
      user_id: user.id,
      total_amount: orderTotal,
      status: 'processing',
      payment_status: 'pending',
      razorpay_order_id: razorpayOrder.id,
      points_used: validatedPointsToRedeem
    };
    if (addressId) {
      insertData.shipping_address_id = addressId;
    }
    if (activePromo) {
      insertData.applied_promo = activePromo;
    }

    const { data: dbOrder, error: orderError } = await supabase
      .from('orders')
      .insert(insertData)
      .select()
      .single();

    if (orderError) throw new Error("Failed to insert pending order");

    // 4. Insert Order Items
    if (items && items.length > 0) {
      const { productVariantsMap } = await import("@/lib/pricing");
      
      let orderItems = items.map((item: any) => {
        const dbProduct = products.find((p: any) => 
          p.id === item.productId || 
          p.slug === item.productId ||
          (p.id && item.productId.startsWith(p.id)) ||
          (p.slug && item.productId.startsWith(p.slug))
        );
        
        let parsedPrice = 0;
        const variants = productVariantsMap[dbProduct?.slug];
        
        if (variants && item.variant) {
          const matchedVariant = variants.find((v: any) => v.label === item.variant);
          if (matchedVariant) {
            parsedPrice = matchedVariant.price;
          }
        }
        
        if (!parsedPrice) {
          const priceMatch = dbProduct?.starting_price_label?.match(/[\d,]+\.?\d*/);
          parsedPrice = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, "")) : 0;
        }
        
        return {
          order_id: dbOrder.id,
          product_id: dbProduct ? dbProduct.id : item.productId,
          product_name: item.variant && item.variant !== 'Default' ? `${item.name} — ${item.variant}` : item.name,
          quantity: item.quantity,
          price: parsedPrice, // Securely extracted price
          customization_data: item.customization_data || []
        };
      });

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw new Error("Failed to insert order items");
    }

    return NextResponse.json(razorpayOrder);
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
