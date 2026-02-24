const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'de', 'fr', 'pl', 'it'];
const MESSAGES_DIR = path.join(__dirname, '../messages');

function flattenKeys(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null) {
      keys.push(...flattenKeys(v, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

let hasErrors = false;

// 1. Validate JSON
console.log('\n=== JSON Validity ===');
const parsed = {};
for (const locale of LOCALES) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    parsed[locale] = JSON.parse(content);
    console.log(`✅ ${locale}.json — valid`);
  } catch (e) {
    console.log(`❌ ${locale}.json — INVALID: ${e.message}`);
    hasErrors = true;
  }
}

// 2. Check all EN keys exist in other languages
console.log('\n=== Missing Keys (compared to EN) ===');
const enKeys = flattenKeys(parsed['en'] || {});

for (const locale of LOCALES.filter(l => l !== 'en')) {
  if (!parsed[locale]) continue;
  const localeKeys = new Set(flattenKeys(parsed[locale]));
  const missing = enKeys.filter(k => !localeKeys.has(k));
  if (missing.length === 0) {
    console.log(`✅ ${locale} — all ${enKeys.length} keys present`);
  } else {
    console.log(`❌ ${locale} — missing ${missing.length} keys:`);
    missing.forEach(k => console.log(`   - ${k}`));
    hasErrors = true;
  }
}

// 3. Check for obviously untranslated values (same as EN)
console.log('\n=== Possibly Untranslated Values ===');
for (const locale of LOCALES.filter(l => l !== 'en')) {
  if (!parsed[locale] || !parsed['en']) continue;
  const enFlat = {};
  const localeFlat = {};
  
  function flatten(obj, prefix, target) {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (typeof v === 'object' && v !== null) flatten(v, key, target);
      else target[key] = v;
    }
  }
  
  flatten(parsed['en'], '', enFlat);
  flatten(parsed[locale], '', localeFlat);
  
  const same = Object.entries(enFlat)
    .filter(([k, v]) => localeFlat[k] === v && typeof v === 'string' && v.length > 3)
    // Exclude keys that are intentionally same (brand names, emails, etc.)
    .filter(([k]) => !k.includes('email') && !k.includes('iban') && !k.includes('bic') && !k.includes('bank'))
    .map(([k]) => k);
  
  if (same.length === 0) {
    console.log(`✅ ${locale} — no obviously untranslated values`);
  } else {
    console.log(`⚠️  ${locale} — ${same.length} values same as EN (may be untranslated):`);
    same.slice(0, 15).forEach(k => console.log(`   - ${k}: "${enFlat[k]}"`));
    if (same.length > 15) console.log(`   ... and ${same.length - 15} more`);
  }
}

console.log('\n=== RESULT ===');
if (hasErrors) {
  console.log('❌ ERRORS FOUND — fix before deploying');
  process.exit(1);
} else {
  console.log('✅ All checks passed');
}
