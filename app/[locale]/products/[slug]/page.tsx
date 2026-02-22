import { notFound } from 'next/navigation';
import { Star, Package, Truck, Shield } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ProductActions from '@/components/product/ProductActions';
import ProductGallery from '@/components/product/ProductGallery';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
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

const REVIEWS = [
  { id: '1', name: 'Marcus W.', country: '🇩🇪', rating: 5, comment: 'Excellent quality, fast delivery to Germany. Will definitely order again.', date: 'Jan 15, 2026' },
  { id: '2', name: 'Anna K.', country: '🇵🇱', rating: 5, comment: 'Best price in Europe for this quality. Very satisfied with the product!', date: 'Jan 28, 2026' },
  { id: '3', name: 'Piotr Z.', country: '🇫🇷', rating: 4, comment: 'Good product, mixes well. Packaging arrived in perfect condition.', date: 'Feb 10, 2026' },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const isAAS = product.category === 'AAS' || product.category === 'Peptides' || product.category === 'Modulators';
  const extra = DESCRIPTIONS[product.category] ?? DESCRIPTIONS['Vitamins'];
  const pricePerServing = isAAS ? null : formatPrice(product.price / extra.servings);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Back button */}
      <div className="mb-6">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Back to Products</span>
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
            <p className="text-muted text-sm mb-4">{product.weight}{!isAAS ? ` · ${extra.servings} servings` : ''}</p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className={`w-5 h-5 ${i <= Math.round(product.rating) ? 'fill-brand text-brand' : 'fill-border text-border'}`} />
              ))}
            </div>
            <span className="text-white font-semibold">{product.rating}</span>
            <span className="text-muted text-sm">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-extrabold text-white">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-muted text-xl line-through">{formatPrice(product.oldPrice)}</span>
            )}
            {pricePerServing && <span className="text-muted text-sm ml-auto">{pricePerServing} / serving</span>}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-success' : 'bg-red-500'}`} />
            <span className={`text-sm font-medium ${product.inStock ? 'text-success' : 'text-red-400'}`}>
              {product.inStock ? 'In Stock — ready to ship' : 'Out of Stock'}
            </span>
          </div>

          <ProductActions
            product={{ id: product.id, slug: product.slug, nameEn: product.name, price: product.price, image: product.image, category: product.category }}
            locale={locale}
          />

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { icon: Shield, text: 'Lab Certified' },
              { icon: Truck,  text: 'EU Delivery 3–7 days' },
              { icon: Package, text: 'Secure packaging' },
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
            <h2 className="text-white font-bold text-lg mb-3">Description</h2>
            <p className="text-muted leading-relaxed">{product.description ?? extra.desc}</p>
          </div>

          {!isAAS && (
            <>
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="text-white font-bold text-lg mb-3">Composition</h2>
                <p className="text-muted leading-relaxed text-sm">{extra.composition}</p>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6">
                <h2 className="text-white font-bold text-lg mb-3">How to Use</h2>
                <p className="text-muted leading-relaxed text-sm">{extra.howToUse}</p>
              </div>
            </>
          )}

          {/* Reviews */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-5">Reviews ({product.reviews})</h2>
            <div className="space-y-4">
              {REVIEWS.map((r) => (
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
          <div className="bg-surface border border-border rounded-2xl p-5 sticky top-24">
            <h3 className="text-white font-semibold mb-4">Product Info</h3>
            <dl className="space-y-3 text-sm">
              {([
                ['Brand',      product.brand],
                ['Category',   product.category],
                ['Subcategory',product.subcategory],
                ['Volume',     product.weight ?? '—'],
                ...(!isAAS ? [['Servings', `${extra.servings} servings`], ['Per serving', pricePerServing]] : []),
              ] as [string, string][]).map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2">
                  <dt className="text-muted shrink-0">{label}</dt>
                  <dd className="text-white font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5 text-sm">
            <p className="text-brand font-semibold mb-2">💳 Payment</p>
            <p className="text-muted leading-relaxed">
              Bank transfer (IBAN). Place order → receive bank details → shipped after payment confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
