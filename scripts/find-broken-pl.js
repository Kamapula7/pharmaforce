const fs = require('fs');
const d = JSON.parse(fs.readFileSync('messages/pl.json', 'utf8'));
const s = JSON.stringify(d);
// Find all broken patterns
const broken = [];
const lines = s.split(',');
lines.forEach(line => {
  if (line.includes('\u0420\u201e') || line.includes('\u0420\u2019') || line.includes('\u0420\u2022') || 
      line.includes('\u0421\u201a') || line.includes('\u0420\u201a') || line.includes('\u0415\u0432\u042d') ||
      line.includes('\u0421\u2013')) {
    broken.push(line.substring(0, 120));
  }
});
broken.forEach(b => console.log(b));
