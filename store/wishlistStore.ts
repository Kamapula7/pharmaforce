'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle: (id) => {
        set((state) => {
          if (state.ids.includes(id)) {
            return { ids: state.ids.filter((i) => i !== id) };
          }
          return { ids: [...state.ids, id] };
        });
      },

      has: (id) => get().ids.includes(id),

      clear: () => set({ ids: [] }),
    }),
    {
      name: 'pharmaforce-wishlist',
      skipHydration: true,
    }
  )
);
