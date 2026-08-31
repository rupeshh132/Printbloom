"use client"

import * as React from "react"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { Download, Loader2 } from "lucide-react"

export function BulkDownloadButton({ files, customerName }: { files: any[], customerName: string }) {
  const [isDownloading, setIsDownloading] = React.useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const zip = new JSZip()
      const folder = zip.folder(`PrintBloom_Order_${customerName.replace(/[^a-z0-9]/gi, '_')}`)

      if (!folder) throw new Error("Could not create folder")

      const promises = files.map(async (file, index) => {
        try {
          const response = await fetch(file.secure_url)
          const blob = await response.blob()
          const ext = file.format || "jpg"
          const filename = file.original_filename ? `${file.original_filename}.${ext}` : `photo_${index + 1}.${ext}`
          folder.file(filename, blob)
        } catch (e) {
          console.error("Failed to download image", file.secure_url, e)
        }
      })

      await Promise.all(promises)

      const content = await zip.generateAsync({ type: "blob" })
      saveAs(content, `PrintBloom_${customerName.replace(/[^a-z0-9]/gi, '_')}.zip`)
    } catch (error) {
      console.error("Failed to generate ZIP", error)
      alert("Failed to generate ZIP file.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="bg-[#221F1C] text-white hover:bg-black px-4 py-2 rounded-sm text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
    >
      {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      <span>{isDownloading ? "Zipping..." : "Download ZIP"}</span>
    </button>
  )
}
