import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { FlaskConical, Dumbbell, Pill, Syringe, Atom, SlidersHorizontal, Heart, ShieldPlus, BrainCircuit } from 'lucide-react';

interface CategoryGridProps {
  locale: string;
}

const CATEGORIES = [
  { key: 'protein', icon: Dumbbell, slug: 'protein' },
  { key: 'creatine', icon: Atom, slug: 'creatine' },
  { key: 'amino-acids', icon: FlaskConical, slug: 'amino-acids' },
  { key: 'aas', icon: Syringe, slug: 'aas' },
  { key: 'peptides', icon: Pill, slug: 'peptides' },
  { key: 'modulators', icon: SlidersHorizontal, slug: 'modulators' },
  { key: 'womens-health', icon: Heart, slug: 'womens-health' },
  { key: 'sexual-health', icon: ShieldPlus, slug: 'sexual-health' },
  { key: 'antidepressants', icon: BrainCircuit, slug: 'antidepressants' },
] as const;

export default function CategoryGrid({ locale }: CategoryGridProps) {
  const t = useTranslations('categories');
  const tHome = useTranslations('home');

  return (
    <section className="py-16 bg-surface-2/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-white mb-8">{tHome('shopByCategory')}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.key}
                href={`/${locale}/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-2 p-3 bg-surface border border-border rounded-xl hover:border-brand/50 hover:bg-brand/5 transition-all duration-200 text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                  <Icon className="w-5 h-5 text-brand" />
                </div>
                <span className="text-[11px] text-muted group-hover:text-white transition-colors font-medium leading-tight">
                  {t(cat.key)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
