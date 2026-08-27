import { SectionHeading } from "@/components/ui/section-heading"
import { ProductGrid } from "@/components/marketing/product-grid"
import { getProducts } from "@/app/actions/products"

// Revalidate this page every 1 hour (or on-demand when products are updated)
export const revalidate = 3600

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main className="flex flex-col min-h-screen pt-36 pb-24 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-16 text-center md:text-left">
          <SectionHeading as="h1">
            Gifts They'll Keep Forever
          </SectionHeading>
          <p className="mt-4 text-text-muted text-lg max-w-2xl">
            From our signature custom magazine to framed memories and polaroids, everything is made-to-order from your photos and stories.
          </p>
        </header>
        
        <ProductGrid products={products} />
      </div>
    </main>
  )
}