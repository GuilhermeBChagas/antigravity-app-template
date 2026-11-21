import { Card, PageHeader, SegmentedTabs } from '@/components/ui';
import { useTheme } from '@/contexts/ThemeContext';
import { Monitor, Moon, Sun } from 'lucide-react';

/** Página de preferências do usuário (tema claro/escuro/sistema). */
export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <PageHeader title="Configurações" description="Preferências de interface e sessão." />

      <Card className="space-y-3">
        <div>
          <h2 className="text-base font-semibold">Aparência</h2>
          <p className="text-sm text-content-muted">Escolha o tema visual da aplicação.</p>
        </div>

        <SegmentedTabs
          value={theme}
          onChange={setTheme}
          options={[
            { value: 'light', label: 'Claro', icon: Sun },
            { value: 'dark', label: 'Escuro', icon: Moon },
            { value: 'system', label: 'Sistema', icon: Monitor },
          ]}
        />
      </Card>
    </div>
  );
}
