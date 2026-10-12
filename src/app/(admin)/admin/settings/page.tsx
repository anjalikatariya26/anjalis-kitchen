/**
 * Admin Settings page — Password change, business profile.
 * Phase 2 completion: password change form.
 */
import { requireAuth } from '@/features/auth/actions';
import { PasswordChangeForm } from '@/features/auth/PasswordChangeForm';

export default async function AdminSettingsPage() {
  const user = await requireAuth();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-text">
          <h1>Settings</h1>
          <p>Manage your password and business profile.</p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Password Change Section */}
        <section
          className="rounded-xl border p-6"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Change Password
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
            Update your password. You&apos;ll be signed out of all other sessions.
          </p>
          <div className="mt-5 max-w-md">
            <PasswordChangeForm />
          </div>
        </section>

        {/* Business Profile Section — placeholder for Phase 4+ */}
        <section
          className="rounded-xl border p-6"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Business Profile
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-muted)' }}>
            Manage your business name, phone, WhatsApp number, and address.
          </p>
          <div
            className="mt-4 flex items-center justify-center rounded-lg border-2 border-dashed p-8"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-muted)',
            }}
          >
            <p className="text-sm">Business profile management coming soon.</p>
          </div>
        </section>

        {/* Account Info */}
        <section
          className="rounded-xl border p-6"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Account
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  Email
                </p>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
