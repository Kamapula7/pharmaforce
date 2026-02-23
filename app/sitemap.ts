import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/products';
import { BLOG_POSTS } from '@/lib/blog-content';

const BASE = 'https://pharmaforce-store.com';
const LOCALES = ['en', 'de', 'pl', 'fr', 'it'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages per locale
  const staticPages = LOCALES.flatMap((locale) => [
    {
      url: `${BASE}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE}/${locale}/products`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE}/${locale}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE}/${locale}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${BASE}/${locale}/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]);

  // Category pages
  const categories = ['aas', 'peptides', 'modulators', 'womens-health', 'protein', 'creatine', 'amino-acids'];
  const categoryPages = LOCALES.flatMap((locale) =>
    categories.map((cat) => ({
      url: `${BASE}/${locale}/products?category=${cat}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  // Product pages (only EN to avoid duplicate content)
  const productPages = PRODUCTS.map((p) => ({
    url: `${BASE}/en/products/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog posts (only EN)
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${BASE}/en/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
