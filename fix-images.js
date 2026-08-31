const fs = require('fs');

// Fix Behind the Scenes - use unique images not used elsewhere
let bts = fs.readFileSync('components/marketing/behind-the-scenes-section.tsx', 'utf8');
bts = bts.replace('image: "/images/a4-2.jpg"', 'image: "/images/softcopy-magazine.jpg"');
bts = bts.replace('image: "/images/a4-1.jpg"', 'image: "/images/frame-2.jpg"');
bts = bts.replace('image: "/images/frame-1.jpg"', 'image: "/images/desk-calendar.png"');
fs.writeFileSync('components/marketing/behind-the-scenes-section.tsx', bts, 'utf8');
console.log('BTS fixed');

// Fix Shop by Occasion - use unique images not used elsewhere
let shop = fs.readFileSync('components/marketing/shop-by-occasion-section.tsx', 'utf8');
shop = shop.replace('image: "/images/a4-1.jpg"', 'image: "/images/spotify-cards.jpg"');
shop = shop.replace('image: "/images/a4-2.jpg"', 'image: "/images/newspaper.jpg"');
shop = shop.replace('image: "/images/polaroids.jpg"', 'image: "/images/fridge-magnet-polaroids.png"');
shop = shop.replace('image: "/images/frame-1.jpg"', 'image: "/images/photo-keychains.jpg"');
fs.writeFileSync('components/marketing/shop-by-occasion-section.tsx', shop, 'utf8');
console.log('Shop by Occasion fixed');
