import {
  Badge,
  Button,
  Card,
  EmptyState,
  FormField,
  FormModal,
  Input,
  PageHeader,
  SegmentedTabs,
  Skeleton,
} from '@/components/ui';
import { ADMIN_ROLE_SLUG } from '@/lib/permissions';
import { Plus, Shield, Users } from 'lucide-react';
import { type FormEvent, useMemo, useState } from 'react';
import { useAdminRbac } from '../hooks/useAdminRbac';
import { createRoleSchema } from '../types/admin.types';

/**
 * Painel dinâmico de controle de acesso (RBAC Default Deny).
 * Apenas `admin` possui acesso irrestrito; todos os outros papéis recebem permissões aqui.
 */
export function AdminPermissionsPage() {
  const {
    roles,
    permissions,
    links,
    users,
    isLoading,
    isMutating,
    createRole,
    toggleRolePermission,
    toggleUserRole,
  } = useAdminRbac();

  const [tab, setTab] = useState<'matrix' | 'users'>('matrix');
  const [isNewRoleOpen, setIsNewRoleOpen] = useState(false);
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const permissionsByModule = useMemo(() => {
    const groups = new Map<string, typeof permissions>();
    for (const perm of permissions) {
      const list = groups.get(perm.module) ?? [];
      list.push(perm);
      groups.set(perm.module, list);
    }
    return [...groups.entries()];
  }, [permissions]);

  const hasLink = (roleId: string, permissionId: string) =>
    links.some((l) => l.role_id === roleId && l.permission_id === permissionId);

  const handleCreateRole = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = createRoleSchema.safeParse({ slug, name, description });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        next[String(issue.path[0] ?? 'form')] = issue.message;
      }
      setFormErrors(next);
      return;
    }

    const ok = await createRole(parsed.data);
    if (ok) {
      setIsNewRoleOpen(false);
      setSlug('');
      setName('');
      setDescription('');
      setFormErrors({});
    }
  };

  return (
    <div className="space-y-5">
      <PageHeader
        title="Controle de Permissões (RBAC)"
        description="Bloqueio padrão ativo: novos papéis nascem sem acesso até serem liberados abaixo."
        actions={
          <Button onClick={() => setIsNewRoleOpen(true)}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Novo papel
          </Button>
        }
      />

      <SegmentedTabs
        value={tab}
        onChange={setTab}
        options={[
          { value: 'matrix', label: 'Papéis e Permissões', icon: Shield, count: roles.length },
          { value: 'users', label: 'Usuários', icon: Users, count: users.length },
        ]}
      />

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : tab === 'matrix' ? (
        roles.length === 0 ? (
          <EmptyState
            title="Nenhum papel configurado"
            description="Conecte ao Supabase e rode as migrations/seed para gerenciar papéis."
          />
        ) : (
          <Card className="overflow-x-auto" hasPadding={false}>
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted/60">
                  <th className="px-4 py-3 font-semibold text-content-muted">Permissão</th>
                  {roles.map((role) => (
                    <th key={role.id} className="px-4 py-3 text-center font-semibold">
                      <div className="inline-flex flex-col items-center gap-1">
                        <span>{role.name}</span>
                        <Badge tone={role.slug === ADMIN_ROLE_SLUG ? 'primary' : 'neutral'}>
                          {role.slug}
                        </Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {permissionsByModule.map(([moduleName, perms]) =>
                  perms.map((perm) => (
                    <tr key={perm.id} className="even:bg-surface-muted/20">
                      <td className="px-4 py-3">
                        <p className="font-medium">{perm.description}</p>
                        <p className="text-xs text-content-muted">
                          {moduleName} · <code>{perm.key}</code>
                        </p>
                      </td>
                      {roles.map((role) => {
                        const isAdminRole = role.slug === ADMIN_ROLE_SLUG;
                        const checked = isAdminRole || hasLink(role.id, perm.id);
                        return (
                          <td key={role.id} className="px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={checked}
                              disabled={isAdminRole}
                              aria-label={`${role.name}: ${perm.key}`}
                              onChange={(e) =>
                                toggleRolePermission(role.id, perm.id, e.target.checked)
                              }
                              className="h-5 w-5 accent-primary cursor-pointer disabled:cursor-not-allowed"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
        )
      ) : users.length === 0 ? (
        <EmptyState
          title="Nenhum usuário encontrado"
          description="Os usuários aparecem após o primeiro login/cadastro."
        />
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <Card
              key={user.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{user.full_name ?? 'Usuário sem nome'}</p>
                <p className="text-xs text-content-muted truncate">{user.id}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {roles.map((role) => {
                  const assigned = user.roleIds.includes(role.id);
                  return (
                    <label
                      key={role.id}
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border px-3 py-1.5 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={assigned}
                        onChange={(e) => toggleUserRole(user.id, role.id, e.target.checked)}
                        className="h-4 w-4 accent-primary"
                      />
                      <span>{role.name}</span>
                    </label>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      )}

      <FormModal
        isOpen={isNewRoleOpen}
        onClose={() => setIsNewRoleOpen(false)}
        title="Novo papel"
        subtitle="Nasce bloqueado (Default Deny). Libere as permissões na matriz após criar."
        onSubmit={handleCreateRole}
        isSubmitting={isMutating}
      >
        <FormField
          label="Identificador (slug)"
          htmlFor="role-slug"
          isRequired
          error={formErrors.slug}
        >
          <Input
            id="role-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ex: operador"
            hasError={Boolean(formErrors.slug)}
          />
        </FormField>
        <FormField label="Nome" htmlFor="role-name" isRequired error={formErrors.name}>
          <Input
            id="role-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: Operador"
            hasError={Boolean(formErrors.name)}
          />
        </FormField>
        <FormField label="Descrição" htmlFor="role-desc" error={formErrors.description}>
          <Input
            id="role-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Opcional"
            hasError={Boolean(formErrors.description)}
          />
        </FormField>
      </FormModal>
    </div>
  );
}
