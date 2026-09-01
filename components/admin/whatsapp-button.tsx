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
  const isInvalid = !cleanPhone || cleanPhone.length < 10

  const templates: WhatsAppTemplate[] = [
    {
      label: "Send Flipbook Link",
      text: `Hi ${customerName}, aapka PrintBloom Flipbook preview ready hai! âœ¨ \nYahan check karein: ${flipbookLink || "[Paste Link Here]"}\n\nKripya isko review karein aur agar sab perfect hai toh 'Approve' likh kar reply karein taaki hum printing process start kar sakein.`
    },
    {
      label: "Dispatch Update",
      text: `Hi ${customerName}, Good News! ðŸšš Aapka PrintBloom order dispatch ho gaya hai. \n\nTracking Link: [Paste Tracking Link]\n\nUmeed hai aapko gift pasand aayega! â¤ï¸`
    },
    {
      label: "Request High-Quality Photos",
      text: `Hi ${customerName}, humein aapke PrintBloom order par work start karna hai. Lekin kuch photos ki quality thodi low hai. \n\nKya aap unhe dubara as a 'Document' bhej sakte hain taaki print quality ekdum premium aaye?`
    }
  ]

  const handleSend = (text: string) => {
    if (isInvalid) {
      alert("Invalid phone number")
      return
    }
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isInvalid}
        className="bg-[#E6F4EA] text-[#25D366] hover:bg-[#D4EED9] border border-[#CDE5D2] px-2.5 py-1.5 rounded-sm text-xs font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E0D9CF] rounded-sm shadow-lg z-50 overflow-hidden">
            <div className="p-2 bg-[#FBF6EE] border-b border-[#E0D9CF]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#9A8F85]">Select Template</span>
            </div>
            <div className="flex flex-col">
              {templates.map((t, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(t.text)}
                  className="text-left px-4 py-3 text-sm text-[#221F1C] hover:bg-[#FBF6EE] border-b border-[#E0D9CF] last:border-0 transition-colors"
                >
                  {t.label}
                </button>
              ))}
              <button
                onClick={() => handleSend(`Hi ${customerName}, `)}
                className="text-left px-4 py-3 text-sm text-[#9A8F85] hover:bg-[#FBF6EE] transition-colors"
              >
                Custom Message...
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
