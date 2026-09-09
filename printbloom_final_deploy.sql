-- Final PrintBloom Database Adjustments
-- Copy and paste this entirely into the Supabase SQL Editor and run it.

-- 1. Ensure `promo_codes` has the limits columns
ALTER TABLE promo_codes
ADD COLUMN IF NOT EXISTS max_uses INTEGER DEFAULT NULL,
ADD COLUMN IF NOT EXISTS used_count INTEGER DEFAULT 0;

-- 2. Ensure `orders` table tracks which promo was applied
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS applied_promo TEXT DEFAULT NULL;

-- 3. Ensure `enquiries` table has the latest classification columns
ALTER TABLE enquiries
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'marketing',
ADD COLUMN IF NOT EXISTS user_id UUID;

-- 4. Ensure `reminders` table has tracking for yearly notifications
ALTER TABLE reminders
ADD COLUMN IF NOT EXISTS last_notified_year INTEGER DEFAULT NULL;

-- 5. RPC to safely increment promo code usage
CREATE OR REPLACE FUNCTION increment_promo_usage(promo_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE promo_codes
  SET used_count = COALESCE(used_count, 0) + 1
  WHERE id = promo_id;
END;
$$;
