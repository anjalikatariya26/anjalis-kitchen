import { requireAuth } from '@/features/auth/actions';
import { CategoryManager } from '@/features/categories/CategoryManager';
import { prisma } from '@/server/db';

export default async function AdminCategoriesPage() {
  await requireAuth();

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { products: { where: { deletedAt: null } } },
      },
    },
  });

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
