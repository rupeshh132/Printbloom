import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1606240724602-5b21f896eae8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Hands holding a beautifully printed custom magazine"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Soft overlay to ensure text readability */}
        <div className="absolute inset-0 bg-ink/30"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <SectionHeading as="h1" className="text-white max-w-3xl drop-shadow-sm mb-6">
          Turn your favorite memories into gifts they'll never forget.
        </SectionHeading>
        <p className="text-surface text-lg md:text-xl max-w-xl mb-10 drop-shadow-sm">
          Custom magazines, photo frames, polaroids and more — designed from your photos and stories.
        </p>
        <Button size="lg" className="text-lg">
          Create My Magazine
        </Button>
      </div>
    </section>
  )
}
