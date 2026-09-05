"use client"

import { usePathname } from "next/navigation"

export function WhatsAppFloat() {
  const pathname = usePathname()
  
  if (pathname?.startsWith("/admin")) {
    return null
  }

  const phoneNumber = "918691094045" // Official PrintBloom number
  const message = encodeURIComponent("Hi PrintBloom! I need help with my custom memory gift. 🤍")
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with PrintBloom on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-[#221F1C] text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-lg">
        Chat with us on WhatsApp
        <span className="absolute top-full right-4 border-4 border-transparent border-t-[#221F1C]" />
      </span>

      <span className="relative flex items-center justify-center w-16 h-16 hover:scale-110 transition-transform duration-300 drop-shadow-2xl">
        <img 
          src="/images/whatsapp-icon.png" 
          alt="WhatsApp"
          className="w-full h-full object-contain"
        />
      </span>
    </a>
  )
}
