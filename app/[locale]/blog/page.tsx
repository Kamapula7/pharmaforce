import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-content';
import { getBlogPostForLocale } from '@/lib/blog-translations';
import { getTranslations } from 'next-intl/server';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Blog — Sports Pharmacology & Performance Guides | PharmaForce',
    description: 'Evidence-based guides on anabolic steroids, peptides, PCT, SARMs and sports nutrition for European athletes. Expert articles by sports pharmacologists.',
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/blog`,
      languages: {
        'en': 'https://pharmaforce-store.com/en/blog',
        'de': 'https://pharmaforce-store.com/de/blog',
        'fr': 'https://pharmaforce-store.com/fr/blog',
        'pl': 'https://pharmaforce-store.com/pl/blog',
        'it': 'https://pharmaforce-store.com/it/blog',
      },
    },
    openGraph: {
      title: 'PharmaForce Blog — Performance & Pharmacology Guides',
      description: 'Expert guides on testosterone cycles, PCT, peptides, SARMs and sports supplementation for European athletes.',
      url: `https://pharmaforce-store.com/${locale}/blog`,
      type: 'website',
    },
  };
}

const TAG_STYLE: Record<string, string> = {
  GUIDE:   'bg-brand/80 text-white',
  SCIENCE: 'bg-sky-500/80 text-white',
  HEALTH:  'bg-green-500/80 text-white',
  TIPS:    'bg-purple-500/80 text-white',
  NEWS:    'bg-orange-500/80 text-white',
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const localizedPosts = BLOG_POSTS.map((p) => getBlogPostForLocale(p, locale));
  const [featured, ...rest] = localizedPosts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-10">
        <p className="text-brand text-xs font-bold tracking-[0.2em] uppercase mb-2">{t('expertKnowledge')}</p>
        <h1 className="text-4xl font-black text-white mb-3">
          PharmaForce <span className="text-brand">Blog</span>
        </h1>
        <p className="text-muted text-sm max-w-lg">
          {t('subtitle')}
        </p>
      </div>

      {/* Featured post — large horizontal card */}
      <Link href={`/${locale}/blog/${featured.slug}`} className="group block mb-10">
        <article className="relative rounded-2xl overflow-hidden h-[420px] border border-border hover:border-brand/50 transition-all duration-300">
          <Image
            src={featured.photo}
            alt={featured.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${TAG_STYLE[featured.tag] ?? 'bg-brand/80 text-white'}`}>
                {featured.tag}
              </span>
              <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">{featured.category}</span>
              <span className="text-white/50 text-xs flex items-center gap-1 ml-auto">
                <Clock className="w-3 h-3" /> {featured.readTime} read
              </span>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-black leading-tight mb-3 max-w-2xl group-hover:text-brand transition-colors">
              {featured.title}
            </h2>
            <p className="text-white/70 text-sm max-w-xl leading-relaxed mb-4 hidden md:block">
              {featured.excerpt}
            </p>
              <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs">{t('by')} <span className="text-white/80">{featured.author}</span> · {featured.date}</span>
              <div className="flex items-center gap-2 text-brand font-bold text-sm">
                {t('readArticle')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </article>
      </Link>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group">
            <article className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-brand/40 transition-all duration-300 h-full flex flex-col">

              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.photo}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${TAG_STYLE[post.tag] ?? 'bg-brand/80 text-white'}`}>
                    {post.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <p className="text-white/80 text-[10px] font-bold tracking-widest uppercase">{post.category}</p>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-white font-bold leading-snug mb-2 group-hover:text-brand transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted">
                    <span className="text-white/70">{post.author}</span> · {post.date}
                  </span>
                  <span className="text-xs text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
