import React, { useState } from 'react';
import { Sparkles, Code, Terminal, Gamepad2, Layers, Briefcase, Info, Mail, Menu, X, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Studio Showcase', route: '/' },
    { label: 'All Projects', route: '/projects' },
    { label: 'Websites Lab', route: '/websites' },
    { label: 'Web Apps', route: '/apps' },
    { label: 'AI Lab', route: '/ai' },
    { label: 'SaaS Suite', route: '/saas' },
    { label: 'Games', route: '/games' },
    { label: 'Dev Tools', route: '/tools' },
    { label: 'Services', route: '/services' },
    { label: 'About', route: '/about' },
    { label: 'Contact', route: '/contact' }
  ];

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-cyan-400 text-sm">
              FM
            </div>
          </div>
          <div>
            <span className="text-sm font-black tracking-tight text-white block leading-none">
              FEKO MICHAEL
            </span>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mt-0.5">
              Digital Studio
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/60 border border-slate-800/60 rounded-full px-3 py-1.5">
          {navLinks.slice(0, 8).map((link) => (
            <button
              key={link.route}
              onClick={() => handleNav(link.route)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                currentRoute === link.route
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNav('/contact')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            Start a Project
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.route}
              onClick={() => handleNav(link.route)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                currentRoute === link.route
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>{link.label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
