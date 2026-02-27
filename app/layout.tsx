import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'PharmaForce — Be Better Than Yesterday',
    template: '%s | PharmaForce',
  },
  description: 'Pharmaceutical-grade supplements, AAS, peptides and performance modulators — discreet delivery straight to your door across Europe.',
  keywords: [
    'buy steroids europe', 'buy semaglutide europe', 'wegovy buy online', 'mounjaro online EU',
    'buy peptides europe', 'sarms for sale', 'pharmaceutical grade supplements',
    'buy hgh europe', 'testosterone enanthate buy', 'anavar buy online europe',
    'saxenda buy online', 'GLP-1 injections europe', 'weight loss injections EU',
    'sports pharmacology', 'buy finasteride online', 'buy minoxidil europe',
  ],
  authors: [{ name: 'PharmaForce' }],
  creator: 'PharmaForce',
  metadataBase: new URL('https://pharmaforce-store.com'),
  alternates: {
    canonical: 'https://pharmaforce-store.com/en',
    languages: {
      'en':    'https://pharmaforce-store.com/en',
      'de':    'https://pharmaforce-store.com/de',
      'pl':    'https://pharmaforce-store.com/pl',
      'fr':    'https://pharmaforce-store.com/fr',
      'it':    'https://pharmaforce-store.com/it',
      'es':    'https://pharmaforce-store.com/es',
      'x-default': 'https://pharmaforce-store.com/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pharmaforce-store.com',
    siteName: 'PharmaForce',
    title: 'PharmaForce — Be Better Than Yesterday',
    description: 'Pharmaceutical-grade supplements, AAS, peptides and performance modulators — discreet delivery straight to your door across Europe.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PharmaForce — Premium Sports Pharmacology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PharmaForce — Be Better Than Yesterday',
    description: 'Pharmaceutical-grade supplements, AAS, peptides and performance modulators — discreet EU delivery.',
    images: ['/og-image.png'],
  },
  verification: {
    google: '9TNZ3yiyaWbFBwaAntPC2PDclFhr_PvwMXBEcgZ1ydU',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://pharmaforce-store.com/#organization',
      name: 'PharmaForce',
      url: 'https://pharmaforce-store.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pharmaforce-store.com/og-image.png',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'pharmaforce@inbox.eu',
        contactType: 'customer support',
        availableLanguage: ['English', 'German', 'French', 'Italian', 'Polish'],
      },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://pharmaforce-store.com/#website',
      url: 'https://pharmaforce-store.com',
      name: 'PharmaForce',
      publisher: { '@id': 'https://pharmaforce-store.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://pharmaforce-store.com/en/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geist.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SessionProviderWrapper>
        {children}
        </SessionProviderWrapper>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BTZK8NZQ95"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BTZK8NZQ95');
        `}</Script>
      </body>
    </html>
  );
}
