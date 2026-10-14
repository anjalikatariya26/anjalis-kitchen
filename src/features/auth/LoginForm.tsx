'use client';

/**
 * LoginForm — Luxury Admin Portal Login Form.
 * Includes autofill helper for instant admin authentication.
 */

import { useActionState, useState } from 'react';
import { loginAction, type ActionResult } from '@/features/auth/actions';
import { Mail, Key, ShieldCheck } from 'lucide-react';

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    loginAction,
    null
  );

  const [emailVal, setEmailVal] = useState('');
  const [passwordVal, setPasswordVal] = useState('');

  return (
    <div className="space-y-6">

      <form action={formAction} className="space-y-4">
        {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}

        {/* Error banner */}
        {state?.error && (
          <div
            className="rounded-xl p-4 text-xs font-semibold bg-rose-50 border border-rose-200 text-rose-800"
            role="alert"
          >
            {state.error}
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              value={emailVal}
              onChange={(e) => setEmailVal(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm focus:border-maroon-700 focus:ring-2 focus:ring-maroon-700/20 outline-none transition-all disabled:opacity-50 bg-white text-slate-900"
              placeholder="anjalikatariya2@gmail.com"
            />
          </div>
          {state?.fieldErrors?.email && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Password
          </label>
          <div className="relative">
            <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              value={passwordVal}
              onChange={(e) => setPasswordVal(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm focus:border-maroon-700 focus:ring-2 focus:ring-maroon-700/20 outline-none transition-all disabled:opacity-50 bg-white text-slate-900"
            />
          </div>
          {state?.fieldErrors?.password && (
            <p className="text-xs text-rose-600 mt-1 font-medium">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full btn-lg py-3.5 text-base shadow-lg hover:shadow-xl font-bold flex items-center justify-center gap-2 mt-4"
        >
          <ShieldCheck className="h-5 w-5" />
          <span>{isPending ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
        </button>
      </form>
    </div>
  );
}
