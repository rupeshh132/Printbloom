"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

// Fetch all products for public catalogue
export async function getProducts() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("Fetch products error:", error)
    return []
  }

  return data ?? []
}

// Fetch all products for admin (all statuses)
export async function getProductsAdmin() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) return []
  return data ?? []
}

// Seed initial products (run once from admin)
export async function seedProducts(): Promise<void> {
  const supabase = await createSupabaseServerClient()

  const products = [
    {
      slug: "custom-magazine",
      name: "The Custom Magazine",
      tagline: "A beautifully crafted editorial starring your favorite people.",
      description: "Not a photobook. A beautifully crafted, editorial-style magazine starring your favorite people. You send the photos and the story. We turn it into pages you can hold, read, and keep forever.",
      starting_price_label: "₹1,499",
      is_hero: true,
      sort_order: 1,
      status: "published",
    },
    {
      slug: "polaroid-set",
      name: "Vintage Polaroid Set",
      tagline: "Your digital memories, printed with a classic retro feel.",
      description: "Bring back the charm of physical photos. Each polaroid is printed on premium matte paper with authentic borders. Perfect for gifting, decorating, or keeping in a memory box.",
      starting_price_label: "₹499",
      is_hero: false,
      sort_order: 2,
      status: "published",
    },
    {
      slug: "photo-frame",
      name: "Classic Photo Frame",
      tagline: "Ready-to-hang wooden frames for your best moments.",
      description: "A premium quality wooden frame with your chosen photo, printed and mounted. Available in multiple sizes. Ready to hang right out of the box.",
      starting_price_label: "₹899",
      is_hero: false,
      sort_order: 3,
      status: "published",
    },
  ]

  const { error } = await supabase.from("products").upsert(products, { onConflict: "slug" })
  if (error) console.error("Seed error:", error)

  revalidatePath("/products")
  revalidatePath("/admin/(protected)/products")
}

// Toggle product status
export async function toggleProductStatus(id: string, currentStatus: string) {
  const supabase = await createSupabaseServerClient()
  const newStatus = currentStatus === "published" ? "draft" : "published"
  await supabase.from("products").update({ status: newStatus }).eq("id", id)
  revalidatePath("/admin/(protected)/products")
}
