"use client"

import * as React from "react"
import { useState } from "react"
import { updateFlipbookTitle } from "@/app/actions/flipbooks"
import { Edit3, Check, X } from "lucide-react"

export function EditableFlipbookTitle({ id, initialTitle }: { id: string, initialTitle: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(initialTitle || "")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!title.trim() || title === initialTitle) {
      setIsEditing(false)
      return
    }
    
    setIsSaving(true)
    const result = await updateFlipbookTitle(id, title)
    setIsSaving(false)
    
    if (result.success) {
      setIsEditing(false)
    } else {
      alert("Failed to update title")
    }
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-sm p-1.5 border border-[#DFBC94] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#DFBC94] bg-white text-[#221F1C]"
          placeholder="Flipbook title..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
            if (e.key === 'Escape') {
              setTitle(initialTitle)
              setIsEditing(false)
            }
          }}
        />
        <button onClick={handleSave} disabled={isSaving} className="text-green-600 hover:text-green-700">
          <Check className="w-4 h-4" />
        </button>
        <button 
          onClick={() => {
            setTitle(initialTitle)
            setIsEditing(false)
          }} 
          disabled={isSaving}
          className="text-red-500 hover:text-red-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
      <span className="font-medium text-[#221F1C]">{title}</span>
      <Edit3 className="w-3.5 h-3.5 text-[#9A8F85] opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}
