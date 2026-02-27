'use client';

import { useEffect } from 'react';

export default function TawkChat() {
  useEffect(() => {
    if (document.getElementById('tawk-script')) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.Tawk_API = w.Tawk_API || {};
    w.Tawk_LoadStart = new Date();

    w.Tawk_API.onLoad = () => {
      w.Tawk_API?.hideWidget?.();
    };

    // Suppress badge/unread count and blinking
    w.Tawk_API.onChatMessageSystem = () => false;
    w.Tawk_API.onUnreadCountChanged = () => {
      w.Tawk_API?.setAttributes?.({ 'hide-badge': true }, () => {});
    };
    Object.defineProperty(w.Tawk_API, 'unreadCount', {
      get: () => 0,
      configurable: true,
    });

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
