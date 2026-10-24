import React, { useState } from 'react';
import {
  LayoutDashboard,
  Activity,
  Server,
  Network,
  AlertTriangle,
  Gauge,
  Clock,
  Database,
  ArrowUpRight,
  Shield,
  RefreshCw,
  FileText,
  Settings as SettingsIcon,
  Search,
  Menu,
  X,
  Globe,
  Radio,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageId } from '../../types';

interface NavItem {
  id: PageId;
  labelKey: string;
  icon: React.ReactNode;
}

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { locale, toggleLocale, currentPage, navigate, searchQuery, setSearchQuery, t, settings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', labelKey: 'home', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'overview', labelKey: 'overview', icon: <Activity className="w-4 h-4" /> },
    { id: 'systems', labelKey: 'systems', icon: <Server className="w-4 h-4" /> },
    { id: 'landscape', labelKey: 'landscape', icon: <Network className="w-4 h-4" /> },
    { id: 'alerts-events', labelKey: 'alertsEvents', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'performance', labelKey: 'performance', icon: <Gauge className="w-4 h-4" /> },
    { id: 'jobs-processes', labelKey: 'jobsProcesses', icon: <Clock className="w-4 h-4" /> },
    { id: 'database', labelKey: 'database', icon: <Database className="w-4 h-4" /> },
    { id: 'transports', labelKey: 'transports', icon: <ArrowUpRight className="w-4 h-4" /> },
    { id: 'security', labelKey: 'security', icon: <Shield className="w-4 h-4" /> },
    { id: 'backup-recovery', labelKey: 'backupRecovery', icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'reports', labelKey: 'reports', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings', labelKey: 'settings', icon: <SettingsIcon className="w-4 h-4" /> },
  ];

  const currentNav = navItems.find((n) => n.id === currentPage);

  return (
    <div
      className={`min-h-screen bg-[#081321] text-[#e7f0fb] flex flex-col ${
        settings.highContrast ? 'high-contrast' : ''
      } ${settings.density === 'compact' ? 'density-compact' : ''}`}
    >
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0b1827]/95 backdrop-blur border-b border-[#263a50] px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-[#14273b] border border-[#263a50] text-[#91a6bc] hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => navigate('home')}
            className="flex items-center gap-3 text-start group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-[#061423] font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
              B
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold tracking-tight">
                BASIS<span className="text-cyan-400">_02</span>
              </div>
              <div className="text-[11px] text-[#91a6bc] font-medium leading-none">
                {t('appSubtitle')}
              </div>
            </div>
          </button>
        </div>

        {/* Center: Global Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="absolute inset-y-0 start-3 my-auto w-4 h-4 text-[#70869c] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchGlobal')}
              className="w-full bg-[#0d1e31] border border-[#263a50] rounded-lg py-1.5 ps-9 pe-3 text-xs text-[#e7f0fb] placeholder-[#70869c] focus:outline-none focus:border-cyan-500/70 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Right: Badges, Locale Switcher, Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* DEMO Indicator Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{t('demoBadge')}</span>
          </div>

          {/* Connection Status Pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#102033] text-[#91a6bc] border border-[#263a50]">
            <Radio className="w-3 h-3 text-cyan-400" />
            <span>{t('disconnectedBadge')}</span>
          </div>

          {/* Persian / English Switcher */}
          <button
            type="button"
            id="localeBtn"
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#13283d] hover:bg-[#1a3450] text-[#e7f0fb] border border-[#33516d] text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            aria-label="Switch Language / تغییر زبان"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{locale === 'en' ? 'فارسی' : 'English'}</span>
          </button>

          {/* Settings Quick Link */}
          <button
            type="button"
            onClick={() => navigate('settings')}
            className={`p-1.5 rounded-lg border transition-colors ${
              currentPage === 'settings'
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                : 'bg-[#13283d] border-[#33516d] text-[#91a6bc] hover:text-white'
            }`}
            title={t('settings')}
            aria-label={t('settings')}
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? 'block' : 'hidden'
          } lg:block w-60 shrink-0 bg-[#0b1827] border-e border-[#263a50] p-3 flex flex-col justify-between overflow-y-auto`}
        >
          <div className="space-y-4">
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#70869c] px-3 pt-1">
              {t('workspace')}
            </div>
            <nav className="space-y-0.5">
              {navItems.map((item) => {
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
                        ? 'bg-[#153149] text-cyan-200 border-s-4 border-cyan-400 shadow-inner'
                        : 'text-[#9fb2c7] hover:bg-[#102438] hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-cyan-400' : 'text-[#70869c]'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Info Card */}
          <div className="mt-6 pt-4 border-t border-[#263a50]/80 px-2 text-[11px] text-[#91a6bc] space-y-1">
            <div className="font-semibold text-[#c5d8ed]">{t('phase')}</div>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>{t('prototypeNote')}</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Breadcrumb Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#263a50]/70">
            <div className="text-xs text-[#91a6bc]">
              <span>{t('breadcrumbOps')}</span> /{' '}
              <span id="crumb-current" className="text-white font-semibold">
                {currentNav ? t(currentNav.labelKey) : currentPage}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#70869c] ltr-isolate">
                SM37 · 1405/07/25–26
              </span>
            </div>
          </div>

          {/* Children Routes */}
          {children}
        </main>
      </div>
    </div>
  );
};
