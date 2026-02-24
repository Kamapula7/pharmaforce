import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { select: { nameEn: true, quantity: true } } },
    orderBy: { createdAt: 'desc' },
  });

  type OrderRow = (typeof orders)[number];
  return NextResponse.json(
    orders.map((o: OrderRow) => ({
      id: o.id,
      createdAt: o.createdAt.toISOString(),
      status: o.status,
      total: o.total,
      items: o.items,
    }))
  );
}
