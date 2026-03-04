export const dynamic = 'force-dynamic';

import { getFunnelStats } from '@/lib/analytics';

type LocalFunnel = {
  productViews: number;
  cartVisits: number;
  checkoutVisits: number;
  purchases: number;
};

async function getLocalFunnelFallback(): Promise<LocalFunnel> {
  try {
    const { prisma } = await import('@/lib/prisma');
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const pathStartsWith = (paths: string[]) => paths.map((p) => ({ path: { startsWith: p } }));

    const [productViews, cartVisits, checkoutVisits, purchases] = await Promise.all([
      prisma.pageView.count({
        where: {
          createdAt: { gte: since },
          OR: pathStartsWith(['/en/products/', '/de/products/', '/fr/products/', '/it/products/', '/pl/products/', '/es/products/']),
        },
      }),
      prisma.pageView.count({
        where: {
          createdAt: { gte: since },
          OR: pathStartsWith(['/en/cart', '/de/cart', '/fr/cart', '/it/cart', '/pl/cart', '/es/cart']),
        },
      }),
      prisma.pageView.count({
        where: {
          createdAt: { gte: since },
          OR: pathStartsWith(['/en/checkout', '/de/checkout', '/fr/checkout', '/it/checkout', '/pl/checkout', '/es/checkout']),
        },
      }),
      prisma.order.count({
        where: {
          createdAt: { gte: since },
          status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
        },
      }),
    ]);

    return { productViews, cartVisits, checkoutVisits, purchases };
  } catch {
    return { productViews: 0, cartVisits: 0, checkoutVisits: 0, purchases: 0 };
  }
}

function ratio(prev: number, curr: number) {
  if (prev <= 0) return { conv: 0, drop: 100 };
  const conv = (curr / prev) * 100;
  return { conv: Number(conv.toFixed(1)), drop: Number((100 - conv).toFixed(1)) };
}

export default async function FunnelPage() {
  const [ga, local] = await Promise.all([getFunnelStats(), getLocalFunnelFallback()]);

  const usingGa = ga.connected && ga.steps.some((s) => s.count > 0);
  const fallbackSteps = [
    { label: 'Viewed Product Page', count: local.productViews },
    { label: 'Visited Cart', count: local.cartVisits },
    { label: 'Visited Checkout', count: local.checkoutVisits },
    { label: 'Completed Order', count: local.purchases },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-white font-bold text-2xl">Conversion Funnel</h1>
        <p className="text-muted text-sm mt-1">See where customers drop off before purchase</p>
      </div>

      <div className="bg-[#111118] border border-white/8 rounded-xl p-4">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-[11px] px-2 py-1 rounded-full font-semibold ${usingGa ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
            {usingGa ? 'GA4 events' : 'Local fallback'}
          </span>
          <span className="text-[11px] px-2 py-1 rounded-full bg-white/5 text-muted">{ga.period}</span>
          {!usingGa && ga.error && <span className="text-[11px] text-yellow-300">{ga.error}</span>}
        </div>

        {usingGa ? (
          <div className="space-y-3">
            {ga.steps.map((step, idx) => (
              <div key={step.key} className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white text-sm font-semibold">{idx + 1}. {step.label}</p>
                    <p className="text-muted text-xs">{step.key}</p>
                  </div>
                  <p className="text-brand text-xl font-bold">{step.count.toLocaleString()}</p>
                </div>
                {idx > 0 && (
                  <div className="text-xs text-muted flex items-center gap-4">
                    <span>Conversion: <span className="text-green-400 font-semibold">{step.conversionFromPrev}%</span></span>
                    <span>Drop-off: <span className="text-red-400 font-semibold">{step.dropoffFromPrev}%</span></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {fallbackSteps.map((step, idx) => {
              const prev = idx > 0 ? fallbackSteps[idx - 1].count : 0;
              const r = idx > 0 ? ratio(prev, step.count) : null;
              return (
                <div key={step.label} className="rounded-lg border border-white/8 bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white text-sm font-semibold">{idx + 1}. {step.label}</p>
                    <p className="text-brand text-xl font-bold">{step.count.toLocaleString()}</p>
                  </div>
                  {r && (
                    <div className="text-xs text-muted flex items-center gap-4">
                      <span>Conversion: <span className="text-green-400 font-semibold">{r.conv}%</span></span>
                      <span>Drop-off: <span className="text-red-400 font-semibold">{r.drop}%</span></span>
                    </div>
                  )}
                </div>
              );
            })}
            <p className="text-[11px] text-muted">
              Local fallback is page-based and approximate. Configure GA service account to see event-level funnel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
