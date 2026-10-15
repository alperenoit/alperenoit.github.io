/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceEducation } from './components/ExperienceEducation';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { portfolioConfig } from './data/portfolioData';
import { ShieldCheck, Sliders, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#111827] flex flex-col font-sans selection:bg-[#0F3B54]/15 selection:text-[#0F3B54]">
      {/* Top Bar Navigation */}
      <Navbar lang={lang} setLang={setLang} onOpenCV={() => setIsCVOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero lang={lang} />
        <ProjectsSection lang={lang} />
        <SkillsSection lang={lang} />
        <ExperienceEducation lang={lang} />
        <AboutSection lang={lang} />
        <ContactSection lang={lang} onOpenCV={() => setIsCVOpen(true)} />
      </main>

      {/* Recruiter & Customization Information Drawer */}
      <section className="bg-slate-100/90 border-t border-slate-200 py-6 text-xs text-slate-600">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowConfigGuide(!showConfigGuide)}>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0F3B54]" />
              <span className="font-semibold text-slate-800">
                {lang === 'tr'
                  ? 'İşe Alım Uzmanı Doğrulama Standartları & Kolay Düzenleme Kılavuzu'
                  : 'Recruiter Verification Standards & Configuration Guide'}
              </span>
            </div>
            <button
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
              aria-label="Toggle configuration guide"
            >
              <span>{showConfigGuide ? (lang === 'tr' ? 'Gizle' : 'Hide') : (lang === 'tr' ? 'Aç / İncele' : 'Expand')}</span>
              {showConfigGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showConfigGuide && (
            <div className="mt-5 pt-5 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'tr' ? 'Teknik İşe Alım Kriterleri Uyumu' : 'Hiring Criteria Compliance'}</span>
                </h4>
                <ul className="space-y-1.5 text-slate-600 pl-1">
                  {portfolioConfig.checklistForRecruiter[lang].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#0F3B54]" />
                  <span>{lang === 'tr' ? 'Kişiselleştirme & Bilgi Güncelleme' : 'Customization & Data File'}</span>
                </h4>
                <p className="text-slate-600 mb-2 leading-relaxed">
                  {lang === 'tr'
                    ? 'Tüm kişisel veriler (Ad Soyad, Üniversite, E-posta, GitHub, LinkedIn, Projeler, Yetkinlikler ve Stajlar) tek bir dosyadan kolayca yönetilir:'
                    : 'All candidate data (Name, University, Email, GitHub, LinkedIn, Projects, Skills, and Experiences) is centralized in:'}
                </p>
                <code className="inline-block bg-white px-2.5 py-1 rounded border border-slate-300 font-mono text-[11px] text-slate-800">
                  src/data/portfolioData.ts
                </code>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Curriculum Vitae Modal */}
      <CVModal isOpen={isCVOpen} lang={lang} onClose={() => setIsCVOpen(false)} />
    </div>
  );
}
