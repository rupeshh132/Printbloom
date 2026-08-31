"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import { ADMIN_EMAILS } from "@/lib/admin-config"

export async function saveFollowUpLead(customer_name: string, phone_number: string, cart_total: number) {
  const supabase = await createSupabaseServerClient()
  
  // Check if a pending lead for this phone number already exists in the last 24h
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  
  const { data: existing } = await supabase
    .from("follow_ups")
    .select("id")
    .eq("phone_number", phone_number)
    .eq("status", "pending")
    .gte("created_at", yesterday.toISOString())
    .single()
    
  if (existing) {
    // Just update the cart total if it changed
    await supabase.from("follow_ups").update({ cart_total }).eq("id", existing.id)
    return { success: true }
  }

  // Create new lead
  await supabase.from("follow_ups").insert({
    customer_name,
    phone_number,
    cart_total,
    status: "pending"
  })
  
  return { success: true }
}

export async function getFollowUps() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) return []

  const { data, error } = await supabase
    .from("follow_ups")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Fetch follow-ups error:", error)
    return []
  }

  return data ?? []
}

export async function updateFollowUpStatus(id: string, status: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) throw new Error("Unauthorized")

  await supabase.from("follow_ups").update({ status }).eq("id", id)
  revalidatePath("/admin/follow-ups")
}
