'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, Sparkles, Plus, Command } from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { isSidebarCollapsed, setCommandPaletteOpen } = useUIStore();

  // Dynamic Breadcrumb title
  const getBreadcrumbTitle = () => {
    if (pathname === '/dashboard') return 'Command Center';
    if (pathname === '/projects') return 'Campaigns Hub';
    if (pathname === '/projects/create') return 'Create AI Campaign Wizard';
    if (pathname === '/templates') return 'Production Templates';
    if (pathname === '/brand-kit') return 'Realtor Brand Kit';
    if (pathname === '/media') return 'Media Library & Inspector';
    if (pathname === '/exports') return 'Export Center';
    if (pathname === '/analytics') return 'Analytics & Performance';
    if (pathname === '/settings') return 'Workspace Settings';
    if (pathname?.includes('/studio')) return 'Live AI Production Studio';
    if (pathname?.includes('/insights')) return 'Property AI Intelligence';
    return 'HouzStudio AI';
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 h-16 bg-[#090A0F]/80 backdrop-blur-xl border-b border-neutral-800 transition-all duration-300 flex items-center justify-between px-6',
        isSidebarCollapsed ? 'left-20' : 'left-64'
      )}
    >
      {/* Left Breadcrumb Navigation */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">HouzStudio AI</span>
        <span className="text-neutral-600">/</span>
        <h1 className="text-sm font-semibold text-white tracking-tight">{getBreadcrumbTitle()}</h1>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center gap-4">
        {/* Raycast Command Search Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-3 px-4 py-2 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-2xl text-xs text-neutral-400 transition-all shadow-inner group"
        >
          <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
          <span>Search projects, actions...</span>
          <span className="flex items-center gap-0.5 px-2 py-0.5 bg-black border border-neutral-800 rounded-md text-[10px] font-mono text-neutral-300">
            <Command className="w-2.5 h-2.5" /> K
          </span>
        </button>

        {/* Credits Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-neutral-400">Credits:</span>
          <span className="font-bold text-white">480 / 500</span>
        </div>

        {/* Notifications Icon */}
        <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        </button>

        {/* Quick Create Button */}
        <Link href="/projects/create">
          <Button variant="gold" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Campaign
          </Button>
        </Link>
      </div>
    </header>
  );
};
