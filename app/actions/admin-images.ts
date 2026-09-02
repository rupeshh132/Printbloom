"use server"

import { createSupabaseServerClient } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import crypto from "crypto"

function extractPublicId(url: string) {
  try {
    const parts = url.split("/upload/")
    if (parts.length < 2) return null
    
    // parts[1] is something like 'v162817283/folder/filename.jpg'
    const pathParts = parts[1].split("/")
    const pathWithoutVersion = pathParts.slice(1).join("/")
    
    // Remove the file extension
    const lastDotIndex = pathWithoutVersion.lastIndexOf(".")
    if (lastDotIndex !== -1) {
      return pathWithoutVersion.substring(0, lastDotIndex)
    }
    return pathWithoutVersion
  } catch (err) {
    console.error("Failed to extract public_id from url", url)
    return null
  }
}

export async function deleteOrderImages(orderItemId: string, orderId: string, imageUrls: string[]) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are not configured in environment variables.")
  }

  // 1. Delete each image from Cloudinary
  const deletePromises = imageUrls.map(async (url) => {
    const publicId = extractPublicId(url)
    if (!publicId) return

    const timestamp = Math.round(new Date().getTime() / 1000).toString()
    
    // Generate signature: sha1("public_id=xxx&timestamp=yyy" + apiSecret)
    const strToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    const signature = crypto.createHash("sha1").update(strToSign).digest("hex")

    const formData = new URLSearchParams()
    formData.append("public_id", publicId)
    formData.append("timestamp", timestamp)
    formData.append("api_key", apiKey)
    formData.append("signature", signature)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      const data = await res.json()
      if (data.result !== 'ok' && data.result !== 'not found') {
        console.error(`Cloudinary deletion failed for ${publicId}:`, data)
      }
    } catch (err) {
      console.error(`Failed to delete ${publicId} from Cloudinary`, err)
    }
  })

  await Promise.all(deletePromises)

  // 2. Update Supabase order_items to clear customization_data
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from("order_items")
    .update({ customization_data: [] })
    .eq("id", orderItemId)

  if (error) {
    console.error("Failed to update database after image deletion:", error)
    throw new Error(error.message)
  }

  revalidatePath(`/admin/orders/${orderId}`)
  return { success: true }
}
