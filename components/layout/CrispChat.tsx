'use client';

import { useEffect } from 'react';

export default function CrispChat() {
  useEffect(() => {
    const id = 'c428e4f9-3520-4acf-903f-76912a32a055';
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.$crisp = [];
    w.CRISP_WEBSITE_ID = id;

    // Move Crisp button above sticky Add to Cart bar on mobile
    w.$crisp.push(['safe', true]);
    w.$crisp.push(['config', 'position:reverse', [false]]);

    const s = document.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = true;

    s.onload = () => {
      // On mobile screens, shift the button up so it doesn't overlap Add to Cart
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        w.$crisp.push(['config', 'container:index', [1]]);
        // Inject CSS into the Crisp iframe once it loads
        const tryInject = () => {
          const iframe = document.querySelector<HTMLIFrameElement>('iframe[title*="risp"], iframe[src*="crisp"]');
          if (iframe?.contentDocument) {
            const style = iframe.contentDocument.createElement('style');
            style.textContent = '.cc-tlyw { bottom: 90px !important; }';
            iframe.contentDocument.head.appendChild(style);
          } else {
            setTimeout(tryInject, 1000);
          }
        };
        setTimeout(tryInject, 2000);
      }
    };

    document.head.appendChild(s);

    // Also inject global CSS targeting Crisp wrapper
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 639px) {
        .crisp-client .cc-tlyw { bottom: 90px !important; }
        .crisp-client .cc-kxkl { bottom: 90px !important; }
        #crisp-chatbox > div { bottom: 90px !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
}
