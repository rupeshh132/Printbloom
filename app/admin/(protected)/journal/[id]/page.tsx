import { SectionHeading } from "@/components/ui/section-heading"
import { getJournals } from "@/app/actions/journal"
import { JournalForm } from "@/components/admin/journal-form"
import NextLink from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

export default async function EditJournalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const journals = await getJournals()
  const story = journals.find(j => j.id === id)

  if (!story) {
    return notFound()
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <NextLink href="/admin/journal" className="inline-flex items-center gap-2 text-sm font-medium text-[#9A8F85] hover:text-[#DFBC94] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Journal
      </NextLink>

      <div className="mb-8">
        <SectionHeading as="h1" className="text-[#221F1C]">Edit Journal Story</SectionHeading>
        <p className="text-sm text-[#9A8F85] mt-1">Make changes to this published memory.</p>
      </div>

      <JournalForm initialData={story} />
    </div>
  )
}
