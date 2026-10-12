/**
 * Public layout — Navbar, skip link, main content, footer.
 * Phase 5: Complete public layout with responsive nav and rich footer.
 */
import type { Metadata } from 'next';
import { PublicNavbar } from '@/components/catalogue/PublicNavbar';
import { PublicFooter } from '@/components/catalogue/PublicFooter';

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        style={{
          background: 'var(--color-primary)',
          color: 'var(--color-on-primary)',
        }}
      >
        Skip to content
      </a>

      <PublicNavbar />

      <main id="main-content">{children}</main>

      <PublicFooter />
    </>
  );
}
