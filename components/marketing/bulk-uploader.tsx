"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { createClient } from "@supabase/supabase-js"
import { AICaptionButton } from "@/components/ui/ai-caption-button"
import { updateEnquiryUploadStatus } from "@/app/actions/enquiries"
import CloudLoader from "@/components/ui/quantum-cloud-loader"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

type UploadFile = {
  file: File
  id: string
  status: "pending" | "uploading" | "success" | "error"
  progress: number
  caption?: string
  finalPath?: string
}

export function BulkUploader({ token, enquiryName }: { token: string; enquiryName: string }) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const newFiles = Array.from(e.target.files).map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      status: "pending" as const,
      progress: 0,
      caption: ""
    }))
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const updateCaption = (id: string, caption: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, caption } : f))
  }

  const startUpload = async () => {
    if (files.length === 0) return
    setIsUploading(true)

    let completed = 0
    const batchSize = 3
    const pendingFiles = files.filter(f => f.status === "pending" || f.status === "error")
    
    for (let i = 0; i < pendingFiles.length; i += batchSize) {
      const batch = pendingFiles.slice(i, i + batchSize)
      
      await Promise.all(batch.map(async (f) => {
        setFiles(prev => prev.map(pf => pf.id === f.id ? { ...pf, status: "uploading" } : pf))
        
        try {
          const fileExt = f.file.name.split('.').pop()
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
          const filePath = `customer_uploads/${token}/${fileName}`

          const { error } = await supabase.storage
            .from("images")
            .upload(filePath, f.file, {
              cacheControl: '3600',
              upsert: false
            })

          if (error) throw error

          setFiles(prev => prev.map(pf => pf.id === f.id ? { ...pf, status: "success", progress: 100, finalPath: filePath } : pf))
        } catch (err) {
          console.error("Upload error for file", f.file.name, err)
          setFiles(prev => prev.map(pf => pf.id === f.id ? { ...pf, status: "error" } : pf))
        } finally {
          completed++
          setOverallProgress(Math.round((completed / pendingFiles.length) * 100))
        }
      }))
    }
    
    try {
      let hasSuccess = false;
      setFiles(prev => {
        const successFiles = prev.filter(f => f.status === "success" && f.caption && f.finalPath);
        if (successFiles.length > 0) {
          hasSuccess = true;
          const captionsMap = successFiles.reduce((acc, f) => {
            if (f.finalPath) {
              acc[f.finalPath] = f.caption || "";
            }
            return acc;
          }, {} as Record<string, string>);
          
          const blob = new Blob([JSON.stringify(captionsMap, null, 2)], { type: 'application/json' });
          const captionsPath = `customer_uploads/${token}/captions_${Date.now()}.json`;
          
          supabase.storage.from("images").upload(captionsPath, blob, { upsert: false })
            .catch(e => console.error("Failed to upload captions json", e));
        }
        return prev;
      });

      // Update backend status
      try {
        await updateEnquiryUploadStatus(token, "completed")
      } catch (e) {
        console.error("Failed to update enquiry status:", e)
        alert("Upload successful, but failed to notify admin. Please contact support.")
      }
      setIsComplete(true);

    } catch(e) {}

    setIsUploading(false)
  }

  const successCount = files.filter(f => f.status === "success").length
  const pendingCount = files.filter(f => f.status === "pending").length
  const errorCount = files.filter(f => f.status === "error").length

  if (isComplete) {
    return (
      <div className="bg-white p-12 border border-[#E0D9CF] shadow-sm rounded-sm text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-[#4B6B4F]/10 text-[#4B6B4F] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-serif text-3xl text-[#221F1C] mb-4">Upload Successful!</h2>
        <p className="text-[#6B6259] max-w-md mx-auto mb-8 text-lg">
          Thank you, {enquiryName}. We have received your {successCount} photos along with your captions.
        </p>
        <p className="text-sm text-[#9A8F85]">
          Our design team will now start crafting your beautiful magazine. We will reach out to you on WhatsApp with the preview soon!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 border border-[#E0D9CF] shadow-sm rounded-sm">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl text-[#221F1C] mb-2">Upload Photos for {enquiryName}</h2>
        <p className="text-[#6B6259]">Select all the photos you want us to include in your magazine. You can select multiple photos at once.</p>
      </div>

      {!isUploading && (
        <div className="mb-8 relative border-2 border-dashed border-[#E0D9CF] rounded-sm p-12 text-center hover:bg-[#FBF6EE] transition-colors cursor-pointer">
          <input 
            type="file" 
            multiple 
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-4">
            <svg className="w-12 h-12 text-[#C1502E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="font-medium text-[#221F1C]">Click or drag photos here to upload</span>
            <span className="text-sm text-[#9A8F85]">High resolution JPEG/PNG recommended</span>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E0D9CF]">
            <h3 className="font-serif text-lg">Selected Photos ({files.length})</h3>
            <div className="text-sm">
              <span className="text-[#4B6B4F] mr-4">{successCount} Uploaded</span>
              {errorCount > 0 && <span className="text-[#A5322A]">{errorCount} Failed</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto p-2">
            {files.map(f => (
              <div key={f.id} className="flex flex-col bg-[#FBF6EE] rounded-sm overflow-hidden border border-[#E0D9CF]">
                {/* Image Preview */}
                <div className="relative aspect-video group bg-black/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={URL.createObjectURL(f.file)} 
                    alt={f.file.name} 
                    className="w-full h-full object-contain" 
                  />
                  
                  {/* Status Overlay */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/40 ${f.status === 'success' ? 'opacity-100 bg-black/20' : f.status === 'error' ? 'opacity-100 bg-red-900/40' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                    {f.status === "pending" && !isUploading && (
                      <button 
                        onClick={() => removeFile(f.id)}
                        className="bg-white/90 text-red-600 w-8 h-8 rounded-full flex items-center justify-center text-xl hover:bg-white transition-colors"
                      >
                        ×
                      </button>
                    )}
                    {f.status === "uploading" && (
                      <span className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded">Uploading...</span>
                    )}
                    {f.status === "success" && (
                      <span className="text-white bg-[#4B6B4F] p-1 rounded-full">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </span>
                    )}
                    {f.status === "error" && (
                      <span className="text-white text-xs font-mono bg-[#A5322A] px-2 py-1 rounded text-center">Failed</span>
                    )}
                  </div>
                </div>

                {/* Caption Area */}
                <div className="p-4 flex flex-col gap-3 bg-white border-t border-[#E0D9CF] flex-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider">Caption (Optional)</label>
                    <AICaptionButton onSelect={(caption) => updateCaption(f.id, caption)} />
                  </div>
                  <textarea
                    value={f.caption || ""}
                    onChange={(e) => updateCaption(f.id, e.target.value)}
                    disabled={f.status !== "pending" && f.status !== "error"}
                    placeholder="Write a caption for this photo..."
                    className="w-full text-sm border border-[#E0D9CF] p-2 rounded-sm resize-none focus:outline-none focus:border-[#C1502E] disabled:bg-gray-50 disabled:text-gray-500"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          {isUploading ? (
            <div className="space-y-3 py-4">
              <CloudLoader />
              <div className="h-1.5 bg-[#F5F0E8] rounded-full overflow-hidden -mt-4">
                <div 
                  className="h-full bg-[#C1502E] transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p className="text-center text-xs font-mono text-[#9A8F85]">
                Uploading your memories... {overallProgress}% &nbsp;·&nbsp; Please don't close this page
              </p>
            </div>
          ) : (
            <div className="flex justify-end pt-4 border-t border-[#E0D9CF]">
              <button
                onClick={startUpload}
                disabled={files.length === 0 || pendingCount === 0}
                className="bg-[#C1502E] text-white px-8 py-3 rounded-sm hover:bg-[#A5411F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {errorCount > 0 ? "Retry Failed Uploads" : `Start Upload (${pendingCount} files)`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
