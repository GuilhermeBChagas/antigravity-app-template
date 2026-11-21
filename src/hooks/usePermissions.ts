import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_ROLE_SLUG, hasAccess } from '@/lib/permissions';
import { useCallback, useMemo } from 'react';

/**
 * Hook de autorização RBAC (Default Deny).
 * Apenas `admin` tem bypass fixo; demais papéis dependem das permissões vindas do banco.
 */
export function usePermissions() {
  const { access, isLoading } = useAuth();

  const isAdmin = useMemo(() => access.roles.includes(ADMIN_ROLE_SLUG), [access.roles]);

  const can = useCallback((permission?: string) => hasAccess(access, permission), [access]);

  return {
    isAdmin,
    roles: access.roles,
    permissions: access.permissions,
    isLoading,
    can,
  };
}
