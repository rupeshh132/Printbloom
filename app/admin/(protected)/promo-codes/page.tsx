import { SectionHeading } from "@/components/ui/section-heading"
import { getPromoCodes, createPromoCode, togglePromoCode, deletePromoCode } from "@/app/actions/promo-codes"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function PromoCodesPage() {
  const codes = await getPromoCodes()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <SectionHeading as="h1" className="text-[#221F1C]">Promo Codes</SectionHeading>
          <p className="text-sm text-[#9A8F85] mt-1">Manage discounts and offers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 border border-[#E0D9CF] rounded-sm shadow-sm">
            <h3 className="font-serif text-xl text-[#221F1C] mb-4">Create New Code</h3>
            <form action={async (formData) => {
              "use server"
              await createPromoCode(formData)
            }} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#221F1C]">Code Name *</label>
                <input 
                  type="text" 
                  name="code" 
                  required 
                  placeholder="e.g. DIWALI20" 
                  className="w-full h-10 px-3 uppercase border border-[#E0D9CF] rounded-sm text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#221F1C]">Discount Type *</label>
                <div className="flex gap-6 items-center h-10 px-3 border border-[#E0D9CF] rounded-sm bg-[#FBF6EE]/30">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="discount_type" value="percentage" defaultChecked className="accent-[#DFBC94] w-4 h-4" />
                    <span className="text-sm text-[#221F1C]">Percentage (%)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="discount_type" value="fixed" className="accent-[#DFBC94] w-4 h-4" />
                    <span className="text-sm text-[#221F1C]">Fixed Amount (₹)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#221F1C]">Discount Value *</label>
                <input 
                  type="number" 
                  name="discount_value" 
                  required 
                  placeholder="20"
                  step="0.01" 
                  className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#221F1C]">Expiry Date (Optional)</label>
                <input 
                  type="date" 
                  name="expiry_date" 
                  className="w-full h-10 px-3 border border-[#E0D9CF] rounded-sm text-sm text-[#9A8F85]"
                />
              </div>

              <Button type="submit" className="w-full">Create Code</Button>
            </form>
          </div>
        </div>

        {/* Codes List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-[#E0D9CF] rounded-sm shadow-sm overflow-hidden">
            {codes.length === 0 ? (
              <div className="p-8 text-center text-[#9A8F85]">
                <p>No promo codes found.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#F5F0E8] border-b border-[#E0D9CF] text-xs font-mono text-[#9A8F85] uppercase tracking-wider">
                  <tr>
                    <th className="p-4 font-normal">Code</th>
                    <th className="p-4 font-normal">Discount</th>
                    <th className="p-4 font-normal">Expiry</th>
                    <th className="p-4 font-normal">Status</th>
                    <th className="p-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0D9CF]">
                  {codes.map(code => (
                    <tr key={code.id} className="hover:bg-[#FBF6EE]/50">
                      <td className="p-4 font-mono text-[#221F1C] font-semibold">{code.code}</td>
                      <td className="p-4 text-sm text-[#6D635B]">
                        {code.discount_type === 'percentage' ? `${code.discount_value}%` : `₹${code.discount_value}`}
                      </td>
                      <td className="p-4 text-sm text-[#9A8F85]">
                        {code.expiry_date ? new Date(code.expiry_date).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-sm ${code.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {code.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4 text-right flex items-center justify-end gap-3">
                        <form action={async () => {
                          "use server"
                          await togglePromoCode(code.id, !code.active)
                        }}>
                          <button type="submit" className="text-xs text-[#9A8F85] hover:text-[#221F1C]">
                            {code.active ? 'Disable' : 'Enable'}
                          </button>
                        </form>
                        <form action={async () => {
                          "use server"
                          await deletePromoCode(code.id)
                        }}>
                          <button type="submit" className="text-xs text-red-500 hover:text-red-700">Delete</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
