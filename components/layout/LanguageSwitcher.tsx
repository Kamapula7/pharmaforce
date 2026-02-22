'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LOCALES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'pl', label: 'PL', flag: '🇵🇱' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
];

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const current = LOCALES.find((l) => l.code === currentLocale) ?? LOCALES[0];

  const switchLocale = (locale: string) => {
    const segments = pathname.split('/');
    const isLocalePrefix = LOCALES.some((l) => l.code === segments[1]);
    if (isLocalePrefix) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    router.push(segments.join('/') || '/');
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-muted hover:text-white transition-colors rounded-lg hover:bg-surface-2 text-sm font-medium"
      >
        <Globe className="w-4 h-4" />
        <span>{current.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-surface border border-border rounded-lg shadow-xl overflow-hidden min-w-[100px]">
            {LOCALES.map((locale) => (
              <button
                key={locale.code}
                onClick={() => switchLocale(locale.code)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-surface-2 ${
                  locale.code === currentLocale ? 'text-brand' : 'text-white'
                }`}
              >
                <span>{locale.flag}</span>
                <span className="font-medium">{locale.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
