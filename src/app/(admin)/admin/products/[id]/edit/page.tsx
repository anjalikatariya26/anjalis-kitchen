import { requireAuth } from '@/features/auth/actions';
import { ProductForm } from '@/features/products/ProductForm';
import { prisma } from '@/server/db';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProductPage({ params }: Props) {
  await requireAuth();
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      variants: { orderBy: { sortOrder: 'asc' } },
      festivals: { include: { festival: true } },
      images: { orderBy: { position: 'asc' }, include: { media: true } },
    },
  });

  if (!product || product.deletedAt) {
    notFound();
  }

  const initialProduct = {
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    productType: product.productType,
    foodType: product.foodType,
    categoryId: product.categoryId,
    festivalIds: product.festivals.map((f) => f.festivalId),
    isAvailable: product.isAvailable,
    variants: product.variants.map((v) => ({
      id: v.id,
      unitType: v.unitType,
      unit: v.unit,
      quantityValue: v.quantityValue ? v.quantityValue.toString() : '',
      displayLabel: v.displayLabel,
      pricePaise: v.pricePaise,
      isAvailable: v.isAvailable,
    })),
    images: product.images.map((img) => {
      const publicBaseUrl = process.env.STORAGE_PUBLIC_BASE_URL || '/media';
      return `${publicBaseUrl}/${img.media.storageKey}`;
    }),
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Edit Product</h1>
          <p>Update product details, pricing, variants, or photos.</p>
        </div>
        <a href="/admin/products" className="btn btn-ghost btn-md">
          <span className="btn-label">← Back to Products</span>
        </a>
      </div>

      <div className="mt-6">
        <ProductForm productId={product.id} initialProduct={initialProduct} />
      </div>
    </div>
  );
}
