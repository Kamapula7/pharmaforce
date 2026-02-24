import AdminLogout from './AdminLogout';

export const metadata = { title: 'Admin — PharmaForce' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/10 bg-[#111118] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
            <span className="text-dark font-black text-xs">PF</span>
          </div>
          <span className="text-white font-bold text-sm">PharmaForce Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-muted text-xs hover:text-white transition-colors">
            ↗ View site
          </a>
          <AdminLogout />
        </div>
      </header>

      <div className="flex">
        <nav className="w-48 shrink-0 border-r border-white/10 min-h-[calc(100vh-49px)] p-3 space-y-1">
          {[
            { href: '/pf-secure-9k2', label: '📊 Dashboard' },
            { href: '/pf-secure-9k2/orders', label: '📦 Orders' },
            { href: '/pf-secure-9k2/products', label: '💊 Products' },
            { href: '/pf-secure-9k2/users', label: '👤 Users' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="block px-3 py-2 rounded-lg text-sm text-muted hover:text-white hover:bg-white/5 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
