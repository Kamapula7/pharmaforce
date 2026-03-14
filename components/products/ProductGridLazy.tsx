'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronDown } from 'lucide-react';
import { useParams } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/product/AddToCartButton';
import WishlistButton from '@/components/product/WishlistButton';
import type { Product } from '@/lib/products';

const BADGE_COLORS: Record<string, string> = {
  'BESTSELLER': 'bg-brand text-dark',
  'TOP RATED':  'bg-success text-white',
};

const PAGE_SIZE = 24;

interface Props {
  products: Product[];
  showMoreLabel?: string;
  showingLabel?: string;
  ofLabel?: string;
}

export default function ProductGridLazy({ products, showMoreLabel = 'Show More', showingLabel = 'Showing', ofLabel = 'of' }: Props) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const params = useParams();
  const locale = params.locale as string;

  const shown = useMemo(() => products.slice(0, visible), [products, visible]);
  const hasMore = visible < products.length;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
        {shown.map((product) => (
          <div
            key={product.id}
            className="group bg-surface rounded-xl overflow-hidden hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col"
          >
            <Link href={`/${locale}/products/${product.slug}`} className={`relative aspect-square overflow-hidden block ${product.image.includes('-bg') ? '' : 'bg-white'}`}>
              <Image
                src={product.image}
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
                    badge={product.badge}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex flex-col items-center gap-3 mt-8">
          <p className="text-muted text-sm">
            {showingLabel} <span className="text-white font-semibold">{shown.length}</span> {ofLabel} <span className="text-white font-semibold">{products.length}</span>
          </p>
          <button
            onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, products.length))}
            className="flex items-center gap-2 px-6 py-3 bg-surface border border-border text-white text-sm font-semibold rounded-xl hover:border-brand/50 hover:bg-surface-2 transition-all"
          >
            <ChevronDown className="w-4 h-4" />
            {showMoreLabel}
          </button>
        </div>
      )}
    </>
  );
}
