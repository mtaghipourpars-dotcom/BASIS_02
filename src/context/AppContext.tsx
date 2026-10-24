import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId, Locale, AppSettings } from '../types';
import { translations } from '../i18n/translations';

interface AppContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  currentPage: PageId;
  navigate: (page: PageId, options?: { system?: string; severity?: string; jobId?: string }) => void;
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
  selectedSystem: string;
  setSelectedSystem: (sys: string) => void;
  selectedSeverity: string;
  setSelectedSeverity: (sev: string) => void;
  selectedLandscape: string;
  setSelectedLandscape: (ls: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  settings: AppSettings;
  updateSettings: (partial: Partial<AppSettings>) => void;
  resetSettings: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  language: 'en',
  fontScale: 'default',
  density: 'comfortable',
  layout: 'standard',
  highContrast: false,
  reducedMotion: false,
  defaultLandingPage: 'home',
  autoRefreshIntervalSec: 60,
  connectionProfile: {
    systemSid: 'PRD01',
    instanceNumber: '00',
    hostName: 'sap-prd01.corp.local',
    sapRouter: '/H/194.12.10.1/W/secret',
    clientNumber: '800',
    description: 'Corporate S/4HANA Enterprise Cluster (DEMO)',
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');
  const [selectedLandscape, setSelectedLandscape] = useState<string>('Production');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'fa' ? 'rtl' : 'ltr';
  };

  const toggleLocale = () => {
    const next = locale === 'en' ? 'fa' : 'en';
    setLocale(next);
  };

  const navigate = (
    page: PageId,
    options?: { system?: string; severity?: string; jobId?: string }
  ) => {
    if (options?.system) {
      setSelectedSystem(options.system);
    }
    if (options?.severity) {
      setSelectedSeverity(options.severity);
    }
    if (options?.jobId) {
      setSelectedJobId(options.jobId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSettings = (partial: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      if (partial.language && partial.language !== locale) {
        setLocale(partial.language);
      }
      return next;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    setLocale('en');
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  }, [locale]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = (translations[locale] || translations.en) as Record<string, string>;
    const fallbackDict = translations.en as Record<string, string>;
    let val = dict[key] || fallbackDict[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        val = val.replace(`{${k}}`, String(v));
      });
    }
    return val;
  };

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        currentPage,
        navigate,
        selectedJobId,
        setSelectedJobId,
        selectedSystem,
        setSelectedSystem,
        selectedSeverity,
        setSelectedSeverity,
        selectedLandscape,
        setSelectedLandscape,
        searchQuery,
        setSearchQuery,
        settings,
        updateSettings,
        resetSettings,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
