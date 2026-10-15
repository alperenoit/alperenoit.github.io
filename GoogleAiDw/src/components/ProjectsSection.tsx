import React, { useState } from 'react';
import { portfolioConfig, Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Code2, Sparkles, Filter } from 'lucide-react';

interface ProjectsSectionProps {
  lang: 'tr' | 'en';
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: lang === 'tr' ? 'Tüm Projeler' : 'All Projects' },
    { id: 'Distributed Systems', label: lang === 'tr' ? 'Dağıtık Sistemler' : 'Distributed Systems' },
    { id: 'Web Architecture & Concurrency', label: lang === 'tr' ? 'Web & Concurrency' : 'Web & Concurrency' },
    { id: 'Systems Programming & Data', label: lang === 'tr' ? 'Sistem & Veri' : 'Systems & Data' },
    { id: 'Cloud & Infrastructure', label: lang === 'tr' ? 'Bulut Altyapısı' : 'Cloud Infra' },
  ];

  const filteredProjects = portfolioConfig.projects.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category.en === activeCategory;
  });

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'tr' ? '01 · Mühendislik Portfolyosu' : '01 · Engineering Case Studies'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {lang === 'tr'
                ? 'Öne Çıkan Sistem Projeleri & Vaka Çalışmaları'
                : 'Featured System Projects & Architecture Studies'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              {lang === 'tr'
                ? 'Sıradan şablonlar yerine; concurrency modelleri, veri tutarlılığı, depolama formatları ve hata toleransı üzerine geliştirilmiş gerçek mühendislik çözümleri.'
                : 'Real engineering solutions demonstrating concurrency models, data consistency, columnar layouts, and fault-tolerance patterns.'}
            </p>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg shrink-0 self-start md:self-auto border border-slate-200/60">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={lang}
              onSelect={(p) => setSelectedProject(p)}
              isFeatured={idx === 0 && activeCategory === 'all'}
            />
          ))}
        </div>

        {/* Case Study Detail Modal */}
        <ProjectModal
          project={selectedProject}
          lang={lang}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
