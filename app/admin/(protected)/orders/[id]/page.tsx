import { getAdminOrderById, updateOrderStatus } from "@/app/actions/admin-orders"
import { notFound } from "next/navigation"
import NextLink from "next/link"
import { ArrowLeft, Download, Copy } from "lucide-react"
import { OrderCustomizationClient } from "@/components/admin/order-customization-client"

export default async function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getAdminOrderById(id)

  if (!order) {
    return notFound()
  }

  const handleUpdateStatus = async (formData: FormData) => {
    "use server"
    const status = formData.get("status") as string
    await updateOrderStatus(order.id, status)
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <NextLink href="/admin/orders" className="inline-flex items-center gap-2 text-sm font-medium text-[#9A8F85] hover:text-[#DFBC94] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </NextLink>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#221F1C] mb-2 uppercase">Order #{order.id.split('-')[0]}</h1>
          <p className="text-[#6B6259]">Placed on {new Date(order.created_at).toLocaleString()}</p>
        </div>
        
        {/* Status Updater */}
        <form action={handleUpdateStatus} className="flex items-center gap-3 bg-white p-2 rounded-full border border-[#E0D9CF] shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9A8F85] ml-3">Status</span>
          <select 
            name="status" 
            defaultValue={order.status}
            className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer text-[#221F1C]"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="designing">Designing</option>
            <option value="printing">Printing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button type="submit" className="bg-[#DFBC94] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#c9a67f] transition-colors">
            Update
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Items and Customizations */}
        <div className="lg:col-span-2 space-y-8">
          {order.order_items.map((item: any) => (
            <div key={item.id} className="bg-white border border-[#E0D9CF] rounded-sm overflow-hidden">
              <div className="p-5 border-b border-[#E0D9CF] bg-white flex gap-5 items-center">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.product_name} className="w-20 h-20 object-cover rounded-sm shadow-sm border border-[#E0D9CF]/50" />
                ) : (
                  <div className="w-20 h-20 bg-[#F5F0E8] rounded-sm flex items-center justify-center text-xs text-[#9A8F85] border border-[#E0D9CF]/50">No img</div>
                )}
                <div>
                  <h3 className="font-medium text-[#221F1C]">{item.product_name}</h3>
                  <p className="text-sm text-[#6B6259]">Qty: {item.quantity} × ₹{item.price}</p>
                </div>
              </div>

              {/* Customization Grid */}
              <div className="p-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#221F1C] mb-4">Customer's Uploaded Photos</h4>
                
                {!item.customization_data || item.customization_data.length === 0 ? (
                  <p className="text-sm text-[#9A8F85]">No photos uploaded for this item.</p>
                ) : (
                  <OrderCustomizationClient customizations={item.customization_data} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Col: Customer Details */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E0D9CF] rounded-sm p-6">
            <h3 className="font-serif text-lg text-[#221F1C] border-b border-[#E0D9CF] pb-2 mb-4">Customer</h3>
            <p className="text-sm font-medium text-[#221F1C]">{order.customer_name}</p>
            <p className="text-sm text-[#6B6259]">{order.customer_phone}</p>
            <p className="text-sm text-[#6B6259] mt-1">{order.user_email}</p>
          </div>

          {(order.addresses && Array.isArray(order.addresses) ? order.addresses[0] : order.addresses) && (
            <div className="bg-white border border-[#E0D9CF] rounded-sm p-6">
              <h3 className="font-serif text-lg text-[#221F1C] border-b border-[#E0D9CF] pb-2 mb-4">Shipping Address</h3>
              {(() => {
                const addr = Array.isArray(order.addresses) ? order.addresses[0] : order.addresses;
                return (
                  <>
                    <p className="text-sm font-medium text-[#221F1C]">{addr.full_name}</p>
                    <p className="text-sm text-[#6B6259] mt-1">{addr.address_line_1} {addr.address_line_2}</p>
                    <p className="text-sm text-[#6B6259]">{addr.city}, {addr.state} {addr.pincode}</p>
                    <p className="text-sm text-[#6B6259] mt-2">Phone: {addr.phone_number}</p>
                  </>
                )
              })()}
            </div>
          )}

          <div className="bg-white border border-[#E0D9CF] rounded-sm p-6 shadow-sm">
            <h3 className="font-serif text-lg text-[#221F1C] border-b border-[#E0D9CF] pb-3 mb-5">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-[#6B6259] text-sm">
                <span>Subtotal</span>
                <span>₹{order.order_items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0)}</span>
              </div>
              <div className="flex justify-between text-[#6B6259] text-sm pb-4 border-b border-[#E0D9CF] border-dashed">
                <span>Delivery & Discounts</span>
                <span>{order.total_amount - order.order_items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0) > 0 ? '+' : ''}₹{(order.total_amount - order.order_items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0)).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-medium text-lg mt-4 pt-4 border-t border-[#E0D9CF]">
              <span>Total</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
