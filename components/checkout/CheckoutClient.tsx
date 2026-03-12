'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useOrdersStore } from '@/store/ordersStore';
import { useSession } from 'next-auth/react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import {
  ChevronDown, Check, Copy, CheckCircle, Clock,
  User, MapPin, Landmark, ArrowLeft, ArrowRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { gtagBeginCheckout, gtagPurchase } from '@/lib/gtag';

const BANK_DETAILS = {
  accountHolder: 'Antonietta Ferrara',
  iban: 'DE90 2022 0800 0058 7073 15',
  bic: 'SXPYDEHHXXX',
  bank: 'Banking Circle - German Branch',
  address: '80333 München',
};

const EU_COUNTRIES = [
  'Austria','Belgium','Bulgaria','Croatia','Cyprus','Czech Republic',
  'Denmark','Estonia','Finland','France','Germany','Greece','Hungary',
  'Ireland','Italy','Latvia','Lithuania','Luxembourg','Malta','Netherlands',
  'Poland','Portugal','Romania','Slovakia','Slovenia','Spain','Sweden',
  'Switzerland','Norway','Iceland','United Kingdom',
];

type Step = 1 | 2 | 3 | 4;

export default function CheckoutClient({ locale }: { locale: string }) {
  const { items, totalPrice, clearCart } = useCartStore();
  const { addOrder } = useOrdersStore();
  useSession(); // ensures session cookie is sent with fetch requests
  const t = useTranslations('checkout');
  const tCart = useTranslations('cart');

  const [openStep, setOpenStep] = useState<Step>(1);
  const [doneSteps, setDoneSteps] = useState<Set<Step>>(new Set());
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [country, setCountry]     = useState('');
  const [city, setCity]           = useState('');
  const [address, setAddress]     = useState('');
  const [zip, setZip]             = useState('');
  const [notes, setNotes]         = useState('');

  const [err1, setErr1] = useState<Record<string,string>>({});
  const [err2, setErr2] = useState<Record<string,string>>({});
  const [orderSaveErr, setOrderSaveErr] = useState(false);
  const [orderSaveErrMsg, setOrderSaveErrMsg] = useState('');

  const SHIPPING_COST = 34.99;
  const FREE_SHIPPING_THRESHOLD = 150;
  const BULK_DISCOUNT_THRESHOLD = 200;
  const BULK_DISCOUNT_RATE = 0.15;

  const getPromoDiscount = (item: typeof items[0]) => {
    if (item.badge !== 'BUY 2 GET 3rd FREE') return 0;
    return Math.floor(item.quantity / 3) * item.price;
  };

  const totalDiscount = items.reduce((sum, item) => sum + getPromoDiscount(item), 0);
  const afterPromo = totalPrice() - totalDiscount;
  const bulkDiscount = afterPromo >= BULK_DISCOUNT_THRESHOLD ? afterPromo * BULK_DISCOUNT_RATE : 0;
  const discountedTotal = afterPromo - bulkDiscount;
  const shipping  = discountedTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total     = discountedTotal + shipping;
  const orderRef  = `PF-${Date.now().toString().slice(-8)}`;

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyBtn = ({ text, k }: { text: string; k: string }) => (
    <button onClick={() => copy(text, k)}
      className="p-1.5 rounded-lg text-muted hover:text-brand hover:bg-brand/10 transition-all">
      {copied === k ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
    </button>
  );

  const goTo = (step: Step) => {
    if (doneSteps.has(step) || step <= openStep) setOpenStep(step);
  };

  const completeStep = (step: Step, next: Step) => {
    setDoneSteps((s) => new Set(s).add(step));
    setOpenStep(next);
    setTimeout(() => {
      document.getElementById(`step-${next}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const validateStep1 = () => {
    const e: Record<string,string> = {};
    if (!firstName.trim()) e.firstName = t('required');
    if (!lastName.trim())  e.lastName  = t('required');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = t('validEmail');
    setErr1(e);
    if (Object.keys(e).length === 0) {
      gtagBeginCheckout(
        items.map(i => ({ id: i.id, name: i.nameEn, price: i.price, quantity: i.quantity })),
        total,
      );
    }
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string,string> = {};
    if (!country) e.country = t('required');
    if (!city.trim())    e.city    = t('required');
    if (!address.trim()) e.address = t('required');
    if (!zip.trim())     e.zip     = t('required');
    setErr2(e);
    return Object.keys(e).length === 0;
  };

  if (items.length === 0 && !confirmed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="text-muted mb-4">{t('emptyCart')}</p>
        <Link href={`/${locale}/products`} className="text-brand hover:underline">{tCart('browseProducts')}</Link>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-3">{t('thankYou')}</h1>
        <p className="text-muted mb-8">
          {t('orderConfirmedMsg', { ref: orderRef })}
        </p>
        <Link href={`/${locale}/products`}
          className="inline-flex items-center gap-2 bg-brand text-dark font-bold px-8 py-3 rounded-xl hover:bg-brand-dark transition-colors">
          {tCart('continueShopping')} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const stepHeader = (
    num: Step,
    icon: React.ReactNode,
    title: string,
    summary?: string,
  ) => {
    const done = doneSteps.has(num);
    const open = openStep === num;
    return (
      <button
        type="button"
        onClick={() => goTo(num)}
        className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${open ? '' : 'hover:bg-surface-2/50'}`}
      >
        {/* Circle */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-colors
          ${done ? 'bg-success text-white' : open ? 'bg-brand text-dark' : 'bg-surface-2 text-muted border border-border'}`}>
          {done ? <Check className="w-4 h-4" /> : num}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${open || done ? 'text-white' : 'text-muted'}`}>{title}</span>
            {done && !open && summary && (
              <span className="text-muted text-sm truncate">— {summary}</span>
            )}
          </div>
        </div>

        <div className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href={`/${locale}/cart`}
        className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors text-sm mb-8">
        <ArrowLeft className="w-4 h-4" /> {t('backToCart')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Accordion */}
        <div className="lg:col-span-2 space-y-4">

          {/* ── STEP 1: Name ── */}
          <div id="step-1" className="bg-surface border border-border rounded-2xl overflow-hidden">
            {stepHeader(1, <User className="w-4 h-4" />, t('personalInfo'),
              firstName ? `${firstName} ${lastName}` : undefined)}

            {openStep === 1 && (
              <div className="px-5 pb-5 border-t border-border pt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1.5">{t('firstName')} *</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
                      className={`w-full px-4 py-2.5 bg-surface-2 border rounded-xl text-white text-sm focus:outline-none transition-colors
                        ${err1.firstName ? 'border-red-500' : 'border-border focus:border-brand'}`} />
                    {err1.firstName && <p className="text-red-400 text-xs mt-1">{err1.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1.5">{t('lastName')} *</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)}
                      className={`w-full px-4 py-2.5 bg-surface-2 border rounded-xl text-white text-sm focus:outline-none transition-colors
                        ${err1.lastName ? 'border-red-500' : 'border-border focus:border-brand'}`} />
                    {err1.lastName && <p className="text-red-400 text-xs mt-1">{err1.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1.5">{t('email')} *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-surface-2 border rounded-xl text-white text-sm focus:outline-none transition-colors
                      ${err1.email ? 'border-red-500' : 'border-border focus:border-brand'}`} />
                  {err1.email && <p className="text-red-400 text-xs mt-1">{err1.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1.5">{t('phone')}</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-white text-sm focus:outline-none focus:border-brand transition-colors" />
                </div>
                <button type="button"
                  onClick={() => validateStep1() && completeStep(1, 2)}
                  className="w-full bg-brand text-dark font-bold py-3 rounded-xl hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
                  {t('continue')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* ── STEP 2: Shipping ── */}
          <div id="step-2" className="bg-surface border border-border rounded-2xl overflow-hidden">
            {stepHeader(2, <MapPin className="w-4 h-4" />, t('deliveryAddress'),
              city ? `${city}, ${country}` : undefined)}

            {openStep === 2 && (
              <div className="px-5 pb-5 border-t border-border pt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted mb-1.5">{t('country')} *</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-surface-2 border rounded-xl text-white text-sm focus:outline-none transition-colors
                      ${err2.country ? 'border-red-500' : 'border-border focus:border-brand'}`}>
                    <option value="">{t('selectCountry')}</option>
                    {EU_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {err2.country && <p className="text-red-400 text-xs mt-1">{err2.country}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1.5">{t('city')} *</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)}
                      className={`w-full px-4 py-2.5 bg-surface-2 border rounded-xl text-white text-sm focus:outline-none transition-colors
                        ${err2.city ? 'border-red-500' : 'border-border focus:border-brand'}`} />
                    {err2.city && <p className="text-red-400 text-xs mt-1">{err2.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1.5">{t('zip')} *</label>
                    <input value={zip} onChange={(e) => setZip(e.target.value)}
                      className={`w-full px-4 py-2.5 bg-surface-2 border rounded-xl text-white text-sm focus:outline-none transition-colors
                        ${err2.zip ? 'border-red-500' : 'border-border focus:border-brand'}`} />
                    {err2.zip && <p className="text-red-400 text-xs mt-1">{err2.zip}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1.5">{t('streetAddress')} *</label>
                  <input value={address} onChange={(e) => setAddress(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-surface-2 border rounded-xl text-white text-sm focus:outline-none transition-colors
                      ${err2.address ? 'border-red-500' : 'border-border focus:border-brand'}`} />
                  {err2.address && <p className="text-red-400 text-xs mt-1">{err2.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1.5">{t('notes')}</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                    placeholder={t('notesPlaceholder')}
                    className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-white placeholder:text-muted text-sm focus:outline-none focus:border-brand transition-colors resize-none" />
                </div>
                <button type="button"
                  onClick={() => validateStep2() && completeStep(2, 3)}
                  className="w-full bg-brand text-dark font-bold py-3 rounded-xl hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
                  {t('continue')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* ── STEP 3: Bank details ── */}
          <div id="step-3" className="bg-surface border border-border rounded-2xl overflow-hidden">
            {stepHeader(3, <Landmark className="w-4 h-4" />, t('transferDetails'), t('bankTransferLabel'))}

            {openStep === 3 && (
              <div className="px-5 pb-5 border-t border-border pt-5 space-y-4">
                {/* How it works */}
                <div className="bg-brand/5 border border-brand/20 rounded-xl p-4 space-y-3">
                  <p className="text-white text-sm font-semibold">How it works — 3 simple steps:</p>
                  <div className="space-y-2">
                    {[
                      { n: '1', text: 'Make the bank transfer to the details below' },
                      { n: '2', text: 'We confirm your payment within 24h by email' },
                      { n: '3', text: 'Your order ships in discreet packaging within 1–2 days' },
                    ].map(({ n, text }) => (
                      <div key={n} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-brand text-dark text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{n}</span>
                        <span className="text-muted text-sm">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-muted text-sm">
                  {t('transferExactly', { amount: formatPrice(total) })}
                </p>

                {/* Bank rows */}
                <div className="bg-surface-2 rounded-xl divide-y divide-border">
                  {[
                    { label: t('accountHolder'), value: BANK_DETAILS.accountHolder, k: 'holder' },
                    { label: 'IBAN',              value: BANK_DETAILS.iban,          k: 'iban'   },
                    { label: 'BIC / SWIFT',       value: BANK_DETAILS.bic,           k: 'bic'    },
                    { label: 'Bank',              value: BANK_DETAILS.bank,          k: 'bank'   },
                    { label: 'Amount',            value: formatPrice(total),          k: 'amount' },
                  ].map(({ label, value, k }) => (
                    <div key={k} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-muted text-xs mb-0.5">{label}</p>
                        <p className="text-white font-semibold text-sm">{value}</p>
                      </div>
                      <CopyBtn text={value} k={k} />
                    </div>
                  ))}
                </div>

                {orderSaveErr && (
                  <div className="space-y-2">
                    <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                      ⚠️ {orderSaveErrMsg || 'Could not save your order. Please try again or contact support.'}
                    </p>
                    <p className="text-muted text-xs text-center">Tap the green button again to retry. If it keeps failing, email pharmaforce@inbox.eu with your order details.</p>
                  </div>
                )}

                {/* Final button — save order + confirm */}
                <button
                  type="button"
                  onClick={async () => {
                    if (items.length === 0) {
                      setOrderSaveErrMsg('Your cart is empty. Please go back and add products.');
                      setOrderSaveErr(true);
                      return;
                    }
                    setOrderSaveErr(false);
                    setOrderSaveErrMsg('');
                    try {
                      const payload = {
                        firstName,
                        lastName,
                        email,
                        phone,
                        country,
                        city,
                        address,
                        zip,
                        notes,
                        total: Number(total),
                        orderRef,
                        items: items.map((i) => ({
                          productId: String(i.id),
                          nameEn: String(i.nameEn ?? ''),
                          quantity: Number(i.quantity) || 1,
                          price: Number(i.price) || 0,
                        })),
                      };
                      const res = await fetch('/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'same-origin',
                        body: JSON.stringify(payload),
                      });
                      const data = await res.json().catch(() => ({}));
                      if (!res.ok) {
                        const msg = typeof data?.error === 'string' ? data.error : 'Could not save your order. Please try again or contact support.';
                        const debug = typeof data?._debug === 'string' ? ` | ${data._debug}` : '';
                        setOrderSaveErrMsg(msg + debug);
                        setOrderSaveErr(true);
                        return;
                      }
                      addOrder({
                        ref: orderRef,
                        date: new Date().toISOString(),
                        total,
                        status: 'pending',
                        customerName: `${firstName} ${lastName}`,
                        customerEmail: email,
                        items: items.map(i => ({ name: i.nameEn, qty: i.quantity, price: i.price, image: i.image })),
                      });
                      gtagPurchase(orderRef, total, items.map(i => ({ id: i.id, name: i.nameEn, price: i.price, quantity: i.quantity })));
                      clearCart();
                      setConfirmed(true);
                    } catch (err) {
                      const msg = err instanceof Error && /fetch|network/i.test(err.message)
                        ? 'Network error. Check your connection and tap the button again.'
                        : (err instanceof Error ? err.message : 'Could not save your order. Please try again or contact support.');
                      setOrderSaveErrMsg(msg);
                      setOrderSaveErr(true);
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-success text-white font-bold py-4 rounded-2xl hover:bg-success/90 active:scale-[0.98] transition-all text-lg">
                  <CheckCircle className="w-6 h-6" />
                  {t('madePay')}
                </button>

                <p className="text-center text-muted text-xs leading-relaxed px-2">
                  ⚠️ {t('confirmPaymentNote')}
                </p>

                <div className="flex items-center justify-center gap-2 text-muted text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {t('shipsWithin')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border rounded-2xl p-6 sticky top-24">
            <h2 className="text-white font-bold mb-5">{t('orderSummary')}</h2>
            <div className="space-y-2.5 mb-5">
              {items.map((item) => {
                const promoOff = getPromoDiscount(item);
                const lineTotal = item.price * item.quantity - promoOff;
                return (
                  <div key={item.id} className="flex justify-between text-sm gap-2">
                    <span className="text-muted truncate">{item.nameEn} × {item.quantity}</span>
                    <span className="text-white shrink-0 flex items-center gap-1.5">
                      {promoOff > 0 && <span className="text-muted line-through text-xs">{formatPrice(item.price * item.quantity)}</span>}
                      {formatPrice(lineTotal)}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">{tCart('subtotal')}</span>
                <span className="text-white">{formatPrice(totalPrice())}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">2+1 {t('bulkDiscountLabel')}</span>
                  <span className="text-green-400 font-semibold">−{formatPrice(totalDiscount)}</span>
                </div>
              )}
              {bulkDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand">{t('bulkDiscountLabel')}</span>
                  <span className="text-brand font-semibold">−{formatPrice(bulkDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted">{tCart('shipping')}</span>
                <span className={shipping === 0 ? 'text-success font-medium' : 'text-white'}>
                  {shipping === 0 ? t('freeShipping') : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-border text-lg">
                <span className="text-white">{tCart('total')}</span>
                <span className="text-brand">{formatPrice(total)}</span>
              </div>
            </div>

            {shipping === 0 && (
              <p className="text-xs text-success bg-success/10 border border-success/20 rounded-lg p-2 text-center">
                {t('freeShipApplied')}
              </p>
            )}
            {shipping > 0 && (
              <p className="text-xs text-muted bg-surface-2 rounded-lg p-2 mt-3 text-center">
                {t('addMoreFreeShip', { amount: formatPrice(FREE_SHIPPING_THRESHOLD - discountedTotal) })}
              </p>
            )}

            {/* Trust badges */}
            <div className="mt-5 pt-4 border-t border-border space-y-2">
              {[
                { icon: '🔒', text: tCart('badgeSecure') },
                { icon: '📦', text: tCart('badgeDiscreet') },
                { icon: '🚚', text: tCart('badgeEUShip') },
                { icon: '✅', text: tCart('badgeLabCert') },
              ].map(({ icon, text }) => (
                <div key={icon} className="flex items-center gap-2 text-xs text-muted">
                  <span className="text-base">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-1.5">
                  {['M','A','L','C','D'].map((l) => (
                    <div key={l} className="w-6 h-6 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center text-[9px] font-bold text-brand">{l}</div>
                  ))}
                </div>
                <span className="text-xs text-muted">2,400+ happy customers</span>
              </div>
              <div className="flex gap-0.5 mb-1">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                <span className="text-muted text-xs ml-1">4.9 / 5</span>
              </div>
              <p className="text-[11px] text-muted italic">"Fast delivery, discreet packaging. Exactly as described." — Marcus W. 🇩🇪</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
