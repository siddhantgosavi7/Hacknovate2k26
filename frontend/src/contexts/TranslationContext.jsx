import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getTranslation, LANGUAGE_LABELS, LANGUAGE_CODES } from '../data/translations.js';

const TranslationContext = createContext(null);

const STORAGE_KEY = 'ecosort-language';

function labelToCode(label) {
  return LANGUAGE_CODES[label] || 'en';
}

function codeToLabel(code) {
  return LANGUAGE_LABELS[code] || 'English';
}

export function TranslationProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGUAGE_LABELS[stored]) return codeToLabel(stored);
    return 'English';
  });

  const languageCode = labelToCode(language);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, languageCode);
    document.documentElement.lang = languageCode;
  }, [languageCode]);

  const setLanguage = useCallback((label) => {
    setLanguageState(label);
  }, []);

  const t = useCallback(
    (key, vars) => getTranslation(languageCode, key, vars),
    [languageCode],
  );

  const value = useMemo(
    () => ({ language, languageCode, setLanguage, t }),
    [language, languageCode, setLanguage, t],
  );

  return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error('useTranslation must be used within TranslationProvider');
  return ctx;
}
