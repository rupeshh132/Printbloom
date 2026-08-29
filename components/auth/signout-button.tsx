"use client"
import * as React from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  const supabase = createSupabaseBrowserClient()
  const router = useRouter()
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <button 
      onClick={handleSignOut} 
      className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors p-3 rounded-sm hover:bg-red-50 w-full"
    >
      <LogOut className="w-5 h-5" /> 
      <span>Sign Out</span>
    </button>
  )
}
