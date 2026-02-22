import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-0 min-h-[720px]">

          {/* ── LEFT: text ── */}
          <div className="py-24 md:py-32 relative z-10">
            <div className="mb-6">
              <Badge variant="brand" className="text-xs">
                ⚡ {t('badge')}
              </Badge>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              {t('title')}{' '}
              <span className="text-brand relative inline-block">
                {t('titleAccent')}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 9C50 3 150 1 299 9" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              {t('description')}
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Link href={`/${locale}/products`}>
                <Button size="lg" variant="primary" className="group shadow-xl shadow-brand/30">
                  {t('cta')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={`/${locale}/about`}>
                <Button size="lg" variant="outline">
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-surface-2 border-2 border-dark flex items-center justify-center text-xs font-bold text-brand"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand text-brand" />
                    ))}
                  </div>
                  <p className="text-xs text-white/50">2,400+ happy athletes</p>
                </div>
              </div>
              <div className="flex items-center gap-5 text-sm text-white/60">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  Lab certified
                </span>
              </div>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <span className="text-lg">🚚</span>
                <div>
                  <p className="text-white text-xs font-bold">Доставка по всей Европе</p>
                  <p className="text-white/50 text-[11px]">30+ стран ЕС</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <span className="text-lg">😊</span>
                <div>
                  <p className="text-white text-xs font-bold">0 недовольных клиентов</p>
                  <p className="text-white/50 text-[11px]">Гарантия качества</p>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* ── RIGHT: athletes photo — full body, no cropping ── */}
          <div className="hidden lg:block h-full relative min-h-[720px]">
            <Image
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=95"
              alt="Muscular athlete in the gym"
              fill
              className="object-cover object-center"
              quality={95}
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
    </section>
  );
}
