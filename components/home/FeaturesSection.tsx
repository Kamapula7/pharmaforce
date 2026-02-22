'use client';

import { useTranslations } from 'next-intl';
import { FlaskConical, Truck, HeadphonesIcon, Landmark } from 'lucide-react';

const ICONS = [FlaskConical, Truck, HeadphonesIcon, Landmark];
const FEATURE_KEYS = ['quality', 'delivery', 'support', 'payment'] as const;

export default function FeaturesSection() {
  const t = useTranslations('home.features');

  const handleSupportClick = () => {
    if (window.Tawk_API?.maximize) {
      window.Tawk_API.maximize();
    } else if (window.Tawk_API?.toggle) {
      window.Tawk_API.toggle();
    }
  };

  return (
    <section className="py-20 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">{t('title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = ICONS[i];
            const isSupport = key === 'support';
            return (
              <div
                key={key}
                onClick={isSupport ? handleSupportClick : undefined}
                className={`group p-6 rounded-xl bg-dark border border-border hover:border-brand/50 transition-all duration-300 hover:-translate-y-1 ${isSupport ? 'cursor-pointer' : ''}`}
              >
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <Icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-white font-semibold mb-2">{t(`${key}.title`)}</h3>
                <p className="text-muted text-sm leading-relaxed">{t(`${key}.desc`)}</p>
                {isSupport && (
                  <span className="inline-block mt-3 text-brand text-xs font-semibold hover:underline">
                    Start chat →
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
