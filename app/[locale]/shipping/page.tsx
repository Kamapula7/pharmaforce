import type { Metadata } from 'next';
import { Truck, Clock, Globe, Package, AlertCircle, CheckCircle } from 'lucide-react';

interface ShippingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ShippingPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Shipping & Delivery — EU Shipping Information | PharmaForce',
    description: 'PharmaForce ships to 30+ European countries. Discreet packaging, flat rate €34.99 or free on orders over €150. Delivery in 3–8 business days.',
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/shipping`,
      languages: {
        'en': 'https://pharmaforce-store.com/en/shipping',
        'de': 'https://pharmaforce-store.com/de/shipping',
        'fr': 'https://pharmaforce-store.com/fr/shipping',
        'it': 'https://pharmaforce-store.com/it/shipping',
        'pl': 'https://pharmaforce-store.com/pl/shipping',
        'es': 'https://pharmaforce-store.com/es/shipping',
      },
    },
    openGraph: {
      title: 'Shipping & Delivery — EU Shipping Information | PharmaForce',
      description: 'PharmaForce ships to 30+ European countries. Discreet packaging, flat rate €34.99 or free on orders over €150.',
      url: `https://pharmaforce-store.com/${locale}/shipping`,
      siteName: 'PharmaForce',
      images: [{ url: 'https://pharmaforce-store.com/hero-athletes.png', width: 1200, height: 630, alt: 'PharmaForce Shipping' }],
      type: 'website',
    },
  };
}

type ShippingContent = {
  badge: string;
  title: string;
  subtitle: string;
  highlights: { label: string; sub: string }[];
  howItWorksTitle: string;
  steps: { step: string; title: string; desc: string }[];
  zonesTitle: string;
  zoneHeader: [string, string, string];
  zones: { zone: string; countries: string; time: string; cost: string; freeFrom: string }[];
  vatNote: string;
  trackingTitle: string;
  trackingDesc: string;
  customsTitle: string;
  customsDesc: string;
  questionsText: string;
  questionsAfter: string;
};

const CONTENT: Record<string, ShippingContent> = {
  en: {
    badge: 'Shipping & Delivery',
    title: 'Shipping Information',
    subtitle: 'We ship across 30+ European countries. All orders are packed discreetly with no product names on the outside.',
    highlights: [
      { label: 'Free from €150', sub: 'Free EU shipping' },
      { label: 'Discreet packing', sub: 'No product labels outside' },
      { label: '30+ countries', sub: 'Pan-European delivery' },
      { label: '9–18 business days', sub: 'Depending on country' },
    ],
    howItWorksTitle: 'How it works',
    steps: [
      { step: '1', title: 'Place your order', desc: 'Fill out the checkout form with your shipping address and receive bank transfer details by email.' },
      { step: '2', title: 'Make payment', desc: 'Transfer the payment to our bank account (IBAN). Use your order number as reference.' },
      { step: '3', title: 'Order processing', desc: 'After payment confirmation (1–2 business days), we pack and ship your order discreetly.' },
      { step: '4', title: 'Delivery', desc: 'You receive your tracking number by email. Packages are delivered to your door.' },
    ],
    zonesTitle: 'Delivery zones & prices',
    zoneHeader: ['Zone / Countries', 'Delivery time', 'Cost'],
    zones: [
      { zone: 'Zone 1 — Core EU', countries: 'Germany, Austria, Netherlands, Belgium, Luxembourg', time: '9–12 business days', cost: '€34.99', freeFrom: '€150' },
      { zone: 'Zone 2 — EU West', countries: 'France, Spain, Portugal, Italy', time: '10–14 business days', cost: '€34.99', freeFrom: '€150' },
      { zone: 'Zone 3 — EU North', countries: 'Sweden, Denmark, Finland, Norway', time: '11–15 business days', cost: '€34.99', freeFrom: '€150' },
      { zone: 'Zone 4 — EU East & South', countries: 'Poland, Czech Republic, Hungary, Romania, Bulgaria, Croatia, Slovakia, Slovenia, Greece', time: '12–16 business days', cost: '€34.99', freeFrom: '€150' },
      { zone: 'Zone 5 — Baltics & Rest of EU', countries: 'Estonia, Latvia, Lithuania, Ireland, Malta, Cyprus', time: '14–18 business days', cost: '€34.99', freeFrom: '€150' },
    ],
    vatNote: '* Flat rate €34.99 shipping. Free shipping on orders over €150.',
    trackingTitle: 'Order tracking',
    trackingDesc: 'Once your order is shipped, you will receive a tracking number by email. You can track your parcel directly on the carrier\'s website.',
    customsTitle: 'Customs & packaging',
    customsDesc: 'All shipments are sent from within the EU — no customs fees for EU residents. Packages are plain, discreet boxes with no product names or brand logos on the outside.',
    questionsText: 'Have more questions?',
    questionsAfter: '— we typically respond within 2–6 hours on business days.',
  },
  de: {
    badge: 'Versand & Lieferung',
    title: 'Versandinformationen',
    subtitle: 'Wir versenden in 30+ europäische Länder. Alle Bestellungen werden diskret verpackt, ohne Produktnamen auf der Außenseite.',
    highlights: [
      { label: 'Kostenlos ab €150', sub: 'Kostenloser EU-Versand' },
      { label: 'Diskrete Verpackung', sub: 'Keine Produktetiketten außen' },
      { label: '30+ Länder', sub: 'Europaweite Lieferung' },
      { label: '9–18 Werktage', sub: 'Je nach Land' },
    ],
    howItWorksTitle: 'So funktioniert es',
    steps: [
      { step: '1', title: 'Bestellung aufgeben', desc: 'Füllen Sie das Checkout-Formular mit Ihrer Lieferadresse aus und erhalten Sie Banküberweisung-Details per E-Mail.' },
      { step: '2', title: 'Zahlung leisten', desc: 'Überweisen Sie den Betrag auf unser Bankkonto (IBAN). Verwenden Sie Ihre Bestellnummer als Referenz.' },
      { step: '3', title: 'Bearbeitung', desc: 'Nach Zahlungsbestätigung (1–2 Werktage) verpacken und versenden wir Ihre Bestellung diskret.' },
      { step: '4', title: 'Lieferung', desc: 'Sie erhalten Ihre Sendungsnummer per E-Mail. Pakete werden an Ihre Tür geliefert.' },
    ],
    zonesTitle: 'Lieferzonen & Preise',
    zoneHeader: ['Zone / Länder', 'Lieferzeit', 'Kosten'],
    zones: [
      { zone: 'Zone 1 — Kern-EU', countries: 'Deutschland, Österreich, Niederlande, Belgien, Luxemburg', time: '9–12 Werktage', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zone 2 — EU West', countries: 'Frankreich, Spanien, Portugal, Italien', time: '10–14 Werktage', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zone 3 — EU Nord', countries: 'Schweden, Dänemark, Finnland, Norwegen', time: '11–15 Werktage', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zone 4 — EU Ost & Süd', countries: 'Polen, Tschechien, Ungarn, Rumänien, Bulgarien, Kroatien, Slowakei, Slowenien, Griechenland', time: '12–16 Werktage', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zone 5 — Baltikum & Rest-EU', countries: 'Estland, Lettland, Litauen, Irland, Malta, Zypern', time: '14–18 Werktage', cost: '€34,99', freeFrom: '€150' },
    ],
    vatNote: '* Pauschale Versandkosten €34,99. Kostenloser Versand ab €150 Bestellwert.',
    trackingTitle: 'Sendungsverfolgung',
    trackingDesc: 'Sobald Ihre Bestellung versandt wird, erhalten Sie eine Sendungsnummer per E-Mail. Sie können Ihr Paket direkt auf der Website des Transporteurs verfolgen.',
    customsTitle: 'Zoll & Verpackung',
    customsDesc: 'Alle Sendungen werden aus der EU versendet — keine Zollgebühren für EU-Einwohner. Pakete sind schlichte, diskrete Kartons ohne Produktnamen oder Markenlogos außen.',
    questionsText: 'Haben Sie weitere Fragen?',
    questionsAfter: '— wir antworten in der Regel innerhalb von 2–6 Stunden an Werktagen.',
  },
  fr: {
    badge: 'Expédition & Livraison',
    title: 'Informations de livraison',
    subtitle: 'Nous expédions dans 30+ pays européens. Toutes les commandes sont emballées discrètement sans noms de produits à l\'extérieur.',
    highlights: [
      { label: 'Gratuit dès €150', sub: 'Livraison EU gratuite' },
      { label: 'Emballage discret', sub: 'Aucune étiquette produit' },
      { label: '30+ pays', sub: 'Livraison pan-européenne' },
      { label: '9–18 jours ouvrables', sub: 'Selon le pays' },
    ],
    howItWorksTitle: 'Comment ça marche',
    steps: [
      { step: '1', title: 'Passer commande', desc: 'Remplissez le formulaire de commande avec votre adresse de livraison et recevez les coordonnées bancaires par e-mail.' },
      { step: '2', title: 'Effectuer le paiement', desc: 'Transférez le paiement sur notre compte bancaire (IBAN). Utilisez votre numéro de commande comme référence.' },
      { step: '3', title: 'Traitement', desc: 'Après confirmation du paiement (1–2 jours ouvrables), nous emballons et expédions votre commande discrètement.' },
      { step: '4', title: 'Livraison', desc: 'Vous recevez votre numéro de suivi par e-mail. Les colis sont livrés à votre porte.' },
    ],
    zonesTitle: 'Zones de livraison & tarifs',
    zoneHeader: ['Zone / Pays', 'Délai de livraison', 'Coût'],
    zones: [
      { zone: 'Zone 1 — EU principale', countries: 'Allemagne, Autriche, Pays-Bas, Belgique, Luxembourg', time: '9–12 jours ouvrables', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zone 2 — EU Ouest', countries: 'France, Espagne, Portugal, Italie', time: '10–14 jours ouvrables', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zone 3 — EU Nord', countries: 'Suède, Danemark, Finlande, Norvège', time: '11–15 jours ouvrables', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zone 4 — EU Est & Sud', countries: 'Pologne, République tchèque, Hongrie, Roumanie, Bulgarie, Croatie, Slovaquie, Slovénie, Grèce', time: '12–16 jours ouvrables', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zone 5 — Pays Baltes & reste EU', countries: 'Estonie, Lettonie, Lituanie, Irlande, Malte, Chypre', time: '14–18 jours ouvrables', cost: '€34,99', freeFrom: '€150' },
    ],
    vatNote: '* Frais de port forfaitaires €34,99. Livraison gratuite pour les commandes de plus de €150.',
    trackingTitle: 'Suivi de commande',
    trackingDesc: 'Une fois votre commande expédiée, vous recevrez un numéro de suivi par e-mail. Vous pouvez suivre votre colis directement sur le site du transporteur.',
    customsTitle: 'Douane & emballage',
    customsDesc: 'Tous les envois sont expédiés depuis l\'UE — pas de frais de douane pour les résidents UE. Les colis sont des boîtes neutres et discrètes sans noms de produits ni logos de marque à l\'extérieur.',
    questionsText: 'D\'autres questions ?',
    questionsAfter: '— nous répondons généralement dans les 2–6 heures les jours ouvrables.',
  },
  pl: {
    badge: 'Wysyłka i Dostawa',
    title: 'Informacje o dostawie',
    subtitle: 'Wysyłamy do 30+ krajów europejskich. Wszystkie zamówienia są dyskretnie zapakowane bez nazw produktów na zewnątrz.',
    highlights: [
      { label: 'Gratis od €150', sub: 'Darmowa wysyłka EU' },
      { label: 'Dyskretne pakowanie', sub: 'Brak etykiet na zewnątrz' },
      { label: '30+ krajów', sub: 'Dostawa ogólnoeuropejska' },
      { label: '9–18 dni roboczych', sub: 'W zależności od kraju' },
    ],
    howItWorksTitle: 'Jak to działa',
    steps: [
      { step: '1', title: 'Złóż zamówienie', desc: 'Wypełnij formularz zamówienia z adresem dostawy i otrzymaj dane do przelewu bankowego na e-mail.' },
      { step: '2', title: 'Dokonaj płatności', desc: 'Przelej płatność na nasze konto bankowe (IBAN). Użyj numeru zamówienia jako tytułu przelewu.' },
      { step: '3', title: 'Realizacja zamówienia', desc: 'Po potwierdzeniu płatności (1–2 dni robocze) pakujemy i wysyłamy Twoje zamówienie dyskretnie.' },
      { step: '4', title: 'Dostawa', desc: 'Otrzymujesz numer śledzenia na e-mail. Paczki są dostarczane pod Twoje drzwi.' },
    ],
    zonesTitle: 'Strefy dostawy i ceny',
    zoneHeader: ['Strefa / Kraje', 'Czas dostawy', 'Koszt'],
    zones: [
      { zone: 'Strefa 1 — Główna EU', countries: 'Niemcy, Austria, Holandia, Belgia, Luksemburg', time: '9–12 dni roboczych', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Strefa 2 — EU Zachód', countries: 'Francja, Hiszpania, Portugalia, Włochy', time: '10–14 dni roboczych', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Strefa 3 — EU Północ', countries: 'Szwecja, Dania, Finlandia, Norwegia', time: '11–15 dni roboczych', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Strefa 4 — EU Wschód i Południe', countries: 'Polska, Czechy, Węgry, Rumunia, Bułgaria, Chorwacja, Słowacja, Słowenia, Grecja', time: '12–16 dni roboczych', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Strefa 5 — Kraje Bałtyckie i pozostałe EU', countries: 'Estonia, Łotwa, Litwa, Irlandia, Malta, Cypr', time: '14–18 dni roboczych', cost: '€34,99', freeFrom: '€150' },
    ],
    vatNote: '* Stała stawka za wysyłkę €34,99. Darmowa wysyłka przy zamówieniach powyżej €150.',
    trackingTitle: 'Śledzenie zamówienia',
    trackingDesc: 'Po wysłaniu zamówienia otrzymasz numer śledzenia na e-mail. Możesz śledzić swoją paczkę bezpośrednio na stronie przewoźnika.',
    customsTitle: 'Cło i pakowanie',
    customsDesc: 'Wszystkie przesyłki są wysyłane z EU — brak opłat celnych dla mieszkańców EU. Paczki to zwykłe, dyskretne pudełka bez nazw produktów ani logo marki na zewnątrz.',
    questionsText: 'Masz więcej pytań?',
    questionsAfter: '— zazwyczaj odpowiadamy w ciągu 2–6 godzin w dni robocze.',
  },
  it: {
    badge: 'Spedizione e Consegna',
    title: 'Informazioni sulla spedizione',
    subtitle: 'Spediamo in 30+ paesi europei. Tutti gli ordini sono confezionati in modo discreto senza nomi di prodotti all\'esterno.',
    highlights: [
      { label: 'Gratis da €150', sub: 'Spedizione EU gratuita' },
      { label: 'Imballaggio discreto', sub: 'Nessuna etichetta prodotto' },
      { label: '30+ paesi', sub: 'Consegna pan-europea' },
      { label: '9–18 giorni lavorativi', sub: 'A seconda del paese' },
    ],
    howItWorksTitle: 'Come funziona',
    steps: [
      { step: '1', title: 'Effettua l\'ordine', desc: 'Compila il modulo di checkout con il tuo indirizzo di spedizione e ricevi i dati per il bonifico bancario via e-mail.' },
      { step: '2', title: 'Effettua il pagamento', desc: 'Trasferisci il pagamento sul nostro conto bancario (IBAN). Usa il numero d\'ordine come riferimento.' },
      { step: '3', title: 'Elaborazione ordine', desc: 'Dopo la conferma del pagamento (1–2 giorni lavorativi), imballiamo e spediamo il tuo ordine discretamente.' },
      { step: '4', title: 'Consegna', desc: 'Ricevi il numero di tracciamento via e-mail. I pacchi vengono consegnati alla tua porta.' },
    ],
    zonesTitle: 'Zone di consegna e prezzi',
    zoneHeader: ['Zona / Paesi', 'Tempi di consegna', 'Costo'],
    zones: [
      { zone: 'Zona 1 — EU principale', countries: 'Germania, Austria, Paesi Bassi, Belgio, Lussemburgo', time: '9–12 giorni lavorativi', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zona 2 — EU Ovest', countries: 'Francia, Spagna, Portogallo, Italia', time: '10–14 giorni lavorativi', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zona 3 — EU Nord', countries: 'Svezia, Danimarca, Finlandia, Norvegia', time: '11–15 giorni lavorativi', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zona 4 — EU Est e Sud', countries: 'Polonia, Repubblica Ceca, Ungheria, Romania, Bulgaria, Croazia, Slovacchia, Slovenia, Grecia', time: '12–16 giorni lavorativi', cost: '€34,99', freeFrom: '€150' },
      { zone: 'Zona 5 — Paesi Baltici e resto EU', countries: 'Estonia, Lettonia, Lituania, Irlanda, Malta, Cipro', time: '14–18 giorni lavorativi', cost: '€34,99', freeFrom: '€150' },
    ],
    vatNote: '* Tariffa fissa di spedizione €34,99. Spedizione gratuita per ordini superiori a €150.',
    trackingTitle: 'Tracciamento ordine',
    trackingDesc: 'Una volta spedito il tuo ordine, riceverai un numero di tracciamento via e-mail. Puoi tracciare il tuo pacco direttamente sul sito del corriere.',
    customsTitle: 'Dogana e imballaggio',
    customsDesc: 'Tutte le spedizioni vengono inviate dall\'interno dell\'UE — nessuna tassa doganale per i residenti UE. I pacchi sono scatole semplici e discrete senza nomi di prodotti o loghi di marchi all\'esterno.',
    questionsText: 'Hai altre domande?',
    questionsAfter: '— rispondiamo generalmente entro 2–6 ore nei giorni lavorativi.',
  },
};

export default async function ShippingPage({ params }: ShippingPageProps) {
  const { locale } = await params;
  const c = CONTENT[locale] ?? CONTENT.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">{c.badge}</p>
        <h1 className="text-4xl font-black text-white mb-3">{c.title}</h1>
        <p className="text-muted text-base leading-relaxed max-w-2xl">{c.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[Truck, Package, Globe, Clock].map((Icon, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Icon className="w-5 h-5 text-brand" />
            </div>
            <p className="text-white font-semibold text-sm">{c.highlights[i].label}</p>
            <p className="text-muted text-xs mt-0.5">{c.highlights[i].sub}</p>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">{c.howItWorksTitle}</h2>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />
          <div className="space-y-6">
            {c.steps.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-dark font-black text-sm shrink-0 relative z-10">
                  {s.step}
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 flex-1">
                  <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">{c.zonesTitle}</h2>
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 px-4 py-3 border-b border-border text-xs text-muted font-semibold uppercase tracking-wider">
            <span className="col-span-2">{c.zoneHeader[0]}</span>
            <span>{c.zoneHeader[1]}</span>
            <span>{c.zoneHeader[2]}</span>
          </div>
          {c.zones.map((zone, i) => (
            <div key={zone.zone} className={`grid grid-cols-4 px-4 py-4 gap-2 ${i < c.zones.length - 1 ? 'border-b border-border' : ''}`}>
              <div className="col-span-2">
                <p className="text-white text-sm font-medium">{zone.zone}</p>
                <p className="text-muted text-xs mt-0.5">{zone.countries}</p>
              </div>
              <div className="flex items-center">
                <span className="text-white text-sm">{zone.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white text-sm font-semibold">{zone.cost}</span>
                <span className="text-muted text-xs">· free from {zone.freeFrom}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-muted text-xs mt-3">{c.vatNote}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            {c.trackingTitle}
          </h3>
          <p className="text-muted text-sm leading-relaxed">{c.trackingDesc}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-brand" />
            {c.customsTitle}
          </h3>
          <p className="text-muted text-sm leading-relaxed">{c.customsDesc}</p>
        </div>
      </div>

      <div className="bg-brand/5 border border-brand/20 rounded-xl p-6">
        <p className="text-white/80 text-sm leading-relaxed">
          {c.questionsText}{' '}
          <a href="mailto:pharmaforce@inbox.eu" className="text-brand font-semibold hover:underline">
            pharmaforce@inbox.eu
          </a>
          {' '}{c.questionsAfter}
        </p>
      </div>
    </div>
  );
}
