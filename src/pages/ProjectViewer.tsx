import React, { useState } from 'react';
import { Play, Download, CheckCircle2, Shield, ArrowLeft, Terminal, FileCode, Layers, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { AILabSuite } from '../components/labs/AILabSuite';
import { InteractiveGames } from '../components/labs/InteractiveGames';
import { WebAppsLab } from '../components/labs/WebAppsLab';
import { DevToolsLab } from '../components/labs/DevToolsLab';
import { Interactive3DLab } from '../components/labs/Interactive3DLab';
import { CommercialWebsitesLab } from '../components/labs/CommercialWebsitesLab';

interface ProjectViewerProps {
  projectSlug: string;
  projects: Project[];
  navigate: (route: string) => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({ projectSlug, projects, navigate }) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'casestudy' | 'config' | 'download'>('demo');

  const project = projects.find(p => p.slug === projectSlug) || projects[0];

  // Render correct embedded interactive tool based on project interactiveType
  const renderInteractiveComponent = () => {
    switch (project.interactiveType) {
      case 'game-endless-runner':
        return <InteractiveGames gameType="endless-runner" />;
      case 'game-space-shooter':
        return <InteractiveGames gameType="space-shooter" />;
      case 'game-math':
        return <InteractiveGames gameType="math" />;
      case 'ai-business-suite':
        return <AILabSuite defaultSuite="business" />;
      case 'ai-developer-suite':
        return <AILabSuite defaultSuite="developer" />;
      case 'ai-content-studio':
        return <AILabSuite defaultSuite="content" />;
      case 'ai-education':
        return <AILabSuite defaultSuite="education" />;
      case 'ai-career':
        return <AILabSuite defaultSuite="career" />;
      case 'crm-app':
        return <WebAppsLab defaultApp="crm" />;
      case 'inventory-app':
        return <WebAppsLab defaultApp="inventory" />;
      case 'invoice-app':
        return <WebAppsLab defaultApp="invoice" />;
      case 'project-app':
        return <WebAppsLab defaultApp="kanban" />;
      case 'tool-json-formatter':
        return <DevToolsLab defaultTool="json" />;
      case 'tool-regex-tester':
        return <DevToolsLab defaultTool="regex" />;
      case 'tool-password':
        return <DevToolsLab defaultTool="password" />;
      case 'tool-palette':
        return <DevToolsLab defaultTool="palette" />;
      case 'interactive-vehicle-3d':
        return <Interactive3DLab />;
      case 'automotive-platform':
        return <CommercialWebsitesLab platformType="automotive" />;
      case 'law-firm-platform':
        return <CommercialWebsitesLab platformType="law-firm" />;
      case 'restaurant-platform':
        return <CommercialWebsitesLab platformType="restaurant" />;
      case 'real-estate-platform':
        return <CommercialWebsitesLab platformType="real-estate" />;
      default:
        return <WebAppsLab defaultApp="crm" />;
    }
  };

  const handleDownload = () => {
    window.location.href = `/api/download/${project.slug}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/projects')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Product Catalog
      </button>

      {/* Header Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start gap-6 shadow-xl">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
              {project.status}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              {project.projectOrigin}
            </span>
            {project.version && (
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
                v{project.version}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white">{project.name}</h1>
          <p className="text-sm text-slate-300 leading-relaxed">{project.longDescription}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((t, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-950 text-cyan-400 border border-slate-800 font-mono text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Universal Viewer Action Bar */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 w-full md:w-auto space-y-3 shrink-0">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Universal Viewer Controls</div>
          <button
            onClick={handleDownload}
            className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Build Artifact
          </button>
        </div>
      </div>

      {/* Viewer Tabs */}
      <div className="flex border-b border-slate-800 space-x-4">
        {[
          { id: 'demo', label: 'Live Interactive Product' },
          { id: 'casestudy', label: 'Case Study & Architecture' },
          { id: 'config', label: 'API & Config Requirements' },
          { id: 'download', label: 'Download & Deployment' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-xs font-bold transition border-b-2 ${
              activeTab === tab.id
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'demo' && (
        <div className="py-4">
          {renderInteractiveComponent()}
        </div>
      )}

      {activeTab === 'casestudy' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-slate-200">
          <h3 className="text-xl font-bold text-white">Case Study & Product Architecture</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.caseStudy?.challenge || 'Built to address high-performance scalability, real-time user interaction, and seamless multi-device responsiveness.'}
          </p>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase text-cyan-400">Engineering Features</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs text-slate-300">
          <h3 className="text-lg font-bold text-white font-sans">API & Service Configuration</h3>
          <p className="font-sans text-slate-400">
            Required environment credentials for full production operation:
          </p>
          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-cyan-400 overflow-x-auto">
{`# .env Configuration
GEMINI_API_KEY="${process.env.GEMINI_API_KEY || 'MY_GEMINI_API_KEY'}"
APP_URL="http://0.0.0.0:3000"
NODE_ENV="production"
PORT=3000`}
          </pre>
        </div>
      )}

      {activeTab === 'download' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Export & Download Build Package</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click below to generate and download the complete build manifest and source package for {project.name}.
          </p>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download {project.slug}-build.json
          </button>
        </div>
      )}
    </div>
  );
};
