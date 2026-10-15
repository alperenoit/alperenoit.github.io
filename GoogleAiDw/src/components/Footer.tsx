import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: 'tr' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-white text-slate-600 border-t border-slate-200 text-xs">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Identity & Copyright */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-semibold text-slate-900">
            {portfolioConfig.personal.name}
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            © {new Date().getFullYear()} · {portfolioConfig.personal.role[lang]}
          </div>
        </div>

        {/* Middle: Links */}
        <div className="flex items-center gap-6">
          <a
            href={portfolioConfig.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={portfolioConfig.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${portfolioConfig.personal.email}`}
            className="hover:text-slate-900 transition-colors font-mono"
          >
            {portfolioConfig.personal.email}
          </a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-all cursor-pointer"
        >
          <span>{lang === 'tr' ? 'Başa Dön' : 'Back to Top'}</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
