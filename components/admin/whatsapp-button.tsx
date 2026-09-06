"use client"

import * as React from "react"
import { MessageCircle } from "lucide-react"

type WhatsAppTemplate = {
  label: string
  text: string
}

export function WhatsAppButton({ phone, customerName, flipbookLink = "" }: { phone: string, customerName: string, flipbookLink?: string }) {
  const [isOpen, setIsOpen] = React.useState(false)

  const cleanPhone = phone?.replace(/\D/g, '') || ""
  // Consider valid if has 10+ digits
  const isValidPhone = cleanPhone.length >= 10

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://printbloom.vercel.app'
  const templates: WhatsAppTemplate[] = [
    {
      label: "🛒 Abandoned Cart Follow-up",
      text: `Hi ${customerName}! 👋 \n\nWe noticed you added some items to your PrintBloom cart but haven't completed your order yet.\n\nDo you need any help? We'd be happy to assist you! 😊\n\nYou can complete your order by clicking here: ${siteUrl}`
    },
    {
      label: "✨ Special Offer",
      text: `Hi ${customerName}! ✨ \n\nWe have a special offer just for you! Place your order today to claim an exclusive discount. 🎁\n\nThis is a limited-time offer, so hurry! 🏃‍♂️\n\n${siteUrl}`
    },
    {
      label: "📦 Send Flipbook Link",
      text: `Hi ${customerName}, your PrintBloom Flipbook preview is ready! ✨ \n\nYou can check it out here: ${flipbookLink || "[Paste Link Here]"}\n\nPlease review it, and if everything looks perfect, reply with 'Approve' so we can begin the printing process.`
    },
    {
      label: "🚚 Dispatch Update",
      text: `Hi ${customerName}, Good News! 🚚 Your PrintBloom order has been dispatched. \n\nTracking Link: [Paste Tracking Link]\n\nWe hope you love your gift! ❤️`
    },
    {
      label: "📸 Request Better Photos",
      text: `Hi ${customerName}, we're ready to start working on your PrintBloom order! However, we noticed that a few of the uploaded photos are of low resolution. \n\nCould you please resend them as a 'Document' on WhatsApp? This ensures the final print quality is absolutely premium.`
    }
  ]

  const handleSend = (text: string) => {
    let url: string
    if (isValidPhone) {
      url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
    } else {
      // No phone — just open WhatsApp web with the message ready to copy
      url = `https://web.whatsapp.com/`
      alert(`Phone number unavailable. Opening WhatsApp Web.\n\nMessage to send:\n\n${text}`)
    }
    window.open(url, "_blank")
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] text-white hover:bg-[#128C7E] px-3 py-1.5 rounded-sm text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span>WhatsApp</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E0D9CF] rounded-sm shadow-xl z-50 overflow-hidden">
            <div className="p-3 bg-[#25D366] flex items-center gap-2">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span className="text-white text-xs font-semibold uppercase tracking-wider">
                {isValidPhone ? `+91 ${cleanPhone.slice(-10)}` : customerName}
              </span>
            </div>
            <div className="flex flex-col max-h-64 overflow-y-auto">
              {templates.map((t, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(t.text)}
                  className="text-left px-4 py-3 text-sm text-[#221F1C] hover:bg-[#FBF6EE] border-b border-[#F0EBE3] last:border-0 transition-colors"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
