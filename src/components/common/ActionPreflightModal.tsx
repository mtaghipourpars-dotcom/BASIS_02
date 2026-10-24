import React from 'react';
import { Lock, X, AlertTriangle, Shield, CheckCircle, Clock, FileText, ArrowRight, Ban } from 'lucide-react';
import { ControlledAction } from '../../types/mwe';
import { useApp } from '../../context/AppContext';

interface ActionPreflightModalProps {
  action: ControlledAction;
  onClose: () => void;
}

export const ActionPreflightModal: React.FC<ActionPreflightModalProps> = ({
  action,
  onClose,
}) => {
  const { locale } = useApp();
  const isFa = locale === 'fa';

  const riskBadgeColor =
    action.riskLevel === 'Critical'
      ? 'border-red-500/40 bg-red-950/30 text-red-300'
      : action.riskLevel === 'High'
      ? 'border-amber-500/40 bg-amber-950/30 text-amber-300'
      : 'border-blue-500/40 bg-blue-950/30 text-blue-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#0c1827] border border-cyan-500/30 rounded-lg shadow-2xl text-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0e1d30]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-slate-800 text-slate-400">
              <Lock className="w-5 h-5 text-slate-300" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                  {action.actionId} v{action.version}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded border font-semibold ${riskBadgeColor}`}>
                  {isFa ? `ریسک: ${action.riskLevel}` : `Risk: ${action.riskLevel}`}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-red-950/40 border border-red-500/30 text-red-300 font-mono">
                  {isFa ? 'فاز ۱: غیرفعال' : 'Phase 1: Disabled'}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {isFa ? action.nameFa : action.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed">
          {/* Phase 1 Read-only Safety Barrier Warning */}
          <div className="p-3.5 rounded bg-red-950/30 border border-red-500/40 text-red-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-red-300">
              <Ban className="w-4 h-4 text-red-400 shrink-0" />
              <span>{isFa ? 'سد حفاظتی فاز ۱ — فقط-خواندنی' : 'Phase 1 Safety Gate — Read-Only Boundary'}</span>
            </div>
            <p className="text-xs text-red-100/90 leading-relaxed">
              {isFa ? action.disabledReasonFa : action.disabledReason}
            </p>
          </div>

          {/* Target & Purpose */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded bg-slate-900 border border-slate-800">
            <div>
              <span className="text-slate-400 text-[11px] block">{isFa ? 'موجودیت هدف:' : 'Target Entity:'}</span>
              <span className="font-mono font-semibold text-cyan-300">{action.targetEntityType}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">{isFa ? 'وضعیت رابط اتصال:' : 'Adapter Status:'}</span>
              <span className="font-mono text-amber-300">{action.adapterStatus}</span>
            </div>
            <div className="col-span-2 pt-1 border-t border-slate-800/80">
              <span className="text-slate-400 text-[11px] block mb-0.5">{isFa ? 'هدف عملیاتی:' : 'Operational Purpose:'}</span>
              <p className="text-slate-200">{isFa ? action.purposeFa : action.purpose}</p>
            </div>
            <div className="col-span-2 pt-1 border-t border-slate-800/80">
              <span className="text-slate-400 text-[11px] block mb-0.5">{isFa ? 'تأثیر عملیاتی مورد انتظار:' : 'Expected Operational Impact:'}</span>
              <p className="text-amber-200/90">{isFa ? action.expectedImpactFa : action.expectedImpact}</p>
            </div>
          </div>

          {/* Preflight Checklist */}
          <div className="p-4 rounded bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-cyan-400" />
              {isFa ? 'چک‌لیست پیش‌نیازهای ایمنی پرواز (Preflight Checklist):' : 'Preflight Safety Requirements Checklist:'}
            </span>
            <div className="space-y-1.5 pt-1">
              {(isFa ? action.preconditionsFa : action.preconditions).map((cond, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300 text-xs">
                  <span className="p-0.5 rounded bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
                    <Clock className="w-3 h-3" />
                  </span>
                  <span>{cond}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Governance, Authorizations, and Windows */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-400 block">{isFa ? 'مجوزهای SAP مورد نیاز:' : 'Required SAP Authorizations:'}</span>
              <div className="font-mono text-cyan-300 space-y-0.5 mt-0.5">
                {action.requiredPermissions.map((perm, idx) => (
                  <div key={idx}>{perm}</div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-slate-400 block">{isFa ? 'نیاز به تاییدیه مدیران:' : 'Approval Required:'}</span>
                <span className="font-medium text-white">
                  {action.approvalRequired
                    ? isFa ? 'بله — تایید دوگانه معمار عملیات' : 'Yes — Dual Lead Architect Sign-off'
                    : isFa ? 'خیر' : 'No'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{isFa ? 'نیاز به پنجره تغییر:' : 'Change Window Required:'}</span>
                <span className="font-medium text-white">
                  {action.changeWindowRequired
                    ? isFa ? 'بله — پنجره مصوب CAB' : 'Yes — Approved CAB Window'
                    : isFa ? 'خیر' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Rollback & Verification Criteria */}
          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 space-y-2 text-[11px]">
            <div>
              <span className="text-slate-400 block mb-0.5">{isFa ? 'برنامه بازگردانی / جبران خطا (Rollback):' : 'Rollback / Compensation Plan:'}</span>
              <p className="text-slate-300">{isFa ? action.rollbackPlanFa : action.rollbackPlan}</p>
            </div>
            <div className="pt-2 border-t border-slate-800">
              <span className="text-slate-400 block mb-0.5">{isFa ? 'معیار تایید صحت پس از اجرا (Verification):' : 'Post-Execution Verification Criteria:'}</span>
              <p className="text-slate-300">{isFa ? action.verificationCriteriaFa : action.verificationCriteria}</p>
            </div>
          </div>
        </div>

        {/* Footer with strictly disabled execution button */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0e1d30] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>{isFa ? 'فرمان اجرا در فاز ۱ غیرقابل فراخوانی است' : 'Action execution cannot be invoked in Phase 1'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
            >
              {isFa ? 'بستن' : 'Close'}
            </button>
            <button
              disabled
              title={isFa ? 'عملیات در فاز ۱ غیرفعال است' : 'Execution disabled in Phase 1 read-only mode'}
              className="px-4 py-1.5 rounded bg-slate-800 text-slate-500 font-medium cursor-not-allowed border border-slate-700/50 flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isFa ? 'اجرا (غیرفعال در فاز ۱)' : 'Execute (Disabled in Phase 1)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
