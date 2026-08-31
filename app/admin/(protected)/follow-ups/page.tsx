import { SectionHeading } from "@/components/ui/section-heading"
import { getFollowUps, updateFollowUpStatus } from "@/app/actions/follow-ups"
import { WhatsAppButton } from "@/components/admin/whatsapp-button"

export const dynamic = "force-dynamic"

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-red-100 text-red-800",
  contacted: "bg-blue-100 text-blue-800",
  recovered: "bg-green-100 text-green-800",
}

export default async function FollowUpsPage() {
  const followUps = await getFollowUps()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <SectionHeading as="h1" className="text-[#221F1C]">Abandoned Carts & Leads</SectionHeading>
          <p className="text-sm text-[#9A8F85] mt-1">Customers who entered their details but didn't finish checkout</p>
        </div>
      </div>

      <div className="bg-white border border-[#E0D9CF] rounded-sm shadow-sm overflow-hidden">
        {followUps.length === 0 ? (
          <div className="p-12 text-center text-[#9A8F85]">
            <p className="text-4xl mb-4">ðŸ›’</p>
            <p className="font-serif text-xl text-[#221F1C] mb-2">No abandoned carts!</p>
            <p className="text-sm">When customers start checking out, they'll appear here.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#F5F0E8] border-b border-[#E0D9CF] text-xs font-mono text-[#9A8F85] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-normal">Date</th>
                <th className="p-4 font-normal">Customer</th>
                <th className="p-4 font-normal">Cart Value</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0D9CF]">
              {followUps.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-[#FBF6EE]/50">
                  <td className="p-4 text-sm text-[#9A8F85]">
                    {new Date(lead.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "numeric" })}
                  </td>
                  <td className="p-4 font-medium text-[#221F1C]">{lead.customer_name}</td>
                  <td className="p-4 text-sm font-medium text-[#DFBC94]">₹{lead.cart_total}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-sm font-medium ${STATUS_COLORS[lead.status] || STATUS_COLORS.pending}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 flex flex-col gap-2">
                    <form action={async () => {
                      "use server"
                      const nextStatus = lead.status === 'pending' ? 'contacted' : lead.status === 'contacted' ? 'recovered' : 'pending'
                      await updateFollowUpStatus(lead.id, nextStatus)
                    }}>
                      <button type="submit" className="text-xs text-[#221F1C] hover:underline mb-2">
                        {lead.status === 'pending' ? 'Mark Contacted â†’' : lead.status === 'contacted' ? 'Mark Recovered âœ…' : 'Reset Status'}
                      </button>
                    </form>
                    
                    <WhatsAppButton 
                      phone={lead.phone_number} 
                      customerName={lead.customer_name} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
