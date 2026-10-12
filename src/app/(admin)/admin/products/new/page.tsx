/**
 * Admin — Add New Product page.
 */
import { requireAuth } from '@/features/auth/actions';
import { ProductForm } from '@/features/products/ProductForm';

export default async function AdminNewProductPage() {
  await requireAuth();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Add Product</h1>
          <p>Create a new product for your catalogue.</p>
        </div>
        <a href="/admin/products" className="btn btn-ghost btn-md">
          <span className="btn-label">← Back to Products</span>
        </a>
      </div>

      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
