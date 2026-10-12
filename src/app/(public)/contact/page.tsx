/**
 * Contact & About page — Premium Design with Glassmorphism Cards,
 * 3D Card Effects, Animated Gradients, and Professional Layout.
 */
import type { Metadata } from 'next';
import { Phone, MessageCircle, MapPin, AtSign, Clock, ChefHat, Heart, Leaf, Award, Star, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact — Anjali's Kitchen",
  description: 'Get in touch with Anjali\'s Kitchen in Ahilyanagar. Order homemade Maharashtrian sweets and snacks via WhatsApp or phone.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#2B080C] via-[#4A101A] to-[#1A0508] text-white py-14 sm:py-20 overflow-hidden wave-divider">
        <div className="orb orb-gold w-[400px] h-[400px] -top-20 right-0" />
        <div className="orb orb-rose w-[300px] h-[300px] bottom-0 -left-20" />
        
        <div className="absolute top-12 left-[25%] w-2 h-2 rounded-full bg-amber-400/40 animate-twinkle" />
        <div className="absolute bottom-20 right-[20%] w-1.5 h-1.5 rounded-full bg-amber-300/30 animate-twinkle" style={{ animationDelay: '1.5s' }} />

        <div className="relative mx-auto max-w-3xl px-4 text-center space-y-5 reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold text-amber-300 mx-auto">
            <Heart className="h-3.5 w-3.5 text-rose-400 fill-current" />
            About & Contact
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100 tracking-tight">
            Made With <span className="text-shimmer">Love & Tradition</span>
          </h1>

          <p className="text-base sm:text-lg text-amber-100/80 leading-relaxed max-w-2xl mx-auto">
            We bring the taste of home to your celebrations. Every sweet, snack and
            faral item is handmade with love, using pure ghee and refined oil — no
            shortcuts, no compromises.
          </p>

          <p className="text-sm font-semibold text-amber-300/80">
            Made fresh to order · 100% Vegetarian · Jain options available
          </p>
        </div>
      </section>

      {/* Our Promise — 3D Cards */}
      <section className="py-14 reveal-up">
        <div className="mx-auto px-4" style={{ maxWidth: '900px' }}>
          <div className="grid gap-5 sm:grid-cols-3 grid-stagger">
            {[
              { icon: ChefHat, title: 'Homemade Fresh', desc: 'Every item made fresh in our kitchen, never mass-produced or stored.', gradient: 'from-amber-500 to-orange-500' },
              { icon: Heart, title: 'Heritage Recipes', desc: 'Traditional recipes passed down through generations of Maharashtrian cooking.', gradient: 'from-rose-500 to-pink-500' },
              { icon: Leaf, title: 'Pure Ingredients', desc: 'Pure cow ghee, refined oil, premium dry fruits, and the finest organic jaggery.', gradient: 'from-emerald-500 to-teal-500' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center card-3d hover-shine relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
                  <div
                    className={`mx-auto flex items-center justify-center rounded-2xl w-14 h-14 bg-gradient-to-br ${item.gradient} text-white shadow-lg mb-4`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-10 reveal-up delay-200">
        <div className="mx-auto px-4" style={{ maxWidth: '900px' }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 border border-amber-200 px-4 py-1.5 text-xs font-bold text-amber-800 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Reach Out
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              Get in Touch
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Phone */}
            <a
              href="tel:+919970599900"
              className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 card-3d hover-shine group"
            >
              <div className="flex-shrink-0 flex items-center justify-center rounded-2xl w-14 h-14 bg-gradient-to-br from-[#7A1F2B] to-[#5C131D] text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</p>
                <p className="mt-0.5 font-bold text-lg text-slate-900">
                  +91 99705 99900
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen, I'd like to enquire about your products.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 card-3d hover-shine group"
            >
              <div className="flex-shrink-0 flex items-center justify-center rounded-2xl w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">WhatsApp</p>
                <p className="mt-0.5 font-bold text-lg text-slate-900">
                  Message Us
                </p>
                <p className="text-xs text-slate-500">Fastest way to reach us</p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 card-3d">
              <div className="flex-shrink-0 flex items-center justify-center rounded-2xl w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</p>
                <p className="mt-0.5 font-semibold text-sm text-slate-900">
                  Paras Anand Apartment, Savedi
                </p>
                <p className="text-sm text-slate-700">Ahilyanagar, Maharashtra</p>
              </div>
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/anjaliskitchen_0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 card-3d hover-shine group"
            >
              <div className="flex-shrink-0 flex items-center justify-center rounded-2xl w-14 h-14 bg-gradient-to-br from-[#E1306C] to-[#C13584] text-white shadow-lg group-hover:shadow-xl transition-shadow">
                <AtSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Instagram</p>
                <p className="mt-0.5 font-bold text-lg text-slate-900">
                  @anjaliskitchen_0
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Lead time notice */}
      <section className="pb-14">
        <div className="mx-auto px-4" style={{ maxWidth: '600px' }}>
          <div className="flex items-center gap-4 rounded-2xl p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-sm">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">
                Order Lead Time
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Please place orders <strong className="text-slate-800">3–4 days</strong> in advance. For festivals and bulk orders, we recommend ordering even earlier.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
