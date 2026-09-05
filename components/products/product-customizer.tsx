"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/store/use-cart"
import { PhotoUploader, UploadedPhoto } from "./photo-uploader"
import { AddToCartButton } from "./add-to-cart-button"
import { WishlistButton } from "./wishlist-button"
import { productVariantsMap, ProductVariant } from "@/lib/pricing"

export function ProductCustomizer({ product, slug, isWishlisted }: { product: any, slug: string, isWishlisted: boolean }) {
  const [photos, setPhotos] = React.useState<UploadedPhoto[]>([])
  const router = useRouter()
  const { addItem } = useCart()
  
  // Variants
  const variants = productVariantsMap[slug] || [{ label: "Default", price: product.starting_price || 999 }]
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant>(variants[0])

  const handleBuyNow = () => {
    // Basic validation
    if (photos.length === 0) {
      alert("Please upload at least one photo before buying.")
      return
    }

    const isStillUploading = photos.some(photo => photo.isUploading)
    if (isStillUploading) {
      alert("Please wait for all photos to finish uploading.")
      return
    }

    const cleanedCustomization = photos.map(photo => ({
      cloudinaryUrl: photo.cloudinaryUrl,
      caption: photo.caption
    }))

    const cartItemId = `${product.id}-${selectedVariant.label}-${Date.now()}`

    addItem({
      id: cartItemId,
      productId: `${product.id}-${selectedVariant.label}`,
      name: product.name,
      price: selectedVariant.price,
      quantity: 1,
      image: product.main_image_url,
      is_digital: product.is_digital,
      variant: selectedVariant.label,
      customization_data: cleanedCustomization
    })
    
    // Redirect directly to cart for faster checkout
    router.push("/cart")
  }

  return (
    <div className="flex flex-col mb-10 w-full">
      {/* Price Display */}
      <div className="mb-6">
        <span className="text-2xl font-medium text-[#221F1C]">₹{selectedVariant.price}</span>
        <p className="text-sm text-[#9A8F85] mt-1">Incl. of all taxes</p>
      </div>

      {/* Variant Selector */}
      {variants.length > 1 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#221F1C] mb-2">Select Option</label>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.label}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
                  selectedVariant.label === variant.label 
                    ? 'border-[#DFBC94] bg-[#DFBC94]/10 text-[#221F1C] font-medium' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {variant.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Photo Uploader Engine */}
      <PhotoUploader onPhotosChange={setPhotos} />

      {/* Actions */}
      <div className="flex gap-3 w-full mt-4">
        <div className="flex-1">
          <AddToCartButton 
            product={{
              id: `${product.id}-${selectedVariant.label}`,
              name: product.name,
              price: selectedVariant.price,
              image: product.main_image_url,
              variant: selectedVariant.label
            }}
            customizationData={photos}
          />
        </div>
        <button 
          onClick={handleBuyNow}
          className="flex-1 bg-[#221F1C] text-white py-4 rounded-full font-medium hover:bg-black transition-colors"
        >
          Buy Now
        </button>
        <WishlistButton 
          productSlug={slug}
          productName={product.name}
          productImageUrl={product.main_image_url}
          productPrice={selectedVariant.price}
          initialStatus={isWishlisted}
        />
      </div>
    </div>
  )
}
