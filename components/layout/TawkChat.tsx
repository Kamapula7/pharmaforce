'use client';

import { useEffect } from 'react';

export default function TawkChat() {
  useEffect(() => {
    if (document.getElementById('tawk-script')) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.Tawk_API = w.Tawk_API || {};
    w.Tawk_LoadStart = new Date();

    w.Tawk_API.autoStart = false;
    w.Tawk_API.onBeforeLoad = () => {
      w.Tawk_API?.hideWidget?.();
    };
    w.Tawk_API.onLoad = () => {
      w.Tawk_API?.hideWidget?.();
      // Move widget up on mobile so it doesn't cover bottom buttons
      w.Tawk_API?.setAttributes?.({ 'custom-style': 'bottom: 80px !important' }, () => {});
    };

    const s = document.createElement('script');
    s.id = 'tawk-script';
    s.async = true;
    s.src = 'https://embed.tawk.to/699b08688f3ea01c37046213/1ji2phmhp';
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');
    document.head.appendChild(s);

    // Inject CSS to move tawk widget up on mobile
    const style = document.createElement('style');
    style.id = 'tawk-position-fix';
    style.textContent = `
      @media (max-width: 768px) {
        #tawk-bubble-container, .tawk-min-container, iframe[title*="chat"], iframe[src*="tawk"] {
          bottom: 80px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
}
