'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface IntroContextType {
  introComplete: boolean;
  revealed: boolean;
  markComplete: () => void;
  revealHome: () => void;
  skipIntro: () => void;
  skipRequested: boolean;
}

const IntroContext = createContext<IntroContextType>({
  introComplete: false,
  revealed: false,
  markComplete: () => {},
  revealHome: () => {},
  skipIntro: () => {},
  skipRequested: false,
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [skipRequested, setSkipRequested] = useState(false);

  useEffect(() => {
    // If not on home page, mark complete and revealed immediately
    if (typeof window !== 'undefined' && window.location.pathname !== '/' && window.location.pathname !== '/ca' && window.location.pathname !== '/es') {
      setIntroComplete(true);
      setRevealed(true);
    }
  }, []);

  const markComplete = () => {
    setIntroComplete(true);
  };

  const revealHome = () => {
    setRevealed(true);
  };

  const skipIntro = () => {
    setSkipRequested(true);
    setIntroComplete(true);
  };

  return (
    <IntroContext.Provider
      value={{
        introComplete,
        revealed,
        markComplete,
        revealHome,
        skipIntro,
        skipRequested,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}
