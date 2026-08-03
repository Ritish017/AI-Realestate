import React, { useState } from 'react';
import { VideoJob } from '../types';
import { FolderKanban, Play, Download, Trash2, Search, Sparkles, ExternalLink, Share2, Eye, ArrowUpRight } from 'lucide-react';

interface ProjectsLibraryProps {
  projects: VideoJob[];
  onSelectProject: (job: VideoJob) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectsLibrary: React.FC<ProjectsLibraryProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [styleFilter, setStyleFilter] = useState<string>('all');

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.listingInfo.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = styleFilter === 'all' || proj.style === styleFilter;
    return matchesSearch && matchesStyle;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">
            Media Archive
          </h3>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-serif italic">
            Saved Video Vault
          </h2>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by address..."
              className="bg-black border border-neutral-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-white w-48 sm:w-64"
            />
          </div>

          <select
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            className="bg-black border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-white"
          >
            <option value="all">All Styles</option>
            <option value="tour">Property Tour</option>
            <option value="drone">Drone Showcase</option>
            <option value="twilight">Twilight Showcase</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-black border border-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
            <FolderKanban className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-sm font-bold text-white">No video projects found</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Upload property photos or select a sample luxury preset in the Video Studio to render your first video.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const firstImage = project.scenes[0]?.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80';
            return (
              <div
                key={project.id}
                className="group bg-neutral-900/90 rounded-2xl border border-neutral-800 hover:border-neutral-500 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-[16/10] w-full bg-black overflow-hidden cursor-pointer" onClick={() => onSelectProject(project)}>
                  <img
                    src={firstImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

                  {/* Style Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded bg-black/90 backdrop-blur-md text-white border border-neutral-800">
                      {project.style === 'tour' && 'Property Tour'}
                      {project.style === 'drone' && 'Drone Showcase'}
                      {project.style === 'twilight' && 'Twilight Showcase'}
                    </span>
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Price Banner */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-xs">{project.listingInfo.price}</span>
                    <span className="text-[10px] text-neutral-300 font-mono bg-black/80 px-1.5 py-0.5 rounded border border-neutral-800">
                      {project.duration}s • {project.aspectRatio}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="font-serif text-lg italic text-white truncate mb-0.5">{project.title}</h4>
                    <p className="text-xs text-neutral-400 truncate">{project.listingInfo.address}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 border-t border-neutral-800 pt-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{project.viewsCount || 142} Views</span>
                    </span>
                    <span>{project.createdAt}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex-1 py-2.5 px-3 bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-black" />
                      <span>Open Studio</span>
                    </button>

                    <button
                      onClick={() => onDeleteProject(project.id)}
                      className="p-2.5 bg-black hover:bg-rose-600/20 text-neutral-400 hover:text-rose-400 border border-neutral-800 rounded-xl transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
