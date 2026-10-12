/**
 * Admin Festivals page — List, create, edit, deactivate festivals.
 */
import { requireAuth } from '@/features/auth/actions';
import { FestivalManager } from '@/features/festivals/FestivalManager';

export default async function AdminFestivalsPage() {
  await requireAuth();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Festivals</h1>
          <p>Manage seasonal festivals for your products.</p>
        </div>
      </div>

      <div className="mt-6">
        <FestivalManager />
      </div>
    </div>
  );
}
