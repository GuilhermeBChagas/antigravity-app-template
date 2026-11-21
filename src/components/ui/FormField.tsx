import { cn } from '@/lib/cn';
import {
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  forwardRef,
  useId,
} from 'react';

const controlBaseClass =
  'w-full min-h-11 rounded-xl border border-border bg-surface-elevated px-3.5 py-2 text-sm text-content placeholder:text-content-muted focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary disabled:opacity-50';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  isRequired?: boolean;
  children: ReactNode;
}

/** Rótulo, mensagem de erro e dica acessíveis para controles de formulário. */
export function FormField({
  label,
  htmlFor,
  error,
  hint,
  isRequired = false,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-content">
        {label}
        {isRequired && (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-content-muted">{hint}</p>
      ) : null}
    </div>
  );
}

FormField.displayName = 'FormField';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError = false, id, ...props }, ref) => {
    const generatedId = useId();
    return (
      <input
        ref={ref}
        id={id ?? generatedId}
        aria-invalid={hasError || undefined}
        className={cn(controlBaseClass, hasError && 'border-danger', className)}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, id, ...props }, ref) => {
    const generatedId = useId();
    return (
      <textarea
        ref={ref}
        id={id ?? generatedId}
        aria-invalid={hasError || undefined}
        className={cn(
          controlBaseClass,
          'min-h-24 resize-y',
          hasError && 'border-danger',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError = false, id, children, ...props }, ref) => {
    const generatedId = useId();
    return (
      <select
        ref={ref}
        id={id ?? generatedId}
        aria-invalid={hasError || undefined}
        className={cn(controlBaseClass, hasError && 'border-danger', className)}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';
