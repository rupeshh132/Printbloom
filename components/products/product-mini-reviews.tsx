import Image from "next/image"
import { allReviews, productReviews } from "@/lib/reviews-data"

export function ProductMiniReviews({ productSlug }: { productSlug: string }) {
  // Get product-specific reviews or fall back to defaults
  const reviews = productReviews[productSlug] ?? productReviews["_default"]

  return (
    <div className="mt-10 pt-8 border-t border-[#E0D9CF]">
      <div className="flex items-center gap-3 mb-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#DFBC94] mb-0.5">Verified Reactions</p>
          <h3 className="font-serif text-xl text-[#221F1C]">What customers said</h3>
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-serif text-[#221F1C]">★★★★★</p>
          <p className="text-xs text-[#9A8F85]">500+ happy customers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#FBF6EE] border border-[#E0D9CF] rounded-sm overflow-hidden group">
            {/* Screenshot preview */}
            <div className="relative h-48 overflow-hidden bg-white">
              <Image
                src={review.image}
                alt="Customer review"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-3 left-3 bg-[#25D366] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                WhatsApp ✓
              </div>
            </div>
            {/* Quote */}
            <div className="p-4">
              <p className="text-sm text-[#221F1C] italic leading-relaxed line-clamp-2">"{review.quote}"</p>
              <p className="text-xs text-[#9A8F85] font-mono mt-2">— Verified Customer</p>
            </div>
          </div>
        ))}
      </div>

      <a href="/reviews" className="block text-center text-sm text-[#DFBC94] hover:underline mt-5 font-medium">
        View all customer reviews →
      </a>
    </div>
  )
}
