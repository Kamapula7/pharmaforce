'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Region = 'EU' | 'US';

interface RegionStore {
  region: Region;
  setRegion: (r: Region) => void;
}

export const useRegionStore = create<RegionStore>()(
  persist(
    (set) => ({
      region: 'EU',
      setRegion: (region) => set({ region }),
    }),
    { name: 'pharmaforce-region' }
  )
);

export const EUR_TO_USD = 1.08;

export function convertPrice(priceEur: number, region: Region): number {
  if (region === 'US') {
    const raw = priceEur * EUR_TO_USD;
    return Math.floor(raw) + 0.99;
  }
  return priceEur;
}
