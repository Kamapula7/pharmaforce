import CheckoutClient from '@/components/checkout/CheckoutClient';

interface CheckoutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = await params;
  return <CheckoutClient locale={locale} />;
}
