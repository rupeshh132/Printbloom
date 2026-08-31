const fs = require('fs');
const path = require('path');

function replaceCorrupted(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceCorrupted(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      // Read the file as binary buffer to properly detect/replace the bytes, or just read as utf8 and replace the corrupted characters if it was double-encoded
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let newContent = content;
      // These are typical double-encoded UTF-8 characters
      newContent = newContent.replace(/â‚¹/g, '₹');
      newContent = newContent.replace(/âˆ’/g, '-');
      newContent = newContent.replace(/â€”/g, '—');
      newContent = newContent.replace(/â€™/g, "'");
      newContent = newContent.replace(/,1/g, '₹');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Fixed:', fullPath);
      }
    }
  }
}
replaceCorrupted(path.join(process.cwd(), 'app'));
replaceCorrupted(path.join(process.cwd(), 'components'));
