const fs = require('fs');

// EN fixes
const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
en.payment.awaitingNote = 'Bank transfers typically take 1\u20132 business days to process. You will receive an email notification once your payment is confirmed.';
en.order.instructions = 'Please include your order number as the payment reference. Your order will be shipped within 1\u20132 business days after payment confirmation.';
fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 4), 'utf8');
console.log('en fixed');

// FR fixes
const fr = JSON.parse(fs.readFileSync('messages/fr.json', 'utf8'));
fr.order.confirmed = 'Commande confirm\u00e9e\u00a0!';
fr.order.confirmedDesc = 'Merci pour votre commande. Veuillez effectuer le virement en utilisant les coordonn\u00e9es ci-dessous.';
fr.order.orderNumber = 'Num\u00e9ro de commande';
fr.order.bankDetails = 'Coordonn\u00e9es bancaires';
fr.order.bankName = 'Banque';
fr.order.reference = 'R\u00e9f\u00e9rence de paiement';
fr.order.amount = 'Montant';
fr.order.instructions = 'Veuillez inclure votre num\u00e9ro de commande comme r\u00e9f\u00e9rence de paiement. Votre commande sera exp\u00e9di\u00e9e dans 1\u20132 jours ouvrables apr\u00e8s confirmation du paiement.';
fr.order.emailSent = 'Un e-mail de confirmation a \u00e9t\u00e9 envoy\u00e9 \u00e0 votre adresse e-mail.';
fr.payment.awaitingBody = 'Nous attendons votre virement bancaire. D\u00e8s que la banque confirme la r\u00e9ception des fonds, votre commande sera automatiquement marqu\u00e9e comme pay\u00e9e et nous commencerons imm\u00e9diatement le traitement.';
fr.payment.awaitingNote = 'Les virements bancaires prennent g\u00e9n\u00e9ralement 1\u20132 jours ouvrables. Vous recevrez une notification par e-mail d\u00e8s que votre paiement sera confirm\u00e9.';
fs.writeFileSync('messages/fr.json', JSON.stringify(fr, null, 4), 'utf8');
console.log('fr fixed');

// IT fixes
const it = JSON.parse(fs.readFileSync('messages/it.json', 'utf8'));
it.order.confirmed = 'Ordine confermato!';
it.order.confirmedDesc = 'Grazie per il tuo ordine. Si prega di effettuare il pagamento utilizzando i dati sottostanti.';
it.order.instructions = 'Si prega di includere il numero d\u2019ordine come riferimento di pagamento. Il tuo ordine verr\u00e0 spedito entro 1\u20132 giorni lavorativi dalla conferma del pagamento.';
it.order.emailSent = 'Una email di conferma \u00e8 stata inviata al tuo indirizzo email.';
it.payment.awaitingBody = 'Stiamo aspettando il tuo bonifico bancario. Non appena la banca conferma la ricezione dei fondi, il tuo ordine verr\u00e0 automaticamente contrassegnato come pagato e inizieremo subito l\u2019elaborazione.';
it.payment.awaitingNote = 'I bonifici bancari richiedono generalmente 1\u20132 giorni lavorativi. Riceverai una notifica via e-mail una volta confermato il pagamento.';
fs.writeFileSync('messages/it.json', JSON.stringify(it, null, 4), 'utf8');
console.log('it fixed');

// PL fixes
const pl = JSON.parse(fs.readFileSync('messages/pl.json', 'utf8'));
pl.order.confirmed = 'Zam\u00f3wienie potwierdzone!';
pl.order.confirmedDesc = 'Dzi\u0119kujemy za zam\u00f3wienie. Prosz\u0119 dokona\u0107 przelewu korzystaj\u0105c z poni\u017cszych danych.';
pl.order.orderNumber = 'Numer zam\u00f3wienia';
pl.order.bankDetails = 'Dane do przelewu';
pl.order.bankName = 'Bank';
pl.order.reference = 'Tytu\u0142 przelewu';
pl.order.amount = 'Kwota';
pl.order.instructions = 'Prosz\u0119 poda\u0107 numer zam\u00f3wienia jako tytu\u0142 przelewu. Zam\u00f3wienie zostanie wys\u0142ane w ci\u0105gu 1\u20132 dni roboczych po potwierdzeniu p\u0142atno\u015bci.';
pl.order.emailSent = 'E-mail z potwierdzeniem zosta\u0142 wys\u0142any na Tw\u00f3j adres e-mail.';
pl.payment.awaitingBody = 'Czekamy na Tw\u00f3j przelew bankowy. Gdy bank potwierdzi otrzymanie \u015brodk\u00f3w, Twoje zam\u00f3wienie zostanie automatycznie oznaczone jako op\u0142acone i natychmiast przyst\u0105pimy do jego realizacji.';
pl.payment.awaitingNote = 'Przelewy bankowe zwykle trwaj\u0105 1\u20132 dni robocze. Otrzymasz powiadomienie e-mail po potwierdzeniu p\u0142atno\u015bci.';
fs.writeFileSync('messages/pl.json', JSON.stringify(pl, null, 4), 'utf8');
console.log('pl fixed');
