import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { ArchitectureSchematic } from './ArchitectureSchematic';
import { X, Github, ExternalLink, Cpu, CheckCircle2, AlertTriangle, Code, ArrowUpRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  lang: 'tr' | 'en';
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, lang, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-6 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-0.5">
              <span className="font-semibold text-[#0F3B54] uppercase">{project.category[lang]}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{project.period}</span>
            </div>
            <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-slate-900 truncate">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            )}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Executive Overview */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              {lang === 'tr' ? '01. Proje Amacı ve Genel Bakış' : '01. Executive Overview'}
            </h4>
            <p className="text-base text-slate-700 leading-relaxed">
              {project.overview[lang]}
            </p>
          </section>

          {/* Problem & Solution Split */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-[#F8FAFC] border border-slate-200/80 rounded-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-700 mb-2 uppercase">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{lang === 'tr' ? 'Çözülen Sistem Problemi' : 'Problem Statement'}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.problem[lang]}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700 mb-2 uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'tr' ? 'Tasarlanan Çözüm' : 'Engineered Solution'}</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {project.solution[lang]}
              </p>
            </div>
          </section>

          {/* Interactive Architecture Diagram */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              {lang === 'tr' ? '02. Sistem Mimarisi & Veri Akışı' : '02. System Architecture & Flow'}
            </h4>
            <ArchitectureSchematic type={project.diagramType} lang={lang} interactive={true} />
            <p className="text-xs text-slate-600 leading-relaxed mt-3 pl-1">
              {project.architecture[lang]}
            </p>
          </section>

          {/* Key Architectural Trade-Offs (Why X over Y) */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              {lang === 'tr' ? '03. Mimari Kararlar & Neden Seçildiler?' : '03. Architectural Trade-Offs'}
            </h4>
            <div className="space-y-3">
              {project.keyDecisions.map((decision, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-lg bg-white">
                  <div className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-1.5">
                    <Cpu className="w-4 h-4 text-[#0F3B54]" />
                    <span>{decision.title[lang]}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {decision.rationale[lang]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Hurdles and Resolution */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              {lang === 'tr' ? '04. Karşılaşılan Teknik Zorluklar & Çözüm' : '04. Engineering Hurdles & Resolution'}
            </h4>
            <div className="space-y-3">
              {project.challengesAndSolutions.map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <div className="text-xs font-semibold text-slate-800 mb-1">
                    <span className="text-rose-600 font-mono mr-1.5">[Zorluk]:</span>
                    {item.challenge[lang]}
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed pl-4 border-l-2 border-emerald-500 mt-2">
                    <span className="font-semibold text-emerald-700 mr-1.5">[Çözüm]:</span>
                    {item.resolution[lang]}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verified Technical Outcomes & Benchmarks */}
          <section>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              {lang === 'tr' ? '05. Doğrulanabilir Kazanımlar & Metrikler' : '05. Verifiable Outcomes & Benchmarks'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.verifiedOutcomes.map((metric, i) => (
                <div key={i} className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-lg text-xs">
                  <div className="text-emerald-700 font-bold mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{lang === 'tr' ? `Metrik #${i + 1}` : `Outcome #${i + 1}`}</span>
                  </div>
                  <p className="text-slate-700 leading-normal">{metric[lang]}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Code Highlight */}
          {project.codeHighlight && (
            <section>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>{lang === 'tr' ? '06. Çekirdek Kod Kesiti' : '06. Core Implementation Snippet'}</span>
                <span className="text-[11px] font-mono text-slate-400">{project.codeHighlight.filename}</span>
              </h4>
              <div className="bg-[#0f172a] text-slate-200 rounded-lg p-4 font-mono text-xs overflow-x-auto border border-slate-800">
                <pre>
                  <code>{project.codeHighlight.code}</code>
                </pre>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {project.codeHighlight.description[lang]}
              </p>
            </section>
          )}

          {/* Technology breakdown */}
          <section className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              {lang === 'tr' ? 'Teknoloji Rolleri' : 'Technology Breakdown'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {project.stack.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800">{item.name}</span>
                  <span className="text-slate-500 font-mono text-[11px]">{item.role}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {lang === 'tr' ? 'Kaynak kodlar açık repoda incelenebilir.' : 'Source code available in repository.'}
          </span>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0F3B54] hover:bg-[#0A2738] rounded-md transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{lang === 'tr' ? 'GitHub Deposunu Aç' : 'View on GitHub'}</span>
                <ArrowUpRight className="w-3 h-3 text-sky-200" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              {lang === 'tr' ? 'Kapat' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
