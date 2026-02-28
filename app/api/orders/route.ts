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
    const body = await req.json();

    const {
      firstName, lastName, phone,
      country, city, address, zip, notes,
      total, items, orderRef,
    } = body;
    const email = body.email?.toLowerCase().trim();

    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id ?? null,
        email,
        firstName,
        lastName,
        phone: phone || null,
        country,
        city,
        address,
        zip,
        notes: notes || null,
        total,
        bankRef: orderRef,
        status: 'AWAITING_PAYMENT',
        items: {
          create: items.map((item: { productId: string; nameEn: string; quantity: number; price: number }) => ({
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
          items: items.map((i: { nameEn: string; quantity: number; price: number }) => ({
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
    console.error('[orders]', e instanceof Error ? e.message : String(e));
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
