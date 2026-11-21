import { useEffect, useState } from 'react';

/** Observa uma media query CSS de forma reativa. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);

  return matches;
}

/** Retorna `true` quando a viewport é mobile (`< 768px`). */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}
