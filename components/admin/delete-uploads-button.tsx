"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteEnquiryUploads } from "@/app/actions/enquiries"

interface DeleteUploadsButtonProps {
  token: string
  count: number
}

export function DeleteUploadsButton({ token, count }: DeleteUploadsButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete all ${count} photos for this order?\n\nThis will free up Supabase storage space. This action CANNOT be undone.`
    )
    
    if (!confirmed) return

    setIsDeleting(true)
    
    try {
      const res = await deleteEnquiryUploads(token)
      if (res.success) {
        alert("All files deleted successfully. Storage has been freed.")
        router.push("/admin/enquiries")
      } else {
        alert(`Failed to delete files: ${res.error}`)
      }
    } catch (e: any) {
      alert(`Error: ${e.message}`)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting || count === 0}
      className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-sm text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete all uploads to free up storage space"
    >
      {isDeleting ? (
        <>
          <span className="animate-spin">⟳</span> Deleting...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete All Uploads (Free Space)
        </>
      )}
    </button>
  )
}
