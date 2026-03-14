import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  sendPaymentReceivedEmail,
  sendAutoShippedEmail,
  sendDeliveryDelayedEmail,
} from '@/lib/email';

const CRON_SECRET = process.env.CRON_SECRET;

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export async function GET(req: NextRequest) {
  if (CRON_SECRET && req.headers.get('authorization') !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const stats = { paymentReceived: 0, shipped: 0, delayed: 0, errors: 0 };

  try {
    // 1) 24h after PAID → "payment received" email
    const paidOrders24h = await prisma.order.findMany({
      where: {
        status: 'PAID',
        autoEmail24h: false,
        paidAt: { lte: new Date(now.getTime() - 24 * HOUR) },
      },
    });

    for (const order of paidOrders24h) {
      try {
        await sendPaymentReceivedEmail({
          customerEmail: order.email,
          customerName: `${order.firstName} ${order.lastName}`,
          orderRef: order.bankRef ?? order.id.slice(-8).toUpperCase(),
          total: order.total,
        });
        await prisma.order.update({ where: { id: order.id }, data: { autoEmail24h: true } });
        stats.paymentReceived++;
      } catch (err) {
        console.error(`[cron] 24h email failed for ${order.id}:`, err);
        stats.errors++;
      }
    }

    // 2) 72h after PAID → "shipped" email + status change
    const paidOrders72h = await prisma.order.findMany({
      where: {
        status: 'PAID',
        autoEmail72h: false,
        paidAt: { lte: new Date(now.getTime() - 72 * HOUR) },
      },
    });

    for (const order of paidOrders72h) {
      try {
        await sendAutoShippedEmail({
          customerEmail: order.email,
          customerName: `${order.firstName} ${order.lastName}`,
          orderRef: order.bankRef ?? order.id.slice(-8).toUpperCase(),
          total: order.total,
        });
        await prisma.order.update({
          where: { id: order.id },
          data: { status: 'SHIPPED', autoEmail24h: true, autoEmail72h: true },
        });
        stats.shipped++;
      } catch (err) {
        console.error(`[cron] 72h email failed for ${order.id}:`, err);
        stats.errors++;
      }
    }

    // 3) 14 days after SHIPPED → "delayed" email
    const shippedOrders14d = await prisma.order.findMany({
      where: {
        status: 'SHIPPED',
        autoEmail14d: false,
        updatedAt: { lte: new Date(now.getTime() - 14 * DAY) },
      },
    });

    for (const order of shippedOrders14d) {
      try {
        await sendDeliveryDelayedEmail({
          customerEmail: order.email,
          customerName: `${order.firstName} ${order.lastName}`,
          orderRef: order.bankRef ?? order.id.slice(-8).toUpperCase(),
          total: order.total,
        });
        await prisma.order.update({ where: { id: order.id }, data: { autoEmail14d: true } });
        stats.delayed++;
      } catch (err) {
        console.error(`[cron] 14d email failed for ${order.id}:`, err);
        stats.errors++;
      }
    }

    console.log('[cron/order-followup]', stats);
    return NextResponse.json({ ok: true, ...stats });
  } catch (e) {
    console.error('[cron/order-followup]', e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
