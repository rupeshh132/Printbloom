"use client"

import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { updateProduct, getProductById } from "@/app/actions/products"
import { useRouter } from "next/navigation"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [fetching, setFetching] = React.useState(true)
  const [productId, setProductId] = React.useState<string | null>(null)

  // Image states
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [existingImage, setExistingImage] = React.useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  // Form states to allow auto-filling
  const [formDataState, setFormDataState] = React.useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    price: ""
  })

  React.useEffect(() => {
    async function loadProduct() {
      try {
        const resolvedParams = await params
        setProductId(resolvedParams.id)
        const product = await getProductById(resolvedParams.id)
        
        if (product) {
          setFormDataState({
            name: product.name || "",
            slug: product.slug || "",
            tagline: product.tagline || "",
            description: product.description || "",
            price: product.price || ""
          })
          setExistingImage(product.main_image_url || null)
        }
      } catch (err) {
        console.error("Failed to fetch product", err)
      } finally {
        setFetching(false)
      }
    }
    loadProduct()
  }, [params])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormDataState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!productId) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      
      let imageUrl = existingImage

      if (file) {
        // Upload new image to Cloudinary
        const uploadData = new FormData()
        uploadData.append("file", file)
        uploadData.append("upload_preset", "Printbloom")
        uploadData.append("cloud_name", "gnltrlq1")

        const res = await fetch(`https://api.cloudinary.com/v1_1/gnltrlq1/image/upload`, {
          method: "POST",
          body: uploadData
        })
        const data = await res.json()
        if (data.secure_url) {
          imageUrl = data.secure_url
        }
      }

      if (imageUrl) {
        formData.append("main_image_url", imageUrl)
      }

      const result = await updateProduct(productId, formData)
      
      if (result.error) {
        throw new Error(result.error)
      }

      router.push("/admin/products")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to update product")
      setLoading(false)
    }
  }

  if (fetching) return <div className="p-8">Loading product details...</div>

  return (
    <div className="max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <SectionHeading as="h1" className="text-[#221F1C]">Edit Product</SectionHeading>
          <p className="text-sm text-[#9A8F85] mt-1">Update details for this product.</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 shadow-sm border border-[#E0D9CF] rounded-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-[#221F1C]">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formDataState.name}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#C1502E] rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium text-[#221F1C]">URL Slug</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formDataState.slug}
              onChange={handleChange}
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#C1502E] rounded-sm bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tagline" className="text-sm font-medium text-[#221F1C]">Tagline</label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={formDataState.tagline}
              onChange={handleChange}
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#C1502E] rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium text-[#221F1C]">Price Display</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formDataState.price}
              onChange={handleChange}
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#C1502E] rounded-sm"
              placeholder="e.g. ₹1499"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-[#221F1C]">Description</label>
            <textarea
              id="description"
              name="description"
              value={formDataState.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-4 border border-[#E0D9CF] focus:outline-none focus:border-[#C1502E] rounded-sm resize-y"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#221F1C]">Product Image</label>
            
            <div className="mt-2 flex items-center gap-6">
              <div className="w-24 h-24 bg-[#F5F0E8] border border-[#E0D9CF] rounded-sm overflow-hidden relative flex-shrink-0">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : existingImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={existingImage} alt="Current" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#9A8F85]">
                    No Image
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label 
                  htmlFor="image"
                  className="inline-block px-4 py-2 border border-[#E0D9CF] bg-[#FBF6EE] text-sm text-[#221F1C] cursor-pointer hover:bg-[#F5F0E8] rounded-sm transition-colors"
                >
                  Change Image
                </label>
                <p className="text-xs text-[#9A8F85] mt-2">Recommended: Square format (1:1), max 2MB.</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm border border-red-100 rounded-sm">
              {error}
            </div>
          )}

          <div className="pt-4 border-t border-[#E0D9CF] flex gap-4">
            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading ? "Saving Changes..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/admin/products")} className="w-full md:w-auto">
              Cancel
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}
