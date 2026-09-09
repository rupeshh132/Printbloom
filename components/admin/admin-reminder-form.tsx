"use client"

import { useState } from "react"
import { saveReminder } from "@/app/actions/reminders"
import { Button } from "@/components/ui/button"

export function AdminReminderForm() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    
    const form = e.currentTarget
    const formData = new FormData(form)
    const result = await saveReminder(formData)
    
    if (result.success) {
      form.reset()
      alert("Reminder added successfully!")
    } else {
      alert(`Error: ${result.error}`)
    }
    setIsSaving(false)
  }

  return (
    <div className="bg-white p-6 border border-[#E0D9CF] rounded-sm mt-12">
      <h3 className="font-serif text-xl text-[#221F1C] mb-4">Add Manual Reminder</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">Customer Name</label>
          <input type="text" name="customer_name" required className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm" placeholder="e.g. Rahul M." />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">WhatsApp Number</label>
          <input type="tel" name="phone_number" required className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm" placeholder="+91..." />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">Occasion Name</label>
          <input type="text" name="occasion_name" required className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm" placeholder="e.g. Anniversary" />
        </div>
        <div className="space-y-1 flex gap-2">
          <div className="w-full">
            <label className="text-xs font-medium text-[#221F1C]">Date</label>
            <input type="date" name="occasion_date" required className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm" />
          </div>
          <Button type="submit" disabled={isSaving} className="h-10 px-6 font-serif bg-[#221F1C] text-white hover:bg-black w-full mt-[18px]">
            {isSaving ? "Adding..." : "Add"}
          </Button>
        </div>
      </form>
    </div>
  )
}
