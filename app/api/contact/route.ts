import { NextRequest, NextResponse } from 'next/server';
import { sendContactFormEmail } from '@/lib/email';

const SUBJECT_MAP: Record<string, string> = {
  order: 'Order question',
  product: 'Product inquiry',
  shipping: 'Shipping & delivery',
  payment: 'Payment issue',
  returns: 'Returns & refunds',
  other: 'Other',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    if (!email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Email and message are required' }, { status: 400 });
    }

    const fromName = [firstName?.trim(), lastName?.trim()].filter(Boolean).join(' ') || 'Visitor';
    const subjectText = SUBJECT_MAP[subject] ?? subject ?? 'Other';

    await sendContactFormEmail({
      fromEmail: email.trim(),
      fromName,
      subject: subjectText,
      message: String(message).trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[api/contact]', e instanceof Error ? e.message : String(e));
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
