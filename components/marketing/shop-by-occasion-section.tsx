import * as React from "react"
import Image from "next/image"
import { Link } from "@/components/ui/link"
import { SectionHeading } from "@/components/ui/section-heading"

const occasions = [
  {
    title: "Anniversary",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/products?occasion=anniversary"
  },
  {
    title: "Birthdays",
    image: "https://images.unsplash.com/photo-1530103862676-de8892ebeea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/products?occasion=birthday"
  },
  {
    title: "Long Distance",
    image: "https://images.unsplash.com/photo-1522850613220-192a54fbac52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/products?occasion=long-distance"
  },
  {
    title: "Just Because",
    image: "https://images.unsplash.com/photo-1505322747495-6afdd3b70760?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/products?occasion=just-because"
  }
]

export function ShopByOccasionSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-surface">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
          <div>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted mb-4">
              Find the perfect gift
            </div>
            <SectionHeading as="h2">Shop by Occasion</SectionHeading>
          </div>
          <Link href="/products" variant="underline" className="text-sm">
            View All Products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occasion) => (
            <a 
              key={occasion.title} 
              href={occasion.href}
              className="group relative block aspect-[4/5] overflow-hidden bg-bg border border-border"
            >
              <Image 
                src={occasion.image}
                alt={occasion.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-white font-serif text-2xl mb-1">{occasion.title}</h3>
                <span className="text-white/80 font-mono text-xs uppercase tracking-wider opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Shop Gifts &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
