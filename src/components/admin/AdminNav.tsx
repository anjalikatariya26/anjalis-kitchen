'use client';

import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ToggleRight,
  FolderTree,
  Sparkles,
  Gift,
  Settings,
  LogOut,
  Menu,
  X,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useState, useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { logoutAction } from '@/features/auth/actions';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/* ─── Nav items ──────────────────────────────────────── */

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Availability', href: '/admin/availability', icon: ToggleRight },
  { label: 'Categories', href: '/admin/categories', icon: FolderTree },
  { label: 'Festivals', href: '/admin/festivals', icon: Sparkles },
  { label: 'Hampers', href: '/admin/hampers', icon: Gift },
];

const settingsItem = { label: 'Settings', href: '/admin/settings', icon: Settings };

const mobileNavItems = [
  { label: 'Home', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Availability', href: '/admin/availability', icon: ToggleRight },
  { label: 'Hampers', href: '/admin/hampers', icon: Gift },
  { label: 'More', href: '/admin/settings', icon: MoreHorizontal },
];

/* ─── Sidebar (Desktop) ─────────────────────────────── */

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className="admin-sidebar hidden lg:flex">
      <div className="admin-sidebar-brand">
        <h2>Anjali&apos;s Kitchen</h2>
        <p>Admin Portal</p>
      </div>

      <nav className="admin-sidebar-nav" aria-label="Admin navigation">
        <div className="admin-sidebar-section">Menu</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'admin-sidebar-link',
                active && 'admin-sidebar-link--active'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <span className="admin-sidebar-icon">
                <Icon size={18} strokeWidth={active ? 2.2 : 1.75} />
              </span>
              {item.label}
            </a>
          );
        })}

        <div className="admin-sidebar-section" style={{ marginTop: 'var(--space-4)' }}>
          Account
        </div>
        <a
          href={settingsItem.href}
          className={cn(
            'admin-sidebar-link',
            isActive(settingsItem.href) && 'admin-sidebar-link--active'
          )}
          aria-current={isActive(settingsItem.href) ? 'page' : undefined}
        >
          <span className="admin-sidebar-icon">
            <Settings size={18} strokeWidth={isActive(settingsItem.href) ? 2.2 : 1.75} />
          </span>
          Settings
        </a>
      </nav>

      <div className="admin-sidebar-footer">
        <form action={logoutAction}>
          <button type="submit" className="admin-sidebar-link" style={{ width: '100%' }}>
            <span className="admin-sidebar-icon">
              <LogOut size={18} strokeWidth={1.75} />
            </span>
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}

/* ─── Mobile Nav (Bottom Tab Bar) ────────────────────── */

export function AdminMobileNav() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="admin-mobile-nav lg:hidden" aria-label="Admin mobile navigation">
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href, item.exact);
        return (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              'admin-mobile-nav-item',
              active && 'admin-mobile-nav-item--active'
            )}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={20} strokeWidth={active ? 2.2 : 1.75} />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ─── Mobile Header with Menu Drawer ─────────────────── */

export function AdminMobileHeader({ email }: { email?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <header className="admin-topbar lg:hidden">
        <div className="admin-topbar-left">
          <button
            className="admin-sidebar-link"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{ padding: 'var(--space-2)' }}
          >
            <Menu size={22} />
          </button>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
          >
            AK
          </span>
        </div>
        {email && (
          <div className="admin-topbar-user">
            {email.split('@')[0]}
          </div>
        )}
      </header>

      {/* Mobile drawer overlay via Portal */}
      {mounted && menuOpen && createPortal(
        <>
          <div
            className="fixed inset-0 transition-opacity duration-300"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 99998,
            }}
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="fixed top-0 left-0 bottom-0 flex flex-col shadow-2xl transition-transform duration-300"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: 'min(300px, 85vw)',
              height: '100%',
              maxHeight: '100dvh',
              backgroundColor: '#FFFFFF',
              zIndex: 99999,
              boxShadow: '8px 0 32px rgba(0,0,0,0.3)',
              overflowY: 'auto',
            }}
            aria-label="Admin Navigation Drawer"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
              <div>
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
                >
                  Anjali&apos;s Kitchen
                </h2>
                <p className="text-xs text-slate-500">Admin Portal</p>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1 bg-white" aria-label="Admin navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'admin-sidebar-link',
                      active && 'admin-sidebar-link--active'
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="admin-sidebar-icon">
                      <Icon size={18} strokeWidth={active ? 2.2 : 1.75} />
                    </span>
                    {item.label}
                  </a>
                );
              })}
              <a
                href={settingsItem.href}
                className={cn(
                  'admin-sidebar-link',
                  isActive(settingsItem.href) && 'admin-sidebar-link--active'
                )}
                onClick={() => setMenuOpen(false)}
              >
                <span className="admin-sidebar-icon">
                  <Settings size={18} />
                </span>
                Settings
              </a>
            </nav>

            <div className="p-3 border-t border-slate-100 bg-white">
              <form action={logoutAction}>
                <button type="submit" className="admin-sidebar-link w-full">
                  <span className="admin-sidebar-icon">
                    <LogOut size={18} />
                  </span>
                  Sign Out
                </button>
              </form>
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
