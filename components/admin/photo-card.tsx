"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"

interface PhotoCardProps {
  file: {
    name: string
    url: string
    caption: string | null
  }
  index: number
}

export function PhotoCard({ file, index }: PhotoCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!file.caption) return
    try {
      await navigator.clipboard.writeText(file.caption)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text", err)
    }
  }

  // Supabase public URLs support the ?download parameter to force a download response
  const downloadUrl = `${file.url}?download=${encodeURIComponent(file.name)}`

  return (
    <div className="bg-white border border-[#E0D9CF] rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative aspect-square bg-[#FBF6EE] border-b border-[#E0D9CF] overflow-hidden">
        <Image 
          src={file.url} 
          alt={`Photo ${index + 1}`} 
          fill 
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Hover Overlay with Download Action */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
          <a 
            href={downloadUrl}
            target="_blank" // Fallback if download doesn't trigger inline
            download
            className="bg-white text-[#221F1C] px-4 py-2 rounded-sm font-medium text-sm flex items-center gap-2 hover:bg-[#F5F0E8] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download HD
          </a>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] uppercase tracking-widest text-[#9A8F85] font-medium">
            Photo {index + 1}
          </span>
          {file.caption && (
            <button 
              onClick={handleCopy}
              className={`text-[10px] uppercase tracking-wider font-medium flex items-center gap-1 px-2 py-1 rounded-sm transition-colors ${copied ? 'bg-green-100 text-green-700' : 'bg-[#FBF6EE] text-[#C1502E] hover:bg-[#E0D9CF]'}`}
            >
              {copied ? (
                <>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  Copy Text
                </>
              )}
            </button>
          )}
        </div>
        
        {file.caption ? (
          <p className="text-sm text-[#221F1C] leading-relaxed italic border-l-2 border-[#C1502E] pl-3 flex-1">
            "{file.caption}"
          </p>
        ) : (
          <p className="text-sm text-[#9A8F85] italic flex-1">No caption provided.</p>
        )}
      </div>
    </div>
  )
}
