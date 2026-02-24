'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Zap, ChevronLeft, Search, Package, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import LanguageSwitcher from './LanguageSwitcher';
import { useCartStore } from '@/store/cartStore';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const cartCount = useCartStore((s) => s.totalItems());
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

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
      <div className="bg-brand text-dark text-xs font-bold text-center py-2 px-4 flex items-center justify-center gap-2">
        <span>🎁</span>
        <span>BUY 2 — GET 3rd FREE on selected products across the store</span>
        <span className="hidden sm:inline">·</span>
        <Link href={`/${locale}/products?promo=true`} className="hidden sm:inline underline hover:no-underline">
          See all promo products →
        </Link>
      </div>

      <div className="bg-dark/95 backdrop-blur-md border-b border-border">
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
          <Link href={`/${locale}/products`} className="flex items-center gap-2 group">
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
            {/* Search */}
            <form onSubmit={handleSearch} className={`flex items-center transition-all duration-300 overflow-hidden ${searchOpen ? 'w-44 sm:w-56' : 'w-8'}`}>
              {searchOpen ? (
                <div className="flex items-center w-full bg-surface border border-brand/40 rounded-lg overflow-hidden">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-transparent text-white text-sm px-3 py-1.5 outline-none placeholder:text-muted/50 min-w-0"
                  />
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-1.5 text-muted hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setSearchOpen(true)} className="p-2 text-muted hover:text-white transition-colors rounded-lg hover:bg-surface-2" aria-label="Search">
                  <Search className="w-5 h-5" />
                </button>
              )}
            </form>

            <LanguageSwitcher currentLocale={locale} />

            {/* Account dropdown */}
            <div
              ref={accountRef}
              className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className={`p-2 transition-colors rounded-lg hover:bg-surface-2 flex items-center gap-1 ${session ? 'text-brand' : 'text-muted hover:text-white'}`}
                aria-label={t('account')}
              >
                <User className="w-5 h-5" />
                {session && (
                  <span className="hidden sm:block text-xs font-medium max-w-[80px] truncate">
                    {session.user?.name?.split(' ')[0] || 'Account'}
                  </span>
                )}
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full pt-1 w-48 z-50">
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
                          <User className="w-4 h-4" /> My Account
                        </Link>
                        <Link
                          href={`/${locale}/account`}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <Package className="w-4 h-4" /> My Orders
                        </Link>
                        <button
                          onClick={() => { signOut({ callbackUrl: `/${locale}/account` }); setAccountOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 transition-colors border-t border-white/8"
                        >
                          <LogOut className="w-4 h-4" /> Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/${locale}/account`}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <LogIn className="w-4 h-4" /> Login
                        </Link>
                        <Link
                          href={`/${locale}/account?tab=register`}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-brand hover:bg-white/5 transition-colors"
                          onClick={() => setAccountOpen(false)}
                        >
                          <UserPlus className="w-4 h-4" /> Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

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
      </div>
    </header>
  );
}
