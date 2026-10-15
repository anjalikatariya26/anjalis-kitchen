'use client';

/**
 * ProductCatalogue — Public product browsing with database data and fallback.
 * Category chips, Jain toggle, search, responsive product grid.
 */

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { Card, CardContent } from '@/components/ui/Card';
import { Search, MessageCircle } from 'lucide-react';
import { JainSymbol } from '@/components/ui/JainSymbol';
import { generateWhatsAppLink, DEFAULT_STORE_PHONE } from '@/lib/whatsapp';

/* ─── Types ──────────────────────────────────────────── */

export interface PublicProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  foodType: 'JAIN' | 'REGULAR';
  categorySlug: string;
  categoryName: string;
  isAvailable: boolean;
  priceLabel: string;
  imageUrl: string | null;
}

export interface PublicCategory {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
}

/* ─── Initial Showcase Products ──────────────────────── */

const showcaseProducts: PublicProduct[] = [
  {
    id: 'p1',
    name: 'Steamed Ukadiche Modak',
    slug: 'ukadiche-modak',
    shortDescription: 'Fresh steamed rice flour modak filled with coconut, organic jaggery, cardamom, nutmeg, and drizzled with cow ghee.',
    foodType: 'JAIN',
    categorySlug: 'modak',
    categoryName: 'Modak',
    isAvailable: true,
    priceLabel: '₹250 / 5 Pcs',
    imageUrl: '/images/modak.jpg',
  },
  {
    id: 'p2',
    name: 'Pure Ghee Besan Ladoo',
    slug: 'besan-ladoo',
    shortDescription: 'Slow-roasted gram flour in artisanal cow ghee with cardamom, silver leaf varak, and almond pistachios.',
    foodType: 'JAIN',
    categorySlug: 'laddu',
    categoryName: 'Laddu',
    isAvailable: true,
    priceLabel: '₹420 / 500g',
    imageUrl: '/images/ladoo.jpg',
  },
  {
    id: 'p3',
    name: 'Royal Faral Gift Hamper Box',
    slug: 'royal-faral-gift-hamper',
    shortDescription: 'Curated 4-tier Diwali festive hamper with Chakli, Karanji, Besan Ladoo, and spicy Chivda in ethnic box.',
    foodType: 'JAIN',
    categorySlug: 'sweets',
    categoryName: 'Gift Hampers',
    isAvailable: true,
    priceLabel: '₹1,850 / Box',
    imageUrl: '/images/hamper.jpg',
  },
  {
    id: 'p4',
    name: 'Special Poha Chivda',
    slug: 'poha-chivda',
    shortDescription: 'Crispy fried flattened rice with peanuts, curry leaves, green chilies, and roasted gram.',
    foodType: 'JAIN',
    categorySlug: 'chivda',
    categoryName: 'Chivda',
    isAvailable: true,
    priceLabel: '₹180 / 500g',
    imageUrl: '/images/modak.jpg',
  },
  {
    id: 'p5',
    name: 'Butter Crispy Chakli',
    slug: 'butter-chakli',
    shortDescription: 'Spiced spiral crunchies made with rice & gram flour blend and pure butter.',
    foodType: 'REGULAR',
    categorySlug: 'namkeen-farsan',
    categoryName: 'Namkeen',
    isAvailable: true,
    priceLabel: '₹220 / 500g',
    imageUrl: '/images/ladoo.jpg',
  },
];

const defaultCategories: PublicCategory[] = [
  { name: 'All', slug: '' },
  { name: 'Laddu', slug: 'laddu' },
  { name: 'Modak', slug: 'modak' },
  { name: 'Chivda', slug: 'chivda' },
  { name: 'Namkeen', slug: 'namkeen-farsan' },
  { name: 'Sweets', slug: 'sweets' },
  { name: 'Chikki', slug: 'chikki' },
  { name: 'Snacks', slug: 'snacks-nashta' },
];

export interface ProductCatalogueProps {
  initialProducts?: PublicProduct[];
  initialCategories?: PublicCategory[];
}

function ProductCatalogueContent({
  initialProducts,
  initialCategories,
}: ProductCatalogueProps) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || '';

  const [products] = useState<PublicProduct[]>(
    initialProducts && initialProducts.length > 0 ? initialProducts : showcaseProducts
  );

  const categories = useMemo(() => {
    if (initialCategories && initialCategories.length > 0) {
      return [{ name: 'All', slug: '' }, ...initialCategories];
    }
    return defaultCategories;
  }, [initialCategories]);

  const [query, setQuery] = useState('');
  const [userSelectedCategory, setUserSelectedCategory] = useState<string | null>(null);
  const [jainOnly, setJainOnly] = useState(false);

  // Derive active category from user selection or URL parameter
  const activeCategory = userSelectedCategory !== null ? userSelectedCategory : categoryFromUrl;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      if (activeCategory && p.categorySlug !== activeCategory) return false;
      if (jainOnly && p.foodType !== 'JAIN') return false;
      return true;
    });
  }, [products, query, activeCategory, jainOnly]);

  return (
    <div className="space-y-8">
      {/* Search & Filters control bar */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <Input
              label=""
              placeholder="Search laddus, modak, chivda..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              icon={<Search size={18} className="text-slate-400" />}
            />
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50/80 px-4 py-2.5 shadow-xs">
            <JainSymbol size={18} />
            <Switch
              label="Jain Options Only"
              size="sm"
              checked={jainOnly}
              onCheckedChange={setJainOnly}
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Filter menu by category">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setUserSelectedCategory(cat.slug)}
                className={`flex-shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-maroon-800 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const isAvailable = product.isAvailable !== false;
            const whatsappOrderUrl = isAvailable
              ? generateWhatsAppLink({
                  text: `Hello Anjali's Kitchen! I would like to place an order enquiry for ${product.name} (${product.priceLabel}). Please confirm availability.`,
                  phoneNumber: DEFAULT_STORE_PHONE,
                })
              : generateWhatsAppLink({
                  text: `Hello Anjali's Kitchen! Please let me know when ${product.name} is available next.`,
                  phoneNumber: DEFAULT_STORE_PHONE,
                });

            return (
              <Card
                key={product.id}
                className="overflow-hidden border-slate-200/90 bg-white hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img
                      src={product.imageUrl || '/images/modak.jpg'}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/modak.jpg';
                      }}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-800 bg-amber-100/95 px-2.5 py-1 rounded-full border border-amber-300 shadow-sm backdrop-blur">
                        {product.categoryName}
                      </span>
                      {product.foodType === 'JAIN' && (
                        <span className="inline-flex items-center gap-1 bg-amber-100/95 text-amber-950 font-bold px-2 py-0.5 rounded-full border border-amber-300 text-[10px] shadow-sm backdrop-blur">
                          <JainSymbol size={12} />
                          <span>Jain Available</span>
                        </span>
                      )}
                      {!isAvailable && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/95 px-2.5 py-1 rounded-full border border-amber-400 shadow-sm backdrop-blur">
                          Currently Unavailable
                        </span>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-2">
                    <h3 className="font-bold text-lg font-serif text-slate-900 group-hover:text-maroon-700 transition-colors">
                      <Link href={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>

                    {product.shortDescription && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    )}
                  </CardContent>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-3">
                  <span className="text-base font-bold text-maroon-800">
                    {product.priceLabel}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1"
                    >
                      Details
                    </Link>
                    <a
                      href={whatsappOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-sm text-xs font-bold flex items-center gap-1 py-2 px-3 ${
                        isAvailable ? 'btn-whatsapp' : 'btn-secondary'
                      }`}
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-current" />
                      {isAvailable ? 'Enquire' : 'Check Stock'}
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No items match your selected filter.</p>
          <button
            onClick={() => {
              setQuery('');
              setUserSelectedCategory('');
              setJainOnly(false);
            }}
            className="mt-3 text-xs font-bold text-maroon-700 underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export function ProductCatalogue(props: ProductCatalogueProps) {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-slate-500">
          Loading menu catalogue...
        </div>
      }
    >
      <ProductCatalogueContent {...props} />
    </Suspense>
  );
}
