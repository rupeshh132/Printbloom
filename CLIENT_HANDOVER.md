# PrintBloom - Admin Handover Guide 🌸

Welcome to your new PrintBloom store! This guide will help you understand how to manage your website, add products, process orders, and handle daily operations.

## 1. How to Log In as Admin

There is no separate "Admin Login" page. You log in through the exact same flow as a customer:
1. Go to `www.printbloom.in/login` (or click the User Icon in the navigation bar).
2. Enter your authorized admin email address and password.
3. Once logged in, the system will recognize your email as an Admin.
4. You can access the Admin Panel by either typing `www.printbloom.in/admin` in your browser or navigating to the Dashboard if a link is provided.

*(Note: Your email must be listed in the `ADMIN_EMAILS` setting on Vercel to get admin rights).*

## 2. Managing Products

### Adding a New Product
1. Go to **Admin Panel > Products**.
2. Click **"Add New Product"**.
3. **Smart Product Template:**
   - Choose **"Custom / Normal Product"** for regular items (Frames, Mugs, Keychains) where no advanced photo uploading is needed.
   - Choose **"Custom Magazine"** or **"Polaroids"** if the product requires customers to upload 30-40 photos and write AI captions.
4. Fill in the Name, Description, and Price.
5. Upload the main cover image and gallery images.
6. Click **Save**.

## 3. Processing Orders

1. Go to **Admin Panel > Orders**.
2. Here you will see a list of all successful purchases.
3. Click on any Order ID to view the details.
4. In the Order Details page, you will see:
   - The customer's shipping address and WhatsApp number.
   - The exact photos they uploaded (You can click "Download All" to get a zip file).
   - Any captions they wrote.
5. **Updating Status:** As you prepare the order, change the status from **Processing** -> **Shipped** -> **Delivered**.

## 4. Promo Codes & Marketing

1. Go to **Admin Panel > Promo Codes**.
2. Click **"Create Promo Code"**.
3. You can set:
   - The code name (e.g., `DIWALI50`).
   - The discount type (Percentage or Flat Amount).
   - Maximum uses (e.g., Only the first 100 people can use it).
   - Expiry date.
4. Share this code on your Instagram or WhatsApp!

## 5. Wallet & Referral System (Automated)

You do not need to manage this manually; the system handles it automatically:
- **Loyalty:** Customers get 20 points automatically when they buy something.
- **Referrals:** If Customer A shares their referral link, and Customer B buys something (above ₹250), Customer A gets 40 points automatically.
- **Usage:** 1 Point = ₹1. Customers can apply these points at checkout for a direct discount.

## 6. Important Third-Party Services

Your website is powered by a few professional services. Here is what they do:
* **Vercel:** Hosts your website and keeps it live 24/7.
* **Supabase:** Your database. It stores all user accounts, orders, products, and admin settings.
* **Razorpay:** Processes your payments and transfers money to your bank account.
* **Cloudinary:** Temporarily stores the heavy photos that customers upload while creating their custom magazines.

## 7. Need Help?
If you see an error like *"Cloudinary configuration missing"* or *"Razorpay Authentication Key missing"*, it means the API keys in your Vercel settings have been removed or changed. Contact your developer to restore them.
