import { logger } from '@/lib/logger';
import { useCallback, useState } from 'react';

/** Persiste estado simples em `localStorage` com fallback seguro. */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      logger.warn('useLocalStorage', `Falha ao ler chave ${key}`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch (error) {
          logger.warn('useLocalStorage', `Falha ao salvar chave ${key}`, error);
        }
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
