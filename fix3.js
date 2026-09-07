const fs = require('fs');
const file = 'components/profile/smart-reminders.tsx';
let c = fs.readFileSync(file, 'utf8');
c = c.replace('import { formatDateWithoutYear } from "@/lib/utils"\r\nimport { formatDateWithoutYear } from "@/lib/utils"', 'import { formatDateWithoutYear } from "@/lib/utils"');
c = c.replace('import { formatDateWithoutYear } from "@/lib/utils"\nimport { formatDateWithoutYear } from "@/lib/utils"', 'import { formatDateWithoutYear } from "@/lib/utils"');
fs.writeFileSync(file, c);
console.log('fixed');
