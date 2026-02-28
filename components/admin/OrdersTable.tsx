'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { ChevronDown, Check, Loader2, Mail } from 'lucide-react';
import SendEmailModal from './SendEmailModal';

const STATUS_COLORS: Record<string, string> = {
  PENDING:          'bg-yellow-500/15 text-yellow-400',
  AWAITING_PAYMENT: 'bg-orange-500/15 text-orange-400',
  PAID:             'bg-green-500/15 text-green-400',
  SHIPPED:          'bg-blue-500/15 text-blue-400',
  DELIVERED:        'bg-emerald-500/15 text-emerald-400',
  CANCELLED:        'bg-red-500/15 text-red-400',
};

const STATUS_FLOW: Record<string, { label: string; next: string; color: string }[]> = {
  AWAITING_PAYMENT: [{ label: '✓ Confirm Payment', next: 'PAID', color: 'bg-green-500/20 text-green-400 hover:bg-green-500/30' }],
  PENDING:          [{ label: '✓ Confirm Payment', next: 'PAID', color: 'bg-green-500/20 text-green-400 hover:bg-green-500/30' }],
  PAID:             [{ label: '🚚 Mark Shipped',   next: 'SHIPPED',   color: 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' }],
  SHIPPED:          [{ label: '✓ Mark Delivered',  next: 'DELIVERED', color: 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' }],
  DELIVERED:        [],
  CANCELLED:        [],
};

interface OrderItem { nameEn: string; quantity: number; price: number }
interface Order {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  country: string;
  city: string;
  address: string;
  zip: string;
  notes: string | null;
  total: number;
  status: string;
  bankRef: string | null;
  createdAt: Date;
  items: OrderItem[];
}

export default function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [emailOrder, setEmailOrder] = useState<Order | null>(null);
  const updateStatus = async (orderId: string, newStatus: string) => {
    setLoading(orderId + newStatus);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders(prev =>
          prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
        );
      }
    } finally {
      setLoading(null);
    }
  };

  if (orders.length === 0) {
    return <div className="text-center py-16 text-muted text-sm">No orders yet</div>;
  }

  return (
    <>
    {emailOrder && (
      <SendEmailModal order={emailOrder} onClose={() => setEmailOrder(null)} />
    )}
    <div className="space-y-2">
      {orders.map(order => {
        const isOpen = expanded === order.id;
        const actions = STATUS_FLOW[order.status] ?? [];

        return (
          <div key={order.id} className="border border-white/8 rounded-xl overflow-hidden">
            {/* Row */}
            <div
              className="grid grid-cols-[1fr_2fr_1fr_1fr_auto] gap-4 px-4 py-3 cursor-pointer hover:bg-white/2 transition-colors items-center"
              onClick={() => setExpanded(isOpen ? null : order.id)}
            >
              <div>
                <p className="text-brand text-xs font-mono">#{order.id.slice(-8).toUpperCase()}</p>
                <p className="text-muted text-[11px]">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
              </div>
              <div>
                <p className="text-white text-xs font-medium">{order.firstName} {order.lastName}</p>
                <p className="text-muted text-[11px]">{order.email}</p>
              </div>
              <div className="text-white text-xs font-semibold">{formatPrice(order.total)}</div>
              <div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Expanded details */}
            {isOpen && (
              <div className="border-t border-white/8 px-4 py-4 space-y-4 bg-white/1">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-muted mb-1">Delivery</p>
                    <p className="text-white">{order.country}, {order.city}</p>
                    <p className="text-white">{order.address}, {order.zip}</p>
                    {order.phone && <p className="text-muted">{order.phone}</p>}
                  </div>
                  {order.bankRef && (
                    <div>
                      <p className="text-muted mb-1">Order Ref</p>
                      <p className="text-white font-mono">{order.bankRef}</p>
                    </div>
                  )}
                  {order.notes && (
                    <div>
                      <p className="text-muted mb-1">Notes</p>
                      <p className="text-white">{order.notes}</p>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div>
                  <p className="text-muted text-xs mb-2">Items</p>
                  <div className="space-y-1">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-white">{item.nameEn} × {item.quantity}</span>
                        <span className="text-muted">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {actions.map(({ label, next, color }) => (
                    <button
                      key={next}
                      onClick={() => updateStatus(order.id, next)}
                      disabled={loading === order.id + next}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${color}`}
                    >
                      {loading === order.id + next
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : <Check className="w-3.5 h-3.5" />
                      }
                      {label}
                    </button>
                  ))}
                  {actions.length > 0 && (
                    <button
                      onClick={() => updateStatus(order.id, 'CANCELLED')}
                      disabled={!!loading}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={e => { e.stopPropagation(); setEmailOrder(order); }}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors ml-auto"
                  >
                    <Mail className="w-3.5 h-3.5" /> Написать
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
    </>
  );
}
