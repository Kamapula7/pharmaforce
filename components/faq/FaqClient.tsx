'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FaqSection = { section: string; items: { q: string; a: string }[] };
type FaqContent = { badge: string; title: string; subtitle: string; stillTitle: string; stillDesc: string; sections: FaqSection[] };

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className={`text-sm font-medium leading-snug ${open ? 'text-brand' : 'text-white'}`}>{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-brand' : ''}`} />
      </button>
      {open && (
        <p className="text-muted text-sm leading-relaxed pb-4 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function FaqClient({ content }: { content: FaqContent }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">{content.badge}</p>
        <h1 className="text-4xl font-black text-white mb-3">{content.title}</h1>
        <p className="text-muted text-base leading-relaxed">{content.subtitle}</p>
      </div>

      <div className="space-y-8">
        {content.sections.map((section) => (
          <div key={section.section}>
            <h2 className="text-brand text-xs font-bold uppercase tracking-widest mb-1">{section.section}</h2>
            <div className="bg-surface border border-border rounded-xl px-5">
              {section.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-brand/5 border border-brand/20 rounded-xl p-6 text-center">
        <p className="text-white font-semibold mb-2">{content.stillTitle}</p>
        <p className="text-muted text-sm mb-4">{content.stillDesc}</p>
        <a
          href="mailto:pharmaforce@inbox.eu"
          className="inline-flex items-center gap-2 bg-brand text-dark font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-brand/90 transition-colors"
        >
          pharmaforce@inbox.eu
        </a>
      </div>
    </div>
  );
}
