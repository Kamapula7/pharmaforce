'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Zap, ChevronLeft } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useCartStore } from '@/store/cartStore';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((s) => s.totalItems());
  const router = useRouter();
  const pathname = usePathname();

  // Show back button only when user is NOT on the homepage
  const isHome = pathname === `/${locale}` || pathname === '/';
  const showBack = !isHome;

  const navLinks = [
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/about`, label: t('about') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Back + Logo */}
          <div className="flex items-center gap-1">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="p-1.5 text-muted hover:text-white transition-colors rounded-lg hover:bg-surface-2"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-dark fill-dark" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Pharma<span className="text-brand">Force</span>
            </span>
          </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />

            <Link
              href={`/${locale}/account`}
              className="p-2 text-muted hover:text-white transition-colors rounded-lg hover:bg-surface-2"
              aria-label={t('account')}
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href={`/${locale}/cart`}
              className="relative p-2 text-muted hover:text-white transition-colors rounded-lg hover:bg-surface-2"
              aria-label={t('cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand text-dark text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-muted hover:text-white transition-colors rounded-lg hover:bg-surface-2"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-border space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-muted hover:text-white hover:bg-surface-2 rounded-lg transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
