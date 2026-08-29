"use client"
import * as React from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function SignOutButton() {
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
