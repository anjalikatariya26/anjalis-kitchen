'use client';

/**
 * PublicNavbar — Responsive navigation with mobile drawer.
 * Desktop: inline links, search, WhatsApp button.
 * Mobile: logo, search icon, hamburger → full-height drawer.
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Phone, MessageCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/cn';

const navLinks = [
  { label: 'Menu', href: '/products' },
  { label: 'Festivals', href: '/festivals' },
  { label: 'Hampers', href: '/hampers' },
  { label: 'Contact', href: '/contact' },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md bg-white/95"
      style={{
        borderColor: 'var(--color-border)',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-4"
        style={{
          maxWidth: 'var(--content-max-width)',
          height: 'var(--navbar-height)',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Anjali's Kitchen — Home"
        >
          <span
            className="text-xl font-bold tracking-tight group-hover:scale-105 transition-transform"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-primary)',
            }}
          >
            Anjali&apos;s Kitchen
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:bg-maroon-50 hover:text-maroon-800',
                isActive(link.href) ? 'bg-maroon-50 font-bold text-maroon-900 shadow-sm' : ''
              )}
              style={{
                color: isActive(link.href) ? 'var(--color-primary)' : 'var(--color-text)',
              }}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop right */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/admin/login"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
            title="Admin Dashboard Portal"
          >
            <Lock size={14} className="text-maroon-700" />
            Admin Login
          </a>

          <a
            href="tel:9970599900"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-slate-900"
            style={{ color: 'var(--color-muted)' }}
          >
            <Phone size={15} />
            Call
          </a>

          <a
            href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen, I'd like to place an order.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            style={{
              background: 'var(--color-accent)',
              color: 'white',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen, I'd like to place an order.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg"
            style={{
              width: '40px',
              height: '40px',
              background: 'var(--color-accent)',
              color: 'white',
              borderRadius: 'var(--radius-sm)',
            }}
            aria-label="WhatsApp us"
          >
            <MessageCircle size={18} />
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center"
            style={{ width: '40px', height: '40px', color: 'var(--color-text)' }}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50"
            style={{ background: 'var(--color-overlay)' }}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
            style={{
              width: '280px',
              background: 'var(--color-surface)',
              boxShadow: 'var(--shadow-3)',
            }}
          >
            <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
              >
                Menu
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{ color: 'var(--color-muted)' }}
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center rounded-lg px-3 py-3 text-base font-medium transition-colors"
                  style={{
                    color: isActive(link.href) ? 'var(--color-primary)' : 'var(--color-text)',
                    background: isActive(link.href) ? 'var(--color-primary-light)' : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="p-4 space-y-2" style={{ borderTop: '1px solid var(--color-border)' }}>
              <a
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 py-2.5 text-sm font-semibold text-slate-800"
              >
                <Lock size={15} className="text-maroon-700" />
                Admin Portal Login
              </a>
              <a
                href="tel:9970599900"
                className="flex items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-semibold"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <Phone size={15} />
                Call 9970599900
              </a>
              <a
                href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen, I'd like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold"
                style={{ background: 'var(--color-accent)', color: 'white' }}
              >
                <MessageCircle size={15} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </>
      )}

      {/* Mobile WhatsApp floating button */}
      <a
        href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen, I'd like to place an order.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-30 flex items-center justify-center rounded-full shadow-lg md:hidden"
        style={{
          width: '56px',
          height: '56px',
          background: '#25D366',
          color: 'white',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </header>
  );
}
