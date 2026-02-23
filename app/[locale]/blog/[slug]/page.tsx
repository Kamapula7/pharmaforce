import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog-content';

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://pharmaforce-store.com/${locale}/blog/${slug}`,
      images: [{ url: post.photo, alt: post.title }],
    },
  };
}

const TAG_COLOR: Record<string, string> = {
  GUIDE:   'bg-brand/80 text-white',
  SCIENCE: 'bg-sky-500/80 text-white',
  HEALTH:  'bg-green-500/80 text-white',
  TIPS:    'bg-purple-500/80 text-white',
  NEWS:    'bg-orange-500/80 text-white',
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Back */}
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Hero image */}
      <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-8 border border-border">
        <Image
          src={post.photo}
          alt={post.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-5 flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${TAG_COLOR[post.tag] ?? 'bg-brand/80 text-white'}`}>
            {post.tag}
          </span>
          <span className="text-white/70 text-xs font-semibold tracking-widest uppercase">{post.category}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted mb-8 pb-8 border-b border-border">
        <span className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span className="text-white/70">{post.author}</span>
          {post.authorRole && <span>· {post.authorRole}</span>}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {post.readTime} read
        </span>
        <span className="flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" />
          {post.date}
        </span>
      </div>

      {/* Excerpt */}
      <p className="text-white/80 text-lg leading-relaxed mb-10 font-medium border-l-4 border-brand pl-4">
        {post.excerpt}
      </p>

      {/* Article body */}
      <div className="space-y-10">
        {post.sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-bold text-white mb-3">{section.heading}</h2>
            <p className="text-muted leading-relaxed text-[15px]">{section.body}</p>
          </section>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-muted mb-1">Written by</p>
          <p className="text-white font-semibold">{post.author}</p>
          {post.authorRole && <p className="text-xs text-muted">{post.authorRole}</p>}
        </div>
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-brand hover:text-white transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          All Articles
        </Link>
      </div>

    </div>
  );
}
