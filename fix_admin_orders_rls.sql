-- Fix Admin Order Visibility
-- This policy allows your admin email to view ALL orders in the database, bypassing the default RLS (which only lets users see their own orders).

CREATE POLICY "Admins can view all orders" 
ON "public"."orders"
FOR SELECT 
USING (
  auth.jwt() ->> 'email' IN ('vrupesh132@gmail.com') -- Replace or add more admin emails if needed
);

CREATE POLICY "Admins can update orders" 
ON "public"."orders"
FOR UPDATE
USING (
  auth.jwt() ->> 'email' IN ('vrupesh132@gmail.com')
);
