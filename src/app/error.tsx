'use client';

/**
 * Global error boundary — Part K5
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <p
        className="text-4xl font-bold"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-error)' }}
      >
        Something went wrong
      </p>
      <p className="mt-4" style={{ color: 'var(--color-muted)', maxWidth: '400px' }}>
        We&apos;re sorry — an unexpected error occurred. Please try again.
      </p>
      {process.env.NODE_ENV === 'development' && (
        <pre
          className="mt-4 max-w-lg overflow-auto rounded-lg p-4 text-left text-xs"
          style={{
            backgroundColor: 'var(--color-surface-2)',
            color: 'var(--color-error)',
          }}
        >
          {error.message}
        </pre>
      )}
      <button
        onClick={reset}
        className="mt-8 rounded-lg px-6 py-3 font-semibold"
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-on-primary)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        Try Again
      </button>
    </div>
  );
}
