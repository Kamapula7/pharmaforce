'use client';

import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Check, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';

interface Props {
  productId: string;
  productName: string;
  price: number;
  slug: string;
  image?: string;
  category?: string;
  inStock: boolean;
}

export default function StickyAddToCart({ productId, productName, price, slug, image, category, inStock }: Props) {
  const [visible, setVisible] = useState(false);
  const [flash, setFlash] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const inCart = useCartStore((s) => s.items.some((i) => i.id === productId));

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    const currently = useCartStore.getState().items.some((i) => i.id === productId);
    if (currently) {
      removeItem(productId);
    } else {
      addItem({ id: productId, nameEn: productName, price, slug, image, category });
      setFlash(true);
      setTimeout(() => setFlash(false), 1200);
    }
  };

  return (
    <>
      <div ref={sentinelRef} className="h-px" />

      {inStock && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
            visible ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="bg-dark/95 backdrop-blur-md border-t border-border px-4 py-3 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-white font-bold text-base leading-none">{formatPrice(price)}</p>
              <p className="text-muted text-xs mt-0.5 truncate">{productName}</p>
            </div>
            <button
              onClick={handleClick}
              className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shrink-0 text-sm cursor-pointer active:scale-95 ${
                flash
                  ? 'bg-green-500 text-white'
                  : inCart
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-brand text-dark hover:bg-brand-dark'
              }`}
            >
              {flash ? (
                <><Check className="w-4 h-4" /> Added!</>
              ) : inCart ? (
                <><Trash2 className="w-4 h-4" /> Remove</>
              ) : (
                <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
