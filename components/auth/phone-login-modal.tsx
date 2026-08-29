"use client"
import * as React from "react"
import { useState } from "react"
import { useUIStore } from "@/store/use-ui-store"
import { X, Smartphone } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function PhoneLoginModal() {
  const { isAuthModalOpen, closeAuthModal } = useUIStore()
  
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!isAuthModalOpen) return null

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Basic validation
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }

    setLoading(true)
    
    // Format phone with +91 for India if no country code provided
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`
    
    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setStep("otp")
      setSuccess("OTP sent successfully to your phone!")
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (otp.length < 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setLoading(true)
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`
    
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms'
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else if (data.user) {
      // Success!
      closeAuthModal()
      setStep("phone")
      setPhone("")
      setOtp("")
    }
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
          <h2 className="font-serif text-xl text-[#221F1C]">Log In / Sign Up</h2>
          <button onClick={closeAuthModal} className="text-[#9A8F85] hover:text-[#C1502E]">
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
          
          {success && step === "otp" && (
            <div className="bg-green-50 text-green-700 text-sm p-3 rounded-sm mb-4 border border-green-100">
              {success}
            </div>
          )}

          {step === "phone" ? (
            <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#6B6259]">Enter your phone number to login</label>
                <div className="flex relative">
                  <span className="absolute left-0 top-0 bottom-0 flex items-center px-3 border border-r-0 border-[#E0D9CF] bg-[#F5F0E8] rounded-l-sm text-[#6B6259] text-sm">
                    +91
                  </span>
                  <input 
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="Mobile Number"
                    className="w-full h-12 pl-14 pr-4 border border-[#E0D9CF] rounded-sm focus:outline-none focus:border-[#C1502E] bg-white transition-colors"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading || phone.length < 10}
                className="w-full h-12 mt-2 bg-[#9A8F85] text-white font-medium rounded-full hover:bg-[#221F1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Get OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#6B6259]">Enter the 6-digit OTP sent to {phone}</label>
                <input 
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="• • • • • •"
                  className="w-full h-12 px-4 text-center tracking-[0.5em] text-xl border border-[#E0D9CF] rounded-sm focus:outline-none focus:border-[#C1502E] bg-white transition-colors"
                  autoFocus
                />
              </div>

              <button 
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full h-12 mt-2 bg-[#221F1C] text-white font-medium rounded-full hover:bg-[#C1502E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>
              
              <button 
                type="button"
                onClick={() => {
                  setStep("phone")
                  setSuccess("")
                  setError("")
                }}
                className="text-sm text-[#C1502E] hover:underline mt-2"
              >
                Change Phone Number
              </button>
            </form>
          )}

          <div className="mt-8 text-center border-t border-[#E0D9CF] pt-6">
            <p className="text-xs text-[#9A8F85]">
              By continuing, you agree to our Terms of Service & Privacy Policy.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
