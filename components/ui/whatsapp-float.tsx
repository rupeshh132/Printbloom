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
      {/* Pulse ring animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 scale-100 group-hover:scale-125 transition-transform duration-500 animate-ping" />
      
      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-[#221F1C] text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-lg">
        Chat with us on WhatsApp
        <span className="absolute top-full right-4 border-4 border-transparent border-t-[#221F1C]" />
      </span>

      {/* Main button */}
      <span className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5C] rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300">
        {/* Official WhatsApp icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 175.216 175.552"
          className="w-8 h-8"
          fill="white"
        >
          <path d="M87.609 0C39.268 0 0 39.26 0 87.609c0 15.447 4.047 29.937 11.107 42.501L0 175.552l46.756-11.013C59.069 171.38 73.004 175.2 87.609 175.2c48.341 0 87.607-39.261 87.607-87.608C175.216 39.26 135.95 0 87.609 0zm0 160.268c-13.44 0-26.014-3.748-36.726-10.229l-2.638-1.564-27.358 6.441 6.546-26.742-1.721-2.745C19.365 114.664 15.433 101.501 15.433 87.609c0-39.789 32.387-72.176 72.176-72.176 39.789 0 72.176 32.387 72.176 72.176 0 39.788-32.387 72.659-72.176 72.659z"/>
          <path d="M127.765 107.36c-2.152-1.076-12.73-6.279-14.703-6.995-1.971-.716-3.405-1.076-4.839 1.076-1.434 2.152-5.555 6.995-6.81 8.429-1.255 1.434-2.51 1.613-4.662.537-2.152-1.076-9.083-3.348-17.298-10.673-6.394-5.703-10.71-12.741-11.966-14.893-1.255-2.153-.134-3.316.943-4.386.967-.963 2.152-2.511 3.228-3.766 1.076-1.255 1.434-2.152 2.152-3.586.716-1.434.358-2.69-.179-3.766-.537-1.076-4.839-11.654-6.631-15.961-1.746-4.19-3.521-3.622-4.839-3.688-.716-.045-1.614-.045-2.69-.045s-2.868.358-4.303 2.152c-1.434 1.793-5.555 5.376-5.555 13.099 0 7.723 5.555 15.178 6.272 16.254.716 1.076 10.531 17.688 26.247 24.145 3.669 1.579 6.532 2.523 8.762 3.229 3.682 1.166 7.031 1.002 9.682.607 2.952-.441 9.083-3.712 10.339-7.298 1.255-3.586 1.255-6.638.896-7.298-.358-.537-1.613-.896-3.406-1.793-.001.001-.001.001 0 0z"/>
        </svg>
      </span>
    </a>
  )
}
