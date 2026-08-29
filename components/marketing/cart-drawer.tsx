"use client"
import * as React from "react"
import { useUIStore } from "@/store/use-ui-store"
import { useCart } from "@/store/use-cart"
import { X, Trash2, ShoppingBag } from "lucide-react"
import NextLink from "next/link"
import Image from "next/image"

export function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore()
  const { items, removeItem, updateQuantity, getCartTotal } = useCart()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || !isCartDrawerOpen) return null

  const total = getCartTotal()

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={closeCartDrawer} 
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E0D9CF]">
          <h2 className="font-serif text-2xl text-[#221F1C] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button onClick={closeCartDrawer} className="text-[#9A8F85] hover:text-[#C1502E] p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-[#F5F0E8] rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-[#9A8F85]" />
              </div>
              <p className="font-serif text-xl text-[#221F1C] mb-2">Your cart is empty</p>
              <p className="text-[#6B6259] text-sm mb-8">Looks like you haven't added anything yet.</p>
              <NextLink 
                href="/products" 
                onClick={closeCartDrawer}
                className="bg-[#221F1C] text-white px-8 py-3 text-sm font-medium hover:bg-[#C1502E] transition-colors"
              >
                Start Shopping
              </NextLink>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-[#F5F0E8] rounded-sm relative overflow-hidden border border-[#E0D9CF]">
                    {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-[#221F1C] text-sm">{item.name}</h3>
                        {item.variant && <p className="text-xs text-[#6B6259] mt-0.5">{item.variant}</p>}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-[#9A8F85] hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center border border-[#E0D9CF] rounded-sm">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-[#6B6259] hover:bg-[#F5F0E8]">-</button>
                        <span className="px-3 py-1 text-xs font-medium border-x border-[#E0D9CF]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-[#6B6259] hover:bg-[#F5F0E8]">+</button>
                      </div>
                      <span className="font-mono text-sm font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E0D9CF] p-6 bg-[#FBF6EE]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#6B6259]">Subtotal</span>
              <span className="font-serif text-xl">₹{total}</span>
            </div>
            <p className="text-xs text-[#9A8F85] mb-6">Shipping and taxes calculated at checkout.</p>
            <NextLink 
              href="/cart"
              onClick={closeCartDrawer}
              className="block w-full bg-[#C1502E] text-white text-center py-4 font-medium hover:bg-[#A5411F] transition-colors shadow-sm"
            >
              Proceed to Checkout
            </NextLink>
          </div>
        )}

      </div>
    </div>
  )
}
