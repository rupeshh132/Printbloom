const fs = require('fs');

function fixFile(f) {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;
    
    // Check for common mojibake strings that represent the Rupee symbol and minus sign
    content = content.replace(/â‚¹/g, '₹');
    content = content.replace(/âˆ’/g, '-');
    content = content.replace(/â€”/g, '—');
    content = content.replace(/â€™/g, "'");
    content = content.replace(/,1/g, '₹');
    
    // Replace the specific strange characters if they exist
    content = content.split(',1').join('₹');
    content = content.split('').join(''); // Remove weird replacement chars
    
    if (content !== original) {
      fs.writeFileSync(f, content, 'utf8');
      console.log('Fixed', f);
    }
  }
}

fixFile('app/cart/page.tsx');
fixFile('components/profile/order-history.tsx');
fixFile('components/products/product-customizer.tsx');
fixFile('app/admin/(protected)/page.tsx');
