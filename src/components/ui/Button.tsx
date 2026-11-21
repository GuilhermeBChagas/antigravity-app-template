import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm',
  secondary: 'bg-surface-muted text-content hover:opacity-90',
  outline: 'border border-border bg-surface-elevated text-content hover:bg-surface-muted',
  ghost: 'bg-transparent text-content hover:bg-surface-muted',
  danger: 'bg-danger text-white hover:opacity-90 shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 text-xs rounded-lg',
  md: 'min-h-11 px-4 text-sm rounded-xl',
  lg: 'min-h-12 px-5 text-base rounded-xl',
  icon: 'min-h-11 min-w-11 p-2.5 rounded-xl',
};

/** Botão base acessível com estados de carregamento e variantes semânticas. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      disabled,
      type = 'button',
      children,
      ...props
    },
    ref
  ) => {
    const finalDisabled = Boolean(disabled || isDisabled || isLoading);
    return (
      <button
        ref={ref}
        type={type}
        disabled={finalDisabled}
        aria-busy={isLoading || undefined}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
