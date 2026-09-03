-- Update the RPC function to grant 40 points instead of 100 points
CREATE OR REPLACE FUNCTION grant_referral_bonus(referrer_uuid UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO public.reward_points (user_id, points, transaction_type, description)
  VALUES (referrer_uuid, 40, 'earned', 'Referral Bonus (Friend''s First Order)');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-apply security grants just to be safe
REVOKE EXECUTE ON FUNCTION grant_referral_bonus FROM public;
REVOKE EXECUTE ON FUNCTION grant_referral_bonus FROM authenticated;
REVOKE EXECUTE ON FUNCTION grant_referral_bonus FROM anon;
GRANT EXECUTE ON FUNCTION grant_referral_bonus TO service_role;
