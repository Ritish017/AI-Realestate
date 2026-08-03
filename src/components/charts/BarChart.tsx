import React from 'react';
import { cn } from '../../utils/cn';

export interface BarChartItem {
  label: string;
  value: number;
  max: number;
  color?: string;
}

export interface BarChartProps {
  items: BarChartItem[];
  title?: string;
}

export const BarChart: React.FC<BarChartProps> = ({ items, title }) => {
  return (
    <div className="glass-card p-6 rounded-3xl space-y-4 border border-neutral-800">
      {title && <h4 className="text-sm font-bold font-serif text-white">{title}</h4>}
      <div className="space-y-3">
        {items.map((item, idx) => {
          const percent = Math.min(100, Math.round((item.value / item.max) * 100));
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-300 font-medium">{item.label}</span>
                <span className="text-neutral-400 font-mono">{item.value}</span>
              </div>
              <div className="h-2 bg-neutral-900 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    item.color || 'bg-gradient-to-r from-amber-500 to-yellow-400'
                  )}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
