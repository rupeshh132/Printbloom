import { SectionHeading } from "@/components/ui/section-heading"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/fade-in"

const steps = [
  {
    num: "01",
    title: "Choose Your Gift",
    desc: "Select a product and fill out the simple enquiry form. We'll instantly connect with you on WhatsApp to discuss your requirement."
  },
  {
    num: "02",
    title: "Share Your Memories",
    desc: "We'll send you a secure link to upload your photos and share the little stories, quotes, or inside jokes that make your gift special."
  },
  {
    num: "03",
    title: "We Design It",
    desc: "Our expert team manually curates, color-corrects, and designs your product. No automated templates cutting off faces—everything is placed with care."
  },
  {
    num: "04",
    title: "Review & Approve",
    desc: "You'll receive a digital preview of your gift. We'll make sure you absolutely love it before it goes into production."
  },
  {
    num: "05",
    title: "Print & Hand Packaging",
    desc: "We print using archival-grade paper and industry-leading printers. Then, it's hand-wrapped in butter paper and twine, ready to be gifted."
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
