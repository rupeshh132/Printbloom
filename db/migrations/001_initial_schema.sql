-- Initial Schema for PrintBloom

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text,
  description text,
  starting_price_label text,
  is_hero boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  status text DEFAULT 'draft',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE product_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  label text NOT NULL,
  price numeric,
  sort_order integer DEFAULT 0
);

CREATE TABLE media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cloudinary_public_id text NOT NULL,
  kind text NOT NULL, -- 'image' | 'video'
  width integer,
  height integer,
  alt_text_default text,
  is_private boolean DEFAULT false,
  uploaded_by text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  media_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  alt_text text,
  sort_order integer DEFAULT 0,
  is_cover boolean DEFAULT false
);

CREATE TABLE occasions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  cover_media_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  sort_order integer DEFAULT 0
);

CREATE TABLE stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  teaser text,
  body text,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  occasion_id uuid REFERENCES occasions(id) ON DELETE SET NULL,
  consent_status text DEFAULT 'pending', -- pending, granted, anonymised
  status text DEFAULT 'draft',
  published_at timestamp with time zone,
  sort_order integer DEFAULT 0
);

CREATE TABLE story_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid REFERENCES stories(id) ON DELETE CASCADE,
  media_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  alt_text text,
  sort_order integer DEFAULT 0
);

CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL, -- text, screenshot, video
  content text,
  media_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  customer_name_display text,
  consent_status text DEFAULT 'pending',
  status text DEFAULT 'draft',
  sort_order integer DEFAULT 0
);

CREATE TABLE faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  needs_confirmation boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  status text DEFAULT 'draft'
);

CREATE TABLE enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_handle text,
  preferred_contact text,
  city text,
  pincode text,
  occasion text,
  required_by date,
  notes text,
  source_utm text,
  status text DEFAULT 'new', -- new, contacted, converted, closed
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE enquiry_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id uuid REFERENCES enquiries(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  variant_label text,
  quantity integer DEFAULT 1,
  options_json jsonb
);

CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text DEFAULT 'editor',
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value_json jsonb
);

-- RLS Policies Example
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Public can read published products
CREATE POLICY "Public can view published products" ON products
  FOR SELECT USING (status = 'published');

-- Public can read published stories with granted consent
CREATE POLICY "Public can view published stories" ON stories
  FOR SELECT USING (status = 'published' AND consent_status != 'pending');