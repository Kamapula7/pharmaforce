'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const SUBS: Record<string, { key: string; label: string }[]> = {
  aas: [
    { key: 'injections', label: 'Injections' },
    { key: 'tablets',    label: 'Tablets / Capsules' },
  ],
  peptides: [
    { key: 'secretagogues', label: 'Growth Hormone Stimulants' },
    { key: 'hormones',      label: 'Hormones & Growth Factors' },
  ],
  modulators: [
    { key: 'sarms',                label: 'SARMs' },
    { key: 'aromatase-inhibitors', label: 'Aromatase Inhibitors' },
    { key: 'serms',                label: 'SERMs / PCT' },
    { key: 'metabolic',            label: 'Metabolic Modulators' },
  ],
  'womens-health': [
    { key: 'weight-loss',    label: 'Weight Loss' },
    { key: 'hair-growth',    label: 'Hair Growth' },
    { key: 'anti-hirsutism', label: 'Anti-Hirsutism' },
    { key: 'skin-health',    label: 'Skin Health' },
    { key: 'hormone-therapy', label: 'Hormone Therapy' },
  ],
  'sexual-health': [
    { key: 'ed-medications',    label: 'ED Medications' },
    { key: 'hormonal-support',  label: 'Hormonal Support' },
    { key: 'sh-peptides',       label: 'Peptides' },
  ],
  'anti-aging': [
    { key: 'skin',        label: 'Skin Rejuvenation' },
    { key: 'longevity',   label: 'Longevity' },
    { key: 'aa-peptides', label: 'Anti-Aging Peptides' },
  ],
};

interface Props {
  categories: { key: string; label: string }[];
  counts: Record<string, number>;
  subCounts: Record<string, number>;
  translations: Record<string, string>;
  subTranslations: Record<string, string>;
}

export default function SidebarCategories({ categories, counts, subCounts, translations, subTranslations }: Props) {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = params.locale as string;
  const category = searchParams.get('category') ?? undefined;
  const sub = searchParams.get('sub') ?? undefined;

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-brand" />
        <span className="text-white font-semibold text-sm">Category</span>
      </div>
      <div className="p-2">
        {categories.map(({ key }) => {
          const active = (!category && key === 'all') || category === key;
          const count = counts[key] ?? 0;
          const hasSubs = !!SUBS[key];
          if (count === 0 && key !== 'all' && key !== 'womens-health') return null;

          const href = active && key !== 'all'
            ? `/${locale}/products`
            : key === 'all'
              ? `/${locale}/products`
              : `/${locale}/products?category=${key}`;

          return (
            <div key={key}>
              <Link
                href={href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
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

              {/* Subcategories with smooth animation */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: active && hasSubs ? `${(SUBS[key]?.length ?? 0) * 44}px` : '0px' }}
              >
                <div className="ml-3 mt-1 mb-1 space-y-0.5">
                  {(SUBS[key] ?? []).map(({ key: sk, label }) => {
                    const subActive = sub === sk;
                    const subHref = subActive
                      ? `/${locale}/products?category=${key}`
                      : `/${locale}/products?category=${key}&sub=${sk}`;
                    const displayLabel = subTranslations[sk] ?? label;
                    const cnt = subCounts[`${key}:${sk}`] ?? 0;
                    return (
                      <Link key={sk} href={subHref}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          subActive ? 'bg-brand/20 text-brand font-semibold' : 'text-muted hover:text-white hover:bg-surface-2'
                        }`}
                      >
                        <span>{displayLabel}</span>
                        <span className={`text-[10px] ${subActive ? 'text-brand' : 'text-muted/50'}`}>{cnt}</span>
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
  );
}
