import React from 'react';
import { Project } from '../data/portfolioData';
import { ArchitectureSchematic } from './ArchitectureSchematic';
import { ArrowUpRight, Github, Layers, Cpu, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  lang: 'tr' | 'en';
  onSelect: (project: Project) => void;
  isFeatured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  lang,
  onSelect,
  isFeatured = false,
}) => {
  return (
    <article
      className={`group relative bg-white border border-slate-200/90 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-400/80 hover:shadow-md flex flex-col justify-between ${
        isFeatured ? 'lg:col-span-2' : 'col-span-1'
      }`}
    >
      <div>
        {/* Interactive Architectural Graphic Header */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800">
          <ArchitectureSchematic type={project.diagramType} lang={lang} interactive={false} />
        </div>

        {/* Card Body */}
        <div className="p-6">
          {/* Metadata line: Category & Period - Unboxed text per Zero-Pill rule */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#0F3B54] uppercase tracking-wider">
                {project.category[lang]}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{project.period}</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">{project.badge[lang]}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-[#0F3B54] transition-colors">
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            {project.tagline[lang]}
          </p>

          {/* Key Architectural Choice / Discriminator */}
          {project.keyDecisions && project.keyDecisions.length > 0 && (
            <div className="p-3 bg-[#F8FAFC] border border-slate-200/70 rounded-lg text-xs mb-5">
              <div className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#0F3B54]" />
                <span>{project.keyDecisions[0].title[lang]}</span>
              </div>
              <p className="text-slate-600 leading-normal">
                {project.keyDecisions[0].rationale[lang]}
              </p>
            </div>
          )}

          {/* Tech Stack - Unboxed list with subtle dividers */}
          <div className="mb-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              {lang === 'tr' ? 'Kullanılan Teknolojiler' : 'Technology Stack'}
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-700">
              {project.stack.map((item, idx) => (
                <React.Fragment key={item.name}>
                  <span className="font-medium text-slate-800 hover:text-slate-950 transition-colors">
                    {item.name}
                  </span>
                  {idx < project.stack.length - 1 && (
                    <span aria-hidden="true" className="text-slate-300">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Action Links */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-4">
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F3B54] hover:text-[#0A2738] group/btn transition-colors"
        >
          <span>{lang === 'tr' ? 'Vaka Çalışmasını İncele' : 'View Full Case Study'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-950 p-1.5 rounded transition-colors"
              aria-label={`${project.title} GitHub Repository`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
