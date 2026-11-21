import { isSupabaseConfigured } from '@/lib/supabase';
import { getDb } from '@/services/baseService';
import type {
  CreateRoleInput,
  PermissionRecord,
  ProfileSummary,
  RolePermissionLink,
  RoleRecord,
} from '../types/admin.types';

const ROLE_COLS = 'id, slug, name, description, is_system';
const PERMISSION_COLS = 'id, key, module, description';
const PROFILE_COLS = 'id, full_name, is_active';

/** Serviço administrativo de RBAC (somente colunas explícitas, sem SELECT *). */
export const adminRbacService = {
  async listRoles(): Promise<RoleRecord[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await getDb()
      .from('roles')
      .select(ROLE_COLS)
      .order('is_system', { ascending: false })
      .order('name', { ascending: true });
    if (error) throw error;
    return (data ?? []) as RoleRecord[];
  },

  async listPermissions(): Promise<PermissionRecord[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await getDb()
      .from('permissions')
      .select(PERMISSION_COLS)
      .order('module', { ascending: true })
      .order('key', { ascending: true });
    if (error) throw error;
    return (data ?? []) as PermissionRecord[];
  },

  async listRolePermissions(): Promise<RolePermissionLink[]> {
    if (!isSupabaseConfigured()) return [];
    const { data, error } = await getDb().from('role_permissions').select('role_id, permission_id');
    if (error) throw error;
    return (data ?? []) as RolePermissionLink[];
  },

  async createRole(input: CreateRoleInput): Promise<RoleRecord> {
    const { data, error } = await getDb()
      .from('roles')
      .insert({
        slug: input.slug,
        name: input.name,
        description: input.description || null,
        is_system: false,
      })
      .select(ROLE_COLS)
      .single();
    if (error) throw error;
    return data as RoleRecord;
  },

  async setRolePermission(roleId: string, permissionId: string, enabled: boolean): Promise<void> {
    if (enabled) {
      const { error } = await getDb()
        .from('role_permissions')
        .insert({ role_id: roleId, permission_id: permissionId });
      if (error) throw error;
    } else {
      const { error } = await getDb()
        .from('role_permissions')
        .delete()
        .eq('role_id', roleId)
        .eq('permission_id', permissionId);
      if (error) throw error;
    }
  },

  async listUsersWithRoles(): Promise<ProfileSummary[]> {
    if (!isSupabaseConfigured()) return [];
    const [profilesRes, userRolesRes] = await Promise.all([
      getDb()
        .from('profiles')
        .select(PROFILE_COLS)
        .order('full_name', { ascending: true })
        .range(0, 99),
      getDb().from('user_roles').select('user_id, role_id'),
    ]);
    if (profilesRes.error) throw profilesRes.error;
    if (userRolesRes.error) throw userRolesRes.error;

    const rolesByUser = new Map<string, string[]>();
    for (const link of userRolesRes.data ?? []) {
      const current = rolesByUser.get(link.user_id) ?? [];
      current.push(link.role_id);
      rolesByUser.set(link.user_id, current);
    }

    return (profilesRes.data ?? []).map((p) => ({
      id: p.id,
      full_name: p.full_name,
      is_active: p.is_active,
      roleIds: rolesByUser.get(p.id) ?? [],
    }));
  },

  async setUserRole(userId: string, roleId: string, assigned: boolean): Promise<void> {
    if (assigned) {
      const { error } = await getDb()
        .from('user_roles')
        .insert({ user_id: userId, role_id: roleId });
      if (error) throw error;
    } else {
      const { error } = await getDb()
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role_id', roleId);
      if (error) throw error;
    }
  },
};
