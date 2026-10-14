'use server';

/**
 * Auth Server Actions — Part G2
 *
 * Server Actions for login, logout, and password change.
 * These run server-side and handle cookie management.
 */

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { loginSchema, passwordChangeSchema } from '@/schemas';
import { login, logout, changePassword, validateSession } from '@/server/services/auth.service';
import { setSessionCookie, getSessionToken, clearSessionCookie } from '@/server/session-cookie';
import { setCsrfCookie } from '@/server/csrf';
import { AppError } from '@/server/errors';
import { logger } from '@/server/logger';

const INSECURE_COOKIES = process.env.INSECURE_COOKIES === 'true';
const CSRF_SECRET = process.env.CSRF_SECRET ?? 'local-dev-csrf-secret-change-in-production';

export type ActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

/**
 * Login action — called from the login form.
 */
export async function loginAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const raw = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const parsed = loginSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    // Get client IP
    const hdrs = await headers();
    const ip =
      hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      hdrs.get('x-real-ip') ??
      '127.0.0.1';
    const userAgent = hdrs.get('user-agent') ?? undefined;

    const result = await login(parsed.data.email, parsed.data.password, ip, userAgent);

    // Set session cookie
    await setSessionCookie(result.sessionToken, result.expiresAt, INSECURE_COOKIES);

    // Set CSRF cookie
    await setCsrfCookie(CSRF_SECRET, INSECURE_COOKIES);

    logger.info('Login action successful');
  } catch (err) {
    if (err instanceof AppError) {
      return { success: false, error: err.message };
    }
    logger.error('Login action failed', err);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }

  // Redirect outside try/catch (Next.js redirect throws)
  const rawRedirect = formData.get('redirect')?.toString();
  let redirectTo = '/admin';
  if (rawRedirect && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') && !rawRedirect.startsWith('/\\')) {
    redirectTo = rawRedirect;
  }
  redirect(redirectTo);
}

/**
 * Logout action — destroys the session and redirects to login.
 */
export async function logoutAction(): Promise<void> {
  try {
    const token = await getSessionToken();
    if (token) {
      await logout(token);
    }
  } catch (err) {
    logger.error('Logout error', err);
  }

  await clearSessionCookie();
  redirect('/admin/login');
}

/**
 * Password change action — changes password and revokes other sessions.
 */
export async function changePasswordAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    const token = await getSessionToken();
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }

    const session = await validateSession(token);

    const raw = {
      currentPassword: formData.get('currentPassword'),
      newPassword: formData.get('newPassword'),
    };

    const parsed = passwordChangeSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await changePassword(
      session.adminId,
      parsed.data.currentPassword,
      parsed.data.newPassword,
      session.sessionId
    );

    return { success: true };
  } catch (err) {
    if (err instanceof AppError) {
      return { success: false, error: err.message };
    }
    logger.error('Password change failed', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

/**
 * Get the current authenticated admin user, or null if not authenticated.
 * Used by admin pages to check auth state.
 */
export async function getCurrentUser() {
  try {
    const token = await getSessionToken();
    if (!token) return null;
    return await validateSession(token);
  } catch {
    return null;
  }
}

/**
 * Require authentication. Redirects to login if not authenticated.
 * Use at the top of admin page components.
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/admin/login');
  }
  return user;
}
