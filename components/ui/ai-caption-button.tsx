"use client"

import * as React from "react"
import { useState } from "react"
import { generateCaptions } from "@/app/actions/ai"

interface AICaptionButtonProps {
  onSelect: (caption: string) => void
}

export function AICaptionButton({ onSelect }: AICaptionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [keywords, setKeywords] = useState("")
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<string[]>([])
  const [error, setError] = useState("")

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!keywords.trim()) return

    setLoading(true)
    setError("")
    setOptions([])

    const res = await generateCaptions(keywords)
    if (res.error) {
      setError(res.error)
    } else if (res.options) {
      setOptions(res.options)
    }
    setLoading(false)
  }

  const handleSelect = (caption: string) => {
    onSelect(caption)
    setIsOpen(false)
    // reset state
    setKeywords("")
    setOptions([])
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs font-medium text-[#C1502E] bg-[#FBF6EE] px-3 py-1.5 rounded-sm border border-[#E0D9CF] hover:bg-[#F5F0E8] transition-colors"
      >
        <span>✨</span> Write with AI
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 lg:left-0 mt-2 w-72 bg-white border border-[#E0D9CF] shadow-lg rounded-sm p-4 z-50">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-serif text-[#221F1C]">AI Caption Writer</h4>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#9A8F85] hover:text-[#221F1C]"
            >
              ×
            </button>
          </div>
          
          {!options.length && (
            <form onSubmit={handleGenerate} className="space-y-3">
              <textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. Goa trip, crazy friends, sunset..."
                className="w-full text-sm border border-[#E0D9CF] bg-[#FBF6EE]/30 p-2 rounded-sm resize-none focus:outline-none focus:border-[#C1502E]"
                rows={2}
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !keywords.trim()}
                className="w-full bg-[#221F1C] text-white text-xs py-2 rounded-sm disabled:opacity-50 hover:bg-black transition-colors"
              >
                {loading ? "Generating..." : "Generate Magic ✨"}
              </button>
              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            </form>
          )}

          {options.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-[#9A8F85] mb-2">Click a caption to apply it:</p>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                {options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className="text-left text-xs bg-[#FBF6EE] hover:bg-[#F5F0E8] border border-[#E0D9CF] p-2 rounded-sm text-[#221F1C] transition-colors leading-relaxed"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setOptions([])}
                className="w-full text-xs text-[#9A8F85] hover:text-[#221F1C] pt-2"
              >
                Try different keywords
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
