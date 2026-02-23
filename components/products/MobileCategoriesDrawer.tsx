'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { X, ChevronDown } from 'lucide-react';

const SUBS: Record<string, { key: string }[]> = {
  aas: [{ key: 'injections' }, { key: 'tablets' }],
  peptides: [{ key: 'secretagogues' }, { key: 'hormones' }],
  modulators: [{ key: 'sarms' }, { key: 'aromatase-inhibitors' }, { key: 'serms' }, { key: 'metabolic' }],
  'womens-health': [{ key: 'weight-loss' }, { key: 'hair-growth' }, { key: 'anti-hirsutism' }, { key: 'skin-health' }, { key: 'hormone-therapy' }],
  'sexual-health': [{ key: 'ed-medications' }, { key: 'hormonal-support' }, { key: 'sh-peptides' }],
};

interface Props {
  open: boolean;
  onClose: () => void;
  categories: { key: string; label: string }[];
  counts: Record<string, number>;
  subCounts: Record<string, number>;
  translations: Record<string, string>;
  subTranslations: Record<string, string>;
}

export default function MobileCategoriesDrawer({ open, onClose, categories, counts, subCounts, translations, subTranslations }: Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const category = searchParams.get('category') ?? undefined;
  const sub = searchParams.get('sub') ?? undefined;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-dark border-t border-border rounded-t-2xl lg:hidden max-h-[80vh] overflow-y-auto transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold">Categories</span>
            <button onClick={onClose} className="p-1.5 text-muted hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-0.5">
            {categories.map(({ key }) => {
              const active = (!category && key === 'all') || category === key;
              const count = counts[key] ?? 0;
              const hasSubs = !!SUBS[key];
              if (count === 0 && key !== 'all' && key !== 'womens-health') return null;

              const href = active && key !== 'all'
                ? `/${locale}/products`
                : key === 'all' ? `/${locale}/products` : `/${locale}/products?category=${key}`;

              return (
                <div key={key}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm transition-colors ${
                      active ? 'bg-brand/15 text-brand font-semibold' : 'text-muted hover:text-white hover:bg-surface-2'
                    }`}
                  >
                    <span>{translations[key] ?? key}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs ${active ? 'text-brand' : 'text-muted/50'}`}>{count}</span>
                      {hasSubs && (
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${active ? 'rotate-180 text-brand' : 'text-muted/40'}`} />
                      )}
                    </div>
                  </Link>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: active && hasSubs ? `${(SUBS[key]?.length ?? 0) * 52}px` : '0px' }}
                  >
                    <div className="ml-3 mt-0.5 mb-1 space-y-0.5">
                      {(SUBS[key] ?? []).map(({ key: sk }) => {
                        const subActive = sub === sk;
                        const subHref = subActive
                          ? `/${locale}/products?category=${key}`
                          : `/${locale}/products?category=${key}&sub=${sk}`;
                        return (
                          <Link key={sk} href={subHref} onClick={onClose}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                              subActive ? 'bg-brand/20 text-brand font-semibold' : 'text-muted hover:text-white hover:bg-surface-2'
                            }`}
                          >
                            <span>{subTranslations[sk] ?? sk}</span>
                            <span className={`text-[10px] ${subActive ? 'text-brand' : 'text-muted/50'}`}>
                              {subCounts[`${key}:${sk}`] ?? 0}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
