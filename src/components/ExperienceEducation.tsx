import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, BookOpen } from 'lucide-react';

interface ExperienceEducationProps {
  lang: 'tr' | 'en';
}

export const ExperienceEducation: React.FC<ExperienceEducationProps> = ({ lang }) => {
  const { experiences, education } = portfolioConfig;

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
            {lang === 'tr' ? '03 · Deneyim & Akademik Geçmiş' : '03 · Experience & Education'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {lang === 'tr'
              ? 'Mühendislik Deneyimi & Akademik Temeller'
              : 'Work Experience & Academic Foundations'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            {lang === 'tr'
              ? 'Staj süresince üstlenilen gerçek sorumluluklar, öğrenilen teknik pratikler ve 4 yıllık bilgisayar mühendisliği lisans müfredatı.'
              : 'Direct internship responsibilities, technical takeaways, and structured computer engineering coursework.'}
          </p>
        </div>

        {/* 2-Column Split: Work Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Work / Research Experience (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Briefcase className="w-4 h-4 text-[#0F3B54]" />
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'tr' ? 'Staj & Mühendislik Çalışmaları' : 'Internship & Engineering Work'}
              </h3>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <article
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  {/* Role & Company */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h4 className="text-base font-bold text-slate-900">
                      {exp.role[lang]}
                    </h4>
                    <span className="text-xs font-mono text-slate-500">
                      {exp.period}
                    </span>
                  </div>

                  {/* Company & Location Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
                    <span className="font-semibold text-slate-700">{exp.company}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-600">{exp.type[lang]}</span>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-2 mb-4 text-xs sm:text-sm text-slate-600">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0F3B54] mt-2 shrink-0"></span>
                        <span className="leading-relaxed">{resp[lang]}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Key Takeaway / Learning */}
                  <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-lg text-xs mb-4">
                    <span className="font-semibold text-slate-800">
                      {lang === 'tr' ? 'Önemli Kazanım: ' : 'Key Takeaway: '}
                    </span>
                    <span className="text-slate-600">{exp.keyLearning[lang]}</span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-mono text-[11px] mr-1">
                      {lang === 'tr' ? 'Teknolojiler:' : 'Stack:'}
                    </span>
                    {exp.technologies.map((t, tIdx) => (
                      <span key={t} className="font-medium text-slate-700">
                        {t}{tIdx < exp.technologies.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Education & Core Coursework (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <GraduationCap className="w-4 h-4 text-[#0F3B54]" />
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'tr' ? 'Akademik Eğitim' : 'Academic Education'}
              </h3>
            </div>

            {education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-2xs space-y-6"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-1 mb-1">
                    <h4 className="text-base font-bold text-slate-900">
                      {edu.degree[lang]}
                    </h4>
                    <span className="text-xs font-mono text-slate-500">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#0F3B54] mb-2">
                    {edu.institution}
                  </div>
                  <div className="text-xs font-mono text-slate-500 bg-slate-50 py-1.5 px-2.5 rounded border border-slate-100 mb-3">
                    {edu.status[lang]}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {edu.description[lang]}
                  </p>
                </div>

                {/* Core Coursework */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#0F3B54]" />
                    <span>{lang === 'tr' ? 'Alınan Çekirdek Dersler' : 'Key CS Coursework'}</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    {edu.coreCoursework.map((course, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2">
                        <span className="text-slate-300 font-mono">›</span>
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                    {lang === 'tr' ? 'Uzmanlaşma Alanları' : 'Academic Focus Areas'}
                  </div>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs font-medium text-slate-700">
                    {edu.focusAreas.map((f, fIdx) => (
                      <span key={fIdx}>
                        {f[lang]}{fIdx < edu.focusAreas.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
