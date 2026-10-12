'use client';

/**
 * LoginForm — Luxury Admin Portal Login Form.
 * Includes autofill helper for instant admin authentication.
 */

import { useActionState, useState } from 'react';
import { loginAction, type ActionResult } from '@/features/auth/actions';
import { Lock, Mail, Key, Sparkles, ShieldCheck } from 'lucide-react';

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    loginAction,
    null
  );

  const [emailVal, setEmailVal] = useState('admin@anjaliskitchen.com');
  const [passwordVal, setPasswordVal] = useState('AdminPassword123!');

  const fillDefaultCredentials = () => {
    setEmailVal('admin@anjaliskitchen.com');
    setPasswordVal('AdminPassword123!');
  };

  return (
    <div className="space-y-6">
      {/* Dev helper credential banner */}
      <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span>Default Admin Credentials:</span>
          </div>
          <button
            type="button"
            onClick={fillDefaultCredentials}
            className="text-[11px] font-bold text-maroon-800 bg-white hover:bg-maroon-50 px-2.5 py-1 rounded-lg border border-amber-300 shadow-sm transition-colors"
          >
            Auto-fill
          </button>
        </div>
        <div className="text-xs text-slate-700 font-mono space-y-0.5 pt-1">
          <div><span className="text-slate-500">Email:</span> admin@anjaliskitchen.com</div>
          <div><span className="text-slate-500">Pass:</span> AdminPassword123!</div>
        </div>
      </div>

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
              placeholder="admin@anjaliskitchen.com"
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
