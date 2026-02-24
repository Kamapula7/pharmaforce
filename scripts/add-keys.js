const fs = require('fs');
const path = require('path');

const updates = {
  de: {
    nav_search: 'Produkte suchen...',
    home_shop: 'Nach Kategorie einkaufen',
    about_title: '\u00dcber PharmaForce',
    about_subtitle: 'PharmaForce ist ein europ\u00e4ischer Anbieter professioneller Sportpharmakologie, Nahrungserg\u00e4nzungsmittel und Vitamine. Unsere Mission ist es, jedem Athleten Zugang zu pharmazeutischen Leistungsprodukten zu verschaffen.',
    about_labCertTitle: 'Laborgepr\u00fcft',
    about_labCertDesc: 'Jede Charge wird von unabh\u00e4ngigen europ\u00e4ischen Laboratorien auf Reinheit, Potenz und Sicherheit getestet.',
    about_shippingTitle: 'Europ\u00e4ischer Versand',
    about_shippingDesc: 'Schnelle, diskrete Lieferung in 30+ EU- und EWR-L\u00e4nder. Typische Lieferzeit: 3\u20137 Werktage.',
    about_qualityTitle: 'Profi-Qualit\u00e4t',
    about_qualityDesc: 'Wir beziehen direkt von zertifizierten Herstellern und gew\u00e4hrleisten pharmazeutische Standards.',
    about_athletesTitle: '2.400+ Athleten',
    about_athletesDesc: 'Vertraut von Wettkampfathleten, Bodybuildern und Fitnessenthusiasten in ganz Europa.',
    about_commitmentTitle: 'Unser Versprechen',
    about_commitmentText: 'Alle bei PharmaForce verkauften Produkte entsprechen den EU-Vorschriften f\u00fcr Nahrungserg\u00e4nzungsmittel und Sportern\u00e4hrung. Wir sind vollst\u00e4ndig DSGVO-konform und verpflichten uns zu transparenten Gesch\u00e4ftspraktiken.',
    blog_back: 'Zur\u00fcck zum Blog',
    blog_writtenBy: 'Geschrieben von',
    blog_allArticles: 'Alle Artikel',
    blog_by: 'Von',
    prod_noProd: 'Keine Produkte gefunden',
    prod_clear: 'Filter zur\u00fccksetzen',
    prod_price: 'Preis, \u20ac',
    prod_0_20: 'Bis \u20ac20',
    prod_20_40: '\u20ac20 \u2013 \u20ac40',
    prod_40_60: '\u20ac40 \u2013 \u20ac60',
    prod_60plus: '\u00dcber \u20ac60',
  },
  fr: {
    nav_search: 'Rechercher des produits...',
    home_shop: 'Acheter par cat\u00e9gorie',
    about_title: '\u00c0 propos de PharmaForce',
    about_subtitle: 'PharmaForce est un fournisseur europ\u00e9en de pharmacologie sportive professionnelle, compl\u00e9ments alimentaires et vitamines. Notre mission est de donner \u00e0 chaque athl\u00e8te acc\u00e8s \u00e0 des produits de performance pharmaceutiques.',
    about_labCertTitle: 'Certifi\u00e9 en laboratoire',
    about_labCertDesc: 'Chaque lot est test\u00e9 pour la puret\u00e9, la puissance et la s\u00e9curit\u00e9 par des laboratoires europ\u00e9ens ind\u00e9pendants.',
    about_shippingTitle: 'Livraison pan-europ\u00e9enne',
    about_shippingDesc: 'Livraison rapide et discr\u00e8te dans 30+ pays de l\'UE et de l\'EEE. D\u00e9lai typique\u00a0: 3\u20137 jours ouvr\u00e9s.',
    about_qualityTitle: 'Qualit\u00e9 professionnelle',
    about_qualityDesc: 'Nous nous approvisionnons directement aupr\u00e8s de fabricants certifi\u00e9s, garantissant des normes pharmaceutiques.',
    about_athletesTitle: '2\u00a0400+ athl\u00e8tes',
    about_athletesDesc: 'Approuv\u00e9 par des athl\u00e8tes comp\u00e9titifs, bodybuilders et passionn\u00e9s de fitness dans toute l\'Europe.',
    about_commitmentTitle: 'Notre engagement',
    about_commitmentText: 'Tous les produits vendus via PharmaForce respectent les r\u00e9glementations de l\'UE sur les compl\u00e9ments alimentaires. Nous sommes enti\u00e8rement conformes au RGPD et engag\u00e9s envers des pratiques commerciales transparentes.',
    blog_back: 'Retour au Blog',
    blog_writtenBy: '\u00c9crit par',
    blog_allArticles: 'Tous les articles',
    blog_by: 'Par',
    prod_noProd: 'Aucun produit trouv\u00e9',
    prod_clear: 'Effacer les filtres',
    prod_price: 'Prix, \u20ac',
    prod_0_20: "Jusqu'\u00e0 \u20ac20",
    prod_20_40: '\u20ac20 \u2013 \u20ac40',
    prod_40_60: '\u20ac40 \u2013 \u20ac60',
    prod_60plus: 'Plus de \u20ac60',
  },
  pl: {
    nav_search: 'Szukaj produkt\u00f3w...',
    home_shop: 'Kup wed\u0142ug kategorii',
    about_title: 'O PharmaForce',
    about_subtitle: 'PharmaForce to europejski dostawca profesjonalnej farmakologii sportowej, suplement\u00f3w diety i witamin. Nasz\u0105 misj\u0105 jest zapewnienie ka\u017cdemu sportowcowi dost\u0119pu do farmaceutycznych produkt\u00f3w wydajno\u015bciowych.',
    about_labCertTitle: 'Certyfikat laboratoryjny',
    about_labCertDesc: 'Ka\u017cda partia testowana pod k\u0105tem czysto\u015bci, si\u0142y i bezpiecze\u0144stwa przez niezale\u017cne europejskie laboratoria.',
    about_shippingTitle: 'Wysy\u0142ka og\u00f3lnoeuropejska',
    about_shippingDesc: 'Szybka, dyskretna dostawa do 30+ kraj\u00f3w UE i EOG. Typowy czas dostawy: 3\u20137 dni roboczych.',
    about_qualityTitle: 'Jako\u015b\u0107 profesjonalna',
    about_qualityDesc: 'Zaopatrujemy si\u0119 bezpo\u015brednio u certyfikowanych producent\u00f3w, zapewniaj\u0105c standardy farmaceutyczne.',
    about_athletesTitle: '2\u00a0400+ sportowc\u00f3w',
    about_athletesDesc: 'Zaufany przez sportowc\u00f3w wyczynowych, kulturyst\u00f3w i mi\u0142o\u015bnik\u00f3w fitness w ca\u0142ej Europie.',
    about_commitmentTitle: 'Nasze zobowi\u0105zanie',
    about_commitmentText: 'Wszystkie produkty sprzedawane przez PharmaForce s\u0105 zgodne z przepisami UE dotycz\u0105cymi suplement\u00f3w diety i \u017cywno\u015bci sportowej. Jeste\u015bmy w pe\u0142ni zgodni z RODO i zaanga\u017cowani w przejrzyste praktyki biznesowe.',
    blog_back: 'Powr\u00f3t do Bloga',
    blog_writtenBy: 'Napisa\u0142(a)',
    blog_allArticles: 'Wszystkie artyku\u0142y',
    blog_by: 'Autor',
    prod_noProd: 'Nie znaleziono produkt\u00f3w',
    prod_clear: 'Wyczy\u015b\u0107 filtry',
    prod_price: 'Cena, \u20ac',
    prod_0_20: 'Do \u20ac20',
    prod_20_40: '\u20ac20 \u2013 \u20ac40',
    prod_40_60: '\u20ac40 \u2013 \u20ac60',
    prod_60plus: 'Powy\u017cej \u20ac60',
  },
  it: {
    nav_search: 'Cerca prodotti...',
    home_shop: 'Acquista per categoria',
    about_title: 'Chi siamo \u2014 PharmaForce',
    about_subtitle: 'PharmaForce \u00e8 un fornitore europeo di farmacologia sportiva professionale, integratori e vitamine. La nostra missione \u00e8 dare a ogni atleta accesso a prodotti di performance farmaceutici.',
    about_labCertTitle: 'Certificato in laboratorio',
    about_labCertDesc: 'Ogni lotto \u00e8 testato per purezza, potenza e sicurezza da laboratori europei indipendenti.',
    about_shippingTitle: 'Spedizione pan-europea',
    about_shippingDesc: 'Consegna rapida e discreta in 30+ paesi UE e SEE. Tempi tipici: 3\u20137 giorni lavorativi.',
    about_qualityTitle: 'Qualit\u00e0 professionale',
    about_qualityDesc: 'Ci riforniamo direttamente da produttori certificati, garantendo standard farmaceutici.',
    about_athletesTitle: '2.400+ atleti',
    about_athletesDesc: 'Scelto da atleti agonisti, bodybuilder e appassionati di fitness in tutta Europa.',
    about_commitmentTitle: 'Il nostro impegno',
    about_commitmentText: 'Tutti i prodotti venduti tramite PharmaForce rispettano le normative UE per gli integratori alimentari. Siamo pienamente conformi al GDPR e impegnati in pratiche commerciali trasparenti.',
    blog_back: 'Torna al Blog',
    blog_writtenBy: 'Scritto da',
    blog_allArticles: 'Tutti gli articoli',
    blog_by: 'Di',
    prod_noProd: 'Nessun prodotto trovato',
    prod_clear: 'Cancella filtri',
    prod_price: 'Prezzo, \u20ac',
    prod_0_20: 'Fino a \u20ac20',
    prod_20_40: '\u20ac20 \u2013 \u20ac40',
    prod_40_60: '\u20ac40 \u2013 \u20ac60',
    prod_60plus: 'Oltre \u20ac60',
  }
};

['de','fr','pl','it'].forEach(lang => {
  const file = path.join(__dirname, '../messages/' + lang + '.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const a = updates[lang];
  data.nav.searchPlaceholder = a.nav_search;
  data.home.shopByCategory = a.home_shop;
  data.about = {
    title: a.about_title, subtitle: a.about_subtitle,
    labCertTitle: a.about_labCertTitle, labCertDesc: a.about_labCertDesc,
    shippingTitle: a.about_shippingTitle, shippingDesc: a.about_shippingDesc,
    qualityTitle: a.about_qualityTitle, qualityDesc: a.about_qualityDesc,
    athletesTitle: a.about_athletesTitle, athletesDesc: a.about_athletesDesc,
    commitmentTitle: a.about_commitmentTitle, commitmentText: a.about_commitmentText
  };
  data.blog.backToBlog = a.blog_back;
  data.blog.writtenBy = a.blog_writtenBy;
  data.blog.allArticles = a.blog_allArticles;
  data.blog.by = a.blog_by;
  data.products.noProductsFound = a.prod_noProd;
  data.products.clearFilters = a.prod_clear;
  data.products.priceFilter = a.prod_price;
  data.products['price0_20'] = a.prod_0_20;
  data.products['price20_40'] = a.prod_20_40;
  data.products['price40_60'] = a.prod_40_60;
  data.products['price60plus'] = a.prod_60plus;
  fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf8');
  console.log('Updated ' + lang + '.json');
});
