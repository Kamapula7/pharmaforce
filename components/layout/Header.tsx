'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Zap, ChevronLeft, Search, Package, LogOut, LogIn, UserPlus, Heart } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import LanguageSwitcher from './LanguageSwitcher';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import SearchInput from '@/components/search/SearchInput';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const tAcc = useTranslations('account');
  const tPromo = useTranslations('promo');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
      if (searchOpen && searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [searchOpen]);
  const cartCount = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.ids.length);
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
    <header className="sticky top-0 z-50">
      {/* Promo announcement bar */}
      <div className="bg-brand text-dark text-xs font-bold text-center py-2 px-4 flex flex-wrap items-center justify-center gap-2">
        <span>🎁</span>
        <span>{tPromo('banner')}</span>
        <span className="hidden sm:inline">·</span>
        <Link href={`/${locale}/products?promo=true`} className="hidden sm:inline underline hover:no-underline">
          {tPromo('seeAll')}
        </Link>
      </div>

      <div className="bg-dark/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
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
          <Link href={`/${locale}/products`} className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brand rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-dark fill-dark" />
            </div>
            <span className="text-white font-bold text-base sm:text-lg tracking-tight hidden sm:inline">
              Pharma<span className="text-brand">Force</span>
            </span>
            <span className="text-white font-bold text-base sm:hidden">
              PF
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
          <div className="flex items-center gap-0.5 sm:gap-2 overflow-visible shrink-0 pr-1 sm:pr-0">
            {/* Search — всегда видна */}
            <div ref={searchRef} className={`flex items-center shrink-0 transition-all duration-300 ${searchOpen ? 'flex-1 min-w-[140px] w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px]' : 'w-9 sm:w-10'}`}>
              {searchOpen ? (
                <div className="w-full relative">
                  <SearchInput
                    locale={locale}
                    placeholder={t('searchPlaceholder')}
                    autoFocus
                    onClose={() => setSearchOpen(false)}
                  />
                </div>
              ) : (
                <button type="button" onClick={() => setSearchOpen(true)} className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-muted hover:text-white transition-colors rounded-lg hover:bg-surface-2 shrink-0" aria-label="Search">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            <div className={`shrink-0 ${searchOpen ? 'hidden sm:block' : ''}`}>
              <LanguageSwitcher currentLocale={locale} />
            </div>

            {/* Account */}
            <div
              ref={accountRef}
              className={`relative shrink-0 ${searchOpen ? 'hidden sm:block' : ''}`}
            >
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className={`p-2 transition-colors rounded-lg hover:bg-surface-2 flex items-center gap-1 cursor-pointer ${session ? 'text-brand' : 'text-muted hover:text-white'}`}
                aria-label={t('account')}
              >
                <User className="w-5 h-5" />
                {session && (
                  <span className="hidden sm:block text-xs font-medium max-w-[80px] truncate">
                    {session.user?.name?.split(' ')[0] || tAcc('title')}
                  </span>
                )}
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full pt-1 w-48 z-50 max-w-[calc(100vw-1rem)]">
                  <div className="bg-[#111118] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    {session ? (
                      <>
                        <div className="px-4 py-3 border-b border-white/8">
                          <p className="text-white text-xs font-semibold truncate">{session.user?.name || 'Athlete'}</p>
                          <p className="text-muted text-[11px] truncate">{session.user?.email}</p>
                        </div>
                        <Link
                          href={`/${locale}/account`}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <User className="w-4 h-4" /> {tAcc('title')}
                        </Link>
                        <Link
                          href={`/${locale}/account`}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <Package className="w-4 h-4" /> {tAcc('orders')}
                        </Link>
                        <button
                          onClick={() => { signOut({ callbackUrl: `/${locale}/account` }); setAccountOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors border-t border-white/8"
                        >
                          <LogOut className="w-4 h-4" /> {tAcc('logout')}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/${locale}/account`}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <LogIn className="w-4 h-4" /> {tAcc('login')}
                        </Link>
                        <Link
                          href={`/${locale}/account?tab=register`}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-brand hover:bg-white/5 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <UserPlus className="w-4 h-4" /> {tAcc('register')}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/wishlist`}
              className={`relative flex items-center justify-center shrink-0 w-9 h-9 sm:w-10 sm:h-10 transition-colors rounded-lg hover:bg-surface-2 ${searchOpen ? 'hidden sm:flex' : ''} ${wishlistCount > 0 ? 'text-red-500' : 'text-muted hover:text-white'}`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-current' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href={`/${locale}/cart`}
              className="relative flex items-center justify-center shrink-0 w-9 h-9 sm:w-10 sm:h-10 text-muted hover:text-white transition-colors rounded-lg hover:bg-surface-2"
              aria-label={t('cart')}
            >
              <ShoppingCart className="w-5 h-5 shrink-0" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand text-dark text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile toggle — Products, Blog, About */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center shrink-0 w-9 h-9 sm:w-10 sm:h-10 text-muted hover:text-white transition-colors rounded-lg hover:bg-surface-2"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
            <div className="px-3 py-2 border-t border-border mt-2 pt-2">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <div className="px-3 pt-2 space-y-1 border-t border-border mt-2 pt-2">
              {session ? (
                <>
                  <Link
                    href={`/${locale}/account`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-muted hover:text-white hover:bg-surface-2 rounded-lg text-sm font-medium"
                  >
                    <User className="w-4 h-4" /> {tAcc('title')}
                  </Link>
                  <button
                    onClick={() => { signOut({ callbackUrl: `/${locale}/account` }); setMobileOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" /> {tAcc('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={`/${locale}/account`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-muted hover:text-white hover:bg-surface-2 rounded-lg text-sm font-medium"
                  >
                    <LogIn className="w-4 h-4" /> {tAcc('login')}
                  </Link>
                  <Link
                    href={`/${locale}/account?tab=register`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-brand hover:bg-brand/10 rounded-lg text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" /> {tAcc('register')}
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
      </div>
    </header>
  );
}
