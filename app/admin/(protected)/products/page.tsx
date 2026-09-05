import { SectionHeading } from "@/components/ui/section-heading"
import { DeleteSubmitButton } from "@/components/admin/delete-submit-button"
import { getProductsAdmin, toggleProductStatus, seedProducts } from "@/app/actions/products"
import { Button } from "@/components/ui/button"

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
          <form action={seedProducts}>
            <Button size="sm" variant="outline" type="submit">Seed Default Products</Button>
          </form>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-[#E0D9CF] rounded-sm p-12 text-center">
          <p className="text-4xl mb-4">📦</p>
          <p className="font-serif text-xl text-[#221F1C] mb-2">No products yet</p>
          <p className="text-sm text-[#9A8F85] mb-6">Click "Seed Default Products" to add PrintBloom's catalogue.</p>
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
                <th className="p-4 font-normal">Actions</th>
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
                    <div className="flex items-center gap-3">
                      {/* Edit Button (Placeholder link for now) */}
                      <a 
                        href={`/admin/products/${product.id}/edit`} 
                        className="text-xs text-blue-600 hover:underline flex items-center"
                        title="Edit Product"
                      >
                        Edit
                      </a>

                      {/* Publish / Unpublish Toggle */}
                      <form action={async () => {
                        "use server"
                        await toggleProductStatus(product.id, product.status)
                      }}>
                        <button type="submit" className="text-xs text-amber-600 hover:underline">
                          {product.status === "published" ? "Unpublish" : "Publish"}
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