"use client"

import * as React from "react"
import { MessageCircle } from "lucide-react"
import { toast } from "sonner";

export function WhatsAppButton({ phone, customerName, flipbookLink = "" }: { phone: string, customerName: string, flipbookLink?: string }) {
  const cleanPhone = phone?.replace(/\D/g, '') || ""
  const isValidPhone = cleanPhone.length >= 10

  const handleSend = () => {
    let url: string
    if (isValidPhone) {
      url = `https://wa.me/${cleanPhone}`
    } else {
      url = `https://web.whatsapp.com/`
      toast.error(`Phone number unavailable. Opening WhatsApp Web.`)
    }
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleSend}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white rounded hover:bg-[#22bf5b] transition-colors shadow-sm"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-4 h-4" />
      <span className="text-xs font-medium">WhatsApp</span>
    </button>
  )
}
