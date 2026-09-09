"use server"

import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import { ADMIN_EMAILS } from "@/lib/admin-config"

export async function createFlipbook(enquiryToken: string, title: string, images: string[]) {
  const supabaseUser = await createSupabaseServerClient()
  const { data: { user } } = await supabaseUser.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) return { success: false, error: "Unauthorized" }
  
  const supabaseAdmin = await createSupabaseAdminClient()
  const { data, error } = await supabaseAdmin
    .from("flipbooks")
    .insert([{ enquiry_token: enquiryToken, title, images }])
    .select()
    .single()
    
  if (error) {
    console.error("Error creating flipbook:", error)
    return { success: false, error: error.message }
  }
  
  revalidatePath(`/admin/enquiries/${enquiryToken}`)
  return { success: true, flipbookId: data.id }
}

export async function getFlipbook(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("flipbooks")
    .select("*")
    .eq("id", id)
    .single()
    
  if (error) {
    console.error("Error fetching flipbook:", error)
    return null
  }
  return data
}

export async function getFlipbooksByEnquiry(token: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("flipbooks")
    .select("*")
    .eq("enquiry_token", token)
    .order("created_at", { ascending: false })
    
  if (error) {
    return []
  }
  return data
}
export async function deleteFlipbook(id: string) {
  const supabaseUser = await createSupabaseServerClient()
  const { data: { user } } = await supabaseUser.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) return { success: false, error: "Unauthorized" }

  const supabaseAdmin = await createSupabaseAdminClient()
  const { error } = await supabaseAdmin.from("flipbooks").delete().eq("id", id)
  
  if (error) {
    console.error("Error deleting flipbook:", error)
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/(protected)/flipbooks")
  return { success: true }
}

export async function updateFlipbookTitle(id: string, title: string) {
  const supabaseUser = await createSupabaseServerClient()
  const { data: { user } } = await supabaseUser.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) return { success: false, error: "Unauthorized" }

  const supabaseAdmin = await createSupabaseAdminClient()
  const { error } = await supabaseAdmin.from("flipbooks").update({ title }).eq("id", id)
  
  if (error) {
    console.error("Error updating flipbook title:", error)
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/(protected)/flipbooks")
  return { success: true }
}

export async function getAllFlipbooks() {
  const supabaseUser = await createSupabaseServerClient()
  const { data: { user } } = await supabaseUser.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) return []

  const supabaseAdmin = await createSupabaseAdminClient()
  const { data, error } = await supabaseAdmin.from("flipbooks").select("*").order("created_at", { ascending: false })
  if (error) return []
  return data || []
}
