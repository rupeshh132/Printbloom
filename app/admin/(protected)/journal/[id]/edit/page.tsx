import { SectionHeading } from "@/components/ui/section-heading"
import { getJournalById } from "@/app/actions/journal"
import { JournalForm } from "@/components/admin/journal-form"
import NextLink from "next/link"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function EditJournalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const story = await getJournalById(id)

  if (!story) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h2 className="text-xl font-medium text-[#221F1C] mb-4">Story Not Found</h2>
        <NextLink href="/admin/journal" className="text-[#DFBC94] hover:underline">
          &larr; Back to Journal
        </NextLink>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <NextLink href="/admin/journal" className="inline-flex items-center text-sm text-[#9A8F85] hover:text-[#221F1C] mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Journal
        </NextLink>
        <SectionHeading as="h1" className="text-[#221F1C]">Edit Story</SectionHeading>
        <p className="text-sm text-[#9A8F85] mt-1">Make changes to your published customer story.</p>
      </div>

      <div className="bg-white border border-[#E0D9CF] rounded-sm shadow-sm p-1">
        <JournalForm initialData={story} />
      </div>
    </div>
  )
}
