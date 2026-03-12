'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import AddToCartButton from '@/components/product/AddToCartButton';

interface BestsellersSectionProps {
  locale: string;
}

const MOCK_PRODUCTS = [
  {
    id: '1',
    slug: 'whey-protein-gold',
    nameEn: 'Whey Protein Gold',
    price: 49.99,
    category: 'protein',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    image: null,
  },
  {
    id: '2',
    slug: 'bcaa-complex-8-1-1',
    nameEn: 'BCAA Complex 8:1:1',
    price: 34.99,
    category: 'aminoacids',
    rating: 4.7,
    reviews: 89,
    badge: null,
    image: null,
  },
  {
    id: '3',
    slug: 'omega-3-ultra-pure',
    nameEn: 'Omega-3 Ultra Pure',
    price: 24.99,
    category: 'vitamins',
    rating: 4.9,
    reviews: 203,
    badge: 'Top Rated',
    image: null,
  },
  {
    id: '4',
    slug: 'pre-workout-explosion',
    nameEn: 'Pre-Workout Explosion',
    price: 44.99,
    category: 'preworkout',
    rating: 4.6,
    reviews: 67,
    badge: 'New',
    image: null,
  },
];

export default function BestsellersSection({ locale }: BestsellersSectionProps) {
  const t = useTranslations('home.bestsellers');

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t('title')}</h2>
            <p className="text-muted">{t('subtitle')}</p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="hidden sm:flex items-center gap-2 text-brand hover:text-brand-dark transition-colors font-medium text-sm group"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <Link key={product.id} href={`/${locale}/products/${product.slug}`} className="group">
              <div className="bg-surface border border-border rounded-xl overflow-hidden hover:border-brand/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/5">
                {/* Image */}
                <div className="relative aspect-square bg-surface-2 flex items-center justify-center">
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <Badge variant={product.badge === 'New' ? 'success' : 'brand'} className="text-xs">
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                  <div className="w-24 h-24 rounded-2xl bg-brand/10 flex items-center justify-center">
                    <span className="text-4xl">💊</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-brand font-medium uppercase tracking-wide mb-1">{product.category}</p>
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-brand transition-colors">
                    {product.nameEn}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i <= Math.round(product.rating) ? 'fill-brand text-brand' : 'text-border'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted">({product.reviews})</span>
                  </div>

                    <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-lg">{formatPrice(product.price)}</span>
                    <AddToCartButton
                      productId={product.id}
                      productName={product.nameEn}
                      price={product.price}
                      slug={product.slug}
                      category={product.category}
                      badge={product.badge ?? undefined}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-brand font-medium hover:underline"
          >
            {t('viewAll')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
