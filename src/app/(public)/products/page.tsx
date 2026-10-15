/**
 * Public Menu/Products page — Premium Catalogue with Hero Banner.
 * Per spec: Category filter chips, search, Jain toggle, product cards.
 */
import type { Metadata } from 'next';
import { ProductCatalogue } from '@/components/catalogue/ProductCatalogue';
import { getPublicCatalogueProducts, getPublicCategories } from '@/server/services/catalogue.service';
import { Flame } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Menu — Anjali's Kitchen",
  description: 'Browse our full menu of homemade Maharashtrian sweets, snacks, chivda, laddu, chikki, and more.',
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getPublicCatalogueProducts(),
    getPublicCategories(),
  ]);

  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#2B080C] via-[#4A101A] to-[#1A0508] text-white py-14 sm:py-20 overflow-hidden wave-divider">
        {/* Ambient orbs */}
        <div className="orb orb-gold w-[400px] h-[400px] -top-20 right-0" />
        <div className="orb orb-rose w-[300px] h-[300px] bottom-0 -left-20" />
        
        {/* Decorative particles */}
        <div className="absolute top-10 left-[20%] w-2 h-2 rounded-full bg-amber-400/40 animate-twinkle" />
        <div className="absolute top-20 right-[30%] w-1.5 h-1.5 rounded-full bg-amber-300/30 animate-twinkle" style={{ animationDelay: '1s' }} />
        
        <div className="relative mx-auto max-w-7xl px-4 text-center space-y-4 reveal-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold text-amber-300 mx-auto">
            <Flame className="h-3.5 w-3.5 text-amber-400" />
            <span>Fresh & Handcrafted to Order</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight">
            <span className="text-amber-100">Our </span>
            <span className="text-shimmer">Complete Menu</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-amber-50/75 leading-relaxed">
            Fresh, homemade Maharashtrian delicacies. Every item is made to order using pure cow ghee and traditional recipes. Order 3–4 days in advance.
          </p>
        </div>
      </section>

      {/* Catalogue */}
      <section className="py-10">
        <div className="mx-auto px-4" style={{ maxWidth: 'var(--content-max-width)' }}>
          <ProductCatalogue initialProducts={products} initialCategories={categories} />
        </div>
      </section>
    </div>
  );
}
