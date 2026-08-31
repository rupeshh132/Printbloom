import { SectionHeading } from "@/components/ui/section-heading"
import { getJournals, deleteJournalEntry, toggleJournalPublished } from "@/app/actions/journal"
import { JournalForm } from "@/components/admin/journal-form"
import Image from "next/image"
import { Trash2, Eye, EyeOff } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminJournalPage() {
  const journals = await getJournals()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <SectionHeading as="h1" className="text-[#221F1C]">Bloom Journal</SectionHeading>
          <p className="text-sm text-[#9A8F85] mt-1">Manage customer stories and memory showcases</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <JournalForm />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-[#E0D9CF] rounded-sm shadow-sm overflow-hidden">
            {journals.length === 0 ? (
              <div className="p-8 text-center text-[#9A8F85]">
                <p>No stories published yet.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#F5F0E8] border-b border-[#E0D9CF] text-xs font-mono text-[#9A8F85] uppercase tracking-wider">
                  <tr>
                    <th className="p-4 font-normal">Story</th>
                    <th className="p-4 font-normal">Media</th>
                    <th className="p-4 font-normal">Status</th>
                    <th className="p-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0D9CF]">
                  {journals.map((story: any) => (
                    <tr key={story.id} className="hover:bg-[#FBF6EE]/50">
                      <td className="p-4">
                        <p className="font-serif text-[#221F1C] font-semibold">{story.title}</p>
                        <p className="text-xs text-[#9A8F85] mt-1">{story.customer_name} | {story.product_name}</p>
                      </td>
                      <td className="p-4">
                        {story.media_url ? (
                          <div className="w-16 h-16 relative rounded-sm overflow-hidden border border-[#E0D9CF]">
                            {story.media_type === 'video' ? (
                              <video src={story.media_url} className="object-cover w-full h-full" muted />
                            ) : (
                              <Image src={story.media_url} alt={story.title} fill className="object-cover" />
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-[#9A8F85]">No Media</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-sm ${story.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {story.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <form action={async () => {
                            "use server"
                            await toggleJournalPublished(story.id, !story.published)
                          }}>
                            <button type="submit" className="p-2 text-[#9A8F85] hover:text-[#221F1C] hover:bg-[#F5F0E8] rounded-sm transition-colors" title={story.published ? "Unpublish" : "Publish"}>
                              {story.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </form>
                          <form action={async () => {
                            "use server"
                            await deleteJournalEntry(story.id)
                          }}>
                            <button type="submit" className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors" title="Delete Story">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
