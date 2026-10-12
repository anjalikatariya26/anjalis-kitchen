/**
 * Luxury Home Page — Anjali's Kitchen Storefront
 * Designed by Expert UI/UX Engineering Standard.
 * Featuring Studio Food Photography, Dark Maroon Luxury Palette, Gold Typography,
 * Glassmorphism Accents, and Direct WhatsApp Ordering.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MessageCircle,
  Sparkles,
  Gift,
  ChefHat,
  Utensils,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Flame,
  Award,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: "Anjali's Kitchen — Ghar Ka Swaad | Homemade Maharashtrian Delicacies",
  description:
    'Homemade Maharashtrian sweets, festive faral and Jain-friendly food. Prepared fresh to order in Ahilyanagar with pure ghee and authentic spices.',
};

const categoryCards = [
  { name: 'Pure Ghee Laddu', slug: 'laddu', img: '/images/ladoo.jpg', count: '5 Varieties', badge: 'Pure Ghee' },
  { name: 'Ukadiche Modak', slug: 'modak', img: '/images/modak.jpg', count: 'Steamed & Fried', badge: 'Festival Special' },
  { name: 'Diwali Faral Boxes', slug: 'diwali-special', img: '/images/hamper.jpg', count: 'Gift Hampers', badge: 'Royal Edition' },
  { name: 'Special Poha Chivda', slug: 'chivda', img: '/images/chivda.jpg', count: 'Crispy Fresh', badge: 'Bestseller' },
  { name: 'Namkeen & Chakli', slug: 'namkeen-farsan', img: '/images/namkeen.jpg', count: 'Authentic Spices', badge: '100% Veg' },
  { name: 'Peanut & Til Chikki', slug: 'chikki', img: '/images/chikki.jpg', count: 'Organic Jaggery', badge: 'Crunchy' },
  { name: 'Sweets & Karanji', slug: 'sweets', img: '/images/ladoo.jpg', count: 'Traditional Khoya', badge: 'Homemade' },
  { name: 'Curated Hampers', slug: 'hampers', img: '/images/hamper.jpg', count: 'Custom Packaging', badge: 'Gifting' },
];

const festivals = [
  { name: 'Ganesh Chaturthi', slug: 'ganesh-chaturthi', tag: 'Bappa Prasad Special', active: true },
  { name: 'Diwali Faral', slug: 'diwali-special', tag: 'Faral Gift Boxes', active: true },
  { name: 'Navratri Special', slug: 'navratri', tag: 'Upvas Snacks', active: false },
  { name: 'Raksha Bandhan', slug: 'raksha-bandhan', tag: 'Sweet Packs', active: false },
  { name: 'Makar Sankranti', slug: 'makar-sankranti', tag: 'Tilgul Laddu', active: false },
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

export default function HomePage() {
  const whatsappHeroUrl = `https://wa.me/919970599900?text=${encodeURIComponent("Hello Anjali's Kitchen! I would like to place a fresh order.")}`;

  return (
    <div className="bg-[#FFFDF9] text-slate-900 overflow-hidden font-sans">
      {/* ─── HERO SECTION ───────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#3D0C11] via-[#5C131D] to-[#2B080C] text-white pt-16 pb-24 lg:pt-20 lg:pb-32 overflow-hidden border-b border-amber-500/20">
        {/* Background ambient lighting */}
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-300 backdrop-blur-md">
                <ChefHat className="h-4 w-4 text-amber-400" />
                <span>Homemade in Ahilyanagar • Made Fresh To Order</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight leading-[1.15] text-amber-50">
                Ghar Ka Swaad, <br />
                <span className="bg-gradient-to-r from-amber-200 via-saffron-300 to-amber-400 bg-clip-text text-transparent">
                  Made Fresh With Love.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-amber-100/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Authentic Maharashtrian sweets, festive faral, and crispy snacks prepared strictly to order using pure ghee and traditional heritage recipes.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/products"
                  className="btn btn-gold btn-lg text-slate-950 font-bold px-8 py-3.5 shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Utensils className="h-5 w-5" />
                  <span>Browse Full Menu</span>
                </Link>

                <a
                  href={whatsappHeroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg px-8 py-3.5 shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5 fill-current" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Key Trust Signals Bar */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-300 font-bold text-base sm:text-lg">
                    <Award className="h-4 w-4" />
                    <span>100% Pure</span>
                  </div>
                  <p className="text-xs text-amber-100/70">Cow Ghee & Premium Nuts</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-300 font-bold text-base sm:text-lg">
                    <Clock className="h-4 w-4" />
                    <span>Fresh Prep</span>
                  </div>
                  <p className="text-xs text-amber-100/70">Zero Stale Inventory</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-300 font-bold text-base sm:text-lg">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Jain Line</span>
                  </div>
                  <p className="text-xs text-amber-100/70">No Onion & No Garlic</p>
                </div>
              </div>
            </div>

            {/* Right Column — Studio Photography Showcase */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-black/60 group bg-slate-900">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="/images/modak.jpg"
                    alt="Authentic Ukadiche Modak 3D Render"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Signature Festival Dish</span>
                    <h3 className="font-serif font-bold text-lg text-white">Steamed Ukadiche Modak</h3>
                  </div>
                  <span className="text-sm font-bold text-amber-300 bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-400/40">
                    ₹250 / 5 Pcs
                  </span>
                </div>
              </div>

              {/* Highlights sub-strip */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 flex-shrink-0">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-200 block">Made Fresh to Order</span>
                    <span className="text-[11px] text-amber-100/70">3-4 Days Lead Time</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-200 block">Jain Options Available</span>
                    <span className="text-[11px] text-amber-100/70">Dedicated Kitchen Line</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FESTIVAL STRIP ───────────────────────────────────── */}
      <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 py-6 border-b border-amber-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-saffron-600" />
              <h2 className="text-base sm:text-lg font-bold font-serif text-slate-900">
                Upcoming Festival Collections
              </h2>
            </div>
            <Link href="/festivals" className="text-xs font-bold text-maroon-800 hover:text-maroon-950 flex items-center gap-1">
              View All Festivals <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {festivals.map((fest) => (
              <Link
                key={fest.slug}
                href={`/festivals/${fest.slug}`}
                className="flex-shrink-0 flex items-center gap-3 rounded-xl border border-amber-200 bg-white px-4 py-2.5 shadow-sm hover:shadow-md hover:border-maroon-700 transition-all group"
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-maroon-800 transition-colors">
                    {fest.name}
                  </h3>
                  <span className="text-[10px] text-saffron-700 font-semibold block">
                    {fest.tag}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-maroon-800 group-hover:translate-x-1 transition-all ml-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORY GRID WITH AI FOOD PHOTOGRAPHY CARDS ──────── */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <Badge variant="gold" className="px-3 py-1 text-xs">Menu Categories</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900">
            Handcrafted Traditional Delicacies
          </h2>
          <p className="text-sm text-slate-600">
            Explore our curated menu of pure cow ghee laddus, festive faral, and crispy authentic snacks.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categoryCards.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-maroon-700 transition-all transform hover:-translate-y-1 flex flex-col"
            >
              {/* Image thumbnail */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-950 bg-amber-400/95 px-2 py-0.5 rounded-full shadow">
                  {cat.badge}
                </span>
              </div>

              {/* Text footer */}
              <div className="p-4 text-center space-y-0.5 bg-white">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-maroon-800 transition-colors">
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
      <section className="py-16 bg-gradient-to-b from-[#2B080C] via-[#420E15] to-[#2B080C] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="gold" className="px-3 py-1 text-xs">🔥 Festive Highlights</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-amber-100">
                Popular This Season
              </h2>
              <p className="text-sm text-amber-200/70 max-w-xl">
                Our most requested sweets and faral gift boxes, handcrafted fresh upon order.
              </p>
            </div>
            <Link
              href="/products"
              className="btn btn-gold btn-md font-bold flex items-center gap-2 self-start md:self-auto"
            >
              <span>Explore Menu</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularProducts.map((prod) => (
              <Card key={prod.id} className="overflow-hidden border-amber-400/30 bg-slate-950/80 text-white shadow-2xl hover:border-amber-400/60 transition-all group flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-bold text-slate-950 bg-amber-400 px-2.5 py-1 rounded-full shadow">
                        {prod.badge}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-amber-300/80">
                      <span>{prod.category}</span>
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span>{prod.rating} ({prod.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-200 transition-colors">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {prod.desc}
                    </p>
                  </CardContent>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-white/10 mt-2">
                  <span className="text-lg font-bold text-amber-300">{prod.price}</span>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="btn btn-primary btn-sm text-xs font-semibold px-4 py-2"
                  >
                    Order Now
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GIFT HAMPERS SHOWCASE ────────────────────────────── */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-200/90 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <Badge variant="gold" className="px-3 py-1 text-xs">🎁 Festive Gifting</Badge>
              <h2 className="text-3xl font-bold font-serif text-slate-900">
                Royal Faral & Sweet Gift Boxes
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Surprise your family, guests, and corporate clients with curated festival hampers. Each box is packed with fresh laddus, crunchy faral savories, and ethnic brass diyas.
              </p>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Customizable pack quantities & box designs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Ideal for corporate gifting & wedding hampers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Eco-friendly ethnic gift packaging</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/hampers" className="btn btn-primary btn-md font-bold inline-flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span>Explore Gift Hampers</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2 border-amber-300 relative group bg-slate-900">
                <img
                  src="/images/hamper.jpg"
                  alt="Diwali Faral Gift Box 3D Render"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-xs font-bold text-amber-300">Royal Faral Gift Box</span>
                  <p className="text-lg font-bold font-serif">₹1,850 per Box</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ──────────────────────────────────────── */}
      <section className="py-16 mx-auto max-w-4xl px-4 text-center space-y-6">
        <h2 className="text-3xl font-bold font-serif text-slate-900">
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
            className="btn btn-whatsapp btn-lg px-8 py-3.5 shadow-lg flex items-center gap-2"
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
