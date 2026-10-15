import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Terminal, Database, Cloud, Layout, Binary, ShieldCheck } from 'lucide-react';

interface SkillsSectionProps {
  lang: 'tr' | 'en';
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const { skills } = portfolioConfig;

  const categoryIcons: Record<number, React.ReactNode> = {
    0: <Terminal className="w-4 h-4 text-[#0F3B54]" />,
    1: <Binary className="w-4 h-4 text-[#0F3B54]" />,
    2: <Layout className="w-4 h-4 text-[#0F3B54]" />,
    3: <Database className="w-4 h-4 text-[#0F3B54]" />,
    4: <Cloud className="w-4 h-4 text-[#0F3B54]" />,
    5: <ShieldCheck className="w-4 h-4 text-[#0F3B54]" />,
  };

  return (
    <section id="skills" className="py-20 md:py-28 border-b border-black/5 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
            {lang === 'tr' ? '02 · Teknik Yetkinlikler' : '02 · Technical Capabilities'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {lang === 'tr'
              ? 'Mühendislik Araçları & Yetkinlik Alanları'
              : 'Engineering Tooling & Domain Proficiencies'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            {lang === 'tr'
              ? 'Yapay yüzde çubukları veya yüzeysel "uzman" etiketleri yerine; projelerde aktif olarak kullanılan, teorisi ve pratik dinamikleri açıklanabilir teknolojiler.'
              : 'Concrete skills grounded in actual project execution, algorithms, and systems architectures — free from arbitrary percentage bars.'}
          </p>
        </div>

        {/* Categories Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, catIdx) => (
            <div
              key={catIdx}
              className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-2">
                  {categoryIcons[catIdx] || <Terminal className="w-4 h-4 text-[#0F3B54]" />}
                  <h3 className="text-base font-bold text-slate-900">
                    {category.title[lang]}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-5 leading-normal">
                  {category.description[lang]}
                </p>

                {/* Items List - Clean unboxed text with subtle metadata */}
                <div className="space-y-3.5">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="group/item pb-2.5 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-900 group-hover/item:text-[#0F3B54] transition-colors">
                          {item.name}
                        </span>
                        {item.projectRefId && (
                          <a
                            href="#projects"
                            className="text-[11px] font-mono text-[#0F3B54] hover:underline"
                          >
                            {lang === 'tr' ? 'projede kullanıldı' : 'used in project'}
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5 leading-tight font-sans">
                        {item.context[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Philosophy Card on CS Fundamentals */}
        <div className="mt-10 p-5 bg-white border border-slate-200/90 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            <span className="font-semibold text-slate-900">
              {lang === 'tr' ? 'Mühendislik İlkesi: ' : 'Engineering Philosophy: '}
            </span>
            {portfolioConfig.personal.philosophy[lang]}
          </div>
          <a
            href="#contact"
            className="text-xs font-semibold text-[#0F3B54] hover:underline whitespace-nowrap shrink-0"
          >
            {lang === 'tr' ? 'Teknik mülakat için ulaşın →' : 'Connect for technical interview →'}
          </a>
        </div>
      </div>
    </section>
  );
};
