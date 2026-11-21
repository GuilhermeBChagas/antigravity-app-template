import { ScrollToTopButton } from '@/components/ui';
import { navigationItems } from '@/config/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { MobileBottomNav } from './MobileBottomNav';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

/**
 * Shell principal da aplicação autenticada.
 * Filtra os itens de navegação dinamicamente via `usePermissions` (Default Deny).
 */
export function AppShell() {
  const { user, profile, signOut } = useAuth();
  const { can } = usePermissions();

  const allowedNavItems = useMemo(
    () => navigationItems.filter((item) => can(item.permission)),
    [can]
  );

  const displayName = profile?.full_name ?? user?.email ?? 'Usuário';

  return (
    <div className="flex min-h-dvh bg-surface text-content">
      <Sidebar
        items={allowedNavItems}
        userName={displayName}
        userEmail={user?.email}
        onSignOut={signOut}
      />

      <div className="flex flex-1 flex-col min-w-0">
        <Topbar userName={displayName} onSignOut={signOut} />
        <main className="flex-1 p-4 pb-24 sm:p-6 md:pb-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav items={allowedNavItems} />
      <ScrollToTopButton />
    </div>
  );
}

AppShell.displayName = 'AppShell';
