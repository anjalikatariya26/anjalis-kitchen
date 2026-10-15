/**
 * Admin Availability page — Bulk toggle product/variant availability.
 * Spec Part J5: Compact list with big on/off switches, bulk actions.
 */
import { requireAuth } from '@/features/auth/actions';
import { AvailabilityManager } from '@/features/availability/AvailabilityManager';
import { prisma } from '@/server/db';

export const dynamic = 'force-dynamic';

export default async function AdminAvailabilityPage() {
  await requireAuth();

  let initialItems: {
    id: string;
    name: string;
    categoryName: string;
    foodType: 'JAIN' | 'REGULAR';
    productType: 'FESTIVE' | 'REGULAR';
    isAvailable: boolean;
    variants: { id: string; label: string; isAvailable: boolean }[];
  }[] = [];

  try {
    const dbProducts = await prisma.product.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        variants: { orderBy: { sortOrder: 'asc' } },
      },
    });

    initialItems = dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      categoryName: p.category.name,
      foodType: p.foodType,
      productType: p.productType,
      isAvailable: p.isAvailable,
      variants: p.variants.map((v) => ({
        id: v.id,
        label: v.displayLabel,
        isAvailable: v.isAvailable,
      })),
    }));
  } catch (err) {
    console.error('Failed to load products for availability manager:', err);
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Availability</h1>
          <p>Quickly toggle products and individual sizes on or off.</p>
        </div>
      </div>

      <div className="mt-6">
        <AvailabilityManager initialItems={initialItems} />
      </div>
    </div>
  );
}
