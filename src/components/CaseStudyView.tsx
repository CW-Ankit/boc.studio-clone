'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAssetUrl } from '@/lib/assets';
import { ArrowGlyph, ArrowButton } from './ArrowSvg';
import { useLanguage } from '@/context/LanguageContext';
import projectsData from '@/data/projects.json';

interface CaseStudyViewProps {
  slug: string;
}

export function CaseStudyView({ slug }: CaseStudyViewProps) {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('context');

  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex] || projectsData[0];
  const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

  const sections = project.narrativeSections || [
    { id: 'context', heading: 'Context', paragraphs: [project.description], media: [] },
  ];

  // Scroll spy to highlight active section in sidebar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article data-case-root="true" className="flex flex-col w-full">
      {/* Top Mobile Title Bar */}
      <div className="flex flex-col gap-[10px] px-[15px] pt-[20px] pb-[15px] lg:hidden border-b border-white/10">
        <div className="flex items-center gap-[8px] text-[12px] text-boc-muted uppercase tracking-[0.04em]">
          <Link href="/work" className="hover:text-white">
            Work
          </Link>
          <span>/</span>
          <span className="text-white">{project.title}</span>
        </div>
        <h1 className="text-[32px] font-normal leading-tight tracking-[-0.02em] text-boc-text-on-canvas">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="text-[14px] text-boc-muted">{project.tagline}</p>
        )}
      </div>

      <div className="grid w-full grid-cols-1 lg:grid-cols-[var(--boc-sidebar-w)_1fr]">
        {/* Left Sticky Sidebar */}
        <aside className="px-[15px] pt-[30px] pb-[40px] lg:sticky lg:top-[50px] lg:flex lg:h-[calc(100vh-50px)] lg:flex-col lg:justify-between border-r border-white/5">
          <div className="flex flex-col gap-[20px]">
            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-[8px] text-[12px] text-boc-muted uppercase tracking-[0.04em]">
              <Link href="/work" className="hover:text-white transition-colors">
                Work
              </Link>
              <span>/</span>
              <span className="text-white">{project.title}</span>
            </div>

            {/* Desktop Title & Meta */}
            <div className="hidden lg:flex flex-col gap-[6px]">
              <h1 className="text-[clamp(28px,2rem+0.5vw,36px)] font-normal tracking-[-0.02em] leading-tight text-white">
                {project.title}
              </h1>
              {project.tagline && (
                <p className="text-[14px] text-boc-muted">{project.tagline}</p>
              )}
              {project.meta && project.meta.length > 0 && (
                <div className="flex flex-wrap gap-[8px] pt-[8px]">
                  {project.meta.map((m: string) => (
                    <span
                      key={m}
                      className="text-[11px] uppercase tracking-[0.04em] text-white/60 border border-white/10 rounded-full px-2 py-0.5"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Table of Contents Section Nav */}
            <nav aria-label="Section navigation" className="hidden lg:flex flex-col gap-[8px] pt-[20px]">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left text-[14px] tracking-[-0.01em] transition-all cursor-pointer ${
                    activeSection === sec.id
                      ? 'text-boc-orange font-medium translate-x-1'
                      : 'text-boc-muted hover:text-white'
                  }`}
                >
                  {sec.heading}
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom Sidebar Promo / CTA */}
          <div className="hidden lg:flex flex-col gap-[10px] p-[16px] rounded-lg bg-white/5 border border-white/10">
            <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-boc-orange">
              {project.banner?.headline || 'Have a brand project in mind?'}
            </span>
            <p className="text-[12px] text-boc-muted leading-snug">
              {project.banner?.body || 'Tell us about your project and what you want to achieve.'}
            </p>
            <a
              href="mailto:hola@boc.studio"
              className="inline-flex items-center gap-[6px] text-[12px] text-white hover:text-boc-orange font-medium transition-colors pt-1"
            >
              <span>{t('contact', 'cta', 'Get in touch')}</span>
              <ArrowGlyph className="w-[10px] h-[10px]" />
            </a>
          </div>
        </aside>

        {/* Right Content Column: Narrative & Rich Media */}
        <div className="flex min-w-0 flex-col px-[15px] pt-[30px] pb-[80px]">
          <div className="flex flex-col gap-[60px] max-w-[1100px]">
            {sections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                data-section={sec.id}
                aria-label={sec.heading}
                className="flex flex-col gap-[25px] scroll-mt-[100px]"
              >
                {/* Section Header & Body */}
                <div className="flex flex-col gap-[12px] max-w-[800px]">
                  <h2 className="text-[clamp(20px,1.25rem+0.5vw,26px)] font-normal text-white tracking-[-0.02em]">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-[15px] lg:text-[17px] text-white/80 leading-relaxed font-normal"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Section Media Gallery */}
                {sec.media && sec.media.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] pt-[10px]">
                    {sec.media.map((imgUrl, i) => {
                      const localUrl = getAssetUrl(imgUrl);
                      const isFullWidth = sec.media.length % 2 !== 0 && i === 0;

                      return (
                        <div
                          key={i}
                          className={`overflow-hidden rounded-none bg-boc-offblack ${
                            isFullWidth ? 'md:col-span-2' : ''
                          }`}
                        >
                          <img
                            src={localUrl}
                            alt={`${project.title} - ${sec.heading} visual ${i + 1}`}
                            loading="lazy"
                            className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            ))}

            {/* Next Project Teaser Footer */}
            {nextProject && (
              <div className="pt-[60px] border-t border-white/10 flex flex-col gap-[15px]">
                <span className="text-[12px] uppercase tracking-[0.04em] text-boc-muted font-medium">
                  {t('project', 'nextProject', 'Next project')}
                </span>
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="group inline-flex items-center justify-between text-[clamp(26px,2rem+1vw,40px)] text-white hover:text-boc-orange transition-colors"
                >
                  <span className="font-normal tracking-[-0.02em]">{nextProject.title}</span>
                  <span className="group-hover:translate-x-2 transition-transform">
                    <ArrowButton />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
