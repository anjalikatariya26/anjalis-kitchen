import { requireAuth } from '@/features/auth/actions';
import { CategoryManager } from '@/features/categories/CategoryManager';
import { prisma } from '@/server/db';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  await requireAuth();

  let categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    isActive: boolean;
    sortOrder: number;
    _count?: { products: number };
  }[] = [];

  try {
    const dbCategories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: { where: { deletedAt: null } } },
        },
      },
    });

    categories = dbCategories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      isActive: c.isActive,
      sortOrder: c.sortOrder,
      _count: { products: c._count.products },
    }));
  } catch (err) {
    console.error('Failed to load categories for admin:', err);
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Categories</h1>
          <p>Organise your products by category.</p>
        </div>
      </div>

      <div className="mt-6">
        <CategoryManager initialCategories={categories} />
      </div>
    </div>
  );
}
