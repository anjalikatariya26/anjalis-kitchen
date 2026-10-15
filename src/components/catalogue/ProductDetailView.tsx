'use client';

/**
 * ProductDetailView — Detailed product view per spec Part H2.
 * Image gallery + thumbnail selector, title, category, Jain badge,
 * shelf life, lead time, variant selector radio pills, quantity stepper,
 * pre-calculated price, and direct WhatsApp ordering button with prefilled text.
 */

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { formatMoney } from '@/lib/money';
import { generateProductOrderLink, DEFAULT_STORE_PHONE } from '@/lib/whatsapp';
import { JainSymbol } from '@/components/ui/JainSymbol';
import {
  MessageCircle,
  Clock,
  Package,
  ShieldCheck,
  ChevronLeft,
  Share2,
  Check,
} from 'lucide-react';
import Link from 'next/link';

interface Variant {
  id: string;
  label: string; // e.g. "250g", "500g", "1kg"
  pricePaise: number;
  isAvailable: boolean;
}

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    categoryName: string;
    categorySlug: string;
    isJain: boolean;
    isAvailable?: boolean;
    shelfLifeDays: number | null;
    leadTimeHours: number;
    images: string[];
    variants: Variant[];
  };
}

export function ProductDetailView({ product }: ProductDetailProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const isItemAvailable = product.isAvailable !== false && (!selectedVariant || selectedVariant.isAvailable !== false);
  const unitPricePaise = selectedVariant ? selectedVariant.pricePaise : 0;
  const totalPricePaise = unitPricePaise * quantity;

  // WhatsApp order link
  const whatsappUrl = selectedVariant
    ? generateProductOrderLink({
        productName: product.name,
        variantLabel: selectedVariant.label,
        quantity,
        totalPricePaise,
        phoneNumber: DEFAULT_STORE_PHONE,
      })
    : '#';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Anjali's Kitchen!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mainImage =
    product.images[selectedImageIndex] ||
    'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button & Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-maroon-700 transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Menu
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
          {copied ? 'Copied Link!' : 'Share'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
            <img
              src={mainImage}
              alt={product.name}
              decoding="async"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/modak.jpg';
              }}
              className="h-full w-full object-cover object-center"
            />
            {product.isJain && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 bg-amber-100/95 backdrop-blur text-amber-950 font-bold px-3 py-1 rounded-full border border-amber-300 shadow-md text-xs">
                  <JainSymbol size={14} />
                  <span>Jain Available</span>
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-maroon-700 ring-2 ring-maroon-700/20 scale-105'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Product Info & Order Form */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="space-y-4">
            <div className="inline-block">
              <span className="text-xs font-semibold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-2.5 py-1 rounded-full border border-saffron-200">
                {product.categoryName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              {product.name}
            </h1>

            {/* Price display */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-maroon-800">
                {formatMoney(totalPricePaise)}
              </span>
              {quantity > 1 && (
                <span className="text-sm text-slate-500 font-medium">
                  ({formatMoney(unitPricePaise)} each)
                </span>
              )}
            </div>

            {/* Specs bar */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-200 text-xs sm:text-sm text-slate-600">
              {product.shelfLifeDays && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-saffron-600 flex-shrink-0" />
                  <span>Shelf Life: <strong>{product.shelfLifeDays} days</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-maroon-600 flex-shrink-0" />
                <span>Lead Time: <strong>{product.leadTimeHours}h fresh prep</strong></span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            )}

            {/* Variant Picker */}
            {product.variants.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Select Pack Size:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      type="button"
                      disabled={!v.isAvailable}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        selectedVariantIndex === idx
                          ? 'border-maroon-700 bg-maroon-50 text-maroon-900 ring-2 ring-maroon-700/20 shadow-sm'
                          : v.isAvailable
                          ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          : 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed line-through'
                      }`}
                    >
                      {v.label} — {formatMoney(v.pricePaise)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Quantity:
              </label>
              <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-base font-bold text-slate-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(50, q + 1))}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* WhatsApp Order CTA Box */}
            <Card className={`mt-6 shadow-sm ${isItemAvailable ? 'border-emerald-200 bg-emerald-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className={isItemAvailable ? 'text-emerald-800' : 'text-amber-800'}>
                    {isItemAvailable ? 'Direct Order Request via WhatsApp' : 'Currently Unavailable'}
                  </span>
                  <span className="text-slate-500">Made Fresh to Order</span>
                </div>

                {isItemAvailable ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp w-full btn-lg py-3.5 text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5 fill-current" />
                    <span>Send Order Request — {formatMoney(totalPricePaise)}</span>
                  </a>
                ) : (
                  <a
                    href={`https://wa.me/${DEFAULT_STORE_PHONE}?text=${encodeURIComponent(`Hello Anjali's Kitchen! Please let me know when ${product.name} is available next.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary w-full btn-lg py-3.5 text-base shadow-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Enquire About Next Availability</span>
                  </a>
                )}

                <p className="text-center text-xs text-slate-500">
                  {isItemAvailable
                    ? 'Opens WhatsApp with your enquiry. We will confirm item availability, preparation time, and delivery/pickup slot with you directly.'
                    : 'This item is currently out of stock or seasonal. Message us to pre-order or check availability.'}
                </p>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="h-5 w-5 mx-auto text-maroon-700 mb-1" />
                <span className="text-[11px] font-semibold text-slate-700 block">100% Homemade</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Check className="h-5 w-5 mx-auto text-emerald-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-700 block">Pure Veg & Hygienic</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Clock className="h-5 w-5 mx-auto text-saffron-600 mb-1" />
                <span className="text-[11px] font-semibold text-slate-700 block">Made Fresh to Order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
