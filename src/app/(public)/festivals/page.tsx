/**
 * Public Festivals Page — Premium Festival Collections.
 * Featuring Studio Food Photography, Gold Badges, and Festival Cards.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, Gift, Calendar, ChefHat } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

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
    accentColor: 'from-red-900 to-amber-900',
  },
  {
    name: 'Diwali Faral Collection',
    slug: 'diwali-special',
    description: 'Royal festive boxes with Chakli, Karanji, Besan Ladoo, Chivda, and ethnic clay diyas.',
    img: '/images/hamper.jpg',
    tag: 'Diwali Gift Hampers',
    accentColor: 'from-amber-900 to-rose-900',
  },
  {
    name: 'Raksha Bandhan Sweets',
    slug: 'raksha-bandhan',
    description: 'Fresh homemade sweet boxes and dry fruit laddus for sibling celebrations.',
    img: '/images/ladoo.jpg',
    tag: 'Festive Sweet Boxes',
    accentColor: 'from-rose-900 to-pink-900',
  },
  {
    name: 'Navratri Upvas Specials',
    slug: 'navratri',
    description: 'Farali mathri, sabudana delights, and Jain-friendly fasting snacks.',
    img: '/images/namkeen.jpg',
    tag: 'Farali & Fasting Snacks',
    accentColor: 'from-purple-900 to-indigo-900',
  },
  {
    name: 'Makar Sankranti',
    slug: 'makar-sankranti',
    description: 'Tilgul laddus, peanut chikki, and crispy sesame jaggery brittles.',
    img: '/images/chikki.jpg',
    tag: 'Tilgul & Chikki Specials',
    accentColor: 'from-emerald-900 to-teal-900',
  },
];

export default function FestivalsPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen text-slate-900">
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-[#3D0C11] via-[#5C131D] to-[#2B080C] text-white py-14 sm:py-20 border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 text-center space-y-4">
          <Badge variant="gold" className="px-3.5 py-1 text-xs mx-auto">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 inline text-amber-400" /> Festive Celebrations
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100 tracking-tight">
            Traditional Festival Specials
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-50/80 leading-relaxed">
            Every Indian festival is incomplete without traditional homemade sweets and faral. Prepared fresh to order with pure cow ghee and authentic recipes.
          </p>
        </div>
      </section>

      {/* Festival Cards Grid */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {festivals.map((f) => (
            <Link
              key={f.slug}
              href={`/festivals/${f.slug}`}
              className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:border-maroon-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={f.img}
                    alt={f.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[11px] font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full shadow-md">
                    {f.tag}
                  </span>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="font-bold font-serif text-xl text-slate-900 group-hover:text-maroon-800 transition-colors">
                    {f.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-maroon-800 border-t border-slate-100 mt-4 pt-4">
                <span>View Festive Menu</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
