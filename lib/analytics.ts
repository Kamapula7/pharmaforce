import { BetaAnalyticsDataClient } from '@google-analytics/data';

const GA_PROPERTY_ID = '525533875';

function getClient() {
  const creds = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (!creds) return null;

  try {
    const cleaned = creds.trim();
    const credentials = JSON.parse(cleaned);
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
