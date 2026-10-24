import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  X,
  AlertTriangle,
  Clock,
  UserCheck,
  CheckCircle2,
  FileText,
  Server,
  Lock,
} from 'lucide-react';

export interface WarningLifecycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionName: string;
  actionCode: string;
  targetTitle: string;
  ruleId?: string;
}

export const WarningLifecycleModal: React.FC<WarningLifecycleModalProps> = ({
  isOpen,
  onClose,
  actionName,
  actionCode,
  targetTitle,
  ruleId,
}) => {
  const { locale } = useApp();
  const isFa = locale === 'fa';

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="warningLifecycleTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-[#0b1726] border border-[#22384f] rounded-xl max-w-xl w-full p-6 shadow-2xl text-slate-200 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1c2e42] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-600/40 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                {isFa ? 'اقدام چرخه عمر هشدار (W)' : 'Warning Lifecycle Action (W)'}
              </div>
              <h3 id="warningLifecycleTitle" className="text-base font-bold text-white mt-0.5">
                {actionName}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#16273b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Entity */}
        <div className="p-3 rounded-lg bg-[#0e1d30] border border-[#1f344d] text-xs space-y-1">
          <div className="text-slate-400 text-[11px]">
            {isFa ? 'رکورد یا یافته هشدار هدف:' : 'Target Warning Finding / Alert Record:'}
          </div>
          <div className="font-semibold text-cyan-300 font-mono text-sm">{targetTitle}</div>
          {ruleId && (
            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
              <span>{isFa ? 'قاعده مرتبط:' : 'Associated Rule:'}</span>
              <span className="font-mono text-amber-300">{ruleId}</span>
            </div>
          )}
        </div>

        {/* Phase 1 Gating Explanation */}
        <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
            <Lock className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              {isFa
                ? 'وضعیت در فاز ۱: پیکربندی‌نشده (فاقد مخزن ماندگار وضعیت هشدار)'
                : 'Phase 1 Status: Not Configured (No Persistent Alert State Store)'}
            </span>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed">
            {isFa
              ? 'در فاز ۱، تمام قابلیت‌های نظارت (M) فعال و فقط-خواندنی هستند. اکشن‌های چرخه عمر هشدار (مانند تأیید، تخصیص، ارجاع، بی‌صدا سازی و حل) نیازمند مخزن ماندگار وقایع و سرویس مسیریابی هشدار هستند. از آنجا که هیچ نقطه پایانی واقعی متصل نشده است، اعمال تغییرات موقت محلی (مانند پیام‌های Toast ساختگی) مسدود شده است تا از ادعای نادرست جلوگیری شود.'
              : 'In Phase 1, all Monitoring (M) capabilities are fully active and read-only. Warning lifecycle actions (Acknowledge, Assign, Escalate, Snooze, Suppress, Resolve) alter alert lifecycle records rather than SAP operational state. Because an authorized persistent alert state store and event pipeline are not yet provisioned, simulated local mutations are blocked to avoid unverified operational claims.'}
          </p>
        </div>

        {/* Missing Prerequisites Checklist */}
        <div className="space-y-2 text-xs">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {isFa ? 'پیش‌نیازهای فنی فعال‌سازی در فاز بعدی:' : 'Technical Activation Gates (Next Phase):'}
          </div>
          <ul className="space-y-1.5 text-[11px] text-slate-300">
            <li className="flex items-start gap-2 p-2 rounded bg-[#0e1d30] border border-[#1b2f45]">
              <Server className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {isFa
                  ? 'اتصال سرویس پایدار هشدارهای سه‌بعدی و ثبت لاگ وقایع (Alert Lifecycle Event Store)'
                  : 'Provisioning of durable alert lifecycle event store and triage router'}
              </span>
            </li>
            <li className="flex items-start gap-2 p-2 rounded bg-[#0e1d30] border border-[#1b2f45]">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                {isFa
                  ? 'احراز هویت کارشناس عملیات با مجوز ALERTMGR_ACK یا ALERTMGR_SUPPRESS'
                  : 'Operator authorization with granular ALERTMGR_ACK / ALERTMGR_SUPPRESS permission'}
              </span>
            </li>
            <li className="flex items-start gap-2 p-2 rounded bg-[#0e1d30] border border-[#1b2f45]">
              <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                {isFa
                  ? 'سامانه حسابرسی غیرقابل‌تغییر ثبت رخدادها با ثبت شناسه کاربری و برچسب زمانی'
                  : 'Immutable audit trail logging operator identity, reason, and transition timestamp'}
              </span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1c2e42]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#14293f] hover:bg-[#1d3a5a] text-cyan-200 text-xs font-semibold border border-[#2c4e72] transition-colors"
          >
            {isFa ? 'بستن' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
