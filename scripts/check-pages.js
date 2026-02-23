const http = require('http');
const pages = ['/en','/de','/fr','/it','/pl','/en/products','/de/products','/fr/products','/pl/products'];

function checkPage(page) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + page, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const broken = [];
        const patterns = ['Р"вЂ', 'Р•вЂ', 'С–', 'вЂ"', 'вЂ¦', 'вЂ™', 'РЃ'];
        patterns.forEach(p => {
          if (data.includes(p)) broken.push(p);
        });
        // Check for literal translation keys
        const keyMatches = (data.match(/>[a-z]+\.[a-zA-Z]+</g) || []).map(m => m.slice(1,-1));
        resolve({ page, status: res.statusCode, broken, keys: keyMatches.slice(0, 5) });
      });
    }).on('error', err => resolve({ page, status: 'ERR:'+err.message, broken: [], keys: [] }));
  });
}

async function main() {
  for (const p of pages) {
    const r = await checkPage(p);
    const issues = [];
    if (r.broken.length) issues.push('BROKEN_CHARS: ' + r.broken.join(', '));
    if (r.keys.length) issues.push('LITERAL_KEYS: ' + r.keys.join(', '));
    console.log(r.page + ' [' + r.status + '] ' + (issues.length ? issues.join(' | ') : 'OK'));
  }
}
main();
