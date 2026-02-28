import type { Metadata } from 'next';
import CheckoutClient from '@/components/checkout/CheckoutClient';

interface CheckoutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Checkout | PharmaForce',
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/checkout`,
    },
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params;
  return <CheckoutClient locale={locale} />;
}
