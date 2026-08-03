import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outline' | 'interactive';
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', hoverEffect = true, children, ...props }, ref) => {
    const variants = {
      default: 'bg-neutral-900 border border-neutral-800 text-neutral-100',
      glass: 'glass-card text-neutral-100',
      elevated: 'bg-neutral-900/90 border border-neutral-800 shadow-2xl text-neutral-100',
      outline: 'bg-transparent border border-neutral-800 text-neutral-100',
      interactive: 'glass-card hover:border-neutral-700 cursor-pointer active:scale-[0.99] text-neutral-100',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl p-6 transition-all duration-300 relative overflow-hidden',
          variants[variant],
          !hoverEffect && 'hover:transform-none hover:shadow-none',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
