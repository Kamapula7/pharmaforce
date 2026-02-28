import type { Metadata } from 'next';
import CartPageClient from '@/components/cart/CartPageClient';

interface CartPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CartPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Cart | PharmaForce',
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/cart`,
    },
  };
}

export default async function CartPage({ params }: CartPageProps) {
  const { locale } = await params;
  return <CartPageClient locale={locale} />;
}
