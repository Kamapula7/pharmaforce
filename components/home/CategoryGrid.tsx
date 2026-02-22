import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface CategoryGridProps {
  locale: string;
}

const CATEGORIES = [
  { key: 'protein', emoji: '🥛', slug: 'protein' },
  { key: 'aminoacids', emoji: '🧬', slug: 'aminoacids' },
  { key: 'vitamins', emoji: '💊', slug: 'vitamins' },
  { key: 'fatBurners', emoji: '🔥', slug: 'fat-burners' },
  { key: 'preworkout', emoji: '⚡', slug: 'preworkout' },
  { key: 'joints', emoji: '🦴', slug: 'joints' },
  { key: 'testosterone', emoji: '💪', slug: 'testosterone' },
  { key: 'sleep', emoji: '🌙', slug: 'sleep' },
] as const;

export default function CategoryGrid({ locale }: CategoryGridProps) {
  const t = useTranslations('categories');

  return (
    <section className="py-16 bg-surface-2/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-white mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/${locale}/products?category=${cat.slug}`}
              className="group flex flex-col items-center gap-2 p-3 bg-surface border border-border rounded-xl hover:border-brand/50 hover:bg-brand/5 transition-all duration-200 text-center"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-xs text-muted group-hover:text-white transition-colors font-medium leading-tight">
                {t(cat.key)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
