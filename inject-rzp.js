const fs = require('fs');

let code = fs.readFileSync('app/cart/page.tsx', 'utf8');

// Add import if not present
if (!code.includes('useRouter')) {
  code = code.replace('import NextLink from "next/link"', 'import NextLink from "next/link"\nimport { useRouter } from "next/navigation"');
}

const insertPoint = 'const supabase = createSupabaseBrowserClient()';
const paymentLogic = `
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    if (!selectedAddressId) {
      alert("Please select an address before paying");
      setCurrentStep("address");
      return;
    }

    try {
      setIsProcessing(true);
      const deliveryFee = total > 999 ? 0 : 150;
      const orderTotal = total + deliveryFee;

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: orderTotal })
      });
      const orderData = await orderRes.json();
      
      if (!orderData.id) throw new Error("Could not create Razorpay order");

      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) {
        alert("Please login first");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PrintBloom",
        description: "Your Order",
        image: "/logo.png",
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderDetails: {
                  userId: user.id,
                  amount: orderTotal,
                  items: items
                }
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              useCart.getState().clearCart();
              router.push("/profile?tab=orders");
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            alert("Error verifying payment");
          }
        },
        prefill: { email: user.email, contact: "" },
        theme: { color: "#221F1C" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Failed to initiate checkout");
    } finally {
      setIsProcessing(false);
    }
  }
`;

if (!code.includes('handlePayment = async ()')) {
  code = code.replace(insertPoint, insertPoint + '\n' + paymentLogic);
}

const btnNew = `<button 
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="w-full bg-[#221F1C] text-white py-4 rounded-full font-medium hover:bg-black transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : "Pay Now"}
                  </button>`;

code = code.replace(/<button[^>]*>\s*Pay Now\s*<\/button>/m, btnNew);

fs.writeFileSync('app/cart/page.tsx', code);
console.log('Success injected Razorpay');
