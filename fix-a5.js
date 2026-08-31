const fs = require('fs');

// Update A5 seed image to real Cloudinary URL (matches cart thumbnail)
let c = fs.readFileSync('app/actions/products.ts', 'utf8');
c = c.replace(
  'main_image_url: "/images/a4-2.jpg"',
  'main_image_url: "https://res.cloudinary.com/gnltrlq1/image/upload/v1788039390/va7ck2ohbi9uhktrzmcx.jpg"'
);
fs.writeFileSync('app/actions/products.ts', c, 'utf8');
console.log('Seed updated for A5');

// Also update the seed-images API route for A5
let api = fs.readFileSync('app/api/seed-images/route.ts', 'utf8');
api = api.replace(
  '{ slug: "custom-magazine-a5", main_image_url: "/images/a4-2.jpg" }',
  '{ slug: "custom-magazine-a5", main_image_url: "https://res.cloudinary.com/gnltrlq1/image/upload/v1788039390/va7ck2ohbi9uhktrzmcx.jpg" }'
);
fs.writeFileSync('app/api/seed-images/route.ts', api, 'utf8');
console.log('API route updated for A5');
