import React, { useState } from 'react';
import { Sparkles, ArrowRight, Gamepad2, Bot, Layers, Code, CheckCircle2, ShieldCheck, Terminal, Compass, Play, Download, Search } from 'lucide-react';
import { Project } from '../types';
import { AILabSuite } from '../components/labs/AILabSuite';
import { InteractiveGames } from '../components/labs/InteractiveGames';

interface HomeProps {
  projects: Project[];
  navigate: (route: string) => void;
}

export const Home: React.FC<HomeProps> = ({ projects, navigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const featuredProjects = projects.filter(p => p.featured || p.status === 'LIVE');

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            FEKO MICHAEL • MASTER DIGITAL PRODUCT ECOSYSTEM
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4 max-w-4xl mx-auto leading-tight">
            Building Digital Products <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              That Do More.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Websites, applications, AI systems, SaaS products, games and custom digital experiences built from idea to working product.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 transition-all flex items-center gap-2"
            >
              Explore My Work <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/apps')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors border border-slate-700 flex items-center gap-2"
            >
              Explore Apps
            </button>
            <button
              onClick={() => navigate('/ai')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-sm transition-colors border border-slate-700 flex items-center gap-2"
            >
              <Bot className="w-4 h-4" /> Explore AI
            </button>
            <button
              onClick={() => navigate('/games')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-sm transition-colors border border-slate-700 flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4" /> Play Games
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Category Pipeline Diagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Interactive Product Ecosystem</h2>
          <p className="text-xl font-bold text-white">Navigate Feko Michael Digital Laboratory</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { id: 'websites', label: 'WEBSITES', desc: 'Commercial Portals', color: 'from-blue-500/20 to-cyan-500/10' },
            { id: 'apps', label: 'APPLICATIONS', desc: 'Business Systems', color: 'from-indigo-500/20 to-blue-500/10' },
            { id: 'ai', label: 'AI LAB', desc: 'Gemini Models', color: 'from-cyan-500/20 to-teal-500/10' },
            { id: 'saas', label: 'SAAS', desc: 'Multi-tenant Tools', color: 'from-teal-500/20 to-emerald-500/10' },
            { id: 'games', label: 'GAMES', desc: 'HTML5 Studio', color: 'from-amber-500/20 to-orange-500/10' },
            { id: 'tools', label: 'TOOLS', desc: 'Dev Utilities', color: 'from-purple-500/20 to-indigo-500/10' },
            { id: 'interactive', label: '3D LAB', desc: 'Interactive Canvas', color: 'from-pink-500/20 to-rose-500/10' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/${cat.id}`)}
              className={`p-4 rounded-xl border border-slate-800 bg-gradient-to-br ${cat.color} hover:border-cyan-500/50 transition text-center group`}
            >
              <div className="text-xs font-black tracking-wider text-white group-hover:text-cyan-400 transition mb-1">
                {cat.label}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                {cat.desc}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Live AI Suite Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">Featured Lab</span>
            <h2 className="text-2xl font-extrabold text-white">Live AI Product Laboratory</h2>
          </div>
          <button
            onClick={() => navigate('/ai')}
            className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1"
          >
            Launch Full AI Suite →
          </button>
        </div>

        <AILabSuite defaultSuite="business" />
      </section>

      {/* Playable Game Studio Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Playable Studio</span>
            <h2 className="text-2xl font-extrabold text-white">Interactive HTML5 Game Laboratory</h2>
          </div>
          <button
            onClick={() => navigate('/games')}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            View Game Catalog →
          </button>
        </div>

        <InteractiveGames gameType="endless-runner" />
      </section>

      {/* Featured Master Projects Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">Master Portfolio</span>
            <h2 className="text-2xl font-extrabold text-white">Featured Studio Projects</h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search working products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                    {project.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {project.projectOrigin}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition mb-2">
                  {project.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[10px] font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/viewer/${project.slug}`)}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Launch Product
                </button>

                <button
                  onClick={() => navigate(`/viewer/${project.slug}`)}
                  className="text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Case Study →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
