import { SectionHeading } from "@/components/ui/section-heading"
import { getPromoCodeById } from "@/app/actions/promo-codes"
import { PromoCodeEditForm } from "@/components/admin/promo-code-edit-form"
import NextLink from "next/link"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function EditPromoCodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const code = await getPromoCodeById(id)

  if (!code) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h2 className="text-xl font-medium text-[#221F1C] mb-4">Promo Code Not Found</h2>
        <NextLink href="/admin/promo-codes" className="text-[#DFBC94] hover:underline">
          &larr; Back to Promo Codes
        </NextLink>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <NextLink href="/admin/promo-codes" className="inline-flex items-center text-sm text-[#9A8F85] hover:text-[#221F1C] mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Promo Codes
        </NextLink>
        <SectionHeading as="h1" className="text-[#221F1C]">Edit Promo Code</SectionHeading>
        <p className="text-sm text-[#9A8F85] mt-1">Update limits and discount values.</p>
      </div>

      <PromoCodeEditForm code={code} />
    </div>
  )
}
