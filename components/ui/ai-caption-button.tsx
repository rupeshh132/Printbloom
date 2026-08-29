"use client"

import * as React from "react"
import { useState } from "react"
import { generateCaptions } from "@/app/actions/ai"
import CloudLoader from "@/components/ui/quantum-cloud-loader"

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
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-xs font-medium text-[#C1502E] bg-[#FBF6EE] px-3 py-1.5 rounded-sm border border-[#E0D9CF] hover:bg-[#F5F0E8] transition-colors whitespace-nowrap"
      >
        <span>✨</span> Write with AI
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#221F1C]/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-[#E0D9CF] bg-[#FBF6EE]">
              <h4 className="font-serif text-lg text-[#221F1C] flex items-center gap-2">
                <span>✨</span> AI Caption Writer
              </h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#9A8F85] hover:text-[#221F1C] text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6">
              {!options.length && (
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#221F1C] mb-2">
                      What's happening in this photo?
                    </label>
                    <textarea
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="e.g. Goa trip, crazy friends, sunset..."
                      className="w-full text-base border border-[#E0D9CF] bg-[#FBF6EE]/30 p-3 rounded-sm resize-none focus:outline-none focus:border-[#C1502E]"
                      rows={3}
                      autoFocus
                    />
                  </div>
                  {loading ? (
                    <div className="py-2">
                      <CloudLoader />
                      <p className="text-center text-xs text-[#9A8F85] -mt-6">Writing your captions...</p>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={!keywords.trim()}
                      className="w-full bg-[#221F1C] text-white text-sm py-3 rounded-sm disabled:opacity-50 hover:bg-black transition-colors font-medium"
                    >
                      Generate Magic ✨
                    </button>
                  )}
                  {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
                </form>
              )}

              {options.length > 0 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-[#221F1C] mb-2">Select a caption:</p>
                  <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                    {options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(opt)}
                        className="text-left text-sm bg-[#FBF6EE] hover:bg-[#F5F0E8] border border-[#E0D9CF] p-4 rounded-sm text-[#221F1C] transition-colors leading-relaxed group"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <span>{opt}</span>
                          <span className="opacity-0 group-hover:opacity-100 text-[#C1502E] whitespace-nowrap text-xs font-medium">Use This</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setOptions([])}
                    className="w-full text-sm text-[#9A8F85] hover:text-[#221F1C] pt-2 underline decoration-transparent hover:decoration-[#221F1C] transition-all"
                  >
                    Try different keywords
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
