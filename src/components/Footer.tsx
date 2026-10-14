'use client';

import React from 'react';
import Link from 'next/link';
import { WordmarkSvg } from './WordmarkSvg';
import { ArrowGlyph, ArrowRing } from './ArrowSvg';
import { useLanguage } from '@/context/LanguageContext';
import { useCursorBalloon } from './CursorBalloonProvider';
import studioData from '@/data/studio.json';

export function Footer() {
  const { t } = useLanguage();
  const { flash } = useCursorBalloon();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = studioData.getInTouch?.inquiryEmail || 'hola@boc.studio';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        flash(t('common', 'emailCopied', 'Email copied'), { x: e.clientX, y: e.clientY });
      });
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <footer className="w-full bg-boc-offblack text-boc-text-on-canvas pt-[60px] pb-[40px] px-[15px] border-t border-white/5">
      {/* Contact Banner */}
      <div className="max-w-[1400px] mx-auto flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[20px] max-w-[800px]">
          <h2 className="text-[clamp(26px,2rem+1vw,44px)] font-normal tracking-[-0.02em] leading-tight text-white">
            {t(
              'contact',
              'sentence',
              'Every project starts with a conversation. Tell us about your company and where you want to go.'
            )}
          </h2>

          <div className="pt-2">
            <a
              href={`mailto:${studioData.getInTouch.inquiryEmail}`}
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-[12px] bg-boc-orange text-black px-[24px] py-[12px] rounded-full text-[14px] font-medium transition-all hover:scale-105"
            >
              <span>{studioData.getInTouch.inquiryEmail}</span>
              <ArrowGlyph className="w-[12px] h-[12px] text-black group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] pt-[40px] border-t border-white/10 text-[13px] text-boc-muted">
          {/* Col 1: Studio */}
          <div className="flex flex-col gap-[10px]">
            <WordmarkSvg className="h-[18px] w-auto text-white" />
            <p className="text-[12px] text-boc-muted">Creative brand studio in Barcelona</p>
          </div>

          {/* Col 2: Navigation */}
          <div className="flex flex-col gap-[8px]">
            <span className="text-[11px] uppercase tracking-[0.05em] text-white/50 font-semibold">
              Explore
            </span>
            <Link href="/work" className="hover:text-white transition-colors">
              Work
            </Link>
            <Link href="/info" className="hover:text-white transition-colors">
              Info
            </Link>
            <Link href="/create" className="hover:text-white transition-colors">
              Package: Create
            </Link>
            <Link href="/refresh" className="hover:text-white transition-colors">
              Package: Refresh
            </Link>
            <Link href="/boost" className="hover:text-white transition-colors">
              Package: Boost
            </Link>
          </div>

          {/* Col 3: Social */}
          <div className="flex flex-col gap-[8px]">
            <span className="text-[11px] uppercase tracking-[0.05em] text-white/50 font-semibold">
              Social
            </span>
            <a
              href={studioData.getInTouch.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram ↗
            </a>
            <a
              href={studioData.getInTouch.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Col 4: Address */}
          <div className="flex flex-col gap-[8px]">
            <span className="text-[11px] uppercase tracking-[0.05em] text-white/50 font-semibold">
              Location
            </span>
            <p className="leading-snug">
              {studioData.getInTouch.address.street}
              <br />
              {studioData.getInTouch.address.postcode}
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-[20px] flex items-center justify-between text-[11px] text-white/40">
          <div>© {new Date().getFullYear()} Boc.Studio. Clone created with REA evidence.</div>
          <div>Barcelona, Spain</div>
        </div>
      </div>
    </footer>
  );
}
