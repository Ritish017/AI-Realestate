import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  LayoutTemplate, 
  Sparkles, 
  Image as ImageIcon, 
  Download, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';
import { cn } from '../../utils/cn';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', href: '/projects', icon: FolderKanban },
    { id: 'create', label: 'Create Project', href: '/projects/create', icon: PlusCircle, isHighlight: true },
    { id: 'templates', label: 'Templates', href: '/templates', icon: LayoutTemplate },
    { id: 'brand-kit', label: 'Brand Kit', href: '/brand-kit', icon: Sparkles },
    { id: 'media', label: 'Media Library', href: '/media', icon: ImageIcon },
    { id: 'exports', label: 'Exports', href: '/exports', icon: Download },
    { id: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 bottom-0 z-40 bg-[#090A0F]/95 backdrop-blur-xl border-r border-neutral-800 transition-all duration-300 flex flex-col justify-between py-6 px-3',
        isSidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Top Header Logo */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-3">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg gold-glow flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-serif italic font-bold text-white text-lg tracking-tight leading-none">
                  HouzStudio
                </span>
                <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mt-0.5">
                  AI Marketing Suite
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu Links */}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-medium transition-all duration-200 group relative',
                  isActive
                    ? 'bg-neutral-800/90 text-white shadow-lg border border-neutral-700/80'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5',
                  item.isHighlight && !isActive && 'text-amber-400 hover:text-amber-300'
                )}
              >
                <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : item.isHighlight ? 'text-amber-400' : 'text-neutral-400 group-hover:text-white')} />
                {!isSidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}

                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute right-0 top-2 bottom-2 w-1 bg-amber-400 rounded-l-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Enterprise Badge */}
      <div className="space-y-3 px-2">
        {!isSidebarCollapsed && (
          <div className="glass-card p-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="truncate">
              <p className="text-[11px] font-bold text-amber-300">Realtor Pro Active</p>
              <p className="text-[9px] text-neutral-400">Unlimited 4K Exports</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-neutral-800/50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            RA
          </div>
          {!isSidebarCollapsed && (
            <div className="truncate">
              <p className="text-xs font-semibold text-white">Ritish Agent</p>
              <p className="text-[10px] text-neutral-400">Montecito Luxury</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
