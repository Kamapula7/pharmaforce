'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { User, Package, LogIn, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

type Tab = 'login' | 'register';

const STATUS_STYLE: Record<string, string> = {
  PENDING:          'bg-yellow-500/10 text-yellow-400',
  AWAITING_PAYMENT: 'bg-orange-500/10 text-orange-400',
  PAID:             'bg-green-500/15 text-green-400',
  SHIPPED:          'bg-blue-500/10 text-blue-400',
  DELIVERED:        'bg-emerald-500/10 text-emerald-400',
  CANCELLED:        'bg-red-500/10 text-red-400',
};

const STATUS_LABEL: Record<string, string> = {
  PENDING:          'Pending',
  AWAITING_PAYMENT: 'Awaiting Payment',
  PAID:             'Paid ✓',
  SHIPPED:          'Shipped 🚚',
  DELIVERED:        'Delivered ✓',
  CANCELLED:        'Cancelled',
};

interface Order {
  id: string;
  createdAt: string;
  status: string;
  total: number;
  items: { nameEn: string; quantity: number }[];
}

export default function AccountClient({ locale }: { locale: string }) {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<Tab>(() =>
    searchParams.get('tab') === 'register' ? 'register' : 'login'
  );

  useEffect(() => {
    if (searchParams.get('tab') === 'register') setTab('register');
  }, [searchParams]);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      const res = await fetch('/api/account/orders');
      if (res.ok) {
        setOrders(await res.json());
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    }
  };

  useEffect(() => {
    if (session) loadOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError('Invalid email or password');
    } else {
      loadOrders();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Registration failed');
      setLoading(false);
      return;
    }
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) setError('Registered but login failed. Try logging in.');
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  if (session) {
    const ordersToShow = orders ?? [];
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Account</h1>
            <p className="text-muted text-sm mt-1">
              Welcome back, {session.user?.name || session.user?.email || 'Athlete'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadOrders}
              className="text-muted hover:text-brand text-sm transition-colors px-3 py-2 rounded-lg hover:bg-surface-2"
              title="Refresh orders"
            >
              ↻ Refresh
            </button>
            <button
              onClick={() => signOut({ callbackUrl: `/${locale}/account` })}
              className="text-muted hover:text-white text-sm transition-colors border border-border px-4 py-2 rounded-lg hover:bg-surface-2"
            >
              Log out
            </button>
          </div>
        </div>

        {ordersToShow.length > 0 && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Orders', value: ordersToShow.length },
                { label: 'Delivered', value: ordersToShow.filter((o) => o.status === 'DELIVERED').length },
                { label: 'Total Spent', value: formatPrice(ordersToShow.reduce((s, o) => s + o.total, 0)) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface border border-border rounded-2xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-white mb-1">{value}</p>
                  <p className="text-muted text-sm">{label}</p>
                </div>
              ))}
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                <Package className="w-5 h-5 text-brand" /> Order History
              </h2>
              <div className="space-y-3">
                {ordersToShow.map((order) => {
                  const isOpen = expandedOrder === order.id;
                  return (
                  <div
                    key={order.id}
                    className="border border-border rounded-xl overflow-hidden hover:border-brand/40 transition-colors"
                  >
                    {/* Header row — click to expand */}
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer"
                      onClick={() => setExpandedOrder(isOpen ? null : order.id)}
                    >
                      <div>
                        <p className="text-white font-semibold font-mono text-sm">#{order.id.slice(-8).toUpperCase()}</p>
                        <p className="text-muted text-xs mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[order.status] ?? 'bg-muted/10 text-muted'}`}>
                          {STATUS_LABEL[order.status] ?? order.status}
                        </span>
                        <span className="text-white font-bold text-sm">{formatPrice(order.total)}</span>
                        <span className={`text-muted text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isOpen && (
                      <div className="border-t border-border p-4 bg-surface-2 space-y-3">
                        <p className="text-muted text-xs font-medium uppercase tracking-wide">Order Items</p>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-white text-sm">{item.nameEn}</span>
                              <span className="text-muted text-sm">× {item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between">
                          <span className="text-muted text-sm">Total</span>
                          <span className="text-white font-bold">{formatPrice(order.total)}</span>
                        </div>
                        {order.status === 'AWAITING_PAYMENT' && (
                          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-xs text-orange-300">
                            Waiting for payment confirmation. We'll update your order once the transfer is received.
                          </div>
                        )}
                        {order.status === 'PAID' && (
                          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-xs text-green-300">
                            Payment confirmed! Your order is being prepared for shipping.
                          </div>
                        )}
                        {order.status === 'SHIPPED' && (
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-xs text-blue-300">
                            Your order is on its way!
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {orders !== null && ordersToShow.length === 0 && (
          <div className="bg-surface border border-border rounded-2xl p-8 text-center text-muted">
            No orders yet.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <div className="flex bg-surface border border-border rounded-xl p-1 mb-8">
        {(['login', 'register'] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              tab === t ? 'bg-brand text-dark' : 'text-muted hover:text-white'
            }`}
          >
            {t === 'login' ? 'Login' : 'Register'}
          </button>
        ))}
      </div>

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <LogIn className="w-8 h-8 text-brand" />
            </div>
            <h1 className="text-xl font-bold text-white">Welcome back</h1>
            <p className="text-muted text-sm">Login to access your orders</p>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-muted mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-white text-sm focus:outline-none focus:border-brand transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-1.5">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full px-4 py-2.5 pr-10 bg-surface-2 border border-border rounded-xl text-white text-sm focus:outline-none focus:border-brand transition-colors" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-brand text-dark font-bold py-3 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Login
          </button>

          <p className="text-center text-muted text-sm">
            No account?{' '}
            <button type="button" onClick={() => { setTab('register'); setError(''); }} className="text-brand hover:underline">
              Register here
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-brand" />
            </div>
            <h1 className="text-xl font-bold text-white">Create Account</h1>
            <p className="text-muted text-sm">Join PharmaForce today</p>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-muted mb-1.5">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-white text-sm focus:outline-none focus:border-brand transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-white text-sm focus:outline-none focus:border-brand transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted mb-1.5">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
                className="w-full px-4 py-2.5 pr-10 bg-surface-2 border border-border rounded-xl text-white text-sm focus:outline-none focus:border-brand transition-colors" />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-muted">
            <CheckCircle className="w-4 h-4 text-brand mt-0.5 shrink-0" />
            <span>By registering, you agree to our{' '}
              <Link href={`/${locale}/terms`} className="text-brand hover:underline">Terms</Link> and{' '}
              <Link href={`/${locale}/privacy`} className="text-brand hover:underline">Privacy Policy</Link>
            </span>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-brand text-dark font-bold py-3 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Create Account
          </button>

          <p className="text-center text-muted text-sm">
            Already have an account?{' '}
            <button type="button" onClick={() => { setTab('login'); setError(''); }} className="text-brand hover:underline">
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
