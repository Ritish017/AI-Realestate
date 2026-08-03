import React from 'react';
import { Video, Sparkles, ShieldCheck, FolderKanban, Send, Palette, CreditCard, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: 'studio' | 'projects' | 'brand' | 'telegram' | 'pricing';
  setActiveTab: (tab: 'studio' | 'projects' | 'brand' | 'telegram' | 'pricing') => void;
  projectsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, projectsCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('studio')}>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg shadow-white/10 shrink-0">
              <Video className="w-4 h-4 fill-black" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif italic text-xl tracking-tight text-white font-medium">
                  PropMotion AI
                </span>
                <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded">
                  Studio
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest hidden sm:block">Real Estate Video Engine</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-neutral-900/80 p-1.5 rounded-xl border border-neutral-800">
            <button
              id="nav-studio-btn"
              onClick={() => setActiveTab('studio')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'studio'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Productions</span>
            </button>

            <button
              id="nav-projects-btn"
              onClick={() => setActiveTab('projects')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                activeTab === 'projects'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Library</span>
              {projectsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {projectsCount}
                </span>
              )}
            </button>

            <button
              id="nav-brand-btn"
              onClick={() => setActiveTab('brand')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'brand'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Brand Kit</span>
            </button>

            <button
              id="nav-telegram-btn"
              onClick={() => setActiveTab('telegram')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'telegram'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram Bot</span>
            </button>

            <button
              id="nav-pricing-btn"
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'pricing'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pricing</span>
            </button>
          </nav>

          {/* Right Status Indicator & Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-400 text-xs font-medium">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">Gemini + Veo Pipeline</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-200">Faithful Renders</span>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Tab Strip */}
      <div className="md:hidden flex items-center justify-around bg-black border-t border-neutral-800 py-2 px-1 text-xs">
        <button
          onClick={() => setActiveTab('studio')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${activeTab === 'studio' ? 'text-white font-bold' : 'text-neutral-500'}`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>Studio</span>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${activeTab === 'projects' ? 'text-white font-bold' : 'text-neutral-500'}`}
        >
          <FolderKanban className="w-4 h-4 mb-0.5" />
          <span>Library ({projectsCount})</span>
        </button>
        <button
          onClick={() => setActiveTab('brand')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${activeTab === 'brand' ? 'text-white font-bold' : 'text-neutral-500'}`}
        >
          <Palette className="w-4 h-4 mb-0.5" />
          <span>Brand</span>
        </button>
        <button
          onClick={() => setActiveTab('telegram')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${activeTab === 'telegram' ? 'text-white font-bold' : 'text-neutral-500'}`}
        >
          <Send className="w-4 h-4 mb-0.5" />
          <span>Bot</span>
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg ${activeTab === 'pricing' ? 'text-white font-bold' : 'text-neutral-500'}`}
        >
          <CreditCard className="w-4 h-4 mb-0.5" />
          <span>Plans</span>
        </button>
      </div>
    </header>
  );
};
