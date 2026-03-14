'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Zap, Mail } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const tCat = useTranslations('categories');
  const year = 2026;

  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-dark fill-dark" />
              </div>
              <span className="text-white font-bold text-lg">
                Pharma<span className="text-brand">Force</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-3">{t('tagline')}</p>
            <a
              href="mailto:pharmaforce@inbox.eu"
              className="inline-flex items-center gap-1.5 text-muted hover:text-brand transition-colors text-sm mb-4"
            >
              <Mail className="w-3.5 h-3.5" />
              pharmaforce@inbox.eu
            </a>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('shop')}</h3>
            <ul className="space-y-2">
              {(['protein', 'creatine', 'amino-acids', 'aas', 'peptides', 'modulators', 'womens-health', 'sexual-health', 'antidepressants'] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/products?category=${key}`}
                    className="text-muted hover:text-white transition-colors text-sm break-words"
                  >
                    {tCat(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-muted hover:text-white transition-colors text-sm break-words">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-muted hover:text-white transition-colors text-sm break-words">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-muted hover:text-white transition-colors text-sm break-words">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/shipping`} className="text-muted hover:text-white transition-colors text-sm break-words">
                  {t('shippingInfo')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="text-muted hover:text-white transition-colors text-sm break-words">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-muted hover:text-white transition-colors text-sm break-words">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-muted hover:text-white transition-colors text-sm break-words">
                  {t('terms')}
                </Link>
              </li>
            </ul>

            {/* EU badges */}
            <div className="mt-6 space-y-1">
              <p className="text-xs text-muted">{t('gdpr')}</p>
              <p className="text-xs text-muted">{t('secureTransfer')}</p>
              <p className="text-xs text-muted">{t('euShipping')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-sm">
            © {year} PharmaForce. {t('allRights')}
          </p>
          <p className="text-muted text-xs">pharmaforce-store.com</p>
        </div>
      </div>
    </footer>
  );
}
