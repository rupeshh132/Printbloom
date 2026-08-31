import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderDetails
    } = await request.json();

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Create an admin client to bypass RLS for inserting orders securely
      const supabaseAdmin = await createSupabaseServerClient();
      
      let insertData: any = {
        user_id: orderDetails.userId,
        total_amount: orderDetails.amount,
        status: 'processing'
      };
      if (orderDetails.addressId) {
        insertData.shipping_address_id = orderDetails.addressId;
      }
      
      // Try with payment_id first
      let { data, error } = await supabaseAdmin
        .from('orders')
        .insert({ ...insertData, payment_id: razorpay_payment_id })
        .select()
        .single();
        
      if (error) {
        // If error is about payment_id column not existing, try without it
        if (error.message.includes('payment_id')) {
           const res = await supabaseAdmin.from('orders').insert(insertData).select().single();
           data = res.data;
           error = res.error;
        }
      }

      if (error) {
        console.error("Supabase insert order error:", error);
        return NextResponse.json({ success: false, message: "DB Error: " + error.message }, { status: 500 });
      }

      // Insert order items
      if (orderDetails.items && orderDetails.items.length > 0) {
        let orderItems = orderDetails.items.map((item: any) => ({
          order_id: data.id,
          product_id: item.productId.split('-')[0], // Extract actual ID
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
          customization_data: item.customization_data || []
        }));

        let res = await supabaseAdmin.from('order_items').insert(orderItems);
        
        if (res.error) {
          console.error("Critical error inserting order items:", res.error);
        }
      }

      return NextResponse.json({ success: true, message: "Payment verified successfully", orderId: data.id });
    } else {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
