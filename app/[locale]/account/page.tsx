import type { Metadata } from 'next';
import AccountClient from '@/components/account/AccountClient';

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AccountPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'My Account | PharmaForce',
    robots: { index: false, follow: false },
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/account`,
    },
  };
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params;
  return <AccountClient locale={locale} />;
}
