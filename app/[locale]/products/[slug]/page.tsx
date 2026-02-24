import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Star, Package, Truck, Shield } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ProductActions from '@/components/product/ProductActions';
import ProductGallery from '@/components/product/ProductGallery';
import StickyAddToCart from '@/components/product/StickyAddToCart';
import ReviewsSection from '@/components/product/ReviewsSection';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/products';
import { getTranslations } from 'next-intl/server';
import { getProductDescriptions } from '@/lib/product-page-translations';
import { getReviewsForCategory } from '@/lib/reviews';

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
      canonical: `https://pharmaforce-store.com/${locale}/products/${slug}`,
      languages: {
        'en': `https://pharmaforce-store.com/en/products/${slug}`,
        'de': `https://pharmaforce-store.com/de/products/${slug}`,
        'fr': `https://pharmaforce-store.com/fr/products/${slug}`,
        'pl': `https://pharmaforce-store.com/pl/products/${slug}`,
        'it': `https://pharmaforce-store.com/it/products/${slug}`,
        'x-default': `https://pharmaforce-store.com/en/products/${slug}`,
      },
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



export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: 'product' });

  const DESCRIPTIONS = getProductDescriptions(locale);
  const isAAS = product.category === 'AAS' || product.category === 'Peptides' || product.category === 'Modulators' || product.category === 'Womens Health' || product.category === 'Anti-Aging' || product.category === 'Sexual Health';
  const extra = DESCRIPTIONS[product.category] ?? DESCRIPTIONS['Vitamins'];
  const weightServings = product.weight ? parseInt(product.weight.match(/\((\d+)\s*servings?\)/i)?.[1] ?? '') : NaN;
  const actualServings = !isNaN(weightServings) ? weightServings : extra.servings;
  const pricePerServing = isAAS ? null : formatPrice(product.price / actualServings);
  const reviews = getReviewsForCategory(product.category);

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
            <p className="text-muted text-sm mb-4">{product.weight}{!isAAS && !product.weight?.includes('servings') ? ` · ${extra.servings} ${t('servings')}` : ''}</p>
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

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-3">{t('composition')}</h2>
            <p className="text-muted leading-relaxed text-sm">{extra.composition}</p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-3">{t('howToUse')}</h2>
            <p className="text-muted leading-relaxed text-sm">{extra.howToUse}</p>
          </div>

          {/* Reviews */}
          <ReviewsSection
            reviews={reviews}
            total={product.reviews}
            title={t('reviews')}
            showAll={t('showAllReviews')}
            showLess={t('showLessReviews')}
          />
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
                ...(!isAAS ? [[t('servings'), `${actualServings}`], [t('perServing'), pricePerServing]] : []),
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
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
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
