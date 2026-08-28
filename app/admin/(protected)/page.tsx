import { SectionHeading } from "@/components/ui/section-heading"
import { getDashboardCounts } from "@/app/actions/enquiries"
import { seedProducts } from "@/app/actions/products"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

async function handleSeed() {
  "use server"
  await seedProducts()
}

export default async function AdminDashboard() {
  const counts = await getDashboardCounts()

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <SectionHeading as="h1" className="text-[#221F1C]">Dashboard</SectionHeading>
        <form action={handleSeed}>
          <Button variant="outline" size="sm" type="submit">
            Seed Products (Run Once)
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 shadow-sm border border-[#E0D9CF] rounded-sm">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#9A8F85] mb-2">New Enquiries</h3>
          <p className="font-serif text-5xl text-[#221F1C]">{counts.newEnquiries}</p>
          <p className="text-xs text-[#9A8F85] mt-1">Awaiting response</p>
        </div>
        <div className="bg-white p-6 shadow-sm border border-[#E0D9CF] rounded-sm">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#9A8F85] mb-2">Active Products</h3>
          <p className="font-serif text-5xl text-[#221F1C]">{counts.activeProducts}</p>
          <p className="text-xs text-[#9A8F85] mt-1">Published in catalogue</p>
        </div>
        <div className="bg-white p-6 shadow-sm border border-[#E0D9CF] rounded-sm">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#9A8F85] mb-2">Total Stories</h3>
          <p className="font-serif text-5xl text-[#221F1C]">{counts.totalStories}</p>
          <p className="text-xs text-[#9A8F85] mt-1">In Bloom Journal</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm text-sm text-amber-800">
        <strong>First time setup?</strong> Click "Seed Products (Run Once)" button above to add PrintBloom's full product catalog to your database.
      </div>
    </div>
  )
}