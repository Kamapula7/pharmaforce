const fs = require('fs');
const pl = JSON.parse(fs.readFileSync('messages/pl.json', 'utf8'));

pl.payment.awaitingTitle = 'Oczekujemy na Twoj\u0105 p\u0142atno\u015b\u0107';
pl.subcategories.tablets = 'Tabletki / Kapsu\u0142ki';

fs.writeFileSync('messages/pl.json', JSON.stringify(pl, null, 4), 'utf8');
console.log('done');
