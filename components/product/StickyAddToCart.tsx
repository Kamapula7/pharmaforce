'use client';

import { useEffect, useRef, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
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
  const sentinelRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);

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

  const handleAdd = () => {
    addItem({ id: productId, nameEn: productName, price, slug, image, category });
  };

  return (
    <>
      {/* Sentinel — invisible element placed after the main Add to Cart button */}
      <div ref={sentinelRef} className="h-px" />

      {/* Sticky bar — mobile only */}
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
              onClick={handleAdd}
              className="flex items-center gap-2 bg-brand text-dark font-bold px-5 py-2.5 rounded-xl hover:bg-brand-dark transition-colors shrink-0 text-sm cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
