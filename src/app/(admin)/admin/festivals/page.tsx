/**
 * Admin Festivals page — Connected to PostgreSQL database.
 */
import { requireAuth } from '@/features/auth/actions';
import { FestivalManager } from '@/features/festivals/FestivalManager';
import { prisma } from '@/server/db';

export const dynamic = 'force-dynamic';

export default async function AdminFestivalsPage() {
  await requireAuth();

  let initialFestivals: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    isActive: boolean;
    sortOrder: number;
    _count?: { products: number; hampers: number };
  }[] = [];

  try {
    const dbFestivals = await prisma.festival.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { productFestivals: true, hampers: true },
        },
      },
    });

    initialFestivals = dbFestivals.map((f) => ({
      id: f.id,
      name: f.name,
      slug: f.slug,
      description: f.description,
      isActive: f.isActive,
      sortOrder: f.sortOrder,
      _count: {
        products: f._count.productFestivals,
        hampers: f._count.hampers,
      },
    }));
  } catch (err) {
    console.error('Failed to load festivals for admin:', err);
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Festivals</h1>
          <p>Manage seasonal festivals for your products and hampers.</p>
        </div>
      </div>

      <div className="mt-6">
        <FestivalManager initialFestivals={initialFestivals} />
      </div>
    </div>
  );
}
