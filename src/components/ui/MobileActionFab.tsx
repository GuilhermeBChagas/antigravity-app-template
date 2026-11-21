import { cn } from '@/lib/cn';
import type { LucideIcon } from 'lucide-react';
import { Plus } from 'lucide-react';

export interface MobileActionFabProps {
  onClick: () => void;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

/** Botão flutuante de ação principal exclusivo para mobile, respeitando zona do polegar e safe-area. */
export function MobileActionFab({
  onClick,
  label,
  icon: Icon = Plus,
  className,
}: MobileActionFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95 md:hidden cursor-pointer',
        className
      )}
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}

MobileActionFab.displayName = 'MobileActionFab';
