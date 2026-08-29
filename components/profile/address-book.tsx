"use client"
import * as React from "react"
import { MapPin, Plus, Trash2, Home, Building2 } from "lucide-react"
import { addAddress, deleteAddress } from "@/app/actions/addresses"

export function AddressBook({ addresses }: { addresses: any[] }) {
  const [isAdding, setIsAdding] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function handleAdd(formData: FormData) {
    setIsSubmitting(true)
    try {
      await addAddress(formData)
      setIsAdding(false)
    } catch (error) {
      console.error(error)
      alert("Failed to add address")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this address?")) return
    try {
      await deleteAddress(id)
    } catch (error) {
      console.error(error)
      alert("Failed to delete address")
    }
  }

  if (isAdding) {
    return (
      <div className="bg-white border border-[#E0D9CF] rounded-sm p-6 shadow-sm">
        <h2 className="text-xl font-medium text-[#221F1C] mb-6">Add New Address</h2>
        <form action={handleAdd} className="space-y-4 max-w-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#9A8F85] mb-1 block">Full Name*</label>
              <input required name="full_name" type="text" className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
            </div>
            <div>
              <label className="text-xs text-[#9A8F85] mb-1 block">Phone Number*</label>
              <input required name="phone_number" type="tel" className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
            </div>
          </div>
          
          <div>
            <label className="text-xs text-[#9A8F85] mb-1 block">Flat, House no., Building, Company*</label>
            <input required name="address_line_1" type="text" className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
          </div>

          <div>
            <label className="text-xs text-[#9A8F85] mb-1 block">Area, Street, Sector, Village</label>
            <input name="address_line_2" type="text" className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-[#9A8F85] mb-1 block">Pincode*</label>
              <input required name="pincode" type="text" className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
            </div>
            <div>
              <label className="text-xs text-[#9A8F85] mb-1 block">City*</label>
              <input required name="city" type="text" className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-xs text-[#9A8F85] mb-1 block">State*</label>
              <input required name="state" type="text" className="w-full border border-[#E0D9CF] rounded-sm p-3 focus:outline-none focus:border-[#221F1C] text-sm" />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#221F1C] text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Save Address"}
            </button>
            <button 
              type="button" 
              onClick={() => setIsAdding(false)}
              className="px-6 py-3 border border-[#E0D9CF] text-[#221F1C] rounded-full font-medium hover:bg-[#F5F0E8] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-[#221F1C]">Saved Addresses</h2>
        {addresses.length > 0 && (
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-sm font-medium bg-[#221F1C] text-white px-4 py-2 rounded-full hover:bg-black transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New
          </button>
        )}
      </div>

      {!addresses || addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center h-full border border-[#E0D9CF] border-dashed rounded-sm bg-[#FBF6EE]">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#9A8F85] mb-4 shadow-sm">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-medium text-[#221F1C] mb-2">No addresses saved</h3>
          <p className="text-[#6B6259] mb-6 max-w-md">You haven't saved any delivery addresses yet. Add one now for faster checkout.</p>
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-[#221F1C] text-white rounded-full font-medium hover:bg-black transition-colors"
          >
            Add New Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-[#E0D9CF] rounded-sm p-5 relative bg-white hover:border-[#9A8F85] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-[#221F1C] text-lg flex items-center gap-2">
                  {addr.full_name}
                </h4>
                <button 
                  onClick={() => handleDelete(addr.id)}
                  className="text-[#9A8F85] hover:text-red-500 transition-colors p-1"
                  title="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[#6B6259] text-sm mt-1">{addr.address_line_1}</p>
              {addr.address_line_2 && <p className="text-[#6B6259] text-sm">{addr.address_line_2}</p>}
              <p className="text-[#6B6259] text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
              <p className="text-[#6B6259] text-sm mt-3 flex items-center gap-2">
                <span className="font-medium">Phone:</span> {addr.phone_number}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
