import * as React from "react"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { Navbar } from "@/components/marketing/navbar"
import { User, Package, MapPin, Heart, ArrowRight, Wallet, CalendarDays, MessageSquare } from "lucide-react"
import { SignOutButton } from "@/components/auth/signout-button"
import NextLink from "next/link"
import { OrderHistory } from "@/components/profile/order-history"
import { AddressBook } from "@/components/profile/address-book"
import { WalletRewards } from "@/components/profile/wallet-rewards"
import { SmartReminders } from "@/components/profile/smart-reminders"
import { WishlistTab } from "@/components/profile/wishlist-tab"
import { EnquiryTab } from "@/components/profile/enquiry-tab"
import { ProfileInfoTab } from "@/components/profile/profile-info-tab"
import { AvatarUpload } from "@/components/profile/avatar-upload"
import { OrderSuccessPopup } from "@/components/profile/order-success-popup"
import { Suspense } from "react"

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

  // Fetch orders
  const { data: orders } = await supabase
    .from("orders")
    .select(`*, order_items (*)`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const { getProducts } = await import("@/app/actions/products");
  const products = await getProducts();
  
  const enrichedOrders = orders?.map(order => ({
    ...order,
    order_items: order.order_items?.map((item: any) => ({
      ...item,
      image_url: products.find((p: any) => 
        p.id === item.product_id || 
        p.slug === item.product_id || 
        (item.product_id && p.id && p.id.startsWith(item.product_id)) ||
        (item.product_id && p.id && item.product_id.startsWith(p.id)) ||
        (item.product_id && p.slug && item.product_id.startsWith(p.slug))
      )?.main_image_url || null
    }))
  }))

  // Fetch addresses
  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch points history
  const { data: pointsHistory } = await supabase
    .from("reward_points")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch reminders
  const { data: reminders } = await supabase
    .from("user_reminders")
    .select("*")
    .eq("user_id", user.id)
    .order("event_date", { ascending: true })

  // Fetch wishlist
  const { data: wishlist } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-[#FBF6EE] pt-28 pb-20">
      <Navbar />
      <Suspense fallback={null}>
        <OrderSuccessPopup />
      </Suspense>
      
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        
        <h1 className="font-serif text-3xl md:text-4xl text-[#221F1C] mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white border border-[#E0D9CF] rounded-sm overflow-hidden flex flex-col">
              
              <div className="p-6 border-b border-[#E0D9CF] flex items-center gap-4 bg-[#FBF6EE]">
                <AvatarUpload currentAvatar={user.user_metadata?.avatar_url} fullName={fullName} />
                <div>
                  <h3 className="font-medium text-[#221F1C] truncate max-w-[150px]">{fullName}</h3>
                  <p className="text-xs text-[#9A8F85] truncate max-w-[150px]">{user.email}</p>
                </div>
              </div>

              <div className="flex md:flex-col overflow-x-auto md:overflow-visible hide-scrollbar bg-white">
                <NextLink 
                  href="/profile?tab=profile" 
                  className={`flex-shrink-0 flex items-center gap-2 p-3 md:p-4 transition-colors ${currentTab === "profile" ? "text-[#DFBC94] bg-[#F5F0E8] font-medium border-b-2 md:border-b-0 md:border-l-4 border-[#DFBC94]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-b-2 md:border-b-0 md:border-l-4 border-transparent"}`}
                >
                  <User className="w-4 h-4 md:w-5 md:h-5" /> <span className="text-sm md:text-base whitespace-nowrap">Profile Info</span>
                </NextLink>
                <NextLink 
                  href="/profile?tab=orders" 
                  className={`flex-shrink-0 flex items-center gap-2 p-3 md:p-4 transition-colors ${currentTab === "orders" ? "text-[#DFBC94] bg-[#F5F0E8] font-medium border-b-2 md:border-b-0 md:border-l-4 border-[#DFBC94]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-b-2 md:border-b-0 md:border-l-4 border-transparent"}`}
                >
                  <Package className="w-4 h-4 md:w-5 md:h-5" /> <span className="text-sm md:text-base whitespace-nowrap">My Orders</span>
                </NextLink>
                <NextLink 
                  href="/profile?tab=addresses" 
                  className={`flex-shrink-0 flex items-center gap-2 p-3 md:p-4 transition-colors ${currentTab === "addresses" ? "text-[#DFBC94] bg-[#F5F0E8] font-medium border-b-2 md:border-b-0 md:border-l-4 border-[#DFBC94]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-b-2 md:border-b-0 md:border-l-4 border-transparent"}`}
                >
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" /> <span className="text-sm md:text-base whitespace-nowrap">Saved Addresses</span>
                </NextLink>
                <NextLink 
                  href="/profile?tab=rewards" 
                  className={`flex-shrink-0 flex items-center gap-2 p-3 md:p-4 transition-colors ${currentTab === "rewards" ? "text-[#DFBC94] bg-[#F5F0E8] font-medium border-b-2 md:border-b-0 md:border-l-4 border-[#DFBC94]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-b-2 md:border-b-0 md:border-l-4 border-transparent"}`}
                >
                  <Wallet className="w-4 h-4 md:w-5 md:h-5" /> <span className="text-sm md:text-base whitespace-nowrap">Wallet & Rewards</span>
                </NextLink>
                <NextLink 
                  href="/profile?tab=reminders" 
                  className={`flex-shrink-0 flex items-center gap-2 p-3 md:p-4 transition-colors ${currentTab === "reminders" ? "text-[#DFBC94] bg-[#F5F0E8] font-medium border-b-2 md:border-b-0 md:border-l-4 border-[#DFBC94]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-b-2 md:border-b-0 md:border-l-4 border-transparent"}`}
                >
                  <CalendarDays className="w-4 h-4 md:w-5 md:h-5" /> <span className="text-sm md:text-base whitespace-nowrap">Smart Reminders</span>
                </NextLink>
                <NextLink 
                  href="/profile?tab=wishlist" 
                  className={`flex-shrink-0 flex items-center gap-2 p-3 md:p-4 transition-colors ${currentTab === "wishlist" ? "text-[#DFBC94] bg-[#F5F0E8] font-medium border-b-2 md:border-b-0 md:border-l-4 border-[#DFBC94]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-b-2 md:border-b-0 md:border-l-4 border-transparent"}`}
                >
                  <Heart className="w-4 h-4 md:w-5 md:h-5" /> <span className="text-sm md:text-base whitespace-nowrap">Wishlist</span>
                </NextLink>
                <NextLink 
                  href="/profile?tab=enquiry" 
                  className={`flex-shrink-0 flex items-center gap-2 p-3 md:p-4 transition-colors ${currentTab === "enquiry" ? "text-[#DFBC94] bg-[#F5F0E8] font-medium border-b-2 md:border-b-0 md:border-l-4 border-[#DFBC94]" : "text-[#6B6259] hover:bg-[#FBF6EE] border-b-2 md:border-b-0 md:border-l-4 border-transparent"}`}
                >
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5" /> <span className="text-sm md:text-base whitespace-nowrap">Custom Request</span>
                </NextLink>
                <div className="flex-shrink-0 md:hidden flex items-center px-3 border-l border-[#E0D9CF] my-2 ml-2">
                  <SignOutButton />
                </div>
              </div>
              
              <div className="p-2 border-t border-[#E0D9CF] mt-0 md:mt-2 hidden md:block">
                <SignOutButton />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white border border-[#E0D9CF] rounded-sm p-6 md:p-10 shadow-sm min-h-[500px]">
            
            {currentTab === "profile" && (
              <ProfileInfoTab user={user} />
            )}

            {currentTab === "orders" && (
              <OrderHistory orders={enrichedOrders || []} />
            )}

            {currentTab === "addresses" && (
              <AddressBook addresses={addresses || []} />
            )}

            {currentTab === "rewards" && (
              <WalletRewards pointsHistory={pointsHistory || []} userId={user.id} />
            )}

            {currentTab === "reminders" && (
              <SmartReminders reminders={reminders || []} />
            )}

            {currentTab === "wishlist" && (
              <WishlistTab items={wishlist || []} />
            )}
            
            {currentTab === "enquiry" && (
              <EnquiryTab />
            )}
            
          </div>
          
        </div>
      </div>
    </div>
  )
}
