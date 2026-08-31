const fs = require('fs');

let shop = fs.readFileSync('components/marketing/shop-by-occasion-section.tsx', 'utf8');

shop = shop.replace('image: "/images/spotify-cards.jpg"', 'image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"');
shop = shop.replace('image: "/images/newspaper.jpg"', 'image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"');
shop = shop.replace('image: "/images/fridge-magnet-polaroids.png"', 'image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"');
shop = shop.replace('image: "/images/photo-keychains.jpg"', 'image: "https://images.unsplash.com/photo-1505322747495-6afdd3b70760?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"');

fs.writeFileSync('components/marketing/shop-by-occasion-section.tsx', shop, 'utf8');
console.log('Shop by Occasion reverted to original Unsplash images');
