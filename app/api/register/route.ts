import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const rl = rateLimit(`register:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const email = body.email?.toLowerCase().trim();
    const password = body.password;
    const name = body.name;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    // Attach any guest orders placed with this email (case-insensitive)
    await prisma.order.updateMany({
      where: { email: { equals: email, mode: 'insensitive' }, userId: null },
      data: { userId: user.id },
    });

    // Send welcome email in background — no delay for user
    after(async () => {
      try {
        await sendWelcomeEmail({ customerEmail: email, customerName: name || email });
      } catch (emailErr) {
        console.error('[email welcome]', emailErr);
      }
    });

    return NextResponse.json({ id: user.id, email: user.email });
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
