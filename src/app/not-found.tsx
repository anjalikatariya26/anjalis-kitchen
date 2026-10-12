/**
 * 404 Not Found — Premium themed error page with spatial design.
 */
import Link from 'next/link';
import { Home, ArrowLeft, MessageCircle, ChefHat } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B080C] via-[#4A101A] to-[#1A0508] text-white flex items-center justify-center relative overflow-hidden">
      {/* Spatial depth layers */}
      <div className="orb orb-gold w-[500px] h-[500px] -top-32 -right-20" />
      <div className="orb orb-rose w-[400px] h-[400px] bottom-0 -left-20" />

      {/* Floating themed elements */}
      <div className="absolute top-[20%] left-[15%] text-5xl opacity-15 animate-float-slow">🪔</div>
      <div className="absolute bottom-[25%] right-[10%] text-4xl opacity-10 animate-float-medium" style={{ animationDelay: '2s' }}>🍯</div>
      <div className="absolute top-[60%] left-[60%] text-3xl opacity-10 animate-float-fast" style={{ animationDelay: '1s' }}>🎁</div>

      {/* Sparkle particles */}
      <div className="absolute top-20 left-[25%] w-2 h-2 rounded-full bg-amber-400/40 animate-twinkle" />
      <div className="absolute bottom-32 right-[30%] w-1.5 h-1.5 rounded-full bg-amber-300/30 animate-twinkle" style={{ animationDelay: '1.5s' }} />

      <div className="relative text-center px-4 space-y-6 reveal-up" style={{ zIndex: 10 }}>
        {/* Logo */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-xl animate-float-slow">
          <ChefHat className="h-8 w-8" />
        </div>

        {/* 404 number */}
        <h1 className="text-8xl sm:text-9xl font-bold font-serif text-shimmer tracking-tight">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-100">
            Oops! This page went missing
          </h2>
          <p className="text-sm text-amber-200/60 max-w-md mx-auto">
            Looks like this recipe isn&apos;t in our kitchen yet. Let us guide you back to our delicious menu!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="btn btn-gold btn-md font-bold px-6 flex items-center gap-2 hover-shine"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/products"
            className="glass rounded-xl px-6 py-2.5 text-sm font-bold text-amber-200 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
