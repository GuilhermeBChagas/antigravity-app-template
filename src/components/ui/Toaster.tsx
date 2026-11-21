import { useTheme } from '@/contexts/ThemeContext';
import { Toaster as SonnerToaster } from 'sonner';

/** Toaster padronizado usando Sonner integrado ao tema light/dark. */
export function Toaster() {
  const { resolvedTheme } = useTheme();
  return <SonnerToaster theme={resolvedTheme} position="top-right" richColors closeButton />;
}

Toaster.displayName = 'Toaster';
