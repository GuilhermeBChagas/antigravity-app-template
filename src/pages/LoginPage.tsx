import { Button, Card, FormField, Input } from '@/components/ui';
import { appConfig } from '@/config/app';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getErrorMessage } from '@/utils/networkUtils';
import { type FormEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/** Página de autenticação padrão com suporte a redirecionamento pós-login. */
export function LoginPage() {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured()) {
      toast.error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env antes de entrar.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signIn(email.trim(), password);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, 'Credenciais inválidas.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-surface p-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/12 blur-3xl"
      />
      <Card className="relative w-full max-w-md p-6 sm:p-8 shadow-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-lg font-bold shadow-sm">
            A
          </div>
          <h1 className="text-xl font-bold tracking-tight">{appConfig.name}</h1>
          <p className="mt-1 text-sm text-content-muted">Entre com suas credenciais de acesso.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="E-mail" htmlFor="login-email" isRequired>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@exemplo.com"
            />
          </FormField>

          <FormField label="Senha" htmlFor="login-password" isRequired>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </FormField>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
}
