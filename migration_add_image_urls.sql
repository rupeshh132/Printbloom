-- Run this in your Supabase SQL Editor
-- This adds the image_urls JSONB column for the multi-image carousel feature

ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS image_urls JSONB DEFAULT '[]'::jsonb;
