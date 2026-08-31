import { SectionHeading } from "@/components/ui/section-heading"
import { getAllFlipbooks } from "@/app/actions/flipbooks"
import { CopyUploadLink } from "@/components/admin/copy-upload-link"
import NextLink from "next/link"

export const dynamic = "force-dynamic"

export default async function FlipbooksManagerPage() {
  const flipbooks = await getAllFlipbooks()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <SectionHeading as="h1" className="text-[#221F1C]">Flipbook Manager</SectionHeading>
          <p className="text-sm text-[#9A8F85] mt-1">Manage all digital magazines generated for customers</p>
        </div>
      </div>

      <div className="bg-white border border-[#E0D9CF] rounded-sm shadow-sm overflow-hidden">
        {flipbooks.length === 0 ? (
          <div className="p-12 text-center text-[#9A8F85]">
            <p className="text-4xl mb-4">ðŸ“–</p>
            <p className="font-serif text-xl text-[#221F1C] mb-2">No Flipbooks Generated Yet</p>
            <p className="text-sm">You can generate flipbooks from within individual customer enquiries.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#F5F0E8] border-b border-[#E0D9CF] text-xs font-mono text-[#9A8F85] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-normal">Date Created</th>
                <th className="p-4 font-normal">Title</th>
                <th className="p-4 font-normal">Pages</th>
                <th className="p-4 font-normal">Source Enquiry</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0D9CF]">
              {flipbooks.map((fb: any) => (
                <tr key={fb.id} className="hover:bg-[#FBF6EE]/50">
                  <td className="p-4 text-sm text-[#9A8F85]">
                    {new Date(fb.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="p-4 font-medium text-[#221F1C]">{fb.title}</td>
                  <td className="p-4 text-sm text-[#6D635B]">{fb.images?.length || 0} Pages</td>
                  <td className="p-4 text-sm">
                    {fb.enquiry_token ? (
                      <NextLink 
                        href={`/admin/enquiries/${fb.enquiry_token}`}
                        className="text-[#DFBC94] hover:underline"
                      >
                        View Enquiry
                      </NextLink>
                    ) : (
                      <span className="text-[#9A8F85]">Independent</span>
                    )}
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-4">
                    <CopyUploadLink token={fb.id} isFlipbook />
                    <a 
                      href={`/flipbook/${fb.id}`}
                      target="_blank"
                      className="text-xs bg-[#221F1C] text-white px-3 py-1.5 rounded-sm hover:bg-black transition-colors"
                    >
                      View Flipbook
                    </a>
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
