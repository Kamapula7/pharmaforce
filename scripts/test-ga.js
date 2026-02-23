const { BetaAnalyticsDataClient } = require('@google-analytics/data');
require('dotenv').config({ path: '.env.vercel.prod' });

const GA_PROPERTY_ID = '525533875';

async function test() {
  const creds = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (!creds) { console.log('ERROR: GA_SERVICE_ACCOUNT_JSON not found'); return; }
  console.log('Found, length:', creds.length);

  let credentials;
  try {
    const cleaned = creds.trim();
    // Fix literal newlines inside PEM key block
    const fixed = cleaned.replace(
      /(-----BEGIN[\s\S]*?-----END[A-Z ]*-----)/g,
      (match) => match.replace(/\n/g, '\\n')
    );
    credentials = JSON.parse(fixed);
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }
    console.log('Parsed OK, email:', credentials.client_email);
  } catch (e) {
    console.log('ERROR parsing:', e.message);
    // Fallback: replace all literal newlines (brute force)
    try {
      const escaped = creds.trim().replace(/\n/g, '\\n').replace(/\r/g, '');
      credentials = JSON.parse(escaped);
      if (credentials.private_key) {
        credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
      }
      console.log('Fallback OK, email:', credentials.client_email);
    } catch (e2) {
      console.log('Fallback also failed:', e2.message);
      return;
    }
  }

  const client = new BetaAnalyticsDataClient({ credentials });

  try {
    const [res] = await client.runRealtimeReport({
      property: `properties/${GA_PROPERTY_ID}`,
      metrics: [{ name: 'activeUsers' }],
    });
    console.log('✅ Realtime activeUsers:', res?.rows?.[0]?.metricValues?.[0]?.value ?? 0);
  } catch (e) {
    console.log('❌ Realtime error:', e.message);
  }

  try {
    const [res] = await client.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      metrics: [{ name: 'activeUsers' }],
    });
    console.log('✅ 7-day users:', res?.rows?.[0]?.metricValues?.[0]?.value ?? 0);
  } catch (e) {
    console.log('❌ Report error:', e.message);
  }
}

test();
