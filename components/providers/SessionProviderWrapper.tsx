'use client';

import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { useOrdersStore } from '@/store/ordersStore';

function StoreHydrator() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useOrdersStore.persist.rehydrate();
  }, []);
  return null;
}

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StoreHydrator />
      {children}
    </SessionProvider>
  );
}
