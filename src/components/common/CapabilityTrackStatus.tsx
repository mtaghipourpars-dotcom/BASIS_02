import React, { useState } from 'react';
import { Eye, ShieldAlert, Lock, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CapabilityTrackStatusProps {
  islandName: string;
  wStatus?: 'Configured' | 'Gated' | 'Partial';
  activeFindingsCount?: number;
}

export const CapabilityTrackStatus: React.FC<CapabilityTrackStatusProps> = ({
  islandName,
  wStatus = 'Configured',
  activeFindingsCount = 1,
}) => {
  const { locale } = useApp();
  const isFa = locale === 'fa';
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative inline-flex items-center gap-1.5 flex-wrap">
      {/* M Track: Monitoring */}
      <div
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium cursor-pointer hover:bg-emerald-500/20 transition-colors"
        onClick={() => setShowInfo(true)}
        title={isFa ? 'مسیر M: پایش فعال و فقط-خواندنی' : 'Track M: Active read-only monitoring'}
      >
        <Eye className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-semibold">M:</span>
        <span>{isFa ? 'پایش فعال' : 'Monitoring Active'}</span>
        <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-200">
          {isFa ? 'فقط-خواندنی' : 'Read-Only'}
        </span>
      </div>

      {/* W Track: Warning */}
      <div
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium cursor-pointer hover:bg-amber-500/20 transition-colors"
        onClick={() => setShowInfo(true)}
        title={isFa ? 'مسیر W: هشدارهای مبتنی بر قاعده و آستانه' : 'Track W: Rule-driven warning evaluation'}
      >
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
        <span className="font-semibold">W:</span>
        <span>{isFa ? 'هشدارها' : 'Warnings'}</span>
        <span className="text-[10px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-200 font-mono">
          {activeFindingsCount > 0
            ? `${activeFindingsCount} ${isFa ? 'یافته' : 'active'}`
            : isFa ? 'بررسی‌شده' : 'evaluated'}
        </span>
      </div>

      {/* E Track: Execution */}
      <div
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium cursor-pointer hover:bg-slate-700/50 transition-colors"
        onClick={() => setShowInfo(true)}
        title={isFa ? 'مسیر E: عملیات کنترل‌شده در فاز ۱ غیرفعال است' : 'Track E: Controlled execution disabled in Phase 1'}
      >
        <Lock className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold">E:</span>
        <span>{isFa ? 'عملیات' : 'Execution'}</span>
        <span className="text-[10px] px-1 py-0.2 rounded bg-slate-700/80 text-slate-400 font-mono">
          {isFa ? 'غیرفعال (فاز ۱)' : 'Disabled (Phase 1)'}
        </span>
      </div>

      {/* Info Help Icon */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="p-1 rounded text-slate-400 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors"
        aria-label="Track Capability Information"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {/* Info Popover Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-[#0e1d30] border border-cyan-500/30 rounded-lg p-5 shadow-2xl text-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 font-mono">
                  M / W / E
                </span>
                <h4 className="font-semibold text-sm text-white">
                  {isFa ? `چارچوب قابلیت‌های سه‌گانه: ${islandName}` : `Triple Capability Framework: ${islandName}`}
                </h4>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded bg-emerald-950/30 border border-emerald-500/20">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-300 mb-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isFa ? 'M — پایش عملیاتی (Monitoring · فعال و فقط-خواندنی)' : 'M — Operational Monitoring (Active & Read-Only)'}</span>
                </div>
                <p className="text-slate-300">
                  {isFa
                    ? 'مشاهده وضعیت جاری، فیلترگذاری و جستجو در شواهد واقعی منبع، مصورسازی توپولوژی و جداول داده‌ها بدون امکان تغییر در سیستم‌های هدف.'
                    : 'Inspection of verified source records, multi-metric time-series, topologies, and tabular evidence without any modification to target systems.'}
                </p>
              </div>

              <div className="p-3 rounded bg-amber-950/30 border border-amber-500/20">
                <div className="flex items-center gap-1.5 font-semibold text-amber-300 mb-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{isFa ? 'W — ارزیابی هشدارها (Warning · مبتنی بر قواعد و شواهد)' : 'W — Rule-Driven Warnings (Configured & Gated)'}</span>
                </div>
                <p className="text-slate-300">
                  {isFa
                    ? 'قواعد هشدار تنها در صورت داشتن آستانه‌های تصویب‌شده ارزیابی می‌شوند. قواعد بدون آستانه معتبر به صورت صریح با عنوان «عدم پیکربندی» همراه با پیش‌نیازها نمایش می‌یابند.'
                    : 'Warning rules evaluate only when thresholds and lifecycle policies are approved. Unconfigured rules explicitly display their unmet prerequisites.'}
                </p>
              </div>

              <div className="p-3 rounded bg-slate-900 border border-slate-700/60">
                <div className="flex items-center gap-1.5 font-semibold text-slate-300 mb-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isFa ? 'E — عملیات کنترل‌شده (Execution · در فاز ۱ غیرفعال)' : 'E — Controlled Actions (Disabled in Phase 1)'}</span>
                </div>
                <p className="text-slate-400">
                  {isFa
                    ? 'کاتالوگ اقدامات پیش‌بینی‌شده و پیش‌نیازهای ایمنی آن در دسترس است، اما کلیه فرمان‌های تغییر در فاز ۱ غیرفعال بوده و هیچ کانال نوشتاری به SAP متصل نیست.'
                    : 'Future action catalog and preflight criteria are documented, but all SAP/OS modification controls are safely disabled in Phase 1 read-only mode.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInfo(false)}
                className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors"
              >
                {isFa ? 'متوجه شدم' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
