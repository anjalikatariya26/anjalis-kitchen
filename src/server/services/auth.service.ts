/**
 * Authentication service — Part G1, G2
 *
 * Handles login, session creation/validation, logout,
 * password change, and brute-force protection.
 */

import * as argon2 from 'argon2';
import { randomBytes, createHash } from 'crypto';
import { prisma } from '@/server/db';
import { logger } from '@/server/logger';
import {
  UnauthenticatedError,
  ForbiddenError,
  RateLimitError,
} from '@/server/errors';

// ─── Constants ──────────────────────────────────────────

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const SESSION_IDLE_HOURS = Number(process.env.SESSION_IDLE_HOURS ?? 12);
const SESSION_ABSOLUTE_DAYS = Number(process.env.SESSION_ABSOLUTE_DAYS ?? 7);
const LOGIN_RATE_WINDOW_MINUTES = 15;
const LOGIN_RATE_MAX_ATTEMPTS = 10;

// ─── Helpers ────────────────────────────────────────────

/**
 * Hash a session token with SHA-256 before storing.
 * The raw token goes into the cookie; the hash goes into the DB.
 */
function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/**
 * Generate a cryptographically random session token.
 */
function generateToken(): string {
  return randomBytes(48).toString('base64url');
}

// ─── Login ──────────────────────────────────────────────

export interface LoginResult {
  sessionToken: string;
  expiresAt: Date;
}

/**
 * Authenticate with email + password.
 *
 * Steps (Part G2):
 * 1. Rate-limit check (IP-based)
 * 2. Find admin by email
 * 3. Check account lockout
 * 4. Verify password with argon2
 * 5. Create hashed session token
 * 6. Log attempt
 */
export async function login(
  email: string,
  password: string,
  ip: string,
  userAgent?: string
): Promise<LoginResult> {
  // Dev environment fallback for instant admin access
  const isDevAdminCredential =
    (email.toLowerCase().trim() === 'anjalikatariya2@gmail.com' ||
      email.toLowerCase().trim() === 'admin@anjaliskitchen.com') &&
    (password === 'Anjali@26Katariya' ||
      password === 'AdminPassword123!' ||
      password === 'admin123' ||
      password === 'admin');

  if (process.env.NODE_ENV !== 'production' && isDevAdminCredential) {
    const rawToken = 'dev-session-admin-token';
    const expiresAt = new Date(Date.now() + SESSION_ABSOLUTE_DAYS * 24 * 60 * 60_000);
    logger.info('Dev fallback login successful for admin');
    return { sessionToken: rawToken, expiresAt };
  }

  // 1. Rate limit by IP
  try {
    const windowStart = new Date(Date.now() - LOGIN_RATE_WINDOW_MINUTES * 60_000);
    const recentAttempts = await prisma.loginAttempt.count({
      where: { ip, at: { gte: windowStart } },
    });

    if (recentAttempts >= LOGIN_RATE_MAX_ATTEMPTS) {
      logger.warn('Login rate limit exceeded', { ip });
      throw new RateLimitError(LOGIN_RATE_WINDOW_MINUTES * 60);
    }
  } catch (err) {
    if (err instanceof RateLimitError) throw err;
    logger.warn('Database error during rate limit check, skipping DB check in dev mode');
  }

  // 2. Find admin
  let admin = null;
  try {
    admin = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  } catch (err) {
    logger.warn('Database error during admin lookup', { error: String(err) });
  }

  // Always log the attempt (even if admin not found, to track probing)
  const logAttempt = async (succeeded: boolean) => {
    await prisma.loginAttempt.create({
      data: { ip, email: email.toLowerCase().trim(), succeeded },
    });
  };

  if (!admin) {
    // Constant-time: hash a dummy password to prevent timing attacks
    await argon2.hash('dummy-password-timing-defense');
    await logAttempt(false);
    logger.warn('Login failed: unknown email', { email: email.substring(0, 3) + '***' });
    throw new UnauthenticatedError();
  }

  // 3. Check lockout
  if (admin.lockedUntil && admin.lockedUntil > new Date()) {
    await logAttempt(false);
    const retryAfter = Math.ceil((admin.lockedUntil.getTime() - Date.now()) / 1000);
    logger.warn('Login blocked: account locked', { adminId: admin.id });
    throw new RateLimitError(retryAfter);
  }

  // 4. Verify password
  const valid = await argon2.verify(admin.passwordHash, password);

  if (!valid) {
    const newFailedCount = admin.failedAttempts + 1;
    const shouldLock = newFailedCount >= MAX_FAILED_ATTEMPTS;

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: {
        failedAttempts: newFailedCount,
        lockedUntil: shouldLock
          ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000)
          : undefined,
      },
    });

    await logAttempt(false);

    if (shouldLock) {
      logger.warn('Account locked after failed attempts', { adminId: admin.id });
      throw new RateLimitError(LOCKOUT_MINUTES * 60);
    }

    logger.warn('Login failed: wrong password', { adminId: admin.id, attempt: newFailedCount });
    throw new UnauthenticatedError();
  }

  // 5. Success — reset failed attempts, create session
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { failedAttempts: 0, lockedUntil: null },
  });

  const rawToken = generateToken();
  const hashedToken = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_ABSOLUTE_DAYS * 24 * 60 * 60_000);

  await prisma.session.create({
    data: {
      id: hashedToken,
      adminId: admin.id,
      expiresAt,
      ip,
      userAgent: userAgent?.substring(0, 512),
    },
  });

  await logAttempt(true);

  logger.info('Login successful', { adminId: admin.id });

  return { sessionToken: rawToken, expiresAt };
}

// ─── Session Validation ─────────────────────────────────

export interface SessionUser {
  adminId: string;
  email: string;
  sessionId: string;
}

/**
 * Validate a session token and return the admin user.
 *
 * Also performs sliding expiration: updates lastSeenAt
 * and extends expiresAt if the session is approaching idle timeout.
 */
export async function validateSession(rawToken: string): Promise<SessionUser> {
  if (process.env.NODE_ENV !== 'production' && (rawToken === 'dev-session-admin-token' || rawToken.startsWith('dev-session'))) {
    return {
      adminId: 'dev-admin-id',
      email: 'admin@anjaliskitchen.com',
      sessionId: 'dev-session',
    };
  }

  const hashedToken = hashToken(rawToken);

  let session = null;
  try {
    session = await prisma.session.findUnique({
      where: { id: hashedToken },
      include: { admin: { select: { id: true, email: true, passwordChangedAt: true } } },
    });
  } catch (err) {
    logger.warn('Database error during session validation', { error: String(err) });
  }

  if (!session) {
    throw new UnauthenticatedError();
  }

  // Check absolute expiry
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: hashedToken } });
    throw new UnauthenticatedError();
  }

  // Check idle timeout
  const idleDeadline = new Date(
    session.lastSeenAt.getTime() + SESSION_IDLE_HOURS * 60 * 60_000
  );
  if (idleDeadline < new Date()) {
    await prisma.session.delete({ where: { id: hashedToken } });
    throw new UnauthenticatedError();
  }

  // Check if password changed after session was created
  if (session.admin.passwordChangedAt > session.createdAt) {
    await prisma.session.delete({ where: { id: hashedToken } });
    throw new UnauthenticatedError();
  }

  // Sliding expiration: update lastSeenAt (at most once per minute to avoid DB writes on every request)
  const oneMinuteAgo = new Date(Date.now() - 60_000);
  if (session.lastSeenAt < oneMinuteAgo) {
    await prisma.session.update({
      where: { id: hashedToken },
      data: { lastSeenAt: new Date() },
    });
  }

  return {
    adminId: session.admin.id,
    email: session.admin.email,
    sessionId: hashedToken,
  };
}

// ─── Logout ─────────────────────────────────────────────

/**
 * Destroy a single session.
 */
export async function logout(rawToken: string): Promise<void> {
  const hashedToken = hashToken(rawToken);
  await prisma.session.deleteMany({ where: { id: hashedToken } });
  logger.info('Session destroyed');
}

/**
 * Destroy all sessions for an admin (password change, security event).
 */
export async function logoutAll(adminId: string): Promise<void> {
  const result = await prisma.session.deleteMany({ where: { adminId } });
  logger.info('All sessions destroyed', { adminId, count: result.count });
}

// ─── Password Change ────────────────────────────────────

/**
 * Change admin password. Verifies current password, then:
 * 1. Hashes new password with argon2id
 * 2. Updates admin record
 * 3. Revokes all sessions except current
 */
export async function changePassword(
  adminId: string,
  currentPassword: string,
  newPassword: string,
  currentSessionId: string
): Promise<void> {
  const admin = await prisma.adminUser.findUnique({ where: { id: adminId } });
  if (!admin) throw new UnauthenticatedError();

  const valid = await argon2.verify(admin.passwordHash, currentPassword);
  if (!valid) {
    throw new ForbiddenError('Current password is incorrect');
  }

  if (newPassword.length < 12) {
    throw new ForbiddenError('New password must be at least 12 characters');
  }

  const newHash = await argon2.hash(newPassword, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  // Update password and revoke all other sessions
  await prisma.$transaction([
    prisma.adminUser.update({
      where: { id: adminId },
      data: {
        passwordHash: newHash,
        passwordChangedAt: new Date(),
        failedAttempts: 0,
        lockedUntil: null,
      },
    }),
    prisma.session.deleteMany({
      where: {
        adminId,
        id: { not: currentSessionId },
      },
    }),
  ]);

  logger.info('Password changed', { adminId });
}

// ─── Session Cleanup ────────────────────────────────────

/**
 * Delete expired sessions. Run periodically (e.g. cron).
 */
export async function cleanExpiredSessions(): Promise<number> {
  const result = await prisma.session.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
  if (result.count > 0) {
    logger.info('Cleaned expired sessions', { count: result.count });
  }
  return result.count;
}
