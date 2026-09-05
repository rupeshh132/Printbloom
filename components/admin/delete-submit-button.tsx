"use client"
import * as React from "react"
import { useFormStatus } from "react-dom"

export function DeleteSubmitButton({ 
  itemName, 
  className = "text-xs text-red-600 hover:underline",
  children = "Delete"
}: { 
  itemName: string, 
  className?: string,
  children?: React.ReactNode
}) {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(`Are you sure you want to delete ${itemName}? This action cannot be undone.`)) {
          e.preventDefault()
        }
      }}
      className={className}
      title={`Delete ${itemName}`}
    >
      {pending ? "..." : children}
    </button>
  )
}
