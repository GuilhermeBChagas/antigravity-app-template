import { useCallback, useEffect, useRef, useState } from 'react';

interface UseVersionCheckOptions {
  isEnabled?: boolean;
  intervalMs?: number;
}

/**
 * Detecta quando uma nova versão do build foi publicada comparando ETag/Last-Modified do `index.html`.
 */
export function useVersionCheck({
  isEnabled = import.meta.env.PROD,
  intervalMs = 5 * 60 * 1000,
}: UseVersionCheckOptions = {}) {
  const [hasUpdate, setHasUpdate] = useState(false);
  const initialTagRef = useRef<string | null>(null);

  const checkNow = useCallback(async () => {
    if (!isEnabled) return;
    try {
      const res = await fetch('/', { method: 'HEAD', cache: 'no-store' });
      const tag = res.headers.get('etag') ?? res.headers.get('last-modified');
      if (!tag) return;
      if (!initialTagRef.current) {
        initialTagRef.current = tag;
      } else if (initialTagRef.current !== tag) {
        setHasUpdate(true);
      }
    } catch {
      // Silencioso em modo offline
    }
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;
    checkNow();
    const timer = window.setInterval(checkNow, intervalMs);
    const onFocus = () => checkNow();
    window.addEventListener('focus', onFocus);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', onFocus);
    };
  }, [checkNow, intervalMs, isEnabled]);

  const reloadApp = useCallback(() => {
    window.location.reload();
  }, []);

  return { hasUpdate, checkNow, reloadApp };
}
