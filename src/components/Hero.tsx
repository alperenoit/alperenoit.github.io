import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Terminal, ShieldCheck } from 'lucide-react';

interface HeroProps {
  lang: 'tr' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const { personal } = portfolioConfig;

  return (
    <section className="pt-12 pb-16 md:pt-16 md:pb-24 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic presentation (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Context line: Unboxed text metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 mb-4 tracking-wide uppercase">
              <span>{personal.status[lang]}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{personal.location}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-6 max-w-2xl">
              {lang === 'tr' ? (
                <>
                  Fikirleri çalışan, dayanıklı ve <span className="text-[#0F3B54] underline decoration-slate-300 decoration-2 underline-offset-4">ölçeklenebilir</span> yazılımlara dönüştürüyorum.
                </>
              ) : (
                <>
                  Translating engineering principles into resilient, <span className="text-[#0F3B54] underline decoration-slate-300 decoration-2 underline-offset-4">scalable</span> software systems.
                </>
              )}
            </h1>

            {/* Authentic intro prose */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {personal.bio[lang]}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0F3B54] hover:bg-[#0A2738] active:scale-[0.98] rounded-md transition-all shadow-xs"
              >
                <span>{lang === 'tr' ? 'Projeleri İncele' : 'Explore Projects'}</span>
                <ArrowDown className="w-4 h-4 text-sky-200" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-800 bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200/90 rounded-md transition-all shadow-2xs"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>{lang === 'tr' ? 'İletişime Geç' : 'Get in Touch'}</span>
              </a>

              {/* Social links */}
              <div className="flex items-center gap-1.5 pl-2 sm:border-l sm:border-slate-200">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Recruiter Trust Note */}
            <div className="flex items-start gap-2.5 text-xs text-slate-500 max-w-lg">
              <ShieldCheck className="w-4 h-4 text-[#0F3B54] shrink-0 mt-0.5" />
              <span>
                {lang === 'tr'
                  ? 'Tüm projeler doğrulanabilir GitHub kaynak kodlarına sahiptir; abartılı metrikler veya sahte unvanlar içermez.'
                  : 'All projects include verifiable source code and real architectural rationale without exaggerated claims.'}
              </span>
            </div>
          </div>

          {/* Right Column: Clean Engineering Terminal / System Architecture Manifest (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#111827] text-slate-200 rounded-xl border border-slate-800/80 shadow-xl overflow-hidden font-mono text-xs">
              {/* Window Header */}
              <div className="bg-[#0b0f19] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Terminal className="w-3 h-3 text-slate-400" />
                  <span>engineer-manifest.json</span>
                </div>
                <span className="text-[10px] text-slate-400">UTF-8</span>
              </div>

              {/* Code/Manifest content */}
              <div className="p-5 space-y-2 leading-relaxed text-slate-300">
                <p className="text-slate-400">// Candidate Profile &amp; Core Architecture</p>
                <p>
                  <span className="text-sky-400">"candidate"</span>: <span className="text-emerald-300">"{personal.name}"</span>,
                </p>
                <p>
                  <span className="text-sky-400">"degree"</span>: <span className="text-emerald-300">"B.Sc. Computer Engineering (Senior)"</span>,
                </p>
                <p>
                  <span className="text-sky-400">"graduation"</span>: <span className="text-emerald-300">"June 2026"</span>,
                </p>
                <p>
                  <span className="text-sky-400">"focus"</span>: [
                </p>
                <div className="pl-4 space-y-1 text-amber-300">
                  <p>"Distributed Systems &amp; Concurrency",</p>
                  <p>"High-Throughput Backend (Go &amp; Redis)",</p>
                  <p>"CRDT &amp; Real-Time Web Architecture"</p>
                </div>
                <p className="text-slate-300">],</p>
                <p>
                  <span className="text-sky-400">"principles"</span>: &#123;
                </p>
                <div className="pl-4 space-y-1 text-slate-400">
                  <p><span className="text-slate-300">"correctnessOverHype"</span>: <span className="text-indigo-400">true</span>,</p>
                  <p><span className="text-slate-300">"cleanArchitecture"</span>: <span className="text-indigo-400">true</span>,</p>
                  <p><span className="text-slate-300">"verifiedBenchmarks"</span>: <span className="text-indigo-400">true</span></p>
                </div>
                <p className="text-slate-300">&#125;,</p>
                <p>
                  <span className="text-sky-400">"openForRoles"</span>: <span className="text-emerald-300">"Full-Time / Junior Software Engineer"</span>
                </p>
              </div>

              {/* Status bar */}
              <div className="bg-[#0b0f19] px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
                <span>Go · TypeScript · C++ · SQL</span>
                <span className="text-slate-300">Ready for Interview</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Credentials / Highlights row below hero split */}
        <div className="mt-14 pt-8 border-t border-black/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              {lang === 'tr' ? 'Eğitim & Durum' : 'Education'}
            </div>
            <div className="text-sm font-semibold text-slate-900">
              {lang === 'tr' ? 'Bilgisayar Müh. 4. Sınıf' : 'Senior CS Student'}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {lang === 'tr' ? 'Mezuniyet: Haziran 2026' : 'Graduation: June 2026'}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              {lang === 'tr' ? 'Birincil Odak' : 'Primary Focus'}
            </div>
            <div className="text-sm font-semibold text-slate-900">
              {lang === 'tr' ? 'Dağıtık Sistemler & Go' : 'Distributed Systems & Go'}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {lang === 'tr' ? 'Concurrency, Redis, gRPC' : 'Concurrency, Redis, gRPC'}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              {lang === 'tr' ? 'Mühendislik Yaklaşımı' : 'Engineering Approach'}
            </div>
            <div className="text-sm font-semibold text-slate-900">
              {lang === 'tr' ? 'Doğrulanabilir Çözümler' : 'Verified Correctness'}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {lang === 'tr' ? 'Idempotency, DLQ, CRDT' : 'Idempotency, DLQ, CRDT'}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              {lang === 'tr' ? 'Kod & Kaynak' : 'Code & Source'}
            </div>
            <div className="text-sm font-semibold text-slate-900">
              {lang === 'tr' ? '%100 Açık Kaynak' : '100% Open Source'}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[#0F3B54] hover:underline"
              >
                <span>github.com/mesutalperenkir</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
