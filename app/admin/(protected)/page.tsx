import { SectionHeading } from "@/components/ui/section-heading"
import { getDashboardCounts } from "@/app/actions/enquiries"
import { getDashboardChartData } from "@/app/actions/dashboard"
import { DashboardCharts } from "@/components/admin/dashboard-charts"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminDashboard() {
  const [counts, { monthlyData, productData }] = await Promise.all([
    getDashboardCounts(),
    getDashboardChartData()
  ])

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <SectionHeading as="h1" className="text-[#221F1C]">Dashboard</SectionHeading>
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

      {/* Advanced Features Component */}
      <DashboardCharts monthlyData={monthlyData} productData={productData} />
    </div>
  )
}