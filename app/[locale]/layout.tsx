import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TawkChat from '@/components/layout/TawkChat';
import FloatingChatButton from '@/components/layout/FloatingChatButton';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'de' | 'pl' | 'fr' | 'it')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col bg-dark">
            <Header locale={locale}  />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
          </div>
          <TawkChat />
          <FloatingChatButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
