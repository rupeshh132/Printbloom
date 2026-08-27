import * as React from "react"
import Image from "next/image"
import { Link } from "@/components/ui/link"

const MOCK_PRODUCTS = [
  {
    slug: "custom-magazine",
    name: "The Custom Magazine",
    benefit: "A beautifully crafted editorial starring your favorite people.",
    startingPrice: "₹1,499",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    isHero: true
  },
  {
    slug: "polaroid-set",
    name: "Vintage Polaroid Set",
    benefit: "Your digital memories, printed with a classic retro feel.",
    startingPrice: "₹499",
    image: "https://images.unsplash.com/photo-1526485856375-9110812fbf35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isHero: false
  },
  {
    slug: "photo-frame",
    name: "Classic Photo Frame",
    benefit: "Ready-to-hang wooden frames for your best moments.",
    startingPrice: "₹899",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isHero: false
  }
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
      {MOCK_PRODUCTS.map((product) => (
        <Link 
          key={product.slug} 
          href={/products/}
          className={group flex flex-col }
        >
          <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[500px] overflow-hidden bg-surface mb-6">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="font-serif text-2xl text-ink group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <p className="text-text-muted">
              {product.benefit}
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-sm tracking-wide">From {product.startingPrice}</span>
              <span className="text-accent font-medium text-sm group-hover:underline underline-offset-4">View Details &rarr;</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}