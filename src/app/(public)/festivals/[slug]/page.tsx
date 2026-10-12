/**
 * Dynamic Festival Page — /festivals/[slug]
 * Per spec Part H3: Header band with festival color, dates, description,
 * product grid for this festival, hamper cards for this festival.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Sparkles, Gift, ChevronLeft, MessageCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { formatMoney } from '@/lib/money';
import { generateWhatsAppLink } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

const festivalData: Record<string, any> = {
  'ganesh-chaturthi': {
    name: 'Ganesh Chaturthi Special',
    slug: 'ganesh-chaturthi',
    description: 'Celebrate Bappa\'s arrival with authentic Ukadiche Modak, Puran Poli, and special prasad sweets made fresh with pure cow ghee and coconut.',
    startDate: 'Sep 07, 2026',
    endDate: 'Sep 17, 2026',
    colorHex: '#B91C1C',
    isActive: true,
    bannerImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=1200&auto=format&fit=crop&q=80',
    products: [
      {
        id: 'p1',
        name: 'Ukadiche Modak (Steam)',
        slug: 'ukadiche-modak',
        priceRange: '₹250 – ₹950',
        image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
        isJain: true,
      },
      {
        id: 'p2',
        name: 'Pure Ghee Besan Ladoo',
        slug: 'besan-ladoo',
        priceRange: '₹220 – ₹800',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
        isJain: true,
      },
    ],
    hampers: [
      {
        id: 'h1',
        name: 'Bappa Prasad Hamper',
        slug: 'bappa-prasad-hamper',
        pricePaise: 120000,
        contentsSummary: '11 Steamed Modak + 500g Besan Ladoo + Panchamrut Box',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
  'diwali-special': {
    name: 'Diwali Faral Collection',
    slug: 'diwali-special',
    description: 'Crispy Chakli, melt-in-mouth Karanji, Besan Ladoo, Chivda, and Shankarbali packed in premium festive gift boxes.',
    startDate: 'Nov 01, 2026',
    endDate: 'Nov 15, 2026',
    colorHex: '#C2410C',
    isActive: true,
    bannerImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&auto=format&fit=crop&q=80',
    products: [
      {
        id: 'p2',
        name: 'Pure Ghee Besan Ladoo',
        slug: 'besan-ladoo',
        priceRange: '₹220 – ₹800',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
        isJain: true,
      },
    ],
    hampers: [
      {
        id: 'h2',
        name: 'Royal Faral Gift Hamper',
        slug: 'royal-faral-gift-hamper',
        pricePaise: 185000,
        contentsSummary: '500g Chakli + 500g Karanji + 500g Besan Ladoo + 500g Spicy Chivda',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=80',
      },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fest = festivalData[slug];
  if (!fest) return { title: 'Festival Not Found — Anjali\'s Kitchen' };
  return {
    title: `${fest.name} — Anjali's Kitchen`,
    description: fest.description,
  };
}

export default async function FestivalDetailPage({ params }: Props) {
  const { slug } = await params;
  const fest = festivalData[slug] || {
    name: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') + ' Special',
    slug,
    description: 'Festive handmade delicacies prepared with pure ingredients and traditional recipes.',
    startDate: 'Upcoming',
    endDate: 'Seasonal',
    colorHex: '#9F1239',
    isActive: true,
    products: [],
    hampers: [],
  };

  const whatsappInquiryUrl = generateWhatsAppLink({
    text: `Hello Anjali's Kitchen! I would like to inquire about bulk ordering for ${fest.name}.`,
  });

  return (
    <div>
      {/* Header Band with Festival Color Accent */}
      <div className="relative bg-gradient-to-r from-maroon-900 via-maroon-800 to-rose-950 text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,180,0,0.15),transparent)]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/festivals"
            className="inline-flex items-center text-xs sm:text-sm font-medium text-amber-200 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            All Festivals
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="gold" className="px-3 py-1 text-xs shadow-sm">
              <Sparkles className="mr-1 h-3.5 w-3.5 inline text-amber-700" /> Festive Special
            </Badge>
            <div className="inline-flex items-center text-xs text-amber-100 bg-white/10 backdrop-blur px-3 py-1 rounded-full border border-white/10">
              <Calendar className="mr-1.5 h-3.5 w-3.5" />
              {fest.startDate} – {fest.endDate}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-amber-100">
            {fest.name}
          </h1>

          <p className="mt-3 max-w-2xl text-base sm:text-lg text-amber-50/90 leading-relaxed">
            {fest.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Festival Hampers Section */}
        {fest.hampers.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-maroon-700" />
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  Curated Gift Hampers
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fest.hampers.map((hamper: any) => (
                <Card key={hamper.id} className="overflow-hidden border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden bg-slate-100">
                      <img src={hamper.image} alt={hamper.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-700 bg-saffron-100 px-2 py-0.5 rounded-full">
                          Gift Bundle
                        </span>
                        <h3 className="text-lg font-bold font-serif text-slate-900 mt-1">
                          {hamper.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          {hamper.contentsSummary}
                        </p>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                        <span className="text-lg font-bold text-maroon-800">
                          {formatMoney(hamper.pricePaise)}
                        </span>
                        <a
                          href={`/hampers`}
                          className="btn btn-primary btn-sm text-xs"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Festival Products Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              {fest.name} Menu Items
            </h2>
            <Link href="/products" className="text-sm font-semibold text-maroon-700 hover:text-maroon-900 flex items-center gap-1">
              Full Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {fest.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fest.products.map((item: any) => (
                <Link key={item.id} href={`/products/${item.slug}`} className="group">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow border-slate-200">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-maroon-700 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="font-semibold text-maroon-800 text-sm">{item.priceRange}</span>
                        {item.isJain && (
                          <Badge variant="jain" className="text-[10px] py-0 px-2">Jain</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-sm text-slate-600">Special festival items will be updated as the festival date approaches!</p>
            </div>
          )}
        </section>

        {/* Festive Order Banner CTA */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
              Planning a Festive Gathering or Prasad Distribution?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              We offer customized bulk orders with custom packaging for corporate gifting and family poojas.
            </p>
          </div>
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg shadow-lg flex-shrink-0 flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5 fill-current" />
            <span>Inquire Bulk Order</span>
          </a>
        </div>
      </div>
    </div>
  );
}
