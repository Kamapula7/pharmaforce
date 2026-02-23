const fs = require('fs');
const raw = fs.readFileSync('messages/de.json');
const text = raw.toString('utf8');
const data = JSON.parse(text);

const check = (key, val) => {
  const s = JSON.stringify(val);
  // Look for double-encoded UTF-8 patterns
  if (/\u00d0|\u00c3\u00bc|\u00c3\u00bc|\u00c3\u009c|\u00e2\u0080/.test(val)) {
    console.log('BROKEN:', key, '->', JSON.stringify(val).substring(0, 80));
  }
};

const walk = (obj, prefix) => {
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (typeof v === 'string') check(prefix + '.' + k, v);
    else if (typeof v === 'object') walk(v, prefix + '.' + k);
  }
};

walk(data, 'de');
console.log('\nKey strings:');
console.log('hero.description:', data.home.hero.description);
console.log('features.quality.title:', data.home.features.quality.title);
console.log('features.quality.desc:', data.home.features.quality.desc);
console.log('nav.about:', data.nav.about);
