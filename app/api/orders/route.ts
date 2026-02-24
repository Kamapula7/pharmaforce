import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
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

    return NextResponse.json({ ok: true, orderId: order.id });
  } catch (e) {
    console.error('[orders]', e instanceof Error ? e.message : String(e));
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
