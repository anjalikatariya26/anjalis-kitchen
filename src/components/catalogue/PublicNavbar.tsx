'use client';

/**
 * PublicNavbar — Premium Responsive Navigation with Spatial Glass Effects.
 * Desktop: inline links with hover glow, search, WhatsApp CTA.
 * Mobile: logo, WhatsApp icon, hamburger → full-height animated drawer.
 */

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, Lock, ChefHat } from 'lucide-react';
import { cn } from '@/lib/cn';

const navLinks = [
  { label: 'Menu', href: '/products', emoji: '📜' },
  { label: 'Festivals', href: '/festivals', emoji: '🪔' },
  { label: 'Hampers', href: '/hampers', emoji: '🎁' },
  { label: 'Contact', href: '/contact', emoji: '📞' },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-md border-amber-200/60'
          : 'bg-white/95 backdrop-blur-md border-slate-200/80'
      )}
    >
      <div
        className="mx-auto flex items-center justify-between px-4"
        style={{
          maxWidth: 'var(--content-max-width)',
          height: 'var(--navbar-height)',
        }}
      >
        {/* Logo with spatial depth */}
        <a
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Anjali's Kitchen — Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7A1F2B] to-[#5C131D] flex items-center justify-center text-amber-300 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
            <ChefHat className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span
              className="text-lg font-bold tracking-tight group-hover:text-[#5C131D] transition-colors"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-primary)',
              }}
            >
              Anjali&apos;s Kitchen
            </span>
            <span className="text-[10px] font-semibold text-amber-700 -mt-0.5 tracking-wide">GHAR KA SWAAD</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200',
                isActive(link.href)
                  ? 'text-[#7A1F2B] font-bold'
                  : 'text-slate-700 hover:text-[#7A1F2B]'
              )}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
              {/* Active indicator — spatial underline glow */}
              {isActive(link.href) && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-amber-400 to-[#7A1F2B]" />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href="/admin/login"
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
            title="Admin Dashboard Portal"
          >
            <Lock size={13} />
            Admin
          </a>

          <a
            href="tel:9970599900"
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Phone size={15} />
            Call
          </a>

          <a
            href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen, I'd like to place an order.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <MessageCircle size={16} className="fill-white/20" />
            WhatsApp
          </a>
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen, I'd like to place an order.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-md"
            aria-label="WhatsApp us"
          >
            <MessageCircle size={18} />
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 transition-colors"
            style={{ color: 'var(--color-text)' }}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile drawer — spatial glass panel */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col w-[300px] bg-white shadow-2xl"
            style={{ animation: 'reveal-left 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7A1F2B] to-[#5C131D] flex items-center justify-center text-amber-300">
                  <ChefHat className="h-4 w-4" />
                </div>
                <span
                  className="text-base font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
                >
                  Menu
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all',
                    isActive(link.href)
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-[#7A1F2B] font-bold border border-amber-200/50'
                      : 'text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <span className="text-lg">{link.emoji}</span>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Footer actions */}
            <div className="p-4 space-y-2 border-t border-slate-100">
              <a
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Lock size={15} />
                Admin Portal
              </a>
              <a
                href="tel:9970599900"
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700"
              >
                <Phone size={15} />
                Call 9970599900
              </a>
              <a
                href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen, I'd like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] shadow-md"
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
        className="fixed bottom-20 right-4 z-30 flex items-center justify-center rounded-full shadow-xl md:hidden animate-pulse-glow"
        style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          color: 'white',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </header>
  );
}
