import type { Database } from '@/types/database.types';
import { type SupabaseClient, createClient } from '@supabase/supabase-js';
import { env } from './env';

let clientInstance: SupabaseClient<Database> | null = null;

/**
 * Retorna o cliente Supabase tipado em singleton.
 * Lança erro descritivo caso as variáveis públicas não estejam configuradas.
 */
export function getSupabaseClient(): SupabaseClient<Database> {
  if (clientInstance) return clientInstance;

  if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) {
    throw new Error(
      'Supabase não configurado. Copie .env.example para .env e preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
    );
  }

  clientInstance = createClient<Database>(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return clientInstance;
}

/** Indica se as variáveis públicas do Supabase estão presentes no ambiente. */
export function isSupabaseConfigured(): boolean {
  return Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY);
}
