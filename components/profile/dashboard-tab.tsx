import * as React from "react"
import { Package, Wallet, CalendarDays, ArrowRight, Heart } from "lucide-react"
import NextLink from "next/link"

export function DashboardTab({ 
  fullName, 
  orders, 
  pointsHistory, 
  reminders,
  wishlist
}: { 
  fullName: string, 
  orders: any[], 
  pointsHistory: any[], 
  reminders: any[],
  wishlist: any[]
}) {
  
  const totalPoints = pointsHistory?.reduce((sum, record) => sum + record.points, 0) || 0
  const recentOrders = orders?.slice(0, 2) || []
  const upcomingReminders = reminders?.filter(r => new Date(r.event_date) >= new Date()).slice(0, 2) || []

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="bg-[#FBF6EE] rounded-2xl p-6 md:p-8 border border-[#E0D9CF]">
        <h2 className="font-serif text-2xl md:text-3xl text-[#221F1C] mb-2">Welcome back, {fullName.split(' ')[0]}!</h2>
        <p className="text-[#6B6259]">Here's what's happening with your PrintBloom account today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Orders Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#E0D9CF] shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#FBF6EE] rounded-full text-[#DFBC94]">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-[#221F1C]">Orders</h3>
              <p className="text-sm text-[#9A8F85]">{orders?.length || 0} Total</p>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-[#E0D9CF]">
            <NextLink href="/profile?tab=orders" className="text-sm text-[#DFBC94] font-medium flex items-center hover:text-[#CBA782]">
              View order history <ArrowRight className="w-4 h-4 ml-1" />
            </NextLink>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#E0D9CF] shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#FBF6EE] rounded-full text-[#DFBC94]">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-[#221F1C]">Reward Points</h3>
              <p className="text-sm text-[#9A8F85]">{totalPoints} Points Available</p>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-[#E0D9CF]">
            <NextLink href="/profile?tab=rewards" className="text-sm text-[#DFBC94] font-medium flex items-center hover:text-[#CBA782]">
              View wallet <ArrowRight className="w-4 h-4 ml-1" />
            </NextLink>
          </div>
        </div>

        {/* Reminders Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#E0D9CF] shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#FBF6EE] rounded-full text-[#DFBC94]">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-[#221F1C]">Reminders</h3>
              <p className="text-sm text-[#9A8F85]">{upcomingReminders.length} Upcoming</p>
            </div>
          </div>
          <div className="mt-auto pt-4 border-t border-[#E0D9CF]">
            <NextLink href="/profile?tab=reminders" className="text-sm text-[#DFBC94] font-medium flex items-center hover:text-[#CBA782]">
              Manage reminders <ArrowRight className="w-4 h-4 ml-1" />
            </NextLink>
          </div>
        </div>
      </div>

    </div>
  )
}
