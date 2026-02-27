import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';
import { BLOG_POSTS } from '@/lib/blog-content';

const BASE = 'https://pharmaforce-store.com';
const LOCALES = ['en', 'de', 'pl', 'fr', 'it', 'es'];

type SitemapEntry = MetadataRoute.Sitemap[number];

function hreflangAlternates(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  LOCALES.forEach(locale => {
    langs[locale] = `${BASE}/${locale}${path}`;
  });
  langs['x-default'] = `${BASE}/en${path}`;
  return langs;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages — all locales with hreflang
  const staticPaths = [
    { path: '',          priority: 1.0, freq: 'weekly'  as const },
    { path: '/products', priority: 0.9, freq: 'daily'   as const },
    { path: '/blog',     priority: 0.8, freq: 'weekly'  as const },
    { path: '/about',    priority: 0.5, freq: 'monthly' as const },
    { path: '/contact',  priority: 0.4, freq: 'monthly' as const },
    { path: '/shipping', priority: 0.4, freq: 'monthly' as const },
    { path: '/faq',      priority: 0.4, freq: 'monthly' as const },
    { path: '/terms',    priority: 0.3, freq: 'yearly'  as const },
    { path: '/privacy',  priority: 0.3, freq: 'yearly'  as const },
  ];

  const staticPages: SitemapEntry[] = staticPaths.flatMap(({ path, priority, freq }) =>
    LOCALES.map(locale => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
      alternates: { languages: hreflangAlternates(path) },
    }))
  );

  // Category pages — all locales
  const categories = [
    'aas', 'peptides', 'modulators', 'womens-health', 'sexual-health',
    'anti-aging', 'protein', 'creatine', 'amino-acids', 'antidepressants',
  ];
  const categoryPages: SitemapEntry[] = categories.flatMap(cat =>
    LOCALES.map(locale => ({
      url: `${BASE}/${locale}/products?category=${cat}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map(l => [l, `${BASE}/${l}/products?category=${cat}`])
        ),
      },
    }))
  );

  // Product pages — all locales with hreflang
  const productPages: SitemapEntry[] = PRODUCTS.flatMap(p =>
    LOCALES.map(locale => ({
      url: `${BASE}/${locale}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map(l => [l, `${BASE}/${l}/products/${p.slug}`])),
          'x-default': `${BASE}/en/products/${p.slug}`,
        },
      },
    }))
  );

  // Blog posts — all locales with hreflang
  const blogPages: SitemapEntry[] = BLOG_POSTS.flatMap(post =>
    LOCALES.map(locale => ({
      url: `${BASE}/${locale}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map(l => [l, `${BASE}/${l}/blog/${post.slug}`])),
          'x-default': `${BASE}/en/blog/${post.slug}`,
        },
      },
    }))
  );

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
