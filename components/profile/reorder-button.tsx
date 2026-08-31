"use client"

import { RefreshCw } from "lucide-react"
import { useCart } from "@/store/use-cart"
import { useRouter } from "next/navigation"

export function ReorderButton({ orderItems }: { orderItems: any[] }) {
  const { addItem } = useCart()
  const router = useRouter()

  const handleReorder = () => {
    // Add all items from the past order into the cart
    if (!orderItems || orderItems.length === 0) return

    orderItems.forEach(item => {
      addItem({
        id: `${item.product_id}-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        productId: item.product_id,
        name: item.product_name || item.product_id,
        price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image_url || "/images/placeholder.jpg",
        variant: item.variant_label || "Default",
        customization_data: item.customization_data || []
      })
    })

    // Redirect to cart
    router.push("/cart")
  }

  return (
    <button 
      onClick={handleReorder}
      className="w-full px-4 py-2 text-sm font-medium bg-[#221F1C] rounded-full text-white hover:bg-black transition-colors flex items-center justify-center gap-2"
    >
      <RefreshCw className="w-4 h-4" /> Re-order
    </button>
  )
}
