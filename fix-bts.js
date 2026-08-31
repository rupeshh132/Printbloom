const fs = require('fs');
let bts = fs.readFileSync('components/marketing/behind-the-scenes-section.tsx', 'utf8');
bts = bts.replace('image: "/images/softcopy-magazine.jpg"', 'image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"');
bts = bts.replace('image: "/images/frame-2.jpg"', 'image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"');
bts = bts.replace('image: "/images/desk-calendar.png"', 'image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"');
fs.writeFileSync('components/marketing/behind-the-scenes-section.tsx', bts, 'utf8');
console.log('Done');
