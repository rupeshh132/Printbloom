import * as React from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in"
import { homepageTrustCards } from "@/lib/reviews-data"

export function ReviewsSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#FBF6EE]">
      <div className="container mx-auto max-w-7xl">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted mb-4">
            Real Reactions
          </div>
          <SectionHeading as="h2" className="mb-4">What customers are saying.</SectionHeading>
          <p className="text-text-muted text-lg">
            Every review is a real WhatsApp screenshot from a customer who just received their order.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homepageTrustCards.map((review) => (
            <FadeInStaggerItem key={review.id} className="flex flex-col">
              {/* Screenshot preview */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4ECDD] border border-[#E0D9CF] mb-6 group">
                <Image
                  src={review.image}
                  alt={`Customer review — ${review.product}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-[#25D366] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  WhatsApp ✓✓
                </div>
              </div>

              {/* Quote */}
              <blockquote className="flex-1 flex flex-col">
                <p className="text-[#221F1C] font-serif text-lg leading-relaxed italic mb-4 line-clamp-3">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-[#E0D9CF] mt-auto">
                  <p className="font-serif text-[#221F1C]">{review.name}</p>
                  <p className="text-xs font-mono text-[#9A8F85] uppercase tracking-wider mt-1">
                    {review.product || "Verified Buyer"}
                  </p>
                </div>
              </blockquote>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        <FadeIn className="text-center mt-12">
          <a href="/reviews" className="text-sm text-[#DFBC94] hover:underline font-medium font-mono tracking-wider uppercase">
            View All Customer Reactions &rarr;
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
