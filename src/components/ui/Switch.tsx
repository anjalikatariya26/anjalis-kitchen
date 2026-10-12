'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/cn';
import { useId } from 'react';

interface SwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

export function Switch({
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
  size = 'md',
  className,
  id: propId,
}: SwitchProps) {
  const autoId = useId();
  const id = propId ?? autoId;
  const descId = description ? `${id}-desc` : undefined;

  return (
    <div className={cn('switch-wrapper', className)}>
      <div className="switch-text">
        <label htmlFor={id} className="switch-label">
          {label}
        </label>
        {description && (
          <p id={descId} className="switch-description">
            {description}
          </p>
        )}
      </div>
      <SwitchPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-describedby={descId}
        className={cn(
          'switch-root',
          size === 'sm' ? 'switch-root--sm' : 'switch-root--md',
          checked ? 'switch-root--on' : 'switch-root--off'
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'switch-thumb',
            size === 'sm' ? 'switch-thumb--sm' : 'switch-thumb--md'
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
}
