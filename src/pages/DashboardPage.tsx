import { Card, KpiCard, PageHeader } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { Activity, ShieldCheck, Users } from 'lucide-react';

/** Painel inicial genérico com cartões de KPI e resumo de acesso RBAC. */
export function DashboardPage() {
  const { profile, user } = useAuth();
  const { isAdmin, roles, permissions } = usePermissions();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Painel Inicial"
        description={`Bem-vindo, ${profile?.full_name ?? user?.email ?? 'usuário'}.`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          label="Papéis Ativos"
          value={roles.length}
          hint={roles.join(', ') || 'Nenhum papel atribuído'}
          icon={Users}
          tone="primary"
        />
        <KpiCard
          label="Permissões Carregadas"
          value={isAdmin ? 'Todas (Admin)' : permissions.length}
          hint="Modelo Default Deny"
          icon={ShieldCheck}
          tone="success"
        />
        <KpiCard
          label="Status da Sessão"
          value="Ativa"
          hint="Autenticado via Supabase"
          icon={Activity}
        />
      </div>

      <Card>
        <h2 className="text-base font-semibold">Próximos passos</h2>
        <p className="mt-1 text-sm text-content-muted">
          Use{' '}
          <code className="rounded bg-surface-muted px-1.5 py-0.5 text-xs">
            src/features/_example/
          </code>{' '}
          como base para novos módulos e mantenha toda nova rota protegida por{' '}
          <code className="rounded bg-surface-muted px-1.5 py-0.5 text-xs">RequirePermission</code>.
        </p>
      </Card>
    </div>
  );
}
