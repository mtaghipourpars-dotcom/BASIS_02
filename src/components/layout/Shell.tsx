import React, { useState } from 'react';
import {
  LayoutDashboard,
  Network,
  Activity,
  Clock,
  Database,
  Shield,
  FileText,
  Share2,
  Package,
  HardDrive,
  Workflow,
  FileBarChart,
  Settings as SettingsIcon,
  Search,
  Bell,
  HelpCircle,
  Menu,
  X,
  Globe,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';
import { COCKPIT_HEADER_INFO } from '../../data/fixtures';

interface NavItem {
  id: PageId;
  labelKey: string;
  icon: React.ReactNode;
}

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    locale,
    toggleLocale,
    currentPage,
    navigate,
    searchQuery,
    setSearchQuery,
    selectedLandscape,
    setSelectedLandscape,
    t,
    settings,
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact 10 Operational Islands + General destinations in approved order (Overview removed!)
  const operationalNavItems: NavItem[] = [
    { id: 'home', labelKey: 'home', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'landscape', labelKey: 'landscape', icon: <Network className="w-4 h-4" /> },
    { id: 'performance', labelKey: 'performance', icon: <Activity className="w-4 h-4" /> },
    { id: 'jobs-processes', labelKey: 'jobsProcesses', icon: <Clock className="w-4 h-4" /> },
    { id: 'database', labelKey: 'database', icon: <Database className="w-4 h-4" /> },
    { id: 'security', labelKey: 'security', icon: <Shield className="w-4 h-4" /> },
    { id: 'alerts-events', labelKey: 'alertsEvents', icon: <FileText className="w-4 h-4" /> },
    { id: 'interfaces-connectivity', labelKey: 'interfacesConnectivity', icon: <Share2 className="w-4 h-4" /> },
    { id: 'transports', labelKey: 'transports', icon: <Package className="w-4 h-4" /> },
    { id: 'backup-recovery', labelKey: 'backupRecovery', icon: <HardDrive className="w-4 h-4" /> },
    { id: 'system-operations', labelKey: 'systemOperations', icon: <Workflow className="w-4 h-4" /> },
  ];

  const secondaryNavItems: NavItem[] = [
    { id: 'reports', labelKey: 'reports', icon: <FileBarChart className="w-4 h-4" /> },
    { id: 'settings', labelKey: 'settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col antialiased transition-colors ${
        settings.theme === 'light' ? 'theme-light' : 'bg-[#070e17] text-[#e2ecf8]'
      } ${settings.highContrast ? 'high-contrast border-2' : ''} ${
        settings.density === 'compact' ? 'density-compact' : ''
      } ${
        settings.fontScale === 'compact'
          ? 'font-scale-compact'
          : settings.fontScale === 'large'
          ? 'font-scale-large'
          : ''
      } ${settings.reducedMotion ? 'motion-reduce' : ''}`}
    >
      {/* Top Header matching reference */}
      <header className="sticky top-0 z-40 bg-[#091322] border-b border-[#1b2b40] px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4 shadow-sm">
        {/* Left: Mobile Toggle + SAP Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-[#112035] border border-[#1b2b40] text-[#91a6bc] hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 text-start group cursor-pointer"
          >
            {/* SAP Blue Badge */}
            <div className="w-10 h-7 rounded bg-[#0070f2] flex items-center justify-center text-white font-black text-xs tracking-wider shadow-inner">
              SAP
            </div>
            <div>
              <div className="text-[13px] font-bold text-white tracking-tight leading-tight">
                {COCKPIT_HEADER_INFO.appName}
              </div>
              <div className="text-[10px] text-[#7890a8] font-medium tracking-wide">
                {COCKPIT_HEADER_INFO.subtitle}
              </div>
            </div>
          </button>
        </div>

        {/* Center: Global Search Bar with Ctrl+K */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <Search className="absolute inset-y-0 start-3 my-auto w-3.5 h-3.5 text-[#5e7794] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-[#0d1a2d] border border-[#1b2c44] rounded-lg py-1.5 ps-9 pe-16 text-xs text-[#e2ecf8] placeholder-[#5e7794] focus:outline-none focus:border-[#0070f2] focus:ring-1 focus:ring-[#0070f2] transition-colors"
            />
            <div className="absolute inset-y-0 end-2 my-auto flex items-center">
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#142338] text-[#718aa6] border border-[#20344f] ltr-isolate font-mono">
                Ctrl + K
              </span>
            </div>
          </div>
        </div>

        {/* Right: Notifications, Help, Settings, Profile & Bilingual Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Notification Bell */}
          <button
            type="button"
            onClick={() => navigate('alerts-events')}
            className="relative p-1.5 rounded-lg bg-[#0e1b2e] hover:bg-[#162740] border border-[#1b2c44] text-[#8ea4be] hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
              0
            </span>
          </button>

          {/* Help Info */}
          <button
            type="button"
            onClick={() => navigate('reports')}
            className="p-1.5 rounded-lg bg-[#0e1b2e] hover:bg-[#162740] border border-[#1b2c44] text-[#8ea4be] hover:text-white transition-colors"
            title="Documentation"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Settings Quick Access */}
          <button
            type="button"
            onClick={() => navigate('settings')}
            className="p-1.5 rounded-lg bg-[#0e1b2e] hover:bg-[#162740] border border-[#1b2c44] text-[#8ea4be] hover:text-white transition-colors"
            title={t('settings')}
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          {/* Language Toggle Button (Bilingual Support: Persian RTL / English LTR) */}
          <button
            type="button"
            id="localeBtn"
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0e1b2e] hover:bg-[#162740] border border-[#1b2c44] text-xs font-semibold text-cyan-300 transition-colors cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{locale === 'en' ? 'فارسی' : 'English'}</span>
          </button>

          {/* User Profile matching reference */}
          <div className="hidden sm:flex items-center gap-2 ps-2 border-s border-[#1b2b40]">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-cyan-500 flex items-center justify-center text-[#08101a] font-bold text-xs shadow-sm">
              M
            </div>
            <div className="text-start leading-tight">
              <div className="text-xs font-semibold text-white">
                {COCKPIT_HEADER_INFO.userName}
              </div>
              <div className="text-[10px] text-[#718aa6]">
                {COCKPIT_HEADER_INFO.userRole}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-[#718aa6]" />
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar & Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } lg:flex w-60 shrink-0 bg-[#091322] border-e border-[#19273a] p-3 flex-col justify-between overflow-y-auto`}
        >
          {/* Nav Links */}
          <div className="space-y-4">
            <nav className="space-y-1">
              {operationalNavItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    type="button"
                    onClick={() => {
                      navigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all text-start cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0066cc] to-[#0080ff] text-white font-semibold shadow-md shadow-blue-900/30'
                        : 'text-[#889fb8] hover:bg-[#0e1c2e] hover:text-[#d4e4f7]'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-[#627a94]'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-[#19273a] pt-3 space-y-1">
              {secondaryNavItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    type="button"
                    onClick={() => {
                      navigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all text-start cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0066cc] to-[#0080ff] text-white font-semibold shadow-md'
                        : 'text-[#889fb8] hover:bg-[#0e1c2e] hover:text-[#d4e4f7]'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-[#627a94]'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar Footer Panel matching reference */}
          <div className="mt-6 pt-3 border-t border-[#19273a] space-y-3">
            {/* Landscape Dropdown */}
            <div className="p-2.5 rounded-lg bg-[#0e1b2d] border border-[#1b2b40]">
              <div className="text-[10px] text-[#627a94] uppercase tracking-wider font-semibold mb-1">
                {t('landscapeSelect')}
              </div>
              <div className="flex items-center justify-between text-xs text-[#dbe7f5]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-medium">{t('production')}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-[#627a94]" />
              </div>
            </div>

            {/* Last Update */}
            <div className="flex items-center justify-between px-1 text-[11px] text-[#718aa6]">
              <div>
                <span className="block text-[10px] text-[#556c84]">{t('lastUpdate')}</span>
                <span className="font-mono text-xs text-[#9eb6ce] ltr-isolate">
                  {COCKPIT_HEADER_INFO.lastUpdateStr}
                </span>
              </div>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="p-1 rounded text-[#55d6a1] hover:text-emerald-300 transition-colors"
                title="Refresh telemetry"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6 bg-[#070e17] flex flex-col justify-between">
          <div className="space-y-5">{children}</div>

          {/* Cockpit Footer (hidden on Home as requested in image 2) */}
          {currentPage !== 'home' && (
            <footer className="mt-8 pt-4 border-t border-[#162334] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#5e7794]">
              <div>{t('footerLeft')}</div>
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <span>{t('footerRight')}</span>
                <span className="inline-flex gap-1 text-[8px]">● ●</span>
              </div>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};
