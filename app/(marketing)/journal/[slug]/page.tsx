import { SectionHeading } from "@/components/ui/section-heading"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function StoryPage({ params }: PageProps) {
  const resolvedParams = await params
  
  return (
    <main className="flex flex-col min-h-screen py-24 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="uppercase tracking-widest text-xs font-mono text-text-muted mb-4">Custom Magazine</div>
        <SectionHeading as="h1">Story: {resolvedParams.slug}</SectionHeading>
        <p className="mt-8 text-left text-lg leading-relaxed text-text-main">
          Placeholder content for the individual journal story. This will later fetch from Supabase.
        </p>
      </div>
    </main>
  )
}