import { getErrorMessage } from '@/utils/networkUtils';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { adminRbacService } from '../services/adminRbacService';
import type {
  CreateRoleInput,
  PermissionRecord,
  ProfileSummary,
  RolePermissionLink,
  RoleRecord,
} from '../types/admin.types';

/** Hook de gerenciamento dinâmico de papéis, permissões e vínculos de usuários. */
export function useAdminRbac() {
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [permissions, setPermissions] = useState<PermissionRecord[]>([]);
  const [links, setLinks] = useState<RolePermissionLink[]>([]);
  const [users, setUsers] = useState<ProfileSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const [r, p, l, u] = await Promise.all([
        adminRbacService.listRoles(),
        adminRbacService.listPermissions(),
        adminRbacService.listRolePermissions(),
        adminRbacService.listUsersWithRoles(),
      ]);
      setRoles(r);
      setPermissions(p);
      setLinks(l);
      setUsers(u);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao carregar configurações de RBAC.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const createRole = useCallback(async (input: CreateRoleInput) => {
    setIsMutating(true);
    try {
      const created = await adminRbacService.createRole(input);
      setRoles((prev) => [...prev, created]);
      toast.success(`Papel "${created.name}" criado (sem permissões iniciais).`);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, 'Falha ao criar papel.'));
      return false;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const toggleRolePermission = useCallback(
    async (roleId: string, permissionId: string, nextEnabled: boolean) => {
      try {
        await adminRbacService.setRolePermission(roleId, permissionId, nextEnabled);
        setLinks((prev) =>
          nextEnabled
            ? [...prev, { role_id: roleId, permission_id: permissionId }]
            : prev.filter((l) => !(l.role_id === roleId && l.permission_id === permissionId))
        );
      } catch (error) {
        toast.error(getErrorMessage(error, 'Falha ao atualizar permissão.'));
      }
    },
    []
  );

  const toggleUserRole = useCallback(
    async (userId: string, roleId: string, nextAssigned: boolean) => {
      try {
        await adminRbacService.setUserRole(userId, roleId, nextAssigned);
        setUsers((prev) =>
          prev.map((u) =>
            u.id !== userId
              ? u
              : {
                  ...u,
                  roleIds: nextAssigned
                    ? [...u.roleIds, roleId]
                    : u.roleIds.filter((id) => id !== roleId),
                }
          )
        );
        toast.success('Vínculo atualizado.');
      } catch (error) {
        toast.error(getErrorMessage(error, 'Falha ao atualizar papel do usuário.'));
      }
    },
    []
  );

  return {
    roles,
    permissions,
    links,
    users,
    isLoading,
    isMutating,
    createRole,
    toggleRolePermission,
    toggleUserRole,
  };
}
