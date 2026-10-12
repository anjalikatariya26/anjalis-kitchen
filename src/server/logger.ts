/**
 * Structured logger — Part K5
 *
 * JSON logs with request IDs. Never logs passwords, tokens, cookies or full request bodies.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  requestId?: string;
  [key: string]: unknown;
}

function createEntry(
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>
): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...data,
  };
}

/**
 * Sanitise data to remove sensitive fields before logging.
 */
function sanitise(data: Record<string, unknown>): Record<string, unknown> {
  const sensitiveKeys = [
    'password',
    'passwordHash',
    'password_hash',
    'token',
    'cookie',
    'csrfToken',
    'csrf_token',
    'authorization',
    'secret',
  ];

  const sanitised: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk.toLowerCase()))) {
      sanitised[key] = '[REDACTED]';
    } else {
      sanitised[key] = value;
    }
  }
  return sanitised;
}

export const logger = {
  debug(message: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'production') return;
    const entry = createEntry('debug', message, data ? sanitise(data) : undefined);
    console.debug(JSON.stringify(entry));
  },

  info(message: string, data?: Record<string, unknown>) {
    const entry = createEntry('info', message, data ? sanitise(data) : undefined);
    console.info(JSON.stringify(entry));
  },

  warn(message: string, data?: Record<string, unknown>) {
    const entry = createEntry('warn', message, data ? sanitise(data) : undefined);
    console.warn(JSON.stringify(entry));
  },

  error(message: string, error?: unknown, data?: Record<string, unknown>) {
    const entry = createEntry('error', message, {
      ...(data ? sanitise(data) : {}),
      ...(error instanceof Error && {
        errorName: error.name,
        errorMessage: error.message,
        stack: process.env.NODE_ENV !== 'production' ? error.stack : undefined,
      }),
    });
    console.error(JSON.stringify(entry));
  },
};
