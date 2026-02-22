import AccountClient from '@/components/account/AccountClient';

interface AccountPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params;
  return <AccountClient locale={locale} />;
}
