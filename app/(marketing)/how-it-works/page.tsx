import { SectionHeading } from "@/components/ui/section-heading"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in"

const steps = [
  {
    num: "01",
    title: "Choose Your Gift",
    desc: "Choose the personalised gift you'd like to create and place your order through our website."
  },
  {
    num: "02",
    title: "Upload Your Memories",
    desc: "Upload the photos you'd like us to use in your gift. You don't need to prepare all your customisation details yet."
  },
  {
    num: "03",
    title: "We'll Contact You",
    desc: "Once your order is confirmed, the PrintBloom team will contact you on WhatsApp to collect your customisation details, including messages, captions, names, dates, song details and any specific requests."
  },
  {
    num: "04",
    title: "We Design It",
    desc: "Once we have everything we need, we'll carefully arrange your photos, text and memories into your chosen design."
  },
  {
    num: "05",
    title: "Review & Approve",
    desc: "We'll share a digital preview with you so you can check the photos, text and other details. Once you approve the final design, we'll move it into production."
  },
  {
    num: "06",
    title: "Print & Carefully Pack",
    desc: "Your personalised gift is then printed and carefully packed for delivery, ready to be gifted."
  }
]

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col min-h-screen pt-36 pb-24 px-4 md:px-8 bg-[#FBF6EE]">
      <div className="container mx-auto max-w-3xl">
        <FadeIn>
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#9A8F85] text-center mb-4">
            The Process
          </div>
          <SectionHeading as="h1" className="text-center mb-16 text-[#221F1C]">How It Works</SectionHeading>
        </FadeIn>
        
        <FadeInStagger className="space-y-12">
          {steps.map((step) => (
            <FadeInStaggerItem key={step.num} className="flex gap-6 group">
              <div className="font-mono text-2xl text-[#DFBC94] font-medium pt-1 group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <div className="flex-1 pb-12 border-b border-[#E0D9CF] group-last:border-0 group-last:pb-0">
                <h3 className="font-serif text-2xl text-[#221F1C] mb-3">{step.title}</h3>
                <p className="text-[#6B6259] leading-relaxed text-lg">
                  {step.desc}
                </p>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </main>
  )
}
