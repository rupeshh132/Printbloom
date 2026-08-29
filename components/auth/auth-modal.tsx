"use client"
import * as React from "react"
import { useState } from "react"
import { useUIStore } from "@/store/use-ui-store"
import { X, Mail, Lock, User as UserIcon } from "lucide-react"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"

export function AuthModal() {
  const supabase = createSupabaseBrowserClient()
  const { isAuthModalOpen, closeAuthModal } = useUIStore()
  
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!isAuthModalOpen) return null

  const resetForm = () => {
    setName("")
    setEmail("")
    setPassword("")
    setError("")
    setSuccess("")
  }

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login")
    resetForm()
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
          }
        }
      })

      if (error) {
        setError(error.message)
      } else if (data.user?.identities?.length === 0) {
        setError("User already exists with this email address.")
      } else {
        setSuccess("Account created successfully! You can now log in.")
        setMode("login")
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        setError("Invalid email or password.")
      } else if (data.user) {
        // Success!
        closeAuthModal()
        resetForm()
        window.location.href = "/profile" // Force a hard navigation to profile to ensure server components update
      }
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={closeAuthModal} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E0D9CF]">
          <h2 className="font-serif text-xl text-[#221F1C]">
            {mode === "login" ? "Log In" : "Create Account"}
          </h2>
          <button onClick={() => { closeAuthModal(); resetForm(); }} className="text-[#9A8F85] hover:text-[#C1502E]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-sm mb-4 border border-red-100">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-700 text-sm p-3 rounded-sm mb-4 border border-green-100">
              {success}
            </div>
          )}

          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            
            {mode === "signup" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#6B6259]">Full Name</label>
                <div className="flex relative">
                  <span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-[#9A8F85]">
                    <UserIcon className="w-4 h-4" />
                  </span>
                  <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-12 pl-10 pr-4 border border-[#E0D9CF] rounded-sm focus:outline-none focus:border-[#C1502E] bg-white transition-colors text-sm"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#6B6259]">Email Address</label>
              <div className="flex relative">
                <span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-[#9A8F85]">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 pl-10 pr-4 border border-[#E0D9CF] rounded-sm focus:outline-none focus:border-[#C1502E] bg-white transition-colors text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#6B6259]">Password</label>
              <div className="flex relative">
                <span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-[#9A8F85]">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-10 pr-4 border border-[#E0D9CF] rounded-sm focus:outline-none focus:border-[#C1502E] bg-white transition-colors text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-2 bg-[#221F1C] text-white font-medium rounded-full hover:bg-[#C1502E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? "Please wait..." : mode === "login" ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-[#E0D9CF] pt-6 flex flex-col gap-2">
            <p className="text-sm text-[#221F1C]">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button 
              type="button"
              onClick={toggleMode}
              className="text-[#C1502E] text-sm font-medium hover:underline"
            >
              {mode === "login" ? "Create an account" : "Log in instead"}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
