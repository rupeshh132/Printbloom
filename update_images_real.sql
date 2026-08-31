-- Run this in Supabase SQL Editor to update product images to real PrintBloom photos
-- Go to: https://supabase.com/dashboard -> SQL Editor -> New Query -> Paste this -> Run

UPDATE public.products SET main_image_url = '/images/a4-2.jpg' WHERE slug = 'custom-magazine-a5';
UPDATE public.products SET main_image_url = '/images/a4-1.jpg' WHERE slug = 'custom-magazine-a4';
UPDATE public.products SET main_image_url = '/images/softcopy-magazine.jpg' WHERE slug = 'softcopy-magazine';
UPDATE public.products SET main_image_url = '/images/frame-1.jpg' WHERE slug = 'photo-frames';
UPDATE public.products SET main_image_url = '/images/polaroids.jpg' WHERE slug = 'polaroids';
UPDATE public.products SET main_image_url = '/images/spotify-cards.jpg' WHERE slug = 'spotify-cards';
UPDATE public.products SET main_image_url = '/images/desk-calendar.png' WHERE slug = 'desk-calendar';
UPDATE public.products SET main_image_url = '/images/newspaper.jpg' WHERE slug = 'personalised-newspaper';
UPDATE public.products SET main_image_url = '/images/fridge-magnet-polaroids.png' WHERE slug = 'fridge-magnet-polaroids';
UPDATE public.products SET main_image_url = '/images/photo-keychains.jpg' WHERE slug = 'keychains';
UPDATE public.products SET main_image_url = '/images/photo-booth-strips.jpg' WHERE slug = 'photo-booth-strips';
