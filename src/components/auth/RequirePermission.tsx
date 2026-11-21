import { AppLoadingScreen } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export interface RequireAuthProps {
  children: ReactNode;
}

/** Garante que o usuário esteja autenticado antes de acessar rotas internas. */
export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <AppLoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export interface RequirePermissionProps {
  /** Permissão exigida. Se omitida, apenas `admin` tem acesso (Default Deny). */
  permission?: string;
  children: ReactNode;
}

/**
 * Guard de rota/componente (RBAC Default Deny).
 * Apenas `admin` tem bypass; outros papéis precisam da chave em `role_permissions`.
 */
export function RequirePermission({ permission, children }: RequirePermissionProps) {
  const { can, isLoading } = usePermissions();

  if (isLoading) {
    return <AppLoadingScreen message="Verificando permissões..." />;
  }

  if (!can(permission)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}
