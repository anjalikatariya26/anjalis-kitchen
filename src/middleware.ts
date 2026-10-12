/**
 * Auth middleware — Part G3
 *
 * Next.js middleware runs on every request.
 * Protects /admin/* routes (except /admin/login) by validating the session cookie.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? 'ak_session';
const PUBLIC_ADMIN_PATHS = ['/admin/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin paths
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow public admin paths
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) {
    // Redirect to login with return URL
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Session token exists — the actual validation happens in the page/API handler
  // (middleware can't access Prisma or DB, so we defer full validation)
  // We just check cookie presence here as a first gate
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
