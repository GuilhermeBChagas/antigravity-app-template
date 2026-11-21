import { Button } from '@/components/ui';
import { Link } from 'react-router-dom';

/** Página de rota não encontrada (404). */
export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-surface p-6 text-center text-content">
      <p className="text-5xl font-bold text-primary">404</p>
      <div>
        <h1 className="text-lg font-semibold">Página não encontrada</h1>
        <p className="mt-1 text-sm text-content-muted">
          O endereço acessado não existe ou foi movido.
        </p>
      </div>
      <Link to="/">
        <Button>Ir para o início</Button>
      </Link>
    </div>
  );
}
