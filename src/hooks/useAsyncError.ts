import { getErrorMessage } from '@/utils/networkUtils';
import { useCallback, useState } from 'react';

/** Padroniza estado de carregamento e erro para ações assíncronas. */
export function useAsyncError() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    try {
      return await fn();
    } catch (err) {
      setError(getErrorMessage(err));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { isLoading, error, run, clearError };
}
