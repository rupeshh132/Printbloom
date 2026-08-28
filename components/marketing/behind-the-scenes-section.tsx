import * as React from "react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in"

const steps = [
  {
    title: "Editorial Design",
    description: "Every photo is manually placed, color-corrected, and curated by our team. No automated templates cutting off faces.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Premium Print",
    description: "We use archival-grade paper and industry-leading printers to ensure your memories don't fade after a few years.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Hand Packaged",
    description: "Wrapped in butter paper, tied with twine, and sealed carefully. Unboxing it feels just as special as reading it.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
            There is no "Print" button. Every piece that leaves our studio is crafted with human hands.
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
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                />
                <div className="absolute top-4 left-4 w-8 h-8 bg-white border border-[#E0D9CF] flex items-center justify-center font-serif text-[#C1502E]">
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
