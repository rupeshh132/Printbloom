"use client"
import * as React from "react"
import { Download, Copy, Check } from "lucide-react"

export function OrderCustomizationClient({ customizations }: { customizations: any[] }) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null)

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy", err)
    }
  }

  const handleDownload = async (url: string, index: number) => {
    try {
      // Fetch the image as a blob to force download instead of opening in new tab
      const response = await fetch(url)
      const blob = await response.blob()
      
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = `printbloom_photo_${index + 1}.jpg` // Better default names
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      console.error("Failed to download image", err)
      // Fallback: open in new tab
      window.open(url, '_blank')
    }
  }

  // Calculate grid columns based on number of photos. 
  // If many photos, make it denser.
  const isDense = customizations.length > 10

  return (
    <div className={`grid gap-4 ${isDense ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3'}`}>
      {customizations.map((photo: any, index: number) => (
        <div key={index} className="border border-[#E0D9CF] rounded-sm overflow-hidden flex flex-col group bg-white shadow-sm hover:shadow-md transition-shadow">
          
          {/* Image Thumbnail */}
          <div className="relative aspect-square bg-gray-100 border-b border-[#E0D9CF]">
            <img 
              src={photo.cloudinaryUrl} 
              alt={`Photo ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            {/* Hover overlay with download */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleDownload(photo.cloudinaryUrl, index)}
                className="bg-white text-[#221F1C] p-2 rounded-full hover:scale-110 transition-transform shadow-lg"
                title="Download Photo"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Caption */}
          <div className="p-3 flex-1 flex flex-col justify-between">
            <p className="text-xs text-[#221F1C] mb-2 line-clamp-3">
              {photo.caption || <span className="text-gray-400 italic">No caption</span>}
            </p>
            
            {photo.caption && (
              <button
                onClick={() => handleCopy(photo.caption, index)}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#C1502E] hover:text-[#A04020] transition-colors mt-auto"
              >
                {copiedIndex === index ? (
                  <><Check className="w-3 h-3" /> Copied!</>
                ) : (
                  <><Copy className="w-3 h-3" /> Copy Caption</>
                )}
              </button>
            )}
          </div>

        </div>
      ))}
    </div>
  )
}
