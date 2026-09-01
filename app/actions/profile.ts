"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const supabase = await createSupabaseServerClient()

  const fullName = formData.get("full_name") as string
  const phoneNumber = formData.get("phone_number") as string

  const updates: Record<string, string> = {}
  
  if (fullName && fullName.trim() !== "") {
    updates.full_name = fullName
  }
  
  if (phoneNumber && phoneNumber.trim() !== "") {
    // Basic sanitation
    updates.phone = phoneNumber.replace(/[^0-9+]/g, '')
  }

  const { data, error } = await supabase.auth.updateUser({
    data: updates
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/profile")
  return { success: true }
}
