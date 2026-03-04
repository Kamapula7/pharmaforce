import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// EU-biased locale detection from Accept-Language header
function detectLocale(req: NextRequest): string {
  const accepted = req.headers.get('accept-language') ?? '';
  const preferred = accepted
    .split(',')
    .map(s => s.split(';')[0].trim().toLowerCase().slice(0, 2));

  const map: Record<string, string> = {
    de: 'de', at: 'de', ch: 'de',
    pl: 'pl',
    fr: 'fr', be: 'fr',
    it: 'it',
    es: 'es', mx: 'es',
    en: 'en',
  };

  for (const lang of preferred) {
    if (map[lang]) return map[lang];
  }
  return 'en';
}

const ADMIN_PATH = '/pf-secure-9k2';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin protection — skip intl, allow direct access
  if (pathname.startsWith(ADMIN_PATH)) {
    if (pathname === `${ADMIN_PATH}/login`) return NextResponse.next();
    const session = req.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL(`${ADMIN_PATH}/login`, req.url));
    }
    return NextResponse.next();
  }

  // Redirect bare root to locale detected from Accept-Language (permanent for SEO)
  if (pathname === '/') {
    const locale = detectLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url, { status: 308 });
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
