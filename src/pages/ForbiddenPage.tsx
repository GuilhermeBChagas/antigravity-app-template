import { Button } from '@/components/ui';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

/** Tela exibida quando o usuário não possui a permissão exigida (Default Deny). */
export function ForbiddenPage() {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-4 text-center p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-danger">
        <ShieldAlert className="h-7 w-7" aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-xl font-bold">Acesso restrito</h1>
        <p className="mt-1 max-w-sm text-sm text-content-muted">
          Você não possui permissão para acessar este módulo. Solicite liberação no painel de
          permissões ao administrador.
        </p>
      </div>
      <Link to="/">
        <Button variant="outline">Voltar ao início</Button>
      </Link>
    </div>
  );
}
