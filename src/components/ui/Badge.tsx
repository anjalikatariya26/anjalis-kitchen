import { cn } from '@/lib/cn';
import { JainSymbol } from './JainSymbol';

type BadgeVariant = 'default' | 'jain' | 'festive' | 'available' | 'unavailable' | 'success' | 'warning' | 'error' | 'gold';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'badge-default',
  jain: 'badge-jain',
  festive: 'badge-festive',
  available: 'badge-available',
  unavailable: 'badge-unavailable',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  gold: 'badge-festive',
};

export function Badge({ variant = 'default', children, className, dot }: BadgeProps) {
  return (
    <span className={cn('badge', variantClasses[variant], className)}>
      {variant === 'jain' && <JainSymbol size={12} className="inline mr-1" />}
      {dot && <span className="badge-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

