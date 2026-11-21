import { logger } from '@/lib/logger';
import type { AccessContext } from '@/lib/permissions';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { type UserProfile, authService } from '@/services/authService';
import { permissionService } from '@/services/permissionService';
import type { Session, User } from '@supabase/supabase-js';
import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  access: AccessContext;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshAccess: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const EMPTY_ACCESS: AccessContext = { roles: [], permissions: [] };

/**
 * Provedor de autenticação e contexto RBAC (carregado dinamicamente do banco).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [access, setAccess] = useState<AccessContext>(EMPTY_ACCESS);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserContext = useCallback(async (userId: string) => {
    try {
      const [userProfile, accessCtx] = await Promise.all([
        authService.getMyProfile(userId),
        permissionService.getMyAccessContext(),
      ]);
      setProfile(userProfile);
      setAccess(accessCtx);
    } catch (error) {
      logger.error('AuthProvider', 'Falha ao carregar perfil/permissões', error);
      setAccess(EMPTY_ACCESS);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      if (!isSupabaseConfigured()) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        const currentSession = await authService.getSession();
        if (!isMounted) return;
        setSession(currentSession);
        if (currentSession?.user) {
          await loadUserContext(currentSession.user.id);
        }
      } catch (error) {
        logger.error('AuthProvider', 'Erro ao inicializar sessão', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    init();

    if (!isSupabaseConfigured()) return;

    const { data: subscription } = getSupabaseClient().auth.onAuthStateChange(
      async (_event, nextSession) => {
        setSession(nextSession);
        if (nextSession?.user) {
          await loadUserContext(nextSession.user.id);
        } else {
          setProfile(null);
          setAccess(EMPTY_ACCESS);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [loadUserContext]);

  const signIn = useCallback(async (email: string, password: string) => {
    await authService.signInWithPassword(email, password);
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setSession(null);
    setProfile(null);
    setAccess(EMPTY_ACCESS);
  }, []);

  const refreshAccess = useCallback(async () => {
    if (!session?.user) return;
    await loadUserContext(session.user.id);
  }, [loadUserContext, session?.user]);

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        profile,
        access,
        isLoading,
        isAuthenticated: Boolean(session?.user),
        signIn,
        signOut,
        refreshAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Retorna o estado atual de autenticação e contexto RBAC. */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }
  return ctx;
}
