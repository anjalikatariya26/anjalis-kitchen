/**
 * Admin Login Page — Premium Spatial Authentication Portal.
 * Features: Multi-depth background, floating kitchen elements,
 * glassmorphism card, gradient accents, and premium form styling.
 */

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/features/auth/actions';
import { LoginForm } from '@/features/auth/LoginForm';
import { Lock, ShieldCheck, ArrowLeft, ChefHat } from 'lucide-react';
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1A0508] via-[#2B080C] to-[#1A0508] flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Spatial depth layers */}
      <div className="orb orb-gold w-[500px] h-[500px] -top-32 -right-20" style={{ animationDelay: '0s' }} />
      <div className="orb orb-rose w-[400px] h-[400px] bottom-0 -left-20" style={{ animationDelay: '5s' }} />
      <div className="orb orb-amber w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '10s' }} />

      {/* Floating kitchen theme elements */}
      <div className="absolute top-[12%] left-[8%] text-4xl opacity-15 animate-float-slow">🪔</div>
      <div className="absolute top-[25%] right-[10%] text-3xl opacity-10 animate-float-medium" style={{ animationDelay: '2s' }}>🍯</div>
      <div className="absolute bottom-[15%] left-[15%] text-3xl opacity-10 animate-float-fast" style={{ animationDelay: '1s' }}>🧈</div>
      <div className="absolute bottom-[30%] right-[15%] text-2xl opacity-10 animate-float-slow" style={{ animationDelay: '3s' }}>🪷</div>

      {/* Sparkle particles */}
      <div className="absolute top-16 left-[30%] w-2 h-2 rounded-full bg-amber-400/40 animate-twinkle" />
      <div className="absolute top-[40%] right-[25%] w-1.5 h-1.5 rounded-full bg-amber-300/30 animate-twinkle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-24 left-[45%] w-2 h-2 rounded-full bg-rose-400/20 animate-twinkle" style={{ animationDelay: '2s' }} />

      {/* Top Bar */}
      <div className="relative z-10 mx-auto w-full max-w-5xl flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-amber-200/70 hover:text-amber-100 transition-colors group"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Storefront
        </Link>
        <div className="flex items-center gap-2 text-xs text-amber-200/40">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="font-mono">Secure Auth v2.0</span>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 mx-auto w-full max-w-md my-auto py-8 reveal-up">
        <div className="rounded-3xl border border-amber-400/20 bg-white/95 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-black/60 space-y-7 relative overflow-hidden">
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400" />

          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7A1F2B] to-[#4A101A] text-amber-300 flex items-center justify-center mx-auto shadow-lg animate-pulse-glow">
              <ChefHat className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 tracking-tight">
                Anjali&apos;s Kitchen
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Admin Portal — Authorised Access Only
              </p>
            </div>
          </div>

          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 text-center text-xs text-amber-200/30 flex items-center justify-center gap-1">
        © {new Date().getFullYear()} Anjali&apos;s Kitchen. All rights reserved.
      </div>
    </div>
  );
}
