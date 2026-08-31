// Run with: node scripts/update-product-images.js
// This directly updates product images in Supabase

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://tsapvtouowvsjdlpvydj.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseServiceKey) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY not set. Add it to .env.local and run with dotenv.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const imageUpdates = [
  { slug: 'custom-magazine-a5', main_image_url: '/images/a4-2.jpg' },
  { slug: 'custom-magazine-a4', main_image_url: '/images/a4-1.jpg' },
  { slug: 'softcopy-magazine', main_image_url: '/images/softcopy-magazine.jpg' },
  { slug: 'photo-frames', main_image_url: '/images/frame-1.jpg' },
  { slug: 'polaroids', main_image_url: '/images/polaroids.jpg' },
  { slug: 'spotify-cards', main_image_url: '/images/spotify-cards.jpg' },
  { slug: 'desk-calendar', main_image_url: '/images/desk-calendar.png' },
  { slug: 'personalised-newspaper', main_image_url: '/images/newspaper.jpg' },
  { slug: 'fridge-magnet-polaroids', main_image_url: '/images/fridge-magnet-polaroids.png' },
  { slug: 'keychains', main_image_url: '/images/photo-keychains.jpg' },
  { slug: 'photo-booth-strips', main_image_url: '/images/photo-booth-strips.jpg' },
]

async function updateImages() {
  console.log('Updating product images in Supabase...')
  for (const item of imageUpdates) {
    const { error } = await supabase
      .from('products')
      .update({ main_image_url: item.main_image_url })
      .eq('slug', item.slug)
    if (error) {
      console.error(`❌ Error updating ${item.slug}:`, error.message)
    } else {
      console.log(`✅ Updated ${item.slug} -> ${item.main_image_url}`)
    }
  }
  console.log('Done!')
}

updateImages()
