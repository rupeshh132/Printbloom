import { SectionHeading } from "@/components/ui/section-heading"
import { DeleteSubmitButton } from "@/components/admin/delete-submit-button"
import { getProductsAdmin, toggleProductStatus, duplicateProduct } from "@/app/actions/products"
import { Button } from "@/components/ui/button"
import { ExternalLink, Copy } from "lucide-react"

export default async function AdminProducts() {
  const products = await getProductsAdmin()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <SectionHeading as="h1" className="text-[#221F1C]">Products</SectionHeading>
          <p className="text-sm text-[#9A8F85] mt-1">{products.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="default">
            <a href="/admin/products/new">Add New Product</a>
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-[#E0D9CF] rounded-sm p-12 text-center">
          <p className="text-4xl mb-4">📦</p>
          <p className="font-serif text-xl text-[#221F1C] mb-2">No products yet</p>
          <p className="text-sm text-[#9A8F85] mb-6">Create a new product to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="bg-white shadow-sm border border-[#E0D9CF] rounded-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F5F0E8] border-b border-[#E0D9CF] text-xs font-mono text-[#9A8F85] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-normal">Name</th>
                <th className="p-4 font-normal">Slug</th>
                <th className="p-4 font-normal">Starting Price</th>
                <th className="p-4 font-normal">Hero</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0D9CF]">
              {products.map((product: any) => (
                <tr key={product.id} className="hover:bg-[#FBF6EE]/50 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-[#221F1C]">{product.name}</p>
                    <p className="text-xs text-[#9A8F85] mt-0.5">{product.tagline}</p>
                  </td>
                  <td className="p-4 font-mono text-sm text-[#9A8F85]">{product.slug}</td>
                  <td className="p-4 text-sm">{product.starting_price_label}</td>
                  <td className="p-4 text-sm">{product.is_hero ? "⭐ Yes" : "—"}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-sm font-medium ${product.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-3">
                      <a 
                        href={`/products/${product.slug}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs text-[#8B6B43] hover:text-[#DFBC94] flex items-center gap-1"
                        title="Preview Product"
                      >
                        <ExternalLink className="w-3 h-3" /> Preview
                      </a>
                      
                      <form action={async () => {
                        "use server"
                        await duplicateProduct(product.id)
                      }}>
                        <button 
                          type="submit" 
                          className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          title="Duplicate Product"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </form>

                      <a href={`/admin/products/${product.id}/edit`} className="text-xs text-[#8B6B43] hover:text-[#DFBC94] underline underline-offset-2">
                        Edit
                      </a>
                      
                      <form action={async () => {
                        "use server"
                        await toggleProductStatus(product.id, product.status)
                      }}>
                        <button type="submit" className="text-xs text-[#8B6B43] hover:text-[#DFBC94] underline underline-offset-2">
                          {product.status === "published" ? "Hide" : "Publish"}
                        </button>
                      </form>

                      {/* Delete Product */}
                      <form action={async () => {
                        "use server"
                        const { deleteProduct } = await import("@/app/actions/products")
                        await deleteProduct(product.id)
                      }}>
                        <DeleteSubmitButton itemName="this product" />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  )
}