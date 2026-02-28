import type { Metadata } from 'next';
import FaqClient from '@/components/faq/FaqClient';

interface FaqPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'FAQ — Frequently Asked Questions | PharmaForce',
    description: 'Answers to the most common questions about ordering, shipping, payment and products at PharmaForce. EU delivery, no prescription required.',
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/faq`,
      languages: {
        'en': 'https://pharmaforce-store.com/en/faq',
        'de': 'https://pharmaforce-store.com/de/faq',
        'fr': 'https://pharmaforce-store.com/fr/faq',
        'it': 'https://pharmaforce-store.com/it/faq',
        'pl': 'https://pharmaforce-store.com/pl/faq',
        'es': 'https://pharmaforce-store.com/es/faq',
      },
    },
    openGraph: {
      title: 'FAQ — Frequently Asked Questions | PharmaForce',
      description: 'Answers to the most common questions about ordering, shipping, payment and products at PharmaForce.',
      url: `https://pharmaforce-store.com/${locale}/faq`,
      siteName: 'PharmaForce',
      images: [{ url: 'https://pharmaforce-store.com/hero-athletes.png', width: 1200, height: 630, alt: 'PharmaForce FAQ' }],
      type: 'website',
    },
  };
}

type FaqSection = { section: string; items: { q: string; a: string }[] };
type FaqContent = { badge: string; title: string; subtitle: string; stillTitle: string; stillDesc: string; sections: FaqSection[] };

const FAQ_CONTENT: Record<string, FaqContent> = {
  en: {
    badge: 'Support',
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about ordering, shipping, and products at PharmaForce.',
    stillTitle: 'Still have questions?',
    stillDesc: 'Our team responds within 2–6 hours on business days.',
    sections: [
      {
        section: 'Orders & Payment',
        items: [
          { q: 'How do I place an order?', a: 'Browse our catalogue, add items to cart, and proceed to checkout. Fill in your shipping address and you\'ll receive bank transfer details by email. Your order is confirmed once we receive your payment.' },
          { q: 'What payment methods do you accept?', a: 'We accept bank transfer (IBAN) only. After placing your order, you receive our banking details. Once your transfer is confirmed (typically 1–2 business days), we ship your order.' },
          { q: 'How long does payment confirmation take?', a: 'SEPA bank transfers within the EU are typically confirmed within 1–2 business days. Once confirmed, your order moves to processing and ships within 24 hours.' },
          { q: 'Can I cancel my order?', a: 'You can cancel your order before payment is confirmed. Once payment is received, cancellations are not possible as the order enters processing. Contact us at pharmaforce@inbox.eu immediately if you need to cancel.' },
          { q: 'Is there a minimum order amount?', a: 'There is no minimum order. However, shipping is free on orders over €150.' },
        ],
      },
      {
        section: 'Shipping & Delivery',
        items: [
          { q: 'Which countries do you ship to?', a: 'We ship to 30+ European countries including Germany, France, Spain, Italy, Poland, Netherlands, Belgium, Austria, Sweden, Denmark, Finland, Czech Republic, Hungary, Romania, and more.' },
          { q: 'How long does delivery take?', a: 'Delivery times depend on your location: Core EU (DE, AT, NL) — 3–5 days; Western EU (FR, ES, IT) — 4–7 days; Northern EU — 5–8 days; Eastern/Southern EU — 5–10 days.' },
          { q: 'How are orders packaged?', a: 'All orders are shipped in plain, discreet packaging with no product names, brand logos, or identifying information on the outside.' },
          { q: 'Do I need to pay customs fees?', a: 'No. All shipments are sent from within the European Union, so there are no customs fees or import duties for EU residents.' },
          { q: 'How do I track my order?', a: 'Once shipped, you receive a tracking number by email. The tracking link is also available in your account under My Orders.' },
        ],
      },
      {
        section: 'Products & Quality',
        items: [
          { q: 'Are your products lab tested?', a: 'Yes. All products we carry are pharmaceutical-grade or verified by third-party laboratory testing. We only work with reputable manufacturers that provide Certificates of Analysis (COA).' },
          { q: 'Do I need a prescription?', a: 'No prescription is required to purchase from our store. We operate as a B2C supplier for research and performance purposes.' },
          { q: 'What is the shelf life of products?', a: 'All products are shipped with at least 12 months remaining shelf life. Some pharmaceutical products have shelf lives of 2–3 years.' },
          { q: 'How should I store my order?', a: 'Most supplements should be stored in a cool, dry place. Peptides and some medications require refrigeration after reconstitution. Specific storage instructions are on each product label.' },
        ],
      },
      {
        section: 'Returns & Refunds',
        items: [
          { q: 'Can I return a product?', a: 'Due to the nature of pharmaceutical and supplement products, we do not accept returns for health and safety reasons. If you received a damaged or incorrect item, contact us within 48 hours of delivery.' },
          { q: 'What if my order arrives damaged?', a: 'If your order arrives damaged, take photos immediately and email us at pharmaforce@inbox.eu within 48 hours. We will arrange a replacement or refund.' },
          { q: 'What if my order doesn\'t arrive?', a: 'If your order has not arrived within the estimated delivery window, contact us. For lost parcels confirmed by the carrier, we offer a full replacement or refund.' },
        ],
      },
      {
        section: 'Account & Privacy',
        items: [
          { q: 'Do I need an account to order?', a: 'No, you can order as a guest. However, creating an account allows you to track your orders and view order history.' },
          { q: 'How is my personal data handled?', a: 'We process personal data in accordance with GDPR. Your data is used solely for order fulfillment and is never sold to third parties.' },
          { q: 'Is my payment information secure?', a: 'Yes. We use bank transfer only — we never store card numbers or payment credentials.' },
        ],
      },
    ],
  },
  de: {
    badge: 'Support',
    title: 'Häufig gestellte Fragen',
    subtitle: 'Alles, was Sie über Bestellungen, Versand und Produkte bei PharmaForce wissen müssen.',
    stillTitle: 'Noch Fragen?',
    stillDesc: 'Unser Team antwortet innerhalb von 2–6 Stunden an Werktagen.',
    sections: [
      {
        section: 'Bestellungen & Zahlung',
        items: [
          { q: 'Wie gebe ich eine Bestellung auf?', a: 'Durchsuchen Sie unseren Katalog, fügen Sie Artikel in den Warenkorb und gehen Sie zur Kasse. Geben Sie Ihre Lieferadresse ein und erhalten Sie Banküberweisung-Daten per E-Mail. Ihre Bestellung wird bestätigt, sobald wir Ihre Zahlung erhalten.' },
          { q: 'Welche Zahlungsmethoden akzeptieren Sie?', a: 'Wir akzeptieren ausschließlich Banküberweisung (IBAN). Nach der Bestellung erhalten Sie unsere Bankdaten. Sobald Ihre Überweisung bestätigt ist (in der Regel 1–2 Werktage), versenden wir Ihre Bestellung.' },
          { q: 'Wie lange dauert die Zahlungsbestätigung?', a: 'SEPA-Überweisungen innerhalb der EU werden in der Regel innerhalb von 1–2 Werktagen bestätigt. Nach Bestätigung wird Ihre Bestellung innerhalb von 24 Stunden versandt.' },
          { q: 'Kann ich meine Bestellung stornieren?', a: 'Sie können Ihre Bestellung stornieren, bevor die Zahlung bestätigt wurde. Sobald die Zahlung eingegangen ist, sind Stornierungen nicht mehr möglich. Kontaktieren Sie uns sofort unter pharmaforce@inbox.eu.' },
          { q: 'Gibt es einen Mindestbestellwert?', a: 'Es gibt keinen Mindestbestellwert. Ab €150 ist der Versand kostenlos.' },
        ],
      },
      {
        section: 'Versand & Lieferung',
        items: [
          { q: 'In welche Länder versenden Sie?', a: 'Wir versenden in 30+ europäische Länder, darunter Deutschland, Frankreich, Spanien, Italien, Polen, Niederlande, Belgien, Österreich, Schweden, Dänemark, Finnland, Tschechien, Ungarn, Rumänien und weitere.' },
          { q: 'Wie lange dauert die Lieferung?', a: 'Kern-EU (DE, AT, NL) — 3–5 Tage; West-EU (FR, ES, IT) — 4–7 Tage; Nord-EU — 5–8 Tage; Ost-/Süd-EU — 5–10 Tage.' },
          { q: 'Wie werden Bestellungen verpackt?', a: 'Alle Bestellungen werden in schlichten, diskreten Verpackungen ohne Produktnamen, Markenlogos oder identifizierende Informationen auf der Außenseite versendet.' },
          { q: 'Muss ich Zollgebühren zahlen?', a: 'Nein. Alle Sendungen werden aus der EU versendet, daher fallen für EU-Einwohner keine Zollgebühren oder Einfuhrzölle an.' },
          { q: 'Wie kann ich meine Bestellung verfolgen?', a: 'Nach dem Versand erhalten Sie eine Sendungsnummer per E-Mail. Die Tracking-Information ist auch in Ihrem Konto unter Meine Bestellungen verfügbar.' },
        ],
      },
      {
        section: 'Produkte & Qualität',
        items: [
          { q: 'Sind Ihre Produkte laborgetestet?', a: 'Ja. Alle Produkte sind pharmazeutischer Qualität oder werden durch Drittlabortests verifiziert. Wir arbeiten nur mit renommierten Herstellern, die Analysezertifikate (COA) bereitstellen.' },
          { q: 'Benötige ich ein Rezept?', a: 'Für den Kauf in unserem Shop ist kein Rezept erforderlich. Wir sind ein B2C-Lieferant für Forschungs- und Leistungszwecke.' },
          { q: 'Wie lange sind die Produkte haltbar?', a: 'Alle Produkte werden mit mindestens 12 Monaten Restlaufzeit versendet. Einige pharmazeutische Produkte haben Haltbarkeiten von 2–3 Jahren.' },
          { q: 'Wie sollte ich meine Bestellung lagern?', a: 'Die meisten Nahrungsergänzungsmittel sollten kühl und trocken gelagert werden. Peptide und einige Medikamente müssen nach der Rekonstitution gekühlt werden.' },
        ],
      },
      {
        section: 'Rückgaben & Erstattungen',
        items: [
          { q: 'Kann ich ein Produkt zurückgeben?', a: 'Aufgrund der Natur pharmazeutischer und Supplement-Produkte akzeptieren wir aus Gesundheits- und Sicherheitsgründen keine Rücksendungen. Bei beschädigten oder falschen Artikeln kontaktieren Sie uns innerhalb von 48 Stunden.' },
          { q: 'Was tun bei beschädigter Lieferung?', a: 'Machen Sie sofort Fotos und senden Sie uns eine E-Mail an pharmaforce@inbox.eu innerhalb von 48 Stunden. Wir arrangieren einen Ersatz oder eine Erstattung.' },
          { q: 'Was wenn meine Bestellung nicht ankommt?', a: 'Kontaktieren Sie uns. Für verlorene Pakete, die vom Transportunternehmen bestätigt werden, bieten wir vollständigen Ersatz oder Erstattung.' },
        ],
      },
      {
        section: 'Konto & Datenschutz',
        items: [
          { q: 'Benötige ich ein Konto zum Bestellen?', a: 'Nein, Sie können als Gast bestellen. Ein Konto ermöglicht Ihnen jedoch, Ihre Bestellungen zu verfolgen und die Bestellhistorie einzusehen.' },
          { q: 'Wie werden meine persönlichen Daten behandelt?', a: 'Wir verarbeiten personenbezogene Daten gemäß DSGVO. Ihre Daten werden ausschließlich für die Auftragsabwicklung verwendet und nie an Dritte verkauft.' },
          { q: 'Sind meine Zahlungsinformationen sicher?', a: 'Ja. Wir verwenden ausschließlich Banküberweisung — wir speichern niemals Kartennummern oder Zahlungsdaten.' },
        ],
      },
    ],
  },
  fr: {
    badge: 'Support',
    title: 'Questions Fréquemment Posées',
    subtitle: 'Tout ce que vous devez savoir sur les commandes, la livraison et les produits chez PharmaForce.',
    stillTitle: 'Vous avez encore des questions ?',
    stillDesc: 'Notre équipe répond dans les 2–6 heures les jours ouvrables.',
    sections: [
      {
        section: 'Commandes & Paiement',
        items: [
          { q: 'Comment passer une commande ?', a: 'Parcourez notre catalogue, ajoutez des articles au panier et passez à la caisse. Remplissez votre adresse de livraison et vous recevrez les coordonnées bancaires par e-mail.' },
          { q: 'Quels modes de paiement acceptez-vous ?', a: 'Nous n\'acceptons que le virement bancaire (IBAN). Après votre commande, vous recevez nos coordonnées bancaires. Une fois votre virement confirmé (généralement 1–2 jours ouvrables), nous expédions votre commande.' },
          { q: 'Combien de temps prend la confirmation du paiement ?', a: 'Les virements SEPA au sein de l\'UE sont généralement confirmés dans les 1–2 jours ouvrables. Une fois confirmé, votre commande est traitée et expédiée dans les 24 heures.' },
          { q: 'Puis-je annuler ma commande ?', a: 'Vous pouvez annuler votre commande avant que le paiement soit confirmé. Une fois le paiement reçu, les annulations ne sont plus possibles. Contactez-nous immédiatement à pharmaforce@inbox.eu.' },
          { q: 'Y a-t-il un montant minimum de commande ?', a: 'Il n\'y a pas de minimum. La livraison est gratuite pour les commandes de plus de €150.' },
        ],
      },
      {
        section: 'Expédition & Livraison',
        items: [
          { q: 'Dans quels pays livrez-vous ?', a: 'Nous livrons dans 30+ pays européens dont l\'Allemagne, la France, l\'Espagne, l\'Italie, la Pologne, les Pays-Bas, la Belgique, l\'Autriche, la Suède, le Danemark, la Finlande et plus.' },
          { q: 'Combien de temps prend la livraison ?', a: 'EU principale (DE, AT, NL) — 3–5 jours ; EU Ouest (FR, ES, IT) — 4–7 jours ; EU Nord — 5–8 jours ; EU Est/Sud — 5–10 jours.' },
          { q: 'Comment sont emballées les commandes ?', a: 'Toutes les commandes sont expédiées dans des emballages discrets sans noms de produits, logos de marques ni informations identifiantes à l\'extérieur.' },
          { q: 'Dois-je payer des frais de douane ?', a: 'Non. Tous les envois sont expédiés depuis l\'UE, donc pas de frais de douane pour les résidents UE.' },
          { q: 'Comment suivre ma commande ?', a: 'Une fois expédié, vous recevez un numéro de suivi par e-mail. Le lien de suivi est également disponible dans votre compte.' },
        ],
      },
      {
        section: 'Produits & Qualité',
        items: [
          { q: 'Vos produits sont-ils testés en laboratoire ?', a: 'Oui. Tous nos produits sont de qualité pharmaceutique ou vérifiés par des tests de laboratoire tiers. Nous travaillons uniquement avec des fabricants réputés fournissant des Certificats d\'Analyse.' },
          { q: 'Ai-je besoin d\'une ordonnance ?', a: 'Aucune ordonnance n\'est requise pour acheter dans notre boutique.' },
          { q: 'Quelle est la durée de conservation des produits ?', a: 'Tous les produits sont expédiés avec au moins 12 mois de durée de conservation restante.' },
          { q: 'Comment stocker ma commande ?', a: 'La plupart des suppléments doivent être conservés dans un endroit frais et sec. Les peptides nécessitent une réfrigération après reconstitution.' },
        ],
      },
      {
        section: 'Retours & Remboursements',
        items: [
          { q: 'Puis-je retourner un produit ?', a: 'En raison de la nature des produits pharmaceutiques, nous n\'acceptons pas les retours pour des raisons de santé et de sécurité. Pour un article endommagé ou incorrect, contactez-nous dans les 48 heures.' },
          { q: 'Que faire si ma commande arrive endommagée ?', a: 'Prenez des photos immédiatement et envoyez-nous un e-mail à pharmaforce@inbox.eu dans les 48 heures. Nous organiserons un remplacement ou un remboursement.' },
          { q: 'Que faire si ma commande n\'arrive pas ?', a: 'Contactez-nous. Pour les colis perdus confirmés par le transporteur, nous offrons un remplacement complet ou un remboursement.' },
        ],
      },
      {
        section: 'Compte & Confidentialité',
        items: [
          { q: 'Ai-je besoin d\'un compte pour commander ?', a: 'Non, vous pouvez commander en tant qu\'invité. Un compte vous permet de suivre vos commandes et voir l\'historique.' },
          { q: 'Comment mes données personnelles sont-elles traitées ?', a: 'Nous traitons les données personnelles conformément au RGPD. Vos données sont utilisées uniquement pour l\'exécution des commandes et ne sont jamais vendues à des tiers.' },
          { q: 'Mes informations de paiement sont-elles sécurisées ?', a: 'Oui. Nous utilisons uniquement le virement bancaire — nous ne stockons jamais de numéros de carte.' },
        ],
      },
    ],
  },
  pl: {
    badge: 'Wsparcie',
    title: 'Najczęściej Zadawane Pytania',
    subtitle: 'Wszystko, co musisz wiedzieć o zamawianiu, wysyłce i produktach w PharmaForce.',
    stillTitle: 'Masz jeszcze pytania?',
    stillDesc: 'Nasz zespół odpowiada w ciągu 2–6 godzin w dni robocze.',
    sections: [
      {
        section: 'Zamówienia i Płatności',
        items: [
          { q: 'Jak złożyć zamówienie?', a: 'Przeglądaj nasz katalog, dodaj produkty do koszyka i przejdź do kasy. Podaj adres dostawy i otrzymaj dane do przelewu bankowego na e-mail. Zamówienie jest potwierdzone po otrzymaniu płatności.' },
          { q: 'Jakie metody płatności akceptujecie?', a: 'Akceptujemy wyłącznie przelew bankowy (IBAN). Po złożeniu zamówienia otrzymujesz nasze dane bankowe. Po potwierdzeniu przelewu (zazwyczaj 1–2 dni robocze) wysyłamy zamówienie.' },
          { q: 'Jak długo trwa potwierdzenie płatności?', a: 'Przelewy SEPA w ramach UE są zazwyczaj potwierdzane w ciągu 1–2 dni roboczych. Po potwierdzeniu zamówienie jest wysyłane w ciągu 24 godzin.' },
          { q: 'Czy mogę anulować zamówienie?', a: 'Możesz anulować zamówienie przed potwierdzeniem płatności. Po otrzymaniu płatności anulowanie nie jest możliwe. Skontaktuj się z nami natychmiast pod adresem pharmaforce@inbox.eu.' },
          { q: 'Czy jest minimalna kwota zamówienia?', a: 'Nie ma minimalnej kwoty zamówienia. Darmowa wysyłka przy zamówieniach powyżej €150.' },
        ],
      },
      {
        section: 'Wysyłka i Dostawa',
        items: [
          { q: 'Do których krajów wysyłacie?', a: 'Wysyłamy do 30+ krajów europejskich, m.in. Niemcy, Francja, Hiszpania, Włochy, Polska, Holandia, Belgia, Austria, Szwecja, Dania, Finlandia, Czechy, Węgry, Rumunia i inne.' },
          { q: 'Jak długo trwa dostawa?', a: 'Główna EU (DE, AT, NL) — 3–5 dni; Zachodnia EU (FR, ES, IT) — 4–7 dni; Północna EU — 5–8 dni; Wschodnia/Południowa EU — 5–10 dni.' },
          { q: 'Jak są pakowane zamówienia?', a: 'Wszystkie zamówienia są wysyłane w dyskretnych opakowaniach bez nazw produktów, logo marek ani identyfikujących informacji na zewnątrz.' },
          { q: 'Czy muszę płacić cło?', a: 'Nie. Wszystkie przesyłki są wysyłane z UE, więc nie ma opłat celnych dla mieszkańców UE.' },
          { q: 'Jak śledzić zamówienie?', a: 'Po wysłaniu otrzymujesz numer śledzenia na e-mail. Link do śledzenia jest również dostępny w Twoim koncie w sekcji Moje zamówienia.' },
        ],
      },
      {
        section: 'Produkty i Jakość',
        items: [
          { q: 'Czy Wasze produkty są testowane laboratoryjnie?', a: 'Tak. Wszystkie produkty są farmaceutycznej jakości lub weryfikowane przez niezależne laboratoria. Współpracujemy tylko z renomowanymi producentami dostarczającymi Certyfikaty Analizy (COA).' },
          { q: 'Czy potrzebuję recepty?', a: 'Nie jest wymagana recepta do zakupu w naszym sklepie. Działamy jako dostawca B2C do celów badawczych i wydajnościowych.' },
          { q: 'Jaki jest termin przydatności produktów?', a: 'Wszystkie produkty są wysyłane z co najmniej 12-miesięcznym pozostałym terminem przydatności.' },
          { q: 'Jak przechowywać zamówienie?', a: 'Większość suplementów powinna być przechowywana w chłodnym, suchym miejscu. Peptydy wymagają chłodzenia po rekonstytucji.' },
        ],
      },
      {
        section: 'Zwroty i Refundacje',
        items: [
          { q: 'Czy mogę zwrócić produkt?', a: 'Ze względu na charakter produktów farmaceutycznych nie przyjmujemy zwrotów ze względów bezpieczeństwa. W przypadku uszkodzonego lub błędnego towaru skontaktuj się z nami w ciągu 48 godzin.' },
          { q: 'Co zrobić gdy zamówienie dotrze uszkodzone?', a: 'Zrób zdjęcia natychmiast i wyślij e-mail na pharmaforce@inbox.eu w ciągu 48 godzin. Zorganizujemy wymianę lub zwrot środków.' },
          { q: 'Co jeśli zamówienie nie dotrze?', a: 'Skontaktuj się z nami. W przypadku zgubionych paczek potwierdzonych przez przewoźnika oferujemy pełną wymianę lub zwrot środków.' },
        ],
      },
      {
        section: 'Konto i Prywatność',
        items: [
          { q: 'Czy potrzebuję konta aby zamówić?', a: 'Nie, możesz zamówić jako gość. Konto umożliwia śledzenie zamówień i przeglądanie historii zamówień.' },
          { q: 'Jak przetwarzane są moje dane osobowe?', a: 'Przetwarzamy dane osobowe zgodnie z RODO. Twoje dane są wykorzystywane wyłącznie do realizacji zamówień i nigdy nie są sprzedawane osobom trzecim.' },
          { q: 'Czy moje dane płatnicze są bezpieczne?', a: 'Tak. Używamy wyłącznie przelewu bankowego — nigdy nie przechowujemy numerów kart ani danych płatniczych.' },
        ],
      },
    ],
  },
  it: {
    badge: 'Supporto',
    title: 'Domande Frequenti',
    subtitle: 'Tutto quello che devi sapere su ordini, spedizione e prodotti da PharmaForce.',
    stillTitle: 'Hai ancora domande?',
    stillDesc: 'Il nostro team risponde entro 2–6 ore nei giorni lavorativi.',
    sections: [
      {
        section: 'Ordini & Pagamento',
        items: [
          { q: 'Come effettuo un ordine?', a: 'Sfoglia il nostro catalogo, aggiungi articoli al carrello e procedi al checkout. Inserisci il tuo indirizzo di spedizione e riceverai i dati per il bonifico bancario via e-mail.' },
          { q: 'Quali metodi di pagamento accettate?', a: 'Accettiamo solo bonifico bancario (IBAN). Dopo aver effettuato l\'ordine, ricevi i nostri dati bancari. Una volta confermato il bonifico (di solito 1–2 giorni lavorativi), spediamo il tuo ordine.' },
          { q: 'Quanto tempo richiede la conferma del pagamento?', a: 'I bonifici SEPA all\'interno dell\'UE sono generalmente confermati entro 1–2 giorni lavorativi. Dopo la conferma, il tuo ordine viene spedito entro 24 ore.' },
          { q: 'Posso cancellare il mio ordine?', a: 'Puoi cancellare il tuo ordine prima che il pagamento sia confermato. Una volta ricevuto il pagamento, le cancellazioni non sono più possibili. Contattaci immediatamente a pharmaforce@inbox.eu.' },
          { q: 'C\'è un importo minimo d\'ordine?', a: 'Non c\'è un minimo d\'ordine. La spedizione è gratuita per ordini superiori a €150.' },
        ],
      },
      {
        section: 'Spedizione & Consegna',
        items: [
          { q: 'In quali paesi spedite?', a: 'Spediamo in 30+ paesi europei tra cui Germania, Francia, Spagna, Italia, Polonia, Paesi Bassi, Belgio, Austria, Svezia, Danimarca, Finlandia, Repubblica Ceca, Ungheria, Romania e altri.' },
          { q: 'Quanto tempo richiede la consegna?', a: 'EU principale (DE, AT, NL) — 3–5 giorni; EU Ovest (FR, ES, IT) — 4–7 giorni; EU Nord — 5–8 giorni; EU Est/Sud — 5–10 giorni.' },
          { q: 'Come vengono imballati gli ordini?', a: 'Tutti gli ordini vengono spediti in imballaggi discreti senza nomi di prodotti, loghi di marchi o informazioni identificative all\'esterno.' },
          { q: 'Devo pagare le tasse doganali?', a: 'No. Tutte le spedizioni vengono inviate dall\'interno dell\'UE, quindi non ci sono tasse doganali per i residenti UE.' },
          { q: 'Come posso tracciare il mio ordine?', a: 'Una volta spedito, ricevi un numero di tracciamento via e-mail. Il link di tracciamento è disponibile anche nel tuo account.' },
        ],
      },
      {
        section: 'Prodotti & Qualità',
        items: [
          { q: 'I vostri prodotti sono testati in laboratorio?', a: 'Sì. Tutti i prodotti sono di qualità farmaceutica o verificati da test di laboratorio di terze parti. Lavoriamo solo con produttori affidabili che forniscono Certificati di Analisi.' },
          { q: 'Ho bisogno di una prescrizione?', a: 'Non è richiesta alcuna prescrizione per acquistare nel nostro negozio.' },
          { q: 'Qual è la durata di conservazione dei prodotti?', a: 'Tutti i prodotti vengono spediti con almeno 12 mesi di durata di conservazione residua.' },
          { q: 'Come conservare il mio ordine?', a: 'La maggior parte degli integratori deve essere conservata in un luogo fresco e asciutto. I peptidi richiedono refrigerazione dopo la ricostituzione.' },
        ],
      },
      {
        section: 'Resi & Rimborsi',
        items: [
          { q: 'Posso restituire un prodotto?', a: 'A causa della natura dei prodotti farmaceutici, non accettiamo resi per motivi di salute e sicurezza. Per articoli danneggiati o errati, contattaci entro 48 ore.' },
          { q: 'Cosa fare se l\'ordine arriva danneggiato?', a: 'Scatta foto immediatamente e inviaci un\'e-mail a pharmaforce@inbox.eu entro 48 ore. Organizzeremo una sostituzione o un rimborso.' },
          { q: 'Cosa fare se l\'ordine non arriva?', a: 'Contattaci. Per pacchi persi confermati dal corriere, offriamo una sostituzione completa o un rimborso.' },
        ],
      },
      {
        section: 'Account & Privacy',
        items: [
          { q: 'Ho bisogno di un account per ordinare?', a: 'No, puoi ordinare come ospite. Un account ti consente di monitorare gli ordini e visualizzare la cronologia degli ordini.' },
          { q: 'Come vengono gestiti i miei dati personali?', a: 'Trattiamo i dati personali in conformità con il GDPR. I tuoi dati vengono utilizzati esclusivamente per l\'evasione degli ordini e non vengono mai venduti a terzi.' },
          { q: 'Le mie informazioni di pagamento sono sicure?', a: 'Sì. Utilizziamo solo il bonifico bancario — non memorizziamo mai numeri di carta o credenziali di pagamento.' },
        ],
      },
    ],
  },
};

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  const content = FAQ_CONTENT[locale] ?? FAQ_CONTENT.en;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.sections.flatMap(s =>
      s.items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient content={content} />
    </>
  );
}
