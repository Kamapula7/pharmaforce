import { BetaAnalyticsDataClient } from '@google-analytics/data';

const GA_PROPERTY_ID = '525533875';

function getClient() {
  const creds = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (!creds) return null;

  try {
    const cleaned = creds.trim();
    // Env vars can contain literal newlines inside the PEM key — escape them all first
    const fixed = cleaned.replace(/\n/g, '\\n').replace(/\r/g, '');
    const credentials = JSON.parse(fixed);
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }
    return new BetaAnalyticsDataClient({ credentials });
  } catch {
    return null;
  }
}

export async function getAnalyticsStats() {
  const client = getClient();
  if (!client) {
    return { connected: false, activeUsers: 0, today: 0, week: 0, month: 0, topPages: [] };
  }

  try {
    const prop = `properties/${GA_PROPERTY_ID}`;

    const [realtimeRes, todayRes, weekRes, monthRes, pagesRes] = await Promise.all([
      client.runRealtimeReport({ property: prop, metrics: [{ name: 'activeUsers' }] }),
      client.runReport({ property: prop, dateRanges: [{ startDate: 'today', endDate: 'today' }], metrics: [{ name: 'activeUsers' }] }),
      client.runReport({ property: prop, dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }], metrics: [{ name: 'activeUsers' }] }),
      client.runReport({ property: prop, dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }], metrics: [{ name: 'activeUsers' }] }),
      client.runReport({
        property: prop,
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [{ name: 'screenPageViews' }],
        dimensions: [{ name: 'pagePath' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 5,
      }),
    ]);

    const activeUsers = Number(realtimeRes[0]?.rows?.[0]?.metricValues?.[0]?.value ?? 0);
    const today = Number(todayRes[0]?.rows?.[0]?.metricValues?.[0]?.value ?? 0);
    const week = Number(weekRes[0]?.rows?.[0]?.metricValues?.[0]?.value ?? 0);
    const month = Number(monthRes[0]?.rows?.[0]?.metricValues?.[0]?.value ?? 0);

    const topPages = (pagesRes[0]?.rows ?? []).map(row => ({
      path: row.dimensionValues?.[0]?.value ?? '',
      views: Number(row.metricValues?.[0]?.value ?? 0),
    }));

    return { connected: true, activeUsers, today, week, month, topPages };
  } catch (e) {
    console.error('[Analytics] Error:', e instanceof Error ? e.message : String(e));
    return { connected: false, activeUsers: 0, today: 0, week: 0, month: 0, topPages: [] };
  }
}

type FunnelStep = {
  key: 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase';
  label: string;
  count: number;
};

function calculateDropoffs(steps: FunnelStep[]) {
  return steps.map((step, idx) => {
    if (idx === 0) return { ...step, conversionFromPrev: null as number | null, dropoffFromPrev: null as number | null };
    const prev = steps[idx - 1].count;
    const curr = step.count;
    if (prev <= 0) {
      return { ...step, conversionFromPrev: 0, dropoffFromPrev: 100 };
    }
    const conversion = (curr / prev) * 100;
    return {
      ...step,
      conversionFromPrev: Number(conversion.toFixed(1)),
      dropoffFromPrev: Number((100 - conversion).toFixed(1)),
    };
  });
}

export async function getFunnelStats() {
  const labels: Record<FunnelStep['key'], string> = {
    view_item: 'Viewed Product',
    add_to_cart: 'Added to Cart',
    begin_checkout: 'Began Checkout',
    purchase: 'Purchase',
  };

  const emptySteps: FunnelStep[] = [
    { key: 'view_item', label: labels.view_item, count: 0 },
    { key: 'add_to_cart', label: labels.add_to_cart, count: 0 },
    { key: 'begin_checkout', label: labels.begin_checkout, count: 0 },
    { key: 'purchase', label: labels.purchase, count: 0 },
  ];

  const client = getClient();
  if (!client) {
    return {
      connected: false,
      source: 'local' as const,
      period: 'Last 30 days',
      steps: calculateDropoffs(emptySteps),
      error: 'GA service account is not configured',
    };
  }

  try {
    const prop = `properties/${GA_PROPERTY_ID}`;
    const [eventsRes] = await client.runReport({
      property: prop,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [{ name: 'eventCount' }],
      dimensions: [{ name: 'eventName' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: {
            values: ['view_item', 'add_to_cart', 'begin_checkout', 'purchase'],
          },
        },
      },
      limit: 10,
    });

    const counts: Record<string, number> = {};
    for (const row of eventsRes.rows ?? []) {
      const key = row.dimensionValues?.[0]?.value ?? '';
      const value = Number(row.metricValues?.[0]?.value ?? 0);
      counts[key] = value;
    }

    const steps: FunnelStep[] = emptySteps.map(step => ({
      ...step,
      count: counts[step.key] ?? 0,
    }));

    return {
      connected: true,
      source: 'ga4' as const,
      period: 'Last 30 days',
      steps: calculateDropoffs(steps),
      error: null as string | null,
    };
  } catch (e) {
    console.error('[Analytics Funnel] Error:', e instanceof Error ? e.message : String(e));
    return {
      connected: false,
      source: 'local' as const,
      period: 'Last 30 days',
      steps: calculateDropoffs(emptySteps),
      error: 'Failed to read GA4 events',
    };
  }
}
