import Image from 'next/image';
import Link from 'next/link';
import { Star, Search } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/product/AddToCartButton';
import SearchInput from '@/components/search/SearchInput';
import { getTranslations } from 'next-intl/server';

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { locale } = await params;
  const { q } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'search' });

  const query = q?.trim() ?? '';

  const results = query.length > 0
    ? PRODUCTS.filter((p) => {
        const s = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s) ||
          p.subcategory.toLowerCase().includes(s)
        );
      })
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Search bar */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-6">{t('title')}</h1>
        <SearchInput locale={locale} initialQuery={query} />
      </div>

      {/* Results */}
      {query.length > 0 ? (
        <>
          <p className="text-muted text-sm mb-6">
            {results.length > 0
              ? <><span className="text-white font-semibold">{results.length}</span> {t('resultsFor')} &ldquo;<span className="text-brand">{query}</span>&rdquo;</>
              : <>{t('noResultsFor')} &ldquo;<span className="text-brand">{query}</span>&rdquo;</>
            }
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col"
                >
                  <Link href={`/${locale}/products/${product.slug}`} className="relative aspect-square overflow-hidden block">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    {product.oldPrice && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                        <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full">{t('outOfStock')}</span>
                      </div>
                    )}
                  </Link>

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
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-surface border border-border rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted" />
              </div>
              <p className="text-white font-semibold mb-2">{t('noProductsFound')}</p>
              <p className="text-muted text-sm mb-6">{t('tryDifferent')}</p>
              <Link href={`/${locale}/products`} className="inline-flex items-center gap-2 bg-brand text-dark font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-brand/90 transition-colors">
                {t('browseAll')}
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted text-sm">{t('startTyping')}</p>
        </div>
      )}
    </div>
  );
}
