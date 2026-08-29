"use client"
import * as React from "react"
import { Heart } from "lucide-react"
import { toggleWishlist } from "@/app/actions/wishlist"

interface WishlistButtonProps {
  productSlug: string
  productName: string
  productImageUrl: string
  productPrice: number
  initialStatus: boolean
}

export function WishlistButton({ productSlug, productName, productImageUrl, productPrice, initialStatus }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(initialStatus)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      const result = await toggleWishlist(productSlug, productName, productImageUrl, productPrice)
      if (result.error) {
        alert(result.error)
      } else {
        setIsWishlisted(result.isWishlisted!)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button 
      onClick={handleToggle}
      disabled={isLoading}
      className={`flex items-center justify-center w-14 h-14 rounded-full border transition-all ${
        isWishlisted 
          ? "border-[#C1502E] bg-[#C1502E]/10 text-[#C1502E]" 
          : "border-[#E0D9CF] text-[#9A8F85] hover:border-[#221F1C] hover:text-[#221F1C] bg-white"
      } disabled:opacity-50`}
      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
    </button>
  )
}
