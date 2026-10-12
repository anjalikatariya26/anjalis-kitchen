/**
 * CSRF protection — Part G2
 *
 * Double-submit cookie pattern:
 * 1. Server sets a CSRF token in a cookie (httpOnly=false so JS can read it)
 * 2. Client includes the token in a X-CSRF-Token header
 * 3. Server validates that the header matches the cookie
 *
 * This works because a cross-origin attacker cannot read the cookie value.
 */

import { createHmac, randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { CsrfError } from '@/server/errors';

const CSRF_COOKIE_NAME = 'ak_csrf';
const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Generate a signed CSRF token.
 */
export function generateCsrfToken(secret: string): string {
  const payload = randomBytes(32).toString('hex');
  const signature = createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

/**
 * Verify a CSRF token signature.
 */
export function verifyCsrfToken(token: string, secret: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expectedSig = createHmac('sha256', secret).update(payload).digest('hex');

  // Constant-time comparison
  if (signature.length !== expectedSig.length) return false;

  let mismatch = 0;
  for (let i = 0; i < signature.length; i++) {
    mismatch |= signature.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Set the CSRF cookie (called on login and page load).
 */
export async function setCsrfCookie(secret: string, isInsecure: boolean): Promise<string> {
  const token = generateCsrfToken(secret);
  const cookieStore = await cookies();

  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false, // Client JS must read this
    secure: !isInsecure,
    sameSite: 'strict',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });

  return token;
}

/**
 * Validate the CSRF token from the request.
 *
 * Compares the cookie value against the header value,
 * and verifies the signature of both.
 */
export async function validateCsrf(
  headerToken: string | null,
  secret: string
): Promise<void> {
  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (!cookieToken || !headerToken) {
    throw new CsrfError();
  }

  // Both must be validly signed
  if (!verifyCsrfToken(cookieToken, secret) || !verifyCsrfToken(headerToken, secret)) {
    throw new CsrfError();
  }

  // Both must match
  if (cookieToken !== headerToken) {
    throw new CsrfError();
  }
}

export { CSRF_COOKIE_NAME, CSRF_HEADER_NAME };
