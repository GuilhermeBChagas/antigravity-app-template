import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-content-muted border-border',
  primary: 'bg-primary/10 text-primary border-primary/20',
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  danger: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

/** Rótulo compacto para categorias, tags e status. */
export function Badge({ className, tone = 'neutral', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';

export interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'archived' | string;
  label?: string;
}

const statusMap: Record<string, { tone: BadgeTone; label: string }> = {
  active: { tone: 'success', label: 'Ativo' },
  inactive: { tone: 'neutral', label: 'Inativo' },
  pending: { tone: 'warning', label: 'Pendente' },
  archived: { tone: 'danger', label: 'Arquivado' },
};

/** Badge semântico mapeado por status genérico. */
export function StatusBadge({ status, label }: StatusBadgeProps) {
  const mapped = statusMap[status] ?? { tone: 'neutral' as BadgeTone, label: status };
  return <Badge tone={mapped.tone}>{label ?? mapped.label}</Badge>;
}

StatusBadge.displayName = 'StatusBadge';
