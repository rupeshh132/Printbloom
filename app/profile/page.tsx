import * as React from "react"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { Navbar } from "@/components/marketing/navbar"
import { User, Package, MapPin, Heart, ArrowRight } from "lucide-react"
import { SignOutButton } from "@/components/auth/signout-button"
import NextLink from "next/link"
import { OrderHistory } from "@/components/profile/order-history"
import { AddressBook } from "@/components/profile/address-book"

export const dynamic = "force-dynamic"

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const supabase = await createSupabaseServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  const resolvedParams = await searchParams;
  const currentTab = resolvedParams.tab || "profile"
  const fullName = user.user_metadata?.full_name || "PrintBloom User"

  // Fetch orders from the new table
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch addresses
  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

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
              <NextLink 
                href="/profile?tab=profile" 
                className={`flex items-center gap-3 p-4 transition-colors ${currentTab === "profile" ? "text-[#C1502E] bg-[#F5F0E8] font-medium border-l-4 border-[#C1502E]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-l-4 border-transparent"}`}
              >
                <User className="w-5 h-5" /> Profile Info
              </NextLink>
              <NextLink 
                href="/profile?tab=orders" 
                className={`flex items-center justify-between p-4 transition-colors ${currentTab === "orders" ? "text-[#C1502E] bg-[#F5F0E8] font-medium border-l-4 border-[#C1502E]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-l-4 border-transparent"}`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5" /> My Orders
                </div>
                {orders && orders.length > 0 && (
                  <span className="bg-[#221F1C] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {orders.length}
                  </span>
                )}
              </NextLink>
              <NextLink 
                href="/profile?tab=addresses" 
                className={`flex items-center gap-3 p-4 transition-colors ${currentTab === "addresses" ? "text-[#C1502E] bg-[#F5F0E8] font-medium border-l-4 border-[#C1502E]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-l-4 border-transparent"}`}
              >
                <MapPin className="w-5 h-5" /> Saved Addresses
              </NextLink>
              <NextLink 
                href="/profile?tab=wishlist" 
                className={`flex items-center gap-3 p-4 transition-colors ${currentTab === "wishlist" ? "text-[#C1502E] bg-[#F5F0E8] font-medium border-l-4 border-[#C1502E]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-l-4 border-transparent"}`}
              >
                <Heart className="w-5 h-5" /> Wishlist
              </NextLink>
              
              <div className="p-2 border-t border-[#E0D9CF] mt-2">
                <SignOutButton />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white border border-[#E0D9CF] rounded-sm p-6 md:p-10 shadow-sm min-h-[500px]">
            
            {currentTab === "profile" && (
              <>
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
              </>
            )}

            {currentTab === "orders" && (
              <OrderHistory orders={orders || []} />
            )}

            {currentTab === "addresses" && (
              <AddressBook addresses={addresses || []} />
            )}

            {currentTab === "wishlist" && (
              <div className="flex flex-col items-center justify-center py-16 text-center h-full">
                <div className="w-16 h-16 bg-[#F5F0E8] rounded-full flex items-center justify-center text-[#9A8F85] mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium text-[#221F1C] mb-2">Wishlist is empty</h3>
                <p className="text-[#6B6259] mb-6 max-w-md">Save your favorite custom gifts here to easily find them later.</p>
              </div>
            )}
            
          </div>
          
        </div>
      </div>
    </div>
  )
}
