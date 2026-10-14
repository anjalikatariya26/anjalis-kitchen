'use client';

/**
 * AdminLayoutClient — Conditional admin layout.
 * Hides sidebar, header, and bottom navigation on login page (/admin/login).
 */

import { usePathname } from 'next/navigation';
import { AdminSidebar, AdminMobileNav, AdminMobileHeader } from '@/components/admin/AdminNav';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <main className="min-h-screen w-full bg-[#FFFDF9] flex items-center justify-center">
        {children}
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FFFDF9] w-full overflow-x-hidden">
      {/* Desktop sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
        {/* Mobile header */}
        <AdminMobileHeader />

        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-20 lg:pb-0">
          <div className="mx-auto max-w-6xl p-3 sm:p-6 w-full">{children}</div>
        </main>

        {/* Mobile bottom nav */}
        <AdminMobileNav />
      </div>
    </div>
  );
}
