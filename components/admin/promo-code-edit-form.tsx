"use client"

import { updatePromoCode } from "@/app/actions/promo-codes"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner";

export function PromoCodeEditForm({ code }: { code: any }) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await updatePromoCode(code.id, formData)
    
    if (result && result.success === false) {
      toast.error(`Failed to update: ${result.error}`)
      setIsSaving(false)
    } else {
      window.location.href = "/admin/promo-codes"
    }
  }

  return (
    <div className="bg-white p-6 border border-[#E0D9CF] rounded-sm shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">Code Name *</label>
          <input 
            type="text" 
            name="code" 
            required 
            defaultValue={code.code}
            className="w-full h-10 px-3 uppercase border border-[#E0D9CF] rounded-sm text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#221F1C]">Discount Type *</label>
          <div className="flex gap-6 items-center h-10 px-3 border border-[#E0D9CF] rounded-sm bg-[#FBF6EE]/30">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="discount_type" value="percentage" defaultChecked={code.discount_type === "percentage"} className="accent-[#DFBC94] w-4 h-4" />
              <span className="text-sm text-[#221F1C]">Percentage (%)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="discount_type" value="fixed" defaultChecked={code.discount_type === "fixed"} className="accent-[#DFBC94] w-4 h-4" />
              <span className="text-sm text-[#221F1C]">Fixed Amount (₹)</span>
            </label>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">Discount Value *</label>
          <input 
            type="number" 
            name="discount_value" 
            required 
            min="1"
            defaultValue={code.discount_value}
            className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">Expiry Date (Optional)</label>
          <input 
            type="date" 
            name="expiry_date" 
            defaultValue={code.expiry_date ? code.expiry_date.split('T')[0] : ""}
            className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">Max Uses Limit (Optional)</label>
          <input 
            type="number" 
            name="max_uses" 
            min="1"
            defaultValue={code.max_uses || ""}
            placeholder="Leave empty for unlimited"
            className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm"
          />
        </div>

        <Button type="submit" disabled={isSaving} className="w-full font-serif bg-[#221F1C] text-white hover:bg-black mt-2">
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
}
