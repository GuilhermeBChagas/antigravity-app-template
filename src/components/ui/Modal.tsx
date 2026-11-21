import { cn } from '@/lib/cn';
import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  overlayClassName?: string;
  contentClassName?: string;
}

/**
 * Modal base acessível com animação suave de entrada/saída, portal, ESC e bloqueio de scroll.
 */
export function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel = 'Diálogo',
  overlayClassName,
  contentClassName,
}: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    contentRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.dialog
          open
          aria-label={ariaLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className={cn(
            'fixed inset-0 z-50 m-0 flex h-dvh w-screen max-h-none max-w-none items-center justify-center border-0 bg-black/60 p-0 backdrop-blur-xs sm:p-4',
            overlayClassName
          )}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={contentRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'relative w-full bg-surface-elevated text-content border border-border shadow-2xl outline-none',
              contentClassName
            )}
          >
            {children}
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>,
    document.body
  );
}

Modal.displayName = 'Modal';
