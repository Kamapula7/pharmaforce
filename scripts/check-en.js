const fs = require('fs');
const d = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const str = JSON.stringify(d);
let hasBroken = false;
str.split('","').forEach(part => {
  if (part.includes('\u00d0') || part.includes('\u00c3') || part.includes('\u0412\u0402')) {
    console.log('BROKEN:', part.substring(0, 120));
    hasBroken = true;
  }
});
if (!hasBroken) console.log('en.json is clean');
console.log('badge:', d.home.hero.badge);
