import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const path: string = body?.path ?? '/';
    const country = req.headers.get('x-vercel-ip-country') ?? null;
    const userAgent = req.headers.get('user-agent') ?? null;

    if (
      path.startsWith('/admin') ||
      path.startsWith('/api') ||
      /bot|crawl|spider|slurp|facebookexternalhit/i.test(userAgent ?? '')
    ) {
      return NextResponse.json({ ok: true });
    }

    await prisma.pageView.create({ data: { path, country, userAgent } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[track]', e instanceof Error ? e.message : String(e));
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
