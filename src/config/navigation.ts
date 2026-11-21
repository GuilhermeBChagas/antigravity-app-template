import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, ListChecks, Settings, Shield } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  to: string;
  icon: LucideIcon;
  /** Chave de permissão obrigatória (itens sem permission ficam restritos a admin). */
  permission?: string;
}

/**
 * Itens de navegação principal filtrados dinamicamente por `usePermissions`.
 */
export const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Painel',
    to: '/',
    icon: LayoutDashboard,
    permission: 'dashboard.read',
  },
  {
    id: 'items',
    label: 'Itens',
    to: '/items',
    icon: ListChecks,
    permission: 'items.read',
  },
  {
    id: 'settings',
    label: 'Configurações',
    to: '/settings',
    icon: Settings,
    permission: 'settings.read',
  },
  {
    id: 'admin-permissions',
    label: 'Permissões',
    to: '/admin/permissoes',
    icon: Shield,
    permission: 'admin.roles.manage',
  },
];
