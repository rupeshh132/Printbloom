import { getAdminOrderById, updateOrderStatus } from "@/app/actions/admin-orders"
import { notFound } from "next/navigation"
import NextLink from "next/link"
import { ArrowLeft, Download, Copy } from "lucide-react"
import { OrderCustomizationClient } from "@/components/admin/order-customization-client"

export default async function AdminOrderDetail({ params }: { params: { id: string } }) {
  const order = await getAdminOrderById(params.id)

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
      <NextLink href="/admin/orders" className="text-sm text-[#9A8F85] hover:text-[#221F1C] flex items-center gap-2 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </NextLink>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#221F1C] mb-2 uppercase">Order #{order.id.split('-')[0]}</h1>
          <p className="text-[#6B6259]">Placed on {new Date(order.created_at).toLocaleString()}</p>
        </div>
        
        {/* Status Updater */}
        <form action={handleUpdateStatus} className="flex items-center gap-3 bg-white p-3 border border-[#E0D9CF] rounded-sm shadow-sm">
          <label className="text-sm font-medium text-[#221F1C]">Status:</label>
          <select 
            name="status" 
            defaultValue={order.status}
            className="text-sm border border-[#E0D9CF] rounded-sm p-1.5 focus:outline-none focus:border-[#221F1C]"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button type="submit" className="bg-[#221F1C] text-white text-xs px-3 py-1.5 rounded-sm hover:bg-black transition-colors">
            Update
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Items and Customizations */}
        <div className="lg:col-span-2 space-y-8">
          {order.order_items.map((item: any) => (
            <div key={item.id} className="bg-white border border-[#E0D9CF] rounded-sm overflow-hidden">
              <div className="p-4 border-b border-[#E0D9CF] bg-[#F5F0E8] flex gap-4 items-center">
                <img src={item.image_url} alt={item.product_name} className="w-16 h-16 object-cover rounded-sm border border-[#E0D9CF]" />
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
            <p className="text-sm text-[#6B6259]">{order.user_email}</p>
          </div>

          {order.addresses && (
            <div className="bg-white border border-[#E0D9CF] rounded-sm p-6">
              <h3 className="font-serif text-lg text-[#221F1C] border-b border-[#E0D9CF] pb-2 mb-4">Shipping Address</h3>
              <p className="text-sm font-medium text-[#221F1C]">{order.addresses.full_name}</p>
              <p className="text-sm text-[#6B6259] mt-1">{order.addresses.street_address}</p>
              <p className="text-sm text-[#6B6259]">{order.addresses.city}, {order.addresses.state} {order.addresses.pincode}</p>
              <p className="text-sm text-[#6B6259] mt-2">Phone: {order.addresses.phone}</p>
            </div>
          )}

          <div className="bg-white border border-[#E0D9CF] rounded-sm p-6">
            <h3 className="font-serif text-lg text-[#221F1C] border-b border-[#E0D9CF] pb-2 mb-4">Payment</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#6B6259]">Subtotal</span>
              <span className="text-[#221F1C]">₹{order.total_amount}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#6B6259]">Shipping</span>
              <span className="text-[#221F1C]">Free</span>
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
