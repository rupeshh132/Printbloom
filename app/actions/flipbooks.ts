"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function createFlipbook(enquiryToken: string, title: string, images: string[]) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: "Unauthorized" }
  
  const { data, error } = await supabase
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
export async function getAllFlipbooks() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from("flipbooks").select("*").order("created_at", { ascending: false })
  if (error) return []
  return data || []
}
