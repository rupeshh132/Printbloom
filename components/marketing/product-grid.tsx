import * as React from "react"
import Image from "next/image"
import NextLink from "next/link"

// Fallback images for now since media_assets aren't wired up yet
const FALLBACK_IMAGES: Record<string, string> = {
  "custom-magazine": "/images/a4-product.png",
  "custom-magazine-a4": "/images/a4-product.png",
  "polaroid-set": "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "photo-frame": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
}

export function ProductGrid({ products }: { products: any[] }) {
  // If no products (e.g. Supabase is empty), we can show a placeholder or nothing.
  if (!products || products.length === 0) {
    return <p className="text-text-muted">No products available at the moment.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {products.map((product) => {
        let imageSrc = product.main_image_url || FALLBACK_IMAGES[product.slug] || FALLBACK_IMAGES["custom-magazine"]
        
        // Force override the A4 image, ignoring what's in the database
        if (product.slug === 'custom-magazine-a4' || product.slug === 'custom-magazine') {
          imageSrc = '/images/a4-product.png'
        }

        return (
          <NextLink 
            key={product.slug} 
            href={`/products/${product.slug}`}
            className={`group flex flex-col ${product.is_hero ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}`}
          >
            <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[500px] overflow-hidden bg-surface mb-6">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <h3 className="font-serif text-2xl text-ink group-hover:text-accent transition-colors">
                {product.name}
              </h3>
              <p className="text-text-muted">
                {product.tagline}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-mono text-sm tracking-wide">
                  {product.starting_price_label?.toLowerCase().includes('from') 
                    ? product.starting_price_label 
                    : `From ${product.starting_price_label}`}
                </span>
                <span className="text-accent font-medium text-sm group-hover:underline underline-offset-4">View Details &rarr;</span>
              </div>
            </div>
          </NextLink>
        )
      })}
    </div>
  )
}