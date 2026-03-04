import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmation } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const rl = rateLimit(`order:${ip}`, { limit: 10, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const session = await auth();
    void session; // session used only for future features
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    const b = body as Record<string, unknown>;
    const email = typeof b.email === 'string' ? b.email.toLowerCase().trim() : '';
    const firstName = typeof b.firstName === 'string' ? b.firstName.trim() : '';
    const lastName = typeof b.lastName === 'string' ? b.lastName.trim() : '';
    const phone = typeof b.phone === 'string' ? b.phone.trim() || null : null;
    const country = typeof b.country === 'string' ? b.country.trim() : '';
    const city = typeof b.city === 'string' ? b.city.trim() : '';
    const address = typeof b.address === 'string' ? b.address.trim() : '';
    const zip = typeof b.zip === 'string' ? b.zip.trim() : '';
    const notes = typeof b.notes === 'string' ? b.notes.trim() || null : null;
    const total = Number(b.total);
    const orderRef = typeof b.orderRef === 'string' ? b.orderRef.trim() : '';
    const rawItems = Array.isArray(b.items) ? b.items : [];

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    if (!firstName || !lastName) {
      return NextResponse.json({ error: 'Name required' }, { status: 400 });
    }
    if (!country || !city || !address || !zip) {
      return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }
    if (!Number.isFinite(total) || total <= 0) {
      return NextResponse.json({ error: 'Invalid total' }, { status: 400 });
    }
    if (!orderRef || rawItems.length === 0) {
      return NextResponse.json({ error: 'Order items required' }, { status: 400 });
    }

    const items = rawItems.map((item: unknown) => {
      const i = item && typeof item === 'object' ? item as Record<string, unknown> : {};
      return {
        productId: String(i.productId ?? i.id ?? ''),
        nameEn: String(i.nameEn ?? ''),
        quantity: Math.max(1, Math.floor(Number(i.quantity) || 1)),
        price: Number(i.price) || 0,
      };
    }).filter((i) => i.nameEn);

    if (items.length === 0) {
      return NextResponse.json({ error: 'Valid items required' }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId: null,
        email,
        firstName,
        lastName,
        phone,
        country,
        city,
        address,
        zip,
        notes,
        total,
        bankRef: orderRef,
        status: 'AWAITING_PAYMENT',
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            nameEn: item.nameEn,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // Send email in background — response returns immediately, no delay for user
    after(async () => {
      try {
        await sendOrderConfirmation({
          customerEmail: email,
          customerName: `${firstName} ${lastName}`,
          orderRef,
          total,
          items: items.map((i) => ({
            name: i.nameEn,
            qty: i.quantity,
            price: i.price,
          })),
        });
      } catch (emailErr) {
        console.error('[email confirmation]', emailErr);
      }
    });

    return NextResponse.json({ ok: true, orderId: order.id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : undefined;
    console.error('[orders FULL]', JSON.stringify(e, Object.getOwnPropertyNames(e instanceof Error ? e : {})));
    console.error('[orders]', msg, stack ?? '');
    const isRetryable = /timeout|connection|ECONNREFUSED|connect/i.test(msg);
    const prismaCode = e && typeof e === 'object' && 'code' in e ? String((e as { code?: string }).code) : '';
    const hint = prismaCode ? ` [${prismaCode}]` : isRetryable ? '' : ' [SAVE_FAIL]';
    const userMsg = isRetryable
      ? 'Connection issue. Please try again in a moment.'
      : `Could not save order.${hint} Please try again or contact support.`;
    return NextResponse.json(
      { ok: false, error: userMsg, code: prismaCode || (isRetryable ? 'RETRY' : 'ERROR'), _debug: msg.slice(0, 300) },
      { status: 500 }
    );
  }
}
