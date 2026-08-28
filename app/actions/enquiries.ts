"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

// Save enquiry to Supabase when user submits order form
export async function saveEnquiryAction(formData: FormData) {
  const supabase = await createSupabaseServerClient()

  const name = formData.get("name") as string
  const product = formData.get("product") as string
  const occasion = formData.get("occasion") as string
  const requiredBy = formData.get("requiredBy") as string
  const notes = formData.get("notes") as string
  const pages = formData.get("pages") as string

  const { data: enquiry, error } = await supabase
    .from("enquiries")
    .insert({
      name,
      occasion,
      required_by: requiredBy || null,
      notes: notes || null,
      preferred_contact: "whatsapp",
      status: "new",
    })
    .select()
    .single()

  if (error || !enquiry) {
    console.error("Enquiry save error:", error)
    return { error: "Failed to save enquiry" }
  }

  // Find product id by slug
  const { data: productData } = await supabase
    .from("products")
    .select("id")
    .eq("slug", product)
    .single()

  // Save enquiry item
  if (productData) {
    await supabase.from("enquiry_items").insert({
      enquiry_id: enquiry.id,
      product_id: productData.id,
      variant_label: pages ? `${pages} Pages` : null,
      quantity: 1,
    })
  }
  
  revalidatePath("/admin/enquiries")
  revalidatePath("/admin")

  return { success: true, enquiryId: enquiry.id }
}

// Fetch all enquiries for admin
export async function getEnquiries() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("enquiries")
    .select(`
      *,
      enquiry_items (
        variant_label,
        quantity,
        products ( name, slug )
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Fetch enquiries error details:", JSON.stringify(error, null, 2))
    return []
  }

  return data ?? []
}

// Update enquiry status
export async function updateEnquiryStatus(id: string, status: string) {
  const supabase = await createSupabaseServerClient()

  await supabase.from("enquiries").update({ status }).eq("id", id)
  revalidatePath("/admin/enquiries")
}

// Fetch dashboard counts
export async function getDashboardCounts() {
  const supabase = await createSupabaseServerClient()

  const [enquiries, products, stories] = await Promise.all([
    supabase.from("enquiries").select("id", { count: "exact" }).eq("status", "new"),
    supabase.from("products").select("id", { count: "exact" }).eq("status", "published"),
    supabase.from("stories").select("id", { count: "exact" }),
  ])

  return {
    newEnquiries: enquiries.count ?? 0,
    activeProducts: products.count ?? 0,
    totalStories: stories.count ?? 0,
  }
}

// Fetch enquiry by token for the customer upload page
export async function getEnquiryByToken(token: string) {
  const supabase = await createSupabaseServerClient()

  // The upload_token column might not exist if the user hasn't run the migration yet,
  // but if they have, we can query it.
  const { data, error } = await supabase
    .from("enquiries")
    .select("id, name, upload_status")
    .eq("upload_token", token)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

// Update upload status
export async function updateEnquiryUploadStatus(token: string, status: string) {
  const supabase = await createSupabaseServerClient()
  await supabase.from("enquiries").update({ upload_status: status }).eq("upload_token", token)
}
