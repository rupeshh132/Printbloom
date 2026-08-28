import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import Image from "next/image"

export function WhyPrintBloomSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#FBF6EE]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 md:order-1 flex flex-col space-y-8">
            <div>
              <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#9A8F85] mb-4">
                The PrintBloom Difference
              </div>
              <SectionHeading as="h2" className="text-[#221F1C]">
                Not your average photobook.
              </SectionHeading>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-[#C1502E] rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="font-serif text-xl text-[#221F1C] mb-2">Designed by Humans</h4>
                  <p className="text-[#6B6259] leading-relaxed">
                    Most photo printing services force your photos into rigid templates. We lay out every single page by hand to ensure your story flows perfectly.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-[#C1502E] rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="font-serif text-xl text-[#221F1C] mb-2">Made for Keeps</h4>
                  <p className="text-[#6B6259] leading-relaxed">
                    We don't use flimsy, glossy photo paper. We use premium, heavy-weight matte paper that looks and feels like a high-end fashion magazine.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-[#C1502E] rounded-full mt-2 shrink-0" />
                <div>
                  <h4 className="font-serif text-xl text-[#221F1C] mb-2">Zero Hassle</h4>
                  <p className="text-[#6B6259] leading-relaxed">
                    You don't need to download an app or struggle with a drag-and-drop editor. You just send us the photos and tell us the story. We do the rest.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden bg-[#2C2926] border border-[#E0D9CF] shadow-sm p-4">
            <div className="relative w-full h-full border border-white/20">
              <Image 
                src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Close up of magazine pages"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
