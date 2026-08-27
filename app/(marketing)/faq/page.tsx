import { SectionHeading } from "@/components/ui/section-heading"

export default function FAQPage() {
  return (
    <main className="flex flex-col min-h-screen py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-3xl">
        <SectionHeading as="h1" className="text-center mb-16">Common Questions</SectionHeading>
        <div className="space-y-8">
          {/* Accordion placeholder */}
          <div className="border-b border-border-subtle pb-6">
            <h3 className="font-serif text-xl mb-2">How long does it take?</h3>
            <p className="text-text-muted">Once approved, dispatch happens within 3-5 working days. [CONFIRM]</p>
          </div>
        </div>
      </div>
    </main>
  )
}