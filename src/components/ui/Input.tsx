import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="block text-xs font-semibold text-neutral-300">{label}</label>}
        <div className="relative flex items-center">
          {leftIcon && <div className="absolute left-3.5 text-neutral-400 pointer-events-none">{leftIcon}</div>}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 transition-all duration-200 focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/80 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500',
              className
            )}
            {...props}
          />
          {rightIcon && <div className="absolute right-3.5 text-neutral-400">{rightIcon}</div>}
        </div>
        {error && <p className="text-xs text-rose-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="block text-xs font-semibold text-neutral-300">{label}</label>}
        <select
          ref={ref}
          className={cn(
            'w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white focus:border-amber-400 focus:outline-none cursor-pointer',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
Select.displayName = 'Select';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="block text-xs font-semibold text-neutral-300">{label}</label>}
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none transition-all',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'w-12 h-6 rounded-full transition-colors duration-200 relative p-1',
          checked ? 'bg-amber-400' : 'bg-neutral-800'
        )}
      >
        <span
          className={cn(
            'w-4 h-4 rounded-full bg-black block transition-transform duration-200 shadow-md',
            checked ? 'translate-x-6' : 'translate-x-0'
          )}
        />
      </button>
      {label && <span className="text-xs font-medium text-neutral-300">{label}</span>}
    </label>
  );
};
