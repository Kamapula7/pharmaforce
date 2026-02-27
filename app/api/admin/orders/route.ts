import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get('admin_session')?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const items = await prisma.orderItem.deleteMany({});
    const orders = await prisma.order.deleteMany({});

    return NextResponse.json({ ok: true, deleted: { orders: orders.count, items: items.count } });
  } catch (e) {
    console.error('[admin/orders delete-all]', e instanceof Error ? e.message : String(e));
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
