/**
 * Admin layout — session check, sidebar, mobile nav, noindex.
 * Uses AdminLayoutClient to hide navbars on /admin/login.
 */
import type { Metadata } from 'next';
import { ToastProvider } from '@/components/ui/Toast';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';

export const metadata: Metadata = {
  title: "Admin Portal — Anjali's Kitchen",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </ToastProvider>
  );
}
