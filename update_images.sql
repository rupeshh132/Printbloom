-- Run this in your Supabase SQL Editor to update the product images permanently

UPDATE public.products 
SET main_image_url = 'https://res.cloudinary.com/gnltrlq1/image/upload/v1788039384/y4gssqappbukqcn9k3xc.jpg' 
WHERE slug = 'custom-magazine-a4';

UPDATE public.products 
SET main_image_url = 'https://res.cloudinary.com/gnltrlq1/image/upload/v1788039390/va7ck2ohbi9uhktrzmcx.jpg' 
WHERE slug = 'custom-magazine-a5';

UPDATE public.products 
SET main_image_url = 'https://res.cloudinary.com/gnltrlq1/image/upload/v1788039394/bo2fkgkljfrywzvr2wdl.jpg' 
WHERE slug = 'photo-frames';

-- If you have any products with slug "custom-magazine" (old name), update it too
UPDATE public.products 
SET main_image_url = 'https://res.cloudinary.com/gnltrlq1/image/upload/v1788039384/y4gssqappbukqcn9k3xc.jpg' 
WHERE slug = 'custom-magazine';
