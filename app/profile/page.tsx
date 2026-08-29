import * as React from "react"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { Navbar } from "@/components/marketing/navbar"
import { User, Package, MapPin, Heart } from "lucide-react"
import { SignOutButton } from "@/components/auth/signout-button"
import NextLink from "next/link"

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  const fullName = user.user_metadata?.full_name || "PrintBloom User"

  return (
    <div className="min-h-screen bg-[#FBF6EE] pt-28 pb-20">
      <Navbar />
      
      <div className="container mx-auto max-w-5xl px-4 md:px-8 mt-4">
        
        <h1 className="font-serif text-3xl text-[#221F1C] mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex flex-col gap-2">
            <div className="bg-white border border-[#E0D9CF] rounded-sm p-4 mb-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F5F0E8] rounded-full flex items-center justify-center text-[#221F1C]">
                <User className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-[#221F1C] truncate">{fullName}</p>
                <p className="text-xs text-[#9A8F85] truncate">{user.email}</p>
              </div>
            </div>
            
            <div className="bg-white border border-[#E0D9CF] rounded-sm overflow-hidden flex flex-col">
              <NextLink href="/profile" className="flex items-center gap-3 p-4 text-[#C1502E] bg-[#F5F0E8] font-medium border-l-4 border-[#C1502E]">
                <User className="w-5 h-5" /> Profile Info
              </NextLink>
              <NextLink href="#" className="flex items-center gap-3 p-4 text-[#6B6259] hover:bg-[#FBF6EE] transition-colors border-l-4 border-transparent">
                <Package className="w-5 h-5" /> My Orders
              </NextLink>
              <NextLink href="#" className="flex items-center gap-3 p-4 text-[#6B6259] hover:bg-[#FBF6EE] transition-colors border-l-4 border-transparent">
                <MapPin className="w-5 h-5" /> Saved Addresses
              </NextLink>
              <NextLink href="#" className="flex items-center gap-3 p-4 text-[#6B6259] hover:bg-[#FBF6EE] transition-colors border-l-4 border-transparent">
                <Heart className="w-5 h-5" /> Wishlist
              </NextLink>
              
              <div className="p-2 border-t border-[#E0D9CF] mt-2">
                <SignOutButton />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white border border-[#E0D9CF] rounded-sm p-6 md:p-10 shadow-sm">
            <h2 className="text-xl font-medium text-[#221F1C] mb-6">Profile Information</h2>
            
            <div className="space-y-6 max-w-lg">
              <div>
                <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">Full Name</label>
                <div className="border border-[#E0D9CF] bg-[#FBF6EE] px-4 py-3 rounded-sm text-[#221F1C]">
                  {fullName}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">Email Address</label>
                <div className="border border-[#E0D9CF] bg-[#FBF6EE] px-4 py-3 rounded-sm text-[#221F1C] flex items-center justify-between">
                  <span>{user.email}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Verified</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-[#9A8F85] uppercase tracking-wider mb-2 block">Phone Number</label>
                <div className="border border-[#E0D9CF] bg-white px-4 py-3 rounded-sm text-[#9A8F85] italic">
                  Not provided yet. You can add it during checkout.
                </div>
              </div>

              <div className="pt-6 border-t border-[#E0D9CF]">
                <button className="bg-[#221F1C] text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  )
}
