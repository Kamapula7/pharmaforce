import { formatPrice } from '@/lib/utils';

const STATUS_COLORS: Record<string, string> = {
  PENDING:          'bg-yellow-500/15 text-yellow-400',
  AWAITING_PAYMENT: 'bg-orange-500/15 text-orange-400',
  PAID:             'bg-green-500/15 text-green-400',
  SHIPPED:          'bg-blue-500/15 text-blue-400',
  DELIVERED:        'bg-emerald-500/15 text-emerald-400',
  CANCELLED:        'bg-red-500/15 text-red-400',
};

async function getOrders() {
  try {
    const { prisma } = await import('@/lib/prisma');
    return await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export default async function OrdersPage() {
  const orders = await getOrders();

  const totalRevenue = orders
    .filter(o => ['PAID', 'SHIPPED', 'DELIVERED'].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-2xl">Orders</h1>
          <p className="text-muted text-sm mt-1">{orders.length} total · {formatPrice(totalRevenue)} revenue</p>
        </div>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-xl overflow-hidden">
        {orders.length === 0 ? (
          <div className="text-center py-16 text-muted text-sm">No orders yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['#', 'Customer', 'Email', 'Country', 'Items', 'Total', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-muted text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3 text-brand text-xs font-mono">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-white text-xs">{order.firstName} {order.lastName}</td>
                    <td className="px-4 py-3 text-muted text-xs">{order.email}</td>
                    <td className="px-4 py-3 text-muted text-xs">{order.country}</td>
                    <td className="px-4 py-3 text-muted text-xs">{order.items.length}</td>
                    <td className="px-4 py-3 text-white text-xs font-semibold">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      <br />
                      <span className="text-[11px]">{new Date(order.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
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
