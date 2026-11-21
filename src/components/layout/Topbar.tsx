import { Button, UserAvatar } from '@/components/ui';
import { appConfig } from '@/config/app';
import { LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export interface TopbarProps {
  userName?: string | null;
  onSignOut: () => void;
}

/** Barra superior compacta com título no mobile, alternador de tema e saída rápida. */
export function Topbar({ userName, onSignOut }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-surface-elevated/90 backdrop-blur-md px-4 sm:px-6">
      <div className="flex items-center gap-2.5 md:hidden min-w-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-bold shrink-0">
          A
        </div>
        <span className="font-semibold truncate">{appConfig.name}</span>
      </div>

      <div className="hidden md:block" />

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="flex items-center gap-2 md:hidden">
          <UserAvatar name={userName} size="sm" />
          <Button variant="ghost" size="icon" onClick={onSignOut} aria-label="Sair">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

Topbar.displayName = 'Topbar';
