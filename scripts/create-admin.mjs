import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const { data, error } = await supabase.auth.signUp({
    email: 'arhaan.s7045@gmail.com',
    password: 'Arhaan@25',
    options: {
      data: {
        full_name: 'Arhaan Admin'
      }
    }
  })

  if (error) {
    console.error('Error creating user:', error.message)
    // If user already registered, try to sign in to verify
    if (error.message.includes('User already registered')) {
        console.log("User already exists. Attempting to verify credentials...")
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: 'arhaan.s7045@gmail.com',
            password: 'Arhaan@25',
        })
        if (signInError) {
            console.error("Verification failed! The user exists but the password is NOT 'Arhaan@25'.")
        } else {
            console.log("Verification succeeded! The password is correct.")
        }
    }
  } else {
    console.log('Successfully created admin user:', data.user?.email)
  }
}

main()
