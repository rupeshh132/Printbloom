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
  const allReminders = await getAllReminders()
  
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + daysAhead)
  const targetMonth = targetDate.getMonth()
  const targetDay = targetDate.getDate()
  
  const upcoming = allReminders.filter(reminder => {
    if (!reminder.occasion_date) return false;
    const rDate = new Date(reminder.occasion_date)
    return rDate.getMonth() === targetMonth && rDate.getDate() === targetDay
  })
  
  return upcoming
}

export async function getAllReminders() {
  const supabase = await createSupabaseServerClient()
  
  // Get public CRM reminders
  const { data: publicReminders } = await supabase
    .from("reminders")
    .select("*")
    .order("created_at", { ascending: false })
    
  // Get user profile reminders
  const { data: userReminders } = await supabase
    .from("user_reminders")
    .select("*")
    .order("created_at", { ascending: false })

  // Format user_reminders to match the public ones
  const mappedUserReminders = (userReminders || []).map(ur => ({
    id: ur.id,
    customer_name: ur.person_name,
    phone_number: "Registered User", // Phone not stored directly in user_reminders row
    occasion_name: ur.event_type,
    occasion_date: ur.event_date,
    created_at: ur.created_at
  }))

  const all = [...(publicReminders || []), ...mappedUserReminders]
  
  // Sort combined array by created_at descending
  all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return all
}
