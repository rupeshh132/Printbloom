import { SectionHeading } from "@/components/ui/section-heading"
import { Link } from "@/components/ui/link"

export default function JournalPage() {
  return (
    <main className="flex flex-col min-h-screen pt-36 pb-24 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-16">
          <SectionHeading as="h1">Bloom Journal</SectionHeading>
          <p className="mt-4 text-text-muted text-lg max-w-2xl">
            Real stories, real people, real memories. See how our customers are turning their favorite moments into keepsakes.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Placeholder for stories */}
          <Link href="/journal/anniversary-surprise" className="group">
            <div className="aspect-[4/5] bg-surface mb-4 w-full"></div>
            <h3 className="font-serif text-2xl group-hover:text-accent">Anniversary Surprise for Priya</h3>
            <p className="text-text-muted mt-2">Custom Magazine</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
