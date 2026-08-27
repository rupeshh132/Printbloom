import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"

export default function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <SectionHeading as="h1" className="text-ink">Manage Products</SectionHeading>
        <Button>+ Add Product</Button>
      </div>
      
      <div className="bg-white shadow-sm border border-border-subtle rounded-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface border-b border-border-subtle text-sm font-mono text-text-muted">
            <tr>
              <th className="p-4 font-normal">Name</th>
              <th className="p-4 font-normal">Slug</th>
              <th className="p-4 font-normal">Starting Price</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            <tr>
              <td className="p-4 font-medium">The Custom Magazine</td>
              <td className="p-4 text-text-muted">custom-magazine</td>
              <td className="p-4">₹1,499</td>
              <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-sm">Published</span></td>
              <td className="p-4 text-accent hover:underline cursor-pointer">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}