import * as React from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in"

const steps = [
  {
    title: "Personalised Design",
    description: "Your photos, messages, captions, names, dates, and special requests are brought together into your chosen design. We carefully arrange everything to make your gift feel personal and meaningful.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Quality Printing",
    description: "Once your design is approved, we move it to printing. Your personalised gift is printed with care so your memories are ready to be enjoyed and gifted.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Carefully Packed",
    description: "Your finished gift is packed securely with protective cardboard, packaging, a thank-you card, and sometimes freebies too — so it reaches you safely and is ready to gift.",
    image: "/images/hand-packaged.jpg",
  }
]

export function BehindTheScenesSection() {
  return (
    <section className="py-24 px-4 md:px-8 bg-surface border-t border-[#E0D9CF]/50">
      <div className="container mx-auto max-w-7xl">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-text-muted mb-4">
            How It's Made
          </div>
          <SectionHeading as="h2" className="mb-4">Behind the scenes.</SectionHeading>
          <p className="text-text-muted text-lg">
            Every PrintBloom gift starts with your memories. We carefully design, print, and pack each order before it makes its way to you.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <FadeInStaggerItem key={step.title} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg border border-border mb-6">
                <Image 
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                />
                <div className="absolute top-4 left-4 w-8 h-8 bg-white border border-[#E0D9CF] flex items-center justify-center font-serif text-[#DFBC94]">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-serif text-2xl text-ink mb-3">{step.title}</h3>
              <p className="text-text-muted leading-relaxed">
                {step.description}
              </p>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  )
}
