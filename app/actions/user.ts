"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function updateUserProfile(data: { full_name?: string; avatar_url?: string; phone?: string }) {
  const supabase = await createSupabaseServerClient()
  
  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      phone: data.phone,
    }
  })

  if (error) {
    console.error("Failed to update user:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  revalidatePath("/profile")
  return { success: true }
}
