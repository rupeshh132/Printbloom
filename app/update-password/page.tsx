"use client"
import * as React from "react"
import { useState, useEffect } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"
import { Navbar } from "@/components/marketing/navbar"
import { Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    // Check if the user is actually in a password recovery session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        // If they just navigated here without the hash fragment, redirect
        // Note: Supabase automatically handles the hash fragment and logs them in
        router.push("/")
      }
    }
    checkSession()
  }, [router, supabase.auth])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push("/profile")
      }, 2000)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#FBF6EE]">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-md shadow-sm border border-[#E0D9CF] overflow-hidden">
          
          <div className="p-6 border-b border-[#E0D9CF] text-center">
            <h1 className="font-serif text-2xl text-[#221F1C]">Set New Password</h1>
            <p className="text-[#6B6259] text-sm mt-2">Enter your new password below to regain access to your account.</p>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-sm mb-6 border border-red-100">
                {error}
              </div>
            )}

            {success ? (
              <div className="text-center">
                <div className="bg-green-50 text-green-700 text-sm p-4 rounded-sm border border-green-100 mb-6">
                  Your password has been successfully updated!
                </div>
                <p className="text-[#6B6259] text-sm">Redirecting to your profile...</p>
              </div>
            ) : (
              <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#6B6259]">New Password</label>
                  <div className="flex relative">
                    <span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-[#9A8F85]">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 pl-10 pr-12 border border-[#E0D9CF] rounded-sm focus:outline-none focus:border-[#DFBC94] bg-white transition-colors text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 bottom-0 flex items-center pr-3 text-[#9A8F85] hover:text-[#DFBC94] transition-colors"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#6B6259]">Confirm New Password</label>
                  <div className="flex relative">
                    <span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-[#9A8F85]">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-12 pl-10 pr-12 border border-[#E0D9CF] rounded-sm focus:outline-none focus:border-[#DFBC94] bg-white transition-colors text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-0 top-0 bottom-0 flex items-center pr-3 text-[#9A8F85] hover:text-[#DFBC94] transition-colors"
                    >
                      {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 mt-4 bg-[#221F1C] text-white font-medium rounded-full hover:bg-[#DFBC94] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
