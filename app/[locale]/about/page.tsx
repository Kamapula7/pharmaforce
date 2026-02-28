import type { Metadata } from 'next';
import { FlaskConical, Truck, Award, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'About PharmaForce — Pharmaceutical-Grade Sports Products Europe',
    description: 'PharmaForce is a trusted European supplier of pharmaceutical-grade sports pharmacology, supplements and performance products. Lab-certified quality, discreet EU delivery.',
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/about`,
      languages: {
        'en': 'https://pharmaforce-store.com/en/about',
        'de': 'https://pharmaforce-store.com/de/about',
        'fr': 'https://pharmaforce-store.com/fr/about',
        'it': 'https://pharmaforce-store.com/it/about',
        'pl': 'https://pharmaforce-store.com/pl/about',
        'es': 'https://pharmaforce-store.com/es/about',
      },
    },
    openGraph: {
      title: 'About PharmaForce — Pharmaceutical-Grade Sports Products Europe',
      description: 'PharmaForce is a trusted European supplier of pharmaceutical-grade sports pharmacology, supplements and performance products.',
      url: `https://pharmaforce-store.com/${locale}/about`,
      siteName: 'PharmaForce',
      images: [{ url: 'https://pharmaforce-store.com/hero-athletes.png', width: 1200, height: 630, alt: 'About PharmaForce' }],
      type: 'website',
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  const features = [
    { icon: FlaskConical, title: t('labCertTitle'), desc: t('labCertDesc') },
    { icon: Truck,        title: t('shippingTitle'), desc: t('shippingDesc') },
    { icon: Award,        title: t('qualityTitle'),  desc: t('qualityDesc') },
    { icon: Users,        title: t('athletesTitle'), desc: t('athletesDesc') },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-4">{t('title')}</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-6 bg-surface border border-border rounded-xl">
            <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-brand" />
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-muted text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{t('commitmentTitle')}</h2>
        <p className="text-muted leading-relaxed max-w-2xl mx-auto">
          {t('commitmentText')}
        </p>
      </div>
    </div>
  );
}
