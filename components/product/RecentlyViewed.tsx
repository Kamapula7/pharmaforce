'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { PRODUCTS } from '@/lib/products';

const STORAGE_KEY = 'pf_recently_viewed';
const MAX_ITEMS = 6;

export function trackProductView(slug: string) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[];
    const updated = [slug, ...stored.filter(s => s !== slug)].slice(0, MAX_ITEMS + 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch { /* silent */ }
}

function getStoredSlugs(currentSlug: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[];
    return stored.filter(s => s !== currentSlug).slice(0, 4);
  } catch { return []; }
}

export default function RecentlyViewed({ currentSlug, locale, label = 'Recently Viewed' }: {
  currentSlug: string;
  locale: string;
  label?: string;
}) {
  const slugs = useMemo(() => getStoredSlugs(currentSlug), [currentSlug]);

  const products = slugs.map(s => PRODUCTS.find(p => p.slug === s)).filter(Boolean);
  if (products.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-white font-bold text-lg mb-4">{label}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((p) => {
          if (!p) return null;
          const isBg = p.image.includes('-bg');
          return (
            <Link
              key={p.slug}
              href={`/${locale}/products/${p.slug}`}
              className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-brand/40 transition-colors"
            >
              <div className={`relative aspect-square ${isBg ? '' : 'bg-white'}`}>
                <Image
                  src={`${p.image}?v=2`}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className={`group-hover:scale-105 transition-transform duration-300 ${isBg ? 'object-cover' : 'object-contain p-3'}`}
                />
              </div>
              <div className="p-3">
                <p className="text-white text-xs font-semibold line-clamp-2 leading-snug">{p.name}</p>
                <p className="text-brand text-sm font-bold mt-1">{formatPrice(p.price)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
