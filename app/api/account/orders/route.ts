import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Find by userId OR by email (for orders placed before login)
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        { userId: session.user.id ?? undefined },
        { email: session.user.email },
      ],
    },
    include: { items: { select: { nameEn: true, quantity: true, price: true } } },
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
