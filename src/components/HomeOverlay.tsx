'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useIntro } from '@/context/IntroContext';
import { ArrowGlyph } from './ArrowSvg';

export function HomeOverlay() {
  const { revealed, revealHome } = useIntro();
  const [isDismissing, setIsDismissing] = useState(false);
  const touchStartY = useRef<number>(0);

  const handleDismiss = () => {
    if (revealed || isDismissing) return;
    setIsDismissing(true);
    setTimeout(() => {
      revealHome();
    }, 600);
  };

  useEffect(() => {
    if (revealed) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    // Wheel listener to dismiss on scroll down
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 15) {
        handleDismiss();
      }
    };

    // Touch listener to dismiss on swipe up
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (deltaY > 30) {
        handleDismiss();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [revealed, isDismissing]);

  if (revealed) return null;

  return (
    <section
      data-home-overlay="true"
      aria-label="Boc.Studio landing"
      className={`fixed inset-0 z-40 h-[100svh] w-full overflow-hidden bg-boc-canvas transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isDismissing ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Showreel Video */}
      <div data-overlay-video="true" className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden bg-boc-canvas">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            poster="/showreel/boc-showreel-poster.webp"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label="Boc.Studio showreel"
          >
            <source src="/showreel/boc-showreel.webm" type="video/webm" />
            <source src="/showreel/boc-showreel.mp4" type="video/mp4" />
          </video>
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.28) 100%)',
            }}
          />
        </div>
      </div>

      {/* Floating CTA / Hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 select-none pointer-events-none">
        <span className="text-[12px] uppercase tracking-[0.05em] text-white/80 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
          <span>Scroll or click to explore work</span>
          <ArrowGlyph className="w-3 h-3 text-white" />
        </span>
      </div>

      {/* Invisible Click Trigger */}
      <button
        type="button"
        data-home-overlay-trigger="true"
        aria-label="Enter Work"
        onClick={handleDismiss}
        className="absolute inset-0 z-20 block w-full h-full cursor-pointer bg-transparent border-0"
      />
    </section>
  );
}
