"use client"

import * as React from "react"
import { useState } from "react"
import { Copy, CheckCircle2 } from "lucide-react"

export function CopyUploadLink({ token, isFlipbook }: { token: string | null; isFlipbook?: boolean }) {
  const [copied, setCopied] = useState(false)

  if (!token) return <span className="text-xs text-[#9A8F85]">No token</span>

  const handleCopy = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const url = isFlipbook ? `${baseUrl}/upload/${token}?type=flipbook` : `${baseUrl}/upload/${token}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button 
      type="button"
      onClick={handleCopy}
      className="text-xs bg-[#2C2926] text-[#FBF6EE] px-2 py-1 rounded-sm hover:bg-[#DFBC94] transition-colors ml-2"
    >
      {copied ? "Copied!" : "Copy Link"}
    </button>
  )
}
