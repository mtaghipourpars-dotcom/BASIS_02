import React from 'react';
import { ShieldAlert, X, AlertTriangle, CheckCircle2, Clock, FileText, Database, Key } from 'lucide-react';
import { WarningRule, WarningFinding } from '../../types/mwe';
import { useApp } from '../../context/AppContext';

interface WarningFindingModalProps {
  rule: WarningRule;
  finding?: WarningFinding;
  onClose: () => void;
}

export const WarningFindingModal: React.FC<WarningFindingModalProps> = ({
  rule,
  finding,
  onClose,
}) => {
  const { locale } = useApp();
  const isFa = locale === 'fa';

  const severityColor =
    rule.severity === 'Critical'
      ? 'border-red-500/40 bg-red-950/20 text-red-300'
      : rule.severity === 'Warning'
      ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
      : 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#0c1827] border border-cyan-500/30 rounded-lg shadow-2xl text-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0e1d30]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-amber-500/20 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                  {rule.ruleId} v{rule.version}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded border font-semibold ${severityColor}`}>
                  {rule.severity}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {rule.status === 'enabled' ? (isFa ? 'فعال و ارزیابی‌شده' : 'Enabled & Evaluated') : (isFa ? 'پیکربندی‌نشده' : 'Not Configured')}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {isFa ? rule.nameFa : rule.name}
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
        <div className="p-6 overflow-y-auto space-y-5 text-xs leading-relaxed">
          {/* Description */}
          <div className="p-3.5 rounded bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 font-medium block mb-1">
              {isFa ? 'شرح قاعده ارزیابی:' : 'Rule Purpose & Description:'}
            </span>
            <p className="text-slate-200">
              {isFa ? rule.descriptionFa : rule.description}
            </p>
          </div>

          {/* Finding Evidence if active */}
          {finding ? (
            <div className="p-4 rounded bg-red-950/20 border border-red-500/30 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-red-500/20">
                <span className="font-semibold text-red-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  {isFa ? 'شواهد یافته فعال (Active Finding):' : 'Active Finding Evidence:'}
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  ID: {finding.id}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-400 text-[11px] block">{isFa ? 'مقدار مشاهده‌شده:' : 'Observed Value:'}</span>
                  <span className="font-mono font-bold text-red-300 text-sm">{finding.observedValue}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">{isFa ? 'حد آستانه مصوب:' : 'Approved Threshold:'}</span>
                  <span className="font-mono text-slate-300 text-sm">{finding.thresholdValue}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">{isFa ? 'موجودیت هدف:' : 'Target Entity:'}</span>
                  <span className="font-mono text-cyan-300">{finding.sourceEntity}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">{isFa ? 'بازه زمانی ارزیابی:' : 'Evaluation Window:'}</span>
                  <span className="text-slate-300">{finding.evaluationWindow}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-red-500/20 text-slate-300">
                <span className="text-slate-400 text-[11px] block mb-0.5">{isFa ? 'خلاصه شواهد فنی:' : 'Technical Evidence Summary:'}</span>
                <p className="font-sans text-xs text-slate-200">
                  {isFa ? finding.evidenceSummaryFa : finding.evidenceSummary}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  {finding.sourceArtifact}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {finding.observedAt}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {isFa
                  ? 'در بازه ارزیابی اخیر هیچ رخدادی مطابق با این آستانه ثبت نشده است.'
                  : 'No active findings detected under the evaluated threshold in the current observation window.'}
              </span>
            </div>
          )}

          {/* Missing Prerequisites if unconfigured */}
          {rule.status === 'not_configured' && (
            <div className="p-4 rounded bg-amber-950/20 border border-amber-500/30 space-y-2">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                {isFa ? 'پیش‌نیازهای معلق جهت فعال‌سازی قاعده:' : 'Unmet Prerequisites for Rule Activation:'}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                {(isFa ? rule.missingPrerequisitesFa : rule.missingPrerequisites)?.map((prereq, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {prereq}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-amber-400/80 pt-1">
                {isFa
                  ? 'بر اساس ضوابط ایمنی، این قاعده تا زمان تصویب رسمی آستانه و قرارداد داده‌ای غیرفعال نگه داشته می‌شود.'
                  : 'In compliance with enterprise safety rules, this rule is not evaluated until formal policy approval is validated.'}
              </p>
            </div>
          )}

          {/* Technical Metadata & Contracts */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-400 block">{isFa ? 'متریک ورودی:' : 'Input Metric:'}</span>
              <span className="font-mono text-cyan-300">{rule.inputMetric}</span>
            </div>
            <div>
              <span className="text-slate-400 block">{isFa ? 'مرجع آستانه:' : 'Threshold Reference:'}</span>
              <span className="font-mono text-slate-300">{rule.thresholdRef}</span>
            </div>
            <div>
              <span className="text-slate-400 block">{isFa ? 'قراردادهای داده منبع:' : 'Required Source Contracts:'}</span>
              <span className="font-mono text-slate-300">{rule.requiredSourceContracts.join(', ')}</span>
            </div>
            <div>
              <span className="text-slate-400 block">{isFa ? 'مالک قاعده / حاکمیت:' : 'Rule Owner & Governance:'}</span>
              <span className="text-slate-300">{rule.owner}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0e1d30] flex items-center justify-between text-xs text-slate-400">
          <span>
            {isFa ? 'کد ردپای یکتا:' : 'Deduplication Key:'} <code className="font-mono text-cyan-300">{rule.dedupKey}</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            {isFa ? 'بستن' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
