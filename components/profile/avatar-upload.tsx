"use client"

import * as React from "react"
import { useState } from "react"
import { User, Camera, Loader2 } from "lucide-react"
import { updateUserProfile } from "@/app/actions/user"
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AvatarUpload({ currentAvatar, fullName }: { currentAvatar?: string, fullName: string }) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(currentAvatar)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    // Optimistic preview
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "sz2wyygq"
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "Printbloom"
      
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)
      formData.append("cloud_name", cloudName)

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      })

      const data = await res.json()
      if (data.secure_url) {
        setPreview(data.secure_url)
        const resProfile = await updateUserProfile({ avatar_url: data.secure_url })
        if (!resProfile.success) throw new Error(resProfile.error)
        
        await supabase.auth.refreshSession();
        router.refresh();
      } else {
        throw new Error(data.error?.message || "Upload failed")
      }
    } catch (err: any) {
      console.error(err)
      setPreview(currentAvatar) // Revert on failure
      toast.error("Failed to upload profile picture.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative group cursor-pointer w-12 h-12 rounded-full overflow-hidden border border-[#E0D9CF] bg-white flex items-center justify-center flex-shrink-0">
      <input 
        type="file" 
        accept="image/*"
        onChange={handleFileUpload}
        disabled={isUploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed"
        title="Change profile picture"
      />
      
      {preview ? (
        <img src={preview} alt={fullName} className="w-full h-full object-cover" />
      ) : (
        <User className="w-6 h-6 text-[#221F1C]" />
      )}
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
        {isUploading ? (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        ) : (
          <Camera className="w-4 h-4 text-white" />
        )}
      </div>
    </div>
  )
}
