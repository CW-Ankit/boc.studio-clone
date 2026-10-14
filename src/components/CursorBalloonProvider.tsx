'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

interface CursorBalloonContextType {
  show: (text: string) => void;
  hide: () => void;
  flash: (text: string, coords?: { x: number; y: number }) => void;
}

const CursorBalloonContext = createContext<CursorBalloonContextType>({
  show: () => {},
  hide: () => {},
  flash: () => {},
});

export function useCursorBalloon() {
  return useContext(CursorBalloonContext);
}

export function CursorBalloonProvider({ children }: { children: React.ReactNode }) {
  const [balloonText, setBalloonText] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const isLocked = useRef(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const show = useCallback((text: string) => {
    if (!isLocked.current) {
      setBalloonText(text);
    }
  }, []);

  const hide = useCallback(() => {
    if (!isLocked.current) {
      setBalloonText(null);
    }
  }, []);

  const flash = useCallback((text: string, clickCoords?: { x: number; y: number }) => {
    clearTimer();
    isLocked.current = true;
    if (clickCoords) {
      setCoords(clickCoords);
    }
    setBalloonText(text);
    timer.current = setTimeout(() => {
      isLocked.current = false;
      timer.current = null;
      setBalloonText(null);
    }, 1600);
  }, [clearTimer]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isLocked.current) {
        setCoords({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimer();
    };
  }, [clearTimer]);

  return (
    <CursorBalloonContext.Provider value={{ show, hide, flash }}>
      {children}
      {balloonText && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-full transition-transform duration-75 ease-out"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y - 12}px`,
          }}
        >
          <div className="boc-pill-glass flex items-center justify-center rounded-full px-4 py-2">
            <span className="text-[13px] font-normal leading-none tracking-[0.01em] text-white whitespace-nowrap">
              {balloonText}
            </span>
          </div>
        </div>
      )}
    </CursorBalloonContext.Provider>
  );
}
