import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { PRODUCTS } from '@/lib/products';
import AddToCartButton from '@/components/product/AddToCartButton';

interface BestsellersSectionProps {
  locale: string;
}

export default function BestsellersSection({ locale }: BestsellersSectionProps) {
  const t = useTranslations('home.bestsellers');

  const bestsellers = PRODUCTS
    .filter((p) => p.inStock)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 8);

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestsellers.map((product) => (
            <div key={product.id} className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-brand/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/5 flex flex-col">
              <Link href={`/${locale}/products/${product.slug}`} className={`relative aspect-square overflow-hidden block ${product.image.includes('-bg') ? '' : 'bg-white'}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`group-hover:scale-105 transition-transform duration-500 ${product.image.includes('-bg') ? 'object-cover' : 'object-contain p-4'}`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {product.badge && (
                  <div className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded ${
                    product.badge === 'BESTSELLER' ? 'bg-brand text-dark' :
                    product.badge === 'TOP RATED' ? 'bg-success text-white' : 'bg-brand text-dark'
                  }`}>
                    {product.badge}
                  </div>
                )}
              </Link>

              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-brand font-medium mb-1 truncate">{product.brand}</p>
                <Link href={`/${locale}/products/${product.slug}`}>
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-brand transition-colors line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i <= Math.round(product.rating) ? 'fill-brand text-brand' : 'fill-border text-border'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted">({product.reviews})</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-lg">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-muted text-xs line-through ml-1.5">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  <AddToCartButton
                    productId={product.id}
                    productName={product.name}
                    price={product.price}
                    slug={product.slug}
                    image={product.image}
                    category={product.category}
                    badge={product.badge}
                  />
                </div>
              </div>
            </div>
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
