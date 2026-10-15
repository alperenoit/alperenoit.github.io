import React from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Terminal, Lightbulb, Compass, Award, CheckCircle } from 'lucide-react';

interface AboutSectionProps {
  lang: 'tr' | 'en';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-black/5 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading and Narrative (7 cols) */}
          <div className="lg:col-span-7">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'tr' ? '04 · Hakkımda & Mühendislik Yaklaşımı' : '04 · About & Engineering Philosophy'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">
              {lang === 'tr'
                ? 'Teorik temelleri, üretim kalitesinde güvenilir yazılımlara dönüştürmek.'
                : 'Bridging computer science theory into resilient production software.'}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                {lang === 'tr'
                  ? 'Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. Üniversite hayatım boyunca yalnızca popüler kütüphaneleri kullanmakla yetinmeyip, bir sistemin derinliklerinde ne olup bittiğini anlamayı amaç edindim: İşletim sistemi çekirdeğinin hafızayı nasıl yönettiği, ağ paketlerinin soket seviyesinde nasıl iletildiği ve dağıtık düğümler arasında mutlak tutarlılığın (consensus) neden bu kadar zor olduğu gibi temel sorulara odaklandım.'
                  : 'As a senior Computer Engineering undergraduate, I have always looked beneath the framework abstraction layer. My academic curiosity centers on how the OS kernel manages memory, how bytes serialize across low-level sockets, and why consensus across distributed nodes is one of computing\'s most intriguing problems.'}
              </p>

              <p>
                {lang === 'tr'
                  ? 'Öğrenci olmak benim için bir eksiklik değil; yeni teknolojileri hızla test etme, karmaşık teknik dokümanları ve akademik makaleleri doğrudan koda dökebilme çevikliğidir. Projelerimde sahte veya süslü özellikler yerine; Go, Redis Streams, CRDT ve sütun tabanlı depolama gibi gerçek sistem mühendisliği prensiplerini tercih ediyorum.'
                  : 'Being an undergraduate is an asset for agility: an uncompromised hunger to digest deep technical specifications, test architectural hypotheses, and implement clean code. I deliberately build projects around verified engineering patterns — idempotent worker pools, CRDT state convergence, and columnar chunk pruning.'}
              </p>

              <p>
                {lang === 'tr'
                  ? 'Kariyer hedefim; yüksek hacimli sistemlerde veri tutarlılığı, mikroservis mimarileri veya dağıtık veri akışları üzerine çalışan yetkin bir mühendislik ekibine tam zamanlı katılarak somut değer üretmektir.'
                  : 'My objective is to join an ambitious engineering team as a Software Engineer, contributing directly to high-throughput backend services, distributed systems, or core platform infrastructure.'}
              </p>
            </div>
          </div>

          {/* Right Column: 3 Guiding Principles (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              {lang === 'tr' ? 'Çalışma İlkelerim' : 'Core Working Principles'}
            </div>

            <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                <Lightbulb className="w-4 h-4 text-[#0F3B54]" />
                <span>{lang === 'tr' ? '1. Doğruluk ve İdempotency' : '1. Correctness & Idempotency'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'tr'
                  ? 'Ağ arızalanabilir, sunucular çökebilir. Sistemler her zaman arızayı beklemeli ve tekrar denenen işlemler yan etki yaratmayacak (idempotent) şekilde tasarlanmalıdır.'
                  : 'Networks fail and servers crash. Architectures must anticipate failure and guarantee that retried operations produce zero corrupting side-effects.'}
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                <Terminal className="w-4 h-4 text-[#0F3B54]" />
                <span>{lang === 'tr' ? '2. Sade Kod & Kanıtlanabilir Mimari' : '2. Simplicity & Traceability'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'tr'
                  ? 'Karmaşık ve aşırı soyutlanmış tasarımlar hata kaynağıdır. Okunabilir kod, net tip tanımları ve kapsamlı testler her zaman aşırı mühendislikten (over-engineering) üstündür.'
                  : 'Unnecessary abstraction breeds subtle bugs. Clean readable code, strong typing, and comprehensive integration tests beat over-engineered magic.'}
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200/90 rounded-xl shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1.5">
                <Compass className="w-4 h-4 text-[#0F3B54]" />
                <span>{lang === 'tr' ? '3. Sürekli Mühendislik Merakı' : '3. Relentless Technical Curiosity'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'tr'
                  ? 'Yalnızca "nasıl çalıştığını" değil, "neden o şekilde tasarlandığını" anlamak. Donanım ve bellek dinamiklerinden en üst düzey web arayüzlerine kadar bütünsel bir bakış açısı.'
                  : 'Seeking not just how a tool works, but why it was designed that way. Maintaining a full-stack mental model from OS cache lines to browser rendering loops.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
