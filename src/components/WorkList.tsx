'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProjectMarqueeStrip } from './ProjectMarqueeStrip';
import { WorkFilter } from './WorkFilter';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowGlyph } from './ArrowSvg';
import projectsData from '@/data/projects.json';

interface WorkListProps {
  initialCategory?: string;
}

export function WorkList({ initialCategory = 'all' }: WorkListProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const { t } = useLanguage();

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'all') return true;
    const catLower = activeCategory.toLowerCase().replace(/-/g, ' ');
    const keywords = (project.keywords || []).map((k: string) => k.toLowerCase());
    const genre = (project.genre || '').toLowerCase();
    const meta = (project.meta || []).map((m: string) => m.toLowerCase());
    return (
      keywords.some((k: string) => k.includes(catLower)) ||
      genre.includes(catLower) ||
      meta.some((m: string) => m.includes(catLower))
    );
  });

  return (
    <article data-work-landing="true" className="flex flex-col w-full">
      <div className="grid w-full grid-cols-1 lg:grid-cols-[var(--boc-sidebar-w)_1fr]">
        {/* Left Sticky Sidebar */}
        <aside className="px-[15px] pt-[20px] pb-[30px] lg:sticky lg:top-[50px] lg:flex lg:h-[calc(100vh-50px)] lg:flex-col lg:justify-between">
          <div className="flex flex-col gap-[20px]">
            <h1 className="text-boc-text-on-canvas text-[clamp(28px,2rem+0.5vw,36px)] font-normal tracking-[-0.02em] leading-none">
              {t('work', 'title', 'Work')}
            </h1>

            <WorkFilter
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* Bottom info on desktop */}
          <div className="hidden lg:block text-boc-muted text-[13px] tracking-[-0.01em]">
            <span>{filteredProjects.length} {t('work', 'title', 'projects')}</span>
          </div>
        </aside>

        {/* Right Content: Projects List */}
        <div className="flex min-w-0 flex-col px-[15px] pt-[15px] pb-[60px]">
          <div className="flex flex-col gap-[40px]">
            {filteredProjects.length === 0 ? (
              <div className="py-20 text-center text-boc-muted text-[16px]">
                {t('work', 'noMatch', 'No projects match this filter.')}
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <article
                  key={project.slug}
                  data-reveal-tile="true"
                  data-work-tile="true"
                  data-boc-project={project.slug}
                  className="boc-grow-row flex flex-col gap-[12px] pb-[25px] border-b border-white/5 last:border-b-0"
                >
                  {/* Marquee Visual Strip */}
                  <div className="-mx-[15px] lg:mx-0">
                    <ProjectMarqueeStrip
                      tiles={project.tiles as any}
                      href={`/work/${project.slug}`}
                      title={project.title}
                      height={190}
                      priority={index < 2}
                    />
                  </div>

                  {/* Caption Row */}
                  <div className="boc-grow-caption flex items-baseline justify-between text-[clamp(13px,0.8125rem+0.16vw,15px)] tracking-[-0.02em] lg:grid lg:grid-cols-3">
                    {/* Col 1: Title */}
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-boc-text-on-canvas font-normal min-w-0 truncate lg:col-start-1 hover:text-boc-orange transition-colors"
                    >
                      {project.title}
                    </Link>

                    {/* Col 2: Subtitle / Tagline */}
                    <span className="text-boc-muted hidden min-w-0 truncate text-center lg:col-start-2 lg:block">
                      {project.tagline || project.description?.slice(0, 45) + '...'}
                    </span>

                    {/* Col 3: View Project */}
                    <Link
                      href={`/work/${project.slug}`}
                      className="group text-boc-muted shrink-0 lg:col-start-3 lg:justify-self-end flex items-center gap-[6px] hover:text-boc-text-on-canvas transition-colors"
                    >
                      <span>{t('work', 'viewProject', 'View project')}</span>
                      <ArrowGlyph className="w-[11px] h-[11px]" />
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
