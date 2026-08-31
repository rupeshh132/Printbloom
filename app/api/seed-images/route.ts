import { createSupabaseServerClient } from "@/lib/supabase-server"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// One-time route to update product images in database
// Visit: http://localhost:3000/api/seed-images to run
export async function GET() {
  const supabase = await createSupabaseServerClient()

  const imageUpdates = [
    { slug: "custom-magazine-a5", main_image_url: "https://res.cloudinary.com/gnltrlq1/image/upload/v1788039390/va7ck2ohbi9uhktrzmcx.jpg" },
    { slug: "custom-magazine-a4", main_image_url: "/images/a4-1.jpg" },
    { slug: "softcopy-magazine", main_image_url: "/images/softcopy-magazine.jpg" },
    { slug: "photo-frames", main_image_url: "/images/frame-1.jpg" },
    { slug: "polaroids", main_image_url: "/images/polaroids.jpg" },
    { slug: "spotify-cards", main_image_url: "/images/spotify-cards.jpg" },
    { slug: "desk-calendar", main_image_url: "/images/desk-calendar.png" },
    { slug: "personalised-newspaper", main_image_url: "/images/newspaper.jpg" },
    { slug: "fridge-magnet-polaroids", main_image_url: "/images/fridge-magnet-polaroids.png" },
    { slug: "keychains", main_image_url: "/images/photo-keychains.jpg" },
    { slug: "photo-booth-strips", main_image_url: "/images/photo-booth-strips.jpg" },
  ]

  const results = []
  for (const item of imageUpdates) {
    const { error } = await supabase
      .from("products")
      .update({ main_image_url: item.main_image_url })
      .eq("slug", item.slug)
    results.push({ slug: item.slug, success: !error, error: error?.message })
  }

  // FORCE CLEAR THE NEXT.JS CACHE FOR THE PRODUCTS PAGE
  revalidatePath("/products")
  revalidatePath("/")

  return NextResponse.json({ updated: results, cacheCleared: true })
}
