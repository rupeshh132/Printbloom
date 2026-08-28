"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function saveReminder(formData: FormData) {
  const customerName = formData.get("customer_name") as string
  const phoneNumber = formData.get("phone_number") as string
  const occasionName = formData.get("occasion_name") as string
  const occasionDate = formData.get("occasion_date") as string // Format: YYYY-MM-DD

  if (!customerName || !phoneNumber || !occasionName || !occasionDate) {
    return { success: false, error: "All fields are required." }
  }

  const supabase = await createSupabaseServerClient()
  
  const { error } = await supabase
    .from("reminders")
    .insert([{ 
      customer_name: customerName, 
      phone_number: phoneNumber,
      occasion_name: occasionName,
      occasion_date: occasionDate
    }])
    
  if (error) {
    console.error("Error saving reminder:", error)
    return { success: false, error: error.message }
  }
  
  revalidatePath("/admin/reminders")
  return { success: true }
}

export async function getUpcomingReminders(daysAhead: number = 20) {
  const supabase = await createSupabaseServerClient()
  
  // Find dates that match today + daysAhead (Ignoring year for birthdays/anniversaries)
  // Since Postgres doesn't easily let us query "Day/Month matches" dynamically without raw SQL or RPC in standard supabase-js,
  // we will fetch all active reminders and filter them in JavaScript for this demo.
  // In production, an RPC function or edge function is better.
  
  const { data, error } = await supabase.from("reminders").select("*")
  
  if (error || !data) {
    return []
  }
  
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + daysAhead)
  const targetMonth = targetDate.getMonth()
  const targetDay = targetDate.getDate()
  
  const upcoming = data.filter(reminder => {
    const rDate = new Date(reminder.occasion_date)
    return rDate.getMonth() === targetMonth && rDate.getDate() === targetDay
  })
  
  return upcoming
}

export async function getAllReminders() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("reminders").select("*").order("created_at", { ascending: false })
  return data || []
}
