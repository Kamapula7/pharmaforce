export interface Review {
  id: string;
  name: string;
  country: string;
  rating: number;
  comment: string;
  date: string;
}

export const REVIEWS_BY_CATEGORY: Record<string, Review[]> = {
  Protein: [
    { id: 'p1',  name: 'Marcus W.',      country: '🇩🇪', rating: 5, comment: 'Ausgezeichnete Textur und Geschmack. Löst sich perfekt im Shaker auf, keine Klumpen. Schnelle Lieferung nach Deutschland.',                date: '15. Jan 2026' },
    { id: 'p2',  name: 'Anna K.',        country: '🇵🇱', rating: 5, comment: 'Najlepsza cena w Europie za tę jakość. 24g białka na porcję — dokładnie tego potrzebowałam na redukcji.',                                 date: '28. Jan 2026' },
    { id: 'p3',  name: 'Luca B.',        country: '🇮🇹', rating: 4, comment: 'Arrivato in perfette condizioni. Il sapore al cioccolato è davvero buono — non troppo dolce.',                                             date: '10. Feb 2026' },
    { id: 'p4',  name: 'Claire M.',      country: '🇫🇷', rating: 5, comment: 'Excellente qualité, livraison rapide en France. Le goût vanille est très agréable, pas écœurant du tout.',                                 date: '5. Feb 2026' },
    { id: 'p5',  name: 'David S.',       country: '🇬🇧', rating: 5, comment: 'Solid protein powder. Mixes clean, no grit. Delivery was fast and packaging discreet. Will reorder.',                                      date: '18. Jan 2026' },
    { id: 'p6',  name: 'Felix H.',       country: '🇩🇪', rating: 5, comment: 'Schon die dritte Bestellung. Qualität ist konstant hoch, der Preis im Vergleich zu lokalen Shops unschlagbar.',                           date: '2. Feb 2026' },
    { id: 'p7',  name: 'Piotr Z.',       country: '🇵🇱', rating: 5, comment: 'Świetny produkt, szybka wysyłka do Polski. Smak czekoladowy jest rewelacyjny. Polecam wszystkim!',                                         date: '20. Jan 2026' },
    { id: 'p8',  name: 'Sofia R.',       country: '🇮🇹', rating: 4, comment: 'Proteina di qualità farmaceutica, si scioglie benissimo. Consegna discreta, arrivata in 5 giorni.',                                        date: '14. Feb 2026' },
    { id: 'p9',  name: 'Thomas L.',      country: '🇫🇷', rating: 4, comment: 'Bonne qualité, rapport qualité-prix excellent. Se mélange bien avec du lait ou de l\'eau. Très satisfait.',                                date: '8. Feb 2026' },
    { id: 'p10', name: 'Jan N.',         country: '🇳🇱', rating: 5, comment: 'Top kwaliteit proteïne. Snelle levering naar Nederland, discrete verpakking. Zeker de beste prijs.',                                      date: '25. Jan 2026' },
    { id: 'p11', name: 'Klaus M.',       country: '🇦🇹', rating: 5, comment: 'Top Produkt, sehr gute Löslichkeit. Habe viele Proteinpulver getestet — dieses gehört zu den besten.',                                    date: '3. Feb 2026' },
    { id: 'p12', name: 'Magdalena W.',   country: '🇵🇱', rating: 5, comment: 'Fantastyczna jakość! Białko rozpuszcza się błyskawicznie, smak doskonały. Dostawa w 4 dni robocze.',                                       date: '11. Feb 2026' },
    { id: 'p13', name: 'Giulia F.',      country: '🇮🇹', rating: 5, comment: 'Prodotto eccellente. Uso questa proteina da 3 mesi e i risultati si vedono. Spedizione velocissima.',                                      date: '17. Feb 2026' },
    { id: 'p14', name: 'Antoine B.',     country: '🇫🇷', rating: 5, comment: 'Superbe produit, qualité pharmaceutique garantie. Le goût est excellent et sans sucres ajoutés.',                                          date: '6. Feb 2026' },
    { id: 'p15', name: 'Erik J.',        country: '🇸🇪', rating: 4, comment: 'Great product, fast shipping to Sweden. Dissolves perfectly and the taste is fantastic. Highly recommend.',                                 date: '22. Jan 2026' },
  ],

  Creatine: [
    { id: 'c1',  name: 'Stefan R.',      country: '🇩🇪', rating: 5, comment: 'Spürbare Kraftsteigerung nach 2 Wochen Ladephase. Keine Magenprobleme, löst sich vollständig auf.',                                       date: '12. Jan 2026' },
    { id: 'c2',  name: 'Tomasz W.',      country: '🇵🇱', rating: 5, comment: 'Czystość farmaceutyczna, dokładnie tego szukałem. Zamawiam już trzecią partię — efekty widoczne od pierwszego cyklu.',                    date: '25. Jan 2026' },
    { id: 'c3',  name: 'Pierre D.',      country: '🇫🇷', rating: 5, comment: 'Créatine de qualité pharmaceutique, se dissout parfaitement. Gains de force visibles après 10 jours. Excellent rapport qualité-prix.',     date: '9. Feb 2026' },
    { id: 'c4',  name: 'Marco V.',       country: '🇮🇹', rating: 5, comment: 'Creatina di altissima qualità, nessun residuo nel bicchiere. Miglioramento della forza notevole già dalla seconda settimana.',              date: '16. Feb 2026' },
    { id: 'c5',  name: 'James T.',       country: '🇬🇧', rating: 5, comment: 'Pure micronized creatine, no fillers. Strength up noticeably in 2 weeks. Fast discrete delivery.',                                          date: '19. Jan 2026' },
    { id: 'c6',  name: 'Bernd K.',       country: '🇩🇪', rating: 5, comment: 'Mikronisierte Kreatin-Monohydrat, höchste Reinheit. Kein Klumpen, löst sich sofort. Sehr empfehlenswert.',                                date: '4. Feb 2026' },
    { id: 'c7',  name: 'Katarzyna L.',   country: '🇵🇱', rating: 4, comment: 'Dobry produkt, szybka dostawa. Kreatyna monohydrat w czystej formie, bez dodatków. Polecam.',                                              date: '30. Jan 2026' },
    { id: 'c8',  name: 'Julien A.',      country: '🇫🇷', rating: 4, comment: 'Très bonne créatine, sans additifs. Livraison rapide et discrète. Je le recommande à tous les sportifs sérieux.',                          date: '12. Feb 2026' },
    { id: 'c9',  name: 'Alessandro C.',  country: '🇮🇹', rating: 5, comment: 'Creatina pura al 100%, si scioglie completamente. Ottima per la fase di carico. Consegna in 4 giorni.',                                    date: '7. Feb 2026' },
    { id: 'c10', name: 'Lars B.',        country: '🇩🇰', rating: 5, comment: 'Best creatine I\'ve tried. Pure, no additives, mixes instantly. Fast delivery across Europe.',                                              date: '23. Jan 2026' },
    { id: 'c11', name: 'Wojciech S.',    country: '🇵🇱', rating: 5, comment: 'Najlepsza kreatyna w tej cenie. Efekty siłowe po 10 dniach bardzo wyraźne. Dostawa szybka i dyskretna.',                                  date: '6. Feb 2026' },
    { id: 'c12', name: 'Hans-Peter M.',  country: '🇩🇪', rating: 5, comment: 'Pharmawürdige Qualität. Keine Beschwerden, perfekt löslich. Empfehle es jedem ambitionierten Athleten.',                                  date: '20. Jan 2026' },
  ],

  'Amino Acids': [
    { id: 'a1',  name: 'Hans D.',        country: '🇩🇪', rating: 5, comment: 'Regeneration deutlich verbessert. Nehme es intra-workout — auch die Ausdauer hat spürbar zugenommen.',                                    date: '18. Jan 2026' },
    { id: 'a2',  name: 'Karolina P.',    country: '🇵🇱', rating: 5, comment: 'Idealne proporcje, bez wypełniaczy. Biorę codziennie i zakwasy praktycznie zniknęły. Świetny produkt!',                                   date: '1. Feb 2026' },
    { id: 'a3',  name: 'Roberto M.',     country: '🇮🇹', rating: 4, comment: 'Buona qualità, si scioglie facilmente. Leggermente insapore ma facile da aggiungere a qualsiasi bevanda.',                                 date: '14. Feb 2026' },
    { id: 'a4',  name: 'Mathieu G.',     country: '🇫🇷', rating: 5, comment: 'Excellents acides aminés, rapport idéal. Récupération nettement améliorée après l\'entraînement.',                                        date: '10. Feb 2026' },
    { id: 'a5',  name: 'Oliver W.',      country: '🇬🇧', rating: 5, comment: 'Great BCAA profile, clean formula. Noticeably less soreness. Fast delivery from Europe.',                                                   date: '16. Jan 2026' },
    { id: 'a6',  name: 'Tobias F.',      country: '🇩🇪', rating: 5, comment: 'Sehr gute Aminosäurenzusammensetzung. DOMS sind seit der Einnahme fast verschwunden. Klare Empfehlung.',                                  date: '28. Jan 2026' },
    { id: 'a7',  name: 'Mateusz K.',     country: '🇵🇱', rating: 4, comment: 'Dobry skład aminokwasów, szybko się wchłania. Regeneracja po treningu znacznie skrócona.',                                                date: '15. Feb 2026' },
    { id: 'a8',  name: 'Elena R.',       country: '🇮🇹', rating: 5, comment: 'Aminoacidi di qualità superiore. Uso questo prodotto da 2 mesi e la mia performance è migliorata notevolmente.',                          date: '3. Feb 2026' },
    { id: 'a9',  name: 'Cédric T.',      country: '🇫🇷', rating: 5, comment: 'Très bonne qualité des acides aminés. Je les prends en intra-training et ma récupération est excellente.',                                 date: '20. Jan 2026' },
    { id: 'a10', name: 'Nils A.',        country: '🇸🇪', rating: 4, comment: 'Good amino acid profile. Mix well, no clumping. Recovery time reduced significantly. Will reorder.',                                       date: '7. Feb 2026' },
    { id: 'a11', name: 'Agnieszka M.',   country: '🇵🇱', rating: 5, comment: 'Fantastyczne aminokwasy! Biorę po każdym treningu — zakwasy zredukowane do minimum. Polecam każdemu.',                                   date: '24. Jan 2026' },
  ],

  AAS: [
    { id: 'as1', name: 'R. K.',          country: '🇩🇪', rating: 5, comment: 'Pharmazeutische Qualität, genau wie beschrieben. Diskrete Verpackung, in 4 Tagen in Deutschland angekommen.',                             date: '20. Jan 2026' },
    { id: 'as2', name: 'M. T.',          country: '🇵🇱', rating: 5, comment: 'Oryginalny produkt, zweryfikowany laboratoryjnie. Przyrosty siły od 2. tygodnia bardzo wyraźne. Zamówię ponownie.',                       date: '3. Feb 2026' },
    { id: 'as3', name: 'J. V.',          country: '🇳🇱', rating: 4, comment: 'Kwaliteit past bij de prijs. Verpakking veilig, communicatie was professioneel.',                                                           date: '15. Feb 2026' },
    { id: 'as4', name: 'F. M.',          country: '🇫🇷', rating: 5, comment: 'Produit authentique, emballage très discret. Livraison en 5 jours. Qualité pharmaceutique confirmée.',                                     date: '11. Jan 2026' },
    { id: 'as5', name: 'L. B.',          country: '🇮🇹', rating: 5, comment: 'Prodotto autentico, confezionamento discreto. Effetti visibili dalla seconda settimana. Molto soddisfatto.',                                date: '27. Jan 2026' },
    { id: 'as6', name: 'T. S.',          country: '🇩🇪', rating: 5, comment: 'Bestätigt durch eigenes Blutbild — 100% authentisch. Diskrete Lieferung, sehr professioneller Umgang.',                                   date: '8. Feb 2026' },
    { id: 'as7', name: 'K. W.',          country: '🇵🇱', rating: 5, comment: 'Produkt farmaceutyczny, w pełni autentyczny. Pakowanie dyskretne, dostawa ekspresowa. Polecam.',                                           date: '14. Feb 2026' },
    { id: 'as8', name: 'D. R.',          country: '🇫🇷', rating: 4, comment: 'Bonne qualité, livraison discrète. Communication réactive. Je recommande ce fournisseur.',                                                  date: '5. Feb 2026' },
    { id: 'as9', name: 'A. C.',          country: '🇮🇹', rating: 5, comment: 'Qualità farmaceutica verificata. Consegna discreta e rapida. Risultati eccellenti fin dalla prima settimana.',                              date: '19. Feb 2026' },
    { id: 'as10',name: 'H. B.',          country: '🇧🇪', rating: 5, comment: 'Uitstekende kwaliteit, discrete levering. Bloeduitslagen bevestigen authenticiteit. Zal opnieuw bestellen.',                               date: '1. Feb 2026' },
    { id: 'as11',name: 'E. J.',          country: '🇸🇪', rating: 4, comment: 'Genuine pharmaceutical grade product. Discreet packaging, professional service. Positive results from week 2.',                            date: '10. Feb 2026' },
    { id: 'as12',name: 'G. N.',          country: '🇩🇪', rating: 5, comment: 'Absolut pharmazeutische Qualität. Das Paket war diskret und sicher. Ergebnisse sprechen für sich.',                                       date: '22. Jan 2026' },
  ],

  Peptides: [
    { id: 'pe1', name: 'F. B.',          country: '🇩🇪', rating: 5, comment: 'Richtig lyophilisiert, Rekonstitution war reibungslos. Effekte innerhalb der ersten Woche spürbar.',                                       date: '22. Jan 2026' },
    { id: 'pe2', name: 'D. L.',          country: '🇸🇪', rating: 5, comment: 'Excellent product, discreet packaging. GH levels confirmed via blood work. Very impressed.',                                                date: '5. Feb 2026' },
    { id: 'pe3', name: 'P. M.',          country: '🇫🇷', rating: 5, comment: 'Peptide de qualité, chaîne du froid maintenue. Arrivé froid avec les packs de glace intacts. Très professionnel.',                         date: '17. Feb 2026' },
    { id: 'pe4', name: 'G. R.',          country: '🇮🇹', rating: 5, comment: 'Peptide di qualità farmaceutica. Ricostituzione perfetta. Risultati confermati da analisi del sangue.',                                    date: '9. Feb 2026' },
    { id: 'pe5', name: 'A. W.',          country: '🇵🇱', rating: 5, comment: 'Doskonałej jakości peptyd. Liofilizacja prawidłowa, rekonstytucja bez problemów. Efekty widoczne.',                                       date: '26. Jan 2026' },
    { id: 'pe6', name: 'M. K.',          country: '🇩🇪', rating: 4, comment: 'Pharmazeutische Qualität bestätigt. Kühlkette eingehalten. Wirkung nach 2 Wochen deutlich spürbar.',                                      date: '12. Feb 2026' },
    { id: 'pe7', name: 'R. C.',          country: '🇫🇷', rating: 5, comment: 'Qualité exceptionnelle, reconstitution facile. Effets remarquables sur la composition corporelle.',                                         date: '3. Feb 2026' },
    { id: 'pe8', name: 'S. V.',          country: '🇧🇪', rating: 5, comment: 'Perfecte kwaliteit, koelketen gerespecteerd. Resultaten zichtbaar na 2 weken. Zal opnieuw bestellen.',                                    date: '29. Jan 2026' },
    { id: 'pe9', name: 'L. T.',          country: '🇮🇹', rating: 4, comment: 'Peptide eccellente, conservazione ottimale. Effetti sulla massa muscolare magra molto positivi.',                                          date: '20. Feb 2026' },
    { id: 'pe10',name: 'J. P.',          country: '🇵🇱', rating: 5, comment: 'Peptyd najwyższej jakości, prawidłowo przechowywany. Efekty odczuwalne już po 10 dniach stosowania.',                                    date: '7. Feb 2026' },
    { id: 'pe11',name: 'N. H.',          country: '🇩🇰', rating: 5, comment: 'Top quality peptide, cold chain maintained perfectly. Blood work confirms activity. Will reorder.',                                         date: '15. Jan 2026' },
  ],

  Modulators: [
    { id: 'm1',  name: 'T. G.',          country: '🇩🇪', rating: 5, comment: 'Blutbild bestätigt Wirkung. Östrogen während des Zyklus perfekt kontrolliert. Hervorragendes Produkt.',                                   date: '19. Jan 2026' },
    { id: 'm2',  name: 'A. S.',          country: '🇳🇱', rating: 5, comment: 'Gebruikt voor PCT — testoseron herstel was veel sneller dan zonder. Sterk aanbevolen.',                                                    date: '2. Feb 2026' },
    { id: 'm3',  name: 'K. W.',          country: '🇵🇱', rating: 4, comment: 'Autentyczny produkt farmaceutyczny. Pakowanie bez uszkodzeń, bez problemów z dostawą. Zamówię ponownie.',                                 date: '16. Feb 2026' },
    { id: 'm4',  name: 'N. R.',          country: '🇫🇷', rating: 5, comment: 'Excellent pour la PCT. Récupération hormonale rapide, résultats visibles après 3 semaines.',                                               date: '6. Feb 2026' },
    { id: 'm5',  name: 'V. C.',          country: '🇮🇹', rating: 5, comment: 'Prodotto eccellente per la PCT. Recupero ormonale rapido, analisi del sangue confermano l\'efficacia.',                                   date: '23. Jan 2026' },
    { id: 'm6',  name: 'H. B.',          country: '🇩🇪', rating: 5, comment: 'Top für die PCT. Testosteron-Erholung wesentlich schneller als erwartet. Diskrete Lieferung.',                                            date: '10. Feb 2026' },
    { id: 'm7',  name: 'P. K.',          country: '🇵🇱', rating: 5, comment: 'Znakomity produkt do PCT. Poziomy hormonów wróciły do normy w ciągu 4 tygodni. Bardzo skuteczny.',                                       date: '28. Jan 2026' },
    { id: 'm8',  name: 'O. M.',          country: '🇫🇷', rating: 4, comment: 'Bonne qualité pharmaceutique. Estrogène bien contrôlé, récupération hormonale satisfaisante.',                                            date: '14. Feb 2026' },
    { id: 'm9',  name: 'E. B.',          country: '🇧🇪', rating: 5, comment: 'Farmaceutische kwaliteit, snelle hormonale herstel. Bloedonderzoek bevestigt effectiviteit. Top product.',                                 date: '4. Feb 2026' },
    { id: 'm10', name: 'C. J.',          country: '🇸🇪', rating: 5, comment: 'Excellent modulator. Hormonal recovery confirmed by bloodwork. Discreet packaging, fast delivery.',                                        date: '18. Feb 2026' },
    { id: 'm11', name: 'M. D.',          country: '🇮🇹', rating: 4, comment: 'Qualità farmaceutica garantita. Ottimo per controllo degli estrogeni durante il ciclo.',                                                   date: '9. Jan 2026' },
  ],

  'Womens Health': [
    { id: 'w1',  name: 'Sophie L.',      country: '🇩🇪', rating: 5, comment: 'Genau wie beschrieben, Originalverpackung. Diskrete Lieferung und sehr schneller Versand nach Deutschland.',                              date: '17. Jan 2026' },
    { id: 'w2',  name: 'Marta K.',       country: '🇵🇱', rating: 5, comment: 'Sprawdziłam numer serii — oryginalny produkt. Wyniki dokładnie takie jak oczekiwałam. Bardzo zadowolona.',                               date: '1. Feb 2026' },
    { id: 'w3',  name: 'Isabelle D.',    country: '🇫🇷', rating: 4, comment: 'Emballage arrivé parfaitement scellé et discret. Bonne communication avec le vendeur.',                                                    date: '14. Feb 2026' },
    { id: 'w4',  name: 'Chiara M.',      country: '🇮🇹', rating: 5, comment: 'Prodotto autentico, confezionamento discreto e sicuro. Risultati ottimi, spedizione in 5 giorni.',                                        date: '8. Feb 2026' },
    { id: 'w5',  name: 'Emma J.',        country: '🇸🇪', rating: 5, comment: 'Genuine product, discreet packaging. Fast delivery to Sweden. Results are as expected. Very satisfied.',                                   date: '24. Jan 2026' },
    { id: 'w6',  name: 'Laura B.',       country: '🇩🇪', rating: 5, comment: 'Produkt entspricht genau der Beschreibung. Versand war diskret und sicher. Gerne wieder.',                                                date: '5. Feb 2026' },
    { id: 'w7',  name: 'Alicja W.',      country: '🇵🇱', rating: 4, comment: 'Dobra jakość, dyskretna dostawa. Produkt oryginalny, wyniki widoczne po 3 tygodniach.',                                                   date: '19. Feb 2026' },
    { id: 'w8',  name: 'Marie C.',       country: '🇫🇷', rating: 5, comment: 'Qualité authentique, livraison très discrète. Résultats positifs observés dès la troisième semaine.',                                     date: '11. Jan 2026' },
    { id: 'w9',  name: 'Valentina R.',   country: '🇮🇹', rating: 5, comment: 'Ottima qualità, packaging molto discreto. Soddisfatta dei risultati. Riacquisterei sicuramente.',                                         date: '3. Feb 2026' },
    { id: 'w10', name: 'Nina H.',        country: '🇩🇪', rating: 4, comment: 'Sehr diskreter Versand, Produkt authentisch. Wirkung wie erwartet eingetreten. Gute Kommunikation.',                                      date: '16. Feb 2026' },
    { id: 'w11', name: 'Katarzyna S.',   country: '🇵🇱', rating: 5, comment: 'Wspaniały produkt, oryginalny i skuteczny. Dostawa dyskretna, ekspresowa. Zdecydowanie polecam.',                                         date: '28. Jan 2026' },
  ],

  'Anti-Aging': [
    { id: 'aa1', name: 'Dieter K.',      country: '🇩🇪', rating: 5, comment: 'Sichtbare Verbesserung der Hautqualität nach 6 Wochen. Seriosität und Diskretion des Anbieters überzeugen.',                              date: '13. Jan 2026' },
    { id: 'aa2', name: 'Renata P.',      country: '🇵🇱', rating: 5, comment: 'Wyraźna poprawa jakości skóry po 6 tygodniach. Produkt oryginalny, dostawa ekspresowa.',                                                  date: '29. Jan 2026' },
    { id: 'aa3', name: 'Hélène F.',      country: '🇫🇷', rating: 5, comment: 'Résultats remarquables après 5 semaines — peau plus ferme, moins de rides. Livraison très discrète.',                                    date: '10. Feb 2026' },
    { id: 'aa4', name: 'Francesca T.',   country: '🇮🇹', rating: 4, comment: 'Prodotto di qualità, effetti visibili sulla pelle dopo 4 settimane. Consegna discreta e puntuale.',                                       date: '21. Jan 2026' },
    { id: 'aa5', name: 'Werner B.',      country: '🇩🇪', rating: 5, comment: 'Pharmawürdige Qualität, deutliche Wirkung nach 5 Wochen. Sehr zu empfehlen für alle ab 40.',                                             date: '6. Feb 2026' },
    { id: 'aa6', name: 'Monika J.',      country: '🇵🇱', rating: 4, comment: 'Dobra jakość, efekty odmładzające widoczne po miesiącu. Dyskretna wysyłka, produkt oryginalny.',                                         date: '17. Feb 2026' },
    { id: 'aa7', name: 'Jean-Paul R.',   country: '🇫🇷', rating: 5, comment: 'Excellent produit anti-âge. Résultats visibles dès la 4ème semaine. Conditionnement discret et soigné.',                                  date: '1. Feb 2026' },
    { id: 'aa8', name: 'Stefania B.',    country: '🇮🇹', rating: 5, comment: 'Prodotto eccellente per l\'anti-invecchiamento. Pelle più giovane e levigata dopo 5 settimane.',                                          date: '14. Feb 2026' },
    { id: 'aa9', name: 'Karl H.',        country: '🇦🇹', rating: 4, comment: 'Gute Wirkung, diskrete Lieferung nach Österreich. Qualität entspricht pharmazeutischen Standards.',                                       date: '20. Jan 2026' },
    { id: 'aa10',name: 'Dorota M.',      country: '🇵🇱', rating: 5, comment: 'Niesamowity efekt odmładzający. Skóra wygląda młodziej o kilka lat. Produkt polecam z pełnym przekonaniem.',                             date: '8. Feb 2026' },
  ],

  'Sexual Health': [
    { id: 'sh1', name: 'M. B.',          country: '🇩🇪', rating: 5, comment: 'Authentisches Produkt, diskrete Verpackung. Wirkung wie erwartet eingetreten. Schnelle Lieferung.',                                       date: '14. Jan 2026' },
    { id: 'sh2', name: 'A. K.',          country: '🇵🇱', rating: 5, comment: 'Oryginalny produkt, dyskretna dostawa. Skuteczność potwierdzona. Zdecydowanie polecam.',                                                  date: '27. Jan 2026' },
    { id: 'sh3', name: 'R. M.',          country: '🇫🇷', rating: 4, comment: 'Produit authentique, livraison discrète. Efficacité confirmée. Rapport qualité-prix excellent.',                                          date: '9. Feb 2026' },
    { id: 'sh4', name: 'G. F.',          country: '🇮🇹', rating: 5, comment: 'Prodotto originale, imballaggio completamente discreto. Efficacia notevole, molto soddisfatto.',                                          date: '3. Feb 2026' },
    { id: 'sh5', name: 'C. V.',          country: '🇳🇱', rating: 5, comment: 'Authentiek product, zeer discrete levering. Werking zoals verwacht. Uitstekende service.',                                                 date: '21. Jan 2026' },
    { id: 'sh6', name: 'P. W.',          country: '🇩🇪', rating: 5, comment: 'Pharmazeutische Qualität bestätigt. Diskreter Versand, professioneller Service. Wirkung überzeugt.',                                     date: '15. Feb 2026' },
    { id: 'sh7', name: 'L. N.',          country: '🇵🇱', rating: 4, comment: 'Produkt wysokiej jakości, dyskretne opakowanie. Efekt zgodny z oczekiwaniami. Polecam.',                                                  date: '5. Feb 2026' },
    { id: 'sh8', name: 'J. T.',          country: '🇫🇷', rating: 5, comment: 'Qualité pharmaceutique garantie. Livraison ultra-discrète. Effet puissant et fiable.',                                                    date: '19. Jan 2026' },
    { id: 'sh9', name: 'S. C.',          country: '🇮🇹', rating: 4, comment: 'Qualità farmaceutica, confezione discreta. Efficace e affidabile. Spedizione puntuale.',                                                  date: '12. Feb 2026' },
    { id: 'sh10',name: 'B. H.',          country: '🇧🇪', rating: 5, comment: 'Farmaceutische kwaliteit, discrete levering. Werking bevestigd. Uitstekend product.',                                                     date: '28. Jan 2026' },
  ],

  Vitamins: [
    { id: 'v1',  name: 'Andrea B.',      country: '🇩🇪', rating: 5, comment: 'Hochwertige Vitaminzusammensetzung, sofort spürbare Energie. Sehr gute Bioverfügbarkeit.',                                               date: '10. Jan 2026' },
    { id: 'v2',  name: 'Joanna C.',      country: '🇵🇱', rating: 5, comment: 'Świetne witaminy, wysoka biodostępność. Energii więcej od pierwszego tygodnia. Polecam!',                                                 date: '24. Jan 2026' },
    { id: 'v3',  name: 'Caroline M.',    country: '🇫🇷', rating: 4, comment: 'Vitamines de qualité, bien absorbées. Je les prends le matin et mon énergie est nettement meilleure.',                                   date: '7. Feb 2026' },
    { id: 'v4',  name: 'Paolo S.',       country: '🇮🇹', rating: 5, comment: 'Vitamine di alta qualità, ottima biodisponibilità. Livelli di energia migliorati dalla prima settimana.',                                 date: '18. Feb 2026' },
    { id: 'v5',  name: 'John H.',        country: '🇬🇧', rating: 4, comment: 'Good quality vitamins, well absorbed. Noticeable energy improvement. Fast delivery to UK.',                                               date: '3. Feb 2026' },
    { id: 'v6',  name: 'Ralf G.',        country: '🇩🇪', rating: 5, comment: 'Pharmawürdige Qualität. Keine Magenbeschwerden, sehr gut verträglich. Werde sie weiter kaufen.',                                         date: '29. Jan 2026' },
    { id: 'v7',  name: 'Weronika L.',    country: '🇵🇱', rating: 4, comment: 'Dobre witaminy w dobrej cenie. Dostawa szybka, jakość farmaceutyczna. Polecam dla aktywnych.',                                           date: '13. Feb 2026' },
    { id: 'v8',  name: 'Marc L.',        country: '🇫🇷', rating: 5, comment: 'Excellente formulation vitaminée. Biodisponibilité optimale. Je me sens beaucoup mieux depuis 2 semaines.',                               date: '26. Jan 2026' },
    { id: 'v9',  name: 'Gaia F.',        country: '🇮🇹', rating: 5, comment: 'Ottima qualità, ben tollerati. Energia aumentata sin dalla prima settimana. Confezione discreta.',                                        date: '6. Feb 2026' },
    { id: 'v10', name: 'Erik L.',        country: '🇸🇪', rating: 4, comment: 'Good vitamin complex. Bio-available form, no stomach issues. Will reorder when finished.',                                                 date: '20. Jan 2026' },
  ],

  'Pre-Workout': [
    { id: 'pw1', name: 'Sven K.',        country: '🇩🇪', rating: 5, comment: 'Enormer Energieschub ohne Crash danach. Fokus während des Trainings deutlich verbessert. Top!',                                          date: '16. Jan 2026' },
    { id: 'pw2', name: 'Radosław M.',    country: '🇵🇱', rating: 5, comment: 'Niesamowity zastrzyk energii! Trening na zdecydowanie wyższym poziomie. Fokus i siła na maksa.',                                        date: '30. Jan 2026' },
    { id: 'pw3', name: 'Lucas P.',       country: '🇫🇷', rating: 5, comment: 'Boost d\'énergie impressionnant, concentration maximale pendant l\'entraînement. Pas d\'effet crash.',                                  date: '12. Feb 2026' },
    { id: 'pw4', name: 'Davide C.',      country: '🇮🇹', rating: 4, comment: 'Ottimo pre-workout, energia immediata e focus elevato. Nessun crash post-allenamento.',                                                   date: '4. Feb 2026' },
    { id: 'pw5', name: 'Ryan M.',        country: '🇬🇧', rating: 5, comment: 'Best pre-workout I\'ve used. Clean energy, great pump, no jitters. Fast delivery.',                                                       date: '22. Jan 2026' },
    { id: 'pw6', name: 'Markus T.',      country: '🇩🇪', rating: 5, comment: 'Bester Pre-Workout den ich je verwendet habe. Pump ist sensationell, Fokus auf einem anderen Level.',                                    date: '8. Feb 2026' },
    { id: 'pw7', name: 'Bartosz F.',     country: '🇵🇱', rating: 4, comment: 'Bardzo dobry pre-workout, energia utrzymuje się przez cały trening. Zdecydowanie polecam.',                                              date: '25. Jan 2026' },
    { id: 'pw8', name: 'Florian D.',     country: '🇫🇷', rating: 5, comment: 'Excellent produit, énergie intense et soutenue. Pompe musculaire extraordinaire.',                                                        date: '15. Feb 2026' },
    { id: 'pw9', name: 'Riccardo M.',    country: '🇮🇹', rating: 5, comment: 'Pre-workout fantastico! Energia esplosiva, pompa muscolare eccellente. Lo consiglio vivamente.',                                          date: '9. Jan 2026' },
  ],

  'Fat Burners': [
    { id: 'fb1', name: 'Petra S.',       country: '🇩🇪', rating: 5, comment: 'Deutliche Unterstützung beim Kaloriendefizit. Kein Zittern, gute Energie und unterdrückter Hunger.',                                    date: '11. Jan 2026' },
    { id: 'fb2', name: 'Natalia W.',     country: '🇵🇱', rating: 4, comment: 'Dobry fat burner, znaczna poprawa energii i redukcja apetytu. Polecam jako wsparcie diety.',                                             date: '26. Jan 2026' },
    { id: 'fb3', name: 'Céline B.',      country: '🇫🇷', rating: 5, comment: 'Excellent brûleur de graisses. Énergie soutenue tout au long de la journée, appétit réduit.',                                           date: '8. Feb 2026' },
    { id: 'fb4', name: 'Federica R.',    country: '🇮🇹', rating: 4, comment: 'Buon bruciagrassi, energia elevata e appetito ridotto. Ottimo come supporto alla dieta.',                                                date: '1. Feb 2026' },
    { id: 'fb5', name: 'Lars H.',        country: '🇩🇪', rating: 5, comment: 'Sehr effektiver Fat Burner. Fettabbau deutlich beschleunigt ohne Muskelverlust. Klare Empfehlung.',                                     date: '17. Feb 2026' },
    { id: 'fb6', name: 'Ewelina K.',     country: '🇵🇱', rating: 5, comment: 'Rewelacyjny produkt! Apetyt zdecydowanie zmniejszony, energia na świetnym poziomie cały dzień.',                                        date: '3. Feb 2026' },
    { id: 'fb7', name: 'Anaïs G.',       country: '🇫🇷', rating: 4, comment: 'Bon fat burner, effet thermogénique notable. Énergie stable, sans nervosité excessive.',                                                 date: '20. Jan 2026' },
    { id: 'fb8', name: 'Martina C.',     country: '🇮🇹', rating: 5, comment: 'Ottimo bruciagrassi, termogenesi elevata. Energia sostenuta senza nervosismo. Ottimi risultati.',                                        date: '13. Feb 2026' },
  ],

  Joints: [
    { id: 'j1',  name: 'Horst W.',       country: '🇩🇪', rating: 5, comment: 'Knieschmerzen nach 4 Wochen deutlich reduziert. Mobilität spürbar verbessert. Sehr empfehlenswert.',                                    date: '7. Jan 2026' },
    { id: 'j2',  name: 'Zbigniew P.',    country: '🇵🇱', rating: 5, comment: 'Po 4 tygodniach bóle stawów wyraźnie zmniejszone. Mobilność poprawiona. Zdecydowanie polecam.',                                         date: '22. Jan 2026' },
    { id: 'j3',  name: 'Patrice M.',     country: '🇫🇷', rating: 4, comment: 'Bonne formulation pour les articulations. Douleurs réduites après 3 semaines. Mobilité améliorée.',                                    date: '5. Feb 2026' },
    { id: 'j4',  name: 'Antonio L.',     country: '🇮🇹', rating: 5, comment: 'Ottima formula per le articolazioni. Dolori ridotti notevolmente dopo 3 settimane di utilizzo.',                                        date: '16. Feb 2026' },
    { id: 'j5',  name: 'Peter F.',       country: '🇩🇪', rating: 5, comment: 'Gelenkschmerzen deutlich besser nach 3 Wochen. Trainiere wieder schmerzfrei. Fantastisches Produkt.',                                   date: '28. Jan 2026' },
    { id: 'j6',  name: 'Stanisław M.',   country: '🇵🇱', rating: 4, comment: 'Dobry suplement na stawy. Po 3 tygodniach wyraźna poprawa. Polecam dla aktywnych sportowców.',                                         date: '11. Feb 2026' },
    { id: 'j7',  name: 'Bernard T.',     country: '🇫🇷', rating: 5, comment: 'Excellent pour les articulations. Après 4 semaines, je cours à nouveau sans douleur. Très efficace.',                                  date: '25. Jan 2026' },
    { id: 'j8',  name: 'Giuseppe R.',    country: '🇮🇹', rating: 4, comment: 'Buona formula, dolori articolari ridotti dopo 4 settimane. Qualità farmaceutica garantita.',                                            date: '9. Feb 2026' },
  ],

  Sleep: [
    { id: 'sl1', name: 'Gunnar F.',      country: '🇩🇪', rating: 5, comment: 'Einschlafzeit halbiert, Schlafqualität deutlich verbessert. Morgens erholt und leistungsfähig.',                                         date: '9. Jan 2026' },
    { id: 'sl2', name: 'Agata S.',       country: '🇵🇱', rating: 5, comment: 'Czas zasypiania skrócony o połowę. Jakość snu wyraźnie poprawiona. Wstaję wypoczęty i pełen energii.',                                  date: '23. Jan 2026' },
    { id: 'sl3', name: 'Benoît C.',      country: '🇫🇷', rating: 4, comment: 'Formule efficace pour le sommeil. S\'endort en 15 minutes au lieu d\'une heure. Récupération améliorée.',                              date: '6. Feb 2026' },
    { id: 'sl4', name: 'Simone F.',      country: '🇮🇹', rating: 5, comment: 'Ottima formula per il sonno. Mi addormento in 10 minuti, mi sveglio riposato. Recupero muscolare migliorato.',                          date: '19. Feb 2026' },
    { id: 'sl5', name: 'Joachim K.',     country: '🇩🇪', rating: 5, comment: 'Schlaf deutlich tiefer und erholsamer. Muskelregeneration verbessert. Morgens voller Energie.',                                         date: '14. Feb 2026' },
    { id: 'sl6', name: 'Małgorzata W.',  country: '🇵🇱', rating: 4, comment: 'Świetny produkt na sen! Zasypianie znacznie szybsze, sen głęboki i regenerujący.',                                                      date: '31. Jan 2026' },
    { id: 'sl7', name: 'Gilles D.',      country: '🇫🇷', rating: 5, comment: 'Excellent pour améliorer la qualité du sommeil. Endormissement rapide, réveil frais et dispos.',                                        date: '17. Jan 2026' },
    { id: 'sl8', name: 'Elisa M.',       country: '🇮🇹', rating: 5, comment: 'Prodotto fantastico per il sonno. Mi addormento rapidamente e mi sveglio rigenerata. Perfetto per atleti.',                             date: '4. Feb 2026' },
  ],
};

export const DEFAULT_REVIEWS: Review[] = [
  { id: 'd1', name: 'Marcus W.',    country: '🇩🇪', rating: 5, comment: 'Ausgezeichnete Qualität, schnelle Lieferung. Werde definitiv wieder bestellen.',                      date: '15. Jan 2026' },
  { id: 'd2', name: 'Anna K.',      country: '🇵🇱', rating: 5, comment: 'Najlepsza jakość w tej cenie w Europie. Dostawa dyskretna i ekspresowa. Polecam!',                   date: '28. Jan 2026' },
  { id: 'd3', name: 'Luca B.',      country: '🇮🇹', rating: 4, comment: 'Buon prodotto, arrivato in perfette condizioni. Confezionamento discreto. Riacquisterei.',            date: '10. Feb 2026' },
  { id: 'd4', name: 'Claire M.',    country: '🇫🇷', rating: 5, comment: 'Excellent produit, livraison rapide et discrète en France. Très satisfaite.',                        date: '5. Feb 2026' },
  { id: 'd5', name: 'Johan V.',     country: '🇳🇱', rating: 5, comment: 'Top kwaliteit product, snelle discrete levering. Zeker de beste prijs in Europa.',                  date: '20. Jan 2026' },
  { id: 'd6', name: 'Bartosz K.',   country: '🇵🇱', rating: 5, comment: 'Fantastyczny produkt, błyskawiczna dostawa. Jakość farmaceutyczna potwierdzona. Polecam!',           date: '8. Feb 2026' },
  { id: 'd7', name: 'Sarah M.',     country: '🇩🇪', rating: 4, comment: 'Gute Qualität, diskrete Lieferung. Produkt entspricht genau der Beschreibung. Gerne wieder.',        date: '16. Feb 2026' },
  { id: 'd8', name: 'Lorenzo F.',   country: '🇮🇹', rating: 5, comment: 'Qualità eccellente, spedizione rapida e discreta. Prodotto conforme alla descrizione.',              date: '3. Feb 2026' },
  { id: 'd9', name: 'Julien P.',    country: '🇫🇷', rating: 4, comment: 'Bonne qualité, livraison discrète. Produit conforme à la description. Je recommande.',              date: '22. Jan 2026' },
  { id: 'd10',name: 'Erik S.',      country: '🇸🇪', rating: 5, comment: 'Great product, fast discreet delivery to Sweden. Quality matches description perfectly.',           date: '11. Feb 2026' },
];

export function getReviewsForCategory(category: string): Review[] {
  return REVIEWS_BY_CATEGORY[category] ?? DEFAULT_REVIEWS;
}
