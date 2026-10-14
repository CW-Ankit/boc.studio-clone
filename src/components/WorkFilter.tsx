'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface FilterOption {
  slug: string;
  label: string;
}

const DEFAULT_OPTIONS: FilterOption[] = [
  { slug: 'all', label: 'All' },
  { slug: 'brand-identity', label: 'Brand identity' },
  { slug: 'art-direction', label: 'Art direction' },
  { slug: 'campaign', label: 'Campaign' },
  { slug: 'motion', label: 'Motion' },
  { slug: 'strategy', label: 'Strategy' },
];

interface WorkFilterProps {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  options?: FilterOption[];
}

export function WorkFilter({
  activeCategory = 'all',
  onSelectCategory,
  options = DEFAULT_OPTIONS,
}: WorkFilterProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="flex flex-wrap items-start gap-x-[25px] gap-y-[10px] text-[clamp(18px,_1.25rem_+_0.4vw,_24px)] font-normal tracking-[-0.02em]">
        {options.map((opt) => {
          const isActive = activeCategory === opt.slug;
          const displayLabel = opt.slug === 'all' ? t('work', 'all', 'All') : opt.label;

          return (
            <button
              key={opt.slug}
              type="button"
              onClick={() => onSelectCategory(opt.slug)}
              className={`cursor-pointer transition-colors ${
                isActive
                  ? 'text-boc-text-on-canvas font-medium underline underline-offset-4'
                  : 'text-boc-muted hover:text-boc-text-on-canvas'
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
