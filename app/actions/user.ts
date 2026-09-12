"use server"

import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function updateUserProfile(data: { full_name?: string; avatar_url?: string; phone?: string }) {
  const supabase = await createSupabaseServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: "Not logged in" }

  const supabaseAdmin = await createSupabaseAdminClient()
  
  // Clean up undefined values so we don't overwrite with null
  const updateData: any = {}
  if (data.full_name !== undefined) updateData.full_name = data.full_name
  if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url
  if (data.phone !== undefined) updateData.phone = data.phone

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    user_metadata: updateData
  })

  if (error) {
    console.error("Failed to update user:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  revalidatePath("/profile")
  return { success: true }
}
