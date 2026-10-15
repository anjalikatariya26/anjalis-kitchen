/**
 * Public Festivals Page — Premium Festival Collections with Spatial UI.
 * Features: 3D perspective cards, floating festival icons, parallax layers,
 * depth-based stacking, and theme-aware decorative elements.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, Gift, MessageCircle } from 'lucide-react';
import { ModakIcon, DiyaIcon, KalashIcon, RakhiIcon, SankrantiIcon } from '@/components/ui/FestivalIcons';

export const metadata: Metadata = {
  title: "Festivals — Anjali's Kitchen",
  description: 'Browse seasonal festival specials — Diwali faral, Ganesh Chaturthi modak, Navratri farali snacks, and more.',
};

const festivals = [
  {
    name: 'Ganesh Chaturthi',
    slug: 'ganesh-chaturthi',
    description: 'Traditional Ukadiche Modak, pure cow ghee laddus, and fresh prasad boxes for Bappa.',
    img: '/images/modak.jpg',
    tag: 'Bappa Prasad Special',
    icon: ModakIcon,
    items: ['Ukadiche Modak', 'Besan Ladoo', 'Coconut Barfi'],
    gradient: 'from-orange-600 to-red-700',
  },
  {
    name: 'Diwali Faral Collection',
    slug: 'diwali-special',
    description: 'Royal festive boxes with Chakli, Karanji, Besan Ladoo, Chivda, and ethnic clay diyas.',
    img: '/images/hamper.jpg',
    tag: 'Diwali Gift Hampers',
    icon: DiyaIcon,
    items: ['Chakli', 'Karanji', 'Chivda', 'Besan Ladoo'],
    gradient: 'from-amber-600 to-orange-700',
  },
  {
    name: 'Raksha Bandhan Sweets',
    slug: 'raksha-bandhan',
    description: 'Fresh homemade sweet boxes and dry fruit laddus for sibling celebrations.',
    img: '/images/ladoo.jpg',
    tag: 'Festive Sweet Boxes',
    icon: RakhiIcon,
    items: ['Besan Ladoo', 'Dry Fruit Roll', 'Shankarpale'],
    gradient: 'from-rose-600 to-pink-700',
  },
  {
    name: 'Navratri Upvas Specials',
    slug: 'navratri',
    description: 'Farali mathri, sabudana delights, and Jain-friendly fasting snacks.',
    img: '/images/namkeen.jpg',
    tag: 'Farali & Fasting Snacks',
    icon: KalashIcon,
    items: ['Sabudana Vada', 'Farali Chivda', 'Rajgira Ladoo'],
    gradient: 'from-purple-600 to-indigo-700',
  },
  {
    name: 'Makar Sankranti',
    slug: 'makar-sankranti',
    description: 'Tilgul laddus, peanut chikki, and crispy sesame jaggery brittles.',
    img: '/images/chikki.jpg',
    tag: 'Tilgul & Chikki Specials',
    icon: SankrantiIcon,
    items: ['Tilgul Laddu', 'Peanut Chikki', 'Sesame Brittle'],
    gradient: 'from-emerald-600 to-teal-700',
  },
];

export default function FestivalsPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen text-slate-900">
      {/* Hero Banner with Spatial Depth */}
      <section className="relative bg-gradient-to-br from-[#2B080C] via-[#4A101A] to-[#1A0508] text-white py-16 sm:py-24 overflow-hidden wave-divider">
        {/* Deep background layer — large blurred orbs */}
        <div className="orb orb-gold w-[600px] h-[600px] -top-40 -right-20" style={{ animationDelay: '0s' }} />
        <div className="orb orb-rose w-[500px] h-[500px] bottom-0 -left-32" style={{ animationDelay: '6s' }} />
        
        {/* Mid layer — floating festival emojis with depth */}
        <div className="absolute top-[15%] left-[8%] text-4xl opacity-20 animate-float-slow" style={{ animationDelay: '0s' }}>🪔</div>
        <div className="absolute top-[25%] right-[12%] text-3xl opacity-15 animate-float-medium" style={{ animationDelay: '1s' }}>🪷</div>
        <div className="absolute bottom-[20%] left-[20%] text-5xl opacity-10 animate-float-slow" style={{ animationDelay: '2s' }}>🎁</div>
        <div className="absolute top-[60%] right-[25%] text-2xl opacity-15 animate-float-fast" style={{ animationDelay: '0.5s' }}>🪁</div>
        <div className="absolute top-[40%] left-[45%] text-3xl opacity-10 animate-float-medium" style={{ animationDelay: '3s' }}>🔱</div>
        
        {/* Near layer — sparkle particles */}
        <div className="absolute top-16 left-[18%] w-2 h-2 rounded-full bg-amber-400/50 animate-twinkle" />
        <div className="absolute top-32 right-[22%] w-1.5 h-1.5 rounded-full bg-amber-300/40 animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-24 left-[35%] w-2.5 h-2.5 rounded-full bg-rose-400/30 animate-twinkle" style={{ animationDelay: '2s' }} />

        {/* Content — foreground layer */}
        <div className="relative mx-auto max-w-7xl px-4 text-center space-y-5 reveal-up" style={{ zIndex: 10 }}>
          <div className="inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-xs sm:text-sm font-bold text-amber-300 mx-auto">
            <Sparkles className="h-4 w-4 text-amber-400 animate-twinkle" />
            Festive Celebrations
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-amber-100 tracking-tight leading-[1.1]">
            Traditional <span className="text-shimmer">Festival Specials</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-50/75 leading-relaxed">
            Every Indian festival is incomplete without traditional homemade sweets and faral. Prepared fresh to order with pure cow ghee and authentic recipes.
          </p>
          
          {/* Spatial floating badge row — creates depth illusion */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 reveal-up delay-300">
            {['Ganesh Chaturthi', 'Diwali Faral', 'Raksha Bandhan', 'Navratri Upvas', 'Makar Sankranti'].map((tag, i) => (
              <span key={i} className="glass rounded-full px-4 py-1.5 text-xs font-bold text-amber-200 border border-amber-400/30 shadow-xs" style={{ animationDelay: `${i * 100}ms` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Cards Grid — Spatial 3D Cards */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle depth background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(199,154,59,0.04)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(122,31,43,0.03)_0%,_transparent_50%)]" />

        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3 grid-stagger">
          {festivals.map((f) => (
            <Link
              key={f.slug}
              href={`/festivals/${f.slug}`}
              className="group rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-sm card-3d flex flex-col justify-between hover-shine relative"
            >
              {/* Image with parallax */}
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={f.img}
                    alt={f.name}
                    className="h-full w-full object-cover img-parallax"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Floating festival emoji — spatial foreground element */}
                  {/* Festive Emblem Badge */}
                  <div className="absolute top-3.5 right-3.5 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-300 shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <f.icon size={26} />
                  </div>
                  
                  {/* Tag badge with gradient */}
                  <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full shadow-lg">
                    {f.tag}
                  </span>
                  
                  {/* Bottom gradient info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold font-serif text-xl drop-shadow-md">
                      {f.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {f.description}
                  </p>
                  
                  {/* Items preview — spatial depth with layered chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {f.items.map((item, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-slate-600 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer with gradient indicator */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2 pt-4">
                <span className="text-xs font-bold text-[#7A1F2B] group-hover:text-[#5C131D] transition-colors">View Festive Menu</span>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md`}>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA — Order for Festival */}
      <section className="py-16 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#2B080C] via-[#4A101A] to-[#2B080C] text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
            {/* Spatial background layers */}
            <div className="orb orb-gold w-[300px] h-[300px] -top-20 -right-20" />
            <div className="absolute top-6 left-[10%] text-3xl opacity-15 animate-float-slow">🪔</div>
            <div className="absolute bottom-6 right-[15%] text-2xl opacity-15 animate-float-medium">🪷</div>
            
            <div className="relative space-y-5" style={{ zIndex: 10 }}>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
                Planning a Festival Celebration?
              </h2>
              <p className="text-sm text-amber-200/70 max-w-xl mx-auto">
                Order your festival specials 3-4 days in advance. We prepare everything fresh for your celebrations. Bulk orders and corporate gifting available.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href={`https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen! I'd like to order festival specials.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-md font-bold px-6 flex items-center gap-2 hover-shine"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  Order on WhatsApp
                </a>
                <Link
                  href="/hampers"
                  className="btn btn-gold btn-md font-bold px-6 flex items-center gap-2 hover-shine"
                >
                  <Gift className="h-4 w-4" />
                  View Gift Hampers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
