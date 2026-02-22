import OrderConfirmationClient from '@/components/checkout/OrderConfirmationClient';

interface OrderConfirmationPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string; total?: string }>;
}

export default async function OrderConfirmationPage({ params, searchParams }: OrderConfirmationPageProps) {
  const { locale } = await params;
  const { ref, total } = await searchParams;
  return <OrderConfirmationClient locale={locale} orderRef={ref ?? ''} total={parseFloat(total ?? '0')} />;
}
