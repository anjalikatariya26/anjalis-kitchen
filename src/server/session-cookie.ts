/**
 * Session cookie helpers — Part G2
 *
 * Manages the session cookie lifecycle (set, get, clear).
 */

import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? 'ak_session';

/**
 * Set the session cookie after successful login.
 */
export async function setSessionCookie(
  token: string,
  expiresAt: Date,
  isInsecure: boolean
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: !isInsecure,
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

/**
 * Get the session token from the cookie.
 */
export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

/**
 * Clear the session cookie (logout).
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export { SESSION_COOKIE_NAME };
