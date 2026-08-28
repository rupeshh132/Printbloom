import { getEnquiryByToken, getEnquiryUploads } from "@/app/actions/enquiries"
import { notFound } from "next/navigation"
import { SectionHeading } from "@/components/ui/section-heading"
import NextLink from "next/link"
import Image from "next/image"

export default async function EnquiryUploadsViewer({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  
  const [enquiry, uploads] = await Promise.all([
    getEnquiryByToken(token),
    getEnquiryUploads(token)
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
        <SectionHeading as="h1" className="text-[#221F1C]">
          {enquiry.name}'s Uploads
        </SectionHeading>
        <p className="text-sm text-[#9A8F85] mt-1">{uploads.files.length} photos received</p>
      </div>

      {uploads.files.length === 0 ? (
        <div className="bg-white border border-[#E0D9CF] rounded-sm p-12 text-center">
          <p className="font-serif text-xl text-[#221F1C] mb-2">No photos found</p>
          <p className="text-sm text-[#9A8F85]">It seems the files were deleted or the upload failed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploads.files.map((file: any, i: number) => (
            <div key={i} className="bg-white border border-[#E0D9CF] rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-square bg-gray-100 border-b border-[#E0D9CF]">
                <Image 
                  src={file.url} 
                  alt={`Photo ${i+1}`} 
                  fill 
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-[#9A8F85] font-medium mb-2">
                  Photo {i + 1}
                </span>
                {file.caption ? (
                  <p className="text-sm text-[#221F1C] leading-relaxed italic border-l-2 border-[#C1502E] pl-3">
                    "{file.caption}"
                  </p>
                ) : (
                  <p className="text-sm text-[#9A8F85] italic">No caption provided.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
