import { logger } from '@/lib/logger';
import { AlertOctagon } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Fronteira de erro React para evitar tela branca em falhas inesperadas de renderização. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error('ErrorBoundary', 'Erro não tratado na árvore React', { error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-surface p-6 text-center text-content">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-danger">
            <AlertOctagon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Algo deu errado</h1>
            <p className="mt-1 text-sm text-content-muted">
              Recarregue a página para tentar novamente.
            </p>
          </div>
          <Button onClick={() => window.location.reload()}>Recarregar página</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
