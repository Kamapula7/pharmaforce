export const dynamic = 'force-dynamic';

import { formatPrice } from '@/lib/utils';
import type { Order, OrderItem } from '@/app/generated/prisma/client';
import OrdersTable from '@/components/admin/OrdersTable';
import DeleteAllOrdersBtn from '@/components/admin/DeleteAllOrdersBtn';

type OrderWithItems = Order & { items: OrderItem[] };

async function getOrders(): Promise<OrderWithItems[]> {
  try {
    const { prisma } = await import('@/lib/prisma');
    return await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    }) as OrderWithItems[];
  } catch {
    return [];
  }
}

export default async function OrdersPage() {
  const orders = await getOrders();

  const totalRevenue = orders
    .filter(o => ['PAID', 'SHIPPED', 'DELIVERED'].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  const awaitingCount = orders.filter(o => o.status === 'AWAITING_PAYMENT').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-2xl">Orders</h1>
          <p className="text-muted text-sm mt-1">{orders.length} total · {formatPrice(totalRevenue)} revenue</p>
        </div>
        <div className="flex items-center gap-2">
          {awaitingCount > 0 && (
            <span className="bg-orange-500/15 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full">
              {awaitingCount} awaiting payment confirmation
            </span>
          )}
          <DeleteAllOrdersBtn />
        </div>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-xl p-4">
        <OrdersTable initialOrders={orders.map(o => ({
          ...o,
          createdAt: o.createdAt,
        }))} />
      </div>
    </div>
  );
}
