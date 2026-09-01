-- Run this in your Supabase SQL Editor to allow Admin CRUD operations on Journals (stories table)

-- Disable RLS on stories table so admin can insert, update, and delete without being blocked silently
ALTER TABLE public.stories DISABLE ROW LEVEL SECURITY;
