import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Film, LayoutTemplate, Palette, Settings, Sparkles, X, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../stores/useUIStore';
import { useProjectStore } from '../../stores/useProjectStore';

export const CommandPalette: React.FC = () => {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const { projects } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.listingInfo.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
          >
            {/* Input Bar */}
            <div className="flex items-center px-6 py-4 border-b border-neutral-800 gap-3">
              <Search className="w-5 h-5 text-neutral-400" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search projects, templates, media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
              />
              <span className="px-2 py-1 bg-neutral-800 text-neutral-400 text-[10px] rounded-md font-mono">ESC</span>
            </div>

            {/* Results Body */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-4">
              {/* Projects Section */}
              <div>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest px-3 mb-2 block">
                  Recent Projects ({filteredProjects.length})
                </span>
                <div className="space-y-1">
                  {filteredProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => setCommandPaletteOpen(false)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-800/80 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <Film className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-xs font-semibold text-white group-hover:text-blue-300">{project.title}</p>
                          <p className="text-[10px] text-neutral-400">{project.listingInfo.address}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Shortcut Guide */}
            <div className="px-6 py-3 bg-neutral-900/60 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
              <div className="flex items-center gap-4">
                <span><kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-300">↑↓</kbd> Navigate</span>
                <span><kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-300">↵</kbd> Select</span>
              </div>
              <span>Raycast Command Engine</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
