"use client"
import * as React from "react"
import { useConfirmStore } from "@/store/use-confirm-store"
import { X } from "lucide-react"

export function ConfirmModal() {
  const { isOpen, options, closeConfirmModal } = useConfirmStore()

  if (!isOpen || !options) return null

  const handleConfirm = () => {
    options.onConfirm()
    closeConfirmModal()
  }

  const handleCancel = () => {
    if (options.onCancel) {
      options.onCancel()
    }
    closeConfirmModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FBF6EE] rounded-sm shadow-xl w-full max-w-md overflow-hidden border border-[#E0D9CF] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#E0D9CF]">
          <h2 className="font-serif text-xl text-[#221F1C]">{options.title}</h2>
          <button 
            onClick={handleCancel}
            className="text-[#9A8F85] hover:text-[#221F1C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-[#6D635B] text-sm leading-relaxed">
            {options.message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-5 bg-[#F5F0E8] border-t border-[#E0D9CF]">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-[#6B6259] bg-white border border-[#E0D9CF] rounded-sm hover:bg-[#F4ECDD] transition-colors"
          >
            {options.cancelText || "Cancel"}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-sm hover:bg-red-700 transition-colors"
          >
            {options.confirmText || "Confirm"}
          </button>
        </div>

      </div>
    </div>
  )
}
