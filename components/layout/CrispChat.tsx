'use client';

import { useEffect } from 'react';

export default function CrispChat() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_CRISP_ID || 'c428e4f9-3520-4acf-903f-76912a32a055';
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.$crisp = [];
    w.CRISP_WEBSITE_ID = id;
    const s = document.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return null;
}
