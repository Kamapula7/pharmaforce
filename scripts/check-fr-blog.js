const fs = require('fs');
const f = fs.readFileSync('lib/blog-translations.ts', 'utf8');
const slugs = ['creatine-vs-beta-alanine','vitamin-d3-athletes-guide','pre-workout-timing-guide','omega3-recovery-science','magnesium-sleep-gains'];
slugs.forEach(s => {
  const searchStr = "'" + s + "'";
  const idx = f.indexOf(searchStr);
  if (idx < 0) { console.log('NOT FOUND: ' + s); return; }
  // Check if fr translation exists nearby
  const block = f.slice(idx, idx + 3000);
  const hasFr = block.indexOf("fr:") !== -1;
  console.log(s + ' -> fr: ' + hasFr);
  if (!hasFr) {
    // Show surrounding context
    console.log('Context:', block.slice(0, 400));
  }
});
