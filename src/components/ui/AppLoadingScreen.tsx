import { Loader2 } from 'lucide-react';

export interface AppLoadingScreenProps {
  message?: string;
}

/** Tela inicial de carregamento enquanto a sessão e permissões são resolvidas. */
export function AppLoadingScreen({ message = 'Carregando aplicação...' }: AppLoadingScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-surface p-6 text-content">
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm text-content-muted">{message}</p>
    </div>
  );
}

AppLoadingScreen.displayName = 'AppLoadingScreen';

