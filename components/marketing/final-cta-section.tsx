import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { TextPressure } from "@/components/ui/text-pressure"

export function FinalCTASection() {
  return (
    <section className="relative pt-32 pb-16 px-4 md:px-8 bg-[#C1502E] text-white overflow-hidden flex flex-col items-center">
      <div className="container mx-auto max-w-4xl text-center flex flex-col items-center relative z-10 mb-16">
        <SectionHeading as="h2" className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl">
          Ready to tell your story?
        </SectionHeading>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          Start your custom magazine today. We'll handle the design, printing, and packaging. You just supply the memories.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button asChild size="lg" className="bg-[#221F1C] text-[#FBF6EE] hover:bg-[#1A1815] border-none text-base h-14 px-8 rounded-sm">
            <a href="/order">Start Your Order</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent text-base h-14 px-8 rounded-sm">
            <a href="/how-it-works">See How It Works</a>
          </Button>
        </div>
      </div>

      <div className="w-full h-auto mt-auto opacity-40 select-none pointer-events-auto">
        <TextPressure
          text="PRINTBLOOM"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#A8432A"
          minFontSize={36}
        />
      </div>
    </section>
  )
}
