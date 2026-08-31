"use client"
import * as React from "react"
import { useState } from "react"
import { MapPin, CheckCircle2, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PincodeChecker() {
  const [pincode, setPincode] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault()
    if (pincode.length !== 6) return
    
    setStatus("loading")
    // Mock API call
    setTimeout(() => {
      // For now, accept all 6 digit pincodes
      setStatus("success")
    }, 800)
  }

  return (
    <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-[#E0D9CF]">
      <h3 className="font-serif text-lg text-[#221F1C]">Delivery for</h3>
      
      <form onSubmit={checkPincode} className="relative flex items-center">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter pincode to check delivery"
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, "")
            setPincode(val)
            if (status !== "idle") setStatus("idle")
          }}
          className="w-full h-12 border border-[#E0D9CF] rounded-sm pl-4 pr-12 focus:outline-none focus:border-[#DFBC94] text-sm bg-white"
        />
        <button
          type="button"
          className="absolute right-3 text-[#DFBC94]"
          title="Detect my location"
        >
          <MapPin className="w-5 h-5" />
        </button>
      </form>

      {status === "success" && (
        <div className="flex flex-col gap-3 text-sm text-[#4B6B4F] bg-[#F5F0E8] p-4 rounded-sm border border-[#E0D9CF]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#4B6B4F]" />
            <span>Delivered in <strong>7-15 Days</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#4B6B4F]" />
            <span>Flat delivery charge <strong>₹60</strong>.</span>
          </div>
        </div>
      )}
    </div>
  )
}
