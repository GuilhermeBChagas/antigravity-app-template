import { cn } from '@/lib/cn';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';

export interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidthClass?: string;
}

/**
 * Modal de consulta/detalhes: ancora na base no mobile (bottom-sheet) e centraliza no desktop.
 */
export function DetailModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidthClass = 'sm:max-w-2xl',
}: DetailModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={title}
      overlayClassName="items-end sm:items-center p-0 sm:p-4"
      contentClassName={cn(
        'flex flex-col rounded-t-3xl sm:rounded-3xl max-h-[92dvh] sm:max-h-[90vh] overflow-hidden',
        maxWidthClass
      )}
    >
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-semibold truncate">{title}</h2>
          {subtitle && <p className="text-xs sm:text-sm text-content-muted mt-0.5">{subtitle}</p>}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar modal">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-5">{children}</div>
      {footer && (
        <div className="border-t border-border px-5 py-3 bg-surface-muted/40">{footer}</div>
      )}
    </Modal>
  );
}

DetailModal.displayName = 'DetailModal';
