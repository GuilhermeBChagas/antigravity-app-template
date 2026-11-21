/** Papel supremo único permitido em código (regra RBAC Default Deny). */
export const ADMIN_ROLE_SLUG = 'admin';

export interface AccessContext {
  roles: string[];
  permissions: string[];
}

/**
 * Verifica se o contexto de acesso possui permissão para determinada chave.
 * Default Deny: apenas `admin` tem bypass; qualquer outro papel depende exclusivamente de `permissions`.
 */
export function hasAccess(context: AccessContext, requiredPermission?: string): boolean {
  if (context.roles.includes(ADMIN_ROLE_SLUG)) {
    return true;
  }
  if (!requiredPermission) {
    return false;
  }
  return context.permissions.includes(requiredPermission);
}

