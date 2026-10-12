/**
 * Admin Availability page — Bulk toggle product/variant availability.
 * Spec Part J5: Compact list with big on/off switches, bulk actions.
 */
import { requireAuth } from '@/features/auth/actions';
import { AvailabilityManager } from '@/features/availability/AvailabilityManager';

export default async function AdminAvailabilityPage() {
  await requireAuth();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Availability</h1>
          <p>Quickly toggle products on or off.</p>
        </div>
      </div>

      <div className="mt-6">
        <AvailabilityManager />
      </div>
    </div>
  );
}
