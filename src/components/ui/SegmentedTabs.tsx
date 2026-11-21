import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useId } from 'react';

export interface SegmentedTabOption<T extends string> {
  value: T;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

export interface SegmentedTabsProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SegmentedTabOption<T>[];
  className?: string;
}

/** Abas segmentadas responsivas com indicador deslizante animado e rolagem horizontal em telas estreitas. */
export function SegmentedTabs<T extends string>({
  value,
  onChange,
  options,
  className,
}: SegmentedTabsProps<T>) {
  const layoutGroupId = useId();

  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex max-w-full overflow-x-auto rounded-2xl border border-border bg-surface-muted p-1 gap-1',
        className
      )}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer',
              isActive ? 'text-content' : 'text-content-muted hover:text-content'
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`segmented-pill-${layoutGroupId}`}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className="absolute inset-0 rounded-xl bg-surface-elevated shadow-xs"
                aria-hidden="true"
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
              <span>{opt.label}</span>
              {typeof opt.count === 'number' && (
                <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs tabular-nums">
                  {opt.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

SegmentedTabs.displayName = 'SegmentedTabs';
