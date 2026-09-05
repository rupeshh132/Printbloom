ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_digital boolean DEFAULT false;
UPDATE public.products SET is_digital = true WHERE slug = 'softcopy-magazine';
