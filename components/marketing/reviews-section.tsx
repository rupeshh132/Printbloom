import * as React from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"

const mockReviews = [
  {
    id: 1,
    name: "Riya S.",
    content: "I literally cried when I saw the magazine. It's so beautifully put together, the paper quality is amazing. Best anniversary gift ever.",
    product: "Custom Magazine",
    image: null,
  },
  {
    id: 2,
    name: "Aman K.",
    content: "Ordered the polaroid set for my girlfriend. The packaging was beautiful and the prints have that perfect vintage feel.",
    product: "Polaroid Set",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Pooja M.",
    content: "Such a unique concept! I was tired of gifting the usual perfumes and watches. This felt so personal.",
    product: "Custom Magazine",
    image: null,
  },
  {
    id: 4,
    name: "Vikram R.",
    content: "The wooden frames are super premium. They came ready to hang, exactly as promised. Very happy with the purchase.",
    product: "Classic Photo Frame",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  }
]

export function ReviewsSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#FBF6EE]">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="max-w-xl">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#9A8F85] mb-4">
              Wall of Love
            </div>
            <SectionHeading as="h2" className="text-[#221F1C]">
              Don't just take our word for it.
            </SectionHeading>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-6 border border-[#E0D9CF] rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex text-[#C1502E] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#6B6259] mb-6 text-sm leading-relaxed">
                  "{review.content}"
                </p>
                {review.image && (
                  <div className="relative w-full h-32 mb-6 rounded-sm overflow-hidden border border-[#E0D9CF]">
                    <Image src={review.image} alt="Customer photo" fill className="object-cover" />
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-[#E0D9CF]">
                <p className="font-serif text-[#221F1C]">{review.name}</p>
                <p className="text-xs font-mono text-[#9A8F85] uppercase tracking-wider mt-1">{review.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
