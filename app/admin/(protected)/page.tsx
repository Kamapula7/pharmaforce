import { PRODUCTS } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { getAnalyticsStats } from '@/lib/analytics';

const STATUS_COLORS: Record<string, string> = {
  PENDING:          'bg-yellow-500/15 text-yellow-400',
  AWAITING_PAYMENT: 'bg-orange-500/15 text-orange-400',
  PAID:             'bg-green-500/15 text-green-400',
  SHIPPED:          'bg-blue-500/15 text-blue-400',
  DELIVERED:        'bg-emerald-500/15 text-emerald-400',
  CANCELLED:        'bg-red-500/15 text-red-400',
};

async function getStats() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const [orders, usersCount] = await Promise.all([
      prisma.order.findMany({
        include: { items: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      prisma.user.count(),
    ]);

    const totalRevenue = orders
      .filter(o => ['PAID', 'SHIPPED', 'DELIVERED'].includes(o.status))
      .reduce((sum, o) => sum + o.total, 0);

    const byStatus = orders.reduce<Record<string, number>>((acc, o) => {
      acc[o.status] = (acc[o.status] ?? 0) + 1;
      return acc;
    }, {});

    return { orders, totalRevenue, byStatus, usersCount, error: null };
  } catch {
    return { orders: [], totalRevenue: 0, byStatus: {} as Record<string, number>, usersCount: 0, error: 'DB not connected' };
  }
}

export default async function AdminDashboard() {
  const [{ orders, totalRevenue, byStatus, usersCount, error }, analytics] = await Promise.all([
    getStats(),
    getAnalyticsStats(),
  ]);

  const stats = [
    { label: 'Total Orders',   value: orders.length,            icon: '📦', color: 'text-blue-400' },
    { label: 'Revenue',        value: formatPrice(totalRevenue), icon: '💶', color: 'text-green-400' },
    { label: 'Products',       value: PRODUCTS.length,          icon: '💊', color: 'text-brand' },
    { label: 'Users',          value: usersCount,               icon: '👤', color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white font-bold text-2xl">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Welcome back — here&apos;s what&apos;s happening</p>
      </div>

      {error && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-yellow-400 text-sm">
          ⚠ {error} — showing placeholder data
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon, color }) => (
          <div key={label} className="bg-[#111118] border border-white/8 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">{icon}</span>
              <span className={`text-xs font-medium ${color}`}>↑</span>
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-muted text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="bg-[#111118] border border-white/8 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📈</span>
            <h2 className="text-white font-semibold text-sm">Website Traffic</h2>
            {analytics.connected
              ? <span className="text-[10px] bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">Live</span>
              : <span className="text-[10px] bg-yellow-500/15 text-yellow-400 px-2 py-0.5 rounded-full">Not connected</span>
            }
          </div>
          <a href="https://analytics.google.com" target="_blank"
            className="text-xs text-brand hover:underline">
            Open Analytics ↗
          </a>
        </div>

        {analytics.connected ? (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Online now',   value: analytics.activeUsers, color: 'text-green-400' },
                { label: 'Today',        value: analytics.today,       color: 'text-brand' },
                { label: 'Last 7 days',  value: analytics.week,        color: 'text-blue-400' },
                { label: 'Last 30 days', value: analytics.month,       color: 'text-purple-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-white/3 rounded-lg p-3 text-center">
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                  <p className="text-muted text-[11px] mt-1">{label}</p>
                </div>
              ))}
            </div>
            {analytics.topPages.length > 0 && (
              <div>
                <p className="text-muted text-xs mb-2">Top pages (7 days)</p>
                <div className="space-y-1">
                  {analytics.topPages.map(({ path, views }) => (
                    <div key={path} className="flex items-center justify-between text-xs py-1 border-b border-white/4">
                      <span className="text-muted font-mono truncate max-w-[70%]">{path}</span>
                      <span className="text-white font-semibold">{views} views</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted text-sm mb-3">Connect Google Analytics to see visitor stats</p>
            <p className="text-muted/60 text-xs">Add <code className="bg-white/8 px-1.5 py-0.5 rounded text-brand">GA_SERVICE_ACCOUNT_JSON</code> to environment variables</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#111118] border border-white/8 rounded-xl p-4">
          <h2 className="text-white font-semibold text-sm mb-4">Orders by Status</h2>
          <div className="space-y-2">
            {['PENDING','AWAITING_PAYMENT','PAID','SHIPPED','DELIVERED','CANCELLED'].map(status => (
              <div key={status} className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[status]}`}>
                  {status.replace('_', ' ')}
                </span>
                <span className="text-white font-semibold text-sm">{byStatus[status] ?? 0}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111118] border border-white/8 rounded-xl p-4">
          <h2 className="text-white font-semibold text-sm mb-4">Quick Links</h2>
          <div className="space-y-2">
            {[
              { href: '/admin/orders',   label: '📦 All Orders', desc: 'View and manage orders' },
              { href: '/admin/products', label: '💊 Products',   desc: 'Edit product catalog' },
              { href: '/admin/users',    label: '👤 Customers',  desc: 'View registered users' },
              { href: '/',               label: '🌐 View Store', desc: 'Open live website' },
            ].map(({ href, label, desc }) => (
              <a key={href} href={href}
                className="flex items-center justify-between p-3 rounded-lg bg-white/3 hover:bg-white/6 transition-colors group"
              >
                <div>
                  <p className="text-white text-xs font-medium">{label}</p>
                  <p className="text-muted text-[11px]">{desc}</p>
                </div>
                <span className="text-muted group-hover:text-white transition-colors text-xs">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm">Recent Orders</h2>
          <a href="/admin/orders" className="text-brand text-xs hover:underline">View all →</a>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 text-muted text-sm">No orders yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Order ID', 'Customer', 'Country', 'Total', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-muted text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 15).map(order => (
                  <tr key={order.id} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-brand text-xs font-mono">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-white text-xs">
                      {order.firstName} {order.lastName}
                      <br />
                      <span className="text-muted text-[11px]">{order.email}</span>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">{order.country}</td>
                    <td className="px-4 py-3 text-white text-xs font-semibold">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
