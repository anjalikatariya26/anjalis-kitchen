/**
 * Public Hampers Page — Luxury Festival Gift Hampers Showcase.
 * Featuring Studio Photography Renders, Box Contents, Pricing, and Direct Booking.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Gift, MessageCircle, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
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
  },
];

export default function HampersPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen text-slate-900">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#3D0C11] via-[#5C131D] to-[#2B080C] text-white py-14 sm:py-20 border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 text-center space-y-4">
          <Badge variant="gold" className="px-3.5 py-1 text-xs mx-auto">
            <Gift className="mr-1.5 h-3.5 w-3.5 inline text-amber-400" /> Curated Gifting
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-amber-100 tracking-tight">
            Royal Festival Gift Hampers
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-50/80 leading-relaxed">
            Beautifully packaged in eco-friendly ethnic gift boxes. Perfect for family celebrations, corporate gifting, and festive greetings.
          </p>
        </div>
      </section>

      {/* Hampers Showcase Grid */}
      <section className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {hampersList.map((hamper) => {
            const whatsappUrl = generateWhatsAppLink({
              text: `Hello Anjali's Kitchen! I would like to order the "${hamper.name}" (${hamper.price}).`,
            });

            return (
              <Card
                key={hamper.id}
                className="overflow-hidden border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:border-maroon-700 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={hamper.image}
                      alt={hamper.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full shadow-md">
                        {hamper.festival}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold font-serif text-xl text-slate-900 group-hover:text-maroon-800 transition-colors">
                        {hamper.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {hamper.description}
                      </p>
                    </div>

                    {/* Box Items */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Included In Box:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {hamper.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Price</span>
                    <span className="text-xl font-bold text-maroon-800">{hamper.price}</span>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm font-bold px-4 py-2 flex items-center gap-1.5"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>Book Box</span>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>

        {/* 3-Step Process */}
        <div className="rounded-3xl bg-amber-50/50 border border-amber-200/80 p-8 sm:p-10 space-y-6 text-center">
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            How Hampers Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-maroon-800 text-amber-200 flex items-center justify-center font-bold text-sm mx-auto">1</span>
              <h3 className="font-bold text-sm text-slate-900">Choose a Festive Theme</h3>
              <p className="text-xs text-slate-600">Select from Diwali, Ganesh Chaturthi, Raksha Bandhan or custom options.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-maroon-800 text-amber-200 flex items-center justify-center font-bold text-sm mx-auto">2</span>
              <h3 className="font-bold text-sm text-slate-900">Customise Your Items</h3>
              <p className="text-xs text-slate-600">Select your preferred pack sizes, sweet/savory mix, and Jain items.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-maroon-800 text-amber-200 flex items-center justify-center font-bold text-sm mx-auto">3</span>
              <h3 className="font-bold text-sm text-slate-900">Order & Gift</h3>
              <p className="text-xs text-slate-600">Place orders 3-4 days ahead. We package with ethnic box decorations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
