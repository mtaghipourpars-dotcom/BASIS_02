import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings as SettingsIcon,
  Palette,
  Eye,
  Server,
  RotateCcw,
  ShieldAlert,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { PageId } from '../../types';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings, locale, setLocale, t } = useApp();
  const [profileSaved, setProfileSaved] = useState(false);

  const handleProfileChange = (field: string, value: string) => {
    updateSettings({
      connectionProfile: {
        ...settings.connectionProfile,
        [field]: value,
      },
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('settingsTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('settingsSub')}</p>
        </div>
        <button
          type="button"
          onClick={resetSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14263a] hover:bg-[#1c3856] text-xs text-[#91a6bc] hover:text-white border border-[#263a50] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('resetDefaults')}</span>
        </button>
      </div>

      {/* Appearance Section */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2 pb-2 border-b border-[#263a50]/60">
          <Palette className="w-4 h-4 text-cyan-400" />
          <span>{t('appearanceSection')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Theme */}
          <div>
            <label className="block text-[#91a6bc] font-medium mb-1.5">{t('themeLabel')}</label>
            <select
              value={settings.theme}
              onChange={(e) => updateSettings({ theme: e.target.value as any })}
              className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="dark">{t('themeDark')}</option>
              <option value="light">{t('themeLight')}</option>
              <option value="system">{t('themeSystem')}</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-[#91a6bc] font-medium mb-1.5">{t('languageLabel')}</label>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as any)}
              className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="en">English (LTR)</option>
              <option value="fa">فارسی (RTL)</option>
            </select>
          </div>

          {/* Font Scale */}
          <div>
            <label className="block text-[#91a6bc] font-medium mb-1.5">{t('fontScaleLabel')}</label>
            <select
              value={settings.fontScale}
              onChange={(e) => updateSettings({ fontScale: e.target.value as any })}
              className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="default">{t('fontDefault')}</option>
              <option value="compact">{t('fontCompact')}</option>
              <option value="large">{t('fontLarge')}</option>
            </select>
          </div>

          {/* Layout Density */}
          <div>
            <label className="block text-[#91a6bc] font-medium mb-1.5">{t('densityLabel')}</label>
            <select
              value={settings.density}
              onChange={(e) => updateSettings({ density: e.target.value as any })}
              className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-cyan-500"
            >
              <option value="comfortable">{t('densityComfortable')}</option>
              <option value="compact">{t('densityCompact')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accessibility Section */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2 pb-2 border-b border-[#263a50]/60">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>{t('accessibilitySection')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <label className="flex items-center gap-3 p-3 rounded-lg bg-[#0c1a29] border border-[#203349] cursor-pointer">
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => updateSettings({ highContrast: e.target.checked })}
              className="rounded bg-[#081321] border-[#263a50] text-cyan-500 focus:ring-0"
            />
            <div>
              <span className="font-semibold text-white block">{t('highContrastLabel')}</span>
              <span className="text-[11px] text-[#91a6bc]">Enhanced borders and high readability</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg bg-[#0c1a29] border border-[#203349] cursor-pointer">
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
              className="rounded bg-[#081321] border-[#263a50] text-cyan-500 focus:ring-0"
            />
            <div>
              <span className="font-semibold text-white block">{t('reducedMotionLabel')}</span>
              <span className="text-[11px] text-[#91a6bc]">Disable smooth transitions</span>
            </div>
          </label>
        </div>
      </div>

      {/* Disconnected SAP Connection Profile Configuration */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>{t('sapProfileSection')}</span>
            </h2>
            <p className="text-xs text-[#91a6bc] mt-1 leading-relaxed">
              {t('sapProfileNotice')}
            </p>
          </div>
          {profileSaved && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Saved locally</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[#91a6bc] font-medium mb-1">{t('sidLabel')}</label>
            <input
              type="text"
              value={settings.connectionProfile.systemSid}
              onChange={(e) => handleProfileChange('systemSid', e.target.value)}
              className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-1.5 px-3 tech-id"
            />
          </div>
          <div>
            <label className="block text-[#91a6bc] font-medium mb-1">{t('instanceLabel')}</label>
            <input
              type="text"
              value={settings.connectionProfile.instanceNumber}
              onChange={(e) => handleProfileChange('instanceNumber', e.target.value)}
              className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-1.5 px-3 tech-id"
            />
          </div>
          <div>
            <label className="block text-[#91a6bc] font-medium mb-1">{t('clientNumLabel')}</label>
            <input
              type="text"
              value={settings.connectionProfile.clientNumber}
              onChange={(e) => handleProfileChange('clientNumber', e.target.value)}
              className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-1.5 px-3 tech-id"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[#91a6bc] font-medium mb-1">{t('hostLabel')}</label>
            <input
              type="text"
              value={settings.connectionProfile.hostName}
              onChange={(e) => handleProfileChange('hostName', e.target.value)}
              className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-1.5 px-3 tech-id"
            />
          </div>
          <div>
            <label className="block text-[#91a6bc] font-medium mb-1">{t('routerLabel')}</label>
            <input
              type="text"
              value={settings.connectionProfile.sapRouter}
              onChange={(e) => handleProfileChange('sapRouter', e.target.value)}
              className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-1.5 px-3 tech-id"
            />
          </div>
        </div>

        {/* Action Buttons (Strictly Disabled with Explanation) */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            disabled
            title="Phase 1 is read-only; no network calls to SAP"
            className="px-3 py-2 rounded-lg bg-[#14202e] border border-[#263a50] text-[#70869c] text-xs font-semibold cursor-not-allowed opacity-70"
          >
            {t('testConnection')}
          </button>
          <button
            type="button"
            disabled
            title="Live mode disabled; local fixtures only"
            className="px-3 py-2 rounded-lg bg-[#14202e] border border-[#263a50] text-[#70869c] text-xs font-semibold cursor-not-allowed opacity-70"
          >
            {t('activateLive')}
          </button>
        </div>
      </div>

      {/* About & Diagnostics */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-5 space-y-2 text-xs text-[#91a6bc]">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>{t('aboutSection')}</span>
        </h2>
        <div className="tech-id text-[#d9e6f3]">{t('appVersion')}</div>
        <div>{t('runtimeEnv')}</div>
        <div className="text-[11px] text-[#70869c]">
          Phase 1 Read-only monitoring · Deterministic fixtures · Bilingual Persian RTL / English LTR
        </div>
      </div>
    </div>
  );
};
