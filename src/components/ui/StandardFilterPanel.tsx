import { cn } from '@/lib/cn';
import { Search, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from './Button';

export interface StandardFilterPanelProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  onClear?: () => void;
  hasActiveFilters?: boolean;
  children?: ReactNode;
  className?: string;
}

/** Barra padrão de busca e filtros com flex-wrap defensivo para evitar overflow. */
export function StandardFilterPanel({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  onClear,
  hasActiveFilters = false,
  children,
  className,
}: StandardFilterPanelProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2.5 rounded-2xl border border-border bg-surface-elevated p-3',
        className
      )}
    >
      <div className="relative flex-1 min-w-52">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="w-full min-h-11 rounded-xl border border-border bg-surface pl-9 pr-3 text-sm text-content placeholder:text-content-muted focus-visible:outline-2 focus-visible:outline-primary"
        />
      </div>
      {children}
      {(hasActiveFilters || searchValue.length > 0) && onClear && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="h-4 w-4" aria-hidden="true" />
          Limpar
        </Button>
      )}
    </div>
  );
}

StandardFilterPanel.displayName = 'StandardFilterPanel';
