'use client';

import { useState } from 'react';
import { User, Package, LogIn, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

type Tab = 'login' | 'register' | 'dashboard';

const MOCK_ORDERS = [
  { id: 'SP-A1B2C3D4', date: '2026-02-18', status: 'SHIPPED', total: 84.98, items: ['Whey Protein Gold × 1', 'Omega-3 Ultra Pure × 1'] },
  { id: 'SP-E5F6G7H8', date: '2026-02-05', status: 'DELIVERED', total: 49.99, items: ['Creatine Monohydrate 300g × 2'] },
  { id: 'SP-I9J0K1L2', date: '2026-01-22', status: 'DELIVERED', total: 134.97, items: ['BCAA Complex 8:1:1 × 1', 'Pre-Workout Explosion × 2'] },
];

const STATUS_STYLE: Record<string, string> = {
  PENDING: 'bg-warning/10 text-warning',
  AWAITING_PAYMENT: 'bg-warning/10 text-warning',
  PAID: 'bg-brand/10 text-brand',
  SHIPPED: 'bg-blue-500/10 text-blue-400',
  DELIVERED: 'bg-success/10 text-success',
  CANCELLED: 'bg-red-500/10 text-red-400',
};

export default function AccountClient({ locale }: { locale: string }) {
  const [tab, setTab] = useState<Tab>('login');
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setTab('dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setTab('dashboard');
  };

  if (isLoggedIn || tab === 'dashboard') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Account</h1>
            <p className="text-muted text-sm mt-1">Welcome back, {name || email || 'Athlete'}</p>
          </div>
          <button
            onClick={() => { setIsLoggedIn(false); setTab('login'); }}
            className="text-muted hover:text-white text-sm transition-colors border border-border px-4 py-2 rounded-lg hover:bg-surface-2"
          >
            Log out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: MOCK_ORDERS.length },
            { label: 'Delivered', value: MOCK_ORDERS.filter(o => o.status === 'DELIVERED').length },
            { label: 'Total Spent', value: formatPrice(MOCK_ORDERS.reduce((s, o) => s + o.total, 0)) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-surface border border-border rounded-2xl p-4 text-center">
              <p className="text-2xl font-extrabold text-white mb-1">{value}</p>
              <p className="text-muted text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Orders */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <Package className="w-5 h-5 text-brand" /> Order History
          </h2>
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="border border-border rounded-xl p-4 hover:border-brand/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold font-mono">{order.id}</p>
                    <p className="text-muted text-xs mt-0.5">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLE[order.status] ?? 'bg-muted/10 text-muted'}`}>
                      {order.status}
                    </span>
                    <span className="text-white font-bold">{formatPrice(order.total)}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {order.items.map((item) => (
                    <span key={item} className="text-xs text-muted bg-surface-2 px-2 py-1 rounded-lg">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      {/* Tabs */}
      <div className="flex bg-surface border border-border rounded-xl p-1 mb-8">
        {(['login', 'register'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
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

          <button type="submit"
            className="w-full bg-brand text-dark font-bold py-3 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all">
            Login
          </button>

          <p className="text-center text-muted text-sm">
            No account?{' '}
            <button type="button" onClick={() => setTab('register')} className="text-brand hover:underline">
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
            <span>By registering, you agree to our <Link href={`/en/terms`} className="text-brand hover:underline">Terms</Link> and <Link href={`/en/privacy`} className="text-brand hover:underline">Privacy Policy</Link></span>
          </div>

          <button type="submit"
            className="w-full bg-brand text-dark font-bold py-3 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all">
            Create Account
          </button>

          <p className="text-center text-muted text-sm">
            Already have an account?{' '}
            <button type="button" onClick={() => setTab('login')} className="text-brand hover:underline">
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
