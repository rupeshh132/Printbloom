import Image from "next/image"
import { allReviews } from "@/lib/reviews-data"
import { SectionHeading } from "@/components/ui/section-heading"

export const metadata = {
  title: "Customer Reviews | PrintBloom",
  description: "See what real customers say about their PrintBloom custom memory gifts — unedited WhatsApp reactions."
}

export default function ReviewsPage() {
  return (
    <main className="flex flex-col min-h-screen pt-36 pb-24 px-4 md:px-8 bg-[#FBF6EE]">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-mono text-xs uppercase tracking-widest text-[#C1502E] mb-4">Unedited • Real Customers • Real WhatsApp Chats</p>
          <SectionHeading as="h1" className="text-center">Customer Love</SectionHeading>
          <p className="text-[#6B6259] mt-4 max-w-2xl mx-auto">
            Every screenshot below is a real WhatsApp conversation from a real customer. We never edit them.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-16">
          {[
            { num: "500+", label: "Happy Customers" },
            { num: "4.9★", label: "Avg. Rating" },
            { num: "100%", label: "Made With Love" },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-white border border-[#E0D9CF] rounded-sm py-4 px-2">
              <p className="font-serif text-2xl text-[#C1502E]">{stat.num}</p>
              <p className="text-xs text-[#9A8F85] font-mono mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Masonry Review Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {allReviews.map((review) => (
            <div key={review.id} className="break-inside-avoid mb-6 bg-white border border-[#E0D9CF] rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              
              {/* Screenshot Image */}
              <div className="relative w-full overflow-hidden bg-gray-100">
                <Image
                  src={review.image}
                  alt={`Customer review screenshot`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Platform badge */}
                <div className={`absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-1 rounded-full ${review.type === "instagram" ? "bg-gradient-to-br from-purple-500 to-pink-500" : "bg-[#25D366]"}`}>
                  {review.type === "instagram" ? "Instagram" : "WhatsApp"}
                </div>
              </div>

              {/* Quote overlay */}
              <div className="p-4 border-t border-[#E0D9CF]">
                <div className="text-[#C1502E] text-xs mb-2">★★★★★</div>
                <p className="text-sm text-[#221F1C] leading-relaxed italic line-clamp-3">"{review.quote}"</p>
                <p className="text-xs text-[#9A8F85] font-mono mt-3">— Verified Customer</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 py-12 border-t border-[#E0D9CF]">
          <h3 className="font-serif text-2xl text-[#221F1C] mb-3">Ready to create yours?</h3>
          <p className="text-[#6B6259] mb-6">Join 500+ happy customers who made their loved ones cry (happy tears 😭)</p>
          <a href="/products" className="inline-block bg-[#221F1C] text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-colors">
            Browse Products
          </a>
        </div>

      </div>
    </main>
  )
}
