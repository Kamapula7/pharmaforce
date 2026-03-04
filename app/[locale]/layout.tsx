import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CrispChat from '@/components/layout/CrispChat';
import TawkChat from '@/components/layout/TawkChat';
import FloatingChatButton from '@/components/layout/FloatingChatButton';
import LangSetter from '@/components/layout/LangSetter';
import PageTracker from '@/components/layout/PageTracker';
import AbandonedCartTracker from '@/components/cart/AbandonedCartTracker';

const BASE = 'https://pharmaforce-store.com';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: {
        'en':       `${BASE}/en`,
        'de':       `${BASE}/de`,
        'fr':       `${BASE}/fr`,
        'pl':       `${BASE}/pl`,
        'it':       `${BASE}/it`,
        'es':       `${BASE}/es`,
        'x-default': `${BASE}/en`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'de' | 'pl' | 'fr' | 'it' | 'es')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LangSetter locale={locale} />
      <div className="min-h-screen flex flex-col bg-dark overflow-x-hidden">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
      <PageTracker />
      <AbandonedCartTracker locale={locale} />
      <CrispChat />
      <TawkChat />
      <FloatingChatButton />
    </NextIntlClientProvider>
  );
}
