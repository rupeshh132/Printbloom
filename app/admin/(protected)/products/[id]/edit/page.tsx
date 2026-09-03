"use client"

import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { updateProduct, getProductById } from "@/app/actions/products"
import { useRouter } from "next/navigation"
import imageCompression from "browser-image-compression"

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [fetching, setFetching] = React.useState(true)
  const [productId, setProductId] = React.useState<string | null>(null)

  // Image states
  const [files, setFiles] = React.useState<File[]>([])
  const [previews, setPreviews] = React.useState<string[]>([])
  const [existingImages, setExistingImages] = React.useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      if (files.length + existingImages.length + selectedFiles.length > 6) {
        alert(`Maximum 6 images allowed per product. You currently have ${existingImages.length} saved.`)
        return
      }
      const newFiles = [...files, ...selectedFiles].slice(0, 6 - existingImages.length)
      setFiles(newFiles)
      setPreviews(newFiles.map(f => URL.createObjectURL(f)))
    }
  }

  const removeNewImage = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
    setPreviews(newFiles.map(f => URL.createObjectURL(f)))
  }

  const removeExistingImage = (index: number) => {
    const newExisting = [...existingImages]
    newExisting.splice(index, 1)
    setExistingImages(newExisting)
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
          
          if (product.image_urls && product.image_urls.length > 0) {
            setExistingImages(product.image_urls)
          } else if (product.main_image_url) {
            setExistingImages([product.main_image_url])
          }
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
      
      let allImageUrls = [...existingImages]

      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const currentFile = files[i]
          
          // Compress Image
          const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          }
          const compressedFile = await imageCompression(currentFile, options)
          
          const uploadData = new FormData()
          uploadData.append("file", compressedFile)
          uploadData.append("upload_preset", "Printbloom")
          uploadData.append("cloud_name", "gnltrlq1")

          const res = await fetch(`https://api.cloudinary.com/v1_1/gnltrlq1/image/upload`, {
            method: "POST",
            body: uploadData
          })
          
          if (!res.ok) {
             const errorData = await res.json().catch(() => ({}))
             throw new Error(`Upload failed for image ${i + 1}: ${errorData.error?.message || res.statusText}`)
          }
          
          const data = await res.json()
          if (data.error) {
             throw new Error(`Upload failed for image ${i + 1}: ${data.error.message}`)
          }

          if (data.secure_url) {
            allImageUrls.push(data.secure_url)
          } else {
             throw new Error(`Upload failed for image ${i + 1}: No URL returned from provider`)
          }
        }
      }

      if (allImageUrls.length > 0) {
        formData.append("image_urls", JSON.stringify(allImageUrls))
        // main_image_url is automatically handled in actions/products.ts
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

          <div className="space-y-4 pt-2 border-t border-[#E0D9CF]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-[#221F1C]">Product Images (Max 6)</h3>
              <span className="text-xs text-[#9A8F85]">{existingImages.length + files.length}/6 uploaded</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
              {existingImages.map((url, idx) => (
                <div key={`existing-${idx}`} className="relative w-24 h-24 border border-[#E0D9CF] rounded-sm overflow-hidden group bg-gray-100">
                  <img src={url} alt={`Saved ${idx + 1}`} className="object-cover w-full h-full" />
                  {idx === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                      Main Image
                    </div>
                  )}
                  <button 
                    type="button" 
                    onClick={() => removeExistingImage(idx)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                    title="Remove saved image"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {previews.map((previewUrl, idx) => (
                <div key={`new-${idx}`} className="relative w-24 h-24 border border-green-500 rounded-sm overflow-hidden group">
                  <img src={previewUrl} alt={`New ${idx + 1}`} className="object-cover w-full h-full" />
                  <div className="absolute top-1 left-1 bg-green-500 text-white text-[9px] px-1 rounded-sm shadow-sm">
                    New
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeNewImage(idx)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            {existingImages.length + files.length < 6 && (
              <div className="mt-4">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label 
                  htmlFor="image"
                  className="inline-block px-4 py-2 border border-[#E0D9CF] bg-[#FBF6EE] text-sm text-[#221F1C] cursor-pointer hover:bg-[#F5F0E8] rounded-sm transition-colors"
                >
                  Add More Images
                </label>
                <p className="text-xs text-[#9A8F85] mt-2">Recommended: Square format (1:1), max 2MB.</p>
              </div>
            )}
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
