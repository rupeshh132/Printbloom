"use client"
import * as React from "react"
import { Download, Copy, Check, Trash2, Archive } from "lucide-react"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { deleteOrderImages } from "@/app/actions/admin-images"
import { useRouter } from "next/navigation"

export function OrderCustomizationClient({ customizations, orderItemId, orderId }: { customizations: any[], orderItemId: string, orderId: string }) {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null)
  const [isZipping, setIsZipping] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const router = useRouter()

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
      // Bypass cache to avoid CORS missing header issues from img tags
      const fetchUrl = new URL(url)
      fetchUrl.searchParams.set("t", Date.now().toString())
      
      const response = await fetch(fetchUrl.toString())
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const blob = await response.blob()
      
      let ext = "jpg"
      const match = url.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/)
      if (match) ext = match[1]
      
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = `printbloom_photo_${index + 1}.${ext}`
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

  const handleDownloadAll = async () => {
    if (customizations.length === 0) return
    setIsZipping(true)
    try {
      const zip = new JSZip()
      const folder = zip.folder("PrintBloom_Photos")
      
      const fetchPromises = customizations.map(async (photo, index) => {
        if (!photo.cloudinaryUrl) return // Skip if user didn't upload a photo for this slot
        
        try {
          // Bypassing browser cache is CRITICAL here. 
          // If the image was loaded in an <img> tag without crossOrigin="anonymous", 
          // the browser caches it without CORS headers. Fetching it again throws a CORS error.
          // Adding a unique query param forces a fresh fetch with proper CORS headers.
          const url = new URL(photo.cloudinaryUrl)
          url.searchParams.set("t", Date.now().toString())
          
          const res = await fetch(url.toString())
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
          
          const blob = await res.blob()
          
          // Extract original extension or fallback to jpg
          let ext = "jpg"
          const match = photo.cloudinaryUrl.match(/\.([a-zA-Z0-9]+)(?:[\?#]|$)/)
          if (match) ext = match[1]
            
          folder?.file(`photo_${index + 1}.${ext}`, blob)
        } catch (err) {
          console.error(`Failed to fetch photo ${index + 1}:`, err)
        }
      })
      
      await Promise.all(fetchPromises)
      
      const content = await zip.generateAsync({ type: "blob" })
      saveAs(content, `Order_${orderId.split('-')[0]}_Photos.zip`)
    } catch (err) {
      console.error("Failed to create ZIP", err)
      alert("Failed to create zip file.")
    } finally {
      setIsZipping(false)
    }
  }

  const handleDeleteAll = async () => {
    if (customizations.length === 0) return
    if (!window.confirm("Are you sure you want to delete all photos? This will remove them from Cloudinary and the database permanently.")) {
      return
    }

    setIsDeleting(true)
    try {
      const imageUrls = customizations.map(c => c.cloudinaryUrl)
      await deleteOrderImages(orderItemId, orderId, imageUrls)
      router.refresh()
    } catch (err: any) {
      console.error("Delete failed:", err)
      alert(err.message || "Failed to delete images")
    } finally {
      setIsDeleting(false)
    }
  }

  // Calculate grid columns based on number of photos. 
  // We use a minimum of 4 columns on large screens to keep cards neat.
  const isDense = customizations.length > 10

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <button 
          onClick={handleDownloadAll}
          disabled={isZipping || customizations.length === 0}
          className="flex items-center gap-2 bg-[#221F1C] text-white px-4 py-2 rounded-sm text-sm font-medium hover:bg-[#3A3530] transition-colors disabled:opacity-50"
        >
          {isZipping ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Archive className="w-4 h-4" />}
          {isZipping ? 'Zipping...' : 'Download All (ZIP)'}
        </button>
        
        <button 
          onClick={handleDeleteAll}
          disabled={isDeleting || customizations.length === 0}
          className="flex items-center gap-2 bg-white border border-red-200 text-red-600 px-4 py-2 rounded-sm text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50"
        >
          {isDeleting ? <div className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin" /> : <Trash2 className="w-4 h-4" />}
          {isDeleting ? 'Deleting...' : 'Delete All'}
        </button>
      </div>

      <div className={`grid gap-4 ${isDense ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
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
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-[#DFBC94] hover:text-[#A04020] transition-colors mt-auto"
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
    </div>
  )
}
