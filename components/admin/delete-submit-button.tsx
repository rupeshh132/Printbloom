"use client"
import * as React from "react"
import { useFormStatus } from "react-dom"
import { useConfirmStore } from "@/store/use-confirm-store"

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
  const { openConfirmModal } = useConfirmStore()
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      onClick={(e) => {
        e.preventDefault()
        const form = e.currentTarget.closest('form')
        
        openConfirmModal({
          title: "Confirm Deletion",
          message: `Are you sure you want to delete ${itemName}? This action cannot be undone.`,
          confirmText: "Delete",
          onConfirm: () => {
            if (form) form.requestSubmit()
          }
        })
      }}
      className={className}
      title={`Delete ${itemName}`}
    >
      {pending ? "..." : children}
    </button>
  )
}
