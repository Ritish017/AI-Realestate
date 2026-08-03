import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  badge?: number | string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pills' | 'line';
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, variant = 'pills' }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 overflow-x-auto no-scrollbar',
        variant === 'line' ? 'border-b border-neutral-800 pb-2' : 'bg-neutral-900/80 p-1.5 rounded-2xl border border-neutral-800'
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap',
              variant === 'pills' && isActive && 'bg-white text-black shadow-lg',
              variant === 'pills' && !isActive && 'text-neutral-400 hover:text-white hover:bg-neutral-800',
              variant === 'line' && isActive && 'text-amber-400 border-b-2 border-amber-400 font-bold',
              variant === 'line' && !isActive && 'text-neutral-400 hover:text-white'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="px-1.5 py-0.5 bg-neutral-800 text-neutral-300 text-[10px] rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
