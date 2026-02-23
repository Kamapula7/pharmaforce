const fs = require('fs');

const langs = {
  en: {
    footer: { legal: 'Legal', gdpr: '\u{1F1EA}\u{1F1FA} GDPR Compliant', secureTransfer: '\uD83D\uDD12 Secure Bank Transfer', euShipping: '\u2708\uFE0F EU-wide Shipping' },
    product: { alreadyInCart: 'Already in cart:', pack: 'pack', packs: 'packs', quantity: 'Quantity', total: 'total', addedToCart: 'Added to Cart!', viewCart: 'View Cart', promoBuy2: 'Buy 2 packs \u2014 get the 3rd one FREE', promoAdd1: 'Add 1 more \u2014 get the next pack FREE!', promoFree: 'packs FREE! You save' }
  },
  de: {
    footer: { legal: 'Rechtliches', gdpr: '\u{1F1EA}\u{1F1FA} DSGVO-konform', secureTransfer: '\uD83D\uDD12 Sichere Banküberweisung', euShipping: '\u2708\uFE0F EU-weiter Versand' },
    product: { alreadyInCart: 'Bereits im Warenkorb:', pack: 'Packung', packs: 'Packungen', quantity: 'Menge', total: 'gesamt', addedToCart: 'In den Warenkorb gelegt!', viewCart: 'Warenkorb ansehen', promoBuy2: '2 kaufen \u2014 3. gratis!', promoAdd1: 'Noch 1 hinzuf\u00fcgen \u2014 n\u00e4chste Packung gratis!', promoFree: 'Packungen GRATIS! Sie sparen' }
  },
  fr: {
    footer: { legal: 'L\u00e9gal', gdpr: '\u{1F1EA}\u{1F1FA} Conforme RGPD', secureTransfer: '\uD83D\uDD12 Virement bancaire s\u00e9curis\u00e9', euShipping: '\u2708\uFE0F Livraison dans toute l\'UE' },
    product: { alreadyInCart: 'D\u00e9j\u00e0 dans le panier :', pack: 'unit\u00e9', packs: 'unit\u00e9s', quantity: 'Quantit\u00e9', total: 'total', addedToCart: 'Ajout\u00e9 au panier !', viewCart: 'Voir le panier', promoBuy2: 'Achetez 2 \u2014 obtenez le 3\u00e8me GRATUIT', promoAdd1: 'Ajoutez-en 1 \u2014 obtenez la prochaine gratuite !', promoFree: 'unit\u00e9s GRATUITES ! Vous \u00e9conomisez' }
  },
  it: {
    footer: { legal: 'Legale', gdpr: '\u{1F1EA}\u{1F1FA} Conforme GDPR', secureTransfer: '\uD83D\uDD12 Bonifico bancario sicuro', euShipping: '\u2708\uFE0F Spedizione in tutta l\'UE' },
    product: { alreadyInCart: 'Gi\u00e0 nel carrello:', pack: 'confezione', packs: 'confezioni', quantity: 'Quantit\u00e0', total: 'totale', addedToCart: 'Aggiunto al carrello!', viewCart: 'Vedi carrello', promoBuy2: 'Acquista 2 \u2014 ricevi il 3\u00b0 GRATIS', promoAdd1: 'Aggiungi ancora 1 \u2014 prossima confezione gratis!', promoFree: 'confezioni GRATIS! Risparmi' }
  },
  pl: {
    footer: { legal: 'Prawne', gdpr: '\u{1F1EA}\u{1F1FA} Zgodno\u015b\u0107 z RODO', secureTransfer: '\uD83D\uDD12 Bezpieczny przelew bankowy', euShipping: '\u2708\uFE0F Wysy\u0142ka na terenie UE' },
    product: { alreadyInCart: 'Ju\u017c w koszyku:', pack: 'opakowanie', packs: 'opakowania', quantity: 'Ilo\u015b\u0107', total: '\u0142\u0105cznie', addedToCart: 'Dodano do koszyka!', viewCart: 'Zobacz koszyk', promoBuy2: 'Kup 2 \u2014 dostaniesz 3. GRATIS', promoAdd1: 'Dodaj jeszcze 1 \u2014 nast\u0119pne opakowanie gratis!', promoFree: 'opakowa\u0144 GRATIS! Oszcz\u0119dzasz' }
  }
};

Object.entries(langs).forEach(([lang, additions]) => {
  const path = 'messages/' + lang + '.json';
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  Object.assign(data.footer, additions.footer);
  Object.assign(data.product, additions.product);
  fs.writeFileSync(path, JSON.stringify(data, null, 4), 'utf8');
  console.log(lang + ' done');
});
