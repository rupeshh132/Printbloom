"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

export function FollowUpsSearchFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (searchTerm) {
        params.set("search", searchTerm)
      } else {
        params.delete("search")
      }
      
      router.push(`/admin/follow-ups?${params.toString()}`)
    }, 400) // 400ms debounce

    return () => clearTimeout(timer)
  }, [searchTerm, router, searchParams])

  return (
    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-sm border border-[#E0D9CF] shadow-sm max-w-md w-full focus-within:border-[#DFBC94] transition-colors mb-6">
      <Search className="w-4 h-4 text-[#9A8F85]" />
      <input 
        type="text" 
        placeholder="Search by phone, name, or email..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full text-sm focus:outline-none bg-transparent placeholder:text-[#9A8F85] text-[#221F1C]"
      />
      {searchTerm && (
        <button onClick={() => setSearchTerm("")} className="text-[#9A8F85] hover:text-[#221F1C]">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
