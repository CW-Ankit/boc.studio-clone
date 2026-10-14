'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface InfoPanelContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const InfoPanelContext = createContext<InfoPanelContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export function useInfoPanel() {
  return useContext(InfoPanelContext);
}

export function InfoPanelProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <InfoPanelContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </InfoPanelContext.Provider>
  );
}
