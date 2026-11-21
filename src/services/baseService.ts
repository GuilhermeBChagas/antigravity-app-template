import { getSupabaseClient } from '@/lib/supabase';

/**
 * Helper base para serviços Supabase: centraliza paginação e tratamento de erros.
 * Nunca use `*` em queries — declare colunas explícitas em cada service.
 */
export function getPaginationRange(page: number, pageSize = 20): { from: number; to: number } {
  const safePage = Math.max(1, page);
  const from = (safePage - 1) * pageSize;
  const to = from + pageSize - 1;
  return { from, to };
}

export function getDb() {
  return getSupabaseClient();
}
