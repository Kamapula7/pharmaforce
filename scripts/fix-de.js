const fs = require('fs');
const data = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

// Fix order section
data.order.confirmed = 'Bestellung bestätigt!';
data.order.confirmedDesc = 'Vielen Dank für Ihre Bestellung. Bitte überweisen Sie den Betrag mit den folgenden Daten.';
data.order.emailSent = 'Eine Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet.';

// Fix payment section
data.payment.awaitingBody = 'Wir warten auf Ihre Banküberweisung. Sobald die Bank den Eingang der Zahlung bestätigt, wird Ihre Bestellung automatisch als bezahlt markiert und wir beginnen sofort mit der Bearbeitung.';

fs.writeFileSync('messages/de.json', JSON.stringify(data, null, 4), 'utf8');
console.log('Done');
console.log(data.order.confirmed);
console.log(data.order.confirmedDesc);
console.log(data.payment.awaitingBody);
