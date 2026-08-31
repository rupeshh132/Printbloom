const fs = require('fs');

let c = fs.readFileSync('.env.local', 'utf8');
if (!c.includes('ADMIN_EMAILS')) {
  fs.appendFileSync('.env.local', '\n# Comma separated list of emails allowed to access /admin\nADMIN_EMAILS="vrupesh132@gmail.com"\n');
  console.log('Added ADMIN_EMAILS to .env.local');
} else {
  console.log('ADMIN_EMAILS already exists');
}
