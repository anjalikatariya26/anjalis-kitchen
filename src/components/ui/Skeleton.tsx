import { cn } from '@/lib/cn';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export function Skeleton({ className, width, height, rounded = 'sm' }: SkeletonProps) {
  const radiusMap = {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
  };
  return (
    <div
      className={cn('skeleton', className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: radiusMap[rounded],
      }}
      aria-hidden="true"
    />
  );
}

/* Pre-built skeleton patterns */

export function SkeletonCard() {
  return (
    <div className="card card-pad-none" aria-hidden="true">
      <Skeleton height={200} className="w-full" rounded="md" />
      <div className="p-4 space-y-3">
        <Skeleton height={14} width="60%" />
        <Skeleton height={12} width="40%" />
        <Skeleton height={16} width="30%" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2" aria-hidden="true">
      <div className="flex gap-4 py-3">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height={14} className="flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 py-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} height={12} className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
