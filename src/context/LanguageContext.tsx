'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import translationsData from '@/data/translations.json';

type Locale = 'en' | 'ca' | 'es';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (section: string, key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (s, k, fallback) => fallback || k,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Check URL or cookie or localStorage
    const path = window.location.pathname;
    if (path.startsWith('/ca')) {
      setLocaleState('ca');
    } else if (path.startsWith('/es')) {
      setLocaleState('es');
    } else {
      const saved = localStorage.getItem('NEXT_LOCALE') as Locale;
      if (saved && (saved === 'en' || saved === 'ca' || saved === 'es')) {
        setLocaleState(saved);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('NEXT_LOCALE', newLocale);
  };

  const t = (section: string, key: string, fallback?: string): string => {
    const currentDict = (translationsData as any)[locale] || (translationsData as any)['en'];
    if (currentDict && currentDict[section] && currentDict[section][key]) {
      return currentDict[section][key];
    }
    const enDict = (translationsData as any)['en'];
    if (enDict && enDict[section] && enDict[section][key]) {
      return enDict[section][key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
