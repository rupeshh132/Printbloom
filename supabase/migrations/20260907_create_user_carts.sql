-- Migration: Create user_carts table to sync shopping cart across devices

CREATE TABLE public.user_carts (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_carts ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view their own cart" 
    ON public.user_carts FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart" 
    ON public.user_carts FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart" 
    ON public.user_carts FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart" 
    ON public.user_carts FOR DELETE 
    USING (auth.uid() = user_id);
