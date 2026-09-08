"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/store/use-cart"
import { PhotoUploader, UploadedPhoto } from "./photo-uploader"
import { AddToCartButton } from "./add-to-cart-button"
import { WishlistButton } from "./wishlist-button"
import { productVariantsMap, ProductVariant } from "@/lib/pricing"
import { getPhotoRequirements } from "@/lib/photo-requirements"
import { Info } from "lucide-react"

export function ProductCustomizer({ product, slug, isWishlisted }: { product: any, slug: string, isWishlisted: boolean }) {
  const [photos, setPhotos] = React.useState<UploadedPhoto[]>([])
  const router = useRouter()
  const { addItem } = useCart()
  
  // Variants
  const variants = productVariantsMap[slug] || [{ label: "Default", price: product.starting_price || 999 }]
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant>(variants[0])

  // Get photo requirements
  const photoReq = getPhotoRequirements(slug, selectedVariant.label)

  const handleBuyNow = () => {
    // Basic validation based on requirements
    if (photoReq.min > 0 && photos.length < photoReq.min) {
      alert(`Please upload at least ${photoReq.min} reference ${photoReq.min === 1 ? 'photo' : 'photos'} to book your order.`)
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

      {/* Partial Upload Notice */}
      {photoReq.min > 0 && (
        <div className="mb-6 p-4 bg-[#FBF6EE] border border-[#DFBC94] rounded-sm flex items-start gap-3 text-sm text-[#6B6259]">
          <Info className="w-5 h-5 text-[#DFBC94] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#221F1C] mb-1">
              Total photos required: {photoReq.totalText}
            </p>
            <p>
              To book your order quickly, you only need to upload <strong>{photoReq.min} reference {photoReq.min === 1 ? 'photo' : 'photos'}</strong> right now. You can send the rest of your photos to our team via WhatsApp after placing the order.
            </p>
          </div>
        </div>
      )}

      {/* Photo Uploader Engine */}
      <PhotoUploader onPhotosChange={setPhotos} maxText={photoReq.totalText !== "0" ? photoReq.totalText : undefined} />

      {/* Actions */}
      <div className="flex gap-3 w-full mt-4">
        <div className="flex-1">
          <AddToCartButton 
            product={{
              id: `${product.id}-${selectedVariant.label}`,
              name: product.name,
              price: selectedVariant.price,
              image: product.main_image_url,
              variant: selectedVariant.label,
              slug: slug // Pass slug so cart knows what this is
            }}
            customizationData={photos}
            minPhotos={photoReq.min}
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
