import { SectionHeading } from "@/components/ui/section-heading"
import { getEnquiries, updateEnquiryStatus } from "@/app/actions/enquiries"

const STATUS_COLORS: Record<string, string> = {
  new: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  converted: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-600",
}

export default async function AdminEnquiries() {
  const enquiries = await getEnquiries()

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
          <p className="text-4xl mb-4">📭</p>
          <p className="font-serif text-xl text-[#221F1C] mb-2">No enquiries yet</p>
          <p className="text-sm text-[#9A8F85]">When customers fill the order form, their enquiries will appear here.</p>
        </div>
      ) : (
        <div className="bg-white shadow-sm border border-[#E0D9CF] rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F5F0E8] border-b border-[#E0D9CF] text-xs font-mono text-[#9A8F85] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-normal">Date</th>
                <th className="p-4 font-normal">Name</th>
                <th className="p-4 font-normal">Product</th>
                <th className="p-4 font-normal">Occasion</th>
                <th className="p-4 font-normal">Required By</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0D9CF]">
              {enquiries.map((enq: any) => (
                <tr key={enq.id} className="hover:bg-[#FBF6EE]/50 transition-colors">
                  <td className="p-4 text-sm text-[#9A8F85]">
                    {new Date(enq.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td className="p-4 font-medium text-[#221F1C]">{enq.name}</td>
                  <td className="p-4 text-sm">
                    {enq.enquiry_items?.[0]?.products?.name ?? "—"}
                    {enq.enquiry_items?.[0]?.variant_label && (
                      <span className="text-[#9A8F85] ml-1">({enq.enquiry_items[0].variant_label})</span>
                    )}
                  </td>
                  <td className="p-4 text-sm">{enq.occasion ?? "—"}</td>
                  <td className="p-4 text-sm text-[#9A8F85]">
                    {enq.required_by
                      ? new Date(enq.required_by).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                      : "—"}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-sm font-medium ${STATUS_COLORS[enq.status] ?? STATUS_COLORS.new}`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <form action={async () => {
                      "use server"
                      await updateEnquiryStatus(enq.id, enq.status === "new" ? "contacted" : enq.status === "contacted" ? "converted" : "closed")
                    }}>
                      <button type="submit" className="text-xs text-[#C1502E] hover:underline">
                        {enq.status === "new" ? "Mark Contacted →" : enq.status === "contacted" ? "Mark Converted →" : "Close"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}