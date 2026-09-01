-- Run this in your Supabase SQL Editor to fix the Admin Status Update Bug

-- 1. Drop the old policies that hardcoded the old email
DROP POLICY IF EXISTS "Admins can view all orders" ON "public"."orders";
DROP POLICY IF EXISTS "Admins can update orders" ON "public"."orders";

-- 2. Create the new policies with the correct admin email
CREATE POLICY "Admins can view all orders" 
ON "public"."orders"
FOR SELECT 
USING (
  auth.jwt() ->> 'email' IN ('arhaan.s7045@gmail.com')
);

CREATE POLICY "Admins can update orders" 
ON "public"."orders"
FOR UPDATE
USING (
  auth.jwt() ->> 'email' IN ('arhaan.s7045@gmail.com')
);
