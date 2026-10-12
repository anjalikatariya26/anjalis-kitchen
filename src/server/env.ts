import { z } from 'zod';

/**
 * Server-side environment variables — validated at boot.
 * The application refuses to start when a required value is missing.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().min(1),

  // Authentication
  SESSION_COOKIE_NAME: z.string().min(1).default('ak_session'),
  SESSION_IDLE_HOURS: z.coerce.number().int().min(1).default(12),
  SESSION_ABSOLUTE_DAYS: z.coerce.number().int().min(1).default(7),
  CSRF_SECRET: z.string().min(16),
  INSECURE_COOKIES: z
    .enum(['true', 'false'])
    .default('false')
    .transform((v) => v === 'true'),

  // Storage
  STORAGE_DRIVER: z.enum(['local', 's3', 'cloudinary', 'supabase']).default('local'),
  STORAGE_LOCAL_DIR: z.string().default('./uploads'),
  STORAGE_PUBLIC_BASE_URL: z.string().default('/media'),

  // Optional
  SENTRY_DSN: z.string().url().optional().or(z.literal('')),
});

/**
 * Client-side (NEXT_PUBLIC_) environment variables.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional().default('919970599900'),
  NEXT_PUBLIC_ANALYTICS_DOMAIN: z.string().optional().default(''),
});

// Validate at module load (app boot)
const serverResult = serverSchema.safeParse(process.env);

if (!serverResult.success) {
  console.error(
    '❌ Invalid server environment variables:',
    JSON.stringify(serverResult.error.flatten().fieldErrors, null, 2)
  );
  throw new Error('Invalid server environment variables. Check your .env file.');
}

const clientResult = clientSchema.safeParse({
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_ANALYTICS_DOMAIN: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN,
});

if (!clientResult.success) {
  console.error(
    '❌ Invalid client environment variables:',
    JSON.stringify(clientResult.error.flatten().fieldErrors, null, 2)
  );
  throw new Error('Invalid client environment variables.');
}

// Guard against INSECURE_COOKIES in production
if (serverResult.data.NODE_ENV === 'production' && serverResult.data.INSECURE_COOKIES) {
  throw new Error('INSECURE_COOKIES=true is not allowed in production.');
}

export const env = {
  ...serverResult.data,
  ...clientResult.data,
} as const;

export type Env = typeof env;
