import { notFound } from "next/navigation"
import { getEnquiryByToken } from "@/app/actions/enquiries"
import { BulkUploader } from "@/components/marketing/bulk-uploader"

export default async function UploadPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const enquiry = await getEnquiryByToken(token)

  if (!enquiry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-[#221F1C]">PrintBloom</h1>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9A8F85] mt-2">
            Secure Photo Upload
          </p>
        </div>
        
        <BulkUploader token={token} enquiryName={enquiry.name} />
        
        <div className="mt-8 text-center text-sm text-[#9A8F85] max-w-xl mx-auto leading-relaxed">
          <p>Your photos will be securely uploaded and stored in a private folder for the PrintBloom design team. They will not be shared publicly without your explicit consent.</p>
        </div>
      </div>
    </div>
  )
}
