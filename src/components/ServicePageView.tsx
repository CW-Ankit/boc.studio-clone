'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowGlyph } from './ArrowSvg';
import { useLanguage } from '@/context/LanguageContext';
import studioData from '@/data/studio.json';

interface ServicePageViewProps {
  serviceKey: 'create' | 'refresh' | 'boost';
}

export function ServicePageView({ serviceKey }: ServicePageViewProps) {
  const { t } = useLanguage();
  const service = studioData.servicePopups.find((s) => s.key === serviceKey) || studioData.servicePopups[0];

  return (
    <article className="min-h-screen bg-boc-orange text-black px-[20px] py-[40px] lg:px-[60px] lg:py-[60px]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[50px]">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-black/15 pb-[20px]">
          <div className="flex items-center gap-[10px] text-[13px] font-semibold uppercase tracking-[0.04em] text-boc-info-label">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span className="text-black">{service.key}</span>
          </div>

          <div className="flex items-center gap-[15px] text-[12px] font-medium uppercase">
            {(['create', 'refresh', 'boost'] as const).map((k) => (
              <Link
                key={k}
                href={`/${k}`}
                className={`transition-colors ${
                  serviceKey === k ? 'underline font-bold text-black' : 'text-black/60 hover:text-black'
                }`}
              >
                {k}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col gap-[20px] max-w-[900px]">
          <span className="text-[13px] uppercase tracking-[0.04em] font-semibold text-boc-info-label">
            {service.label}
          </span>
          <h1 className="text-[clamp(32px,2.5rem+1.5vw,56px)] font-normal tracking-[-0.02em] leading-[1.1] text-black">
            {service.headline}
          </h1>
          <p className="text-[17px] lg:text-[20px] text-black/85 leading-relaxed whitespace-pre-line pt-[10px]">
            {service.body}
          </p>
        </div>

        {/* Deliverables / What We Offer */}
        <div className="flex flex-col gap-[30px] pt-[30px] border-t border-black/15">
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-[13px] uppercase tracking-[0.04em] font-semibold text-boc-info-label">
              {service.offerLabel}
            </h2>
            <p className="text-[16px] text-black/80">{service.offerIntro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[10px]">
            {service.offerItems.map((item, idx) => (
              <div
                key={item._key || idx}
                className="flex flex-col gap-[10px] p-[24px] rounded-xl bg-black/5 border border-black/10"
              >
                <div className="text-[12px] font-mono text-black/50">0{idx + 1}</div>
                <h3 className="text-[18px] lg:text-[20px] font-medium tracking-[-0.01em] text-black">
                  {item.heading}
                </h3>
                <p className="text-[14px] lg:text-[15px] text-black/75 leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className="flex flex-col gap-[15px] p-[30px] rounded-2xl bg-black text-white">
          <span className="text-[12px] uppercase tracking-[0.04em] font-semibold text-boc-orange">
            {service.impactLabel}
          </span>
          <p className="text-[18px] lg:text-[22px] font-normal leading-relaxed text-white/90">
            {service.impactText}
          </p>
          <div className="pt-[15px]">
            <a
              href="mailto:hola@boc.studio"
              className="inline-flex items-center gap-[8px] bg-boc-orange text-black px-[20px] py-[10px] rounded-full text-[13px] font-medium hover:scale-105 transition-transform"
            >
              <span>{t('contact', 'cta', 'Get in touch')}</span>
              <ArrowGlyph className="w-[11px] h-[11px]" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
