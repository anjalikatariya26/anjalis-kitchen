/**
 * Admin Hampers list page.
 */
import { requireAuth } from '@/features/auth/actions';
import { HamperList } from '@/features/hampers/HamperList';

export default async function AdminHampersPage() {
  await requireAuth();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Hampers</h1>
          <p>Manage gift hamper bundles for festivals.</p>
        </div>
        <a href="/admin/hampers/new" className="btn btn-primary btn-md">
          <span className="btn-label">Add Hamper</span>
        </a>
      </div>

      <div className="mt-6">
        <HamperList />
      </div>
    </div>
  );
}
