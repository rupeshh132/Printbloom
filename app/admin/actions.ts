"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { redirect } from "next/navigation"

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Redirect to admin dashboard on success
  redirect("/admin")
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
