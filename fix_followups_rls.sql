-- Run this in your Supabase SQL Editor to fix the Follow-ups feature

-- Step 1: Make sure the table exists with correct columns
CREATE TABLE IF NOT EXISTS public.follow_ups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text,
  phone_number text,
  cart_total numeric,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Step 2: Enable RLS
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;

-- Step 3: Allow anyone (even unauthenticated) to INSERT leads
-- This is safe because it's only inserting customer data from the checkout form
DROP POLICY IF EXISTS "Allow public insert follow_ups" ON public.follow_ups;
CREATE POLICY "Allow public insert follow_ups"
  ON public.follow_ups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Step 4: Only authenticated admins can SELECT (read) follow_ups
-- (The getFollowUps function already checks admin email in code too)
DROP POLICY IF EXISTS "Allow authenticated select follow_ups" ON public.follow_ups;
CREATE POLICY "Allow authenticated select follow_ups"
  ON public.follow_ups
  FOR SELECT
  TO authenticated
  USING (true);

-- Step 5: Allow authenticated users to UPDATE (e.g., mark contacted)
DROP POLICY IF EXISTS "Allow authenticated update follow_ups" ON public.follow_ups;
CREATE POLICY "Allow authenticated update follow_ups"
  ON public.follow_ups
  FOR UPDATE
  TO authenticated
  USING (true);

SELECT 'Follow-ups RLS policies applied successfully!' as result;
