"use server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function getAdminOrders() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      addresses (*),
      order_items (*)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching admin orders:", error)
    return []
  }

  return data
}

export async function getAdminOrderById(id: string) {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      addresses (*),
      order_items (*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching order details:", error)
    return null
  }

  // Also fetch the user profile (email) for this order
  const { data: userData } = await supabase
    .from("users")
    .select("email")
    .eq("id", data.user_id)
    .single()

  return { ...data, user_email: userData?.email || "Unknown User" }
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createSupabaseServerClient()
  
  await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)

  revalidatePath("/admin/orders")
  revalidatePath(`/admin/orders/${id}`)
  return { success: true }
}
