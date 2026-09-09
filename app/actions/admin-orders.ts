"use server"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function getAdminOrders() {
  const supabaseUser = await createSupabaseServerClient()
  const { data: { user } } = await supabaseUser.auth.getUser()
  const { ADMIN_EMAILS } = await import("@/lib/admin-config")
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")

  const { createSupabaseAdminClient } = await import("@/lib/supabase-server")
  const supabaseAdmin = await createSupabaseAdminClient()

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(`
      *,
      addresses (*),
      order_items (*)
    `)
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching admin orders:", error)
    return []
  }

  return data
}

export async function getAdminOrderById(id: string) {
  const supabaseUser = await createSupabaseServerClient()
  const { data: { user } } = await supabaseUser.auth.getUser()
  const { ADMIN_EMAILS } = await import("@/lib/admin-config")
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")

  const { createSupabaseAdminClient } = await import("@/lib/supabase-server")
  const supabaseAdmin = await createSupabaseAdminClient()

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(`
      *,
      addresses (*),
      order_items (*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching order details:", error.message || error)
    return null
  }

  // Extract customer info from address if possible
  const customerEmail = "Provided at checkout"
  const addr = Array.isArray(data.addresses) ? data.addresses[0] : data.addresses
  const customerName = addr?.full_name || "Unknown Customer"
  const customerPhone = addr?.phone_number || ""

  return { ...data, user_email: customerEmail, customer_name: customerName, customer_phone: customerPhone }
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { ADMIN_EMAILS } = await import("@/lib/admin-config")
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")
  
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)

  if (error) {
    console.error("Failed to update order status:", error)
    throw new Error(error.message)
  }

  revalidatePath("/admin/orders")
  revalidatePath(`/admin/orders/${id}`)
  return { success: true }
}

export async function updateImagesStatus(id: string, images_status: string) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { ADMIN_EMAILS } = await import("@/lib/admin-config")
  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) throw new Error("Unauthorized")
  
  const { error } = await supabase
    .from("orders")
    .update({ images_status })
    .eq("id", id)

  if (error) {
    console.error("Failed to update images status:", error)
    throw new Error(error.message)
  }

  revalidatePath("/admin/orders")
  revalidatePath(`/admin/orders/${id}`)
  return { success: true }
}
