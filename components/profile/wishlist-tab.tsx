"use client"
import * as React from "react"
import Image from "next/image"
import NextLink from "next/link"
import { Trash2, Heart, ArrowRight } from "lucide-react"
import { toggleWishlist } from "@/app/actions/wishlist"

export function WishlistTab({ items }: { items: any[] }) {
  const [wishlistItems, setWishlistItems] = React.useState(items)

  // Sync state when props change (e.g. returning from product page after adding)
  React.useEffect(() => {
    setWishlistItems(items)
  }, [items])

  const handleRemove = async (slug: string) => {
    try {
      setWishlistItems(prev => prev.filter(item => item.product_slug !== slug))
      await toggleWishlist(slug, "", "", 0)
    } catch (e) {
      console.error(e)
      alert("Failed to remove from wishlist")
      // Revert if failed
      setWishlistItems(items)
    }
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center h-full border border-[#E0D9CF] border-dashed rounded-xl bg-[#FBF6EE]">
        <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center text-[#9A8F85] mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-medium text-[#221F1C] mb-2">Your wishlist is empty</h3>
        <p className="text-[#6B6259] mb-6 max-w-md">Save the items you love and come back to them later when you're ready to buy.</p>
        <NextLink href="/products" className="px-6 py-3 bg-[#221F1C] text-white rounded-full font-medium hover:bg-black transition-colors flex items-center gap-2">
          Explore Products <ArrowRight className="w-4 h-4" />
        </NextLink>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-medium text-[#221F1C] mb-6">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="group border border-[#E0D9CF] rounded-sm overflow-hidden bg-white hover:shadow-md transition-shadow relative">
            
            {/* Remove Button */}
            <button 
              onClick={() => handleRemove(item.product_slug)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-colors"
              title="Remove from Wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <NextLink href={`/products/${item.product_slug}`}>
              <div className="relative aspect-square overflow-hidden bg-[#FBF6EE]">
                <Image 
                  src={item.product_image_url || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3"} 
                  alt={item.product_name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-[#221F1C] truncate">{item.product_name}</h3>
                <p className="text-[#DFBC94] font-medium mt-1">₹{item.product_price}</p>
              </div>
            </NextLink>
            
            <div className="px-4 pb-4">
              <NextLink 
                href={`/products/${item.product_slug}`}
                className="block w-full py-2.5 text-center border border-[#221F1C] text-[#221F1C] font-medium rounded-full hover:bg-[#221F1C] hover:text-white transition-colors text-sm"
              >
                View Product
              </NextLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
