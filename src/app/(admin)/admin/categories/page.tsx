/**
 * Admin Categories page — List, create, edit, deactivate categories.
 * Phase 6: Category management with duplicate prevention (name_key).
 */
import { requireAuth } from '@/features/auth/actions';
import { CategoryManager } from '@/features/categories/CategoryManager';

export default async function AdminCategoriesPage() {
  await requireAuth();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Categories</h1>
          <p>Organise your products by category.</p>
        </div>
      </div>

      <div className="mt-6">
        <CategoryManager />
      </div>
    </div>
  );
}
