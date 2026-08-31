import * as React from "react"
import { CheckCircle2 } from "lucide-react"

export function HowItWorksSteps() {
  const steps = [
    "You place the order & complete payment.",
    "We share beautiful magazine templates based on your occasion.",
    "You select your favorite template.",
    "Share photos, captions, quotes, and specific placement instructions.",
    "Our designers craft your custom magazine.",
    "We send you a digital proof for final approval.",
    "Once approved, we print on premium paper.",
    "Your personalized magazine is carefully packaged and shipped."
  ]

  return (
    <div className="mt-24 pt-16 border-t border-[#E4D9C6]">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl text-[#221F1C] mb-4">How does it work?</h2>
        <p className="text-[#6B6259] max-w-2xl mx-auto">
          We handle everything with care to ensure your memories are beautifully preserved. Here is our completely personalized process.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 items-start bg-white p-6 rounded-sm border border-[#E4D9C6] shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 bg-[#DFBC94]/20 text-[#DFBC94] rounded-full flex items-center justify-center font-medium border border-[#DFBC94]/30">
                {idx + 1}
              </div>
              <p className="text-[#221F1C] text-sm leading-relaxed pt-1.5">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
