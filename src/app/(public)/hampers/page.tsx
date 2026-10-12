/**
 * Public Hampers Page — Luxury Festival Gift Hampers with Spatial UI.
 * Features: 3D depth layers, floating gift elements, premium glass cards,
 * parallax images, and theme-specific decorative elements.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Gift, MessageCircle, Sparkles, Check, ArrowRight, ShieldCheck, Crown, Star, Heart } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: "Gift Hampers — Anjali's Kitchen",
  description: 'Curated festival gift hamper boxes with handpicked homemade sweets and snacks. Perfect for family, friends, and corporate gifting.',
};

const hampersList = [
  {
    id: 'h1',
    name: 'Royal Faral Gift Hamper Box',
    slug: 'royal-faral-gift-hamper',
    price: '₹1,850',
    festival: 'Diwali Special',
    image: '/images/hamper.jpg',
    description: 'The ultimate 4-tier festive box packed with authentic Maharashtrian sweet and savory delights.',
    items: [
      'Pure Ghee Besan Ladoo (500g)',
      'Butter Chakli (500g)',
      'Sweet Coconut Karanji (500g)',
      'Spicy Poha Chivda (500g)',
      'Handcrafted Ethnic Clay Diya (2 Pcs)',
    ],
    emoji: '🪔',
    gradient: 'from-amber-500 to-orange-600',
    popular: true,
  },
  {
    id: 'h2',
    name: 'Bappa Prasad Modak Box',
    slug: 'bappa-prasad-hamper',
    price: '₹1,200',
    festival: 'Ganesh Chaturthi',
    image: '/images/modak.jpg',
    description: 'A holy offering box designed for Ganeshotsav poojas and family prasad distribution.',
    items: [
      'Steamed Ukadiche Modak (11 Pcs)',
      'Pure Cow Ghee Besan Ladoo (500g)',
      'Fresh Panchamrut Box (1 Pc)',
      'Brass Puja Diya (1 Pc)',
    ],
    emoji: '🪷',
    gradient: 'from-orange-500 to-red-600',
    popular: false,
  },
  {
    id: 'h3',
    name: 'Shubh Festive Sweet Bundle',
    slug: 'shubh-festive-sweet-bundle',
    price: '₹1,450',
    festival: 'Raksha Bandhan / General',
    image: '/images/ladoo.jpg',
    description: 'Assorted pure cow ghee sweets crafted for brother-sister celebrations and family gifting.',
    items: [
      'Pure Ghee Besan Ladoo (500g)',
      'Shengdana & Til Chikki (500g)',
      'Sweet Diamond Shankarpale (500g)',
    ],
    emoji: '🎀',
    gradient: 'from-rose-500 to-pink-600',
    popular: false,
  },
];

export default function HampersPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen text-slate-900">
      {/* Hero Header with Spatial Depth Layers */}
      <section className="relative bg-gradient-to-br from-[#2B080C] via-[#4A101A] to-[#1A0508] text-white py-16 sm:py-24 overflow-hidden wave-divider">
        {/* Deep layer — ambient orbs */}
        <div className="orb orb-gold w-[500px] h-[500px] -top-32 right-0" style={{ animationDelay: '0s' }} />
        <div className="orb orb-rose w-[400px] h-[400px] bottom-0 -left-20" style={{ animationDelay: '5s' }} />
        
        {/* Mid layer — floating gift theme elements */}
        <div className="absolute top-[15%] left-[10%] text-4xl opacity-20 animate-float-slow">🎁</div>
        <div className="absolute top-[30%] right-[8%] text-3xl opacity-15 animate-float-medium" style={{ animationDelay: '2s' }}>🪔</div>
        <div className="absolute bottom-[25%] left-[25%] text-5xl opacity-10 animate-float-slow" style={{ animationDelay: '4s' }}>🎀</div>
        <div className="absolute top-[55%] right-[20%] text-2xl opacity-15 animate-float-fast" style={{ animationDelay: '1s' }}>✨</div>
        
        {/* Near layer — sparkle particles */}
        <div className="absolute top-12 left-[20%] w-2 h-2 rounded-full bg-amber-400/50 animate-twinkle" />
        <div className="absolute top-28 right-[25%] w-1.5 h-1.5 rounded-full bg-amber-300/40 animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-[40%] w-2 h-2 rounded-full bg-rose-400/30 animate-twinkle" style={{ animationDelay: '2s' }} />

        {/* Foreground content */}
        <div className="relative mx-auto max-w-7xl px-4 text-center space-y-5 reveal-up" style={{ zIndex: 10 }}>
          <div className="inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-xs sm:text-sm font-bold text-amber-300 mx-auto">
            <Gift className="h-4 w-4 text-amber-400 animate-float-fast" />
            Curated Gifting
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-amber-100 tracking-tight leading-[1.1]">
            Royal Festival <span className="text-shimmer">Gift Hampers</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-50/75 leading-relaxed">
            Beautifully packaged in eco-friendly ethnic gift boxes. Perfect for family celebrations, corporate gifting, and festive greetings.
          </p>
        </div>
      </section>

      {/* Hampers Showcase Grid — 3D Cards */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 relative">
        {/* Spatial background textures */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(199,154,59,0.04)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(122,31,43,0.03)_0%,_transparent_50%)]" />

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 grid-stagger">
          {hampersList.map((hamper) => {
            const whatsappUrl = generateWhatsAppLink({
              text: `Hello Anjali's Kitchen! I would like to order the "${hamper.name}" (${hamper.price}).`,
            });

            return (
              <div
                key={hamper.id}
                className="rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-sm card-3d flex flex-col justify-between group hover-shine relative"
              >
                {/* Popular badge — spatial floating element */}
                {hamper.popular && (
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg animate-pulse-glow">
                    <Crown className="h-3 w-3" />
                    Most Popular
                  </div>
                )}
                
                <div>
                  {/* Image with parallax */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={hamper.image}
                      alt={hamper.name}
                      className="h-full w-full object-cover img-parallax"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Floating emoji — spatial depth */}
                    <span className="absolute bottom-4 right-4 text-4xl opacity-80 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl">
                      {hamper.emoji}
                    </span>
                    
                    {/* Festival tag */}
                    <span className={`absolute top-3 left-3 text-[11px] font-bold text-white bg-gradient-to-r ${hamper.gradient} px-3 py-1 rounded-full shadow-lg`}>
                      {hamper.festival}
                    </span>
                    
                    {/* Price overlay — glass effect */}
                    <div className="absolute bottom-3 left-3 glass-dark rounded-xl px-3 py-1.5">
                      <span className="text-lg font-bold text-amber-300">{hamper.price}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold font-serif text-xl text-slate-900 group-hover:text-[#7A1F2B] transition-colors">
                        {hamper.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {hamper.description}
                      </p>
                    </div>

                    {/* Box Items with depth indicators */}
                    <div className="space-y-2.5 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 block">
                        What&apos;s Inside
                      </span>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {hamper.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2.5">
                            <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${hamper.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>
                              <Check className="h-3 w-3" />
                            </div>
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Price</span>
                    <span className="text-xl font-bold text-[#7A1F2B]">{hamper.price}</span>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm font-bold px-4 py-2 flex items-center gap-1.5 hover-shine"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>Book Box</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3-Step Process — Spatial Cards */}
        <div className="relative rounded-[2rem] bg-gradient-to-br from-amber-50 via-orange-50/50 to-rose-50 border border-amber-200/80 p-8 sm:p-12 space-y-8 text-center overflow-hidden reveal-up">
          {/* Decorative depth dots */}
          <div className="absolute top-6 right-8 opacity-15">
            <div className="grid grid-cols-5 gap-1.5">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              ))}
            </div>
          </div>
          <div className="absolute bottom-6 left-8 opacity-15">
            <div className="grid grid-cols-4 gap-1.5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-amber-200 px-4 py-1.5 text-xs font-bold text-amber-800 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Simple Process
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              How Hampers Work
            </h2>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Choose a Festive Theme', desc: 'Select from Diwali, Ganesh Chaturthi, Raksha Bandhan or custom options.', gradient: 'from-amber-500 to-orange-500' },
              { step: '2', title: 'Customise Your Items', desc: 'Select your preferred pack sizes, sweet/savory mix, and Jain items.', gradient: 'from-rose-500 to-pink-500' },
              { step: '3', title: 'Order & Gift', desc: 'Place orders 3-4 days ahead. We package with ethnic box decorations.', gradient: 'from-emerald-500 to-teal-500' },
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-amber-200/50 shadow-sm space-y-3 card-3d relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient}`} />
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center font-bold text-base mx-auto shadow-lg`}>
                  {s.step}
                </div>
                <h3 className="font-bold text-sm text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
