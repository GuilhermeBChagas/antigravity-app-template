import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './Button';

/** Botão discreto para voltar ao topo após rolagem vertical. */
export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 left-4 z-30 md:bottom-6 md:left-auto md:right-6 shadow-md"
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}

ScrollToTopButton.displayName = 'ScrollToTopButton';

