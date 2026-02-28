import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: 'PharmaForce — Be Better Than Yesterday',
    description: 'Pharmaceutical-grade supplements, AAS, peptides and performance modulators — discreet delivery straight to your door across Europe.',
  },
  de: {
    title: 'PharmaForce — Sei besser als gestern',
    description: 'Pharmazeutische Qualität: Supplemente, AAS, Peptide und Performance-Modulatoren — diskreter Versand in ganz Europa.',
  },
  pl: {
    title: 'PharmaForce — Bądź lepszy niż wczoraj',
    description: 'Farmaceutyczna jakość: suplementy, AAS, peptydy i modulatory wydajności — dyskretna dostawa po całej Europie.',
  },
  fr: {
    title: 'PharmaForce — Sois meilleur qu\'hier',
    description: 'Suppléments de qualité pharmaceutique, AAS, peptides et modulateurs de performance — livraison discrète dans toute l\'Europe.',
  },
  it: {
    title: 'PharmaForce — Sii migliore di ieri',
    description: 'Integratori di qualità farmaceutica, AAS, peptidi e modulatori delle prestazioni — consegna discreta in tutta Europa.',
  },
  es: {
    title: 'PharmaForce — Sé mejor que ayer',
    description: 'Suplementos de grado farmacéutico, AAS, péptidos y moduladores del rendimiento — envío discreto a toda Europa.',
  },
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.en;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}`,
      languages: {
        en: 'https://pharmaforce-store.com/en',
        de: 'https://pharmaforce-store.com/de',
        pl: 'https://pharmaforce-store.com/pl',
        fr: 'https://pharmaforce-store.com/fr',
        it: 'https://pharmaforce-store.com/it',
        es: 'https://pharmaforce-store.com/es',
        'x-default': 'https://pharmaforce-store.com/en',
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://pharmaforce-store.com/${locale}`,
      siteName: 'PharmaForce',
      images: [{ url: 'https://pharmaforce-store.com/hero-athletes.png', width: 1200, height: 630, alt: 'PharmaForce — Pharmaceutical Grade Supplements' }],
      type: 'website',
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <FeaturesSection />
    </>
  );
}
