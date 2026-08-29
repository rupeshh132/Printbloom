// Real customer reviews data — sourced from WhatsApp conversations
// Images stored in public/reviews/

export type Review = {
  id: string
  name: string
  quote: string
  image: string // path to screenshot
  type: "chat" | "mixed" | "instagram"
  product?: string // optional product reference
  rating: 5
}

// ─── SHORT MARQUEE QUOTES (for homepage ticker) ─────────────────────────────
export const marqueeQuotes = [
  {
    id: "mq1",
    quote: "OH MY GODDDDD THIS IS SOOOOO BEAUTIFUL!!!!! It turned out WAYYY prettier than I imagined!!!",
    name: "Customer",
    image: "/reviews/1000345241.jpg"
  },
  {
    id: "mq2",
    quote: "The quality is soo good and it just aahhh it looks soo beautiful 😭🤌",
    name: "Customer",
    image: "/reviews/1000241317.jpg"
  },
  {
    id: "mq3",
    quote: "Absolutely fell in love the moment I had a glance — absolutely gorgeous and even prettier than expected 🎀",
    name: "Customer",
    image: "/reviews/1000247871.jpg"
  },
  {
    id: "mq4",
    quote: "It is a unique and precious gift through which I can express my love 🌸",
    name: "Customer",
    image: "/reviews/1000311825.jpg"
  },
  {
    id: "mq5",
    quote: "Super happy with my order! It looked amazing and made the perfect birthday surprise. Highly recommended! 😍",
    name: "Customer",
    image: "/reviews/1000343364.jpg"
  },
  {
    id: "mq6",
    quote: "Worth every penny… totally satisfied and would definitely buy again.",
    name: "Customer",
    image: "/reviews/1000272941.jpg"
  },
  {
    id: "mq7",
    quote: "She loved everything and I'm so happy that it came out so beautiful. Thank you so much 🌸",
    name: "Aarju Malik",
    image: "/reviews/1000241272.jpg"
  },
  {
    id: "mq8",
    quote: "will def get back to you for more gifts 😍 The design was super pretty and made her day so special",
    name: "Customer",
    image: "/reviews/1000253492.jpg"
  },
]

// ─── HOMEPAGE TRUST CARDS (3 best mixed screenshot cards) ───────────────────
export const homepageTrustCards = [
  {
    id: "ht1",
    quote: "Omg printbloom…. What have u donnee??? It's freaking Ammaaaaaazziinnnng 🤩 The pages, the quality soo premium plus delivery tym soo short very quick.",
    name: "Customer",
    image: "/reviews/1000300338.jpg",
    product: "Birthday Magazine"
  },
  {
    id: "ht2",
    quote: "Awww, This order is sooo cute!! 😭💖 Everything looks beyond amazing, I'm honestly obsessed with it. Way more than I expected!",
    name: "Customer",
    image: "/reviews/1000274558.jpg",
    product: "Photo Book"
  },
  {
    id: "ht3",
    quote: "The magazine turned out even better than I expected. The quality of the pages and printing is really good. Loved how personal touches made it feel unique and special.",
    name: "Customer",
    image: "/reviews/1000303588.jpg",
    product: "Custom Magazine"
  },
]

// ─── FULL REVIEWS PAGE (12 reviews, mix of chat + mixed) ────────────────────
export const allReviews: Review[] = [
  {
    id: "r1",
    name: "Customer",
    quote: "Dudeee i loved it…!!!!! The quality is soo good and it justttt aahhh it looks soo beautiful 😭🤌",
    image: "/reviews/1000241317.jpg",
    type: "mixed",
    rating: 5
  },
  {
    id: "r2",
    name: "Customer",
    quote: "OH MY GODDDDD THIS IS SOOOOO BEAUTIFUL!!!!! I literally can't even express how much I love it! It turned out WAYYY prettier than I imagined!!! Everything looks sooo perfect ✨",
    image: "/reviews/1000345241.jpg",
    type: "chat",
    rating: 5
  },
  {
    id: "r3",
    name: "Customer",
    quote: "Received the magazine and absolutely fell in love the moment I had a glance at it!! Beautifully designed and printed, could not have been done any better 🎀 absolutely gorgeous and even prettier than what I expected",
    image: "/reviews/1000247871.jpg",
    type: "chat",
    rating: 5
  },
  {
    id: "r4",
    name: "Customer",
    quote: "Omg printbloom…. What have u donnee??? It's freaking Ammaaaaaazziinnnng 🤩 The pages, the quality soo premium plus delivery so quick.",
    image: "/reviews/1000300338.jpg",
    type: "mixed",
    rating: 5
  },
  {
    id: "r5",
    name: "Customer",
    quote: "I'm honestly obsessed with it. Way more than I expected! Everything looks beyond amazing 😭💖",
    image: "/reviews/1000274558.jpg",
    type: "mixed",
    rating: 5
  },
  {
    id: "r6",
    name: "Customer",
    quote: "Received..the prettiest customisation 🤎 loved it: worth it 😍",
    image: "/reviews/1000266244.jpg",
    type: "mixed",
    rating: 5
  },
  {
    id: "r7",
    name: "Customer",
    quote: "Thank you so much for everything — from helping me choose the perfect magazine to patiently listening to all my ideas. You made the entire process feel so easy.",
    image: "/reviews/1000340135.jpg",
    type: "chat",
    rating: 5
  },
  {
    id: "r8",
    name: "Customer",
    quote: "thank u so much for the beautiful magazine!! she loveeeed it and my friends too. will def get back to u for more gifts 😍",
    image: "/reviews/1000253492.jpg",
    type: "chat",
    rating: 5
  },
  {
    id: "r9",
    name: "Customer",
    quote: "The magazine is soo beautiful, it is like my feelings which I can't express in words — this magazine can ✨ It is a unique and precious gift through which I can express my love 🌸",
    image: "/reviews/1000311825.jpg",
    type: "chat",
    rating: 5
  },
  {
    id: "r10",
    name: "Customer",
    quote: "She absolutely loved everything about it — the quality, the photos, the overall presentation. She genuinely kept praising the magazine.",
    image: "/reviews/1000300204.jpg",
    type: "chat",
    rating: 5
  },
  {
    id: "r11",
    name: "Customer",
    quote: "The magazine turned out even better than I expected. Loved how personal touches and customized elements made it feel unique and special rather than just a regular magazine.",
    image: "/reviews/1000303588.jpg",
    type: "mixed",
    rating: 5
  },
  {
    id: "r12",
    name: "kaleem_01_",
    quote: "Absolutely loved the work! ✨ You made every gift with so much perfection and creativity. Truly amazing work 🙌❤️",
    image: "/reviews/1000303166.jpg",
    type: "instagram",
    rating: 5
  },
]

// ─── PRODUCT PAGE MINI REVIEWS (indexed by product slug) ────────────────────
export const productReviews: Record<string, Review[]> = {
  "custom-magazine-a5": [
    {
      id: "pm1",
      name: "Customer",
      quote: "OMG it's so prettyyy 😭💗 She just loved everything and I'm so happy that it came out so beautiful",
      image: "/reviews/1000241272.jpg",
      type: "chat",
      rating: 5
    },
    {
      id: "pm2",
      name: "Customer",
      quote: "Absolutely fell in love the moment I had a glance — could not have been done any better 🎀",
      image: "/reviews/1000247871.jpg",
      type: "chat",
      rating: 5
    },
  ],
  "custom-magazine-a4": [
    {
      id: "pm3",
      name: "Customer",
      quote: "The quality of the pages and printing is really good. Loved how personal touches made it feel unique.",
      image: "/reviews/1000303588.jpg",
      type: "mixed",
      rating: 5
    },
    {
      id: "pm4",
      name: "Customer",
      quote: "It's freaking Ammaaazziiinnnng 🤩 The pages, the quality soo premium plus delivery so quick.",
      image: "/reviews/1000300338.jpg",
      type: "mixed",
      rating: 5
    },
  ],
  "polaroids": [
    {
      id: "pm5",
      name: "Customer",
      quote: "Received the prettiest customisation 🤎 loved it: worth it 😍",
      image: "/reviews/1000266244.jpg",
      type: "mixed",
      rating: 5
    },
    {
      id: "pm6",
      name: "Customer",
      quote: "HEYYY I LOVEDDD THOSEEE OMGGG THEY ARE SOOO SOOO PRETTY 😭",
      image: "/reviews/1000297608.jpg",
      type: "mixed",
      rating: 5
    },
  ],
  // fallback for all other products
  "_default": [
    {
      id: "pm7",
      name: "Customer",
      quote: "Omggggg this is too prettyyyyy ❤️🤎😭😭 Perfectly how i pictured it 🥲",
      image: "/reviews/1000341996.jpg",
      type: "chat",
      rating: 5
    },
    {
      id: "pm8",
      name: "Customer",
      quote: "Super happy with my order! It looked amazing and made the perfect birthday surprise. Highly recommended! 😍✨",
      image: "/reviews/1000343364.jpg",
      type: "chat",
      rating: 5
    },
  ]
}

// ─── CART PAGE TRUST PILLS (text-only, short) ───────────────────────────────
export const cartTrustQuotes = [
  "⭐ \"It felt worth every penny\"",
  "🚀 \"Delivered before the deadline — wow!\"",
  "💗 \"Will definitely order again\"",
  "🤌 \"Quality soo premium — better than I expected\"",
  "🎁 \"She literally cried when she saw it\"",
]
