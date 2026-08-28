import { getUpcomingReminders, getAllReminders } from "@/app/actions/reminders"
import { SectionHeading } from "@/components/ui/section-heading"

export const dynamic = "force-dynamic"

export default async function AdminRemindersPage() {
  // Get people who have occasions exactly 20 days from today
  const upcoming = await getUpcomingReminders(20)
  const all = await getAllReminders()

  // Generate WhatsApp message template
  const getWaLink = (reminder: any) => {
    const text = `Hi ${reminder.customer_name}! This is a gentle reminder from PrintBloom. Your ${reminder.occasion_name} is coming up in 20 days! Would you like us to design a custom memory for this special day?`
    return `https://wa.me/${reminder.phone_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="max-w-6xl mx-auto">
      <SectionHeading as="h1" className="text-[#221F1C] mb-8">
        Occasion Reminders (CRM)
      </SectionHeading>

      <div className="bg-[#FBF6EE] border border-[#E0D9CF] p-6 rounded-sm mb-12">
        <h2 className="font-serif text-xl text-[#C1502E] mb-2 flex items-center gap-2">
          <span>🔔</span> Action Required Today ({upcoming.length})
        </h2>
        <p className="text-sm text-[#6B6259] mb-6">
          These customers have an occasion coming up in exactly 20 days. Send them a WhatsApp message to secure the order.
        </p>

        {upcoming.length === 0 ? (
          <div className="bg-white p-8 text-center border border-[#E0D9CF] rounded-sm text-[#9A8F85]">
            No reminders due today. Check back tomorrow!
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {upcoming.map((rem: any) => (
              <div key={rem.id} className="bg-white p-4 border border-[#E0D9CF] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-[#221F1C]">{rem.customer_name}</h3>
                  <p className="text-sm text-[#6B6259]">
                    <strong className="text-[#C1502E]">{rem.occasion_name}</strong> on {new Date(rem.occasion_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                  </p>
                  <p className="text-xs text-[#9A8F85] mt-1 font-mono">{rem.phone_number}</p>
                </div>
                <a 
                  href={getWaLink(rem)}
                  target="_blank"
                  className="bg-[#25D366] text-white px-6 py-2.5 rounded-sm hover:bg-[#128C7E] transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  Send Message
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <h2 className="font-serif text-xl text-[#221F1C]">All Subscribed Reminders ({all.length})</h2>
      </div>

      <div className="bg-white border border-[#E0D9CF] rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FBF6EE] border-b border-[#E0D9CF]">
            <tr>
              <th className="px-6 py-4 font-mono text-[10px] tracking-wider uppercase text-[#9A8F85]">Name</th>
              <th className="px-6 py-4 font-mono text-[10px] tracking-wider uppercase text-[#9A8F85]">Phone</th>
              <th className="px-6 py-4 font-mono text-[10px] tracking-wider uppercase text-[#9A8F85]">Occasion</th>
              <th className="px-6 py-4 font-mono text-[10px] tracking-wider uppercase text-[#9A8F85]">Date</th>
            </tr>
          </thead>
          <tbody>
            {all.map((rem: any) => (
              <tr key={rem.id} className="border-b border-[#E0D9CF] last:border-0 hover:bg-[#FBF6EE]/50 transition-colors">
                <td className="px-6 py-4 font-medium text-[#221F1C]">{rem.customer_name}</td>
                <td className="px-6 py-4 text-[#6B6259]">{rem.phone_number}</td>
                <td className="px-6 py-4 text-[#C1502E]">{rem.occasion_name}</td>
                <td className="px-6 py-4 text-[#6B6259]">
                  {new Date(rem.occasion_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </td>
              </tr>
            ))}
            {all.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-[#9A8F85]">
                  No reminders found in database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
