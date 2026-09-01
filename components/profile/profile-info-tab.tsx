"use client"
import * as React from "react"
import { updateProfile } from "@/app/actions/profile"
import { Button } from "@/components/ui/button"

export function ProfileInfoTab({ user }: { user: any }) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const fullName = user.user_metadata?.full_name || ""
  const phone = user.user_metadata?.phone || ""

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await updateProfile(formData)
      if (result.error) {
        setError(result.error)
      } else {
        setIsEditing(false)
      }
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-[#221F1C]">Profile Information</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-sm font-medium text-[#DFBC94] hover:text-[#C1502E] transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-sm border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="full_name" className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider block">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              defaultValue={fullName}
              className="w-full h-11 px-4 border border-[#E0D9CF] rounded-sm focus:outline-none focus:border-[#221F1C] text-[#221F1C]"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone_number" className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider block">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              defaultValue={phone}
              placeholder="+91"
              className="w-full h-11 px-4 border border-[#E0D9CF] rounded-sm focus:outline-none focus:border-[#221F1C] text-[#221F1C]"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">
              Email Address
            </label>
            <div className="border border-[#E0D9CF] bg-[#FBF6EE] px-4 py-3 rounded-sm text-[#9A8F85] cursor-not-allowed flex items-center justify-between">
              <span>{user.email}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Verified</span>
            </div>
            <p className="text-[10px] text-[#9A8F85] mt-1">Email cannot be changed.</p>
          </div>

          <div className="pt-6 border-t border-[#E0D9CF] flex gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6 max-w-lg">
          <div>
            <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">
              Full Name
            </label>
            <div className="border border-[#E0D9CF] bg-[#FBF6EE] px-4 py-3 rounded-sm text-[#221F1C]">
              {fullName || "Not provided"}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">
              Email Address
            </label>
            <div className="border border-[#E0D9CF] bg-[#FBF6EE] px-4 py-3 rounded-sm text-[#221F1C] flex items-center justify-between">
              <span>{user.email}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Verified</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">
              Phone Number
            </label>
            <div className={`border border-[#E0D9CF] px-4 py-3 rounded-sm ${phone ? 'bg-[#FBF6EE] text-[#221F1C]' : 'bg-white text-[#9A8F85] italic'}`}>
              {phone || "Not provided yet. You can add it during checkout."}
            </div>
          </div>
          <div className="pt-6 border-t border-[#E0D9CF]">
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-[#221F1C] text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </>
  )
}
