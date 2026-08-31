import * as React from "react"
import { Package, Download, RefreshCw, Truck, CheckCircle2, Circle } from "lucide-react"
import { ReorderButton } from "@/components/profile/reorder-button"

// A helper component to render the tracking timeline
function OrderTracking({ status }: { status: string }) {
  const steps = ["Processing", "Designing", "Printing", "Shipped", "Delivered"]
  const currentStepIndex = steps.findIndex(s => s.toLowerCase() === status.toLowerCase())
  const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#E0D9CF] z-0 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#DFBC94] z-0 rounded-full transition-all duration-500"
          style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index <= activeIndex
          const isCurrent = index === activeIndex
          return (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isCompleted ? 'bg-[#DFBC94] text-white' : 'bg-white border-2 border-[#E0D9CF] text-[#E0D9CF]'}`}>
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-3 h-3 fill-current" />}
              </div>
              <span className={`text-[10px] sm:text-xs font-medium absolute -bottom-6 whitespace-nowrap ${isCurrent ? 'text-[#DFBC94]' : isCompleted ? 'text-[#221F1C]' : 'text-[#9A8F85]'}`}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function OrderHistory({ orders }: { orders: any[] }) {
  const displayOrders = orders || []

  if (!displayOrders || displayOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-[#F5F0E8] rounded-full flex items-center justify-center text-[#9A8F85] mb-4">
          <Package className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-medium text-[#221F1C] mb-2">No orders yet</h3>
        <p className="text-[#6B6259] mb-6 max-w-md">Looks like you haven't created any custom memories with us yet. Start personalizing your first gift today!</p>
        <a href="/products" className="bg-[#221F1C] text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-colors">
          Start Shopping
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-[#221F1C] mb-6">Recent Orders</h2>
      
      {displayOrders.map((order) => {
        const orderDate = new Date(order.created_at).toLocaleDateString("en-IN", {
          year: "numeric", month: "short", day: "numeric"
        })
        
        return (
          <div key={order.id} className="bg-white border border-[#E0D9CF] rounded-sm overflow-hidden">
            {/* Order Header */}
            <div className="bg-[#FBF6EE] px-4 py-3 md:px-6 md:py-4 border-b border-[#E0D9CF] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-[#9A8F85] uppercase tracking-wider mb-1">Order Placed</p>
                  <p className="font-medium text-[#221F1C] text-sm">{orderDate}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9A8F85] uppercase tracking-wider mb-1">Total</p>
                  <p className="font-medium text-[#221F1C] text-sm">₹{order.total_amount}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#9A8F85] uppercase tracking-wider mb-1">Order ID</p>
                <p className="font-medium text-[#221F1C] text-sm">#{order.short_id || order.id.split('-')[0].toUpperCase()}</p>
              </div>
            </div>

            {/* Order Body */}
            <div className="p-4 md:p-6">
              <div className="mb-8 px-2 md:px-8">
                 <OrderTracking status={order.status} />
              </div>

              <div className="space-y-4">
                {(order.order_items || order.items)?.map((item: any, index: number) => {
                  const productName = item.product_name || (item.product_id ? item.product_id.split('-').map((w:string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : "Custom Product");
                  const price = item.price || item.price_at_time || 0;
                  const variant = item.variant_label ? ` (${item.variant_label})` : "";
                  
                  return (
                  <div key={index} className="flex items-center gap-4 py-2">
                    <div className="w-16 h-16 bg-[#F5F0E8] rounded-sm overflow-hidden flex-shrink-0 relative border border-[#E0D9CF]">
                      {item.image ? (
                        <img src={item.image} alt={productName} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#9A8F85]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#221F1C] truncate">{productName}{variant}</h4>
                      <p className="text-sm text-[#9A8F85]">Qty: {item.quantity} - ₹{price}</p>
                    </div>
                    <div className="hidden sm:flex gap-2">
                      <a 
                        target="_blank"
                        href={`/order/${order.id}/invoice`}
                        className="px-4 py-2 text-sm font-medium border border-[#E0D9CF] rounded-full text-[#6B6259] hover:bg-[#F5F0E8] transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Invoice
                      </a>
                      <ReorderButton orderItems={order.order_items} />
                    </div>
                  </div>
                )})}
              </div>

              {/* Mobile action buttons */}
              <div className="mt-6 pt-4 border-t border-[#E0D9CF] flex sm:hidden gap-3">
                <a 
                  target="_blank"
                  href={`/order/${order.id}/invoice`}
                  className="flex-1 py-2 text-sm font-medium border border-[#E0D9CF] rounded-full text-[#6B6259] hover:bg-[#F5F0E8] transition-colors flex justify-center items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Invoice
                </a>
                <div className="flex-1 flex">
                  <ReorderButton orderItems={order.order_items} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
