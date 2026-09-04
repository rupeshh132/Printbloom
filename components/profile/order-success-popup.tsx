"use client"
import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2, X } from "lucide-react"

export function OrderSuccessPopup() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (searchParams.get("order_success") === "true") {
      setVisible(true)
      // Clean the URL without triggering a reload
      const url = new URL(window.location.href)
      url.searchParams.delete("order_success")
      window.history.replaceState({}, "", url.toString())
    }
  }, [searchParams])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Modal */}
      <div className="relative bg-[#FBF6EE] border border-[#E0D9CF] rounded-sm shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center animate-[fadeInUp_0.35s_ease-out]">
        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-[#9A8F85] hover:text-[#221F1C] transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#4B6B4F]/10 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#4B6B4F]" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-2xl text-[#221F1C] mb-2">
          Order Confirmed!
        </h2>

        {/* Subheading */}
        <p className="text-sm text-[#6D635B] leading-relaxed mb-6">
          Thank you for your purchase. Your order has been successfully placed and is now being reviewed by our team.
          <br /><br />
          A PrintBloom representative will reach out to you shortly to confirm the details and begin crafting your order.
        </p>

        {/* Divider */}
        <div className="w-full border-t border-[#E0D9CF] mb-6" />

        {/* CTA */}
        <button
          onClick={() => setVisible(false)}
          className="w-full bg-[#221F1C] text-white py-3 rounded-sm text-sm font-medium hover:bg-black transition-colors"
        >
          View My Orders
        </button>

        {/* Footer note */}
        <p className="text-[10px] text-[#9A8F85] mt-4 italic">
          You can track your order status anytime from your profile.
        </p>
      </div>
    </div>
  )
}
