import type { NavItem } from '@/config/navigation';
import { cn } from '@/lib/cn';
import { NavLink } from 'react-router-dom';

export interface MobileBottomNavProps {
  items: NavItem[];
}

/** Navegação inferior ergonômica para mobile (`< md`), respeitando alvos >= 44px. */
export function MobileBottomNav({ items }: MobileBottomNavProps) {
  const visibleItems = items.slice(0, 4);

  return (
    <nav
      aria-label="Navegação mobile"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface-elevated/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {visibleItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.id}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-1 min-h-14 flex-col items-center justify-center gap-1 px-2 py-1.5 text-[11px] font-medium transition-colors',
                isActive ? 'text-primary' : 'text-content-muted'
              )
            }
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span className="truncate max-w-full">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

MobileBottomNav.displayName = 'MobileBottomNav';
