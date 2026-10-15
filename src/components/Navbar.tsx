import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, FileText, Globe } from 'lucide-react';

interface NavbarProps {
  lang: 'tr' | 'en';
  setLang: (lang: 'tr' | 'en') => void;
  onOpenCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onOpenCV }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: lang === 'tr' ? 'Hakkımda' : 'About' },
    { href: '#projects', label: lang === 'tr' ? 'Projeler' : 'Projects' },
    { href: '#skills', label: lang === 'tr' ? 'Yetkinlikler' : 'Skills' },
    { href: '#experience', label: lang === 'tr' ? 'Deneyim & Eğitim' : 'Experience' },
    { href: '#contact', label: lang === 'tr' ? 'İletişim' : 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-[#FBFBFB]/90 backdrop-blur-md border-b border-black/5 shadow-xs'
          : 'bg-[#FBFBFB] border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line wordmark */}
        <a
          href="#"
          className="text-base font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-[#0F3B54] transition-colors"
        >
          {portfolioConfig.personal.name}
        </a>

        {/* Zone 2: 4–5 nav links, 1–2 word labels, single-line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-slate-400 decoration-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + subtle utility */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            aria-label="Change language"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-600 hover:text-slate-900 rounded-md border border-slate-200/80 hover:bg-slate-100/60 transition-colors whitespace-nowrap shrink-0"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* GitHub link */}
          <a
            href={portfolioConfig.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden lg:inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          {/* Primary Action Button: CV */}
          <button
            onClick={onOpenCV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0F3B54] hover:bg-[#0A2738] active:scale-[0.98] rounded-md transition-all shadow-xs whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'tr' ? 'CV Görüntüle' : 'View Resume'}</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 px-6 py-4 shadow-md transition-all">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-[#0F3B54] py-1 border-b border-slate-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={() => {
                  setLang(lang === 'tr' ? 'en' : 'tr');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-600 py-1"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye Geç'}</span>
              </button>
              <a
                href={portfolioConfig.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-slate-600 py-1 font-mono"
              >
                github.com/mesutalperenkir
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
