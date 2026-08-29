"use client"
import * as React from "react"
import { Upload, X, Wand2, Loader2, Image as ImageIcon } from "lucide-react"
import imageCompression from "browser-image-compression"

export type UploadedPhoto = {
  id: string
  file: File
  previewUrl: string
  cloudinaryUrl?: string
  caption: string
  isUploading: boolean
  progress: number
  error?: string
  magicCaptions?: string[]
  isGeneratingCaption: boolean
}

interface PhotoUploaderProps {
  onPhotosChange: (photos: UploadedPhoto[]) => void
}

export function PhotoUploader({ onPhotosChange }: PhotoUploaderProps) {
  const [photos, setPhotos] = React.useState<UploadedPhoto[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  // Notify parent on change
  React.useEffect(() => {
    onPhotosChange(photos)
  }, [photos, onPhotosChange])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const newFiles = Array.from(e.target.files)
    await processFiles(newFiles)
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return
    const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"))
    await processFiles(newFiles)
  }

  const processFiles = async (files: File[]) => {
    const newUploads = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      previewUrl: URL.createObjectURL(file),
      caption: "",
      isUploading: true,
      progress: 0,
      isGeneratingCaption: false
    }))

    setPhotos(prev => [...prev, ...newUploads])

    // Upload each file
    for (const upload of newUploads) {
      uploadToCloudinary(upload)
    }
  }

  const uploadToCloudinary = async (uploadInfo: UploadedPhoto) => {
    if (!cloudName || !uploadPreset) {
      updatePhotoState(uploadInfo.id, { 
        error: "Cloudinary configuration missing", 
        isUploading: false 
      })
      return
    }

    try {
      // 1. Compress Image
      updatePhotoState(uploadInfo.id, { progress: 10 })
      
      const options = {
        maxSizeMB: 0.5, // 500 KB target
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      
      const compressedFile = await imageCompression(uploadInfo.file, options)
      updatePhotoState(uploadInfo.id, { progress: 40 })

      // 2. Upload to Cloudinary
      const formData = new FormData()
      formData.append("file", compressedFile)
      formData.append("upload_preset", uploadPreset)

      const xhr = new XMLHttpRequest()
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`)

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = 40 + (e.loaded / e.total) * 60
          updatePhotoState(uploadInfo.id, { progress: percentComplete })
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          updatePhotoState(uploadInfo.id, { 
            cloudinaryUrl: response.secure_url,
            isUploading: false,
            progress: 100
          })
        } else {
          updatePhotoState(uploadInfo.id, { 
            error: "Upload failed", 
            isUploading: false 
          })
        }
      }

      xhr.onerror = () => {
        updatePhotoState(uploadInfo.id, { 
          error: "Network error during upload", 
          isUploading: false 
        })
      }

      xhr.send(formData)

    } catch (err) {
      console.error(err)
      updatePhotoState(uploadInfo.id, { 
        error: "Compression failed", 
        isUploading: false 
      })
    }
  }

  const updatePhotoState = (id: string, updates: Partial<UploadedPhoto>) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const removePhoto = (id: string) => {
    setPhotos(prev => {
      const filtered = prev.filter(p => p.id !== id)
      // Cleanup Object URLs to avoid memory leaks
      const removed = prev.find(p => p.id === id)
      if (removed) URL.revokeObjectURL(removed.previewUrl)
      return filtered
    })
  }

  // Gemini AI Magic Caption
  const generateMagicCaption = async (id: string) => {
    const photo = photos.find(p => p.id === id)
    if (!photo) return

    updatePhotoState(id, { isGeneratingCaption: true })

    try {
      // Convert file to base64 for Gemini
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(photo.file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
      })

      const res = await fetch("/api/generate-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          imageBase64: base64, 
          mimeType: photo.file.type 
        })
      })

      const data = await res.json()

      if (data.captions) {
        updatePhotoState(id, { magicCaptions: data.captions })
      } else {
        alert(data.error || "Failed to generate captions")
      }
    } catch (e) {
      console.error(e)
      alert("Error generating magic caption")
    } finally {
      updatePhotoState(id, { isGeneratingCaption: false })
    }
  }

  return (
    <div className="w-full">
      {/* Upload Zone */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-[#C1502E]/30 rounded-xl bg-[#FBF6EE] p-8 text-center cursor-pointer hover:bg-[#F5F0E8] hover:border-[#C1502E] transition-all group mb-6"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          multiple 
          accept="image/*" 
          className="hidden" 
        />
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-[#C1502E] group-hover:scale-110 transition-transform">
          <Upload className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl text-[#221F1C] mb-2">Upload your memories</h3>
        <p className="text-sm text-[#6B6259]">Drag & drop your photos here, or click to browse</p>
        <p className="text-xs text-[#9A8F85] mt-2">Supports JPG, PNG (Max 80 photos)</p>
      </div>

      {/* Grid of uploaded photos */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-[#221F1C]">Customization ({photos.length} photos)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="border border-[#E0D9CF] rounded-lg p-3 bg-white flex gap-4 relative">
                
                {/* Remove button */}
                <button 
                  onClick={() => removePhoto(photo.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors z-10"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Preview Image */}
                <div className="w-24 h-24 flex-shrink-0 relative rounded-md overflow-hidden bg-gray-100 border border-[#E0D9CF]">
                  <img src={photo.previewUrl} alt="preview" className="w-full h-full object-cover" />
                  
                  {/* Upload overlay */}
                  {photo.isUploading && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                      <Loader2 className="w-5 h-5 text-white animate-spin mb-1" />
                      <span className="text-[10px] text-white font-medium">{Math.round(photo.progress)}%</span>
                    </div>
                  )}
                  {photo.error && (
                    <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center p-1 text-center">
                      <span className="text-[10px] text-white font-medium leading-tight">{photo.error}</span>
                    </div>
                  )}
                </div>

                {/* Controls (Caption & AI) */}
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => updatePhotoState(photo.id, { caption: e.target.value })}
                    placeholder="Add a caption..."
                    className="w-full text-sm border-b border-[#E0D9CF] focus:border-[#221F1C] bg-transparent pb-1 outline-none mb-3"
                  />
                  
                  {/* AI Options or Trigger */}
                  {photo.magicCaptions ? (
                    <div className="space-y-1">
                      {photo.magicCaptions.map((cap, idx) => (
                        <button
                          key={idx}
                          onClick={() => updatePhotoState(photo.id, { caption: cap, magicCaptions: undefined })}
                          className="block w-full text-left text-[11px] bg-[#FBF6EE] hover:bg-[#F5F0E8] text-[#6B6259] px-2 py-1.5 rounded transition-colors truncate"
                        >
                          {cap}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => generateMagicCaption(photo.id)}
                      disabled={photo.isGeneratingCaption}
                      className="flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors disabled:opacity-50 w-fit"
                    >
                      {photo.isGeneratingCaption ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Wand2 className="w-3.5 h-3.5" />
                      )}
                      ✨ Magic Caption
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
