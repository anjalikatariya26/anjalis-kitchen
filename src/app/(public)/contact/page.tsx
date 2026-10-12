/**
 * Contact page (merged with About per spec Part H1).
 * Premium design with icons, gradient accents, and structured info cards.
 */
import type { Metadata } from 'next';
import { Phone, MessageCircle, MapPin, AtSign, Clock, ChefHat, Heart, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact — Anjali's Kitchen",
  description: 'Get in touch with Anjali\'s Kitchen in Ahilyanagar. Order homemade Maharashtrian sweets and snacks via WhatsApp or phone.',
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Hero */}
      <section
        className="py-12"
        style={{
          background: 'linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-bg) 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="mx-auto px-4 text-center max-w-2xl">
          <h1
            className="font-bold"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--color-primary)',
            }}
          >
            About &amp; Contact
          </h1>
          <p
            className="mt-4"
            style={{
              color: 'var(--color-text)',
              fontSize: 'var(--text-lg)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            We bring the taste of home to your celebrations. Every sweet, snack and
            faral item is handmade with love, using pure ghee and refined oil — no
            shortcuts, no compromises.
          </p>
          <p className="mt-3 text-sm font-medium" style={{ color: 'var(--color-muted)' }}>
            Made fresh to order · 100% Vegetarian · Jain options available
          </p>
        </div>
      </section>

      {/* Our promise */}
      <section className="py-10">
        <div className="mx-auto px-4" style={{ maxWidth: '800px' }}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: ChefHat, title: 'Homemade', desc: 'Every item made fresh in our kitchen, never mass-produced.' },
              { icon: Heart, title: 'Made with Love', desc: 'Traditional recipes passed down through generations.' },
              { icon: Leaf, title: 'Pure Ingredients', desc: 'Pure ghee, refined oil, and the finest dry fruits.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border p-5 text-center"
                  style={{
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <div
                    className="mx-auto flex items-center justify-center rounded-full"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-3 font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs" style={{ color: 'var(--color-muted)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-10">
        <div className="mx-auto px-4" style={{ maxWidth: '800px' }}>
          <h2
            className="text-center font-semibold mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              color: 'var(--color-text)',
            }}
          >
            Get in Touch
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Phone */}
            <a
              href="tel:+919970599900"
              className="flex items-center gap-4 rounded-xl border p-5 transition-all hover:shadow-md"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: '48px', height: '48px', background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
              >
                <Phone size={22} />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Phone</p>
                <p className="mt-0.5 font-semibold" style={{ color: 'var(--color-text)', fontSize: 'var(--text-lg)' }}>
                  +91 99705 99900
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen, I'd like to enquire about your products.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border p-5 transition-all hover:shadow-md"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: '48px', height: '48px', background: '#E8F5EC', color: '#25D366' }}
              >
                <MessageCircle size={22} />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>WhatsApp</p>
                <p className="mt-0.5 font-semibold" style={{ color: 'var(--color-text)', fontSize: 'var(--text-lg)' }}>
                  Message Us
                </p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Fastest way to reach us</p>
              </div>
            </a>

            {/* Address */}
            <div
              className="flex items-center gap-4 rounded-xl border p-5"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: '48px', height: '48px', background: 'var(--color-surface-2)', color: 'var(--color-muted)' }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Address</p>
                <p className="mt-0.5 font-medium text-sm" style={{ color: 'var(--color-text)' }}>
                  Paras Anand Apartment, Savedi
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>Ahilyanagar</p>
              </div>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/anjaliskitchen_0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border p-5 transition-all hover:shadow-md"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: '48px', height: '48px', background: '#FDE9ED', color: '#E1306C' }}
              >
                <AtSign size={22} />
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Instagram</p>
                <p className="mt-0.5 font-semibold" style={{ color: 'var(--color-text)' }}>
                  @anjaliskitchen_0
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Lead time notice */}
      <section className="pb-12">
        <div className="mx-auto px-4" style={{ maxWidth: '600px' }}>
          <div
            className="flex items-center gap-4 rounded-xl p-5"
            style={{
              background: 'var(--color-warning-light)',
              border: '1px solid var(--color-warning)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <Clock size={24} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                Order Lead Time
              </p>
              <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
                Please place orders <strong>3–4 days</strong> in advance. For festivals and bulk orders, we recommend ordering even earlier.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
