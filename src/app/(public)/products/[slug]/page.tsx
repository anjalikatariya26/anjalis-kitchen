/**
 * Dynamic Product Detail Page — /products/[slug]
 * Backed by database lookup with known fallback catalogue and proper 404 for unknown items.
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductDetailView } from '@/components/catalogue/ProductDetailView';
import { getPublicProductDetail } from '@/server/services/catalogue.service';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductDetail(slug);
  if (!product) {
    return {
      title: "Product Not Found — Anjali's Kitchen",
      description: "The requested product does not exist in Anjali's Kitchen menu.",
    };
  }

  return {
    title: `${product.name} — Anjali's Kitchen`,
    description: product.description || `Order fresh handmade ${product.name} from Anjali's Kitchen.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getPublicProductDetail(slug);

  // Return standard 404 if product does not exist in DB or known catalogue
  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
