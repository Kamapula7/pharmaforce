import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Star, Package, Truck, Shield } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ProductActions from '@/components/product/ProductActions';
import ProductGallery from '@/components/product/ProductGallery';
import StickyAddToCart from '@/components/product/StickyAddToCart';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import { getTranslations } from 'next-intl/server';

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  const title = `Buy ${product.name} — ${product.brand} | PharmaForce`;
  const description = product.description
    ? product.description.slice(0, 155) + '…'
    : `${product.name} by ${product.brand}. ${formatPrice(product.price)}. Fast discreet delivery across Europe. Pharmaceutical grade.`;

  return {
    title,
    description,
    keywords: [product.name, product.brand, 'buy online europe', 'pharmaceutical grade', 'EU delivery'],
    alternates: {
      canonical: `/${locale}/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://pharmaforce-store.com/${locale}/products/${slug}`,
      images: product.image.startsWith('http')
        ? [{ url: product.image, alt: product.name }]
        : [{ url: `https://pharmaforce-store.com${product.image}`, alt: product.name }],
      type: 'website',
    },
  };
}

const DESCRIPTIONS: Record<string, { desc: string; composition: string; howToUse: string; servings: number }> = {
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
    desc: 'High-performance pre-workout formula combining caffeine, beta-alanine and citrulline malate for explosive energy, intense focus and enhanced pump. Engineered for serious athletes.',
    composition: 'Citrulline Malate 6000mg, Beta-Alanine 3200mg, Creatine Monohydrate 3000mg, Caffeine Anhydrous 200mg, L-Tyrosine 1000mg. Per 10g serving.',
    howToUse: 'Mix 1 scoop (10g) with 300ml cold water 20–30 min before training. Do not exceed 1 serving per day. Avoid in the evening.',
    servings: 30,
  },
  Vitamins: {
    desc: 'Pharmaceutical-grade micronutrient supplement providing optimal daily support for immune function, energy metabolism, bone health and athletic performance.',
    composition: 'Active ingredient as per product label. Produced in GMP-certified facilities. Free of artificial dyes and unnecessary fillers.',
    howToUse: 'Take as directed on label, preferably with a meal for optimal absorption. Consult a physician before use if you have medical conditions.',
    servings: 60,
  },
  'Fat Burners': {
    desc: 'Advanced metabolic support formula combining L-carnitine, thermogenic compounds and metabolism-boosting ingredients to help the body utilise fat as fuel during training.',
    composition: 'Acetyl-L-Carnitine or L-Carnitine Tartrate 1000mg, Green Tea Extract 300mg, Caffeine Anhydrous 150mg (where applicable). Per serving.',
    howToUse: 'Take in the morning on an empty stomach or 30 min before training. Do not take within 6 hours of sleep. Cycle 8 weeks on, 4 weeks off.',
    servings: 30,
  },
  Gainer: {
    desc: 'High-calorie mass gainer providing a blend of fast and slow-digesting proteins with complex carbohydrates. Designed to support muscle growth and accelerate recovery for hard gainers.',
    composition: 'Whey Protein Matrix (Concentrate + Isolate) 50g, Maltodextrin 150g, MCT Oils 5g. Per 210g serving: Protein 50g, Carbohydrates 180g, Fat 6g, Calories 980 kcal.',
    howToUse: 'Mix 2–3 scoops (210g) with 500ml milk or water. Take post-workout and between meals. Adjust to caloric needs.',
    servings: 14,
  },
  Energy: {
    desc: 'Fast-acting energy supplement providing readily available carbohydrates and electrolytes to fuel performance during training and competition, and accelerate glycogen replenishment post-workout.',
    composition: 'Maltodextrin, Dextrose, Electrolytes (Sodium, Potassium, Magnesium), Vitamins C & E. Per serving.',
    howToUse: 'Mix as directed with 400–500ml water. Consume during or immediately after exercise.',
    servings: 20,
  },
  'Protein Bars': {
    desc: 'Convenient high-protein snack bar with a great taste and optimal macronutrient profile. Perfect for on-the-go nutrition between meals or post-workout.',
    composition: 'Whey Protein Crisp, Milk Chocolate Coating, Peanut or Caramel Filling. Per bar: Protein 20g, Carbs 22g, Fat 8g, Calories 240 kcal.',
    howToUse: 'Eat 1–2 bars daily as a snack or post-workout treat. No preparation needed.',
    servings: 1,
  },
};

const REVIEWS_BY_CATEGORY: Record<string, { id: string; name: string; country: string; rating: number; comment: string; date: string }[]> = {
  Protein: [
    { id: '1', name: 'Marcus W.', country: '🇩🇪', rating: 5, comment: 'Excellent texture and taste. Mixes perfectly in a shaker, no clumps. Fast delivery to Germany.', date: 'Jan 15, 2026' },
    { id: '2', name: 'Anna K.', country: '🇵🇱', rating: 5, comment: 'Best price in Europe for this quality. 24g protein per serving is exactly what I needed for my cut.', date: 'Jan 28, 2026' },
    { id: '3', name: 'Luca B.', country: '🇮🇹', rating: 4, comment: 'Arrived in perfect condition. Chocolate flavour is genuinely good — not too sweet.', date: 'Feb 10, 2026' },
  ],
  Creatine: [
    { id: '1', name: 'Stefan R.', country: '🇩🇪', rating: 5, comment: 'Noticeable strength increase after 2 weeks of loading. No GI issues, dissolves completely.', date: 'Jan 12, 2026' },
    { id: '2', name: 'Tomasz W.', country: '🇵🇱', rating: 5, comment: 'Pharmaceutical grade purity, exactly what I was looking for. Reordering my 3rd batch.', date: 'Jan 25, 2026' },
    { id: '3', name: 'Claire M.', country: '🇫🇷', rating: 4, comment: 'Great value, fast shipping. Mixes well with my pre-workout. Solid product.', date: 'Feb 8, 2026' },
  ],
  'Amino Acids': [
    { id: '1', name: 'Hans D.', country: '🇩🇪', rating: 5, comment: 'Recovery noticeably improved. Take it intra-workout — great endurance boost too.', date: 'Jan 18, 2026' },
    { id: '2', name: 'Karolina P.', country: '🇵🇱', rating: 5, comment: 'Perfect ratio, no fillers. I use it daily and my DOMS have practically disappeared.', date: 'Feb 1, 2026' },
    { id: '3', name: 'Marco F.', country: '🇮🇹', rating: 4, comment: 'Good quality, mixes easily. Slightly unflavoured taste but easy to add to any drink.', date: 'Feb 14, 2026' },
  ],
  AAS: [
    { id: '1', name: 'R. K.', country: '🇩🇪', rating: 5, comment: 'Pharmaceutical grade, exactly as described. Discreet packaging, arrived within 4 days.', date: 'Jan 20, 2026' },
    { id: '2', name: 'M. T.', country: '🇵🇱', rating: 5, comment: 'Genuine product, lab-verified. Strength gains from week 2 were very noticeable. Will reorder.', date: 'Feb 3, 2026' },
    { id: '3', name: 'J. V.', country: '🇳🇱', rating: 4, comment: 'Quality matches the price point. Packaging secure, communication was professional.', date: 'Feb 15, 2026' },
  ],
  Peptides: [
    { id: '1', name: 'F. B.', country: '🇩🇪', rating: 5, comment: 'Lyophilized correctly, reconstitution was smooth. Noticed effects within the first week.', date: 'Jan 22, 2026' },
    { id: '2', name: 'D. L.', country: '🇸🇪', rating: 5, comment: 'Excellent product, discreet packaging. GH levels confirmed via blood work. Very impressed.', date: 'Feb 5, 2026' },
    { id: '3', name: 'P. M.', country: '🇫🇷', rating: 4, comment: 'Good quality peptide, proper cold chain maintained. Arrived cold with ice packs intact.', date: 'Feb 17, 2026' },
  ],
  Modulators: [
    { id: '1', name: 'T. G.', country: '🇩🇪', rating: 5, comment: 'Bloodwork confirms it works. Estrogen was perfectly controlled on cycle. Great product.', date: 'Jan 19, 2026' },
    { id: '2', name: 'A. S.', country: '🇳🇱', rating: 5, comment: 'Used for PCT — testosterone recovery was much faster than without. Highly recommend.', date: 'Feb 2, 2026' },
    { id: '3', name: 'K. W.', country: '🇵🇱', rating: 4, comment: 'Genuine pharmaceutical grade. Packaging intact, no issues with shipping. Will reorder.', date: 'Feb 16, 2026' },
  ],
  'Womens Health': [
    { id: '1', name: 'Sophie L.', country: '🇩🇪', rating: 5, comment: 'Exactly as described, genuine packaging. Discreet delivery and very fast shipping to Germany.', date: 'Jan 17, 2026' },
    { id: '2', name: 'Marta K.', country: '🇵🇱', rating: 5, comment: 'I checked the batch number — authentic product. Results are exactly what I expected. Very happy.', date: 'Feb 1, 2026' },
    { id: '3', name: 'Isabelle D.', country: '🇫🇷', rating: 4, comment: 'Packaging arrived perfectly sealed and discreet. Good communication from the seller.', date: 'Feb 14, 2026' },
  ],
};

const DEFAULT_REVIEWS = [
  { id: '1', name: 'Marcus W.', country: '🇩🇪', rating: 5, comment: 'Excellent quality, fast delivery. Will definitely order again.', date: 'Jan 15, 2026' },
  { id: '2', name: 'Anna K.', country: '🇵🇱', rating: 5, comment: 'Best price in Europe for this quality. Very satisfied.', date: 'Jan 28, 2026' },
  { id: '3', name: 'Luca B.', country: '🇮🇹', rating: 4, comment: 'Good product, arrived in perfect condition. Packaging was discreet.', date: 'Feb 10, 2026' },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: 'product' });

  const isAAS = product.category === 'AAS' || product.category === 'Peptides' || product.category === 'Modulators' || product.category === 'Womens Health' || product.category === 'Anti-Aging' || product.category === 'Sexual Health';
  const extra = DESCRIPTIONS[product.category] ?? DESCRIPTIONS['Vitamins'];
  const pricePerServing = isAAS ? null : formatPrice(product.price / extra.servings);
  const reviews = REVIEWS_BY_CATEGORY[product.category] ?? DEFAULT_REVIEWS;

  const related = PRODUCTS
    .filter(p => p.category === product.category && p.slug !== product.slug && p.inStock)
    .slice(0, 4);

  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `https://pharmaforce-store.com${product.image}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: { '@type': 'Brand', name: product.brand },
    description: product.description ?? extra.desc,
    image: imageUrl,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://pharmaforce-store.com/${locale}/products/${product.slug}`,
      seller: { '@type': 'Organization', name: 'PharmaForce' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviews,
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back button */}
      <div className="mb-6">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
        >
          <span>←</span>
          <span>{t('backToProducts')}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* ── Image Gallery ── */}
        <ProductGallery
          mainImage={product.image}
          gallery={product.gallery}
          name={product.name}
          badge={product.badge}
          oldPrice={product.oldPrice}
          price={product.price}
        />

        {/* ── Info ── */}
        <div>
          <p className="text-brand text-sm font-semibold mb-1">{product.brand}</p>
          <h1 className="text-2xl font-extrabold text-white mb-3 leading-tight">{product.name}</h1>

          {product.weight && (
            <p className="text-muted text-sm mb-4">{product.weight}{!isAAS ? ` · ${extra.servings} ${t('servings')}` : ''}</p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className={`w-5 h-5 ${i <= Math.round(product.rating) ? 'fill-brand text-brand' : 'fill-border text-border'}`} />
              ))}
            </div>
            <span className="text-white font-semibold">{product.rating}</span>
            <span className="text-muted text-sm">({product.reviews} {t('reviews')})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-extrabold text-white">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-muted text-xl line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {pricePerServing && <span className="text-muted text-sm ml-auto">{pricePerServing} {t('perServingShort')}</span>}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-success' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${product.inStock ? 'text-success' : 'text-red-400'}`}>
              {product.inStock ? t('inStockReady') : t('outOfStock')}
            </span>
          </div>

          <ProductActions
            product={{ id: product.id, slug: product.slug, nameEn: product.name, price: product.price, image: product.image, category: product.category }}
            locale={locale}
            badge={product.badge}
          />

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { icon: Shield,  text: t('labCertified') },
              { icon: Truck,   text: t('euDelivery') },
              { icon: Package, text: t('securePackaging') },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5 p-3 bg-surface border border-border rounded-xl text-center">
                <Icon className="w-5 h-5 text-brand" />
                <span className="text-xs text-muted">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-3">{t('description')}</h2>
            <p className="text-muted leading-relaxed">{product.description ?? extra.desc}</p>
          </div>

          {!isAAS && (
            <>
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="text-white font-bold text-lg mb-3">{t('composition')}</h2>
                <p className="text-muted leading-relaxed text-sm">{extra.composition}</p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="text-white font-bold text-lg mb-3">{t('howToUse')}</h2>
                <p className="text-muted leading-relaxed text-sm">{extra.howToUse}</p>
              </div>
            </>
          )}

          {/* Reviews */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-5">{t('reviews')} ({product.reviews})</h2>
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-brand/20 rounded-full flex items-center justify-center text-brand font-bold text-sm">
                        {r.name[0]}
                      </div>
                      <span className="text-white font-medium text-sm">{r.name} {r.country}</span>
                    </div>
                    <span className="text-muted text-xs">{r.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= r.rating ? 'fill-brand text-brand' : 'fill-border text-border'}`} />
                    ))}
                  </div>
                  <p className="text-muted text-sm">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Sentinel for sticky cart */}
          <StickyAddToCart
            productId={product.id}
            productName={product.name}
            price={product.price}
            slug={product.slug}
            image={product.image}
            category={product.category}
            inStock={product.inStock}
          />
          <div className="bg-surface border border-border rounded-2xl p-5 sticky top-24">
            <h3 className="text-white font-semibold mb-4">{t('productInfo')}</h3>
            <dl className="space-y-3 text-sm">
              {([
                [t('brand'),      product.brand],
                [t('category'),   product.category],
                [t('subcategory'),product.subcategory],
                [t('volume'),     product.weight ?? '—'],
                ...(!isAAS ? [[t('servings'), `${extra.servings}`], [t('perServing'), pricePerServing]] : []),
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2">
                  <dt className="text-muted shrink-0">{label}</dt>
                  <dd className="text-white font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5 text-sm">
            <p className="text-brand font-semibold mb-2">💳 {t('paymentTitle')}</p>
            <p className="text-muted leading-relaxed">
              {t('paymentDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Customers also bought */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-white font-bold text-xl mb-6">{t('customersAlsoBought')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/${locale}/products/${p.slug}`}
                className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300"
              >
                <div className="relative bg-[#f5f5f5] aspect-square overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <p className="text-brand text-[11px] font-semibold mb-0.5 truncate">{p.brand}</p>
                  <h3 className="text-white text-xs font-medium leading-snug line-clamp-2 group-hover:text-brand transition-colors min-h-[2.5rem]">
                    {p.name}
                  </h3>
                  <p className="text-white font-bold text-sm mt-2">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
