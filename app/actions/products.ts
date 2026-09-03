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
  const { data: { user } } = await supabase.auth.getUser()
  const { ADMIN_EMAILS } = await import("@/lib/admin-config")
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) return []
  return data ?? []
}

// Fetch a single product by slug
export async function getProductBySlug(slug: string) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) return null
  
  // Extract number from starting_price_label for the cart
  // E.g., "From ₹1399" -> 1399
  const numMatch = data.starting_price_label?.match(/\d+/)
  const starting_price = numMatch ? parseInt(numMatch[0]) : 0
  
  return { ...data, starting_price }
}

// Seed initial products (run once from admin)
export async function seedProducts(): Promise<void> {
  const supabase = await createSupabaseServerClient()

  // Clean up old dummy products if they exist so we don't have duplicates
  await supabase.from("products").delete().in("slug", ["custom-magazine", "polaroid-set", "photo-frame"])

  const products = [
    {
      slug: "custom-magazine-a5",
      name: "Custom Magazine — A5",
      tagline: "A compact, beautiful editorial of your memories.",
      description: "Our signature A5 custom magazine. Perfectly sized to hold in your hands. You provide the photos, we craft the story.",
      starting_price_label: "From ₹399",
      main_image_url: "https://res.cloudinary.com/gnltrlq1/image/upload/v1788039390/va7ck2ohbi9uhktrzmcx.jpg",
      is_hero: true,
      sort_order: 1,
      status: "published",
    },
    {
      slug: "custom-magazine-a4",
      name: "Custom Magazine — A4",
      tagline: "Large-format editorial for your biggest moments.",
      description: "A stunning A4 large-format magazine. Ideal for wedding albums, big anniversaries, and grand gestures.",
      starting_price_label: "From ₹499",
      main_image_url: "/images/a4-1.jpg",
      is_hero: true,
      sort_order: 2,
      status: "published",
    },
    {
      slug: "softcopy-magazine",
      name: "Softcopy Magazine",
      tagline: "Digital editorial you can share instantly.",
      description: "A digital-only version of our signature magazine. Formatted as a high-quality PDF flipbook, perfect for long-distance gifting.",
      starting_price_label: "From ₹199",
      main_image_url: "/images/softcopy-magazine.jpg",
      is_hero: false,
      sort_order: 3,
      status: "published",
    },
    {
      slug: "photo-frames",
      name: "Premium Photo Frames",
      tagline: "Ready-to-hang wooden frames.",
      description: "Available in Small, Medium, and Large. We print your favorite photo and mount it in a premium wooden frame.",
      starting_price_label: "From ₹349",
      main_image_url: "/images/frame-1.jpg",
      is_hero: false,
      sort_order: 4,
      status: "published",
    },
    {
      slug: "polaroids",
      name: "Vintage Polaroids",
      tagline: "Your digital memories, printed with a classic retro feel.",
      description: "Authentic Polaroid-style prints on premium matte paper. Perfect for your wall or as a small surprise.",
      starting_price_label: "From ₹249",
      main_image_url: "/images/polaroids.jpg",
      is_hero: false,
      sort_order: 5,
      status: "published",
    },
    {
      slug: "spotify-cards",
      name: "Spotify Cards",
      tagline: "Your special song, printed beautifully.",
      description: "A custom printed card featuring a photo and a scannable Spotify code of your favorite song.",
      starting_price_label: "From ₹179",
      main_image_url: "/images/spotify-cards.jpg",
      is_hero: false,
      sort_order: 6,
      status: "published",
    },
    {
      slug: "desk-calendar",
      name: "Personalised Desk Calendar",
      tagline: "A year of your favorite memories.",
      description: "A 12-month desk calendar featuring your photos for each month. Premium spiral binding and thick cardstock.",
      starting_price_label: "₹499",
      main_image_url: "/images/desk-calendar.png",
      is_hero: false,
      sort_order: 7,
      status: "published",
    },
    {
      slug: "personalised-newspaper",
      name: "Personalised Newspaper",
      tagline: "Extra! Extra! Read all about your love story.",
      description: "A custom 4 or 6-page vintage newspaper featuring your own headlines, articles, and photos.",
      starting_price_label: "From ₹249",
      main_image_url: "/images/newspaper.jpg",
      is_hero: false,
      sort_order: 8,
      status: "published",
    },
    {
      slug: "fridge-magnet-polaroids",
      name: "Fridge Magnet Polaroids",
      tagline: "Stick your favorite moments to the fridge.",
      description: "High-quality polaroid prints with a magnetic backing. The perfect daily reminder of good times.",
      starting_price_label: "From ₹299",
      main_image_url: "/images/fridge-magnet-polaroids.png",
      is_hero: false,
      sort_order: 9,
      status: "published",
    },
    {
      slug: "keychains",
      name: "Photo Keychains",
      tagline: "Take your memories everywhere.",
      description: "Durable acrylic keychains featuring your favorite photos back-to-back.",
      starting_price_label: "From ₹149",
      main_image_url: "/images/photo-keychains.jpg",
      is_hero: false,
      sort_order: 10,
      status: "published",
    },
    {
      slug: "photo-booth-strips",
      name: "Photo Booth Strips",
      tagline: "Classic photobooth aesthetics.",
      description: "Vintage-style 4-photo strips, perfect for bookmarks or sticking in a journal.",
      starting_price_label: "From ₹199",
      main_image_url: "/images/photo-booth-strips.jpg",
      is_hero: false,
      sort_order: 11,
      status: "published",
    }
  ]

  const { error } = await supabase.from("products").upsert(products, { onConflict: "slug" })
  if (error) console.error("Seed error:", error)

  revalidatePath("/products")
  revalidatePath("/admin/(protected)/products")
}

// Toggle product status
export async function toggleProductStatus(id: string, currentStatus: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { ADMIN_EMAILS } = await import("@/lib/admin-config")
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")

  const newStatus = currentStatus === "published" ? "draft" : "published"
  await supabase.from("products").update({ status: newStatus }).eq("id", id)
  revalidatePath("/admin/(protected)/products")
}

// Create a new product
export async function createProduct(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { ADMIN_EMAILS } = await import("@/lib/admin-config")
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const tagline = formData.get("tagline") as string
  const description = formData.get("description") as string
  const price = formData.get("starting_price_label") as string
  const mainImageUrl = formData.get("main_image_url") as string
  const isHero = formData.get("is_hero") === "on"
  
  const imageUrlsString = formData.get("image_urls") as string
  let imageUrls: string[] = []
  if (imageUrlsString) {
    try {
      imageUrls = JSON.parse(imageUrlsString)
    } catch (e) {
      console.error("Invalid image_urls format")
    }
  }

  const finalMainImageUrl = (imageUrls.length > 0) ? imageUrls[0] : (mainImageUrl || null)

  const { error } = await supabase.from("products").insert({
    name,
    slug,
    tagline,
    description,
    starting_price_label: price,
    main_image_url: finalMainImageUrl,
    image_urls: imageUrls,
    is_hero: isHero,
    status: "draft"
  })

  if (error) {
    console.error("Error creating product:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/(protected)/products")
  revalidatePath("/products")
  return { success: true }
}

// Delete a product
export async function deleteProduct(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { ADMIN_EMAILS } = await import("@/lib/admin-config")
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")
  
  const { error } = await supabase.from("products").delete().eq("id", id)
  
  if (error) {
    console.error("Error deleting product:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/(protected)/products")
  revalidatePath("/products")
  return { success: true }
}
export async function getProductById(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()
  return data
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { ADMIN_EMAILS } = await import("@/lib/admin-config")
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const slug = formData.get("slug") as string || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const tagline = formData.get("tagline") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string
  const mainImageUrl = formData.get("main_image_url") as string
  const imageUrlsString = formData.get("image_urls") as string
  
  const updateData: any = { name, slug, tagline, description, starting_price_label: price }

  if (imageUrlsString) {
    try {
      const imageUrls = JSON.parse(imageUrlsString)
      updateData.image_urls = imageUrls
      updateData.main_image_url = (imageUrls.length > 0) ? imageUrls[0] : (mainImageUrl || null)
    } catch (e) {
      console.error("Invalid image_urls format")
      updateData.main_image_url = mainImageUrl
    }
  } else {
    updateData.main_image_url = mainImageUrl
  }

  const { error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", id)

  if (error) return { error: error.message }
  revalidatePath("/admin/products")
  revalidatePath("/products")
  return { success: true }
}
