import { useEffect, useRef } from 'react';

interface UseAutoLogoutOptions {
  isEnabled: boolean;
  timeoutMs?: number;
  onTimeout: () => void;
}

/**
 * Executa logout automático após período de inatividade do usuário.
 */
export function useAutoLogout({
  isEnabled,
  timeoutMs = 30 * 60 * 1000,
  onTimeout,
}: UseAutoLogoutOptions): void {
  const callbackRef = useRef(onTimeout);
  callbackRef.current = onTimeout;

  useEffect(() => {
    if (!isEnabled) return;

    let timer: number | undefined;
    const resetTimer = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => callbackRef.current(), timeoutMs);
    };

    const events: (keyof WindowEventMap)[] = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    for (const ev of events) {
      window.addEventListener(ev, resetTimer, { passive: true });
    }
    resetTimer();

    return () => {
      if (timer) window.clearTimeout(timer);
      for (const ev of events) {
        window.removeEventListener(ev, resetTimer);
      }
    };
  }, [isEnabled, timeoutMs]);
}
