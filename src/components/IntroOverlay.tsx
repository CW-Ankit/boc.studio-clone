'use client';

import React, { useState, useEffect } from 'react';
import { useIntro } from '@/context/IntroContext';

const LETTERS = Array.from('Boc.Studio');

export function IntroOverlay() {
  const { introComplete, markComplete, skipRequested, skipIntro } = useIntro();
  const [phase, setPhase] = useState<'lettersIn' | 'hold' | 'shrink' | 'done'>('lettersIn');
  const [visibleLetters, setVisibleLetters] = useState<number>(0);

  useEffect(() => {
    if (introComplete) return;

    // Check if user already saw intro in session
    const hasSeenIntro = sessionStorage.getItem('boc_intro_seen');
    if (hasSeenIntro) {
      markComplete();
      return;
    }

    // Step 1: animate letters in one by one
    let letterIndex = 0;
    const letterTimer = setInterval(() => {
      letterIndex++;
      setVisibleLetters(letterIndex);
      if (letterIndex >= LETTERS.length) {
        clearInterval(letterTimer);
        setTimeout(() => setPhase('hold'), 200);
      }
    }, 45);

    return () => clearInterval(letterTimer);
  }, [introComplete, markComplete]);

  useEffect(() => {
    if (phase === 'hold') {
      const holdTimer = setTimeout(() => {
        setPhase('shrink');
      }, 400);
      return () => clearTimeout(holdTimer);
    }

    if (phase === 'shrink') {
      const shrinkTimer = setTimeout(() => {
        setPhase('done');
        sessionStorage.setItem('boc_intro_seen', 'true');
        markComplete();
      }, 700);
      return () => clearTimeout(shrinkTimer);
    }
  }, [phase, markComplete]);

  // Click or key to skip
  useEffect(() => {
    const handleSkip = () => {
      sessionStorage.setItem('boc_intro_seen', 'true');
      skipIntro();
    };

    window.addEventListener('keydown', handleSkip);
    return () => window.removeEventListener('keydown', handleSkip);
  }, [skipIntro]);

  if (introComplete || phase === 'done') {
    return null;
  }

  return (
    <div
      onClick={skipIntro}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-boc-orange cursor-pointer transition-all duration-700 ${
        phase === 'shrink' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Skip Boc.Studio intro animation"
    >
      <div className="flex items-baseline text-black font-semibold tracking-[-0.03em] select-none text-[clamp(2.5rem,8vw,7rem)] leading-none">
        {LETTERS.map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-300 transform ${
              index < visibleLetters
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-90'
            }`}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="absolute bottom-6 text-[12px] uppercase tracking-[0.05em] text-black/60">
        Click or press any key to skip
      </div>
    </div>
  );
}
