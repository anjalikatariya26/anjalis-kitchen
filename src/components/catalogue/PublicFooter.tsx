/**
 * PublicFooter — Premium Brand Footer with Spatial Depth,
 * Gradient Accents, Trust Signals, and Social Links.
 */
import { MessageCircle, Phone, MapPin, AtSign, ChefHat, Heart } from 'lucide-react';

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#1A0508] via-[#2B080C] to-[#1A0508] text-white overflow-hidden">
      {/* Ambient depth orbs */}
      <div className="orb orb-gold w-[400px] h-[400px] -top-40 right-[10%]" style={{ animationDelay: '3s' }} />
      <div className="orb orb-rose w-[300px] h-[300px] bottom-0 left-[5%]" style={{ animationDelay: '8s' }} />

      {/* Floating decorative elements */}
      <div className="absolute top-[15%] left-[8%] text-2xl opacity-10 animate-float-slow">🪔</div>
      <div className="absolute top-[40%] right-[5%] text-xl opacity-10 animate-float-medium" style={{ animationDelay: '2s' }}>🍯</div>
      <div className="absolute bottom-[20%] left-[50%] text-lg opacity-8 animate-float-fast" style={{ animationDelay: '1s' }}>🌿</div>

      <div className="relative mx-auto px-4 py-16" style={{ maxWidth: 'var(--content-max-width)', zIndex: 10 }}>
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg">
                <ChefHat className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  Anjali&apos;s Kitchen
                </h3>
                <p className="text-xs text-amber-400 font-semibold tracking-wider">GHAR KA SWAAD</p>
              </div>
            </div>
            <p className="text-sm text-amber-100/50 leading-relaxed max-w-xs">
              Homemade Maharashtrian sweets, snacks and festival faral.
              Made fresh to order with pure ghee and refined oil. 100% vegetarian
              with dedicated Jain-friendly options.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <nav className="space-y-2.5" aria-label="Footer navigation">
              {[
                { label: 'Menu', href: '/products' },
                { label: 'Festivals', href: '/festivals' },
                { label: 'Gift Hampers', href: '/hampers' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-amber-100/50 hover:text-amber-300 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 mb-4 uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href="tel:9970599900"
                className="flex items-center gap-2.5 text-sm text-amber-100/50 hover:text-amber-300 transition-colors"
              >
                <Phone size={15} className="flex-shrink-0" />
                9970599900
              </a>
              <a
                href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-amber-100/50 hover:text-amber-300 transition-colors"
              >
                <MessageCircle size={15} className="flex-shrink-0" />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/anjaliskitchen_0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-amber-100/50 hover:text-amber-300 transition-colors"
              >
                <AtSign size={15} className="flex-shrink-0" />
                @anjaliskitchen_0
              </a>
              <p className="flex items-start gap-2.5 text-sm text-amber-100/50">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" />
                <span>Ahilyanagar, Maharashtra</span>
              </p>
            </div>
          </div>
        </div>

        {/* Trust band — spatial glass strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl py-5 px-6 glass">
          {[
            { emoji: '🍳', text: 'Made Fresh to Order' },
            { emoji: '🧈', text: 'Pure Ghee & Refined Oil' },
            { emoji: '🌿', text: 'Jain Options Available' },
            { emoji: '📦', text: 'Order 3–4 Days Ahead' },
          ].map((badge) => (
            <span
              key={badge.text}
              className="flex items-center gap-2 text-sm font-medium text-amber-200/70"
            >
              <span className="text-base">{badge.emoji}</span>
              {badge.text}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-amber-100/30">
            © {year} Anjali&apos;s Kitchen. All rights reserved. FSSAI Licensed.
          </p>
          <p className="text-xs text-amber-100/30 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-rose-500 fill-current" /> in Ahilyanagar
          </p>
        </div>
      </div>
    </footer>
  );
}
