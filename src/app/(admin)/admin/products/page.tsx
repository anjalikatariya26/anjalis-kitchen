import { requireAuth } from '@/features/auth/actions';
import { ProductList } from '@/features/products/ProductList';
import { prisma } from '@/server/db';

export default async function AdminProductsPage() {
  await requireAuth();

  const dbProducts = await prisma.product.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      variants: { orderBy: { sortOrder: 'asc' } },
      festivals: { include: { festival: true } },
    },
  });

  const products = dbProducts.map((p) => {
    const minVariant = p.variants[0];
    const priceLabel = minVariant && minVariant.pricePaise
      ? `₹${Math.round(minVariant.pricePaise / 100)} / ${minVariant.displayLabel}`
      : 'On enquiry';

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      productType: p.productType,
      foodType: p.foodType,
      categoryName: p.category.name,
      festivals: p.festivals.map((f) => f.festival.name),
      variantCount: p.variants.length,
      isAvailable: p.isAvailable,
      priceLabel,
      createdAt: p.createdAt.toISOString().slice(0, 10),
    };
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Products</h1>
          <p>Manage your product catalogue.</p>
        </div>
        <a
          href="/admin/products/new"
          className="btn btn-primary btn-md"
        >
          <span className="btn-label">Add Product</span>
        </a>
      </div>

      <div className="mt-6">
        <ProductList initialProducts={products} />
      </div>
    </div>
  );
}
