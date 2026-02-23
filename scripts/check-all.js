const fs = require('fs');
const langs = ['en','de','fr','it','pl'];

console.log('=== LANGUAGE FILES ===');
langs.forEach(lang => {
  const raw = fs.readFileSync('messages/' + lang + '.json');
  if (raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF) {
    console.log(lang + ': HAS BOM!');
    return;
  }
  const text = raw.toString('utf8');
  try {
    const data = JSON.parse(text);
    // Check for common broken patterns
    const str = JSON.stringify(data);
    const patterns = ['вЂ', 'Р"', 'РІ', 'вЂ¦', 'вЂ™', 'вЂ"', 'вЂ"', 'Р•', 'С–', 'РЃ'];
    const found = patterns.filter(p => str.includes(p));
    if (found.length > 0) {
      console.log(lang + ': BROKEN - found: ' + found.join(', '));
      // Show which keys
      const lines = str.split(',').filter(l => patterns.some(p => l.includes(p)));
      lines.slice(0,5).forEach(l => console.log('  -> ' + l.substring(0,100)));
    } else {
      console.log(lang + ': OK');
    }
  } catch(e) {
    console.log(lang + ': INVALID JSON - ' + e.message);
  }
});

console.log('\n=== PRODUCTS.TS ===');
const products = fs.readFileSync('lib/products.ts', 'utf8');
// Check duplicate IDs
const idMatches = [...products.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
const idCount = {};
idMatches.forEach(id => idCount[id] = (idCount[id]||0)+1);
const dupIds = Object.entries(idCount).filter(([k,v]) => v>1);
if (dupIds.length) console.log('Duplicate IDs: ' + JSON.stringify(dupIds));
else console.log('No duplicate IDs: OK');

// Check duplicate names
const nameMatches = [...products.matchAll(/name:\s*'([^']+)'/g)].map(m => m[1]);
const nameCount = {};
nameMatches.forEach(n => nameCount[n] = (nameCount[n]||0)+1);
const dupNames = Object.entries(nameCount).filter(([k,v]) => v>1);
if (dupNames.length) console.log('Duplicate names: ' + JSON.stringify(dupNames));
else console.log('No duplicate names: OK');

// Check for missing images (products with placeholder paths)
const noImage = [...products.matchAll(/\{[^}]*image:\s*'\/products\/([^']+)'[^}]*\}/g)]
  .filter(m => !fs.existsSync('public/products/' + m[1]));

// Count total products
console.log('Total products: ' + idMatches.length);

console.log('\n=== CRITICAL ROUTES ===');
const pages = [
  'app/[locale]/page.tsx',
  'app/[locale]/products/page.tsx',
  'app/[locale]/products/[slug]/page.tsx',
  'app/[locale]/cart/page.tsx',
  'app/[locale]/checkout/page.tsx',
];
pages.forEach(p => {
  if (fs.existsSync(p)) console.log(p + ': EXISTS');
  else console.log(p + ': MISSING!');
});
