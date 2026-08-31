"use client"

export function InvoiceActions() {
  return (
    <div className="mt-8 flex gap-4 print:hidden">
      <button 
        onClick={() => window.print()}
        className="bg-[#221F1C] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors"
      >
        Print / Save PDF
      </button>
      <button 
        onClick={() => window.close()}
        className="border border-[#E0D9CF] text-[#6B6259] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#F5F0E8] transition-colors"
      >
        Close
      </button>
    </div>
  )
}
