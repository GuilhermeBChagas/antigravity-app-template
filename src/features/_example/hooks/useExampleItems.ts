import { getErrorMessage } from '@/utils/networkUtils';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { itemService } from '../services/itemService';
import type { ExampleItem, ExampleItemInput } from '../types/item.types';

/** Hook CRUD de exemplo com feedback via toast e atualização otimista/segura. */
export function useExampleItems() {
  const [items, setItems] = useState<ExampleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const list = await itemService.list();
      setItems(list);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Falha ao carregar itens.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const createItem = useCallback(async (input: ExampleItemInput) => {
    setIsMutating(true);
    try {
      const created = await itemService.create(input);
      setItems((prev) => [created, ...prev]);
      toast.success('Item criado com sucesso.');
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao criar item.'));
      return false;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const updateItem = useCallback(async (id: string, input: ExampleItemInput) => {
    setIsMutating(true);
    try {
      const updated = await itemService.update(id, input);
      setItems((prev) => prev.map((it) => (it.id === id ? updated : it)));
      toast.success('Item atualizado.');
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao atualizar item.'));
      return false;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    setIsMutating(true);
    try {
      await itemService.softDelete(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
      toast.success('Item removido.');
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error, 'Erro ao remover item.'));
      return false;
    } finally {
      setIsMutating(false);
    }
  }, []);

  return { items, isLoading, isMutating, reload, createItem, updateItem, deleteItem };
}
