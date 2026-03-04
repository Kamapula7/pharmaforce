export const dynamic = 'force-dynamic';

import { PRODUCTS } from '@/lib/products';
import { formatPrice } from '@/lib/utils';
import { Package, Euro, Pill, Users, BarChart2, ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { Order, OrderItem } from '@/app/generated/prisma/client';

type OrderWithItems = Order & { items: OrderItem[] };

const STATUS_COLORS: Record<string, string> = {
  PENDING:          'bg-yellow-500/15 text-yellow-400',
  AWAITING_PAYMENT: 'bg-orange-500/15 text-orange-400',
  PAID:             'bg-green-500/15 text-green-400',
  SHIPPED:          'bg-blue-500/15 text-blue-400',
  DELIVERED:        'bg-green-700/15 text-green-300',
  CANCELLED:        'bg-red-500/15 text-red-400',
};

const COUNTRY_FLAGS: Record<string, string> = {
  DE: '🇩🇪', FR: '🇫🇷', PL: '🇵🇱', IT: '🇮🇹', ES: '🇪🇸',
  NL: '🇳🇱', BE: '🇧🇪', AT: '🇦🇹', CH: '🇨🇭', PT: '🇵🇹',
  SE: '🇸🇪', NO: '🇳🇴', DK: '🇩🇰', FI: '🇫🇮', CZ: '🇨🇿',
  SK: '🇸🇰', HU: '🇭🇺', RO: '🇷🇴', BG: '🇧🇬', HR: '🇭🇷',
  US: '🇺🇸', GB: '🇬🇧', CA: '🇨🇦', AU: '🇦🇺',
  MD: '🇲🇩', UA: '🇺🇦', IE: '🇮🇪',
};

const EU_COUNTRY_CODES = [
  'DE','FR','PL','IT','ES','NL','BE','AT','CH','PT','SE','NO','DK','FI',
  'CZ','SK','HU','RO','BG','HR','GB','IE','GR','LV','LT','EE','LU','MT',
  'CY','SI','AL','RS','ME','MK','BA','IS','LI','MC','SM','AD','UA','BY','GE',
];

async function getStats() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const week  = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
    const month = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const euFilter = { country: { in: EU_COUNTRY_CODES } };

    const [ordersRaw, usersCount, viewsToday, viewsWeek, viewsMonth, viewsTotal, topPages, topCountries] = await Promise.all([
      prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' }, take: 50 }),
      prisma.user.count(),
      prisma.pageView.count({ where: { createdAt: { gte: today }, ...euFilter } }),
      prisma.pageView.count({ where: { createdAt: { gte: week },  ...euFilter } }),
      prisma.pageView.count({ where: { createdAt: { gte: month }, ...euFilter } }),
      prisma.pageView.count({ where: { ...euFilter } }),
      prisma.pageView.groupBy({ by: ['path'], _count: { path: true }, orderBy: { _count: { path: 'desc' } }, take: 10, where: { createdAt: { gte: week }, ...euFilter } }),
      prisma.pageView.groupBy({ by: ['country'], _count: { country: true }, orderBy: { _count: { country: 'desc' } }, take: 10, where: { createdAt: { gte: month }, ...euFilter } }),
    ]);

    const orders = ordersRaw as OrderWithItems[];
    const totalRevenue = orders.filter(o => ['PAID','SHIPPED','DELIVERED'].includes(o.status)).reduce((s, o) => s + o.total, 0);
    const byStatus: Record<string, number> = {};
    orders.forEach(o => { byStatus[o.status] = (byStatus[o.status] ?? 0) + 1; });

    return {
      orders, totalRevenue, byStatus, usersCount, error: null,
      views: { today: viewsToday, week: viewsWeek, month: viewsMonth, total: viewsTotal },
      topPages: (topPages as Array<{ path: string; _count: { path: number } }>).map(p => ({ path: p.path, views: p._count.path })),
      topCountries: (topCountries as Array<{ country: string | null; _count: { country: number } }>)
        .map(c => ({ country: c.country ?? 'Unknown', views: c._count.country })),
    };
  } catch {
    return {
      orders: [], totalRevenue: 0, byStatus: {} as Record<string, number>, usersCount: 0, error: 'DB not connected',
      views: { today: 0, week: 0, month: 0, total: 0 },
      topPages: [],
      topCountries: [],
    };
  }
}

export default async function AdminDashboard() {
  const [{ orders, totalRevenue, byStatus, usersCount, error, views, topPages, topCountries }] = await Promise.all([
    getStats(),
  ]);

  const stats = [
    { label: 'Total Orders',   value: orders.length,            Icon: Package,  color: 'text-blue-400' },
    { label: 'Revenue',        value: formatPrice(totalRevenue), Icon: Euro,     color: 'text-green-400' },
    { label: 'Products',       value: PRODUCTS.length,          Icon: Pill,     color: 'text-brand' },
    { label: 'Users',          value: usersCount,               Icon: Users,    color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white font-bold text-2xl">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Welcome back — here&apos;s what&apos;s happening</p>
      </div>

      {error && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 text-yellow-400 text-sm">
          ⚠️ {error} — showing placeholder data
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, Icon, color }) => (
          <div key={label} className="bg-[#111118] border border-white/8 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <Icon className={`w-5 h-5 ${color}`} />
              <ArrowUpRight className={`w-4 h-4 ${color} opacity-60`} />
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-muted text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Visits */}
      <div className="bg-[#111118] border border-white/8 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-4 h-4 text-muted" />
          <h2 className="text-white font-semibold text-sm">Website Traffic</h2>
          <span className="text-[10px] bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">Live</span>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { label: 'Today',        value: views.today, color: 'text-brand' },
            { label: 'Last 7 days',  value: views.week,  color: 'text-blue-400' },
            { label: 'Last 30 days', value: views.month, color: 'text-purple-400' },
            { label: 'All time',     value: views.total, color: 'text-green-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white/3 rounded-lg p-3 text-center">
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-muted text-[11px] mt-1">{label}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topPages.length > 0 && (
            <div>
              <p className="text-muted text-xs mb-2">Top pages (7 days)</p>
              <div className="space-y-1">
                {topPages.map(({ path, views: v }) => (
                  <div key={path} className="flex items-center justify-between text-xs py-1 border-b border-white/4">
                    <span className="text-muted font-mono truncate max-w-[70%]">{path}</span>
                    <span className="text-white font-semibold">{v} views</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {topCountries.length > 0 && (
            <div>
              <p className="text-muted text-xs mb-2">Top countries (30 days)</p>
              <div className="space-y-1">
                {topCountries.map(({ country, views: v }) => {
                  const flag = COUNTRY_FLAGS[country] ?? '🌍';
                  return (
                    <div key={country} className="flex items-center justify-between text-xs py-1 border-b border-white/4">
                      <span className="text-white flex items-center gap-2">
                        <span>{flag}</span>
                        {country}
                      </span>
                      <span className="text-white font-semibold">{v} views</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
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
              { href: '/pf-secure-9k2/orders',   Icon: Package,      label: 'All Orders',    desc: 'View and manage orders' },
              { href: '/pf-secure-9k2/funnel',   Icon: BarChart2,    label: 'Funnel',        desc: 'See drop-off by checkout stage' },
              { href: '/pf-secure-9k2/products', Icon: Pill,         label: 'Products',      desc: 'Edit product catalog' },
              { href: '/pf-secure-9k2/users',    Icon: Users,        label: 'Customers',     desc: 'View registered users' },
              { href: '/',                        Icon: ExternalLink, label: 'View Store',    desc: 'Open live website' },
            ].map(({ href, Icon, label, desc }) => (
              <a key={href} href={href}
                className="flex items-center justify-between p-3 rounded-lg bg-white/3 hover:bg-white/6 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
                  <div>
                    <p className="text-white text-xs font-medium">{label}</p>
                    <p className="text-muted text-[11px]">{desc}</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
          <h2 className="text-white font-semibold text-sm">Recent Orders</h2>
          <Link href="/pf-secure-9k2/orders" className="text-brand text-xs hover:underline flex items-center gap-1">
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
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
