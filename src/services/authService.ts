import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
}

const PROFILE_COLUMNS = 'id, full_name, avatar_url, is_active';

/** Serviço de autenticação e perfil do usuário autenticado. */
export const authService = {
  async getSession(): Promise<Session | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await getSupabaseClient().auth.getSession();
    if (error) throw error;
    return data.session;
  },

  async signInWithPassword(email: string, password: string): Promise<User | null> {
    const { data, error } = await getSupabaseClient().auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  },

  async signOut(): Promise<void> {
    if (!isSupabaseConfigured()) return;
    const { error } = await getSupabaseClient().auth.signOut();
    if (error) throw error;
  },

  async getMyProfile(userId: string): Promise<UserProfile | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await getSupabaseClient()
      .from('profiles')
      .select(PROFILE_COLUMNS)
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data as UserProfile | null;
  },
};
