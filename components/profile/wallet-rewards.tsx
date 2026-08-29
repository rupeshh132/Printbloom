"use client"
import * as React from "react"
import { Coins, Gift, Share2, Copy, CheckCircle2, ArrowRight } from "lucide-react"

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
    <div className="space-y-8">
      {/* Top Section: Wallet Balance & Refer banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Wallet Balance Card */}
        <div className="bg-[#221F1C] text-white rounded-sm p-6 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
          <div className="absolute right-[-20px] top-[-20px] opacity-10">
            <Coins className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h3 className="text-[#E0D9CF] font-medium text-sm tracking-wider uppercase mb-1">Available Balance</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-serif">{balance}</span>
              <span className="text-[#E0D9CF]">Points</span>
            </div>
          </div>
          <div className="relative z-10 mt-6 pt-4 border-t border-white/20 flex justify-between items-center text-sm">
            <span className="text-[#E0D9CF]">1 Point = ₹1</span>
            <button className="text-white font-medium flex items-center gap-1 hover:underline">
              Redeem Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Refer & Earn Card */}
        <div className="bg-[#FBF6EE] border border-[#C1502E]/30 rounded-sm p-6 flex flex-col justify-between min-h-[160px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-[#C1502E]" />
              <h3 className="font-medium text-[#221F1C]">Refer & Earn</h3>
            </div>
            <p className="text-sm text-[#6B6259]">Give your friends ₹100 off on their first custom gift, and get <span className="font-medium text-[#C1502E]">100 Points</span> when they order!</p>
          </div>
          <div className="mt-4 flex bg-white border border-[#E0D9CF] rounded-sm overflow-hidden">
            <input 
              type="text" 
              readOnly 
              value={referralLink} 
              className="flex-1 px-3 py-2 text-sm text-[#9A8F85] bg-gray-50 outline-none"
            />
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-[#221F1C] text-white flex items-center justify-center min-w-[80px] hover:bg-black transition-colors"
            >
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-medium text-[#221F1C] mb-4">Points History</h3>
        
        {!pointsHistory || pointsHistory.length === 0 ? (
          <div className="py-8 text-center border border-[#E0D9CF] border-dashed rounded-sm bg-[#FBF6EE]">
            <p className="text-[#9A8F85]">No points earned yet.</p>
            <p className="text-sm text-[#6B6259] mt-1">Start shopping or refer friends to earn points!</p>
          </div>
        ) : (
          <div className="border border-[#E0D9CF] rounded-sm bg-white overflow-hidden">
            {pointsHistory.map((txn, index) => {
              const isPositive = txn.transaction_type === 'earned' || txn.transaction_type === 'refunded'
              const date = new Date(txn.created_at).toLocaleDateString("en-IN", {
                year: "numeric", month: "short", day: "numeric"
              })
              
              return (
                <div key={txn.id} className={`flex items-center justify-between p-4 ${index !== pointsHistory.length - 1 ? 'border-b border-[#E0D9CF]' : ''}`}>
                  <div>
                    <p className="font-medium text-[#221F1C]">{txn.description || 'Order Cashback'}</p>
                    <p className="text-xs text-[#9A8F85] mt-0.5">{date}</p>
                  </div>
                  <div className={`font-medium ${isPositive ? 'text-green-600' : 'text-[#C1502E]'}`}>
                    {isPositive ? '+' : '-'}{txn.points} pts
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
