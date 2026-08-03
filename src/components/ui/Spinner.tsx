import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', label, className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Sparkles className={cn('animate-spin text-amber-400', sizes[size])} />
      {label && <p className="text-xs font-mono text-neutral-400 tracking-wide">{label}</p>}
    </div>
  );
};
