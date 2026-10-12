/**
 * Dynamic Hamper Detail Page — /hampers/[slug]
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Gift, MessageCircle, ChevronLeft, Check, Sparkles, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatMoney } from '@/lib/money';
import { generateWhatsAppLink } from '@/lib/whatsapp';

interface Props {
  params: Promise<{ slug: string }>;
}

const hampersData: Record<string, any> = {
  'bappa-prasad-hamper': {
    name: 'Bappa Prasad Hamper',
    slug: 'bappa-prasad-hamper',
    description: 'A traditional festive offering designed for Ganesh Chaturthi poojas. Packed with love in eco-friendly ethnic boxes.',
    festivalName: 'Ganesh Chaturthi Special',
    pricePaise: 120000,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    items: [
      { name: 'Steamed Ukadiche Modak', quantity: '11 Pcs' },
      { name: 'Pure Cow Ghee Besan Ladoo', quantity: '500 grams' },
      { name: 'Fresh Coconut Panchamrut Box', quantity: '1 Box' },
      { name: 'Decorative Puja Diya', quantity: '1 Pc' },
    ],
  },
  'royal-faral-gift-hamper': {
    name: 'Royal Faral Gift Hamper',
    slug: 'royal-faral-gift-hamper',
    description: 'The ultimate Diwali festive box containing a curated selection of sweet & savory authentic Maharashtrian delicacies.',
    festivalName: 'Diwali Faral Collection',
    pricePaise: 185000,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    items: [
      { name: 'Butter Chakli', quantity: '500 grams' },
      { name: 'Sweet Coconut Karanji', quantity: '500 grams' },
      { name: 'Pure Ghee Besan Ladoo', quantity: '500 grams' },
      { name: 'Poha Chivda (Spicy)', quantity: '500 grams' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hamper = hampersData[slug];
  if (!hamper) return { title: 'Hamper Not Found — Anjali\'s Kitchen' };
  return {
    title: `${hamper.name} — Anjali's Kitchen`,
    description: hamper.description,
  };
}

export default async function HamperDetailPage({ params }: Props) {
  const { slug } = await params;
  const hamper = hampersData[slug] || {
    name: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    slug,
    description: 'Beautifully gift wrapped festive hamper box containing handcrafted homemade treats.',
    festivalName: 'Festive Special',
    pricePaise: 150000,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    items: [
      { name: 'Assorted Festive Sweets', quantity: '1 Pack' },
      { name: 'Savory Snacks Selection', quantity: '1 Pack' },
    ],
  };

  const whatsappUrl = generateWhatsAppLink({
    text: `Hello Anjali's Kitchen! I want to order the "${hamper.name}" priced at ${formatMoney(hamper.pricePaise)}.`,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/hampers"
        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-maroon-700 transition-colors mb-6"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        All Gift Hampers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left column: Hamper image */}
        <div className="lg:col-span-6">
          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-sm relative">
            <img
              src={hamper.image}
              alt={hamper.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="gold" className="shadow-md text-xs py-1 px-3">
                <Sparkles className="mr-1 h-3.5 w-3.5 inline text-amber-700" /> {hamper.festivalName}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right column: Hamper Details & Contents */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              {hamper.name}
            </h1>
            <div className="text-3xl font-bold text-maroon-800">
              {formatMoney(hamper.pricePaise)}
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            {hamper.description}
          </p>

          {/* Contents List */}
          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Package className="h-4 w-4 text-maroon-700" />
              Box Contents & Items:
            </h2>

            <Card className="border-amber-200/80 bg-amber-50/30">
              <CardContent className="p-4 space-y-2.5">
                {hamper.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-sm py-1 border-b border-amber-100 last:border-0">
                    <div className="flex items-center gap-2 text-slate-800">
                      <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded text-xs border border-amber-200">
                      {item.quantity}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp Order CTA */}
          <div className="pt-4 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full btn-lg py-4 text-base shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5 fill-current" />
              <span>Order Hamper via WhatsApp — {formatMoney(hamper.pricePaise)}</span>
            </a>
            <p className="text-center text-xs text-slate-500">
              Custom packaging options available for bulk corporate & wedding orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
