import React, { useState } from 'react';
import { Search, Filter, Play, Download, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { Project, CategoryId, ProjectStatus, ProjectOrigin } from '../types';

interface ProjectsProps {
  projects: Project[];
  navigate: (route: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, navigate }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchesOrigin = selectedOrigin === 'all' || p.projectOrigin === selectedOrigin;

    return matchesSearch && matchesCategory && matchesStatus && matchesOrigin;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-black text-white tracking-tight">Master Studio Product Catalog</h1>
        <p className="text-sm text-slate-400 mt-1">Explore working websites, applications, AI tools, SaaS systems, games and developer utilities built by Feko Michael.</p>
      </div>

      {/* Filter Controls */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by title, technology, feature or keyword..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="LIVE">LIVE Only</option>
            <option value="BETA">BETA</option>
            <option value="DEVELOPMENT">DEVELOPMENT</option>
            <option value="CONCEPT">CONCEPT</option>
          </select>

          {/* Origin filter */}
          <select
            value={selectedOrigin}
            onChange={e => setSelectedOrigin(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Project Origins</option>
            <option value="Client Project">Client Projects</option>
            <option value="Personal Project">Personal Projects</option>
            <option value="Independent Product">Independent Products</option>
            <option value="Open-Source Project">Open-Source Projects</option>
          </select>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'websites', label: 'Websites' },
            { id: 'apps', label: 'Applications' },
            { id: 'ai', label: 'AI Suite' },
            { id: 'saas', label: 'SaaS' },
            { id: 'games', label: 'Games' },
            { id: 'tools', label: 'Developer Tools' },
            { id: 'interactive', label: '3D / Interactive' }
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                selectedCategory === c.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  project.status === 'LIVE' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {project.status}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {project.projectOrigin}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {project.name}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => navigate(`/viewer/${project.slug}`)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Launch & Use Product
              </button>

              <button
                onClick={() => navigate(`/viewer/${project.slug}`)}
                className="text-xs font-semibold text-slate-400 hover:text-white"
              >
                Case Study →
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No projects found matching the selected filter query.
        </div>
      )}
    </div>
  );
};
