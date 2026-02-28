import { NextRequest, NextResponse } from 'next/server';
import { sendAbandonedCartEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { customerEmail, customerName, items, total, locale } = await req.json();

    if (!customerEmail || !items?.length) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await sendAbandonedCartEmail({
      customerEmail,
      customerName: customerName || 'Athlete',
      items,
      total: Number(total),
      locale: locale || 'en',
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Abandoned cart email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
