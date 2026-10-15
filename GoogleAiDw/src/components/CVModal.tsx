import React, { useEffect } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { X, Printer, Download, Mail, Github, Linkedin, MapPin, ExternalLink } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  lang: 'tr' | 'en';
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, lang, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { personal, education, experiences, projects, skills } = portfolioConfig;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-4 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-slate-300">
              {lang === 'tr' ? 'RESUME // ÖZGEÇMİŞ ÖNİZLEME' : 'RESUME // CURRICULUM VITAE'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'tr' ? 'Yazdır / PDF Olarak Kaydet' : 'Print / Save as PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-md transition-colors"
              aria-label="Close CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Paper */}
        <div className="p-8 sm:p-12 max-h-[85vh] overflow-y-auto font-sans leading-normal text-slate-900 print:max-h-none print:p-0">
          {/* Header */}
          <div className="border-b border-slate-300 pb-6 mb-6">
            <h1 id="cv-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mb-1">
              {personal.name}
            </h1>
            <div className="text-sm font-semibold text-[#0F3B54] mb-3">
              {personal.role[lang]} · {personal.status[lang]}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {personal.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {personal.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-500" />
                github.com/mesutalperenkir
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                linkedin.com/in/mesutalperenkir
              </span>
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F3B54] border-b border-slate-200 pb-1 mb-3">
              {lang === 'tr' ? 'EĞİTİM' : 'EDUCATION'}
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between items-baseline text-sm font-bold text-slate-900">
                  <span>{edu.institution}</span>
                  <span className="font-mono text-xs text-slate-600">{edu.period}</span>
                </div>
                <div className="text-xs text-slate-700 italic">
                  {edu.degree[lang]} — {edu.status[lang]}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  <span className="font-semibold text-slate-800">
                    {lang === 'tr' ? 'Çekirdek Dersler: ' : 'Coursework: '}
                  </span>
                  {edu.coreCoursework.slice(0, 5).join(' · ')}
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F3B54] border-b border-slate-200 pb-1 mb-3">
              {lang === 'tr' ? 'TEKNİK YETKİNLİKLER' : 'TECHNICAL SKILLS'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div>
                <span className="font-bold text-slate-900">
                  {lang === 'tr' ? 'Diller: ' : 'Languages: '}
                </span>
                <span className="text-slate-700">Go (Golang), TypeScript, C++, Python, SQL, Java</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">
                  {lang === 'tr' ? 'Backend & Sistemler: ' : 'Backend & Systems: '}
                </span>
                <span className="text-slate-700">REST, gRPC, Redis Streams, Concurrency, Circuit Breaker</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">
                  {lang === 'tr' ? 'Web & Frontend: ' : 'Frontend & Web: '}
                </span>
                <span className="text-slate-700">React, WebSockets, CRDT (Yjs), Canvas 2D, Tailwind CSS</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">
                  {lang === 'tr' ? 'Altyapı & Araçlar: ' : 'DevOps & Tools: '}
                </span>
                <span className="text-slate-700">Docker, PostgreSQL, Linux, Git, CI/CD, OpenTelemetry</span>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F3B54] border-b border-slate-200 pb-1 mb-3">
              {lang === 'tr' ? 'ÖNE ÇIKAN MÜHENDİSLİK PROJELERİ' : 'SELECTED ENGINEERING PROJECTS'}
            </h2>
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-950">
                      {proj.title}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">{proj.period}</span>
                  </div>
                  <div className="text-slate-600 font-mono text-[11px] mb-1">
                    {proj.stack.map(s => s.name).join(' · ')}
                  </div>
                  <p className="text-slate-700 leading-normal mb-1">
                    {proj.tagline[lang]}
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                    {proj.verifiedOutcomes.slice(0, 2).map((outcome, oIdx) => (
                      <li key={oIdx}>{outcome[lang]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F3B54] border-b border-slate-200 pb-1 mb-3">
              {lang === 'tr' ? 'DENEYİM' : 'EXPERIENCE'}
            </h2>
            {experiences.map((exp, idx) => (
              <div key={idx} className="mb-3 text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-950 text-sm">
                  <span>{exp.role[lang]} — {exp.company}</span>
                  <span className="font-mono text-[11px] text-slate-500 font-normal">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-slate-700 mt-1 space-y-0.5">
                  {exp.responsibilities.map((r, rIdx) => (
                    <li key={rIdx}>{r[lang]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 font-mono flex justify-between items-center">
            <span>Portfolio: {window.location.origin}</span>
            <span>{personal.name} · {personal.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
