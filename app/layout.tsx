import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PharmaForce — Premium Sports Pharmacology & Supplements',
  description:
    'Professional-grade supplements, vitamins, and sports pharmacology. Trusted by athletes across Europe. Fast EU delivery.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
