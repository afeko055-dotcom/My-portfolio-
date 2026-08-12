import React from 'react';
import { Sparkles, Mail, Code, Terminal, Layers, Globe, Shield, Lock } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Studio Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center font-black text-slate-950 text-xs">
                FM
              </div>
              <span className="font-extrabold text-sm text-white tracking-tight">FEKO MICHAEL DIGITAL STUDIO</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Master full-stack product laboratory containing production websites, web applications, Gemini AI tools, SaaS products, games, and developer utilities.
            </p>
            <div className="text-[11px] text-cyan-400 font-semibold">
              Web Developer • App Developer • Game Developer • AI/Product Builder
            </div>
          </div>

          {/* Col 2: Labs & Product Catalog */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-[11px]">Product Laboratories</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/websites')} className="hover:text-cyan-400 transition">Websites Lab</button></li>
              <li><button onClick={() => navigate('/apps')} className="hover:text-cyan-400 transition">Business Applications</button></li>
              <li><button onClick={() => navigate('/ai')} className="hover:text-cyan-400 transition">AI Products & Suites</button></li>
              <li><button onClick={() => navigate('/saas')} className="hover:text-cyan-400 transition">SaaS Products</button></li>
              <li><button onClick={() => navigate('/games')} className="hover:text-cyan-400 transition">Game Studio</button></li>
            </ul>
          </div>

          {/* Col 3: Developer & Studio Tools */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-[11px]">Utilities & Studio</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/tools')} className="hover:text-cyan-400 transition">Developer Tools</button></li>
              <li><button onClick={() => navigate('/interactive')} className="hover:text-cyan-400 transition">3D Interactive Lab</button></li>
              <li><button onClick={() => navigate('/services')} className="hover:text-cyan-400 transition">Studio Services</button></li>
              <li><button onClick={() => navigate('/about')} className="hover:text-cyan-400 transition">About Feko Michael</button></li>
              <li><button onClick={() => navigate('/privacy')} className="hover:text-cyan-400 transition">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & Engagement */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider mb-3 text-[11px]">Start a Project</h4>
            <p className="text-xs text-slate-400">Ready to build custom software, AI systems, or digital platforms?</p>
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact Feko Michael
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row justify-between items-center text-slate-500 gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} FEKO MICHAEL DIGITAL STUDIO. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Gemini 3.6 Flash</span>
            <span>•</span>
            <span>Production Container Node Environment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
