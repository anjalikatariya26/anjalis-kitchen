import { Search, PackageOpen } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('empty-state', className)}>
      <div className="empty-state-icon">
        {icon ?? <PackageOpen size={48} strokeWidth={1.5} />}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-desc">{description}</p>}
      {action && (
        <div className="mt-4">
          <Button
            variant="primary"
            href={action.href}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}

export function NoResults({
  query,
  onClear,
}: {
  query?: string;
  onClear?: () => void;
}) {
  return (
    <EmptyState
      icon={<Search size={48} strokeWidth={1.5} />}
      title="Nothing matches these filters"
      description={query ? `No results for "${query}"` : 'Try adjusting your filters.'}
      action={onClear ? { label: 'Clear all filters', onClick: onClear } : undefined}
    />
  );
}
