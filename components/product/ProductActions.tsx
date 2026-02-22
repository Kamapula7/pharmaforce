'use client';

import { useState } from 'react';
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

interface ProductActionsProps {
  product: { id: string; slug: string; nameEn: string; price: number; image?: string; category?: string };
  locale: string;
}

export default function ProductActions({ product, locale }: ProductActionsProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, slug: product.slug, nameEn: product.nameEn, price: product.price, image: product.image, category: product.category });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="text-muted text-sm">Quantity:</span>
        <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-white hover:bg-surface-2 rounded transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-white font-semibold w-8 text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-white hover:bg-surface-2 rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-muted text-sm">{formatPrice(product.price * qty)} total</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
            added
              ? 'bg-success text-white'
              : 'bg-brand text-dark hover:bg-brand-dark active:scale-[0.98]'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>

        {added && (
          <Link
            href={`/${locale}/cart`}
            className="px-5 py-3 rounded-xl border border-brand text-brand hover:bg-brand/10 font-semibold transition-colors text-sm"
          >
            View Cart
          </Link>
        )}
      </div>
    </div>
  );
}
