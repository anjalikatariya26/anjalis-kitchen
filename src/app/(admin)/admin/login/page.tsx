/**
 * Admin login page — Dedicated standalone authentication portal.
 */

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/features/auth/actions';
import { LoginForm } from '@/features/auth/LoginForm';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Sign In — Anjali's Kitchen Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect('/admin');
  }

  const params = await searchParams;
  const redirectTo = params.redirect;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#3D0C11] via-[#5C131D] to-[#2B080C] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 mx-auto w-full max-w-5xl flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-amber-200 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Storefront
        </Link>
        <span className="text-xs text-amber-200/60 font-mono">Secure Auth v2.0</span>
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 mx-auto w-full max-w-md my-auto py-8">
        <div className="rounded-3xl border border-amber-400/30 bg-white/95 backdrop-blur-xl p-8 shadow-2xl shadow-black/80 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-maroon-900 text-amber-300 flex items-center justify-center mx-auto shadow-md">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight">
              Anjali&apos;s Kitchen
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Admin Portal — Authorised Access Only
            </p>
          </div>

          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 text-center text-xs text-amber-200/50">
        © {new Date().getFullYear()} Anjali&apos;s Kitchen. All rights reserved.
      </div>
    </div>
  );
}
