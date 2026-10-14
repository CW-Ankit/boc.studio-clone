'use client';

import React from 'react';

export function ArrowGlyph({ className = "boc-arrow-glyph" }: { className?: string }) {
  return (
    <svg viewBox="0 0 66 66" className={className} fill="currentColor" aria-hidden="true" focusable="false">
      <g transform="translate(33 33) scale(0.7) translate(-33 -33)">
        <path d="M36.015 53.931H29.985L13.475 37.474L17.545 33.558L29.985 45.994V12.0742H36.015V45.994L48.555 33.453L52.525 37.474L36.015 53.931Z" />
      </g>
    </svg>
  );
}

export function ArrowRing({ className = "boc-arrow-ring" }: { className?: string }) {
  return (
    <svg viewBox="0 0 66 66" className={className} fill="none" stroke="currentColor" strokeWidth={6} aria-hidden="true" focusable="false">
      <circle cx={33} cy={33} r={30} />
    </svg>
  );
}

export function ArrowButton() {
  return (
    <span className="relative inline-flex items-center justify-center w-[22px] h-[22px]">
      <ArrowRing className="absolute inset-0 w-full h-full text-current opacity-40" />
      <ArrowGlyph className="w-[12px] h-[12px] text-current" />
    </span>
  );
}
