import { SectionHeading } from "@/components/ui/section-heading"

export default function AdminEnquiries() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <SectionHeading as="h1" className="text-ink">Enquiries CRM</SectionHeading>
      </div>
      
      <div className="bg-white shadow-sm border border-border-subtle rounded-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface border-b border-border-subtle text-sm font-mono text-text-muted">
            <tr>
              <th className="p-4 font-normal">Date</th>
              <th className="p-4 font-normal">Name</th>
              <th className="p-4 font-normal">Product</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="p-4 text-text-muted">28 Aug 2026</td>
              <td className="p-4 font-medium">Rahul Verma</td>
              <td className="p-4">Custom Magazine</td>
              <td className="p-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-sm">New</span></td>
              <td className="p-4 text-accent hover:underline cursor-pointer">View</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}