import React, { useState } from 'react';
import { Lock, Shield, ChevronRight, Ban, Info } from 'lucide-react';
import { ControlledAction } from '../../types/mwe';
import { ActionPreflightModal } from './ActionPreflightModal';
import { useApp } from '../../context/AppContext';

interface ControlledActionPanelProps {
  actions: ControlledAction[];
  className?: string;
  selectedEntityName?: string;
}

export const ControlledActionPanel: React.FC<ControlledActionPanelProps> = ({
  actions,
  className = '',
  selectedEntityName,
}) => {
  const { locale } = useApp();
  const isFa = locale === 'fa';
  const [selectedAction, setSelectedAction] = useState<ControlledAction | null>(null);

  return (
    <div className={`bg-[#0c1827] border border-slate-800 rounded-lg p-4 space-y-3.5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-slate-800 text-slate-300">
            <Lock className="w-4 h-4 text-slate-400" />
          </span>
          <div>
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <span>{isFa ? 'مسیر E: کاتالوگ عملیات کنترل‌شده' : 'Track E: Controlled Actions Catalog'}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                {isFa ? 'فاز ۱ غیرفعال' : 'Phase 1 Disabled'}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {isFa
                ? 'اقدامات تعریف‌شده جهت اجرا در فازهای بعدی؛ تمامی کنترل‌ها در فاز ۱ غیرفعال هستند.'
                : 'Architected remediation runbooks; all SAP/OS write commands safely disabled in Phase 1.'}
            </p>
          </div>
        </div>
      </div>

      {/* Selected Context Notice if provided */}
      {selectedEntityName && (
        <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
          <span className="text-slate-400">{isFa ? 'موجودیت انتخابی:' : 'Context Entity:'}</span>
          <span className="font-mono text-cyan-300 font-semibold">{selectedEntityName}</span>
        </div>
      )}

      {/* Actions List */}
      <div className="space-y-2.5">
        {actions.length === 0 ? (
          <div className="p-3 rounded bg-slate-900 text-slate-400 text-xs text-center">
            {isFa ? 'هیچ کاتالوگ اقدامی برای این زمینه تعریف نشده است.' : 'No approved action catalog for this context.'}
          </div>
        ) : (
          actions.map((act) => {
            const riskColor =
              act.riskLevel === 'Critical'
                ? 'bg-red-500/20 text-red-300 border-red-500/30'
                : act.riskLevel === 'High'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/30';

            return (
              <div
                key={act.actionId}
                className="p-3 rounded bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-cyan-400">
                        {act.actionId}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold ${riskColor}`}>
                        {act.riskLevel}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-white">
                      {isFa ? act.nameFa : act.name}
                    </h4>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono shrink-0">
                    {act.targetEntityType}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 line-clamp-2">
                  {isFa ? act.purposeFa : act.purpose}
                </p>

                {/* Preflight button and disabled execute control */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setSelectedAction(act)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isFa ? 'بررسی پیش‌نیازها و گیت‌ها' : 'Preflight Checklist & Gates'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>

                  <button
                    disabled
                    title={isFa ? 'عملیات در فاز ۱ فقط-خواندنی غیرفعال است' : 'Action disabled in Phase 1 read-only mode'}
                    className="px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700/60 text-slate-500 text-[11px] font-medium cursor-not-allowed flex items-center gap-1"
                  >
                    <Lock className="w-3 h-3" />
                    <span>{isFa ? 'غیرفعال (فاز ۱)' : 'Disabled (Phase 1)'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer policy notice */}
      <div className="pt-2 border-t border-slate-800">
        <p className="text-[10px] text-slate-400 leading-relaxed flex items-center gap-1.5">
          <Ban className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            {isFa
              ? 'در فاز ۱ هیچ فرمان اجرایی یا درخواست شبکه‌ای به SAP، پایگاه داده یا سیستم‌عامل ارسال نخواهد شد.'
              : 'Phase 1 strictly forbids write commands to SAP, database or host operating systems.'}
          </span>
        </p>
      </div>

      {/* Preflight Modal */}
      {selectedAction && (
        <ActionPreflightModal
          action={selectedAction}
          onClose={() => setSelectedAction(null)}
        />
      )}
    </div>
  );
};
