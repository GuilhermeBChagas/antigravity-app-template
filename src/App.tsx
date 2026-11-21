import { ErrorBoundary, Toaster } from '@/components/ui';
import { AuthProvider } from '@/contexts/AuthContext';
import { ModalProvider } from '@/contexts/ModalContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MotionConfig } from 'motion/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

/** Raiz da aplicação com provedores globais de tema, animação acessível, autenticação e erros. */
export function App() {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <AuthProvider>
            <ModalProvider>
              <RouterProvider router={router} />
              <Toaster />
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
}
