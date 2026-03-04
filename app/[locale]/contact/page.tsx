import type { Metadata } from 'next';
import { Mail, MessageSquare, Clock, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contact/ContactForm';
import LiveChatCard from '@/components/contact/LiveChatCard';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `Contact PharmaForce — ${t('title')}`,
    description: t('subtitle'),
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/contact`,
      languages: {
        'en': 'https://pharmaforce-store.com/en/contact',
        'de': 'https://pharmaforce-store.com/de/contact',
        'fr': 'https://pharmaforce-store.com/fr/contact',
        'it': 'https://pharmaforce-store.com/it/contact',
        'pl': 'https://pharmaforce-store.com/pl/contact',
        'es': 'https://pharmaforce-store.com/es/contact',
      },
    },
    openGraph: {
      title: `Contact PharmaForce — ${t('title')}`,
      description: t('subtitle'),
      url: `https://pharmaforce-store.com/${locale}/contact`,
      siteName: 'PharmaForce',
      images: [{ url: 'https://pharmaforce-store.com/hero-athletes.png', width: 1200, height: 630, alt: 'Contact PharmaForce' }],
      type: 'website',
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">{t('badge')}</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{t('title')}</h1>
        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Contact form */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-brand" />
            {t('sendMessage')}
          </h2>

          <ContactForm />
        </div>

        {/* Info cards */}
        <div className="space-y-5">

          {/* Email */}
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-brand/40 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                <Mail className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{t('emailSupport')}</h3>
                <p className="text-muted text-sm mb-2">{t('emailSupportDesc')}</p>
                <a
                  href="mailto:pharmaforce@inbox.eu"
                  className="text-brand font-semibold hover:underline text-sm"
                >
                  pharmaforce@inbox.eu
                </a>
              </div>
            </div>
          </div>

          {/* Live chat — click to open Crisp */}
          <LiveChatCard>
            <div className="bg-surface border border-border rounded-2xl p-6 hover:border-brand/40 transition-colors group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{t('liveChat')}</h3>
                  <p className="text-muted text-sm mb-2">{t('liveChatDesc')}</p>
                  <p className="text-xs text-muted flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-success inline-block animate-pulse" />
                    {t('liveChatOnline')}
                  </p>
                </div>
              </div>
            </div>
          </LiveChatCard>

          {/* Response time */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{t('responseTime')}</h3>
                <ul className="space-y-1 text-sm text-muted">
                  <li>📧 {t('emailResponse')} <span className="text-white">2–6 {t('hours')}</span></li>
                  <li>💬 {t('liveChatResponse')}</li>
                  <li>🕐 {t('workingHours')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ hint */}
          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5">
            <p className="text-sm text-white/80 leading-relaxed">
              <span className="text-brand font-bold">{t('beforeWriting')}</span>{' '}
              <span className="text-brand font-semibold">{t('blog')}</span>
              {t('beforeWritingSuffix')}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
