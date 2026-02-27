import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendShippedNotification } from '@/lib/email';

const VALID_STATUSES = ['PENDING', 'AWAITING_PAYMENT', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    // Send email in background — no delay for admin
    if (status === 'SHIPPED' && order.email) {
      after(async () => {
        try {
          await sendShippedNotification({
            customerEmail: order.email!,
            customerName: `${order.firstName} ${order.lastName}`,
            orderRef: order.bankRef ?? id.slice(-8).toUpperCase(),
            total: order.total,
          });
        } catch (emailErr) {
          console.error('[email shipped]', emailErr);
        }
      });
    }

    return NextResponse.json({ ok: true, status: order.status });
  } catch (e) {
    console.error('[admin/orders]', e instanceof Error ? e.message : String(e));
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
