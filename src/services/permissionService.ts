import type { AccessContext } from '@/lib/permissions';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

const EMPTY_ACCESS: AccessContext = { roles: [], permissions: [] };

/**
 * Busca papéis e permissões do usuário autenticado via RPC única (Anti N+1).
 */
export const permissionService = {
  async getMyAccessContext(): Promise<AccessContext> {
    if (!isSupabaseConfigured()) return EMPTY_ACCESS;

    const { data, error } = await getSupabaseClient().rpc('get_my_access_context');
    if (error) throw error;

    const payload = data as Partial<AccessContext> | null;
    return {
      roles: Array.isArray(payload?.roles) ? payload.roles : [],
      permissions: Array.isArray(payload?.permissions) ? payload.permissions : [],
    };
  },
};
