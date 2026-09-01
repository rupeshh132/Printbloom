"use client"
import * as React from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

export function AdminLogoutButton() {
  const supabase = createSupabaseBrowserClient()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  
  const handleSignOut = async () => {
    setIsLoggingOut(true)
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <button 
      onClick={handleSignOut} 
      disabled={isLoggingOut}
      className="w-full text-left text-sm text-[#9A8F85] hover:text-red-400 transition-colors py-1 disabled:opacity-50"
    >
      {isLoggingOut ? "Logging out..." : "→ Logout"}
    </button>
  )
}
