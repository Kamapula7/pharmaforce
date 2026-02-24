const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../lib/blog-translations.ts');
let content = fs.readFileSync(file, 'utf8');

const plEntry = `
    'creatine-vs-beta-alanine': {
      title: 'Kreatyna vs. Beta-Alanina\u00a0: Co wybra\u0107?',
      excerpt: 'Kreatyna zwi\u0119ksza si\u0142\u0119 eksplozywn\u0105, a beta-alanina zwalcza zm\u0119czenie mi\u0119\u015bni. Jednak ich po\u0142\u0105czenie mo\u017ce by\u0107 prawdziwym boosterem wydajno\u015bci \u2014 oto nauka stoj\u0105ca za tym.',
      sections: [
        { heading: 'Jak dzia\u0142a kreatyna', body: 'Fosforan kreatyny jest g\u0142\u00f3wnym paliwem do regeneracji ATP podczas maksymalnych wysi\u0142k\u00f3w trwaj\u0105cych 1\u201310 sekund. Nasycaj\u0105c mi\u0119\u015bnie kreaty\u0144 (faza \u0142adowania: 20\u00a0g/dzie\u0144 przez 5 dni, nast\u0119pnie 3\u20135\u00a0g/dzie\u0144 podtrzymania) wyd\u0142u\u017casz okno fosfokreatynowe o ok. 10\u201315\u00a0%. Praktyczny efekt: 1\u20132 dodatkowe powt\u00f3rzenia przy ci\u0119\u017ckich \u0107wiczeniach z\u0142o\u017conych i szybsza regeneracja mi\u0119dzy seriami.' },
        { heading: 'Jak dzia\u0142a beta-alanina', body: 'Beta-alanina jest prekursorem karnozy\u0144y \u2014 dipeptydu buforuj\u0105cego jony wodoru (H+) w tkance mi\u0119\u015bniowej. Wi\u0119cej karnozy\u0144y\u00a0= wi\u0119ksza pojemno\u015b\u0107 buforowa\u0148ia\u00a0= wi\u0119cej powt\u00f3rze\u0144 przed pora\u017ck\u0105. Skuteczna dawka: 3,2\u20136,4\u00a0g/dzie\u0144.' },
        { heading: 'Kiedy u\u017cywa\u0107 kreatyny, a kiedy beta-alaniny', body: 'Kreatyna dominuje w sportach si\u0142owych: powerlifting, sprint, podnoszenie ci\u0119\u017car\u00f3w. Beta-alanina sprawdza si\u0119 w zakresie 1\u20134 minut: biegi 400\u20131500\u00a0m, CrossFit, kulturystyka z wysok\u0105 liczb\u0105 powt\u00f3rze\u0144. Je\u015bli tw\u00f3j sport \u0142\u0105czy kr\u00f3tkie wysi\u0142ki eksplozywne z d\u0142ugimi intensywnymi interwa\u0142ami, np. pi\u0142ka no\u017cna, rugby, MMA \u2014 stosowanie obu suplement\u00f3w ma sens.' },
        { heading: 'Stack: dlaczego kombinacja dzia\u0142a', body: 'Kreatyna i beta-alanina celuj\u0105 w zupe\u0142nie r\u00f3\u017cne mechanizmy zm\u0119czenia, co czyni je w pe\u0142ni komplementarnymi. 10-tygodniowe randomizowane badanie kontrolowane wykaza\u0142o, \u017ce grupa kreatyna + beta-alanina zyska\u0142a znacznie wi\u0119cej masy mi\u0119\u015bniowej i straci\u0142a wi\u0119cej t\u0142uszczu ni\u017c ka\u017cdy suplement osobno.' },
      ],
    },

`;

const itEntry = `
    'creatine-vs-beta-alanine': {
      title: 'Creatina vs. Beta-Alanina\u00a0: quale scegliere?',
      excerpt: 'La creatina potenzia la forza esplosiva, la beta-alanina combatte la fatica muscolare. Ma combinarle potrebbe essere il vero acceleratore di performance \u2014 ecco la scienza.',
      sections: [
        { heading: 'Come funziona la creatina', body: 'Il fosfocreatina \u00e8 il principale carburante per la rigenerazione dell\u2019ATP durante sforzi massimali di 1\u201310 secondi. Saturando i muscoli di creatina (fase di carico: 20\u00a0g/giorno per 5 giorni, poi 3\u20135\u00a0g/giorno di mantenimento) si prolunga la finestra fosfocreatina di circa il 10\u201315\u00a0%. Risultato pratico: 1\u20132 ripetizioni extra sugli esercizi composti pesanti e recupero pi\u00f9 rapido tra le serie.' },
        { heading: 'Come funziona la beta-alanina', body: 'La beta-alanina \u00e8 il precursore limitante della carnosina \u2014 un dipeptide che tampona gli ioni idrogeno (H+) nel tessuto muscolare. Pi\u00f9 carnosina\u00a0= maggiore capacit\u00e0 tampone\u00a0= pi\u00f9 ripetizioni prima dell\u2019esaurimento. Dose efficace: 3,2\u20136,4\u00a0g/giorno.' },
        { heading: 'Quando usare creatina vs beta-alanina', body: 'La creatina domina negli sport di forza: powerlifting, sprint, sollevamento pesi. La beta-alanina eccelle nell\u2019intervallo 1\u20134 minuti: 400\u20131500\u00a0m, CrossFit, culturismo ad alto numero di ripetizioni. Se il tuo sport combina sforzi esplosivi brevi e intervalli intensi prolungati \u2014 calcio, rugby, MMA \u2014 lo stack di entrambi ha senso.' },
        { heading: 'Lo stack: perch\u00e9 la combinazione funziona', body: 'Creatina e beta-alanina agiscono su meccanismi di affaticamento completamente diversi, rendendole pienamente complementari. Uno studio randomizzato controllato di 10 settimane ha dimostrato che il gruppo creatina + beta-alanina ha guadagnato significativamente pi\u00f9 massa muscolare e perso pi\u00f9 grasso rispetto a ciascun integratore da solo.' },
      ],
    },

`;

// Insert PL entry: find the pl: section and insert after first entry
const plSectionStart = content.indexOf('\n  pl: {');
const itSectionStart = content.indexOf('\n  it: {');
const plFirstEntryEnd = content.indexOf('\n\n    \'', plSectionStart + 100);
content = content.slice(0, plFirstEntryEnd) + '\n' + plEntry + content.slice(plFirstEntryEnd);

// Recalculate it section position after insertion
const itSectionStart2 = content.indexOf('\n  it: {');
const itFirstEntryEnd = content.indexOf('\n\n    \'', itSectionStart2 + 100);
content = content.slice(0, itFirstEntryEnd) + '\n' + itEntry + content.slice(itFirstEntryEnd);

fs.writeFileSync(file, content, 'utf8');
console.log('Added creatine-vs-beta-alanine to PL and IT');
