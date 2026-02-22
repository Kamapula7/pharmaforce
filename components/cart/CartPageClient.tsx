'use client';

'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useOrdersStore } from '@/store/ordersStore';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, ClipboardList, Clock, Package, Truck, CheckCircle, X, Banknote } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const STATUS_LABEL: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending:    { label: 'Awaiting Payment',  icon: <Clock className="w-3.5 h-3.5" />,        color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  processing: { label: 'Processing',        icon: <Package className="w-3.5 h-3.5" />,      color: 'text-brand bg-brand/10 border-brand/20' },
  shipped:    { label: 'Shipped',           icon: <Truck className="w-3.5 h-3.5" />,        color: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  delivered:  { label: 'Delivered',         icon: <CheckCircle className="w-3.5 h-3.5" />,  color: 'text-success bg-success/10 border-success/20' },
};

export default function CartPageClient({ locale }: { locale: string }) {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore();
  const { orders } = useOrdersStore();
  const [tab, setTab] = useState<'cart' | 'history'>('cart');
  const [paymentModal, setPaymentModal] = useState(false);
  const tP = useTranslations('payment');

  const shipping = totalPrice() >= 80 ? 0 : 9.99;
  const total = totalPrice() + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-8 bg-surface border border-border rounded-xl p-1 w-fit">
        <button
          onClick={() => setTab('cart')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            tab === 'cart' ? 'bg-brand text-dark' : 'text-muted hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Cart
          {items.length > 0 && (
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${tab === 'cart' ? 'bg-dark/20' : 'bg-surface-2'}`}>
              {totalItems()}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab('history')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            tab === 'history' ? 'bg-brand text-dark' : 'text-muted hover:text-white'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          Order History
          {orders.length > 0 && (
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${tab === 'history' ? 'bg-dark/20' : 'bg-surface-2'}`}>
              {orders.length}
            </span>
          )}
        </button>
      </div>

      {/* ─── ORDER HISTORY TAB ─── */}
      {tab === 'history' && (
        <div>
          {orders.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-surface-2 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-10 h-10 text-muted" />
              </div>
              <p className="text-white font-semibold mb-2">No orders yet</p>
              <p className="text-muted text-sm mb-6">Your confirmed orders will appear here.</p>
              <button onClick={() => setTab('cart')} className="text-brand hover:underline text-sm">Go to Cart</button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const st = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending;
                return (
                  <div key={order.ref} className="bg-surface border border-border rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-border">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-muted mb-0.5">Order</p>
                          <p className="text-white font-bold font-mono">{order.ref}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted mb-0.5">Date</p>
                          <p className="text-white text-sm">{new Date(order.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted mb-0.5">Total</p>
                          <p className="text-brand font-bold">€{order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      {order.status === 'pending' ? (
                        <button
                          onClick={() => setPaymentModal(true)}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer hover:opacity-80 transition-opacity ${st.color}`}
                        >
                          {st.icon} {st.label} ⓘ
                        </button>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${st.color}`}>
                          {st.icon} {st.label}
                        </span>
                      )}
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-border/50">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 px-6 py-3">
                          {item.image && (
                            <div className="w-10 h-10 bg-[#f5f5f5] rounded-lg overflow-hidden shrink-0 relative">
                              <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="40px" />
                            </div>
                          )}
                          <p className="text-white text-sm flex-1">{item.name}</p>
                          <p className="text-muted text-sm">×{item.qty}</p>
                          <p className="text-white text-sm font-semibold">€{(item.price * item.qty).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── CART TAB ─── */}
      {tab === 'cart' && items.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-surface-2 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
          <p className="text-muted mb-8">Add products to get started.</p>
          <Link href={`/${locale}/products`}
            className="inline-flex items-center gap-2 bg-brand text-dark font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors">
            <ArrowLeft className="w-4 h-4" /> Browse Products
          </Link>
        </div>
      )}

      {tab === 'cart' && items.length > 0 && (

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-surface border border-border rounded-2xl p-4 flex gap-4">
              {/* Image */}
              <Link href={`/${locale}/products/${item.slug}`}>
                <div className="w-20 h-20 bg-[#f5f5f5] rounded-xl overflow-hidden shrink-0 hover:border-brand border border-border transition-colors relative">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.nameEn}
                      fill
                      className="object-contain p-1"
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
                    <p className="text-muted text-sm mt-1">{formatPrice(item.price)} each</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted hover:text-red-400 transition-colors p-1 rounded shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

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

                  <span className="text-white font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}

          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
            <h2 className="text-white font-bold text-lg mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal ({totalItems()} items)</span>
                <span className="text-white">{formatPrice(totalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Shipping</span>
                <span className={shipping === 0 ? 'text-success font-medium' : 'text-white'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted bg-surface-2 rounded-lg p-2">
                  Add {formatPrice(80 - totalPrice())} more for free shipping
                </p>
              )}
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-white font-bold">Total</span>
                <span className="text-white font-bold text-xl">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href={`/${locale}/checkout`}
              className="w-full flex items-center justify-center gap-2 bg-brand text-dark font-bold py-3.5 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted text-center flex items-center justify-center gap-1">
                🔒 Secure bank transfer payment
              </p>
              <p className="text-xs text-muted text-center">
                🇪🇺 Shipping to 30+ EU countries
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
