import { ErrorBoundary, Toaster } from '@/components/ui';
import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

/** Raiz da aplicação com provedores globais de tema, autenticação e tratamento de erros. */
export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ModalProvider>
            <RouterProvider router={router} />
            <Toaster />
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
