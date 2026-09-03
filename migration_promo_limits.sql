-- Add tracking columns to promo_codes table
ALTER TABLE public.promo_codes 
ADD COLUMN IF NOT EXISTS max_uses INTEGER DEFAULT NULL,
ADD COLUMN IF NOT EXISTS used_count INTEGER DEFAULT 0;

-- Add applied_promo column to orders table to know which code to increment
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS applied_promo TEXT DEFAULT NULL;

-- Create an RPC function to atomically increment the promo usage count
CREATE OR REPLACE FUNCTION increment_promo_usage(promo_code_param TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.promo_codes
  SET used_count = used_count + 1
  WHERE code = promo_code_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Secure the RPC function to prevent unauthorized incrementing
REVOKE EXECUTE ON FUNCTION increment_promo_usage(TEXT) FROM public;
REVOKE EXECUTE ON FUNCTION increment_promo_usage(TEXT) FROM authenticated;
REVOKE EXECUTE ON FUNCTION increment_promo_usage(TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION increment_promo_usage(TEXT) TO service_role;
