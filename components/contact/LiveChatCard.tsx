'use client';

export default function LiveChatCard({ children }: { children: React.ReactNode }) {
  const openChat = () => {
    if (typeof window === 'undefined') return;
    const w = window as any;
    // Crisp
    if (w.$crisp?.push) {
      w.$crisp.push(['do', 'chat:open']);
      return;
    }
    // Tawk.to — autoStart=false, при клике запускаем и показываем
    if (w.Tawk_API) {
      w.Tawk_API.start?.({ showWidget: true });
      w.Tawk_API.showWidget?.();
      w.Tawk_API.maximize?.();
      return;
    }
    // Crisp может ещё загружаться — пробуем через 300ms
    setTimeout(() => {
      if (w.$crisp?.push) w.$crisp.push(['do', 'chat:open']);
      else if (w.Tawk_API) {
        w.Tawk_API.start?.({ showWidget: true });
        w.Tawk_API.showWidget?.();
        w.Tawk_API.maximize?.();
      }
    }, 300);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openChat}
      onKeyDown={(e) => e.key === 'Enter' && openChat()}
      className="cursor-pointer select-none"
    >
      {children}
    </div>
  );
}
