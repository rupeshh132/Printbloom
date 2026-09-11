# PrintBloom 🌸

PrintBloom is a modern, personalized e-commerce platform that turns digital memories into beautifully crafted physical gifts like magazines, polaroids, and photo frames. 

Built with **Next.js 15**, **Supabase**, and **Tailwind CSS**, it features a fully functional customer storefront, advanced photo customization tools, and a powerful Admin Dashboard.

## 🚀 Features

### For Customers
* **Personalized Products:** Upload photos, add magic AI captions, and customize orders before checkout.
* **Wallet & Rewards System:** 
  * Earn 20 Loyalty Points on every purchase.
  * Earn 40 Referral Points when a friend uses your link.
  * Use Points or Promo Codes for discounts at checkout.
* **Smart Reminders:** Get WhatsApp/Email alerts for upcoming anniversaries, birthdays, and special dates.
* **Seamless Payments:** Integrated with Razorpay for secure UPI and Card payments.
* **User Profile:** Manage saved addresses, order history, and wishlist.

### For Admins (Admin Panel)
* **Dashboard Analytics:** Track total revenue, recent orders, and enquiries.
* **Product Management:** Create and edit products with specific templates (e.g., A4 Magazine, Polaroids).
* **Order Processing:** Update order statuses (Processing, Shipped, Delivered) and view customer customizations.
* **Promo Codes:** Generate promo codes with usage limits (e.g., Max 100 uses).

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
* **Backend/Database:** Supabase (PostgreSQL), Supabase Auth, Row Level Security (RLS)
* **Storage:** Cloudinary (for customer photo uploads), Supabase Storage (for admin product images)
* **Payments:** Razorpay
* **Deployment:** Vercel

## 📦 Environment Variables

To run this project locally, create a `.env.local` file in the root directory and add the following:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Cloudinary (For customer photo uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset_name

# Admin Configuration
ADMIN_EMAILS=admin@printbloom.in,anotheradmin@domain.com
```

## ⚙️ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Schema
The database uses Supabase PostgreSQL. The primary tables are:
* `products` & `product_variants`
* `orders` & `order_items`
* `profiles` & `addresses`
* `reward_points` & `promo_codes`

To deploy the schema to a fresh Supabase project, run the SQL script located at `printbloom_final_deploy.sql` in the Supabase SQL Editor.

## 📄 License
This project is proprietary and built specifically for PrintBloom.
