import type { Metadata } from 'next';
import WishlistClient from '@/components/product/WishlistClient';

interface WishlistPageProps {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: 'Wishlist | PharmaForce',
  robots: { index: false, follow: false },
};

export default async function WishlistPage({ params }: WishlistPageProps) {
  const { locale } = await params;
  return <WishlistClient locale={locale} />;
}
