"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import { ADMIN_EMAILS } from "@/lib/admin-config"

export async function getJournals() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Fetch journal error:", error)
    return []
  }

  return data ?? []
}

export async function getPublishedJournals() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Fetch published journal error:", error)
    return []
  }

  return data ?? []
}

export async function getJournalBySlug(slug: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Fetch journal by slug error:", error)
    return null
  }

  return data
}

export async function createJournalEntry(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) throw new Error("Unauthorized")

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const media_url = formData.get("media_url") as string
  const media_type = formData.get("media_type") as string
  const customer_name = formData.get("customer_name") as string
  const product_name = formData.get("product_name") as string

  // Simple slug generation
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6)

  let error;
  if (id) {
    // Update existing story
    const res = await supabase.from("stories").update({
      title,
      content,
      media_url,
      media_type,
      customer_name,
      product_name
    }).eq("id", id)
    error = res.error
  } else {
    // Insert new story
    const res = await supabase.from("stories").insert({
      title,
      slug,
      content,
      media_url,
      media_type,
      customer_name,
      product_name,
      published: true
    })
    error = res.error
  }

  if (error) {
    console.error("Failed to create journal entry:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/journal")
  revalidatePath("/journal")
  revalidatePath("/")
  return { success: true }
}

export async function toggleJournalPublished(id: string, published: boolean) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) throw new Error("Unauthorized")

  await supabase.from("stories").update({ published }).eq("id", id)
  revalidatePath("/admin/journal")
  revalidatePath("/journal")
  revalidatePath("/")
}

export async function deleteJournalEntry(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) throw new Error("Unauthorized")

  await supabase.from("stories").delete().eq("id", id)
  revalidatePath("/admin/journal")
  revalidatePath("/journal")
  revalidatePath("/")
}
