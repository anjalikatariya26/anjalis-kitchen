/**
 * PublicFooter — Brand, links, contact info, trust signals.
 */
import { MessageCircle, Phone, MapPin, AtSign } from 'lucide-react';

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'var(--color-surface-2)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div
        className="mx-auto px-4 py-12"
        style={{ maxWidth: 'var(--content-max-width)' }}
      >
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}
            >
              Anjali&apos;s Kitchen
            </h3>
            <p className="mt-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-secondary)' }}>
              Ghar Ka Swaad
            </p>
            <p className="mt-3 text-sm" style={{ color: 'var(--color-muted)', lineHeight: 'var(--leading-relaxed)' }}>
              Homemade Maharashtrian sweets, snacks and festival faral.
              Made fresh to order with pure ghee and refined oil. 100% vegetarian
              with dedicated Jain-friendly options.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Explore
            </h4>
            <nav className="space-y-2" aria-label="Footer navigation">
              {[
                { label: 'Menu', href: '/products' },
                { label: 'Festivals', href: '/festivals' },
                { label: 'Gift Hampers', href: '/hampers' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Admin Login', href: '/admin/login' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm transition-colors hover:underline"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href="tel:9970599900"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                <Phone size={15} />
                9970599900
              </a>
              <a
                href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                <MessageCircle size={15} />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/anjaliskitchen_0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--color-muted)' }}
              >
                <AtSign size={15} />
                @anjaliskitchen_0
              </a>
              <p className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-muted)' }}>
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <span>Ahilyanagar, Maharashtra</span>
              </p>
            </div>
          </div>
        </div>

        {/* Trust band */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-xl py-4 px-6"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          {[
            { emoji: '🍳', text: 'Made Fresh to Order' },
            { emoji: '🧈', text: 'Pure Ghee & Refined Oil' },
            { emoji: '🌿', text: 'Jain Options Available' },
            { emoji: '📦', text: 'Order 3–4 Days Ahead' },
          ].map((badge) => (
            <span
              key={badge.text}
              className="flex items-center gap-1.5 text-sm font-medium"
              style={{ color: 'var(--color-text)' }}
            >
              <span>{badge.emoji}</span>
              {badge.text}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
            © {year} Anjali&apos;s Kitchen. All rights reserved. FSSAI Licensed.
          </p>
        </div>
      </div>
    </footer>
  );
}
