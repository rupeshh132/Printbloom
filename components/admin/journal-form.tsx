"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createJournalEntry } from "@/app/actions/journal"
import { UploadCloud, Image as ImageIcon, Film } from "lucide-react"

export function JournalForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mediaUrl, setMediaUrl] = useState("")
  const [mediaType, setMediaType] = useState<"image" | "video">("image")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)
    
    // Auto-detect type
    if (file.type.startsWith('video/')) {
      setMediaType('video')
    } else {
      setMediaType('image')
    }

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", "Printbloom")
      formData.append("cloud_name", "gnltrlq1")
      
      const resourceType = file.type.startsWith('video/') ? 'video' : 'image'

      const res = await fetch(`https://api.cloudinary.com/v1_1/gnltrlq1/${resourceType}/upload`, {
        method: "POST",
        body: formData
      })

      const data = await res.json()
      if (data.secure_url) {
        setMediaUrl(data.secure_url)
      } else {
        throw new Error(data.error?.message || "Upload failed")
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload media")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      if (mediaUrl) {
        formData.append("media_url", mediaUrl)
        formData.append("media_type", mediaType)
      }

      const result = await createJournalEntry(formData)
      if (result?.error) {
        throw new Error(result.error)
      }
      
      // Reset form
      e.currentTarget.reset()
      setMediaUrl("")
    } catch(err: any) {
      setError(err.message || "Failed to save story")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 border border-[#E0D9CF] rounded-sm shadow-sm">
      <h3 className="font-serif text-xl text-[#221F1C] mb-4">Post a Story</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">Story Title *</label>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="e.g. Anniversary Surprise for Priya" 
            className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm focus:outline-none focus:border-[#221F1C]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#221F1C]">Customer Name</label>
            <input 
              type="text" 
              name="customer_name" 
              placeholder="e.g. Rahul M." 
              className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm focus:outline-none focus:border-[#221F1C]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-[#221F1C]">Product</label>
            <input 
              type="text" 
              name="product_name" 
              placeholder="e.g. Custom Magazine" 
              className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm focus:outline-none focus:border-[#221F1C]"
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">Content *</label>
          <textarea 
            name="content" 
            required 
            rows={4}
            placeholder="Write the story here..." 
            className="w-full p-3 border border-[#E0D9CF] rounded-sm text-sm focus:outline-none focus:border-[#221F1C] resize-none"
          ></textarea>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-[#221F1C]">Media (Image or Video) *</label>
          
          {!mediaUrl ? (
            <div className="border-2 border-dashed border-[#E0D9CF] rounded-sm p-6 text-center hover:bg-[#FBF6EE] transition-colors relative">
              <input 
                type="file" 
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={loading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <UploadCloud className="w-8 h-8 text-[#9A8F85] mx-auto mb-2" />
              <p className="text-sm text-[#6D635B] font-medium">
                {loading ? "Uploading to Cloudinary..." : "Click or drag media here"}
              </p>
            </div>
          ) : (
            <div className="relative border border-[#E0D9CF] rounded-sm p-2 flex items-center gap-3 bg-[#FBF6EE]">
              {mediaType === 'video' ? <Film className="w-5 h-5 text-[#DFBC94]" /> : <ImageIcon className="w-5 h-5 text-[#DFBC94]" />}
              <span className="text-xs text-[#221F1C] font-medium truncate flex-1">Media uploaded successfully</span>
              <button 
                type="button" 
                onClick={() => setMediaUrl("")}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <Button type="submit" disabled={loading || !mediaUrl} className="w-full">
          {loading ? "Saving..." : "Publish Story"}
        </Button>
      </form>
    </div>
  )
}
