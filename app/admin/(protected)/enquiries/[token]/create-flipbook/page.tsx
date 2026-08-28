import { getEnquiryByToken } from "@/app/actions/enquiries"
import { notFound } from "next/navigation"
import { SectionHeading } from "@/components/ui/section-heading"
import NextLink from "next/link"
import { FlipbookCreator } from "@/components/admin/flipbook-creator"

export default async function CreateFlipbookPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const enquiry = await getEnquiryByToken(token)

  if (!enquiry) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <NextLink href={`/admin/enquiries/${token}`} className="text-xs text-[#9A8F85] hover:text-[#C1502E] mb-4 inline-block tracking-wider uppercase font-medium">
          ← Back to Uploads
        </NextLink>
        <SectionHeading as="h1" className="text-[#221F1C]">
          Create 3D Flipbook
        </SectionHeading>
        <p className="text-sm text-[#9A8F85] mt-1">Upload the final magazine designs for {enquiry.name} to generate a digital preview link.</p>
      </div>

      <FlipbookCreator token={token} />
    </div>
  )
}
