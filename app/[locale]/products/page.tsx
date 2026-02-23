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

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; sub?: string; brand?: string; sort?: string; search?: string; promo?: string; price?: string }>;
}

export async function generateMetadata({ params, searchParams }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { category } = await searchParams;

  const CAT_META: Record<string, { title: string; description: string }> = {
    aas: {
      title: 'Buy Anabolic Steroids Online Europe — AAS Shop | PharmaForce',
      description: 'Pharmaceutical-grade injectable and oral anabolic steroids. Testosterone, Trenbolone, Dianabol, Anavar, Deca-Durabolin. Discreet EU delivery. Verified quality.',
    },
    peptides: {
      title: 'Buy Peptides & HGH Online Europe — Somatropin, IGF-1, GHRPs | PharmaForce',
      description: 'Pharmaceutical-grade growth hormone, peptides and secretagogues. Somatropin HGH, Ipamorelin, CJC-1295, GHRP-6, Ibutamoren MK-677. Fast EU shipping.',
    },
    modulators: {
      title: 'Buy SARMs, PCT & AI Online Europe — Ostarine, Nolvadex, Arimidex | PharmaForce',
      description: 'SARMs, aromatase inhibitors and PCT medications. Ostarine, RAD-140, Ligandrol, Anastrozole, Tamoxifen, Clomid. Pharmaceutical grade, EU delivery.',
    },
    'womens-health': {
      title: 'Buy Women\'s Health Medications Online — GLP-1, Hair Growth, HRT | PharmaForce',
      description: 'Wegovy, Mounjaro, Saxenda weight loss injections. Hair growth (Rogaine, Propecia). Hormone therapy (Premarin, Climara). Discreet EU delivery.',
    },
    protein: {
      title: 'Buy Protein Supplements Europe — Whey, Isolate, Casein | PharmaForce',
      description: 'Premium whey protein, isolate and casein from Optimum Nutrition, BSN, Balkan. Best prices with fast delivery across Europe.',
    },
  };

  const meta = category ? (CAT_META[category] ?? null) : null;

  return {
    title: meta?.title ?? 'Buy Sports Supplements & Pharmaceuticals Online Europe | PharmaForce',
    description: meta?.description ?? 'Browse 100+ pharmaceutical-grade products: steroids, peptides, SARMs, GLP-1 weight loss injections, women\'s health. Fast discreet EU delivery.',
    alternates: {
      canonical: `/${locale}/products${category ? `?category=${category}` : ''}`,
    },
  };
}

const BADGE_COLORS: Record<string, string> = {
  'BESTSELLER': 'bg-brand text-dark',
  'TOP RATED':  'bg-success text-white',
};

const AAS_SUBS = [
  { key: 'injections', label: 'Injections' },
  { key: 'tablets',    label: 'Tablets / Capsules' },
];

const PEPTIDES_SUBS = [
  { key: 'secretagogues', label: 'Growth Hormone Stimulants' },
  { key: 'hormones',      label: 'Hormones & Growth Factors' },
];

const MODULATORS_SUBS = [
  { key: 'sarms',                  label: 'SARMs' },
  { key: 'aromatase-inhibitors',   label: 'Aromatase Inhibitors' },
  { key: 'serms',                  label: 'SERMs / PCT' },
  { key: 'metabolic',              label: 'Metabolic Modulators' },
];

const WOMENS_SUBS = [
  { key: 'weight-loss',    label: 'Weight Loss' },
  { key: 'hair-growth',   label: 'Hair Growth' },
  { key: 'anti-hirsutism', label: 'Anti-Hirsutism' },
  { key: 'skin-health',     label: 'Skin Health' },
  { key: 'hormone-therapy', label: 'Hormone Therapy' },
];

const SEXUAL_HEALTH_SUBS = [
  { key: 'ed-medications',   label: 'ED Medications' },
  { key: 'hormonal-support', label: 'Hormonal Support' },
  { key: 'sh-peptides',      label: 'Peptides' },
];

const ANTI_AGING_SUBS = [
  { key: 'skin',        label: 'Skin Rejuvenation' },
  { key: 'longevity',   label: 'Longevity' },
  { key: 'aa-peptides', label: 'Anti-Aging Peptides' },
];


export default async function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const { locale } = await params;
  const { category, sub, brand, sort, search, promo, price } = await searchParams;
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const tSub = await getTranslations({ locale, namespace: 'subcategories' });

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

  const brandCount = (b: string) =>
    PRODUCTS.filter(p => p.brand === b).length;

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
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">All Products</h1>
            <p className="text-muted text-sm max-w-lg">
              Pharmaceutical-grade supplements, AAS, peptides and performance modulators — discreet delivery straight to your door across Europe.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-xs text-brand/80 bg-brand/10 border border-brand/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse inline-block" />
              No prescription required · Everything available for order
            </p>
          </div>
          <div className="flex gap-6 shrink-0 relative z-10">
            {[
              { value: '120+', label: 'Products' },
              { value: '30+', label: 'EU Countries' },
              { value: '100%', label: 'Lab Tested' },
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
              <span className="text-white font-semibold text-sm">Price, €</span>
            </div>
            <div className="p-2 space-y-0.5">
              {([
                { key: '0-20',  label: 'Up to €20' },
                { key: '20-40', label: '€20 – €40' },
                { key: '40-60', label: '€40 – €60' },
                { key: '60+',   label: 'Over €60'  },
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
              {WOMENS_SUBS.map(({ key: sk }) => (
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
              {AAS_SUBS.map(({ key: sk }) => (
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
              {MODULATORS_SUBS.map(({ key: sk }) => (
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
              {PEPTIDES_SUBS.map(({ key: sk }) => (
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
              >Sexual Health</Link>
              {SEXUAL_HEALTH_SUBS.map(({ key: sk, label }) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=sexual-health` : `/${locale}/products?category=sexual-health&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{label}</Link>
              ))}
            </div>
          )}

          {/* Anti-Aging subcategory pills */}
          {isAntiAging && (
            <div className="flex gap-2 mb-5 flex-wrap">
              <Link href={`/${locale}/products?category=anti-aging`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!sub ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
              >Anti-Aging</Link>
              {ANTI_AGING_SUBS.map(({ key: sk, label }) => (
                <Link key={sk} href={sub === sk ? `/${locale}/products?category=anti-aging` : `/${locale}/products?category=anti-aging&sub=${sk}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${sub === sk ? 'bg-brand text-dark' : 'bg-surface border border-border text-muted hover:text-white'}`}
                >{label}</Link>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {sorted.map((product) => (
              <div
                key={product.id}
                className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link href={`/${locale}/products/${product.slug}`} className="relative bg-[#f5f5f5] aspect-square overflow-hidden block">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
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
              <p className="text-lg font-semibold text-white mb-2">No products found</p>
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
