'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { PRODUCTS } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

const subscribe = (cb: () => void) => {
  const unsub = useWishlistStore.persist.onFinishHydration(cb);
  useWishlistStore.persist.rehydrate();
  return unsub;
};
const getSnapshot = () => useWishlistStore.persist.hasHydrated();
const getServerSnapshot = () => false;

export default function WishlistClient({ locale }: { locale: string }) {
  const ids = useWishlistStore((s) => s.ids);
  const toggle = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);
  const hydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  if (!hydrated) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-white font-black text-3xl mb-8">Wishlist</h1>
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-7 h-7 text-red-500 fill-current" />
        <h1 className="text-white font-black text-3xl">Wishlist</h1>
        {products.length > 0 && (
          <span className="text-muted text-sm ml-1">({products.length})</span>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-muted/30 mx-auto mb-4" />
          <p className="text-muted text-lg mb-2">Your wishlist is empty</p>
          <p className="text-muted/60 text-sm mb-6">Browse products and tap the heart to save them here</p>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 bg-brand text-dark font-bold px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 flex flex-col"
            >
              <Link
                href={`/${locale}/products/${product.slug}`}
                className={`relative aspect-square overflow-hidden block ${product.image.includes('-bg') ? '' : 'bg-white'}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`group-hover:scale-105 transition-transform duration-500 ${product.image.includes('-bg') ? 'object-cover' : 'object-contain p-4'}`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </Link>

              <div className="p-3 flex flex-col flex-1">
                <p className="text-brand text-[11px] font-semibold mb-0.5 truncate">{product.brand}</p>
                <Link href={`/${locale}/products/${product.slug}`}>
                  <h3 className="text-white text-xs font-medium leading-snug mb-2 line-clamp-2 group-hover:text-brand transition-colors min-h-[2.5rem]">
                    {product.name}
                  </h3>
                </Link>

                <div className="mt-auto">
                  <p className="text-white font-bold text-sm mb-2">{formatPrice(product.price)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        addItem({
                          id: product.id,
                          slug: product.slug,
                          nameEn: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                        })
                      }
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-brand text-dark text-xs font-bold rounded-lg hover:bg-brand-dark transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add
                    </button>
                    <button
                      onClick={() => toggle(product.id)}
                      className="p-2 rounded-lg border border-border text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors cursor-pointer"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
