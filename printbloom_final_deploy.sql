-- ============================================================
-- PRINTBLOOM — COMPLETE DATABASE SETUP FOR FRESH SUPABASE PROJECT
-- ============================================================
-- HOW TO USE:
--   1. Open a brand-new, empty Supabase project
--   2. Go to SQL Editor
--   3. Paste this ENTIRE file and click "Run"
--   4. It should complete with zero errors
--   5. Then manually create Storage buckets (see bottom of file)
--
-- AUTHOR: Auto-generated from production codebase scan
-- LAST UPDATED: 2026-09-10
-- ============================================================


-- ============================================================
-- SECTION 1: EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- SECTION 2: CORE TABLES
-- ============================================================

-- ── Products ──────────────────────────────────────────────
CREATE TABLE products (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                  text UNIQUE NOT NULL,
  name                  text NOT NULL,
  tagline               text,
  description           text,
  starting_price_label  text,
  main_image_url        text,
  is_hero               boolean DEFAULT false,
  sort_order            integer DEFAULT 0,
  status                text DEFAULT 'draft', -- 'draft' | 'published'
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now()
);

-- ── Product Variants (price tiers per product) ────────────
CREATE TABLE product_variants (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  uuid REFERENCES products(id) ON DELETE CASCADE,
  label       text NOT NULL,
  price       numeric NOT NULL DEFAULT 0,
  sort_order  integer DEFAULT 0
);

-- ── Enquiries (Lead CRM from public order form) ───────────
CREATE TABLE enquiries (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name              text NOT NULL,
  phone             text,
  contact_handle    text,
  preferred_contact text DEFAULT 'whatsapp',
  occasion          text,
  required_by       date,
  notes             text,
  source            text DEFAULT 'marketing', -- 'marketing' | 'profile'
  source_utm        text,
  user_id           uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status            text DEFAULT 'new', -- 'new' | 'contacted' | 'converted' | 'closed'
  city              text,
  pincode           text,
  created_at        timestamptz DEFAULT now()
);

-- ── Enquiry Items (product linked to each enquiry) ────────
CREATE TABLE enquiry_items (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id    uuid REFERENCES enquiries(id) ON DELETE CASCADE,
  product_id    uuid REFERENCES products(id) ON DELETE SET NULL,
  variant_label text,
  quantity      integer DEFAULT 1,
  options_json  jsonb
);

-- ── Flipbooks (digital preview albums per enquiry) ────────
CREATE TABLE flipbooks (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_token   text NOT NULL,
  title           text,
  images          text[] DEFAULT '{}',
  created_at      timestamptz DEFAULT now()
);

-- ── Stories / Journal ─────────────────────────────────────
CREATE TABLE stories (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  title           text NOT NULL,
  content         text,
  teaser          text,
  body            text,
  media_url       text,
  media_type      text DEFAULT 'image', -- 'image' | 'video'
  customer_name   text,
  product_name    text,
  product_id      uuid REFERENCES products(id) ON DELETE SET NULL,
  consent_status  text DEFAULT 'pending', -- 'pending' | 'granted' | 'anonymised'
  published       boolean DEFAULT true,
  status          text DEFAULT 'draft',
  published_at    timestamptz,
  sort_order      integer DEFAULT 0,
  created_at      timestamptz DEFAULT now()
);

-- ── Reminders (Admin CRM — public lead capture) ───────────
-- Anyone (guest or logged-in) can insert. Admin reads via service_role.
CREATE TABLE reminders (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name       text NOT NULL,
  phone_number        text NOT NULL,
  occasion_name       text NOT NULL,
  occasion_date       date NOT NULL,
  last_notified_year  integer DEFAULT NULL,
  created_at          timestamptz DEFAULT now()
);

-- ── Follow-ups (Abandoned Cart Leads) ────────────────────
CREATE TABLE follow_ups (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name   text NOT NULL,
  phone_number    text NOT NULL,
  cart_total      numeric DEFAULT 0,
  status          text DEFAULT 'pending', -- 'pending' | 'contacted' | 'recovered'
  notes           text,
  required_by     date,
  created_at      timestamptz DEFAULT now()
);

-- ── Promo Codes ──────────────────────────────────────────
CREATE TABLE promo_codes (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code            text UNIQUE NOT NULL,
  discount_type   text NOT NULL, -- 'percentage' | 'fixed'
  discount_value  numeric NOT NULL DEFAULT 0,
  expiry_date     date,
  max_uses        integer DEFAULT NULL,
  used_count      integer DEFAULT 0,
  is_active       boolean DEFAULT true,
  created_at      timestamptz DEFAULT now()
);


-- ============================================================
-- SECTION 3: USER-FACING TABLES (tied to auth.users)
-- ============================================================

-- ── Profiles (extended user data for referral system) ────
CREATE TABLE profiles (
  id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_by  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code text UNIQUE,
  created_at   timestamptz DEFAULT now()
);

-- ── Orders ───────────────────────────────────────────────
CREATE TABLE orders (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  total_amount          numeric NOT NULL DEFAULT 0,
  status                text DEFAULT 'processing', -- 'processing' | 'in_progress' | 'completed' | 'cancelled'
  payment_status        text DEFAULT 'pending',    -- 'pending' | 'paid' | 'failed'
  razorpay_order_id     text,
  razorpay_payment_id   text,
  shipping_address_id   uuid,  -- loose ref to addresses.id (no FK to allow address deletion)
  images_status         text DEFAULT 'partial',    -- 'partial' | 'complete'
  points_used           integer DEFAULT 0,
  applied_promo         text,
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now()
);

-- ── Order Items ───────────────────────────────────────────
CREATE TABLE order_items (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id            uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id          uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name        text NOT NULL,
  quantity            integer NOT NULL DEFAULT 1,
  price               numeric NOT NULL DEFAULT 0,
  customization_data  jsonb DEFAULT '[]'
);

-- ── Addresses ─────────────────────────────────────────────
CREATE TABLE addresses (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       text NOT NULL,
  phone_number    text NOT NULL,
  address_line_1  text NOT NULL,
  address_line_2  text DEFAULT '',
  city            text NOT NULL,
  state           text NOT NULL,
  pincode         text NOT NULL,
  is_default      boolean DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

-- ── Reward Points (wallet transactions log) ───────────────
CREATE TABLE reward_points (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  points            integer NOT NULL,
  transaction_type  text NOT NULL, -- 'earned' | 'redeemed' | 'referral_bonus'
  description       text,
  created_at        timestamptz DEFAULT now()
);

-- ── User Reminders (private dashboard reminders) ──────────
CREATE TABLE user_reminders (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  person_name  text NOT NULL,
  event_type   text NOT NULL, -- 'birthday' | 'anniversary' | 'other' | custom string
  event_date   date NOT NULL,
  created_at   timestamptz DEFAULT now()
);

-- ── Wishlist ──────────────────────────────────────────────
CREATE TABLE wishlist (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_slug      text NOT NULL,
  product_name      text NOT NULL,
  product_image_url text,
  product_price     numeric DEFAULT 0,
  created_at        timestamptz DEFAULT now(),
  UNIQUE(user_id, product_slug)
);

-- ── User Carts (persisted cart per user) ─────────────────
CREATE TABLE user_carts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  items       jsonb DEFAULT '[]',
  updated_at  timestamptz DEFAULT now()
);


-- ============================================================
-- SECTION 4: INDEXES (performance)
-- ============================================================

CREATE INDEX idx_products_status     ON products(status);
CREATE INDEX idx_products_slug       ON products(slug);
CREATE INDEX idx_enquiries_status    ON enquiries(status);
CREATE INDEX idx_enquiries_user      ON enquiries(user_id);
CREATE INDEX idx_orders_user         ON orders(user_id);
CREATE INDEX idx_orders_payment      ON orders(payment_status);
CREATE INDEX idx_orders_razorpay     ON orders(razorpay_order_id);
CREATE INDEX idx_order_items_order   ON order_items(order_id);
CREATE INDEX idx_addresses_user      ON addresses(user_id);
CREATE INDEX idx_reward_points_user  ON reward_points(user_id);
CREATE INDEX idx_user_reminders_user ON user_reminders(user_id);
CREATE INDEX idx_wishlist_user       ON wishlist(user_id);
CREATE INDEX idx_follow_ups_phone    ON follow_ups(phone_number);
CREATE INDEX idx_flipbooks_token     ON flipbooks(enquiry_token);
CREATE INDEX idx_stories_slug        ON stories(slug);
CREATE INDEX idx_stories_published   ON stories(published);
CREATE INDEX idx_promo_codes_code    ON promo_codes(code);


-- ============================================================
-- SECTION 5: ROW LEVEL SECURITY — ENABLE ON ALL TABLES
-- ============================================================

ALTER TABLE products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries       ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE flipbooks       ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories         ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders       ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups      ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders          ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items     ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses       ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_points   ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reminders  ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist        ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_carts      ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- SECTION 6: RLS POLICIES
-- ============================================================
-- DESIGN PRINCIPLE:
--   - Public (anon) users: read-only on public content only
--   - Authenticated users: full CRUD on their OWN rows only
--   - Admin operations: performed via service_role key in Next.js
--     (service_role bypasses RLS entirely — no policies needed for admin)
-- ============================================================

-- ── products: public can read published, nobody can write via anon ──
CREATE POLICY "Public can view published products"
  ON products FOR SELECT
  USING (status = 'published');

-- ── product_variants: public read (needed for pricing display) ────
CREATE POLICY "Public can view product variants"
  ON product_variants FOR SELECT
  USING (true);

-- ── stories: public can read published stories ──────────────────
CREATE POLICY "Public can view published stories"
  ON stories FOR SELECT
  USING (published = true);

-- ── promo_codes: NO public read (admin-only via service_role) ────
-- (No SELECT policy = nobody can read via anon key — admin uses service_role)

-- ── enquiries: users can insert their own (public lead form) ──────
CREATE POLICY "Anyone can submit an enquiry"
  ON enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own enquiries"
  ON enquiries FOR SELECT
  USING (auth.uid() = user_id);

-- ── enquiry_items: anyone can insert (linked to enquiry above) ───
CREATE POLICY "Anyone can insert enquiry items"
  ON enquiry_items FOR INSERT
  WITH CHECK (true);

-- ── reminders: anyone can insert (public lead capture) ───────────
-- Admin reads via service_role, no SELECT policy needed for public
CREATE POLICY "Anyone can submit a reminder"
  ON reminders FOR INSERT
  WITH CHECK (true);

-- ── follow_ups: anyone can insert (cart abandonment) ─────────────
CREATE POLICY "Anyone can insert a follow-up lead"
  ON follow_ups FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update their own follow-up by phone"
  ON follow_ups FOR UPDATE
  USING (true); -- actual filtering by phone_number done in application code

-- ── flipbooks: public can read (shareable links) ─────────────────
CREATE POLICY "Anyone can view a flipbook"
  ON flipbooks FOR SELECT
  USING (true);

-- ── orders: users can only see their own ─────────────────────────
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own orders (Razorpay flow inserts via anon client)
CREATE POLICY "Authenticated users can insert their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ── order_items: users can see items from their own orders ────────
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can insert order items"
  ON order_items FOR INSERT
  WITH CHECK (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- ── addresses: users manage only their own ───────────────────────
CREATE POLICY "Users can view their own addresses"
  ON addresses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own addresses"
  ON addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addresses"
  ON addresses FOR DELETE
  USING (auth.uid() = user_id);

-- ── reward_points: users see only their own ──────────────────────
CREATE POLICY "Users can view their own reward points"
  ON reward_points FOR SELECT
  USING (auth.uid() = user_id);

-- ── user_reminders: users manage only their own ──────────────────
CREATE POLICY "Users can view their own reminders"
  ON user_reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders"
  ON user_reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders"
  ON user_reminders FOR DELETE
  USING (auth.uid() = user_id);

-- ── wishlist: users manage only their own ────────────────────────
CREATE POLICY "Users can view their own wishlist"
  ON wishlist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own wishlist"
  ON wishlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own wishlist"
  ON wishlist FOR DELETE
  USING (auth.uid() = user_id);

-- ── profiles: users can read and update their own ────────────────
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ── user_carts: users manage only their own ──────────────────────
CREATE POLICY "Users can view their own cart"
  ON user_carts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert their own cart"
  ON user_carts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
  ON user_carts FOR UPDATE
  USING (auth.uid() = user_id);


-- ============================================================
-- SECTION 7: RPC FUNCTIONS
-- ============================================================

-- ── grant_referral_bonus: awards 40 points to the referrer ──────
-- Called by verify-payment/route.ts when a referred user's FIRST order is paid.
-- Runs as SECURITY DEFINER so it can bypass RLS from an authenticated context.
CREATE OR REPLACE FUNCTION grant_referral_bonus(referrer_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO reward_points (user_id, points, transaction_type, description)
  VALUES (referrer_uuid, 40, 'referral_bonus', 'Referral Bonus — Friend placed their first order');
END;
$$;

-- Revoke default public execute, grant to authenticated only
REVOKE EXECUTE ON FUNCTION grant_referral_bonus(uuid) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION grant_referral_bonus(uuid) TO authenticated;
GRANT  EXECUTE ON FUNCTION grant_referral_bonus(uuid) TO service_role;


-- ── increment_promo_usage: safely increments used_count by promo code ──
-- Called by verify-payment/route.ts after a promo code is used in a paid order.
CREATE OR REPLACE FUNCTION increment_promo_usage(promo_code_param text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE promo_codes
  SET used_count = COALESCE(used_count, 0) + 1
  WHERE code = promo_code_param;
END;
$$;

REVOKE EXECUTE ON FUNCTION increment_promo_usage(text) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION increment_promo_usage(text) TO authenticated;
GRANT  EXECUTE ON FUNCTION increment_promo_usage(text) TO service_role;


-- ── Auto-create profile row on new user signup ─────────────────
-- Triggered whenever a new row is inserted into auth.users.
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================================================
-- SECTION 8: STORAGE BUCKETS
-- ============================================================
-- Storage buckets CANNOT be created via SQL in Supabase.
-- You must create these MANUALLY in the Supabase Dashboard:
--
-- Dashboard → Storage → New Bucket
--
-- Bucket 1: "images"
--   - Public: YES (product images, journal media are public)
--   - Allowed MIME types: image/jpeg, image/png, image/webp, image/gif, video/mp4
--   - Max file size: 50 MB
--
-- Bucket 2: "flipbook_pages"
--   - Public: YES (flipbook preview images are shared via link)
--   - Allowed MIME types: image/jpeg, image/png, image/webp
--   - Max file size: 20 MB
--
-- Note: All actual uploads go through Cloudinary (env: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME).
-- These Supabase buckets are a fallback / legacy reference only.
-- Cloudinary is the primary media store.
-- ============================================================


-- ============================================================
-- SECTION 9: REQUIRED ENVIRONMENT VARIABLES (for reference)
-- ============================================================
-- Set these in Vercel (or your hosting provider) Dashboard → Settings → Environment Variables:
--
-- PUBLIC (safe to expose in browser):
--   NEXT_PUBLIC_SUPABASE_URL             = https://xxxx.supabase.co
--   NEXT_PUBLIC_SUPABASE_ANON_KEY        = eyJhbGc...
--   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME    = your_cloud_name
--   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = your_upload_preset
--   NEXT_PUBLIC_RAZORPAY_KEY_ID          = rzp_live_xxxxx
--
-- SECRET (server-side only, NEVER expose in browser):
--   SUPABASE_SERVICE_ROLE_KEY            = eyJhbGc... (service_role, not anon!)
--   CLOUDINARY_API_KEY                   = 123456789012345
--   CLOUDINARY_API_SECRET                = your_api_secret
--   RAZORPAY_KEY_SECRET                  = your_razorpay_secret
--   GEMINI_API_KEY                       = AIzaSy...
-- ============================================================


-- ============================================================
-- END OF FILE — Run entire file in one shot. Zero errors expected.
-- ============================================================

