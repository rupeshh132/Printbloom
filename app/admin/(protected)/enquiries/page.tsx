import { SectionHeading } from "@/components/ui/section-heading"
import { getEnquiries } from "@/app/actions/enquiries"
import { getAllFlipbooks } from "@/app/actions/flipbooks"
import { EnquiriesKanban } from "@/components/admin/enquiries-kanban"

export const dynamic = "force-dynamic"

export default async function AdminEnquiries() {
  const [enquiries, flipbooks] = await Promise.all([
    getEnquiries(),
    getAllFlipbooks()
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <SectionHeading as="h1" className="text-[#221F1C]">Enquiries CRM</SectionHeading>
          <p className="text-sm text-[#9A8F85] mt-1">{enquiries.length} total enquiries</p>
        </div>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white border border-[#E0D9CF] rounded-sm p-12 text-center">
          <p className="text-4xl mb-4">📖</p>
          <p className="font-serif text-xl text-[#221F1C] mb-2">No enquiries yet</p>
          <p className="text-sm text-[#9A8F85]">When customers fill the order form, their enquiries will appear here.</p>
        </div>
      ) : (
        <EnquiriesKanban initialEnquiries={enquiries} flipbooks={flipbooks} />
      )}
    </div>
  )
}