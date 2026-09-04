"use client"

import * as React from "react"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { createFlipbook } from "@/app/actions/flipbooks"
import CloudLoader from "@/components/ui/quantum-cloud-loader"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export function FlipbookCreator({ token, returnUrl }: { token: string, returnUrl?: string }) {
  const [title, setTitle] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Append new files, maintaining order
      setFiles(prev => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || files.length === 0) {
      alert("Please provide a title and at least 1 page image.")
      return
    }

    setIsUploading(true)
    setProgress(0)
    
    try {
      const uploadedUrls: string[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        
        if (!cloudName || !uploadPreset) throw new Error("Cloudinary config missing")

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", `flipbooks/${token}`);
        
        const resUpload = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (!resUpload.ok) {
          const errData = await resUpload.json()
          throw new Error(errData.error?.message || "Upload failed")
        }
        
        const data = await resUpload.json();
        uploadedUrls.push(data.secure_url)
        
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      const res = await createFlipbook(token, title, uploadedUrls)
      
      if (res.success) {
        alert("Flipbook created successfully! You can now share the link.")
        router.push(returnUrl || `/admin/enquiries/${token}`)
      } else {
        alert(`Failed to save flipbook: ${res.error}`)
      }
    } catch (err: any) {
      console.error(err)
      alert(`Error during creation: ${err.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleCreate} className="bg-white p-6 border border-[#E0D9CF] shadow-sm rounded-sm">
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#221F1C] mb-2">
          Flipbook Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Arhaan's 1st Birthday"
          className="w-full text-base border border-[#E0D9CF] bg-[#FBF6EE]/30 p-3 rounded-sm focus:outline-none focus:border-[#DFBC94]"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#221F1C] mb-2">
          Upload Pages (In Order)
        </label>
        <div className="border-2 border-dashed border-[#E0D9CF] rounded-sm p-8 text-center hover:bg-[#FBF6EE] transition-colors relative">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-[#9A8F85]">
            <span className="font-medium text-[#DFBC94]">Click to browse</span> or drag and drop images here.
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-[#221F1C] mb-3">Selected Pages ({files.length})</h4>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {files.map((file, i) => (
              <div key={i} className="relative flex-shrink-0 w-24 h-32 border border-[#E0D9CF] rounded-sm overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={URL.createObjectURL(file)} alt={`Page ${i+1}`} className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-br-sm">
                  {i + 1}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 bg-white text-red-500 w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 shadow-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isUploading ? (
        <div className="space-y-3">
          <CloudLoader />
          <div className="h-1.5 bg-[#F5F0E8] rounded-full overflow-hidden -mt-4">
            <div className="h-full bg-[#DFBC94] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-xs text-[#9A8F85]">Generating Flipbook... {progress}%</p>
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push(returnUrl || `/admin/enquiries/${token}`)}
            className="px-6 py-3 border border-[#E0D9CF] text-[#9A8F85] rounded-sm font-medium hover:bg-[#FBF6EE] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={files.length === 0 || !title.trim()}
            className="flex-1 bg-[#221F1C] text-white py-3 rounded-sm hover:bg-black transition-colors font-medium disabled:opacity-50"
          >
            Generate 3D Flipbook Link
          </button>
        </div>
      )}
    </form>
  )
}
