import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/product/AddToCartButton';
import { PRODUCTS, CATEGORIES_NAV } from '@/lib/products';
import { getTranslations } from 'next-intl/server';
import SidebarCategories from '@/components/products/SidebarCategories';
import ProductsToolbar from '@/components/products/ProductsToolbar';
import WishlistButton from '@/components/product/WishlistButton';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; sub?: string; brand?: string; sort?: string; search?: string; promo?: string; price?: string }>;
}

export async function generateMetadata({ params, searchParams }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { category } = await searchParams;

  const CAT_META: Record<string, Record<string, { title: string; description: string }>> = {
    aas: {
      en: { title: 'Buy Anabolic Steroids Online Europe — AAS Shop | PharmaForce', description: 'Pharmaceutical-grade injectable and oral anabolic steroids. Testosterone, Trenbolone, Dianabol, Anavar, Deca-Durabolin. Discreet EU delivery.' },
      de: { title: 'Anabole Steroide online kaufen Europa — AAS Shop | PharmaForce', description: 'Pharmazeutische injizierbare und orale anabole Steroide. Testosteron, Trenbolon, Dianabol, Anavar, Deca-Durabolin. Diskreter EU-Versand.' },
      fr: { title: 'Acheter des stéroïdes anabolisants en ligne Europe — AAS | PharmaForce', description: 'Stéroïdes anabolisants injectables et oraux de qualité pharmaceutique. Testostérone, Trenbolone, Dianabol, Anavar. Livraison discrète UE.' },
      es: { title: 'Comprar esteroides anabólicos online Europa — AAS | PharmaForce', description: 'Esteroides anabólicos inyectables y orales de grado farmacéutico. Testosterona, Trembolona, Dianabol, Anavar. Envío discreto en la UE.' },
      pl: { title: 'Kup sterydy anaboliczne online Europa — AAS | PharmaForce', description: 'Farmaceutyczne sterydy anaboliczne iniekcyjne i doustne. Testosteron, Trenbolon, Dianabol, Anavar. Dyskretna dostawa w UE.' },
      it: { title: 'Comprare steroidi anabolizzanti online Europa — AAS | PharmaForce', description: 'Steroidi anabolizzanti iniettabili e orali di qualità farmaceutica. Testosterone, Trenbolone, Dianabol, Anavar. Spedizione discreta UE.' },
    },
    peptides: {
      en: { title: 'Buy Peptides & HGH Online Europe — Somatropin, IGF-1 | PharmaForce', description: 'Pharmaceutical-grade growth hormone, peptides and secretagogues. Somatropin HGH, Ipamorelin, CJC-1295, GHRP-6. Fast EU shipping.' },
      de: { title: 'Peptide & HGH online kaufen Europa — Somatropin, IGF-1 | PharmaForce', description: 'Pharmazeutisches Wachstumshormon, Peptide und Sekretagoga. Somatropin HGH, Ipamorelin, CJC-1295, GHRP-6. Schneller EU-Versand.' },
      fr: { title: 'Acheter peptides & HGH en ligne Europe — Somatropine | PharmaForce', description: 'Hormone de croissance, peptides et sécrétagogues de qualité pharmaceutique. Somatropine, Ipamorelin, CJC-1295. Livraison rapide UE.' },
      es: { title: 'Comprar péptidos y HGH online Europa — Somatropina | PharmaForce', description: 'Hormona de crecimiento, péptidos y secretagogos de grado farmacéutico. Somatropina, Ipamorelina, CJC-1295. Envío rápido en la UE.' },
      pl: { title: 'Kup peptydy i HGH online Europa — Somatropina | PharmaForce', description: 'Farmaceutyczny hormon wzrostu, peptydy i sekretogogi. Somatropina HGH, Ipamorelin, CJC-1295. Szybka dostawa w UE.' },
      it: { title: 'Comprare peptidi e HGH online Europa — Somatropina | PharmaForce', description: 'Ormone della crescita, peptidi e secretagoghi di qualità farmaceutica. Somatropina, Ipamorelin, CJC-1295. Spedizione rapida UE.' },
    },
    modulators: {
      en: { title: 'Buy SARMs, PCT & AI Online Europe — Ostarine, Nolvadex | PharmaForce', description: 'SARMs, aromatase inhibitors and PCT medications. Ostarine, RAD-140, Ligandrol, Anastrozole, Tamoxifen, Clomid. Pharmaceutical grade, EU delivery.' },
      de: { title: 'SARMs, PCT & AI online kaufen Europa — Ostarine, Nolvadex | PharmaForce', description: 'SARMs, Aromatasehemmer und PCT-Medikamente. Ostarine, RAD-140, Ligandrol, Anastrozol, Tamoxifen, Clomid. EU-Lieferung.' },
      fr: { title: 'Acheter SARMs, PCT & AI en ligne Europe — Ostarine | PharmaForce', description: 'SARMs, inhibiteurs de l\'aromatase et PCT. Ostarine, RAD-140, Ligandrol, Anastrozole, Tamoxifène. Livraison UE.' },
      es: { title: 'Comprar SARMs, PCT y AI online Europa — Ostarine | PharmaForce', description: 'SARMs, inhibidores de aromatasa y medicamentos PCT. Ostarine, RAD-140, Ligandrol, Anastrozol, Tamoxifeno. Envío UE.' },
      pl: { title: 'Kup SARMs, PCT i AI online Europa — Ostarine | PharmaForce', description: 'SARMs, inhibitory aromatazy i leki PCT. Ostarine, RAD-140, Ligandrol, Anastrozol, Tamoksyfen. Dostawa w UE.' },
      it: { title: 'Comprare SARMs, PCT e AI online Europa — Ostarine | PharmaForce', description: 'SARMs, inibitori dell\'aromatasi e farmaci PCT. Ostarine, RAD-140, Ligandrol, Anastrozolo, Tamoxifene. Spedizione UE.' },
    },
    'womens-health': {
      en: { title: 'Buy Women\'s Health Medications Online — GLP-1, Hair Growth | PharmaForce', description: 'Wegovy, Mounjaro, Saxenda weight loss injections. Hair growth, hormone therapy. Discreet EU delivery.' },
      de: { title: 'Frauengesundheit online kaufen — GLP-1, Haarwuchs | PharmaForce', description: 'Wegovy, Mounjaro, Saxenda Abnehmspritzen. Haarwuchsmittel, Hormontherapie. Diskreter EU-Versand.' },
      fr: { title: 'Santé féminine en ligne — GLP-1, Croissance capillaire | PharmaForce', description: 'Wegovy, Mounjaro, Saxenda injections pour perte de poids. Croissance capillaire, thérapie hormonale. Livraison UE.' },
      es: { title: 'Salud femenina online — GLP-1, Crecimiento capilar | PharmaForce', description: 'Wegovy, Mounjaro, Saxenda inyecciones para pérdida de peso. Crecimiento capilar, terapia hormonal. Envío discreto UE.' },
      pl: { title: 'Zdrowie kobiet online — GLP-1, Wzrost włosów | PharmaForce', description: 'Wegovy, Mounjaro, Saxenda zastrzyki na odchudzanie. Wzrost włosów, terapia hormonalna. Dyskretna dostawa UE.' },
      it: { title: 'Salute femminile online — GLP-1, Crescita capelli | PharmaForce', description: 'Wegovy, Mounjaro, Saxenda iniezioni per perdita di peso. Crescita capelli, terapia ormonale. Spedizione discreta UE.' },
    },
    protein: {
      en: { title: 'Buy Protein Supplements Europe — Whey, Isolate, Casein | PharmaForce', description: 'Premium whey protein, isolate and casein from Optimum Nutrition, BSN, Balkan. Best prices with fast EU delivery.' },
      de: { title: 'Proteinpulver kaufen Europa — Whey, Isolat, Casein | PharmaForce', description: 'Premium Whey Protein, Isolat und Casein von Optimum Nutrition, BSN, Balkan. Beste Preise, schneller EU-Versand.' },
      fr: { title: 'Acheter protéines en Europe — Whey, Isolat, Caséine | PharmaForce', description: 'Protéine whey, isolat et caséine premium d\'Optimum Nutrition, BSN, Balkan. Meilleurs prix, livraison rapide UE.' },
      es: { title: 'Comprar proteínas en Europa — Whey, Aislado, Caseína | PharmaForce', description: 'Proteína whey, aislado y caseína premium de Optimum Nutrition, BSN, Balkan. Mejores precios, envío rápido UE.' },
      pl: { title: 'Kup białko w Europie — Whey, Izolat, Kazeina | PharmaForce', description: 'Premium białko serwatkowe, izolat i kazeina od Optimum Nutrition, BSN, Balkan. Najlepsze ceny, szybka dostawa w UE.' },
      it: { title: 'Comprare proteine in Europa — Whey, Isolato, Caseina | PharmaForce', description: 'Proteine whey, isolato e caseina premium da Optimum Nutrition, BSN, Balkan. Migliori prezzi, spedizione rapida UE.' },
    },
    antidepressants: {
      en: { title: 'Buy Antidepressants Online Europe | PharmaForce', description: 'Pharmaceutical-grade antidepressants. Discreet EU delivery. Verified quality.' },
      de: { title: 'Antidepressiva online kaufen Europa | PharmaForce', description: 'Pharmazeutische Antidepressiva. Diskreter EU-Versand. Geprüfte Qualität.' },
      fr: { title: 'Acheter antidépresseurs en ligne Europe | PharmaForce', description: 'Antidépresseurs de qualité pharmaceutique. Livraison discrète UE.' },
      es: { title: 'Comprar antidepresivos online Europa | PharmaForce', description: 'Antidepresivos de grado farmacéutico. Envío discreto en la UE.' },
      pl: { title: 'Kup antydepresanty online Europa | PharmaForce', description: 'Farmaceutyczne antydepresanty. Dyskretna dostawa w UE.' },
      it: { title: 'Comprare antidepressivi online Europa | PharmaForce', description: 'Antidepressivi di qualità farmaceutica. Spedizione discreta UE.' },
    },
    creatine: {
      en: { title: 'Buy Creatine Supplements Online Europe — Monohydrate, Kre-Alkalyn | PharmaForce', description: 'Micronized creatine monohydrate and Kre-Alkalyn from Optimum Nutrition, BSN, Balkan. Best prices with fast EU delivery.' },
      de: { title: 'Kreatin online kaufen Europa — Monohydrat, Kre-Alkalyn | PharmaForce', description: 'Mikronisiertes Kreatin-Monohydrat und Kre-Alkalyn von Optimum Nutrition, BSN, Balkan. Beste Preise, schneller EU-Versand.' },
      fr: { title: 'Acheter créatine en Europe — Monohydrate, Kre-Alkalyn | PharmaForce', description: 'Créatine monohydrate micronisée et Kre-Alkalyn d\'Optimum Nutrition, BSN, Balkan. Meilleurs prix, livraison rapide UE.' },
      es: { title: 'Comprar creatina en Europa — Monohidrato, Kre-Alkalyn | PharmaForce', description: 'Creatina monohidrato micronizada y Kre-Alkalyn de Optimum Nutrition, BSN, Balkan. Mejores precios, envío rápido UE.' },
      pl: { title: 'Kup kreatynę w Europie — Monohydrat, Kre-Alkalyn | PharmaForce', description: 'Mikronizowany monohydrat kreatyny i Kre-Alkalyn od Optimum Nutrition, BSN, Balkan. Najlepsze ceny, szybka dostawa UE.' },
      it: { title: 'Comprare creatina in Europa — Monoidrato, Kre-Alkalyn | PharmaForce', description: 'Creatina monoidrato micronizzata e Kre-Alkalyn da Optimum Nutrition, BSN, Balkan. Migliori prezzi, spedizione rapida UE.' },
    },
    'amino-acids': {
      en: { title: 'Buy Amino Acids & BCAA Online Europe — EAA, Glutamine | PharmaForce', description: 'Essential amino acids, BCAA, glutamine and electrolyte supplements. Optimum Nutrition, Balkan, Now Sports. Fast EU delivery.' },
      de: { title: 'Aminosäuren & BCAA online kaufen Europa — EAA, Glutamin | PharmaForce', description: 'Essentielle Aminosäuren, BCAA, Glutamin und Elektrolyte. Optimum Nutrition, Balkan, Now Sports. Schneller EU-Versand.' },
      fr: { title: 'Acheter acides aminés & BCAA en Europe — EAA, Glutamine | PharmaForce', description: 'Acides aminés essentiels, BCAA, glutamine et électrolytes. Optimum Nutrition, Balkan, Now Sports. Livraison rapide UE.' },
      es: { title: 'Comprar aminoácidos y BCAA en Europa — EAA, Glutamina | PharmaForce', description: 'Aminoácidos esenciales, BCAA, glutamina y electrolitos. Optimum Nutrition, Balkan, Now Sports. Envío rápido UE.' },
      pl: { title: 'Kup aminokwasy i BCAA w Europie — EAA, Glutamina | PharmaForce', description: 'Niezbędne aminokwasy, BCAA, glutamina i elektrolity. Optimum Nutrition, Balkan, Now Sports. Szybka dostawa UE.' },
      it: { title: 'Comprare aminoacidi e BCAA in Europa — EAA, Glutammina | PharmaForce', description: 'Aminoacidi essenziali, BCAA, glutammina ed elettroliti. Optimum Nutrition, Balkan, Now Sports. Spedizione rapida UE.' },
    },
    'sexual-health': {
      en: { title: 'Buy ED Medications & Sexual Health Online Europe — Cialis, Viagra | PharmaForce', description: 'Cialis, Viagra, Levitra, Kamagra and hormonal support. Original brands and trusted generics. Discreet EU delivery.' },
      de: { title: 'Potenzmittel & Sexuelle Gesundheit online kaufen — Cialis, Viagra | PharmaForce', description: 'Cialis, Viagra, Levitra, Kamagra und hormonelle Unterstützung. Originale Marken, diskreter EU-Versand.' },
      fr: { title: 'Acheter médicaments ED & santé sexuelle — Cialis, Viagra | PharmaForce', description: 'Cialis, Viagra, Levitra, Kamagra et support hormonal. Marques originales, livraison discrète UE.' },
      es: { title: 'Comprar medicamentos para DE y salud sexual — Cialis, Viagra | PharmaForce', description: 'Cialis, Viagra, Levitra, Kamagra y soporte hormonal. Marcas originales, envío discreto UE.' },
      pl: { title: 'Kup leki na ED i zdrowie seksualne — Cialis, Viagra | PharmaForce', description: 'Cialis, Viagra, Levitra, Kamagra i wsparcie hormonalne. Oryginalne marki, dyskretna dostawa UE.' },
      it: { title: 'Comprare farmaci per DE e salute sessuale — Cialis, Viagra | PharmaForce', description: 'Cialis, Viagra, Levitra, Kamagra e supporto ormonale. Marchi originali, spedizione discreta UE.' },
    },
    'anti-aging': {
      en: { title: 'Buy Anti-Aging Supplements & Peptides Online Europe — NMN, Rapamycin | PharmaForce', description: 'NMN, rapamycin, tretinoin, epithalon and longevity peptides. Pharmaceutical-grade anti-aging products with EU delivery.' },
      de: { title: 'Anti-Aging Supplements & Peptide online kaufen — NMN, Rapamycin | PharmaForce', description: 'NMN, Rapamycin, Tretinoin, Epithalon und Langlebigkeitspeptide. Pharmazeutische Anti-Aging-Produkte mit EU-Versand.' },
      fr: { title: 'Acheter anti-âge & peptides en Europe — NMN, Rapamycine | PharmaForce', description: 'NMN, rapamycine, trétinoïne, épithalon et peptides de longévité. Produits anti-âge pharmaceutiques, livraison UE.' },
      es: { title: 'Comprar anti-envejecimiento y péptidos en Europa — NMN, Rapamicina | PharmaForce', description: 'NMN, rapamicina, tretinoína, epitalón y péptidos de longevidad. Productos anti-envejecimiento farmacéuticos, envío UE.' },
      pl: { title: 'Kup suplementy anti-aging i peptydy — NMN, Rapamycyna | PharmaForce', description: 'NMN, rapamycyna, tretynoina, epitalon i peptydy długowieczności. Farmaceutyczne produkty anti-aging, dostawa UE.' },
      it: { title: 'Comprare anti-aging e peptidi in Europa — NMN, Rapamicina | PharmaForce', description: 'NMN, rapamicina, tretinoina, epitalon e peptidi di longevità. Prodotti anti-aging farmaceutici, spedizione UE.' },
    },
  };

  const DEFAULT_META: Record<string, { title: string; description: string }> = {
    en: { title: 'Buy Sports Supplements & Pharmaceuticals Online Europe | PharmaForce', description: 'Browse 100+ pharmaceutical-grade products: steroids, peptides, SARMs, GLP-1, women\'s health. Fast discreet EU delivery.' },
    de: { title: 'Sportnahrung & Pharmazeutika online kaufen Europa | PharmaForce', description: '100+ pharmazeutische Produkte: Steroide, Peptide, SARMs, GLP-1, Frauengesundheit. Schneller diskreter EU-Versand.' },
    fr: { title: 'Suppléments sportifs & pharmaceutiques en ligne Europe | PharmaForce', description: '100+ produits pharmaceutiques : stéroïdes, peptides, SARMs, GLP-1, santé féminine. Livraison discrète UE.' },
    es: { title: 'Comprar suplementos deportivos y farmacéuticos online Europa | PharmaForce', description: '100+ productos de grado farmacéutico: esteroides, péptidos, SARMs, GLP-1, salud femenina. Envío discreto en la UE.' },
    pl: { title: 'Suplementy sportowe i farmaceutyki online Europa | PharmaForce', description: '100+ produktów farmaceutycznych: sterydy, peptydy, SARMs, GLP-1, zdrowie kobiet. Szybka dyskretna dostawa w UE.' },
    it: { title: 'Integratori sportivi e farmaceutici online Europa | PharmaForce', description: '100+ prodotti farmaceutici: steroidi, peptidi, SARMs, GLP-1, salute femminile. Spedizione discreta UE.' },
  };

  const catMeta = category ? CAT_META[category]?.[locale] ?? CAT_META[category]?.en ?? null : null;
  const fallback = DEFAULT_META[locale] ?? DEFAULT_META.en;

  return {
    title: catMeta?.title ?? fallback.title,
    description: catMeta?.description ?? fallback.description,
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/products${category ? `?category=${category}` : ''}`,
      languages: {
        ...Object.fromEntries(
          ['en', 'de', 'pl', 'fr', 'it', 'es'].map((l) => [
            l,
            `https://pharmaforce-store.com/${l}/products${category ? `?category=${category}` : ''}`,
          ])
        ),
        'x-default': `https://pharmaforce-store.com/en/products${category ? `?category=${category}` : ''}`,
      },
    },
    openGraph: {
      title: catMeta?.title ?? fallback.title,
      description: catMeta?.description ?? fallback.description,
      url: `https://pharmaforce-store.com/${locale}/products${category ? `?category=${category}` : ''}`,
      siteName: 'PharmaForce',
      images: [{ url: 'https://pharmaforce-store.com/hero-athletes.png', width: 1200, height: 630, alt: 'PharmaForce Products' }],
      type: 'website',
    },
  };
}

const BADGE_COLORS: Record<string, string> = {
  'BESTSELLER': 'bg-brand text-dark',
  'TOP RATED':  'bg-success text-white',
};

const AAS_SUB_KEYS = ['injections', 'tablets'];
const PEPTIDES_SUB_KEYS = ['secretagogues', 'hormones'];
const MODULATORS_SUB_KEYS = ['sarms', 'aromatase-inhibitors', 'serms', 'metabolic'];
const WOMENS_SUB_KEYS = ['weight-loss', 'hair-growth', 'anti-hirsutism', 'skin-health', 'hormone-therapy'];
const SEXUAL_HEALTH_SUB_KEYS = ['ed-medications', 'hormonal-support', 'sh-peptides'];
const ANTI_AGING_SUB_KEYS = ['skin', 'longevity', 'aa-peptides'];


export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params;
  const { category, sub, brand, sort, search, promo, price } = await searchParams;
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const tSub = await getTranslations({ locale, namespace: 'subcategories' });
  const tP = await getTranslations({ locale, namespace: 'products' });

  const isAAS          = category === 'aas';
  const isPeptides     = category === 'peptides';
  const isModulators   = category === 'modulators';
  const isWomens       = category === 'womens-health';
  const isSexualHealth = category === 'sexual-health';
  const isAntiAging    = category === 'anti-aging';
  const isPromo        = promo === 'true';

  const PRICE_RANGES: Record<string, [number, number]> = {
    '0-20':  [0,  20],
    '20-40': [20, 40],
    '40-60': [40, 60],
    '60+':   [60, Infinity],
  };

  /* filter */
  const filtered = PRODUCTS.filter((p) => {
    if (isPromo) return p.badge === 'BUY 2 GET 3rd FREE';
    const catMatch = !category || category === 'all'
      || p.category.toLowerCase().replace(/\s+/g, '-') === category;
    const subMatch = !sub || p.subcategory.toLowerCase() === sub;
    const brandMatch = !brand
      || p.brand.toLowerCase().replace(/\s+/g, '-') === brand;
    const searchMatch = !search
      || p.name.toLowerCase().includes(search.toLowerCase())
      || p.brand.toLowerCase().includes(search.toLowerCase());
    const priceRange = price ? PRICE_RANGES[price] : null;
    const priceMatch = !priceRange || (p.price >= priceRange[0] && p.price < priceRange[1]);
    return catMatch && subMatch && brandMatch && searchMatch && priceMatch;
  });

  /* sort */
  const getPromoOrder = (p: typeof filtered[0]) => {
    const cat = p.category.toLowerCase();
    const sub = p.subcategory.toLowerCase();
    if (cat === 'protein' || cat === 'creatine' || cat === 'amino acids') return 0;
    if (cat === 'aas' && sub === 'tablets') return 1;
    if (cat === 'aas' && sub === 'injections') return 2;
    return 3;
  };

  const getAllOrder = (p: typeof filtered[0]) => {
    const cat = p.category.toLowerCase();
    if (cat === 'protein')      return 0;
    if (cat === 'creatine')     return 1;
    if (cat === 'amino acids')  return 2;
    return 3;
  };

  const sorted = [...filtered].sort((a, b) => {
    if (isPromo) return getPromoOrder(a) - getPromoOrder(b);
    if (sort === 'price-asc')  return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating')     return b.rating - a.rating;
    if (!category || category === 'all') {
      const order = getAllOrder(a) - getAllOrder(b);
      if (order !== 0) return order;
    }
    return b.reviews - a.reviews;
  });

  /* count helpers */
  const catCount = (key: string) =>
    key === 'all' ? PRODUCTS.length
      : PRODUCTS.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === key).length;

  const subCount = (s: string, cat: string) =>
    PRODUCTS.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === cat && p.subcategory?.toLowerCase() === s).length;

  return (
    <div>

      {/* ─── Promo Page Banner ─── */}
      {isPromo && (
        <div className="relative bg-gradient-to-r from-brand/20 via-brand/10 to-brand/20 border-b border-brand/30 overflow-hidden py-10 px-6 text-center">
          <div className="text-5xl mb-3">🎁</div>
          <h1 className="text-3xl font-bold text-white mb-2">Buy 2 — Get 3rd FREE</h1>
          <p className="text-muted text-sm max-w-md mx-auto">
            {filtered.length} products are part of this promotion. Add any 3 — pay for 2. Discount applied automatically at checkout.
          </p>
        </div>
      )}

      {/* ─── Page Banner ─── */}
      {!isPromo && <div className="relative bg-gradient-to-r from-dark via-surface to-dark border-b border-border overflow-hidden min-h-[180px]">
        {/* Background fitness images */}
        <div className="absolute inset-0 flex">
          <div className="absolute right-0 top-0 h-full w-[55%] flex">
            <div className="relative flex-1 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=85"
                alt=""
                fill
                className="object-cover object-center"
                sizes="50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
            </div>
            <div className="relative w-52 overflow-hidden hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=85"
                alt=""
                fill
                className="object-cover object-top"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark/80" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-brand/8 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-brand text-xs font-bold uppercase tracking-widest mb-1">PharmaForce Store</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{tP('title')}</h1>
            <p className="text-muted text-sm max-w-lg">
              {tP('subtitle')}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-brand/80 bg-brand/10 border border-brand/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse inline-block" />
              {tP('badge')}
            </p>
          </div>
          <div className="flex gap-6 shrink-0 relative z-10">
            {[
              { value: '150+', label: tP('stat1') },
              { value: '30+', label: tP('stat2') },
              { value: '100%', label: tP('stat3') },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-extrabold text-brand">{value}</p>
                <p className="text-muted text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>}

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex gap-6">

        {/* ─── SIDEBAR ─── */}
        <aside className="hidden lg:block w-56 shrink-0 space-y-4">

          {/* Categories */}
          <SidebarCategories
            categories={CATEGORIES_NAV}
            counts={Object.fromEntries(CATEGORIES_NAV.map(({ key }) => [key, catCount(key)]))}
            subCounts={Object.fromEntries(
              ['aas', 'peptides', 'modulators', 'womens-health', 'sexual-health', 'anti-aging'].flatMap(cat =>
                ['injections','tablets','secretagogues','hormones','sarms','aromatase-inhibitors','serms','metabolic','weight-loss','hair-growth','anti-hirsutism','skin-health','hormone-therapy','ed-medications','hormonal-support','sh-peptides','skin','longevity','aa-peptides'].map(sk => [
                  `${cat}:${sk}`, subCount(sk, cat)
                ])
              )
            )}
            translations={Object.fromEntries(CATEGORIES_NAV.map(({ key }) => [key, tCat(key as Parameters<typeof tCat>[0])]))}
            subTranslations={{
              injections: tSub('injections'), tablets: tSub('tablets'),
              secretagogues: tSub('secretagogues'), hormones: tSub('hormones'),
              sarms: tSub('sarms'), 'aromatase-inhibitors': tSub('aromatase-inhibitors'),
              serms: tSub('serms'), metabolic: tSub('metabolic'),
              'weight-loss': tSub('weight-loss'), 'hair-growth': tSub('hair-growth'),
              'anti-hirsutism': tSub('anti-hirsutism'), 'skin-health': tSub('skin-health'),
              'hormone-therapy': tSub('hormone-therapy'),
              'ed-medications': tSub('ed-medications'), 'hormonal-support': tSub('hormonal-support'),
              'sh-peptides': tSub('sh-peptides'),
              skin: tSub('skin'), longevity: tSub('longevity'), 'aa-peptides': tSub('aa-peptides'),
            }}
          />


          {/* Price */}
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <span className="text-white font-semibold text-sm">{tP("priceFilter")}</span>
            </div>
            <div className="p-2 space-y-0.5">
              {([
                { key: '0-20',  label: tP('price0_20') },
                { key: '20-40', label: tP('price20_40') },
                { key: '40-60', label: tP('price40_60') },
                { key: '60+',   label: tP('price60plus') },
              ] as { key: string; label: string }[]).map(({ key, label }) => {
                const active = price === key;
                const params = new URLSearchParams();
                if (category) params.set('category', category);
                if (sub) params.set('sub', sub);
                if (sort) params.set('sort', sort);
                if (!active) params.set('price', key);
                const href = `/${locale}/products${params.toString() ? `?${params}` : ''}`;
                return (
                  <Link key={key} href={href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      active ? 'bg-brand/15 text-brand font-semibold' : 'text-muted hover:text-white hover:bg-surface-2'
                    }`}
                  >
                    <span>{label}</span>
                    {active && <span className="text-brand text-[10px]">✕</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ─── MAIN ─── */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <ProductsToolbar
            count={sorted.length}
            currentSort={sort || 'popular'}
            categories={CATEGORIES_NAV}
            counts={Object.fromEntries(CATEGORIES_NAV.map(({ key }) => [key, catCount(key)]))}
            subCounts={Object.fromEntries(
              ['aas', 'peptides', 'modulators', 'womens-health', 'sexual-health', 'anti-aging'].flatMap(cat =>
                ['injections','tablets','secretagogues','hormones','sarms','aromatase-inhibitors','serms','metabolic','weight-loss','hair-growth','anti-hirsutism','skin-health','hormone-therapy','ed-medications','hormonal-support','sh-peptides','skin','longevity','aa-peptides'].map(sk => [
                  `${cat}:${sk}`, subCount(sk, cat)
                ])
              )
            )}
            translations={Object.fromEntries(CATEGORIES_NAV.map(({ key }) => [key, tCat(key as Parameters<typeof tCat>[0])]))}
            subTranslations={{
              injections: tSub('injections'), tablets: tSub('tablets'),
              secretagogues: tSub('secretagogues'), hormones: tSub('hormones'),
              sarms: tSub('sarms'), 'aromatase-inhibitors': tSub('aromatase-inhibitors'),
              serms: tSub('serms'), metabolic: tSub('metabolic'),
              'weight-loss': tSub('weight-loss'), 'hair-growth': tSub('hair-growth'),
              'anti-hirsutism': tSub('anti-hirsutism'), 'skin-health': tSub('skin-health'),
              'hormone-therapy': tSub('hormone-therapy'),
              'ed-medications': tSub('ed-medications'), 'hormonal-support': tSub('hormonal-support'),
              'sh-peptides': tSub('sh-peptides'),
              skin: tSub('skin'), longevity: tSub('longevity'), 'aa-peptides': tSub('aa-peptides'),
            }}
          />

          {/* Women's Health subcategory pills */}
          {isWomens && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=womens-health`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >{tCat('womens-health')}</Link>
              {WOMENS_SUB_KEYS.map((sk) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=womens-health` : `/${locale}/products?category=womens-health&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{tSub(sk as Parameters<typeof tSub>[0])}</Link>
              ))}
            </div>
          )}

          {/* AAS subcategory pills */}
          {isAAS && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=aas`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >{tCat('aas')}</Link>
              {AAS_SUB_KEYS.map((sk) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=aas` : `/${locale}/products?category=aas&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{tSub(sk as Parameters<typeof tSub>[0])}</Link>
              ))}
            </div>
          )}

          {/* Modulators subcategory pills */}
          {isModulators && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=modulators`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >{tCat('modulators')}</Link>
              {MODULATORS_SUB_KEYS.map((sk) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=modulators` : `/${locale}/products?category=modulators&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{tSub(sk as Parameters<typeof tSub>[0])}</Link>
              ))}
            </div>
          )}

          {/* Peptides subcategory pills */}
          {isPeptides && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=peptides`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >{tCat('peptides')}</Link>
              {PEPTIDES_SUB_KEYS.map((sk) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=peptides` : `/${locale}/products?category=peptides&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{tSub(sk as Parameters<typeof tSub>[0])}</Link>
              ))}
            </div>
          )}

          {/* Sexual Health subcategory pills */}
          {isSexualHealth && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=sexual-health`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >{tCat("sexual-health")}</Link>
              {SEXUAL_HEALTH_SUB_KEYS.map((sk) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=sexual-health` : `/${locale}/products?category=sexual-health&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{tSub(sk as Parameters<typeof tSub>[0])}</Link>
              ))}
            </div>
          )}

          {/* Anti-Aging subcategory pills */}
          {isAntiAging && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=anti-aging`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >{tCat("anti-aging")}</Link>
              {ANTI_AGING_SUB_KEYS.map((sk) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=anti-aging` : `/${locale}/products?category=anti-aging&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{tSub(sk as Parameters<typeof tSub>[0])}</Link>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {sorted.map((product) => (
              <div
                key={product.id}
                className="group bg-surface rounded-xl overflow-hidden hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link href={`/${locale}/products/${product.slug}`} className={`relative aspect-square overflow-hidden block ${product.image.includes('-bg') ? '' : 'bg-white'}`}>
                  <Image
                    src={`${product.image}?v=2`}
                    alt={product.name}
                    fill
                    className={`group-hover:scale-105 transition-transform duration-500 ${product.image.includes('-bg') ? 'object-cover' : 'object-contain p-4'}`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />

                  {product.oldPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </div>
                  )}
                  {product.badge && !product.oldPrice && (
                    <div className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded ${BADGE_COLORS[product.badge] ?? 'bg-brand text-dark'}`}>
                      {product.badge}
                    </div>
                  )}

                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                      <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 z-10">
                    <WishlistButton productId={product.id} />
                  </div>
                </Link>

                {/* Info */}
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-brand text-[11px] font-semibold mb-0.5 truncate">{product.brand}</p>

                  <Link href={`/${locale}/products/${product.slug}`}>
                    <h3 className="text-white text-xs font-medium leading-snug mb-2 line-clamp-2 group-hover:text-brand transition-colors min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className={`w-2.5 h-2.5 ${i <= Math.round(product.rating) ? 'fill-brand text-brand' : 'fill-border text-border'}`} />
                      ))}
                    </div>
                    <span className="text-muted text-[10px]">({product.reviews})</span>
                  </div>

                  {product.weight && (
                    <p className="text-muted text-[10px] mb-2">{product.weight}</p>
                  )}

                  <div className="mt-auto flex items-end justify-between gap-1">
                    <div>
                      <p className="text-white font-bold text-base leading-none">{formatPrice(product.price)}</p>
                      {product.oldPrice && (
                        <p className="text-muted text-[11px] line-through">{formatPrice(product.oldPrice)}</p>
                      )}
                    </div>
                    {product.inStock && (
                      <AddToCartButton
                        productId={product.id}
                        productName={product.name}
                        price={product.price}
                        slug={product.slug}
                        image={product.image}
                        category={product.category}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {sorted.length === 0 && (
            <div className="text-center py-20 text-muted">
              <p className="text-lg font-semibold text-white mb-2">{tP("noProductsFound")}</p>
              <Link href={`/${locale}/products`} className="text-brand hover:underline text-sm">
                Clear filters
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
    </div>
  );
}
