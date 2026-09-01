"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"


export async function getPromoCodes() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const adminEmails = ["arhaan.s7045@gmail.com"]
  if (!user || !adminEmails.includes(user.email?.toLowerCase() ?? "")) {
    return []
  }

  const { data, error } = await supabase
    .from("promo_codes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Fetch promo codes error:", error)
    return []
  }

  return data ?? []
}

export async function createPromoCode(formData: FormData) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const adminEmails = ["arhaan.s7045@gmail.com"]
  if (!user || !adminEmails.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")

  const code = formData.get("code") as string
  const discount_type = formData.get("discount_type") as string
  const discount_value = parseFloat(formData.get("discount_value") as string)
  const expiry_date = formData.get("expiry_date") as string

  const { error } = await supabase.from("promo_codes").insert({
    code: code.toUpperCase(),
    discount_type,
    discount_value,
    expiry_date: expiry_date || null,
    active: true
  })

  if (error) {
    console.error("Failed to create promo code:", error)
    return { error: error.message }
  }

  revalidatePath("/admin/promo-codes")
  return { success: true }
}

export async function togglePromoCode(id: string, active: boolean) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const adminEmails = ["arhaan.s7045@gmail.com"]
  if (!user || !adminEmails.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")

  await supabase.from("promo_codes").update({ active }).eq("id", id)
  revalidatePath("/admin/promo-codes")
}

export async function deletePromoCode(id: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const adminEmails = ["arhaan.s7045@gmail.com"]
  if (!user || !adminEmails.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")

  await supabase.from("promo_codes").delete().eq("id", id)
  revalidatePath("/admin/promo-codes")
}

// For customer checkout validation
export async function validatePromoCode(code: string) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("promo_codes")
    .select("discount_type, discount_value, active, expiry_date")
    .eq("code", code.toUpperCase())
    .single()

  if (error || !data) {
    return { error: "Invalid discount code" }
  }

  if (!data.active) {
    return { error: "This discount code is no longer active" }
  }

  if (data.expiry_date && new Date(data.expiry_date) < new Date()) {
    return { error: "This discount code has expired" }
  }

  return { discount_type: data.discount_type, discount_value: data.discount_value }
}
