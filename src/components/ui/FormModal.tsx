import { cn } from '@/lib/cn';
import { X } from 'lucide-react';
import type { FormEventHandler, ReactNode } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';

export interface FormModalHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
}

/** Cabeçalho padronizado para modais de formulário. */
export function FormModalHeader({ title, subtitle, onClose }: FormModalHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 shrink-0">
      <div className="min-w-0">
        <h2 className="text-base sm:text-lg font-semibold truncate">{title}</h2>
        {subtitle && <p className="text-xs sm:text-sm text-content-muted mt-0.5">{subtitle}</p>}
      </div>
      <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar formulário">
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}

FormModalHeader.displayName = 'FormModalHeader';

export interface FormActionFooterProps {
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

/** Rodapé padronizado com ações de cancelar e salvar. */
export function FormActionFooter({
  onCancel,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
  isLoading = false,
  isDisabled = false,
}: FormActionFooterProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 border-t border-border px-5 py-3.5 bg-surface-muted/40 shrink-0">
      <Button
        variant="outline"
        onClick={onCancel}
        isDisabled={isLoading}
        className="w-full sm:w-auto"
      >
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        isLoading={isLoading}
        isDisabled={isDisabled}
        className="w-full sm:w-auto"
      >
        {submitLabel}
      </Button>
    </div>
  );
}

FormActionFooter.displayName = 'FormActionFooter';

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  submitLabel?: string;
  isSubmitting?: boolean;
  isFullScreenMobile?: boolean;
  maxWidthClass?: string;
  children: ReactNode;
}

/**
 * Modal de cadastro/edição: tela cheia no mobile por padrão para ergonomia com teclado virtual.
 */
export function FormModal({
  isOpen,
  onClose,
  title,
  subtitle,
  onSubmit,
  submitLabel = 'Salvar',
  isSubmitting = false,
  isFullScreenMobile = true,
  maxWidthClass = 'md:max-w-xl',
  children,
}: FormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={title}
      overlayClassName="p-0 md:p-4"
      contentClassName={cn(
        'flex flex-col overflow-hidden',
        isFullScreenMobile
          ? 'h-[100dvh] max-h-[100dvh] rounded-none border-0 md:border md:rounded-3xl md:h-auto md:max-h-[95vh]'
          : 'rounded-3xl max-h-[92dvh]',
        maxWidthClass
      )}
    >
      <FormModalHeader title={title} subtitle={subtitle} onClose={onClose} />
      <form onSubmit={onSubmit} className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">{children}</div>
        <FormActionFooter onCancel={onClose} submitLabel={submitLabel} isLoading={isSubmitting} />
      </form>
    </Modal>
  );
}

FormModal.displayName = 'FormModal';
