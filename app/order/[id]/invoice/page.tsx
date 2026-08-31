import { createSupabaseServerClient } from "@/lib/supabase-server"
import { notFound } from "next/navigation"
import { InvoiceActions } from "@/components/profile/invoice-actions"

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createSupabaseServerClient()

  // Fetch the order, items, and address
  // Note: we fetch addresses(*) here. It will either join if there's a shipping_address_id or fetch user addresses
  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*),
      addresses (*)
    `)
    .eq("id", id)
    .single()

  if (error || !order) {
    return (
      <div className="p-8 text-center font-mono">
        <h1>Error: Invoice not found or access denied.</h1>
      </div>
    )
  }

  // Format date
  const orderDate = new Date(order.created_at).toLocaleDateString("en-IN", {
    year: "numeric", month: "long", day: "numeric"
  })

  // Get address object
  const addr = Array.isArray(order.addresses) ? order.addresses[0] : order.addresses

  // Calculate totals
  const subtotal = order.order_items?.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0) || order.total_amount
  const shipping = order.total_amount - subtotal

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 font-sans">
      <div className="bg-white w-full max-w-3xl shadow-sm border border-[#E0D9CF] p-12 print:shadow-none print:border-none print:p-0">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-serif text-4xl text-[#221F1C] tracking-tight mb-2">PrintBloom</h1>
            <p className="text-sm text-[#6B6259]">Memories, beautifully printed.</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-[#221F1C] mb-1">INVOICE</h2>
            <p className="font-mono text-sm text-[#6B6259]">#{order.id.split('-')[0].toUpperCase()}</p>
            <p className="text-sm text-[#6B6259] mt-2">Date: {orderDate}</p>
          </div>
        </div>

        {/* Addresses */}
        <div className="flex justify-between mb-12 border-t border-[#E0D9CF] pt-8">
          <div>
            <h3 className="text-xs font-semibold text-[#9A8F85] uppercase tracking-wider mb-3">Billed To / Shipped To</h3>
            <p className="font-medium text-[#221F1C]">{addr?.full_name || "Customer"}</p>
            <p className="text-sm text-[#6B6259]">{addr?.address_line_1 || "Address pending"}</p>
            {addr?.address_line_2 && <p className="text-sm text-[#6B6259]">{addr.address_line_2}</p>}
            <p className="text-sm text-[#6B6259]">{addr?.city ? `${addr.city}, ${addr.state} ${addr.pincode}` : ""}</p>
            <p className="text-sm text-[#6B6259] mt-1">{addr?.phone_number ? `Phone: ${addr.phone_number}` : ""}</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-semibold text-[#9A8F85] uppercase tracking-wider mb-3">From</h3>
            <p className="font-medium text-[#221F1C]">PrintBloom India</p>
            <p className="text-sm text-[#6B6259]">Studio 4A, Creative Park</p>
            <p className="text-sm text-[#6B6259]">Mumbai, Maharashtra 400001</p>
            <p className="text-sm text-[#6B6259] mt-1">support@printbloom.com</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#E0D9CF]">
                <th className="py-3 text-sm font-semibold text-[#221F1C]">Description</th>
                <th className="py-3 text-sm font-semibold text-[#221F1C] text-center">Qty</th>
                <th className="py-3 text-sm font-semibold text-[#221F1C] text-right">Price</th>
                <th className="py-3 text-sm font-semibold text-[#221F1C] text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.order_items?.map((item: any, i: number) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-4 text-sm text-[#221F1C]">{item.product_name || item.product_id}</td>
                  <td className="py-4 text-sm text-[#6B6259] text-center">{item.quantity}</td>
                  <td className="py-4 text-sm text-[#6B6259] text-right">₹{item.price || 0}</td>
                  <td className="py-4 text-sm text-[#221F1C] text-right">₹{(item.price || 0) * item.quantity}</td>
                </tr>
              ))}
              {(!order.order_items || order.order_items.length === 0) && (
                <tr className="border-b border-gray-100">
                  <td className="py-4 text-sm text-[#221F1C]" colSpan={4}>Order items processing...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-1/2">
            <div className="flex justify-between py-2 text-sm text-[#6B6259]">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-[#6B6259] border-b border-[#E0D9CF]">
              <span>Shipping</span>
              <span>{shipping > 0 ? `₹${shipping}` : 'Free'}</span>
            </div>
            <div className="flex justify-between py-4 text-lg font-medium text-[#221F1C]">
              <span>Total Amount</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#E0D9CF] text-center text-xs text-[#9A8F85]">
          <p>Thank you for choosing PrintBloom to preserve your memories.</p>
          <p className="mt-1">This is a computer generated invoice and does not require a physical signature.</p>
        </div>

      </div>

      <InvoiceActions />
    </div>
  )
}
