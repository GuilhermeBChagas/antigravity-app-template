import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hasPadding?: boolean;
}

/** Container elevado padrão com borda e cantos arredondados via token. */
export function Card({ className, hasPadding = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface-elevated shadow-xs',
        hasPadding && 'p-4 sm:p-5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.displayName = 'Card';
