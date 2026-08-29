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
}

export function AddToCartButton({ product }: AddToCartProps) {
  const { addItem } = useCart()
  const { openCartDrawer } = useUIStore()

  const handleAdd = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
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
