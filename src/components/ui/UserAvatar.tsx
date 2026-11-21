import { cn } from '@/lib/cn';
import { getInitials } from '@/utils/stringUtils';

export interface UserAvatarProps {
  name?: string | null;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

/** Avatar de usuário com fallback automático para iniciais. */
export function UserAvatar({ name, src, size = 'md', className }: UserAvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name ?? 'Avatar'}
        loading="lazy"
        className={cn(
          'rounded-full object-cover border border-border shrink-0',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <span
      aria-label={name ?? 'Usuário'}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-primary/15 font-semibold text-primary shrink-0',
        sizeClasses[size],
        className
      )}
    >
      {getInitials(name)}
    </span>
  );
}

UserAvatar.displayName = 'UserAvatar';
