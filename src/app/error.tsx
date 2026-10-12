'use client';

/**
 * Error Page — Premium themed error boundary with spatial design.
 */
import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B080C] via-[#4A101A] to-[#1A0508] text-white flex items-center justify-center relative overflow-hidden">
      <div className="orb orb-gold w-[400px] h-[400px] -top-32 right-0" />
      <div className="orb orb-rose w-[300px] h-[300px] bottom-0 -left-20" />

      <div className="absolute top-[30%] left-[15%] text-4xl opacity-10 animate-float-slow">🥘</div>
      <div className="absolute bottom-[20%] right-[12%] text-3xl opacity-10 animate-float-medium" style={{ animationDelay: '2s' }}>🧈</div>

      <div className="relative text-center px-4 space-y-6 reveal-up" style={{ zIndex: 10 }}>
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-xl animate-float-slow">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
            Something Went Wrong
          </h1>
          <p className="text-sm text-amber-200/60 max-w-md mx-auto">
            Our kitchen hit a snag! Don&apos;t worry, we&apos;re working on it. Please try again.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={reset}
            className="btn btn-gold btn-md font-bold px-6 flex items-center gap-2 hover-shine"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="glass rounded-xl px-6 py-2.5 text-sm font-bold text-amber-200 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
