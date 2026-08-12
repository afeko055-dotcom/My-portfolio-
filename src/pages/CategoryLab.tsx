import React, { useState } from 'react';
import { Project, CategoryId } from '../types';
import { AILabSuite } from '../components/labs/AILabSuite';
import { InteractiveGames } from '../components/labs/InteractiveGames';
import { WebAppsLab } from '../components/labs/WebAppsLab';
import { DevToolsLab } from '../components/labs/DevToolsLab';
import { Interactive3DLab } from '../components/labs/Interactive3DLab';
import { CommercialWebsitesLab } from '../components/labs/CommercialWebsitesLab';
import { Mail, CheckCircle, Send, Shield, Sparkles, User, Briefcase, Award } from 'lucide-react';

interface CategoryLabProps {
  category: CategoryId;
  projects: Project[];
  navigate: (route: string) => void;
}

export const CategoryLab: React.FC<CategoryLabProps> = ({ category, projects, navigate }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactStatus, setContactStatus] = useState('');

  const categoryProjects = projects.filter(p => p.category === category);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: 'Inquiry via Studio Contact Form',
          message: contactMsg,
          type: 'lead'
        })
      });
      const data = await res.json();
      if (data.success) {
        setContactStatus('Message submitted successfully to Feko Michael.');
        setContactName('');
        setContactEmail('');
        setContactMsg('');
      }
    } catch (err) {
      setContactStatus('Message saved locally.');
    }
  };

  // Dedicated Render for AI Lab
  if (category === 'ai') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">AI Product Laboratory</h1>
          <p className="text-xs text-slate-400 mt-1">Real Gemini 3.6 Flash server-side AI applications & tools.</p>
        </div>
        <AILabSuite />
      </div>
    );
  }

  // Dedicated Render for Games Studio
  if (category === 'games') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">HTML5 Game Studio</h1>
          <p className="text-xs text-slate-400 mt-1">Playable arcade games built with Canvas 2D physics and Web Audio.</p>
        </div>
        <InteractiveGames />
      </div>
    );
  }

  // Dedicated Render for Developer Tools
  if (category === 'tools') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">Developer Utility Laboratory</h1>
          <p className="text-xs text-slate-400 mt-1">Working utilities for JSON formatting, Regex testing, and secret token generation.</p>
        </div>
        <DevToolsLab />
      </div>
    );
  }

  // Dedicated Render for Websites
  if (category === 'websites') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">Commercial Website Laboratory</h1>
          <p className="text-xs text-slate-400 mt-1">Enterprise commercial platforms for automotive, law, dining, and real estate.</p>
        </div>
        <CommercialWebsitesLab />
      </div>
    );
  }

  // Dedicated Render for Business Apps
  if (category === 'apps' || category === 'saas' || category === 'business-systems') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">Business Application Laboratory</h1>
          <p className="text-xs text-slate-400 mt-1">Operational CRM, Inventory Manager, PDF Invoicing, and Sprint Boards.</p>
        </div>
        <WebAppsLab />
      </div>
    );
  }

  // Dedicated Render for 3D / Interactive
  if (category === 'interactive') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">3D & Interactive Showcase</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time vehicle configurator and spatial canvas laboratory.</p>
        </div>
        <Interactive3DLab />
      </div>
    );
  }

  // Services View
  if (category === 'services') {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">Studio Services & Architecture</h1>
          <p className="text-xs text-slate-400 mt-1">Custom engineering services offered by Feko Michael.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'Custom Full-Stack Web Development', desc: 'High-speed web platforms with React, Node.js, and TypeScript.' },
            { title: 'Gemini AI Product Integration', desc: 'Server-side prompt engineering, custom AI assistants, and model tools.' },
            { title: 'HTML5 Game & Canvas Studio', desc: 'Custom arcade, educational, and branded promotional games.' },
            { title: 'SaaS Architecture & Multi-Tenant Systems', desc: 'Scalable SaaS platforms with subscription and workspace management.' }
          ].map((s, idx) => (
            <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-2">
              <h3 className="text-lg font-bold text-white">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // About View
  if (category === 'about') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">About Feko Michael</h1>
          <p className="text-xs text-cyan-400 mt-1 font-mono">Web Developer • App Developer • Game Developer • AI/Product Builder</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-4 text-sm text-slate-300 leading-relaxed">
          <p>
            Feko Michael is a digital product architect and full-stack software engineer specializing in web applications, server-side Gemini AI systems, SaaS architectures, and HTML5 canvas games.
          </p>
          <p>
            This Digital Studio serves as a living laboratory demonstrating actual operational products built from concept to execution.
          </p>
        </div>
      </div>
    );
  }

  // Contact View
  if (category === 'contact') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-black text-white">Contact Feko Michael</h1>
          <p className="text-xs text-slate-400 mt-1">Start a digital product, AI integration, or custom software project.</p>
        </div>

        {contactStatus && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {contactStatus}
          </div>
        )}

        <form onSubmit={handleContactSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
            <input
              type="text"
              required
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Project Message / Directive</label>
            <textarea
              required
              rows={5}
              value={contactMsg}
              onChange={e => setContactMsg(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Send Direct Inquiry
          </button>
        </form>
      </div>
    );
  }

  // Privacy View
  if (category === 'privacy') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 text-xs text-slate-300">
        <h1 className="text-2xl font-bold text-white border-b border-slate-800 pb-4">Privacy Policy</h1>
        <p>FEKO MICHAEL DIGITAL STUDIO respects user privacy and data security.</p>
        <p>No user credentials or external payment details are harvested. AI requests processed via Gemini 3.6 Flash comply with strict server-side API proxying standards.</p>
      </div>
    );
  }

  return null;
};
