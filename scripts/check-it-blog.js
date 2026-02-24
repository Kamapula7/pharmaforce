const fs = require('fs');
const f = fs.readFileSync('lib/blog-translations.ts', 'utf8');

const itStart = f.indexOf('\n  it: {');
const nextSection = f.indexOf('\n};', itStart);
const itSection = f.slice(itStart, nextSection);

// Get all slugs defined in the it section
const slugMatches = [...itSection.matchAll(/'([a-z0-9-]+)':\s*\{/g)];
const itSlugs = slugMatches.map(m => m[1]);
console.log('IT slugs (' + itSlugs.length + '):\n' + itSlugs.join('\n'));

// Also check all slugs from blog-content
const bc = fs.readFileSync('lib/blog-content.ts', 'utf8');
const allSlugs = [...bc.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map(m => m[1]);
console.log('\nAll blog slugs (' + allSlugs.length + '):\n' + allSlugs.join('\n'));

const missing = allSlugs.filter(s => !itSlugs.includes(s));
console.log('\nMissing from IT (' + missing.length + '):\n' + missing.join('\n'));
