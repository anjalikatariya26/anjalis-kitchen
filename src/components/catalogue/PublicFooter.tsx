/**
 * PublicFooter — Premium Brand Footer with Spatial Depth,
 * High-Contrast Legible Typography, Trust Signals, and Social Links.
 */
import Link from 'next/link';
import { MessageCircle, Phone, MapPin, AtSign, ChefHat, Heart } from 'lucide-react';
import { JainSymbol } from '@/components/ui/JainSymbol';

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#1A0508] via-[#2B080C] to-[#140306] text-white overflow-hidden border-t border-amber-500/20">
      {/* Ambient depth orbs */}
      <div className="orb orb-gold w-[400px] h-[400px] -top-40 right-[10%] opacity-40" style={{ animationDelay: '3s' }} />
      <div className="orb orb-rose w-[300px] h-[300px] bottom-0 left-[5%] opacity-30" style={{ animationDelay: '8s' }} />

      {/* Floating decorative elements */}
      <div className="absolute top-[15%] left-[8%] text-2xl opacity-20 animate-float-slow">🪔</div>
      <div className="absolute top-[40%] right-[5%] text-xl opacity-20 animate-float-medium" style={{ animationDelay: '2s' }}>🍯</div>
      <div className="absolute bottom-[20%] left-[50%] text-lg opacity-15 animate-float-fast" style={{ animationDelay: '1s' }}>🪷</div>

      <div className="relative mx-auto px-4 py-16" style={{ maxWidth: 'var(--content-max-width)', zIndex: 10 }}>
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg font-bold">
                <ChefHat className="h-6 w-6 text-slate-950" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-serif text-amber-100 tracking-tight">
                  Anjali&apos;s Kitchen
                </h3>
                <p className="text-xs text-amber-300 font-extrabold tracking-widest uppercase">
                  GHAR KA SWAAD
                </p>
              </div>
            </div>
            <p className="text-sm text-amber-100/90 leading-relaxed max-w-sm">
              Homemade Maharashtrian sweets, festive faral, and crispy authentic snacks.
              Made fresh to order with pure cow ghee and traditional heritage recipes.
              100% vegetarian kitchen with dedicated Jain-friendly preparation.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 mb-4 uppercase tracking-wider">
              Explore Menu & Collections
            </h4>
            <nav className="space-y-2.5" aria-label="Footer navigation">
              {[
                { label: 'Browse Full Menu', href: '/products' },
                { label: 'Upcoming Festivals', href: '/festivals' },
                { label: 'Royal Gift Hampers', href: '/hampers' },
                { label: 'Contact & Custom Orders', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-amber-100/90 hover:text-amber-300 font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
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
                className="flex items-center gap-2.5 text-sm text-amber-100/90 hover:text-amber-300 font-medium transition-colors"
              >
                <Phone size={16} className="flex-shrink-0 text-amber-400" />
                <span>+91 99705 99900</span>
              </a>
              <a
                href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-amber-100/90 hover:text-emerald-300 font-medium transition-colors"
              >
                <MessageCircle size={16} className="flex-shrink-0 text-emerald-400" />
                <span>Order on WhatsApp (Instant Reply)</span>
              </a>
              <a
                href="https://instagram.com/anjaliskitchen_0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-amber-100/90 hover:text-rose-300 font-medium transition-colors"
              >
                <AtSign size={16} className="flex-shrink-0 text-rose-400" />
                <span>@anjaliskitchen_0</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-amber-100/90 font-medium">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-amber-400" />
                <span>Ahilyanagar (Ahmednagar), Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust band — spatial glass strip with official Jain mark */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-2xl py-4 px-6 bg-white/10 backdrop-blur-md border border-amber-400/20">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
            <span className="text-base">🥘</span>
            <span>Made Fresh to Order</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
            <span className="text-base">🧈</span>
            <span>Pure Cow Ghee & Premium Nuts</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
            <JainSymbol size={16} />
            <span>Jain Options Available (No Onion, No Garlic)</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
            <span className="text-base">📦</span>
            <span>Order 3–4 Days Ahead</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-amber-200/80 font-medium">
            © {year} Anjali&apos;s Kitchen. All rights reserved. FSSAI Certified Homemade.
          </p>
          <p className="text-xs text-amber-200/80 font-medium flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-rose-400 fill-current" /> in Ahilyanagar
          </p>
        </div>
      </div>
    </footer>
  );
}
