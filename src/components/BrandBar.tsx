'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { WordmarkSvg } from './WordmarkSvg';
import { useInfoPanel } from '@/context/InfoPanelContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCursorBalloon } from './CursorBalloonProvider';
import { ArrowGlyph } from './ArrowSvg';

export function BrandBar() {
  const { toggle, isOpen } = useInfoPanel();
  const { locale, setLocale, t } = useLanguage();
  const { flash } = useCursorBalloon();
  const [currentTime, setCurrentTime] = useState<string>('--:--');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Barcelona Live CET Clock & Online Status
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Europe/Madrid',
        });
        setCurrentTime(formatter.format(now));

        const parts = formatter.formatToParts(now);
        const hour = Number(parts.find((p) => p.type === 'hour')?.value || '0');
        const min = Number(parts.find((p) => p.type === 'minute')?.value || '0');
        const minutesOfDay = hour * 60 + min;
        // Studio hours: 9:30 AM (570m) to 6:00 PM (1080m)
        setIsOnline(minutesOfDay >= 570 && minutesOfDay < 1080);
      } catch (e) {
        // fallback
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = 'hola@boc.studio';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        flash(t('common', 'emailCopied', 'Email copied'), { x: e.clientX, y: e.clientY });
      });
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <header
      id="brand-bar"
      data-brand-bar="true"
      className="sticky top-0 z-50 flex items-center justify-between px-[15px] py-[10px] text-boc-text-on-orange transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255, 68, 33, 0.97)',
        minHeight: '40px',
      }}
    >
      {/* Wordmark logo */}
      <div className="flex items-center gap-[15px]">
        <Link
          href="/"
          aria-label="Boc.Studio home"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          <WordmarkSvg className="h-[20px] w-auto text-black" capTrim={true} />
        </Link>
      </div>

      {/* Center / Navigation Links */}
      <div className="flex items-center gap-[20px] text-[13px] font-normal tracking-[0.02em] uppercase">
        <Link
          href="/work"
          className="transition-opacity hover:opacity-70"
        >
          {t('nav', 'work', 'WORK')}
        </Link>

        <button
          type="button"
          onClick={toggle}
          className="cursor-pointer transition-opacity hover:opacity-70 uppercase"
        >
          {t('nav', 'info', 'INFO')}
        </button>

        {/* Live Clock & Online Status (Desktop) */}
        <div className="hidden lg:flex items-center gap-[8px] border-l border-black/20 pl-[15px]">
          <span className="tabular-nums">{currentTime} CET</span>
          <span
            className={`inline-block w-[6px] h-[6px] rounded-full ${
              isOnline ? 'bg-emerald-600' : 'bg-black/40'
            }`}
          />
          <span className="text-[11px] font-medium tracking-[0.04em] text-black/80">
            {isOnline ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Right side: Language Switcher & Contact Email */}
      <div className="flex items-center gap-[15px] text-[13px]">
        {/* Language switch */}
        <div className="flex items-center gap-[6px] text-[12px] font-medium">
          {(['en', 'ca', 'es'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLocale(lang)}
              className={`cursor-pointer uppercase transition-opacity ${
                locale === lang ? 'underline font-semibold' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Get in touch / email button */}
        <a
          href="mailto:hola@boc.studio"
          onClick={handleCopyEmail}
          className="group hidden sm:inline-flex items-center gap-[6px] rounded-full bg-black px-[12px] py-[6px] text-[12px] text-white transition-transform hover:scale-105"
        >
          <span>{t('contact', 'cta', 'Get in touch')}</span>
          <ArrowGlyph className="w-[10px] h-[10px] text-white" />
        </a>
      </div>
    </header>
  );
}
