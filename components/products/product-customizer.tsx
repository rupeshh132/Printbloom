"use client"
import * as React from "react"
import { PhotoUploader, UploadedPhoto } from "./photo-uploader"
import { AddToCartButton } from "./add-to-cart-button"
import { WishlistButton } from "./wishlist-button"

export function ProductCustomizer({ product, slug, isWishlisted }: { product: any, slug: string, isWishlisted: boolean }) {
  const [photos, setPhotos] = React.useState<UploadedPhoto[]>([])

  return (
    <div className="flex flex-col mb-10 w-full">
      {/* Photo Uploader Engine */}
      <PhotoUploader onPhotosChange={setPhotos} />

      {/* Actions */}
      <div className="flex gap-3 w-full">
        <div className="flex-1">
          <AddToCartButton 
            product={{
              id: product.id,
              name: product.name,
              price: product.starting_price,
              image: product.main_image_url
            }}
            customizationData={photos}
          />
        </div>
        <button className="flex-1 bg-[#221F1C] text-white py-4 rounded-full font-medium hover:bg-black transition-colors">
          Buy Now
        </button>
        <WishlistButton 
          productSlug={slug}
          productName={product.name}
          productImageUrl={product.main_image_url}
          productPrice={product.starting_price}
          initialStatus={isWishlisted}
        />
      </div>
    </div>
  )
}
