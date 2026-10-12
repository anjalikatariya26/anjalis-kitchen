/**
 * Admin — Add New Hamper page.
 */
import { requireAuth } from '@/features/auth/actions';
import { HamperForm } from '@/features/hampers/HamperForm';

export default async function AdminNewHamperPage() {
  await requireAuth();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Add Hamper</h1>
          <p>Create a new gift hamper bundle.</p>
        </div>
        <a href="/admin/hampers" className="btn btn-ghost btn-md">
          <span className="btn-label">← Back to Hampers</span>
        </a>
      </div>

      <div className="mt-6">
        <HamperForm />
      </div>
    </div>
  );
}
