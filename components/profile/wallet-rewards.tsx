"use client"
import * as React from "react"
import { Coins, Gift, Copy, CheckCircle2, ArrowRight } from "lucide-react"

export function WalletRewards({ pointsHistory, userId }: { pointsHistory: any[], userId: string }) {
  const [copied, setCopied] = React.useState(false)

  // Calculate current balance
  const balance = pointsHistory.reduce((acc, curr) => {
    if (curr.transaction_type === 'earned' || curr.transaction_type === 'refunded') return acc + curr.points;
    if (curr.transaction_type === 'redeemed') return acc - curr.points;
    return acc;
  }, 0);

  // Generate a mock referral code based on User ID
  const refCode = userId.split('-')[0].toUpperCase()
  const referralLink = `https://printbloom.in/signup?ref=${refCode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-10 max-w-4xl">
      
      {/* Top Section: Wallet Balance Card - Full width */}
      <div className="bg-[#221F1C] text-white rounded-xl p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-md">
        <div className="absolute right-[-10px] top-[-30px] opacity-10 pointer-events-none">
          <Coins className="w-64 h-64" />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-[#E0D9CF] font-medium text-xs tracking-widest uppercase mb-3">Available Balance</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-serif">{balance}</span>
            <span className="text-[#E0D9CF] text-lg font-medium">Points</span>
          </div>
          <p className="text-[#9A8F85] text-sm mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> 1 Point = ₹1
          </p>
        </div>
        
        <div className="relative z-10 w-full md:w-auto">
          <button className="w-full md:w-auto bg-white text-[#221F1C] px-8 py-4 rounded-full font-medium hover:bg-[#FBF6EE] transition-colors flex items-center justify-center gap-2 shadow-sm">
            Redeem Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Refer & Earn Card - Full width */}
      <div className="bg-[#FBF6EE] border border-[#E0D9CF] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 shadow-sm relative overflow-hidden">
        <div className="flex-shrink-0 w-16 h-16 bg-white border border-[#E0D9CF] rounded-full flex items-center justify-center text-[#DFBC94] shadow-sm">
          <Gift className="w-8 h-8" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-serif text-2xl text-[#221F1C] mb-2">Refer & Earn Points</h3>
          <p className="text-[#6B6259]">
            Give your friends ₹100 off on their first custom gift, and get <span className="font-medium text-[#DFBC94]">100 Points</span> when they place an order!
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col gap-2">
          <div className="flex bg-white border border-[#E0D9CF] rounded-full overflow-hidden p-1.5 w-full md:w-[320px] shadow-sm">
            <input 
              type="text" 
              readOnly 
              value={referralLink} 
              className="flex-1 min-w-0 px-4 py-2 text-sm text-[#6B6259] bg-transparent outline-none truncate"
            />
            <button 
              onClick={copyToClipboard}
              className="px-6 py-2.5 bg-[#221F1C] text-white rounded-full flex items-center justify-center hover:bg-black transition-colors flex-shrink-0 font-medium text-sm gap-2"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-xl font-medium text-[#221F1C] mb-6">Points History</h3>
        
        {!pointsHistory || pointsHistory.length === 0 ? (
          <div className="py-12 text-center border border-[#E0D9CF] border-dashed rounded-xl bg-[#FBF6EE]">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#9A8F85] mx-auto mb-4 shadow-sm">
              <Coins className="w-8 h-8" />
            </div>
            <p className="font-medium text-[#221F1C]">No points earned yet.</p>
            <p className="text-[#6B6259] mt-2 max-w-sm mx-auto">Start shopping or refer your friends to PrintBloom to earn your first points!</p>
          </div>
        ) : (
          <div className="border border-[#E0D9CF] rounded-xl bg-white overflow-hidden shadow-sm">
            {pointsHistory.map((txn, index) => {
              const isPositive = txn.transaction_type === 'earned' || txn.transaction_type === 'refunded'
              const date = new Date(txn.created_at).toLocaleDateString("en-IN", {
                year: "numeric", month: "short", day: "numeric"
              })
              
              return (
                <div key={txn.id} className={`flex items-center justify-between p-5 ${index !== pointsHistory.length - 1 ? 'border-b border-[#E0D9CF]' : ''}`}>
                  <div>
                    <p className="font-medium text-[#221F1C] text-base">{txn.description || 'Order Cashback'}</p>
                    <p className="text-sm text-[#9A8F85] mt-1">{date}</p>
                  </div>
                  <div className={`font-medium text-lg ${isPositive ? 'text-green-600' : 'text-[#DFBC94]'}`}>
                    {isPositive ? '+' : '-'}{txn.points}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      
    </div>
  )
}
