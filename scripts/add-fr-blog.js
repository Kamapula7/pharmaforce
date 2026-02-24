const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../lib/blog-translations.ts');
let content = fs.readFileSync(file, 'utf8');

const frEntries = `
    'creatine-vs-beta-alanine': {
      title: 'Cr\u00e9atine vs. B\u00eata-Alanine\u00a0: Que choisir pour vos objectifs\u00a0?',
      excerpt: 'La cr\u00e9atine booste la force explosive\u00a0; la b\u00eata-alanine combat la fatigue musculaire. Mais les combiner pourrait \u00eatre le v\u00e9ritable acc\u00e9l\u00e9rateur de performance \u2014 voici la science.',
      sections: [
        { heading: 'Comment fonctionne la cr\u00e9atine', body: 'Le phosphocr\u00e9atine est le principal carburant pour la reg\u00e9n\u00e9ration d\u2019ATP lors d\u2019efforts maximaux de 1 \u00e0 10 secondes. En saturant les muscles en cr\u00e9atine (phase de charge\u00a0: 20\u00a0g/jour pendant 5 jours, puis 3\u20135\u00a0g/jour d\u2019entretien), vous prolongez la fen\u00eatre phosphocr\u00e9atine d\u2019environ 10\u201315\u00a0%. R\u00e9sultat pratique\u00a0: 1 \u00e0 2 r\u00e9p\u00e9titions suppl\u00e9mentaires aux exercices polyarticulaires lourds et une r\u00e9cup\u00e9ration plus rapide entre les s\u00e9ries.' },
        { heading: 'Comment fonctionne la b\u00eata-alanine', body: 'La b\u00eata-alanine est le pr\u00e9curseur limitant de la carnosine \u2014 un dipeptide qui tampon les ions hydrog\u00e8ne (H+) dans le tissu musculaire. Lors de s\u00e9ries \u00e0 haute r\u00e9p\u00e9tition ou d\u2019intervalles d\u2019endurance, l\u2019accumulation de H+ provoque la br\u00fblure qui vous force \u00e0 arr\u00eater. Plus de carnosine\u00a0= capacit\u00e9 tampon accrue\u00a0= plus de r\u00e9p\u00e9titions avant l\u2019\u00e9chec. Dose efficace\u00a0: 3,2\u20136,4\u00a0g/jour.' },
        { heading: 'Quand utiliser l\u2019un ou l\u2019autre', body: 'La cr\u00e9atine domine dans les sports de force\u00a0: powerlifting, sprint, halterophilie. La b\u00eata-alanine brille dans la plage 1\u20134 minutes\u00a0: 400\u2013800\u00a0m, CrossFit, musculation \u00e0 haute r\u00e9p\u00e9tition. Si votre sport m\u00eale efforts explosifs courts et intervalles intenses prolong\u00e9s \u2014 football, rugby, MMA \u2014 un stack des deux suppl\u00e9ments est clairement justifi\u00e9.' },
        { heading: 'Le stack\u00a0: pourquoi la combinaison fonctionne', body: 'La cr\u00e9atine et la b\u00eata-alanine ciblent des m\u00e9canismes de fatigue totalement distincts, ce qui les rend compl\u00e9mentaires. Une \u00e9tude randomis\u00e9e de 10 semaines a montr\u00e9 que le groupe cr\u00e9atine + b\u00eata-alanine gagnait nettement plus de masse musculaire et perdait plus de graisse que chaque suppl\u00e9ment pris seul.' },
      ],
    },

    'vitamin-d3-athletes-guide': {
      title: 'Pourquoi chaque athl\u00e8te a besoin de Vitamine D3',
      excerpt: 'Plus de 60\u00a0% des Europ\u00e9ens souffrent de carence en vitamine D. Un taux de D3 bas r\u00e9duit directement la testost\u00e9rone, la vitesse de r\u00e9cup\u00e9ration et les d\u00e9fenses immunitaires. Voici comment le doser correctement.',
      sections: [
        { heading: 'La carence en vitamine D chez les athl\u00e8tes europ\u00e9ens', body: 'Une \u00e9tude publi\u00e9e dans le British Journal of Sports Medicine a r\u00e9v\u00e9l\u00e9 que 57\u00a0% des athl\u00e8tes professionnels en Europe du Nord et centrale avaient des taux s\u00e9riques de 25(OH)D inf\u00e9rieurs \u00e0 30\u00a0ng/ml. En hiver (octobre\u2013mars), le rayonnement UVB au-del\u00e0 du 50e parall\u00e8le est insuffisant pour la synth\u00e8se cutan\u00e9e de vitamine D.' },
        { heading: 'Comment la D3 impacte la performance', body: 'Les r\u00e9cepteurs de vitamine D (VDR) se trouvent dans le tissu musculaire, les os et les testicules. Une carence en dessous de 20\u00a0ng/ml est associ\u00e9e \u00e0\u00a0: une synth\u00e8se prot\u00e9ique musculaire r\u00e9duite, une baisse de 10\u201315\u00a0% de la production de testost\u00e9rone, une absorption calcique alt\u00e9r\u00e9e et une r\u00e9ponse immunitaire ralentie.' },
        { heading: 'Protocole de dosage correct', body: 'Si vous ne supplementez pas encore\u00a0: commencez par 4\u00a0000\u20135\u00a0000 UI/jour pendant 8 semaines, puis 2\u00a0000\u20133\u00a0000 UI/jour en entretien. Id\u00e9alement, testez votre taux s\u00e9rique avant et apr\u00e8s 12 semaines. Objectif\u00a0: 40\u201360\u00a0ng/ml. Combinez avec la vitamine K2 (MK-7, 100\u2013200 mcg/jour).' },
      ],
    },

    'pre-workout-timing-guide': {
      title: 'Timing du pr\u00e9-entra\u00eenement\u00a0: quand et combien prendre',
      excerpt: 'Prendre votre pr\u00e9-entra\u00eenement 20 minutes trop t\u00f4t (ou trop tard) peut en diviser l\u2019efficacit\u00e9 par deux. Nous expliquons la fen\u00eatre caf\u00e9ine optimale, la charge en b\u00eata-alanine et comment \u00e9viter le crash.',
      sections: [
        { heading: 'La fen\u00eatre pharmacocin\u00e9tique de la caf\u00e9ine', body: 'La caf\u00e9ine atteint sa concentration plasmatique maximale 30 \u00e0 60 minutes apr\u00e8s ingestion. Prise optimale\u00a0: 30\u201345 minutes avant l\u2019entra\u00eenement. Dose\u00a0: 3\u20136 mg/kg de poids corporel. Pour un athl\u00e8te de 80 kg\u00a0: 240\u2013480 mg. La plupart des pr\u00e9-entra\u00eenements commerciaux contiennent 150\u2013300 mg.' },
        { heading: 'Boosters d\u2019oxyde nitrique\u00a0: citrulline et arginine', body: 'La L-citrulline (pas l\u2019arginine) est le pr\u00e9curseur NO sup\u00e9rieur \u2014 elle contourne le m\u00e9tabolisme h\u00e9patique de premier passage et augmente les niveaux d\u2019arginine plus efficacement. Dose\u00a0: 6\u20138 g de citrulline-malate, 45\u201360 minutes avant l\u2019entra\u00eenement.' },
        { heading: 'Comment \u00e9viter le crash post-entra\u00eenement', body: 'Le crash post-caf\u00e9ine survient lorsque l\u2019ad\u00e9nosine accumul\u00e9e rebondit. Strat\u00e9gies\u00a0: utiliser la th\u00e9anine (200 mg avec la caf\u00e9ine) pour adoucir le pic et le creux\u00a0; manger un repas complet 60\u201390 minutes apr\u00e8s\u00a0; \u00e9viter une deuxi\u00e8me dose de caf\u00e9ine apr\u00e8s 14h.' },
        { heading: 'Protocole optimal recommand\u00e9', body: 'T-45 min\u00a0: L-citrulline 6\u20138 g. T-35 min\u00a0: pr\u00e9-entra\u00eenement complet (caf\u00e9ine + b\u00eata-alanine + cr\u00e9atine si inclus). T-0 min\u00a0: commencer l\u2019entra\u00eenement. Pendant\u00a0: eau + \u00e9lectrolytes. Post\u00a0: repas de r\u00e9cup\u00e9ration dans les 90 minutes.' },
      ],
    },

    'omega3-recovery-science': {
      title: 'Om\u00e9ga-3 et r\u00e9cup\u00e9ration musculaire\u00a0: le stack sous-estim\u00e9',
      excerpt: 'L\u2019huile de poisson est bien plus qu\u2019un suppl\u00e9ment cardiaque. Des \u00e9tudes montrent que 3\u00a0g/jour d\u2019EPA+DHA r\u00e9duisent les courbatures jusqu\u2019\u00e0 35\u00a0% et diminuent l\u2019inflammation syst\u00e9mique \u2014 un essentiel de la r\u00e9cup\u00e9ration.',
      sections: [
        { heading: 'EPA et DHA\u00a0: les acides gras cl\u00e9s', body: 'L\u2019EPA (acide eicosapentano\u00efque) et le DHA (acide docosahex\u00e9no\u00efque) sont les formes actives des om\u00e9ga-3 marins. L\u2019ALA des sources v\u00e9g\u00e9tales (lin, chia) se convertit en EPA+DHA \u00e0 moins de 5\u00a0%. La suppl\u00e9mentation directe est obligatoire pour atteindre des niveaux th\u00e9rapeutiques.' },
        { heading: 'Le m\u00e9canisme anti-inflammatoire', body: 'L\u2019EPA et le DHA inhibent la cycloox\u00e9g\u00e9nase (COX) et la lipox\u00e9g\u00e9nase (LOX) \u2014 les m\u00eames enzymes cibles des AINS. Ils constituent \u00e9galement des pr\u00e9curseurs des r\u00e9solvines et prot\u00e9ctines, des mol\u00e9cules r\u00e9solvant activement l\u2019inflammation. R\u00e9sultat\u00a0: r\u00e9duction de l\u2019inflammation induite par l\u2019exercice, courbatures diminu\u00e9es et r\u00e9cup\u00e9ration acc\u00e9l\u00e9r\u00e9e.' },
        { heading: 'Dosage et timing', body: 'Dose efficace\u00a0: 2\u20133 g d\u2019EPA+DHA combin\u00e9s par jour. Pas seulement la quantit\u00e9 d\u2019huile de poisson \u2014 v\u00e9rifiez les valeurs EPA+DHA sur l\u2019\u00e9tiquette. Prendre avec les repas pour une absorption maximale. Les effets sur la r\u00e9cup\u00e9ration deviennent perceptibles apr\u00e8s 3\u20134 semaines de suppl\u00e9mentation r\u00e9guli\u00e8re.' },
        { heading: 'Om\u00e9ga-3 et synth\u00e8se prot\u00e9ique', body: 'La recherche r\u00e9cente r\u00e9v\u00e8le que les om\u00e9ga-3 amplifient la r\u00e9ponse anabolique \u00e0 l\u2019insuline et aux acides amin\u00e9s. Une \u00e9tude de 2012 a montr\u00e9 qu\u2019une suppl\u00e9mentation en EPA+DHA augmentait la synth\u00e8se prot\u00e9ique musculaire de 50\u00a0% lors d\u2019une perfusion d\u2019insuline et d\u2019acides amin\u00e9s. Le stack om\u00e9ga-3 + prot\u00e9ine de lactos\u00e9rum est particuli\u00e8rement synergique.' },
      ],
    },

    'magnesium-sleep-gains': {
      title: 'Magn\u00e9sium glycinate\u00a0: le suppl\u00e9ment qui am\u00e9liore votre sommeil',
      excerpt: 'Plus de 70\u00a0% de l\u2019hormone de croissance est lib\u00e9r\u00e9e pendant le sommeil profond. Le magn\u00e9sium glycinate am\u00e9liore la qualit\u00e9 du sommeil, r\u00e9duit le cortisol et co\u00fbte moins de 0,30\u00a0\u20ac/jour.',
      sections: [
        { heading: 'Pourquoi le magn\u00e9sium est essentiel pour les sportifs', body: 'Le magn\u00e9sium est un cofacteur de plus de 300 r\u00e9actions enzymatiques, notamment la synth\u00e8se d\u2019ATP, la production de prot\u00e9ines et la fonction musculaire. Les athl\u00e8tes perdent 10\u201315\u00a0% de magn\u00e9sium suppl\u00e9mentaire par la sueur et les urines lors des s\u00e9ances intenses. La majorit\u00e9 des europ\u00e9ens ne consomment pas les 400\u2013420\u00a0mg/jour recommand\u00e9s.' },
        { heading: 'Formes de magn\u00e9sium et biodisponibilit\u00e9', body: 'L\u2019oxyde de magn\u00e9sium (le moins cher) a une biodisponibilit\u00e9 de seulement 4\u00a0%. Le glycinate est li\u00e9 \u00e0 la glycine \u2014 un acide amin\u00e9 favorisant le sommeil \u2014 et a une biodisponibilit\u00e9 de 80\u00a0%. Il est non laxatif aux doses th\u00e9rapeutiques. Le malate est id\u00e9al pour la production d\u2019\u00e9nergie. Le citrate (biodisponibilit\u00e9 30\u201340\u00a0%) est un bon choix \u00e9conomique.' },
        { heading: 'Impact sur le sommeil et la r\u00e9cup\u00e9ration', body: 'Le magn\u00e9sium module les r\u00e9cepteurs GABA \u2014 les m\u00eames r\u00e9cepteurs que ciblent les benzodiaz\u00e9pines, mais naturellement. Il r\u00e9duit l\u2019activit\u00e9 du syst\u00e8me nerveux sympathique et diminue le cortisol salivaire au coucher. Les effets sur le sommeil sont\u00a0: latence du sommeil r\u00e9duite (endormissement plus rapide), sommeil profond accru, et moins de r\u00e9veils nocturnes.' },
        { heading: 'Dosage et timing recommand\u00e9s', body: 'Prendre 200\u2013400\u00a0mg de magn\u00e9sium glycinate 30\u201360 minutes avant le coucher. Commencer par 200\u00a0mg et augmenter progressivement. Ne pas d\u00e9passer 400\u00a0mg/dose \u2014 au-del\u00e0, les effets laxatifs augmentent. Combiner avec 3\u20135\u00a0g de glycine suppl\u00e9mentaire pour un effet sommeil synergique.' },
      ],
    },

`;

// Find the right spot in the fr: section to insert these entries
// Find the end of 'best-protein-supplements-2026' in fr section
const frStart = content.indexOf('\n  fr: {');
if (frStart === -1) { console.error('fr: section not found!'); process.exit(1); }

const insertAfter = "    'best-protein-supplements-2026': {";
const frSection = content.slice(frStart);
const insertIdx = frSection.indexOf(insertAfter);
if (insertIdx === -1) { console.error('insertion point not found!'); process.exit(1); }

// Find the end of the best-protein entry (the closing },)
const entryStart = frStart + insertIdx + insertAfter.length;
// Find the next entry start (4 spaces + quote)
let depth = 1;
let pos = frStart + insertIdx + insertAfter.length;
// Actually, find the closing }  of this object - it's the first '    },' at top level
const searchFrom = frStart + insertIdx;
// The entry ends at the next '    },' pattern
const nextEntry = content.indexOf('\n\n    \'', searchFrom + 100);
if (nextEntry === -1) { console.error('next entry not found'); process.exit(1); }

// Insert our new entries before the next entry
content = content.slice(0, nextEntry) + '\n' + frEntries + content.slice(nextEntry);
fs.writeFileSync(file, content, 'utf8');
console.log('Added 5 French blog translations');
