import React from 'react';
import { cn } from '../../utils/cn';
import { Sparkles } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none';

    const variants = {
      primary: 'bg-white hover:bg-neutral-200 text-black shadow-lg hover:shadow-white/10 focus:ring-white',
      secondary: 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 focus:ring-neutral-500',
      outline: 'bg-transparent hover:bg-white/5 text-neutral-200 border border-neutral-700 hover:border-neutral-500 focus:ring-neutral-400',
      ghost: 'bg-transparent hover:bg-white/10 text-neutral-300 hover:text-white focus:ring-neutral-500',
      glass: 'glass-panel hover:bg-white/10 text-white border border-white/10 focus:ring-white/30',
      gold: 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-semibold shadow-lg gold-glow focus:ring-amber-400',
      danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg focus:ring-rose-400',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2.5 rounded-2xl',
      xl: 'px-8 py-4 text-lg font-bold gap-3 rounded-2xl tracking-wide',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Sparkles className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
