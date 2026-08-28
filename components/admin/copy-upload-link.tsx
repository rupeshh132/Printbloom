"use client"

import * as React from "react"
import { useState } from "react"

export function CopyUploadLink({ token }: { token: string | null }) {
  const [copied, setCopied] = useState(false)

  if (!token) return <span className="text-xs text-[#9A8F85]">No token</span>

  const handleCopy = async () => {
    const url = `${window.location.origin}/upload/${token}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button 
      type="button"
      onClick={handleCopy}
      className="text-xs bg-[#2C2926] text-[#FBF6EE] px-2 py-1 rounded-sm hover:bg-[#C1502E] transition-colors ml-2"
    >
      {copied ? "Copied!" : "Copy Link"}
    </button>
  )
}
