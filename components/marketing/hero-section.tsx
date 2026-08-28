import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in"

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 w-full h-full">
        {/* We use standard CSS animation for the slow zoom effect so it starts immediately */}
        <div className="absolute inset-0 w-full h-full animate-hero-zoom">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
            alt="Friends laughing and sharing memories together"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Warm dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        <FadeInStagger className="flex flex-col items-center">
          <FadeInStaggerItem>
            <SectionHeading as="h1" className="text-white max-w-3xl drop-shadow-sm mb-6">
              Turn your favorite memories into gifts they'll never forget.
            </SectionHeading>
          </FadeInStaggerItem>
          
          <FadeInStaggerItem>
            <p className="text-surface text-lg md:text-xl max-w-xl mb-10 drop-shadow-sm">
              Custom magazines, photo frames, polaroids and more — designed from your photos and stories.
            </p>
          </FadeInStaggerItem>
          
          <FadeInStaggerItem>
            <Button size="lg" className="text-lg hover:scale-105 transition-transform duration-300">
              Create My Magazine
            </Button>
          </FadeInStaggerItem>
        </FadeInStagger>
      </div>
    </section>
  )
}
