import { getEnquiryByToken, getEnquiryUploads } from "@/app/actions/enquiries"
import { getFlipbooksByEnquiry } from "@/app/actions/flipbooks"
import { notFound } from "next/navigation"
import { SectionHeading } from "@/components/ui/section-heading"
import NextLink from "next/link"
import { PhotoCard } from "@/components/admin/photo-card"
import { DeleteUploadsButton } from "@/components/admin/delete-uploads-button"

export default async function EnquiryUploadsViewer({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  
  const [enquiry, uploads, flipbooks] = await Promise.all([
    getEnquiryByToken(token),
    getEnquiryUploads(token),
    getFlipbooksByEnquiry(token)
  ])

  if (!enquiry) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <NextLink href="/admin/enquiries" className="text-xs text-[#9A8F85] hover:text-[#C1502E] mb-4 inline-block tracking-wider uppercase font-medium">
          ← Back to Enquiries
        </NextLink>
        
        {/* Flipbooks Section */}
        {flipbooks.length > 0 && (
          <div className="mb-8 p-4 bg-[#FBF6EE] border border-[#E0D9CF] rounded-sm">
            <h3 className="text-sm font-serif text-[#221F1C] mb-3">Digital Flipbooks Generated</h3>
            <div className="flex flex-col gap-2">
              {flipbooks.map((fb) => (
                <div key={fb.id} className="flex justify-between items-center bg-white p-3 border border-[#E0D9CF] rounded-sm">
                  <span className="font-medium text-sm text-[#221F1C]">{fb.title}</span>
                  <a 
                    href={`/flipbook/${fb.id}`} 
                    target="_blank" 
                    className="text-xs text-white bg-[#C1502E] px-3 py-1.5 rounded-sm hover:bg-[#A5411F]"
                  >
                    View Flipbook ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <SectionHeading as="h1" className="text-[#221F1C]">
              {enquiry.name}'s Uploads
            </SectionHeading>
            <p className="text-sm text-[#9A8F85] mt-1">{uploads.files.length} photos received</p>
          </div>
          <div className="flex gap-3">
            <NextLink 
              href={`/admin/enquiries/${token}/create-flipbook`}
              className="bg-[#221F1C] text-white hover:bg-black px-4 py-2 rounded-sm text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>📕</span> Create Flipbook
            </NextLink>
            {uploads.files.length > 0 && (
              <DeleteUploadsButton token={token} count={uploads.files.length} />
            )}
          </div>
        </div>
      </div>

      {uploads.files.length === 0 ? (
        <div className="bg-white border border-[#E0D9CF] rounded-sm p-12 text-center">
          <p className="font-serif text-xl text-[#221F1C] mb-2">No photos found</p>
          <p className="text-sm text-[#9A8F85]">It seems the files were deleted or the upload failed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploads.files.map((file: any, i: number) => (
            <PhotoCard key={i} file={file} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
