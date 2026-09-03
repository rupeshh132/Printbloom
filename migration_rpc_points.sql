-- 1. Create the RPC function
CREATE OR REPLACE FUNCTION grant_referral_bonus(referrer_uuid UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO public.reward_points (user_id, points, transaction_type, description)
  VALUES (referrer_uuid, 100, 'earned', 'Referral Bonus (Friend''s First Order)');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. CRITICAL SECURITY: Revoke execution rights from regular users
REVOKE EXECUTE ON FUNCTION grant_referral_bonus FROM public;
REVOKE EXECUTE ON FUNCTION grant_referral_bonus FROM authenticated;
REVOKE EXECUTE ON FUNCTION grant_referral_bonus FROM anon;

-- 3. Grant execution rights ONLY to the service_role (the backend server)
GRANT EXECUTE ON FUNCTION grant_referral_bonus TO service_role;
