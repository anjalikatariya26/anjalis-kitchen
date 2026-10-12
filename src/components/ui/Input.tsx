'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@/lib/cn';

/* ─── Input ─────────────────────────────────────────── */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { label, hint, error, icon, className, wrapperClassName, id: propId, ...rest },
    ref
  ) {
    const autoId = useId();
    const id = propId ?? autoId;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('field-wrapper', wrapperClassName)}>
        <label htmlFor={id} className="field-label">
          {label}
        </label>
        <div className="field-input-wrap">
          {icon && <span className="field-icon">{icon}</span>}
          <input
            ref={ref}
            id={id}
            className={cn(
              'field-input',
              icon && 'field-input--has-icon',
              error && 'field-input--error',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            {...rest}
          />
        </div>
        {hint && !error && (
          <p id={hintId} className="field-hint">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="field-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

/* ─── Textarea ──────────────────────────────────────── */

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
  charCount?: { current: number; max: number };
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, hint, error, charCount, className, wrapperClassName, id: propId, ...rest },
    ref
  ) {
    const autoId = useId();
    const id = propId ?? autoId;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className={cn('field-wrapper', wrapperClassName)}>
        <div className="field-label-row">
          <label htmlFor={id} className="field-label">
            {label}
          </label>
          {charCount && (
            <span
              className={cn(
                'field-char-count',
                charCount.current > charCount.max && 'field-char-count--over'
              )}
            >
              {charCount.current}/{charCount.max}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'field-input field-textarea',
            error && 'field-input--error',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...rest}
        />
        {hint && !error && (
          <p id={hintId} className="field-hint">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="field-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
