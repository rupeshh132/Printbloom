"use client"

import * as React from "react"
import { useState } from "react"
import { saveReminder } from "@/app/actions/reminders"
import { SectionHeading } from "@/components/ui/section-heading"
import { FadeIn } from "@/components/ui/fade-in"

export default function RemindersPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const formData = new FormData(e.currentTarget)
    const res = await saveReminder(formData)
    
    if (res.success) {
      setSuccess(true)
      ;(e.target as HTMLFormElement).reset()
    } else {
      setError(res.error || "Failed to save reminder.")
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-20 px-4 md:px-8">
      <div className="container mx-auto max-w-xl">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl text-[#221F1C] mb-4">Never Miss a Special Day</h1>
            <p className="text-[#6B6259]">
              Save your important dates (Anniversaries, Birthdays) with us. 
              We'll send you a gentle WhatsApp reminder 20 days in advance so you have plenty of time to create a custom memory.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#E0D9CF] shadow-sm rounded-sm">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#4B6B4F]/10 text-[#4B6B4F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-[#221F1C] mb-2">Saved Successfully</h3>
                <p className="text-[#6B6259] mb-6">We'll remind you 20 days before the occasion!</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-sm text-[#C1502E] font-medium hover:underline"
                >
                  + Add another date
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#221F1C] mb-2">Your Name</label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    className="w-full text-base border border-[#E0D9CF] bg-transparent p-3 rounded-sm focus:outline-none focus:border-[#C1502E]"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#221F1C] mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    required
                    className="w-full text-base border border-[#E0D9CF] bg-transparent p-3 rounded-sm focus:outline-none focus:border-[#C1502E]"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#221F1C] mb-2">Occasion Name</label>
                  <input
                    type="text"
                    name="occasion_name"
                    required
                    className="w-full text-base border border-[#E0D9CF] bg-transparent p-3 rounded-sm focus:outline-none focus:border-[#C1502E]"
                    placeholder="Wife's Birthday, 1st Anniversary..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#221F1C] mb-2">Occasion Date</label>
                  <input
                    type="date"
                    name="occasion_date"
                    required
                    className="w-full text-base border border-[#E0D9CF] bg-transparent p-3 rounded-sm focus:outline-none focus:border-[#C1502E]"
                  />
                  <p className="text-xs text-[#9A8F85] mt-2">The year doesn't matter for recurring events like birthdays.</p>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C1502E] text-white py-4 rounded-sm hover:bg-[#A5411F] transition-colors font-serif text-lg tracking-wide disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Set Reminder"}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
