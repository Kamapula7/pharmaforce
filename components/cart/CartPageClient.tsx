'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { PRODUCTS } from '@/lib/products';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, X, Banknote, Gift } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const badgeMap = new Map(PRODUCTS.map((p) => [p.id, p.badge]));

export default function CartPageClient({ locale }: { locale: string }) {
  const { items: rawItems, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore();
  const [paymentModal, setPaymentModal] = useState(false);
  const tP = useTranslations('payment');
  const t = useTranslations('cart');

  const items = rawItems.map((item) => ({
    ...item,
    badge: item.badge || badgeMap.get(item.id),
  }));

  const getPromoDiscount = (item: typeof items[0]) => {
    if (item.badge !== 'BUY 2 GET 3rd FREE') return 0;
    return Math.floor(item.quantity / 3) * item.price;
  };

  const SHIPPING_COST = 34.99;
  const FREE_SHIPPING_THRESHOLD = 150;
  const BULK_DISCOUNT_THRESHOLD = 200;
  const BULK_DISCOUNT_RATE = 0.15;

  const totalDiscount = items.reduce((sum, item) => sum + getPromoDiscount(item), 0);
  const afterPromo = totalPrice() - totalDiscount;
  const bulkDiscount = afterPromo >= BULK_DISCOUNT_THRESHOLD ? afterPromo * BULK_DISCOUNT_RATE : 0;
  const discountedTotal = afterPromo - bulkDiscount;
  const shipping = discountedTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = discountedTotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {items.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-surface-2 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{t('empty')}</h1>
          <p className="text-muted mb-8">{t('emptyDesc')}</p>
          <Link href={`/${locale}/products`}
            className="inline-flex items-center gap-2 bg-brand text-dark font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t('browseProducts')}
          </Link>
        </div>
      )}

      {items.length > 0 && (

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-surface border border-border rounded-2xl p-4 flex gap-4">
              {/* Image */}
              <Link href={`/${locale}/products/${item.slug}`}>
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 hover:border-brand border border-border transition-colors relative">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.nameEn}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl">💊</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {item.category && (
                      <p className="text-xs text-brand font-medium mb-0.5">{item.category}</p>
                    )}
                    <Link href={`/${locale}/products/${item.slug}`}>
                      <h3 className="text-white font-semibold hover:text-brand transition-colors text-sm">
                        {item.nameEn}
                      </h3>
                    </Link>
                    <p className="text-muted text-sm mt-1">{formatPrice(item.price)} {t('each')}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted hover:text-red-400 transition-colors p-1 rounded shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Promo hint */}
                {item.badge === 'BUY 2 GET 3rd FREE' && (() => {
                  const free = Math.floor(item.quantity / 3);
                  const needed = 3 - (item.quantity % 3);
                  if (free > 0) return (
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-green-400 font-medium">
                      <Gift className="w-3.5 h-3.5 shrink-0" />
                      {t('packsFree', { free, amount: formatPrice(free * item.price) })}
                    </div>
                  );
                  if (item.quantity % 3 !== 0) return (
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-brand font-medium">
                      <Gift className="w-3.5 h-3.5 shrink-0" />
                      {t('addMoreFreePack', { needed })}
                    </div>
                  );
                  return null;
                })()}

                <div className="flex items-center justify-between mt-3">
                  {/* Qty control */}
                  <div className="flex items-center gap-1.5 bg-surface-2 border border-border rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-muted hover:text-white hover:bg-border rounded transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-white font-semibold w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-muted hover:text-white hover:bg-border rounded transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    {getPromoDiscount(item) > 0 && (
                      <span className="text-muted line-through text-xs mr-1">{formatPrice(item.price * item.quantity)}</span>
                    )}
                    <span className="text-white font-bold">{formatPrice(item.price * item.quantity - getPromoDiscount(item))}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('continueShopping')}
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
            <h2 className="text-white font-bold text-lg mb-6">{t('orderSummary')}</h2>

            {/* Bulk discount progress */}
            {bulkDiscount === 0 && (
              <div className="bg-brand/5 border border-brand/20 rounded-xl p-3 mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-brand">{t('bulkPromo')}</span>
                  <span className="text-xs text-muted">{formatPrice(afterPromo)} / €200</span>
                </div>
                <div className="w-full bg-border rounded-full h-1.5">
                  <div
                    className="bg-brand h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((afterPromo / BULK_DISCOUNT_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted mt-1.5">
                  {t('addMoreDiscount', { amount: formatPrice(BULK_DISCOUNT_THRESHOLD - afterPromo) })}
                </p>
              </div>
            )}
            {bulkDiscount > 0 && (
              <div className="bg-brand/10 border border-brand/30 rounded-xl p-3 mb-4 text-center">
                <p className="text-brand font-bold text-sm">{t('discountApplied')}</p>
                <p className="text-muted text-xs mt-0.5">{t('youSave', { amount: formatPrice(bulkDiscount) })}</p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted">{t('subtotalItems', { count: totalItems() })}</span>
                <span className="text-white">{formatPrice(totalPrice())}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400 flex items-center gap-1"><Gift className="w-3.5 h-3.5" /> {t('promoDiscount')}</span>
                  <span className="text-green-400 font-semibold">−{formatPrice(totalDiscount)}</span>
                </div>
              )}
              {bulkDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand flex items-center gap-1">{t('bulkDiscount')}</span>
                  <span className="text-brand font-semibold">−{formatPrice(bulkDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted">{t('shipping')}</span>
                <span className={shipping === 0 ? 'text-success font-medium' : 'text-white'}>
                  {shipping === 0 ? t('free') : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <div className="bg-surface-2 border border-border rounded-lg p-2.5">
                  <p className="text-xs text-muted mb-1.5">
                    {t('addMoreFreeShip', { amount: formatPrice(FREE_SHIPPING_THRESHOLD - discountedTotal) })}
                  </p>
                  <div className="w-full bg-border rounded-full h-1.5">
                    <div
                      className="bg-brand h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((discountedTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted mt-1 text-right">{formatPrice(discountedTotal)} / {formatPrice(FREE_SHIPPING_THRESHOLD)}</p>
                </div>
              )}
              {shipping === 0 && (
                <p className="text-xs text-success bg-success/10 border border-success/20 rounded-lg p-2 text-center">
                  {t('freeShipApplied')}
                </p>
              )}
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-white font-bold">{t('total')}</span>
                <div className="text-right">
                  {bulkDiscount > 0 && (
                    <p className="text-muted text-xs line-through">{formatPrice(afterPromo + shipping)}</p>
                  )}
                  <span className="text-white font-bold text-xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <Link
              href={`/${locale}/checkout`}
              className="w-full flex items-center justify-center gap-2 bg-brand text-dark font-bold py-3.5 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all"
            >
              {t('checkout')}
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted text-center flex items-center justify-center gap-1">
                {t('securePayment')}
              </p>
              <p className="text-xs text-muted text-center">
                {t('euShip')}
              </p>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Payment awaiting modal */}
      {paymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setPaymentModal(false)} />
          <div className="relative bg-surface border border-border rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <button
              onClick={() => setPaymentModal(false)}
              className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Banknote className="w-7 h-7 text-yellow-400" />
            </div>

            <h2 className="text-white text-xl font-bold text-center mb-4">
              {tP('awaitingTitle')}
            </h2>

            <p className="text-muted text-sm leading-relaxed text-center mb-4">
              {tP('awaitingBody')}
            </p>

            <div className="bg-surface-2 border border-border rounded-xl p-4 mb-6">
              <p className="text-muted text-xs leading-relaxed text-center">
                🕐 {tP('awaitingNote')}
              </p>
            </div>

            <button
              onClick={() => setPaymentModal(false)}
              className="w-full bg-brand text-dark font-bold py-3 rounded-xl hover:bg-brand/90 transition-colors cursor-pointer"
            >
              {tP('close')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
