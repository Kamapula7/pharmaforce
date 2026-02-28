'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useSession } from 'next-auth/react';

const REMINDER_DELAY_MS = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = 'pf_abandoned_cart_sent';

export default function AbandonedCartTracker({ locale }: { locale: string }) {
  const { items, totalPrice } = useCartStore();
  const { data: session } = useSession();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!session?.user?.email || items.length === 0) return;

    const cartKey = items.map(i => `${i.id}:${i.quantity}`).sort().join(',');
    const sentKey = sessionStorage.getItem(STORAGE_KEY);
    if (sentKey === cartKey) return;

    timerRef.current = setTimeout(async () => {
      try {
        const cartItems = items.map(i => ({
          name: i.nameEn,
          qty: i.quantity,
          price: i.price,
        }));

        await fetch('/api/abandoned-cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerEmail: session.user?.email,
            customerName: session.user?.name || 'Athlete',
            items: cartItems,
            total: totalPrice(),
            locale,
          }),
        });

        sessionStorage.setItem(STORAGE_KEY, cartKey);
      } catch { /* silent */ }
    }, REMINDER_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [items, session, totalPrice, locale]);

  return null;
}
