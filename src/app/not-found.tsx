/**
 * Custom 404 page — friendly with navigation.
 */
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <p
        className="text-6xl font-bold"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
      >
        404
      </p>
      <h1
        className="mt-4 text-2xl font-bold"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
      >
        Page not found
      </h1>
      <p className="mt-2" style={{ color: 'var(--color-muted)', maxWidth: '400px' }}>
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/products"
          className="rounded-lg px-6 py-3 font-semibold"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          Browse the Menu
        </Link>
        <Link
          href="/festivals"
          className="rounded-lg border px-6 py-3 font-semibold"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          Festivals
        </Link>
      </div>
    </div>
  );
}
