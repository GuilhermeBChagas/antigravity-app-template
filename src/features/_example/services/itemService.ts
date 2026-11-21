import { isSupabaseConfigured } from '@/lib/supabase';
import { getDb, getPaginationRange } from '@/services/baseService';
import type { ExampleItem, ExampleItemInput } from '../types/item.types';

const ITEM_COLUMNS = 'id, title, description, status, created_at, updated_at';

/**
 * Serviço de exemplo demonstrando colunas explícitas, paginação e soft delete.
 */
export const itemService = {
  async list(page = 1, pageSize = 20): Promise<ExampleItem[]> {
    if (!isSupabaseConfigured()) return [];
    const { from, to } = getPaginationRange(page, pageSize);

    const { data, error } = await getDb()
      .from('example_items')
      .select(ITEM_COLUMNS)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return (data ?? []) as ExampleItem[];
  },

  async create(input: ExampleItemInput): Promise<ExampleItem> {
    const { data, error } = await getDb()
      .from('example_items')
      .insert({
        title: input.title,
        description: input.description || null,
        status: input.status,
      })
      .select(ITEM_COLUMNS)
      .single();

    if (error) throw error;
    return data as ExampleItem;
  },

  async update(id: string, input: ExampleItemInput): Promise<ExampleItem> {
    const { data, error } = await getDb()
      .from('example_items')
      .update({
        title: input.title,
        description: input.description || null,
        status: input.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select(ITEM_COLUMNS)
      .single();

    if (error) throw error;
    return data as ExampleItem;
  },

  async softDelete(id: string): Promise<void> {
    const { error } = await getDb()
      .from('example_items')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
  },
};

