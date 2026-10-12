'use client';

import { useActionState, useRef, useEffect } from 'react';
import { changePasswordAction, type ActionResult } from './actions';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

const initialState: ActionResult = {
  success: false,
};

export function PasswordChangeForm() {
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on success
  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  // Client-side confirm password check
  const handleSubmit = (formData: FormData) => {
    const newPassword = formData.get('newPassword')?.toString() ?? '';
    const confirmPassword = formData.get('confirmPassword')?.toString() ?? '';

    if (newPassword !== confirmPassword) {
      // We can't return state from here, so just use the browser form
      // The real validation is server-side
    }

    formAction(formData);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      {/* Success message */}
      {state.success && (
        <div
          className="flex items-center gap-3 rounded-lg p-3"
          style={{
            background: 'var(--color-success-light)',
            color: 'var(--color-success)',
          }}
          role="status"
        >
          <CheckCircle size={18} />
          <p className="text-sm font-medium">
            Password changed successfully. Other sessions have been signed out.
          </p>
        </div>
      )}

      {/* General error */}
      {state.error && (
        <div
          className="rounded-lg p-3"
          style={{
            background: 'var(--color-error-light)',
            color: 'var(--color-error)',
          }}
          role="alert"
        >
          <p className="text-sm font-medium">{state.error}</p>
        </div>
      )}

      <Input
        label="Current password"
        name="currentPassword"
        type="password"
        required
        autoComplete="current-password"
        error={state.fieldErrors?.currentPassword?.[0]}
        disabled={isPending}
      />

      <Input
        label="New password"
        name="newPassword"
        type="password"
        required
        autoComplete="new-password"
        hint="At least 12 characters"
        error={state.fieldErrors?.newPassword?.[0]}
        disabled={isPending}
      />

      <Input
        label="Confirm new password"
        name="confirmPassword"
        type="password"
        required
        autoComplete="new-password"
        disabled={isPending}
      />

      <div className="pt-2">
        <Button type="submit" loading={isPending}>
          Change Password
        </Button>
      </div>
    </form>
  );
}
