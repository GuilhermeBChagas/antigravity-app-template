import { cn } from '@/lib/cn';
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
 * Modal base acessível: portal, fechamento por ESC, bloqueio de scroll e foco inicial.
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

  if (!isOpen) return null;

  return createPortal(
    <dialog
      open
      aria-label={ariaLabel}
      className={cn(
        'fixed inset-0 z-50 m-0 flex h-dvh w-screen max-h-none max-w-none items-center justify-center border-0 bg-black/60 p-0 backdrop-blur-xs sm:p-4',
        overlayClassName
      )}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        className={cn(
          'relative w-full bg-surface-elevated text-content border border-border shadow-2xl outline-none',
          contentClassName
        )}
      >
        {children}
      </div>
    </dialog>,
    document.body
  );
}

Modal.displayName = 'Modal';
