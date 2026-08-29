import * as React from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getProductBySlug } from "@/app/actions/products"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import { PincodeChecker } from "@/components/products/pincode-checker"
import { ShieldCheck, Award, Map, Clock, Plus } from "lucide-react"

export const revalidate = 3600

export default async function ProductPage({ params }: { params: { slug: string } }) {
  // Try to fetch product, or use mock if missing so we can at least see the UI
  let product
  try {
    product = await getProductBySlug(params.slug)
  } catch (e) {
    product = null
  }

  if (!product) {
    // For demo purposes, we will mock the product if it doesn't exist in DB yet
    product = {
      id: "demo-id",
      name: params.slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      starting_price: 50,
      main_image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      description: "A beautiful personalized item crafted just for you."
    }
  }

  return (
    <main className="flex flex-col min-h-screen pt-32 pb-24 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="text-sm text-[#9A8F85] mb-8">
          Home / Products / <span className="text-[#221F1C]">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          
          {/* Left: Product Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] bg-[#FBF6EE] border border-[#E0D9CF] overflow-hidden">
              <Image 
                src={product.main_image_url} 
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="font-serif text-3xl md:text-4xl text-[#221F1C] mb-4">
              {product.name}
            </h1>
            
            <div className="mb-8">
              <span className="text-2xl font-medium text-[#221F1C]">₹{product.starting_price}</span>
              <p className="text-sm text-[#9A8F85] mt-1">Incl. of all taxes</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-10">
              <AddToCartButton 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.starting_price,
                  image: product.main_image_url
                }} 
              />
              <button className="w-full bg-[#221F1C] text-white py-4 rounded-full font-medium hover:bg-black transition-colors">
                Buy Now
              </button>
            </div>

            {/* Pincode Checker */}
            <PincodeChecker />

            {/* Accordions */}
            <div className="mt-10 border-t border-[#E0D9CF] divide-y divide-[#E0D9CF]">
              <details className="group py-5 cursor-pointer">
                <summary className="flex justify-between items-center font-serif text-lg text-[#221F1C] list-none">
                  Product Description
                  <span className="transition group-open:rotate-45">
                    <Plus className="w-5 h-5 text-[#9A8F85]" />
                  </span>
                </summary>
                <div className="pt-4 text-sm text-[#6B6259] leading-relaxed">
                  {product.description || "Beautifully crafted customized product to keep your memories safe. Made with premium materials and high quality printing."}
                </div>
              </details>
              
              <details className="group py-5 cursor-pointer">
                <summary className="flex justify-between items-center font-serif text-lg text-[#221F1C] list-none">
                  Return Policy
                  <span className="transition group-open:rotate-45">
                    <Plus className="w-5 h-5 text-[#9A8F85]" />
                  </span>
                </summary>
                <div className="pt-4 text-sm text-[#6B6259] leading-relaxed">
                  As this is a personalized product, we do not accept returns unless the item is damaged during transit.
                </div>
              </details>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 grid grid-cols-4 gap-4 text-center border-t border-[#E0D9CF] pt-8">
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#4B6B4F]" />
                <span className="text-[10px] text-[#9A8F85] uppercase tracking-wider">Secure Payments</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Award className="w-6 h-6 text-[#4B6B4F]" />
                <span className="text-[10px] text-[#9A8F85] uppercase tracking-wider">Assured Quality</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Map className="w-6 h-6 text-[#4B6B4F]" />
                <span className="text-[10px] text-[#9A8F85] uppercase tracking-wider">Made In India</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-6 h-6 text-[#4B6B4F]" />
                <span className="text-[10px] text-[#9A8F85] uppercase tracking-wider">Timely Delivery</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
