/**
 * Admin Products list page — search, filter, table with actions.
 */
import { requireAuth } from '@/features/auth/actions';
import { ProductList } from '@/features/products/ProductList';

export default async function AdminProductsPage() {
  await requireAuth();

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
        <ProductList />
      </div>
    </div>
  );
}
