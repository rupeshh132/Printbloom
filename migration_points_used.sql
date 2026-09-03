-- Add points_used column to orders table to track points redemption
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS points_used INTEGER DEFAULT 0;
