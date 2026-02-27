'use client';

import { useState, useEffect } from 'react';

export default function FloatingChatButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const openChat = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const api = (window as any).Tawk_API;
    if (api?.maximize) api.maximize();
    else if (api?.toggle) api.toggle();
  };

  if (!visible) return null;

  return (
    <button
      onClick={openChat}
      aria-label="Open support chat"
      className="fixed bottom-6 right-6 z-50 group cursor-pointer"
    >
      {/* Main button */}
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg shadow-green-500/40 group-hover:scale-110 group-hover:shadow-green-500/60 transition-all duration-300">
        {/* Dumbbell SVG */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Left weight plate outer */}
          <rect x="2" y="20" width="10" height="24" rx="3" fill="#1a1a1a" />
          {/* Left weight plate inner */}
          <rect x="5" y="23" width="4" height="18" rx="2" fill="#111" />

          {/* Left collar */}
          <rect x="12" y="24" width="6" height="16" rx="2" fill="#1a1a1a" />

          {/* Bar */}
          <rect x="18" y="29" width="28" height="6" rx="3" fill="#1a1a1a" />

          {/* Right collar */}
          <rect x="46" y="24" width="6" height="16" rx="2" fill="#1a1a1a" />

          {/* Right weight plate outer */}
          <rect x="52" y="20" width="10" height="24" rx="3" fill="#1a1a1a" />
          {/* Right weight plate inner */}
          <rect x="55" y="23" width="4" height="18" rx="2" fill="#111" />
        </svg>
      </span>

      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-dark border border-border text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Expert Support
      </span>
    </button>
  );
}
