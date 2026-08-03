import React from 'react';
import { cn } from '../../utils/cn';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  serif?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  serif = true,
  className,
  children,
  ...props
}) => {
  const fontClass = serif ? 'font-serif italic tracking-tight' : 'font-sans tracking-normal';

  switch (level) {
    case 1:
      return (
        <h1 className={cn('text-3xl sm:text-4xl lg:text-5xl font-bold text-white', fontClass, className)} {...props}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={cn('text-2xl sm:text-3xl font-bold text-white', fontClass, className)} {...props}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={cn('text-xl sm:text-2xl font-semibold text-white', fontClass, className)} {...props}>
          {children}
        </h3>
      );
    case 4:
    default:
      return (
        <h4 className={cn('text-lg font-semibold text-white', fontClass, className)} {...props}>
          {children}
        </h4>
      );
  }
};

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'subtitle' | 'caption' | 'mono';
  muted?: boolean;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  muted = false,
  className,
  children,
  ...props
}) => {
  const variants = {
    body: 'text-sm leading-relaxed text-neutral-200',
    subtitle: 'text-base font-medium text-neutral-300',
    caption: 'text-xs text-neutral-400',
    mono: 'text-xs font-mono text-neutral-400',
  };

  return (
    <p className={cn(variants[variant], muted && 'text-neutral-500', className)} {...props}>
      {children}
    </p>
  );
};
