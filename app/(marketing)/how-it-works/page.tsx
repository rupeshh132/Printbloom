import { SectionHeading } from "@/components/ui/section-heading"

export default function HowItWorksPage() {
  return (
    <main className="flex flex-col min-h-screen py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading as="h1" className="text-center mb-16">How It Works</SectionHeading>
        <div className="space-y-12">
          {/* Timeline placeholder */}
          <div className="flex gap-6">
            <div className="font-mono text-xl text-accent">01</div>
            <div>
              <h3 className="font-serif text-xl mb-2">Choose Your Gift</h3>
              <p className="text-text-muted">Select the product and fill out the enquiry form. We'll connect on WhatsApp.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}