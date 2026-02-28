import type { Metadata } from 'next';
import OrderConfirmationClient from '@/components/checkout/OrderConfirmationClient';

interface OrderConfirmationPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string; total?: string }>;
}

export const metadata: Metadata = {
  title: 'Order Confirmed | PharmaForce',
  robots: { index: false, follow: false },
};

export default async function OrderConfirmationPage({ params, searchParams }: OrderConfirmationPageProps) {
  const { locale } = await params;
  const { ref, total } = await searchParams;
  return <OrderConfirmationClient locale={locale} orderRef={ref ?? ''} total={parseFloat(total ?? '0')} />;
}
