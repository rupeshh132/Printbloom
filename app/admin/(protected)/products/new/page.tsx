"use client"

import * as React from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { createProduct } from "@/app/actions/products"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

// Client-side supabase instance for uploading files
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  // Image states
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const [category, setCategory] = React.useState("blank")

  // Form states to allow auto-filling
  const [formDataState, setFormDataState] = React.useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    price: ""
  })

  const productTemplates: Record<string, any> = {
    "blank": { name: "", slug: "", tagline: "", description: "", price: "" },
    "magazine-a4": {
      name: "Custom Magazine — A4",
      slug: "custom-magazine-a4",
      tagline: "Large-format editorial for your biggest moments.",
      description: "A stunning A4 large-format magazine. Ideal for wedding albums, big anniversaries, and grand gestures.",
      price: "₹499"
    },
    "magazine-a5": {
      name: "Custom Magazine — A5",
      slug: "custom-magazine-a5",
      tagline: "A compact, beautiful editorial of your memories.",
      description: "Our signature A5 custom magazine. Perfectly sized to hold in your hands. You provide the photos, we craft the story.",
      price: "₹399"
    },
    "polaroids": {
      name: "Vintage Polaroids",
      slug: "polaroids",
      tagline: "Your digital memories, printed with a classic retro feel.",
      description: "Authentic Polaroid-style prints on premium matte paper. Perfect for your wall or as a small surprise.",
      price: "₹249"
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setCategory(val)
    if (productTemplates[val]) {
      setFormDataState(productTemplates[val])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    // Auto-generate slug if empty
    let slug = formData.get("slug") as string
    if (!slug) {
      slug = (formData.get("name") as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      formData.set("slug", slug)
    }

    try {
      // 1. Upload image if provided
      if (file) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${slug}-${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("images")
          .upload(`products/${fileName}`, file)

        if (uploadError) throw new Error("Image upload failed: " + uploadError.message)

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("images")
          .getPublicUrl(`products/${fileName}`)
          
        formData.append("main_image_url", publicUrl)
      }

      // 2. Save product data
      const result = await createProduct(formData)

      if (result?.error) {
        throw new Error(result.error)
      }

      router.push("/admin/products")
    } catch (err: any) {
      console.error(err)
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <SectionHeading as="h1" className="text-[#221F1C]">Add New Product</SectionHeading>
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
      </div>

      <div className="bg-white p-8 shadow-sm border border-[#E0D9CF] rounded-sm">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2 pb-6 border-b border-[#E0D9CF]">
            <label htmlFor="category" className="text-sm font-medium text-[#DFBC94]">' Smart Product Template</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="w-full h-11 px-4 border border-[#DFBC94]/30 bg-[#FBF6EE] focus:outline-none focus:border-[#DFBC94] rounded-sm text-[#221F1C]"
            >
              <option value="blank">Custom / Normal Product</option>
              <option value="magazine-a4">Custom Magazine (A4)</option>
              <option value="magazine-a5">Custom Magazine (A5)</option>
              <option value="polaroids">Vintage Polaroids</option>
            </select>
            <p className="text-xs text-[#9A8F85]">Select a template to auto-fill product details.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-[#221F1C]">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formDataState.name}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm"
              placeholder="e.g. Classic Photo Frame"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium text-[#221F1C]">URL Slug (Optional)</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formDataState.slug}
              onChange={handleChange}
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm bg-gray-50"
              placeholder="e.g. classic-photo-frame"
            />
            <p className="text-xs text-[#9A8F85]">Leave empty to auto-generate from name.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="tagline" className="text-sm font-medium text-[#221F1C]">Tagline</label>
            <input
              type="text"
              id="tagline"
              name="tagline"
              value={formDataState.tagline}
              onChange={handleChange}
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm"
              placeholder="e.g. Ready-to-hang wooden frames."
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
              className="w-full p-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm resize-none"
              placeholder="Detailed description of the product..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="starting_price_label" className="text-sm font-medium text-[#221F1C]">Price Label *</label>
            <input
              type="text"
              id="starting_price_label"
              name="starting_price_label"
              value={formDataState.price}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 border border-[#E0D9CF] focus:outline-none focus:border-[#DFBC94] rounded-sm"
              placeholder="e.g. ₹899"
            />
          </div>

          <div className="space-y-4 pt-2 border-t border-[#E0D9CF]">
            <h3 className="text-sm font-medium text-[#221F1C]">Product Image</h3>
            
            {preview && (
              <div className="relative w-48 h-48 border border-[#E0D9CF] rounded-sm overflow-hidden mb-4">
                <img src={preview} alt="Preview" className="object-cover w-full h-full" />
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-[#9A8F85]
                file:mr-4 file:py-2 file:px-4
                file:rounded-sm file:border-0
                file:text-sm file:font-medium
                file:bg-[#F5F0E8] file:text-[#221F1C]
                hover:file:bg-[#E0D9CF] transition-colors cursor-pointer"
            />
          </div>

          <div className="flex items-center space-x-2 pt-4 border-t border-[#E0D9CF]">
            <input
              type="checkbox"
              id="is_hero"
              name="is_hero"
              className="w-4 h-4 text-[#DFBC94] border-[#E0D9CF] focus:ring-[#DFBC94] rounded-sm"
            />
            <label htmlFor="is_hero" className="text-sm text-[#221F1C]">
              Is Hero Product? (Takes up 2 slots in the product grid)
            </label>
          </div>

          <div className="pt-6">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving Product..." : "Save Product (Draft)"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
