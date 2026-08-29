"use server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function toggleWishlist(productSlug: string, productName: string, productImageUrl: string, productPrice: number) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to wishlist items." }
  }

  // Check if it already exists
  const { data: existing } = await supabase
    .from("wishlist")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_slug", productSlug)
    .single()

  if (existing) {
    // Remove from wishlist
    await supabase.from("wishlist").delete().eq("id", existing.id)
    revalidatePath("/profile")
    revalidatePath(`/products/${productSlug}`)
    return { success: true, isWishlisted: false }
  } else {
    // Add to wishlist
    await supabase.from("wishlist").insert({
      user_id: user.id,
      product_slug: productSlug,
      product_name: productName,
      product_image_url: productImageUrl,
      product_price: productPrice
    })
    revalidatePath("/profile")
    revalidatePath(`/products/${productSlug}`)
    return { success: true, isWishlisted: true }
  }
}

export async function checkWishlistStatus(productSlug: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return false

  const { data: existing } = await supabase
    .from("wishlist")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_slug", productSlug)
    .single()

  return !!existing
}
