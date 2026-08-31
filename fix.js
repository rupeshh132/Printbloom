const cp = require('child_process');
const fs = require('fs');

const manuallyEdited = [
  'components/ui/whatsapp-float.tsx', 
  'components/marketing/footer.tsx', 
  'app/admin/(protected)/journal/page.tsx', 
  'app/actions/products.ts', 
  'components/marketing/navbar.tsx', 
  'app/cart/page.tsx', 
  'app/globals.css', 
  'components/ui/button.tsx', 
  'app/(marketing)/products/[slug]/page.tsx', 
  'components/products/product-customizer.tsx', 
  'components/products/add-to-cart-button.tsx'
];

const allModified = cp.execSync('git diff --name-only').toString().split('\n').filter(Boolean);

allModified.forEach(file => {
  if (!manuallyEdited.includes(file) && !file.includes('package.json') && !file.includes('package-lock.json')) {
    console.log('Fixing ' + file);
    try {
      cp.execSync(`git checkout -- "${file}"`);
      let content = fs.readFileSync(file, 'utf8');
      content = content.replace(/#C1502E/g, '#DFBC94').replace(/#c1502e/g, '#DFBC94');
      fs.writeFileSync(file, content, 'utf8');
    } catch (e) {
      console.error("Error on " + file, e);
    }
  }
});
