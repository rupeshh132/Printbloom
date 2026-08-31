"use client"
import * as React from "react"
import { saveEnquiryAction } from "@/app/actions/enquiries"
import { Button } from "@/components/ui/button"

export function EnquiryTab() {
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Save form reference BEFORE await — currentTarget becomes null after async
    const form = e.currentTarget
    const formData = new FormData(form)
    const result = await saveEnquiryAction(formData)

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      form.reset()
    }
  }

  if (success) {
    return (
      <div className="bg-white border border-[#E0D9CF] p-8 text-center rounded-sm">
        <h3 className="font-serif text-2xl text-[#221F1C] mb-2">Request Submitted!</h3>
        <p className="text-[#6B6259] mb-6">Thank you for your enquiry. Our team will contact you on WhatsApp shortly to discuss your custom memory gift.</p>
        <Button onClick={() => setSuccess(false)}>Submit Another Request</Button>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#E0D9CF] rounded-sm p-6 sm:p-8">
      <h2 className="font-serif text-2xl text-[#221F1C] mb-2">Custom Request</h2>
      <p className="text-[#6B6259] text-sm mb-6 pb-6 border-b border-[#E0D9CF]">
        Have a special idea? Let us know what you're looking for, and we'll craft a custom memory gift just for you.
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-[#221F1C]">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm"
              placeholder="e.g. Rahul Sharma"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="product" className="text-sm font-medium text-[#221F1C]">Product Interest *</label>
            <select
              id="product"
              name="product"
              required
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm bg-white"
            >
              <option value="">Select a product...</option>
              <option value="custom-magazine-a5">Custom Magazine (A5)</option>
              <option value="custom-magazine-a4">Custom Magazine (A4)</option>
              <option value="polaroids">Vintage Polaroids</option>
              <option value="photo-frames">Photo Frames</option>
              <option value="spotify-cards">Spotify Cards</option>
              <option value="other">Something Else</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="occasion" className="text-sm font-medium text-[#221F1C]">Occasion</label>
            <input
              type="text"
              id="occasion"
              name="occasion"
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm"
              placeholder="e.g. Anniversary, Birthday"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="requiredBy" className="text-sm font-medium text-[#221F1C]">Required By Date</label>
            <input
              type="date"
              id="requiredBy"
              name="requiredBy"
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="text-sm font-medium text-[#221F1C]">Special Requirements or Ideas</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="w-full p-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm resize-none"
            placeholder="Tell us what you have in mind..."
          ></textarea>
        </div>

        <Button type="submit" disabled={loading} className="w-full md:w-auto px-8">
          {loading ? "Sending..." : "Submit Enquiry"}
        </Button>
      </form>
    </div>
  )
}
