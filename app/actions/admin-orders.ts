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
    console.error("Error fetching order details (likely RLS blocked):", error.message || error)
    return null
  }
  
  console.log("DEBUG - Fetched Order Data:", JSON.stringify(data, null, 2))

  // Extract customer info from address if possible
  const customerEmail = "Provided at checkout"
  const addr = Array.isArray(data.addresses) ? data.addresses[0] : data.addresses
  const customerName = addr?.full_name || "Unknown Customer"
  const customerPhone = addr?.phone_number || ""

  return { ...data, user_email: customerEmail, customer_name: customerName, customer_phone: customerPhone }
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
