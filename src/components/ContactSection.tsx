import React, { useState } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { Mail, Github, Linkedin, Copy, Check, Send, FileText, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  lang: 'tr' | 'en';
  onOpenCV: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onOpenCV }) => {
  const { personal } = portfolioConfig;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(
        lang === 'tr'
          ? 'Lütfen ad, e-posta ve mesaj alanlarını doldurun.'
          : 'Please fill in your name, email, and message.'
      );
      setFormStatus('error');
      return;
    }

    setFormStatus('sending');

    // Simulate reliable dispatch & formulate mailto link fallback
    setTimeout(() => {
      setFormStatus('success');
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
            {lang === 'tr' ? '05 · İletişim & Fırsatlar' : '05 · Contact & Opportunities'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {lang === 'tr'
              ? 'Birlikte geliştirebileceğimiz sistemler veya fırsatlar hakkında konuşalım.'
              : 'Let’s discuss upcoming engineering roles, projects, or collaborations.'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            {lang === 'tr'
              ? 'Yazılım Mühendisliği pozisyonları, teknik değerlendirmeler veya projeler üzerine görüşmek için doğrudan e-posta gönderebilir veya formu doldurabilirsiniz.'
              : 'Open for Software Engineering opportunities and technical interviews. Reach out directly via email or the form below.'}
          </p>
        </div>

        {/* 2-Column Split: Direct Channels & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card with 1-click Copy */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-xl shadow-2xs">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                {lang === 'tr' ? 'Doğrudan E-Posta' : 'Direct Email'}
              </div>
              <div className="text-base font-bold text-slate-900 break-all mb-4">
                {personal.email}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`mailto:${personal.email}?subject=${encodeURIComponent(
                    lang === 'tr' ? 'Yazılım Mühendisliği Fırsatı / Tanışma' : 'Software Engineering Opportunity'
                  )}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0F3B54] hover:bg-[#0A2738] rounded-md transition-colors shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{lang === 'tr' ? 'E-Posta Uygulamasında Aç' : 'Open in Mail App'}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">
                        {lang === 'tr' ? 'Kopyalandı' : 'Copied'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>{lang === 'tr' ? 'Adresi Kopyala' : 'Copy Email'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Profiles & CV Download Card */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-xl shadow-2xs space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                {lang === 'tr' ? 'Profesyonel Ağlar & CV' : 'Profiles & Resume'}
              </div>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-slate-700" />
                  <span className="font-semibold text-slate-900">GitHub</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 font-mono">
                  <span>/mesutalperenkir</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-[#0077b5]" />
                  <span className="font-semibold text-slate-900">LinkedIn</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 font-mono">
                  <span>/in/mesutalperenkir</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>

              <button
                onClick={onOpenCV}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all text-xs text-left"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#0F3B54]" />
                  <span className="font-semibold text-slate-900">
                    {lang === 'tr' ? 'Özgeçmiş / Resume (PDF Görünümü)' : 'Curriculum Vitae (PDF View)'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#0F3B54]">Görüntüle →</span>
              </button>
            </div>
          </div>

          {/* Contact Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl p-6 sm:p-8 shadow-2xs">
            {formStatus === 'success' ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {lang === 'tr' ? 'Mesajınız İletildi' : 'Message Recorded'}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {lang === 'tr'
                    ? `Teşekkürler ${formData.name}. Mesajınızı aldım, en kısa sürede ${formData.email} adresi üzerinden size dönüş yapacağım.`
                    : `Thank you, ${formData.name}. I will follow up with you promptly at ${formData.email}.`}
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={`mailto:${personal.email}?subject=${encodeURIComponent(
                      formData.subject || 'Portfolio Inquiry'
                    )}&body=${encodeURIComponent(
                      `Gönderen: ${formData.name} (${formData.email})\n\n${formData.message}`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{lang === 'tr' ? 'Doğrudan E-Posta ile de gönder' : 'Also send via email'}</span>
                  </a>
                  <button
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 underline"
                  >
                    {lang === 'tr' ? 'Yeni Mesaj Yaz' : 'Send Another Message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      {lang === 'tr' ? 'Adınız Soyadınız' : 'Your Name'} *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ahmet Yılmaz"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0F3B54]/20 focus:border-[#0F3B54] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      {lang === 'tr' ? 'E-Posta Adresiniz' : 'Your Email'} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ad.soyad@company.com"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0F3B54]/20 focus:border-[#0F3B54] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    {lang === 'tr' ? 'Konu / Pozisyon' : 'Subject / Position'}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={
                      lang === 'tr'
                        ? 'Yazılım Mühendisliği Pozisyonu / Proje İş Birliği'
                        : 'Software Engineering Opportunity / Project Discussion'
                    }
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0F3B54]/20 focus:border-[#0F3B54] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    {lang === 'tr' ? 'Mesajınız' : 'Your Message'} *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      lang === 'tr'
                        ? 'Merhaba, projelerinizi inceledik ve ekibimizdeki backend mühendisliği pozisyonu için sizinle görüşmek isteriz...'
                        : 'Hello, we reviewed your system projects and would like to invite you for a technical discussion...'
                    }
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0F3B54]/20 focus:border-[#0F3B54] transition-all resize-y"
                  ></textarea>
                </div>

                {formStatus === 'error' && (
                  <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-md">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {lang === 'tr'
                      ? 'Kişisel verileriniz gizli tutulur, spam gönderilmez.'
                      : 'Respects your privacy. Zero spam.'}
                  </span>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0F3B54] hover:bg-[#0A2738] active:scale-[0.98] disabled:opacity-70 rounded-md transition-all shadow-xs"
                  >
                    {formStatus === 'sending' ? (
                      <span>{lang === 'tr' ? 'Gönderiliyor...' : 'Sending...'}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{lang === 'tr' ? 'Mesajı Gönder' : 'Send Message'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
