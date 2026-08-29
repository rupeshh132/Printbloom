"use client"
import * as React from "react"
import { useCart } from "@/store/use-cart"
import { useUIStore } from "@/store/use-ui-store"

type AddToCartProps = {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
  customizationData?: any[]
}

export function AddToCartButton({ product, customizationData = [] }: AddToCartProps) {
  const { addItem } = useCart()
  const { openCartDrawer } = useUIStore()

  const handleAdd = () => {
    // Basic validation: require at least one uploaded photo if customizing
    if (customizationData.length === 0) {
      alert("Please upload at least one photo before adding to cart.")
      return
    }

    // Check if any uploads are still pending
    const isStillUploading = customizationData.some(photo => photo.isUploading)
    if (isStillUploading) {
      alert("Please wait for all photos to finish uploading to Cloudinary.")
      return
    }

    // Clean up the data to just store URLs and captions for the cart
    const cleanedCustomization = customizationData.map(photo => ({
      cloudinaryUrl: photo.cloudinaryUrl,
      caption: photo.caption
    }))

    // Use a unique cart item ID so we can have multiple of the same product with different photos
    const cartItemId = `${product.id}-${Date.now()}`

    addItem({
      id: cartItemId,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      customization_data: cleanedCustomization
    })
    
    openCartDrawer()
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-transparent border border-[#221F1C] text-[#221F1C] py-4 rounded-full font-medium hover:bg-[#F5F0E8] transition-colors"
    >
      Add To Cart
    </button>
  )
}
