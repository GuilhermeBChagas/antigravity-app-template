import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';
import { Card } from './Card';

export interface KpiCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  tone?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const iconToneClasses: Record<NonNullable<KpiCardProps['tone']>, string> = {
  default: 'bg-surface-muted text-content-muted',
  primary: 'bg-primary/10 text-primary',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  danger: 'bg-red-500/10 text-danger',
};

/** Cartão de indicador numérico com proteção contra overflow em viewports compactas. */
export function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = 'default',
  className,
}: KpiCardProps) {
  return (
    <Card className={cn('flex items-start justify-between gap-3', className)}>
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-medium text-content-muted truncate">{label}</p>
        <p className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight tabular-nums truncate">
          {value}
        </p>
        {hint && <p className="mt-1 text-xs text-content-muted truncate">{hint}</p>}
      </div>
      {Icon && (
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl',
            iconToneClasses[tone]
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
    </Card>
  );
}

KpiCard.displayName = 'KpiCard';
