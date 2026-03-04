'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Check, Minus, Plus, Gift, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { gtagAddToCart, gtagRemoveFromCart } from '@/lib/gtag';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import WishlistButton from './WishlistButton';

interface ProductActionsProps {
  product: { id: string; slug: string; nameEn: string; price: number; image?: string; category?: string };
  locale: string;
  badge?: string;
}

export default function ProductActions({ product, locale, badge }: ProductActionsProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const cartItem = useCartStore((s) => s.items.find((i) => i.id === product.id));
  const inCart = mounted ? (cartItem?.quantity ?? 0) : 0;
  const t = useTranslations('product');

  useEffect(() => { setMounted(true); }, []);

  const isPromo = badge === 'BUY 2 GET 3rd FREE';
  const totalQty = inCart + qty;
  const freeItems = isPromo ? Math.floor(totalQty / 3) - Math.floor(inCart / 3) : 0;
  const paidQty = qty - freeItems;
  const totalPrice = product.price * paidQty;
  const savings = product.price * freeItems;

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      nameEn: product.nameEn,
      price: product.price,
      image: product.image,
      category: product.category,
      badge,
      quantity: qty,
    });
    gtagAddToCart({ id: product.id, name: product.nameEn, price: product.price, category: product.category, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleRemove = () => {
    removeItem(product.id);
    gtagRemoveFromCart({ id: product.id, name: product.nameEn, price: product.price });
  };

  const getPromoMessage = () => {
    if (!isPromo) return null;
    const needed = 3 - (totalQty % 3);
    if (freeItems > 0) {
      return { type: 'success', text: `🎁 ${freeItems} ${freeItems > 1 ? t('packs') : t('pack')} ${t('promoFree')} ${formatPrice(savings)}` };
    }
    if (inCart > 0 && needed === 1) {
      return { type: 'hint', text: `🎁 ${t('alreadyInCart')} ${inCart} — ${t('promoAdd1')}` };
    }
    if (needed === 1) {
      return { type: 'hint', text: `🎁 ${t('promoAdd1')}` };
    }
    if (inCart > 0) {
      return { type: 'hint', text: `🎁 ${t('alreadyInCart')} ${inCart} — ${t('promoBuy2')}` };
    }
    return { type: 'hint', text: `🎁 ${t('promoBuy2')}` };
  };

  const promoMsg = getPromoMessage();

  return (
    <div className="space-y-4">

      {/* Promo banner */}
      {isPromo && promoMsg && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
          promoMsg.type === 'success'
            ? 'bg-green-500/20 border border-green-500/40 text-green-400'
            : 'bg-brand/10 border border-brand/30 text-brand'
        }`}>
          <Gift className="w-4 h-4 shrink-0" />
          {promoMsg.text}
        </div>
      )}

      {/* In cart indicator */}
      {inCart > 0 && (
        <p className="text-xs text-muted">
          {t('alreadyInCart')} <span className="text-brand font-semibold">{inCart} {inCart > 1 ? t('packs') : t('pack')}</span>
        </p>
      )}

      {/* Quantity — only when adding (not in cart) */}
      {inCart === 0 && (
      <div className="flex items-center gap-4">
        <span className="text-muted text-sm">{t('quantity')}:</span>
        <div className="flex items-center gap-2 bg-surface border border-border rounded-lg p-1">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-white hover:bg-surface-2 rounded transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-white font-semibold w-8 text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-white hover:bg-surface-2 rounded transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          {freeItems > 0 && (
            <span className="text-muted text-sm line-through">{formatPrice(product.price * qty)}</span>
          )}
          <span className={`text-sm font-semibold ${freeItems > 0 ? 'text-green-400' : 'text-muted'}`}>
            {formatPrice(totalPrice)} {t('total')}
          </span>
        </div>
      </div>
      )}

      {/* Main button: toggle add/remove */}
      <div className="flex gap-3">
        <button
          onClick={inCart > 0 ? handleRemove : handleAdd}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
            added
              ? 'bg-success text-white'
              : inCart > 0
              ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
              : 'bg-brand text-dark hover:bg-brand-dark active:scale-[0.98]'
          }`}
        >
          {added ? (
            <><Check className="w-5 h-5" />{t('addedToCart')}</>
          ) : inCart > 0 ? (
            <><Trash2 className="w-5 h-5" />{t('removeFromCart')}</>
          ) : (
            <><ShoppingCart className="w-5 h-5" />{t('addToCart')}</>
          )}
        </button>

        {added && (
          <Link
            href={`/${locale}/cart`}
            className="px-5 py-3 rounded-xl border border-brand text-brand hover:bg-brand/10 font-semibold transition-colors text-sm"
          >
            {t('viewCart')}
          </Link>
        )}

        <WishlistButton productId={product.id} size="md" className="p-3 rounded-xl border border-border hover:border-red-400/50 hover:bg-red-500/5" />
      </div>
    </div>
  );
}
