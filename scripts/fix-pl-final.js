const fs = require('fs');
const pl = JSON.parse(fs.readFileSync('messages/pl.json', 'utf8'));

pl.account.orders = 'Moje zam\u00f3wienia';
pl.account.register = 'Zarejestruj si\u0119';
pl.account.password = 'Has\u0142o';
pl.account.noOrders = 'Brak zam\u00f3wie\u0144';

pl.footer.tagline = 'Farmaceutyczna wydajno\u015b\u0107 dla powa\u017cnych sportowc\u00f3w.';
pl.footer.privacy = 'Polityka prywatno\u015bci';
pl.footer.allRights = 'Wszelkie prawa zastrze\u017cone.';

fs.writeFileSync('messages/pl.json', JSON.stringify(pl, null, 4), 'utf8');
console.log('pl final fixed');
