"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function ImageUploader({ onUploadSuccess }: { onUploadSuccess?: (url: string) => void }) {
  const handleUpload = () => {
    // This will integrate with next-cloudinary or direct Cloudinary widget in the future.
    alert("Cloudinary upload widget will open here.");
    if (onUploadSuccess) {
      onUploadSuccess("https://placeholder.image.url/printbloom");
    }
  }

  return (
    <div className="border-2 border-dashed border-border-subtle p-8 text-center rounded-sm bg-surface">
      <p className="text-text-muted mb-4 font-mono text-sm">Drag and drop images or click to upload</p>
      <Button variant="outline" onClick={handleUpload}>
        Upload to Cloudinary
      </Button>
    </div>
  )
}