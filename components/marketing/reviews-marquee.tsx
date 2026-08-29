"use client"
import * as React from "react"
import { marqueeQuotes } from "@/lib/reviews-data"

export function ReviewsMarquee() {
  // Duplicate for seamless infinite loop
  const items = [...marqueeQuotes, ...marqueeQuotes]

  return (
    <div className="w-full overflow-hidden bg-[#221F1C] py-4 select-none">
      <div className="flex animate-marquee gap-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-8 shrink-0">
            <span className="text-[#C1502E] text-lg">★★★★★</span>
            <p className="text-[#FBF6EE]/80 text-sm font-sans whitespace-nowrap">
              "{item.quote}"
            </p>
            <span className="text-[#9A8F85] text-xs font-mono shrink-0">— Verified Customer</span>
            <span className="w-px h-4 bg-white/20 mx-4" />
          </div>
        ))}
      </div>
    </div>
  )
}
