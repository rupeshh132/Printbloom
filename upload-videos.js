const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Simple .env.local parser
const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
  }
});

cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

async function uploadVideos() {
  const videosDir = path.join(__dirname, 'public', 'videos', 'reactions');
  const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));
  
  const results = {};
  
  for (const file of files) {
    console.log(`Uploading ${file}...`);
    try {
      const result = await cloudinary.uploader.upload(path.join(videosDir, file), {
        resource_type: 'video',
        folder: 'printbloom/reactions',
        public_id: file.replace('.mp4', ''),
      });
      console.log(`Success ${file}: ${result.secure_url}`);
      results[file] = result.secure_url;
    } catch (err) {
      console.error(`Failed ${file}:`, err.message);
    }
  }
  
  fs.writeFileSync('cloudinary_urls.json', JSON.stringify(results, null, 2));
  console.log('Done! Wrote urls to cloudinary_urls.json');
}

uploadVideos();
