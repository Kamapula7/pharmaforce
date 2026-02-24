'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import MobileCategoriesDrawer from './MobileCategoriesDrawer';

interface Props {
  count: number;
  currentSort: string;
  categories: { key: string; label: string }[];
  counts: Record<string, number>;
  subCounts: Record<string, number>;
  translations: Record<string, string>;
  subTranslations: Record<string, string>;
}

export default function ProductsToolbar({ count, currentSort, categories, counts, subCounts, translations, subTranslations }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tP = useTranslations('products');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'popular') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ''}`);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-surface border border-border text-white text-sm rounded-lg px-3 py-2 hover:border-brand/40 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand" />
            <span>{tP('categoriesBtn')}</span>
          </button>
          <p className="text-muted text-sm">
            <span className="text-white font-semibold">{count}</span> {tP('productsCount')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted text-sm hidden sm:inline">{tP('sortLabel')}:</span>
          <div className="relative">
            <select
              className="appearance-none bg-surface border border-border text-white text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-brand cursor-pointer"
              value={currentSort}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="popular">{tP('sortPopular')}</option>
              <option value="rating">{tP('sortTopRated')}</option>
              <option value="price-asc">{tP('sortPriceAsc')}</option>
              <option value="price-desc">{tP('sortPriceDesc')}</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      <MobileCategoriesDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        counts={counts}
        subCounts={subCounts}
        translations={translations}
        subTranslations={subTranslations}
      />
    </>
  );
}
