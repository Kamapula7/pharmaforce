const fs = require('fs');
const f = fs.readFileSync('lib/blog-translations.ts', 'utf8');

// Get just the fr: section
const frStart = f.indexOf('\n  fr: {');
const plStart = f.indexOf('\n  pl: {');
const frSection = f.slice(frStart, plStart);

const slugs = ['creatine-vs-beta-alanine','vitamin-d3-athletes-guide','pre-workout-timing-guide','omega3-recovery-science','magnesium-sleep-gains'];
slugs.forEach(s => {
  const found = frSection.includes("'" + s + "'");
  console.log(s + ': ' + (found ? 'OK' : 'MISSING'));
});
