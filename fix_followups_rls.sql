-- Run this in your Supabase SQL Editor to allow saving Abandoned Carts

-- Create the table if it doesn't exist (just in case)
CREATE TABLE IF NOT EXISTS public.follow_ups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text,
  phone_number text,
  cart_total numeric,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security so the frontend can easily save leads
ALTER TABLE public.follow_ups DISABLE ROW LEVEL SECURITY;
