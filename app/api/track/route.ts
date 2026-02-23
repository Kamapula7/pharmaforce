import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();
    const country = req.headers.get('x-vercel-ip-country') ?? undefined;
    const userAgent = req.headers.get('user-agent') ?? undefined;

    // Skip bots and admin pages
    if (
      !path ||
      path.startsWith('/admin') ||
      path.startsWith('/api') ||
      /bot|crawl|spider|slurp|facebookexternalhit/i.test(userAgent ?? '')
    ) {
      return NextResponse.json({ ok: true });
    }

    await prisma.pageView.create({ data: { path, country: country ?? null, userAgent: userAgent ?? null } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
