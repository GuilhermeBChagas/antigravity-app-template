import { Button, UserAvatar } from '@/components/ui';
import { appConfig } from '@/config/app';
import type { NavItem } from '@/config/navigation';
import { cn } from '@/lib/cn';
import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export interface SidebarProps {
  items: NavItem[];
  userName?: string | null;
  userEmail?: string | null;
  onSignOut: () => void;
}

/** Barra lateral de navegação exclusiva para desktop (`md+`). */
export function Sidebar({ items, userName, userEmail, onSignOut }: SidebarProps) {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border md:bg-surface-elevated shrink-0">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
          A
        </div>
        <span className="font-semibold tracking-tight truncate">{appConfig.name}</span>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Navegação principal">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-content-muted hover:bg-surface-muted hover:text-content'
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border p-3 space-y-2">
        <div className="flex items-center gap-2.5 px-2 py-1">
          <UserAvatar name={userName ?? userEmail} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium truncate">{userName ?? 'Usuário'}</p>
            {userEmail && <p className="text-[11px] text-content-muted truncate">{userEmail}</p>}
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onSignOut} className="w-full justify-start">
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Sair
        </Button>
      </div>
    </aside>
  );
}

Sidebar.displayName = 'Sidebar';
