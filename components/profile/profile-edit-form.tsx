"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import { User, Loader2, Camera } from "lucide-react"
import { updateUserProfile } from "@/app/actions/user"
import { useRouter } from "next/navigation"

type ProfileEditFormProps = {
  initialData: {
    full_name: string
    email: string
    avatar_url?: string
    phone?: string
  }
}

export function ProfileEditForm({ initialData }: ProfileEditFormProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    full_name: initialData.full_name,
    phone: initialData.phone || "",
    avatar_url: initialData.avatar_url || "",
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      
      const form = new FormData()
      form.append("file", file)
      form.append("upload_preset", uploadPreset!)

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: form,
      })
      
      const data = await res.json()
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, avatar_url: data.secure_url }))
      }
    } catch (err) {
      console.error("Upload failed", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await updateUserProfile(formData)
    
    setIsEditing(false)
    setIsLoading(false)
    router.refresh()
  }

  if (!isEditing) {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-[#221F1C]">Profile Information</h2>
          <button 
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-[#DFBC94] hover:underline"
          >
            Edit Profile
          </button>
        </div>
        
        <div className="space-y-6 max-w-lg">
          {formData.avatar_url && (
            <div className="flex justify-center md:justify-start mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#E0D9CF]">
                <Image src={formData.avatar_url} alt="Profile" fill className="object-cover" />
              </div>
            </div>
          )}
          
          <div>
            <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">Full Name</label>
            <div className="border border-[#E0D9CF] bg-[#FBF6EE] px-4 py-3 rounded-sm text-[#221F1C]">
              {formData.full_name}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">Email Address</label>
            <div className="border border-[#E0D9CF] bg-[#FBF6EE] px-4 py-3 rounded-sm text-[#221F1C] flex items-center justify-between">
              <span>{initialData.email}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Verified</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">Phone Number</label>
            <div className={`border border-[#E0D9CF] bg-white px-4 py-3 rounded-sm ${formData.phone ? 'text-[#221F1C]' : 'text-[#9A8F85] italic'}`}>
              {formData.phone || "Not provided yet. You can add it during checkout."}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-[#221F1C]">Edit Profile</h2>
        <button 
          type="button"
          onClick={() => setIsEditing(false)}
          className="text-sm font-medium text-[#9A8F85] hover:text-[#221F1C]"
        >
          Cancel
        </button>
      </div>

      <div className="flex flex-col items-center md:items-start space-y-4">
        <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider block">Profile Photo</label>
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#E0D9CF] bg-[#FBF6EE] flex items-center justify-center">
            {formData.avatar_url ? (
              <Image src={formData.avatar_url} alt="Profile" fill className="object-cover" />
            ) : (
              <User className="w-8 h-8 text-[#9A8F85]" />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageUpload}
            disabled={isLoading}
          />
        </div>
        {isLoading && <p className="text-xs text-[#DFBC94] animate-pulse">Uploading...</p>}
      </div>
      
      <div>
        <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">Full Name</label>
        <input
          type="text"
          required
          value={formData.full_name}
          onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
          className="w-full border border-[#E0D9CF] bg-white px-4 py-3 rounded-sm text-[#221F1C] focus:outline-none focus:border-[#DFBC94] transition-colors"
        />
      </div>
      
      <div>
        <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">Phone Number (Optional)</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full border border-[#E0D9CF] bg-white px-4 py-3 rounded-sm text-[#221F1C] focus:outline-none focus:border-[#DFBC94] transition-colors"
          placeholder="+91 9876543210"
        />
      </div>
      
      <div className="pt-6 border-t border-[#E0D9CF] flex justify-end gap-3">
        <button 
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-6 py-3 rounded-full font-medium border border-[#E0D9CF] text-[#6B6259] hover:bg-[#FBF6EE] transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit"
          disabled={isLoading}
          className="bg-[#221F1C] text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
             <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  )
}
