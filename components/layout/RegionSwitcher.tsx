'use client';

import { useRegionStore, type Region } from '@/store/regionStore';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const OPTIONS: { value: Region; flag: string; label: string; currency: string }[] = [
  { value: 'EU', flag: '🇪🇺', label: 'Europe',        currency: 'EUR' },
  { value: 'US', flag: '🇺🇸', label: 'United States', currency: 'USD' },
];

export default function RegionSwitcher() {
  const { region, setRegion } = useRegionStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = OPTIONS.find((o) => o.value === region) ?? OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-muted hover:text-white hover:bg-surface-2 transition-colors text-sm font-medium"
        aria-label="Select region"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.currency}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full pt-1 z-50 w-44">
          <div className="bg-[#111118] border border-white/10 rounded-xl shadow-xl overflow-hidden">
            {OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setRegion(opt.value); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                  region === opt.value ? 'text-brand font-semibold' : 'text-muted hover:text-white'
                }`}
              >
                <span className="text-base">{opt.flag}</span>
                <div className="text-left">
                  <div>{opt.label}</div>
                  <div className="text-xs opacity-60">{opt.currency}</div>
                </div>
                {region === opt.value && <span className="ml-auto text-brand">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
