import { SectionHeading } from "@/components/ui/section-heading"

export default function ReviewsPage() {
  return (
    <main className="flex flex-col min-h-screen py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading as="h1" className="text-center mb-16">Customer Love</SectionHeading>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {/* Masonry layout placeholder for reviews */}
          <div className="bg-surface p-6 mb-8 break-inside-avoid">
            <p className="italic">"Absolutely loved the magazine. Best gift ever!"</p>
            <p className="mt-4 font-medium">— Rahul</p>
          </div>
        </div>
      </div>
    </main>
  )
}