type ProductDesc = { desc: string; composition: string; howToUse: string; servings: number };
type DescMap = Record<string, ProductDesc>;

export const DESCRIPTIONS_BY_LOCALE: Record<string, DescMap> = {
  en: {
    Protein: {
      desc: 'Premium-grade protein supplement delivering 24–26g of protein per serving. Cold-processed to preserve bioactive fractions and maximize bioavailability. Ideal for muscle growth, recovery and maintaining lean mass.',
      composition: 'Whey Protein Concentrate/Isolate, Cocoa Powder (chocolate variants), Sunflower Lecithin, Natural Flavors, Stevia Extract. Per 30g serving: Protein 24g, Carbohydrates 3g, Fat 2g, Calories 120 kcal.',
      howToUse: 'Mix 1 scoop (30g) with 250–300ml cold water or milk. Take 1–2 servings daily — best after training and in the morning.',
      servings: 30,
    },
    Creatine: {
      desc: 'Micronized creatine monohydrate with 99.9% purity. One of the most researched supplements in sports science — proven to increase strength, power output and lean muscle mass.',
      composition: 'Creatine Monohydrate 5000mg per serving. Unflavoured, mixes easily.',
      howToUse: 'Mix 1 scoop (5g) with 300ml water. Take daily — post-workout or with a meal. Loading phase optional: 20g/day for 5 days.',
      servings: 60,
    },
    'Amino Acids': {
      desc: 'Advanced amino acid complex providing essential and branched-chain amino acids to support muscle protein synthesis, reduce fatigue and accelerate recovery between sessions.',
      composition: 'L-Leucine 2500mg, L-Isoleucine 1250mg, L-Valine 1250mg, L-Glutamine 1000mg, Vitamin B6 2mg. Per serving.',
      howToUse: 'Mix 1 scoop with 300ml water. Take before, during or after training. Up to 2 servings per day.',
      servings: 50,
    },
    'Pre-Workout': {
      desc: 'High-performance pre-workout formula combining caffeine, beta-alanine and citrulline malate for explosive energy, intense focus and enhanced pump.',
      composition: 'Citrulline Malate 6000mg, Beta-Alanine 3200mg, Creatine Monohydrate 3000mg, Caffeine Anhydrous 200mg, L-Tyrosine 1000mg. Per 10g serving.',
      howToUse: 'Mix 1 scoop (10g) with 300ml cold water 20–30 min before training. Do not exceed 1 serving per day.',
      servings: 30,
    },
    Vitamins: {
      desc: 'Pharmaceutical-grade micronutrient supplement providing optimal daily support for immune function, energy metabolism, bone health and athletic performance.',
      composition: 'Active ingredient as per product label. Produced in GMP-certified facilities. Free of artificial dyes and unnecessary fillers.',
      howToUse: 'Take as directed on label, preferably with a meal for optimal absorption.',
      servings: 60,
    },
    'Fat Burners': {
      desc: 'Advanced metabolic support formula combining L-carnitine, thermogenic compounds and metabolism-boosting ingredients to help the body utilise fat as fuel during training.',
      composition: 'Acetyl-L-Carnitine or L-Carnitine Tartrate 1000mg, Green Tea Extract 300mg, Caffeine Anhydrous 150mg. Per serving.',
      howToUse: 'Take in the morning on an empty stomach or 30 min before training. Do not take within 6 hours of sleep.',
      servings: 30,
    },
    Gainer: {
      desc: 'High-calorie mass gainer providing a blend of fast and slow-digesting proteins with complex carbohydrates. Designed to support muscle growth for hard gainers.',
      composition: 'Whey Protein Matrix 50g, Maltodextrin 150g, MCT Oils 5g. Per 210g serving: Protein 50g, Carbohydrates 180g, Fat 6g, Calories 980 kcal.',
      howToUse: 'Mix 2–3 scoops (210g) with 500ml milk or water. Take post-workout and between meals.',
      servings: 14,
    },
    Energy: {
      desc: 'Fast-acting energy supplement providing readily available carbohydrates and electrolytes to fuel performance during training and accelerate glycogen replenishment post-workout.',
      composition: 'Maltodextrin, Dextrose, Electrolytes (Sodium, Potassium, Magnesium), Vitamins C & E. Per serving.',
      howToUse: 'Mix as directed with 400–500ml water. Consume during or immediately after exercise.',
      servings: 20,
    },
    'Protein Bars': {
      desc: 'Convenient high-protein snack bar with optimal macronutrient profile. Perfect for on-the-go nutrition between meals or post-workout.',
      composition: 'Whey Protein Crisp, Milk Chocolate Coating, Peanut or Caramel Filling. Per bar: Protein 20g, Carbs 22g, Fat 8g, Calories 240 kcal.',
      howToUse: 'Eat 1–2 bars daily as a snack or post-workout treat. No preparation needed.',
      servings: 1,
    },
  },

  de: {
    Protein: {
      desc: 'Hochwertiges Proteinpräparat mit 24–26 g Protein pro Portion. Kaltverarbeitet zur Erhaltung bioaktiver Fraktionen und maximaler Bioverfügbarkeit. Ideal für Muskelwachstum, Regeneration und den Erhalt von magerer Muskelmasse.',
      composition: 'Molkenprotein-Konzentrat/-Isolat, Kakaopulver (Schokoladenvarianten), Sonnenblumenlecithin, natürliche Aromen, Stevia-Extrakt. Pro 30-g-Portion: Protein 24 g, Kohlenhydrate 3 g, Fett 2 g, Kalorien 120 kcal.',
      howToUse: '1 Messlöffel (30 g) mit 250–300 ml kaltem Wasser oder Milch mischen. 1–2 Portionen täglich nehmen — am besten nach dem Training und morgens.',
      servings: 30,
    },
    Creatine: {
      desc: 'Mikronisiertes Kreatin-Monohydrat mit 99,9 % Reinheit. Eines der am besten erforschten Nahrungsergänzungsmittel in der Sportwissenschaft — nachweislich wirksam zur Steigerung von Kraft, Leistung und magerer Muskelmasse.',
      composition: 'Kreatin-Monohydrat 5000 mg pro Portion. Geschmacksneutral, löst sich leicht auf.',
      howToUse: '1 Messlöffel (5 g) mit 300 ml Wasser mischen. Täglich nehmen — nach dem Training oder zu einer Mahlzeit. Ladephase optional: 20 g/Tag für 5 Tage.',
      servings: 60,
    },
    'Amino Acids': {
      desc: 'Fortschrittlicher Aminosäurenkomplex mit essenziellen und verzweigtkettigen Aminosäuren zur Unterstützung der Muskelproteinsynthese, Reduktion von Müdigkeit und Beschleunigung der Regeneration zwischen den Einheiten.',
      composition: 'L-Leucin 2500 mg, L-Isoleucin 1250 mg, L-Valin 1250 mg, L-Glutamin 1000 mg, Vitamin B6 2 mg. Pro Portion.',
      howToUse: '1 Messlöffel mit 300 ml Wasser mischen. Vor, während oder nach dem Training nehmen. Bis zu 2 Portionen täglich.',
      servings: 50,
    },
    'Pre-Workout': {
      desc: 'Hochleistungs-Pre-Workout-Formel mit Koffein, Beta-Alanin und Citrullin-Malat für explosive Energie, intensive Fokussierung und verbesserten Pump. Entwickelt für ernsthafte Athleten.',
      composition: 'Citrullin-Malat 6000 mg, Beta-Alanin 3200 mg, Kreatin-Monohydrat 3000 mg, Koffein 200 mg, L-Tyrosin 1000 mg. Pro 10-g-Portion.',
      howToUse: '1 Messlöffel (10 g) mit 300 ml kaltem Wasser 20–30 Min. vor dem Training mischen. Nicht mehr als 1 Portion täglich. Nicht abends nehmen.',
      servings: 30,
    },
    Vitamins: {
      desc: 'Pharmazeutisches Mikronährstoff-Supplement für optimale tägliche Unterstützung von Immunfunktion, Energiestoffwechsel, Knochengesundheit und sportlicher Leistung.',
      composition: 'Wirkstoff gemäß Produktetikett. Hergestellt in GMP-zertifizierten Einrichtungen. Frei von künstlichen Farbstoffen und unnötigen Füllstoffen.',
      howToUse: 'Wie auf dem Etikett angegeben einnehmen, vorzugsweise zu einer Mahlzeit für optimale Absorption.',
      servings: 60,
    },
    'Fat Burners': {
      desc: 'Fortschrittliche Stoffwechsel-Unterstützungsformel mit L-Carnitin, thermogenen Verbindungen und stoffwechselanregenden Inhaltsstoffen, um dem Körper zu helfen, Fett als Treibstoff beim Training zu nutzen.',
      composition: 'Acetyl-L-Carnitin oder L-Carnitin-Tartrat 1000 mg, Grüntee-Extrakt 300 mg, Koffein 150 mg. Pro Portion.',
      howToUse: 'Morgens auf nüchternen Magen oder 30 Min. vor dem Training nehmen. Nicht innerhalb von 6 Stunden vor dem Schlaf nehmen.',
      servings: 30,
    },
    Gainer: {
      desc: 'Kalorienreicher Mass-Gainer mit einer Mischung aus schnell und langsam verdauenden Proteinen und komplexen Kohlenhydraten. Konzipiert zur Unterstützung des Muskelwachstums für Hard-Gainer.',
      composition: 'Molkenprotein-Matrix 50 g, Maltodextrin 150 g, MCT-Öle 5 g. Pro 210-g-Portion: Protein 50 g, Kohlenhydrate 180 g, Fett 6 g, Kalorien 980 kcal.',
      howToUse: '2–3 Messlöffel (210 g) mit 500 ml Milch oder Wasser mischen. Nach dem Training und zwischen den Mahlzeiten nehmen.',
      servings: 14,
    },
    Energy: {
      desc: 'Schnell wirkendes Energie-Supplement mit leicht verfügbaren Kohlenhydraten und Elektrolyten zur Leistungsversorgung beim Training und zur Beschleunigung der Glykogen-Auffüllung nach dem Training.',
      composition: 'Maltodextrin, Dextrose, Elektrolyte (Natrium, Kalium, Magnesium), Vitamine C & E. Pro Portion.',
      howToUse: 'Wie angegeben mit 400–500 ml Wasser mischen. Während oder unmittelbar nach dem Training konsumieren.',
      servings: 20,
    },
    'Protein Bars': {
      desc: 'Praktischer Proteinriegel mit optimalem Makronährstoffprofil. Perfekt für unterwegs zwischen den Mahlzeiten oder nach dem Training.',
      composition: 'Molkenprotein-Crisp, Milchschokoladenüberzug, Erdnuss- oder Karamellfüllung. Pro Riegel: Protein 20 g, Kohlenhydrate 22 g, Fett 8 g, Kalorien 240 kcal.',
      howToUse: '1–2 Riegel täglich als Snack oder nach dem Training essen. Keine Zubereitung erforderlich.',
      servings: 1,
    },
  },

  fr: {
    Protein: {
      desc: 'Supplément protéiné de qualité supérieure apportant 24–26 g de protéines par portion. Traité à froid pour préserver les fractions bioactives et maximiser la biodisponibilité. Idéal pour la croissance musculaire, la récupération et le maintien de la masse maigre.',
      composition: 'Concentré/Isolat de Protéines de Lactosérum, Poudre de Cacao (variantes chocolat), Lécithine de Tournesol, Arômes Naturels, Extrait de Stévia. Par portion de 30 g : Protéines 24 g, Glucides 3 g, Lipides 2 g, Calories 120 kcal.',
      howToUse: 'Mélanger 1 dose (30 g) avec 250–300 ml d\'eau froide ou de lait. Prendre 1–2 portions par jour — de préférence après l\'entraînement et le matin.',
      servings: 30,
    },
    Creatine: {
      desc: 'Créatine monohydrate micronisée avec une pureté de 99,9 %. L\'un des suppléments les plus étudiés en sciences du sport — prouvé pour augmenter la force, la puissance et la masse musculaire maigre.',
      composition: 'Créatine Monohydrate 5000 mg par portion. Sans arôme, se dissout facilement.',
      howToUse: 'Mélanger 1 dose (5 g) avec 300 ml d\'eau. Prendre quotidiennement — après l\'entraînement ou avec un repas. Phase de charge optionnelle : 20 g/jour pendant 5 jours.',
      servings: 60,
    },
    'Amino Acids': {
      desc: 'Complexe d\'acides aminés avancé fournissant des acides aminés essentiels et à chaîne ramifiée pour soutenir la synthèse protéique musculaire, réduire la fatigue et accélérer la récupération.',
      composition: 'L-Leucine 2500 mg, L-Isoleucine 1250 mg, L-Valine 1250 mg, L-Glutamine 1000 mg, Vitamine B6 2 mg. Par portion.',
      howToUse: 'Mélanger 1 dose avec 300 ml d\'eau. Prendre avant, pendant ou après l\'entraînement. Jusqu\'à 2 portions par jour.',
      servings: 50,
    },
    'Pre-Workout': {
      desc: 'Formule pré-entraînement haute performance combinant caféine, bêta-alanine et malate de citrulline pour une énergie explosive, une concentration intense et un pump amélioré.',
      composition: 'Malate de Citrulline 6000 mg, Bêta-Alanine 3200 mg, Créatine Monohydrate 3000 mg, Caféine Anhydre 200 mg, L-Tyrosine 1000 mg. Par portion de 10 g.',
      howToUse: 'Mélanger 1 dose (10 g) avec 300 ml d\'eau froide 20–30 min avant l\'entraînement. Ne pas dépasser 1 portion par jour. Éviter le soir.',
      servings: 30,
    },
    Vitamins: {
      desc: 'Supplément micronutritionnel de qualité pharmaceutique offrant un soutien quotidien optimal pour la fonction immunitaire, le métabolisme énergétique, la santé osseuse et la performance sportive.',
      composition: 'Principe actif selon l\'étiquette du produit. Fabriqué dans des installations certifiées GMP. Sans colorants artificiels ni charges inutiles.',
      howToUse: 'Prendre comme indiqué sur l\'étiquette, de préférence avec un repas pour une absorption optimale.',
      servings: 60,
    },
    'Fat Burners': {
      desc: 'Formule avancée de soutien métabolique combinant la L-carnitine, des composés thermogéniques et des ingrédients stimulant le métabolisme pour aider le corps à utiliser les graisses comme carburant pendant l\'entraînement.',
      composition: 'Acétyl-L-Carnitine ou Tartrate de L-Carnitine 1000 mg, Extrait de Thé Vert 300 mg, Caféine Anhydre 150 mg. Par portion.',
      howToUse: 'Prendre le matin à jeun ou 30 min avant l\'entraînement. Ne pas prendre dans les 6 heures avant le coucher.',
      servings: 30,
    },
    Gainer: {
      desc: 'Mass gainer hypercalorique fournissant un mélange de protéines à digestion rapide et lente avec des glucides complexes. Conçu pour soutenir la croissance musculaire des hardgainers.',
      composition: 'Matrice de Protéines de Lactosérum 50 g, Maltodextrine 150 g, Huiles MCT 5 g. Par portion de 210 g : Protéines 50 g, Glucides 180 g, Lipides 6 g, Calories 980 kcal.',
      howToUse: 'Mélanger 2–3 doses (210 g) avec 500 ml de lait ou d\'eau. Prendre après l\'entraînement et entre les repas.',
      servings: 14,
    },
    Energy: {
      desc: 'Supplément énergétique à action rapide fournissant des glucides disponibles et des électrolytes pour alimenter les performances pendant l\'entraînement et accélérer la reconstitution du glycogène.',
      composition: 'Maltodextrine, Dextrose, Électrolytes (Sodium, Potassium, Magnésium), Vitamines C & E. Par portion.',
      howToUse: 'Mélanger comme indiqué avec 400–500 ml d\'eau. Consommer pendant ou immédiatement après l\'exercice.',
      servings: 20,
    },
    'Protein Bars': {
      desc: 'Barre protéinée pratique avec un profil macronutritionnel optimal. Parfaite pour la nutrition en déplacement entre les repas ou après l\'entraînement.',
      composition: 'Crisp de Protéines de Lactosérum, Enrobage Chocolat au Lait, Garniture Cacahuète ou Caramel. Par barre : Protéines 20 g, Glucides 22 g, Lipides 8 g, Calories 240 kcal.',
      howToUse: 'Manger 1–2 barres par jour comme collation ou après l\'entraînement. Aucune préparation nécessaire.',
      servings: 1,
    },
  },

  pl: {
    Protein: {
      desc: 'Wysokiej jakości suplement białkowy dostarczający 24–26 g białka na porcję. Przetwarzany na zimno w celu zachowania bioaktywnych frakcji i maksymalnej biodostępności. Idealny do wzrostu mięśni, regeneracji i utrzymania szczupłej masy ciała.',
      composition: 'Koncentrat/Izolat Białka Serwatkowego, Kakao w proszku (warianty czekoladowe), Lecytyna słonecznikowa, Naturalne aromaty, Ekstrakt stewii. Na porcję 30 g: Białko 24 g, Węglowodany 3 g, Tłuszcze 2 g, Kalorie 120 kcal.',
      howToUse: 'Wymieszaj 1 miarkę (30 g) z 250–300 ml zimnej wody lub mleka. Przyjmuj 1–2 porcje dziennie — najlepiej po treningu i rano.',
      servings: 30,
    },
    Creatine: {
      desc: 'Zmikronizowany monohydrat kreatyny o czystości 99,9%. Jeden z najlepiej przebadanych suplementów w naukach sportowych — udowodniono zwiększenie siły, mocy i beztłuszczowej masy mięśniowej.',
      composition: 'Monohydrat Kreatyny 5000 mg na porcję. Bez smaku, łatwo się rozpuszcza.',
      howToUse: 'Wymieszaj 1 miarkę (5 g) z 300 ml wody. Przyjmuj codziennie — po treningu lub do posiłku. Faza ładowania opcjonalna: 20 g/dzień przez 5 dni.',
      servings: 60,
    },
    'Amino Acids': {
      desc: 'Zaawansowany kompleks aminokwasów dostarczający niezbędnych i rozgałęzionych aminokwasów w celu wsparcia syntezy białek mięśniowych, redukcji zmęczenia i przyspieszenia regeneracji.',
      composition: 'L-Leucyna 2500 mg, L-Izoleucyna 1250 mg, L-Walina 1250 mg, L-Glutamina 1000 mg, Witamina B6 2 mg. Na porcję.',
      howToUse: 'Wymieszaj 1 miarkę z 300 ml wody. Przyjmuj przed, w trakcie lub po treningu. Do 2 porcji dziennie.',
      servings: 50,
    },
    'Pre-Workout': {
      desc: 'Wysokowydajna formuła pre-workout łącząca kofeinę, beta-alaninę i cytrulinian jabłczanu dla wybuchowej energii, intensywnego skupienia i zwiększonego pompy mięśniowej.',
      composition: 'Cytrulinian jabłczanu 6000 mg, Beta-Alanina 3200 mg, Monohydrat Kreatyny 3000 mg, Kofeina bezwodna 200 mg, L-Tyrozyna 1000 mg. Na porcję 10 g.',
      howToUse: 'Wymieszaj 1 miarkę (10 g) z 300 ml zimnej wody 20–30 min przed treningiem. Nie przekraczaj 1 porcji dziennie. Unikaj wieczorem.',
      servings: 30,
    },
    Vitamins: {
      desc: 'Farmaceutyczny suplement mikroskładników odżywczych zapewniający optymalne dzienne wsparcie dla funkcji immunologicznych, metabolizmu energetycznego, zdrowia kości i wyników sportowych.',
      composition: 'Substancja czynna zgodnie z etykietą produktu. Produkowany w zakładach certyfikowanych GMP. Wolny od sztucznych barwników i niepotrzebnych wypełniaczy.',
      howToUse: 'Przyjmować zgodnie z instrukcją na etykiecie, najlepiej z posiłkiem dla optymalnego wchłaniania.',
      servings: 60,
    },
    'Fat Burners': {
      desc: 'Zaawansowana formuła wspomagająca metabolizm łącząca L-karnitynę, związki termogeniczne i składniki przyspieszające metabolizm, aby pomóc organizmowi wykorzystywać tłuszcz jako paliwo podczas treningu.',
      composition: 'Acetylo-L-Karnityna lub Winian L-Karnityny 1000 mg, Ekstrakt z Zielonej Herbaty 300 mg, Kofeina bezwodna 150 mg. Na porcję.',
      howToUse: 'Przyjmować rano na czczo lub 30 min przed treningiem. Nie przyjmować w ciągu 6 godzin przed snem.',
      servings: 30,
    },
    Gainer: {
      desc: 'Wysokokaloryczny gainer dostarczający mieszankę szybko i wolno trawiących się białek z węglowodanami złożonymi. Zaprojektowany do wsparcia wzrostu mięśni dla osób z trudnościami w przybraniu masy.',
      composition: 'Matryca Białka Serwatkowego 50 g, Maltodekstryna 150 g, Oleje MCT 5 g. Na porcję 210 g: Białko 50 g, Węglowodany 180 g, Tłuszcze 6 g, Kalorie 980 kcal.',
      howToUse: 'Wymieszaj 2–3 miarki (210 g) z 500 ml mleka lub wody. Przyjmuj po treningu i między posiłkami.',
      servings: 14,
    },
    Energy: {
      desc: 'Szybko działający suplement energetyczny dostarczający łatwo dostępnych węglowodanów i elektrolitów do zasilania wydajności podczas treningu i przyspieszenia uzupełniania glikogenu po treningu.',
      composition: 'Maltodekstryna, Dekstroza, Elektrolity (Sód, Potas, Magnez), Witaminy C i E. Na porcję.',
      howToUse: 'Wymieszaj zgodnie z instrukcją z 400–500 ml wody. Spożywać podczas lub bezpośrednio po ćwiczeniach.',
      servings: 20,
    },
    'Protein Bars': {
      desc: 'Wygodny baton wysokobiałkowy z optymalnym profilem makroskładników. Idealny do odżywiania w ruchu między posiłkami lub po treningu.',
      composition: 'Chrupki Białka Serwatkowego, Polewa z Mlecznej Czekolady, Nadzienie Orzechowe lub Karmelowe. Na baton: Białko 20 g, Węglowodany 22 g, Tłuszcze 8 g, Kalorie 240 kcal.',
      howToUse: 'Jeść 1–2 batony dziennie jako przekąskę lub po treningu. Nie wymaga przygotowania.',
      servings: 1,
    },
  },

  it: {
    Protein: {
      desc: 'Integratore proteico di qualità superiore che fornisce 24–26 g di proteine per porzione. Lavorato a freddo per preservare le frazioni bioattive e massimizzare la biodisponibilità. Ideale per la crescita muscolare, il recupero e il mantenimento della massa magra.',
      composition: 'Concentrato/Isolato di Proteine del Siero di Latte, Cacao in Polvere (varianti al cioccolato), Lecitina di Girasole, Aromi Naturali, Estratto di Stevia. Per porzione da 30 g: Proteine 24 g, Carboidrati 3 g, Grassi 2 g, Calorie 120 kcal.',
      howToUse: 'Mescolare 1 misurino (30 g) con 250–300 ml di acqua fredda o latte. Assumere 1–2 porzioni al giorno — preferibilmente dopo l\'allenamento e al mattino.',
      servings: 30,
    },
    Creatine: {
      desc: 'Creatina monoidrata micronizzata con purezza del 99,9%. Uno dei supplementi più studiati nella scienza dello sport — dimostrato per aumentare la forza, la potenza e la massa muscolare magra.',
      composition: 'Creatina Monoidrata 5000 mg per porzione. Insapore, si scioglie facilmente.',
      howToUse: 'Mescolare 1 misurino (5 g) con 300 ml d\'acqua. Assumere quotidianamente — dopo l\'allenamento o con un pasto. Fase di carico opzionale: 20 g/giorno per 5 giorni.',
      servings: 60,
    },
    'Amino Acids': {
      desc: 'Complesso avanzato di aminoacidi che fornisce aminoacidi essenziali e a catena ramificata per supportare la sintesi proteica muscolare, ridurre la fatica e accelerare il recupero tra le sessioni.',
      composition: 'L-Leucina 2500 mg, L-Isoleucina 1250 mg, L-Valina 1250 mg, L-Glutamina 1000 mg, Vitamina B6 2 mg. Per porzione.',
      howToUse: 'Mescolare 1 misurino con 300 ml d\'acqua. Assumere prima, durante o dopo l\'allenamento. Fino a 2 porzioni al giorno.',
      servings: 50,
    },
    'Pre-Workout': {
      desc: 'Formula pre-allenamento ad alte prestazioni che combina caffeina, beta-alanina e malato di citrullina per energia esplosiva, concentrazione intensa e pump migliorato.',
      composition: 'Malato di Citrullina 6000 mg, Beta-Alanina 3200 mg, Creatina Monoidrata 3000 mg, Caffeina Anidra 200 mg, L-Tirosina 1000 mg. Per porzione da 10 g.',
      howToUse: 'Mescolare 1 misurino (10 g) con 300 ml di acqua fredda 20–30 min prima dell\'allenamento. Non superare 1 porzione al giorno. Evitare la sera.',
      servings: 30,
    },
    Vitamins: {
      desc: 'Integratore di micronutrienti di qualità farmaceutica che fornisce supporto quotidiano ottimale per la funzione immunitaria, il metabolismo energetico, la salute delle ossa e le prestazioni atletiche.',
      composition: 'Principio attivo secondo l\'etichetta del prodotto. Prodotto in strutture certificate GMP. Privo di coloranti artificiali e riempitivi non necessari.',
      howToUse: 'Assumere come indicato sull\'etichetta, preferibilmente con un pasto per un assorbimento ottimale.',
      servings: 60,
    },
    'Fat Burners': {
      desc: 'Formula avanzata di supporto metabolico che combina L-carnitina, composti termogenici e ingredienti stimolanti il metabolismo per aiutare il corpo a utilizzare i grassi come carburante durante l\'allenamento.',
      composition: 'Acetil-L-Carnitina o Tartrato di L-Carnitina 1000 mg, Estratto di Tè Verde 300 mg, Caffeina Anidra 150 mg. Per porzione.',
      howToUse: 'Assumere al mattino a stomaco vuoto o 30 min prima dell\'allenamento. Non assumere nelle 6 ore prima di dormire.',
      servings: 30,
    },
    Gainer: {
      desc: 'Mass gainer ipercalorico che fornisce una miscela di proteine a digestione rapida e lenta con carboidrati complessi. Progettato per supportare la crescita muscolare negli hardgainer.',
      composition: 'Matrice di Proteine del Siero di Latte 50 g, Maltodestrina 150 g, Oli MCT 5 g. Per porzione da 210 g: Proteine 50 g, Carboidrati 180 g, Grassi 6 g, Calorie 980 kcal.',
      howToUse: 'Mescolare 2–3 misurini (210 g) con 500 ml di latte o acqua. Assumere dopo l\'allenamento e tra i pasti.',
      servings: 14,
    },
    Energy: {
      desc: 'Integratore energetico ad azione rapida che fornisce carboidrati prontamente disponibili ed elettroliti per alimentare le prestazioni durante l\'allenamento e accelerare il ripristino del glicogeno.',
      composition: 'Maltodestrina, Destrosio, Elettroliti (Sodio, Potassio, Magnesio), Vitamine C & E. Per porzione.',
      howToUse: 'Mescolare come indicato con 400–500 ml d\'acqua. Consumare durante o immediatamente dopo l\'esercizio.',
      servings: 20,
    },
    'Protein Bars': {
      desc: 'Pratica barretta proteica ad alto contenuto proteico con profilo macronutrizionale ottimale. Perfetta per la nutrizione on-the-go tra i pasti o dopo l\'allenamento.',
      composition: 'Crisp di Proteine del Siero di Latte, Rivestimento di Cioccolato al Latte, Ripieno di Arachidi o Caramello. Per barretta: Proteine 20 g, Carboidrati 22 g, Grassi 8 g, Calorie 240 kcal.',
      howToUse: 'Mangiare 1–2 barrette al giorno come spuntino o dopo l\'allenamento. Nessuna preparazione necessaria.',
      servings: 1,
    },
  },
};

export function getProductDescriptions(locale: string): DescMap {
  return DESCRIPTIONS_BY_LOCALE[locale] ?? DESCRIPTIONS_BY_LOCALE.en;
}
