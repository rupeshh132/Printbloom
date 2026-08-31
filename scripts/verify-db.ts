import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

const envFile = fs.readFileSync(".env.local", 'utf8')
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('='))
    .filter(parts => parts.length >= 2)
    .map(parts => [parts[0].trim(), parts.slice(1).join('=').trim()])
)

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL']
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY']
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data, error } = await supabase.from("products").select("slug, main_image_url")
  if (error) console.error(error)
  else console.log(JSON.stringify(data, null, 2))
}
run()
