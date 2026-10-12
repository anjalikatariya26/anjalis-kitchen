/**
 * Luxury Home Page — Anjali's Kitchen Storefront
 * Premium Design with 3D Cards, Floating Orbs, Animated Gradients,
 * Glassmorphism, Gold Shimmer Typography, and Micro-Interactions.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MessageCircle,
  Sparkles,
  Gift,
  ChefHat,
  BookOpen,
  ArrowRight,
  Star,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  Heart,
  Crown,
  Users,
  Truck,
} from 'lucide-react';
import { JainSymbol } from '@/components/ui/JainSymbol';
import { ModakIcon, DiyaIcon, KalashIcon, RakhiIcon, SankrantiIcon } from '@/components/ui/FestivalIcons';

export const metadata: Metadata = {
  title: "Anjali's Kitchen — Ghar Ka Swaad | Homemade Maharashtrian Delicacies",
  description:
    'Homemade Maharashtrian sweets, festive faral and Jain-friendly food. Prepared fresh to order in Ahilyanagar with pure ghee and authentic spices.',
};

const categoryCards = [
  { name: 'Pure Ghee Laddu', slug: 'laddu', img: '/images/ladoo.jpg', count: '5 Varieties', badge: 'Pure Ghee', emoji: '🪔' },
  { name: 'Ukadiche Modak', slug: 'modak', img: '/images/modak.jpg', count: 'Steamed & Fried', badge: 'Festival Special', emoji: '🙏' },
  { name: 'Diwali Faral Boxes', slug: 'diwali-special', img: '/images/hamper.jpg', count: 'Gift Hampers', badge: 'Royal Edition', emoji: '🎁' },
  { name: 'Special Poha Chivda', slug: 'chivda', img: '/images/chivda.jpg', count: 'Crispy Fresh', badge: 'Bestseller', emoji: '✨' },
  { name: 'Namkeen & Chakli', slug: 'namkeen-farsan', img: '/images/namkeen.jpg', count: 'Authentic Spices', badge: '100% Veg', emoji: '🌿' },
  { name: 'Peanut & Til Chikki', slug: 'chikki', img: '/images/chikki.jpg', count: 'Organic Jaggery', badge: 'Crunchy', emoji: '🥜' },
  { name: 'Sweets & Karanji', slug: 'sweets', img: '/images/ladoo.jpg', count: 'Traditional Khoya', badge: 'Homemade', emoji: '🍯' },
  { name: 'Curated Hampers', slug: 'hampers', img: '/images/hamper.jpg', count: 'Custom Packaging', badge: 'Gifting', emoji: '🎀' },
];

const festivals = [
  { name: 'Ganesh Chaturthi', slug: 'ganesh-chaturthi', tag: 'Bappa Prasad Special', icon: ModakIcon, bg: 'from-amber-500/15 to-orange-500/15', border: 'border-amber-300' },
  { name: 'Diwali Faral', slug: 'diwali-special', tag: 'Faral Gift Boxes', icon: DiyaIcon, bg: 'from-orange-500/15 to-red-500/15', border: 'border-orange-300' },
  { name: 'Navratri Special', slug: 'navratri', tag: 'Upvas & Fasting Delights', icon: KalashIcon, bg: 'from-rose-500/15 to-amber-500/15', border: 'border-rose-300' },
  { name: 'Raksha Bandhan', slug: 'raksha-bandhan', tag: 'Artisanal Sweet Packs', icon: RakhiIcon, bg: 'from-pink-500/15 to-rose-500/15', border: 'border-pink-300' },
  { name: 'Makar Sankranti', slug: 'makar-sankranti', tag: 'Tilgul & Crunchy Chikki', icon: SankrantiIcon, bg: 'from-cyan-500/15 to-amber-500/15', border: 'border-cyan-300' },
];

const popularProducts = [
  {
    id: 'p1',
    name: 'Steamed Ukadiche Modak',
    slug: 'ukadiche-modak',
    price: '₹250 / 5 Pcs',
    image: '/images/modak.jpg',
    category: 'Festival Special',
    rating: '5.0',
    reviews: '48',
    isJain: true,
    badge: '🏆 Bestseller',
    desc: 'Soft steamed rice flour modak stuffed with fresh coconut, organic jaggery & nutmeg drizzled with pure cow ghee.',
  },
  {
    id: 'p2',
    name: 'Pure Ghee Besan Ladoo',
    slug: 'besan-ladoo',
    price: '₹420 / 500g',
    image: '/images/ladoo.jpg',
    category: 'Laddu & Sweets',
    rating: '4.9',
    reviews: '62',
    isJain: true,
    badge: '✨ Pure Cow Ghee',
    desc: 'Slow-roasted gram flour in artisanal cow ghee, silver varak leaf, cardamom, and crunchy almond slivers.',
  },
  {
    id: 'p3',
    name: 'Royal Faral Gift Hamper Box',
    slug: 'royal-faral-gift-hamper',
    price: '₹1,850 / Box',
    image: '/images/hamper.jpg',
    category: 'Festive Hampers',
    rating: '5.0',
    reviews: '34',
    isJain: true,
    badge: '🎁 Royal Gift Box',
    desc: 'Curated 4-tier festive box with Chakli, Karanji, Besan Ladoo, Spicy Chivda, and ethnic clay diya lamps.',
  },
];

const testimonials = [
  { name: 'Sunita M.', text: 'The best modaks I have ever tasted! Just like my grandmother used to make. Pure love in every bite.', location: 'Pune' },
  { name: 'Rajesh K.', text: 'Ordered Diwali faral hampers for our entire team. Everyone was amazed by the quality and packaging!', location: 'Mumbai' },
  { name: 'Priya D.', text: 'Besan ladoo with real ghee — you can taste the difference. My family refuses to eat ladoos from anywhere else now!', location: 'Ahilyanagar' },
];

export default function HomePage() {
  const whatsappHeroUrl = `https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen! I would like to place a fresh order.")}`;

  return (
    <div className="bg-[#FFFDF9] text-slate-900 overflow-hidden font-sans">
      {/* ─── HERO SECTION ───────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#2B080C] via-[#4A101A] to-[#1A0508] text-white pt-16 pb-28 lg:pt-24 lg:pb-36 overflow-hidden border-b border-amber-500/20 wave-divider">
        {/* Animated ambient orbs */}
        <div className="orb orb-gold w-[600px] h-[600px] -top-32 -right-32" style={{ animationDelay: '0s' }} />
        <div className="orb orb-rose w-[500px] h-[500px] bottom-0 -left-32" style={{ animationDelay: '5s' }} />
        <div className="orb orb-amber w-[350px] h-[350px] top-1/2 right-1/4" style={{ animationDelay: '10s' }} />
        
        {/* Floating decorative particles */}
        <div className="absolute top-20 left-[15%] w-2 h-2 rounded-full bg-amber-400/50 animate-twinkle" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-[25%] w-1.5 h-1.5 rounded-full bg-amber-300/40 animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-[40%] w-2.5 h-2.5 rounded-full bg-rose-400/30 animate-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] left-[10%] w-1 h-1 rounded-full bg-amber-200/60 animate-twinkle" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[30%] right-[10%] w-1.5 h-1.5 rounded-full bg-amber-400/30 animate-twinkle" style={{ animationDelay: '1.5s' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-7 text-center lg:text-left reveal-up">
              <div className="inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-xs sm:text-sm font-semibold text-amber-300">
                <ChefHat className="h-4 w-4 text-amber-400 animate-float-fast" />
                <span>Homemade in Ahilyanagar • Made Fresh To Order</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold font-serif tracking-tight leading-[1.1]">
                <span className="text-[#FFD700]">Ghar Ka Swaad,</span> <br />
                <span className="text-amber-50">
                  Made Fresh With Love.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-amber-100/85 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Authentic Maharashtrian sweets, festive faral, and crispy snacks prepared strictly to order using pure ghee and traditional heritage recipes.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 reveal-up delay-200">
                <Link
                  href="/products"
                  className="btn btn-gold btn-lg text-slate-950 font-bold px-8 py-3.5 shadow-2xl flex items-center gap-2 hover-shine"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Browse Full Menu</span>
                </Link>

                <a
                  href={whatsappHeroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg px-8 py-3.5 shadow-2xl flex items-center gap-2 hover-shine"
                >
                  <MessageCircle className="h-5 w-5 fill-current" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Key Trust Signals Bar */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left reveal-up delay-400">
                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-300 font-bold text-base sm:text-lg">
                    <Award className="h-4 w-4" />
                    <span>100% Pure</span>
                  </div>
                  <p className="text-xs text-amber-100/60">Cow Ghee & Premium Nuts</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-300 font-bold text-base sm:text-lg">
                    <Clock className="h-4 w-4" />
                    <span>Fresh Prep</span>
                  </div>
                  <p className="text-xs text-amber-100/60">Zero Stale Inventory</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-300 font-bold text-base sm:text-lg">
                    <JainSymbol size={18} />
                    <span>Jain Line</span>
                  </div>
                  <p className="text-xs text-amber-100/75">No Onion & No Garlic</p>
                </div>
              </div>
            </div>

            {/* Right Column — Premium Food Showcase */}
            <div className="lg:col-span-6 space-y-4 reveal-right delay-300">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/30 shadow-2xl shadow-black/60 group bg-slate-900 animate-border-glow card-3d">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/images/modak.jpg"
                    alt="Authentic Ukadiche Modak — signature festival dish"
                    className="h-full w-full object-cover img-parallax"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-dark text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-400">Signature Festival Dish</span>
                    <h3 className="font-serif font-bold text-lg text-white">Steamed Ukadiche Modak</h3>
                  </div>
                  <span className="text-sm font-bold text-amber-300 bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-400/30 animate-pulse-glow">
                    ₹250 / 5 Pcs
                  </span>
                </div>
              </div>

              {/* Highlights sub-strip with glass effect */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl glass p-3.5 flex items-center gap-3 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 flex-shrink-0 animate-float-fast">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-200 block">Made Fresh to Order</span>
                    <span className="text-[11px] text-amber-100/60">3-4 Days Lead Time</span>
                  </div>
                </div>

                <div className="rounded-2xl glass p-3.5 flex items-center gap-3 hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 animate-float-fast" style={{ animationDelay: '1s' }}>
                    <JainSymbol size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-200 block">Jain Options Available</span>
                    <span className="text-[11px] text-amber-100/60">Dedicated Kitchen Line</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FESTIVAL STRIP ───────────────────────────────────── */}
      <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 py-7 border-b border-amber-200/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(199,154,59,0.08)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600 animate-twinkle" />
              <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900">
                Upcoming Festival Collections
              </h2>
            </div>
            <Link href="/festivals" className="text-xs font-bold text-[#7A1F2B] hover:text-[#5C131D] flex items-center gap-1 group">
              View All Festivals <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide pt-1">
            {festivals.map((fest) => {
              const IconComponent = fest.icon;
              return (
                <Link
                  key={fest.slug}
                  href={`/festivals/${fest.slug}`}
                  className="flex-shrink-0 flex items-center gap-3.5 rounded-2xl border border-amber-200/90 bg-white/95 backdrop-blur-md px-4 py-3 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${fest.bg} ${fest.border} border flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <IconComponent size={26} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#7A1F2B] transition-colors">
                      {fest.name}
                    </h3>
                    <span className="text-[11px] text-amber-700 font-semibold block">
                      {fest.tag}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#7A1F2B] group-hover:translate-x-1 transition-all ml-1" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CATEGORY GRID WITH 3D CARD EFFECTS ──────────────── */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(199,154,59,0.04)_0%,_transparent_50%)]" />

        <div className="relative text-center max-w-2xl mx-auto space-y-3 mb-14 reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 border border-amber-200 px-4 py-1.5 text-xs font-bold text-amber-800">
            <Crown className="h-3.5 w-3.5" />
            Menu Categories
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Handcrafted Traditional Delicacies
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Explore our curated menu of pure cow ghee laddus, festive faral, and crispy authentic snacks.
          </p>
        </div>

        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 grid-stagger">
          {categoryCards.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm card-3d flex flex-col hover-shine"
            >
              {/* Image thumbnail */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-full w-full object-cover img-parallax"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 px-2.5 py-0.5 rounded-full shadow-lg">
                  {cat.badge}
                </span>
                <span className="absolute bottom-2.5 right-2.5 text-xl">{cat.emoji}</span>
              </div>

              {/* Text footer */}
              <div className="p-4 text-center space-y-0.5 bg-white group-hover:bg-amber-50/50 transition-colors duration-300">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#7A1F2B] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-500 block font-medium">
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── POPULAR PRODUCTS SECTION ─────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#1A0508] via-[#2B080C] to-[#1A0508] text-white relative overflow-hidden">
        {/* Ambient orbs */}
        <div className="orb orb-gold w-[400px] h-[400px] -top-20 right-0" style={{ animationDelay: '3s' }} />
        <div className="orb orb-rose w-[300px] h-[300px] bottom-0 left-[20%]" style={{ animationDelay: '8s' }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 reveal-up">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold text-amber-300">
                <Flame className="h-3.5 w-3.5 text-orange-400" />
                Festive Highlights
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-100">
                Popular This Season
              </h2>
              <p className="text-sm text-amber-200/60 max-w-xl">
                Our most requested sweets and faral gift boxes, handcrafted fresh upon order.
              </p>
            </div>
            <Link
              href="/products"
              className="btn btn-gold btn-md font-bold flex items-center gap-2 self-start md:self-auto hover-shine"
            >
              <span>Explore Menu</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 grid-stagger">
            {popularProducts.map((prod) => (
              <div key={prod.id} className="rounded-3xl overflow-hidden border border-amber-400/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90 text-white shadow-2xl card-3d group flex flex-col justify-between hover-shine glass">
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="h-full w-full object-cover img-parallax"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 px-3 py-1 rounded-full shadow-lg">
                        {prod.badge}
                      </span>
                    </div>
                    {prod.isJain && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold text-emerald-900 bg-emerald-300 px-2 py-0.5 rounded-full">
                          🌿 Jain
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-amber-300/70">
                      <span>{prod.category}</span>
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{prod.rating} ({prod.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-200 transition-colors duration-300">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-slate-300/80 line-clamp-2 leading-relaxed">
                      {prod.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/10 mt-2 pt-4">
                  <span className="text-lg font-bold text-amber-300">{prod.price}</span>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-400 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS SECTION ────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-amber-50/50 to-[#FFFDF9] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(199,154,59,0.06)_0%,_transparent_50%)]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 reveal-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200 px-4 py-1.5 text-xs font-bold text-rose-700">
              <Heart className="h-3.5 w-3.5 fill-current" />
              Customer Love
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-stagger">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm card-3d relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GIFT HAMPERS SHOWCASE ────────────────────────────── */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 reveal-up">
        <div className="rounded-[2rem] bg-gradient-to-br from-amber-50 via-orange-50/50 to-rose-50 border border-amber-200/80 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Decorative dots */}
          <div className="absolute top-6 right-6 w-24 h-24 opacity-20">
            <div className="grid grid-cols-4 gap-1.5">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              ))}
            </div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-amber-200 px-4 py-1.5 text-xs font-bold text-amber-800">
                <Gift className="h-3.5 w-3.5" />
                Festive Gifting
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
                Royal Faral & Sweet Gift Boxes
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Surprise your family, guests, and corporate clients with curated festival hampers. Each box is packed with fresh laddus, crunchy faral savories, and ethnic brass diyas.
              </p>

              <div className="space-y-2.5 text-sm text-slate-700 pt-2">
                {[
                  'Customizable pack quantities & box designs',
                  'Ideal for corporate gifting & wedding hampers',
                  'Eco-friendly ethnic gift packaging',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/hampers" className="btn btn-gold btn-md font-bold inline-flex items-center gap-2 hover-shine">
                  <Gift className="h-4 w-4" />
                  <span>Explore Gift Hampers</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/60 relative group bg-slate-900 card-3d">
                <img
                  src="/images/hamper.jpg"
                  alt="Diwali Faral Gift Box"
                  className="h-full w-full object-cover img-parallax"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-dark rounded-xl p-3 text-white">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Royal Faral Gift Box</span>
                  <p className="text-lg font-bold font-serif">₹1,850 per Box</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US — STATS BAR ───────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-[#2B080C] via-[#3D0C11] to-[#2B080C] text-white relative overflow-hidden">
        <div className="orb orb-gold w-[300px] h-[300px] -top-20 left-[10%]" style={{ animationDelay: '5s' }} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: '500+', label: 'Happy Customers', color: 'text-amber-400' },
              { icon: ChefHat, value: '25+', label: 'Traditional Recipes', color: 'text-rose-400' },
              { icon: Award, value: '100%', label: 'Pure Cow Ghee', color: 'text-emerald-400' },
              { icon: Truck, value: '3-4', label: 'Days Fresh Prep', color: 'text-sky-400' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="space-y-3 reveal-up" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className={`mx-auto w-14 h-14 rounded-2xl glass flex items-center justify-center ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-bold font-serif text-amber-100 animate-count" style={{ animationDelay: `${i * 200 + 300}ms` }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-amber-200/60 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ──────────────────────────────────────── */}
      <section className="py-20 mx-auto max-w-4xl px-4 text-center space-y-7 reveal-up">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-bold text-emerald-700">
          <MessageCircle className="h-3.5 w-3.5 fill-current" />
          Get In Touch
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
          Ready to Order Your Festive Favorites?
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Please place orders 3–4 days in advance so we can prepare your items fresh. We also cater for corporate gifting, family poojas, and weddings!
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappHeroUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg px-8 py-3.5 shadow-lg flex items-center gap-2 hover-shine"
          >
            <MessageCircle className="h-5 w-5 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="tel:9970599900"
            className="btn btn-outline btn-lg px-8 py-3.5 border-slate-300 text-slate-800 hover:bg-slate-100 flex items-center gap-2"
          >
            <span>Call 9970599900</span>
          </a>
        </div>
      </section>
    </div>
  );
}
