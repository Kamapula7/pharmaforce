import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'success' | 'warning' | 'muted';
  className?: string;
}

export default function Badge({ children, variant = 'brand', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide',
        {
          'bg-brand/10 text-brand': variant === 'brand',
          'bg-success/10 text-success': variant === 'success',
          'bg-warning/10 text-warning': variant === 'warning',
          'bg-surface-2 text-muted': variant === 'muted',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
