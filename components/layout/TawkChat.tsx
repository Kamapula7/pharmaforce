'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API?: {
      toggle: () => void;
      maximize: () => void;
      minimize: () => void;
      hideWidget: () => void;
      onLoad?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

export default function TawkChat() {
  useEffect(() => {
    if (document.getElementById('tawk-script')) return;

    window.Tawk_API = window.Tawk_API || ({} as NonNullable<Window['Tawk_API']>);
    window.Tawk_LoadStart = new Date();

    // Hide the default Tawk bubble — we use our custom button
    window.Tawk_API.onLoad = () => {
      window.Tawk_API?.hideWidget?.();
    };

    const s = document.createElement('script');
    s.id = 'tawk-script';
    s.async = true;
    s.src = 'https://embed.tawk.to/699b08688f3ea01c37046213/1ji2phmhp';
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');
    document.head.appendChild(s);
  }, []);

  return null;
}
