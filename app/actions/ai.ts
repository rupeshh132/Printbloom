"use server"

import { GoogleGenAI } from "@google/genai"

export async function generateCaptions(keywords: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return { error: "GEMINI_API_KEY is not set in environment variables." }
    }

    const ai = new GoogleGenAI({ apiKey })

    const prompt = `You are a creative copywriter for a premium custom magazine brand. 
The user is providing keywords to generate a caption for a photo in their custom printed magazine.
Generate exactly 3 caption options based on these keywords: "${keywords}".

The captions should be short (1-3 sentences maximum).
Option 1 must be FUNNY/Witty.
Option 2 must be EMOTIONAL/Heartwarming.
Option 3 must be AESTHETIC/Short.

Return ONLY a valid JSON array of strings containing the 3 options, like this:
["Funny caption here", "Emotional caption here", "Aesthetic caption here"]
Do not include markdown blocks, just the JSON array.`

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    })

    const text = response.text
    if (!text) {
        return { error: "Failed to generate captions." }
    }

    // Parse the JSON array
    let options: string[] = []
    try {
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim()
        options = JSON.parse(cleanedText)
    } catch (e) {
        console.error("Failed to parse AI response:", text)
        return { error: "Failed to parse AI response." }
    }

    return { success: true, options }
  } catch (error: any) {
    console.error("AI Caption Error:", error)
    return { error: error.message || "Failed to generate captions." }
  }
}
