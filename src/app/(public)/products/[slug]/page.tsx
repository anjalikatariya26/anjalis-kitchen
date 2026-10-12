/**
 * Dynamic Product Detail Page — /products/[slug]
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductDetailView } from '@/components/catalogue/ProductDetailView';

// Sample product mock for fallback preview before DB fetch
const mockProducts: Record<string, any> = {
  'ukadiche-modak': {
    id: 'prod-1',
    name: 'Ukadiche Modak',
    slug: 'ukadiche-modak',
    description: 'Traditional steamed rice flour modak stuffed with freshly grated coconut, organic jaggery, cardamom, and nutmeg. Prepared fresh on order with pure ghee.',
    categoryName: 'Sweets & Desserts',
    categorySlug: 'sweets',
    isJain: true,
    shelfLifeDays: 1,
    leadTimeHours: 24,
    images: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { id: 'v1', label: 'Pack of 5', pricePaise: 25000, isAvailable: true },
      { id: 'v2', label: 'Pack of 11', pricePaise: 50000, isAvailable: true },
      { id: 'v3', label: 'Pack of 21', pricePaise: 95000, isAvailable: true },
    ],
  },
  'besan-ladoo': {
    id: 'prod-2',
    name: 'Pure Ghee Besan Ladoo',
    slug: 'besan-ladoo',
    description: 'Slow-roasted gram flour in artisanal pure cow ghee, flavored with aromatic cardamom and garnished with crunchy almonds and pistachios.',
    categoryName: 'Sweets & Desserts',
    categorySlug: 'sweets',
    isJain: true,
    shelfLifeDays: 20,
    leadTimeHours: 24,
    images: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { id: 'v4', label: '250g', pricePaise: 22000, isAvailable: true },
      { id: 'v5', label: '500g', pricePaise: 42000, isAvailable: true },
      { id: 'v6', label: '1kg', pricePaise: 80000, isAvailable: true },
    ],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts[slug];
  if (!product) return { title: 'Product Not Found — Anjali\'s Kitchen' };

  return {
    title: `${product.name} — Anjali's Kitchen`,
    description: product.description || `Order fresh ${product.name} handmade by Anjali's Kitchen.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = mockProducts[slug];

  // If not found in mock, render fallback generic item for testing or 404
  const displayProduct = product || {
    id: 'prod-generic',
    name: slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
    slug,
    description: 'Handcrafted fresh using authentic recipes and premium ingredients. Pure vegetarian and prepped to order.',
    categoryName: 'Specialties',
    categorySlug: 'specialties',
    isJain: true,
    shelfLifeDays: 7,
    leadTimeHours: 24,
    images: [
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { id: 'vg1', label: '250g', pricePaise: 20000, isAvailable: true },
      { id: 'vg2', label: '500g', pricePaise: 38000, isAvailable: true },
      { id: 'vg3', label: '1kg', pricePaise: 72000, isAvailable: true },
    ],
  };

  return <ProductDetailView product={displayProduct} />;
}
