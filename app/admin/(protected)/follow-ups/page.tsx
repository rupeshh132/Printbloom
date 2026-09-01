import { SectionHeading } from "@/components/ui/section-heading"
import { getFollowUps, updateFollowUpStatus } from "@/app/actions/follow-ups"
import { WhatsAppButton } from "@/components/admin/whatsapp-button"

export const dynamic = "force-dynamic"

const STATUS_STYLES: Record<string, { bg: string, text: string, dot: string }> = {
  pending:   { bg: "bg-red-50",    text: "text-red-700",   dot: "bg-red-400" },
  contacted: { bg: "bg-blue-50",   text: "text-blue-700",  dot: "bg-blue-400" },
  recovered: { bg: "bg-green-50",  text: "text-green-700", dot: "bg-green-400" },
}

export default async function FollowUpsPage() {
  const followUps = await getFollowUps()

  const pending   = followUps.filter((f: any) => f.status === "pending").length
  const contacted = followUps.filter((f: any) => f.status === "contacted").length
  const recovered = followUps.filter((f: any) => f.status === "recovered").length

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <SectionHeading as="h1" className="text-[#221F1C]">Abandoned Carts & Leads</SectionHeading>
          <p className="text-sm text-[#9A8F85] mt-1">
            Customers who entered their details but didn't finish checkout
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Pending", count: pending, color: "border-red-200 bg-red-50", text: "text-red-700" },
          { label: "Contacted", count: contacted, color: "border-blue-200 bg-blue-50", text: "text-blue-700" },
          { label: "Recovered", count: recovered, color: "border-green-200 bg-green-50", text: "text-green-700" },
        ].map(s => (
          <div key={s.label} className={`border ${s.color} rounded-sm p-4`}>
            <p className={`font-serif text-3xl font-bold ${s.text}`}>{s.count}</p>
            <p className="text-xs text-[#9A8F85] uppercase tracking-wider mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E0D9CF] rounded-sm shadow-sm overflow-hidden">
        {followUps.length === 0 ? (
          <div className="py-20 text-center text-[#9A8F85]">
            <p className="text-5xl mb-4">🛒</p>
            <p className="font-serif text-xl text-[#221F1C] mb-2">No abandoned carts!</p>
            <p className="text-sm">When customers start checking out, they'll appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F0E8] border-b border-[#E0D9CF]">
                <tr>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-[#9A8F85] uppercase tracking-wider font-normal">Date</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-[#9A8F85] uppercase tracking-wider font-normal">Customer</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-[#9A8F85] uppercase tracking-wider font-normal">Phone</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-[#9A8F85] uppercase tracking-wider font-normal">Cart Value</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-[#9A8F85] uppercase tracking-wider font-normal">Status</th>
                  <th className="px-5 py-3.5 font-mono text-[10px] text-[#9A8F85] uppercase tracking-wider font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE3]">
                {followUps.map((lead: any) => {
                  const style = STATUS_STYLES[lead.status] || STATUS_STYLES.pending
                  const nextStatus = lead.status === 'pending' ? 'contacted' : lead.status === 'contacted' ? 'recovered' : 'pending'
                  const nextLabel  = lead.status === 'pending' ? '✓ Mark Contacted' : lead.status === 'contacted' ? '✅ Mark Recovered' : '↺ Reset'
                  return (
                    <tr key={lead.id} className="hover:bg-[#FBF6EE]/60 transition-colors">
                      <td className="px-5 py-4 text-[#9A8F85] whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="px-5 py-4 font-semibold text-[#221F1C]">{lead.customer_name}</td>
                      <td className="px-5 py-4 text-[#6B6259] font-mono text-xs">{lead.phone_number}</td>
                      <td className="px-5 py-4 font-semibold text-[#DFBC94]">₹{lead.cart_total}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* WhatsApp button */}
                          <WhatsAppButton phone={lead.phone_number} customerName={lead.customer_name} />
                          
                          {/* Status update button */}
                          <form action={async () => {
                            "use server"
                            await updateFollowUpStatus(lead.id, nextStatus)
                          }}>
                            <button 
                              type="submit"
                              className="text-xs bg-[#F5F0E8] text-[#221F1C] hover:bg-[#E8E0D5] border border-[#E0D9CF] px-3 py-1.5 rounded-sm font-medium transition-colors whitespace-nowrap"
                            >
                              {nextLabel}
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
