import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, ChevronRight, Info, Filter } from 'lucide-react';
import { WarningRule, WarningFinding } from '../../types/mwe';
import { WarningFindingModal } from './WarningFindingModal';
import { useApp } from '../../context/AppContext';

interface WarningRulePanelProps {
  rules: WarningRule[];
  className?: string;
}

export const WarningRulePanel: React.FC<WarningRulePanelProps> = ({ rules, className = '' }) => {
  const { locale } = useApp();
  const isFa = locale === 'fa';
  const [selectedRule, setSelectedRule] = useState<WarningRule | null>(null);
  const [selectedFinding, setSelectedFinding] = useState<WarningFinding | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'findings' | 'allRules'>('findings');

  const allFindings = rules.flatMap((r) => r.findings || []);
  const configuredRules = rules.filter((r) => r.status === 'enabled');
  const unconfiguredRules = rules.filter((r) => r.status === 'not_configured');

  const handleOpenRule = (rule: WarningRule, finding?: WarningFinding) => {
    setSelectedRule(rule);
    setSelectedFinding(finding || rule.findings?.[0]);
  };

  return (
    <div className={`bg-[#0c1827] border border-slate-800 rounded-lg p-4 space-y-4 ${className}`}>
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded bg-amber-500/20 text-amber-400">
            <ShieldAlert className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <span>{isFa ? 'مسیر W: قواعد هشدار و یافته‌ها' : 'Track W: Warning Rules & Findings'}</span>
              <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                {allFindings.length} {isFa ? 'یافته' : 'active'}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {isFa ? 'ارزیابی خودکار مبتنی بر شواهد منبع و آستانه‌های مصوب' : 'Automated rule evaluation against mapped source evidence'}
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 p-0.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
          <button
            onClick={() => setActiveTab('findings')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'findings'
                ? 'bg-amber-500/20 text-amber-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFa ? `یافته‌ها (${allFindings.length})` : `Findings (${allFindings.length})`}
          </button>
          <button
            onClick={() => setActiveTab('allRules')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'allRules'
                ? 'bg-slate-800 text-cyan-300 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFa ? `همه قواعد (${rules.length})` : `All Rules (${rules.length})`}
          </button>
        </div>
      </div>

      {/* Tab: Findings List */}
      {activeTab === 'findings' && (
        <div className="space-y-2.5">
          {allFindings.length === 0 ? (
            <div className="p-4 rounded bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {isFa
                  ? 'تمامی قواعد ارزیابی‌شده در وضعیت پایدار هستند و هیچ نقض آستانه‌ای مشاهده نشد.'
                  : 'All evaluated rules are currently within approved baseline parameters.'}
              </span>
            </div>
          ) : (
            allFindings.map((finding) => {
              const rule = rules.find((r) => r.ruleId === finding.ruleId) || rules[0];
              const isCrit = finding.severity === 'Critical';

              return (
                <div
                  key={finding.id}
                  onClick={() => handleOpenRule(rule, finding)}
                  className={`p-3 rounded border transition-all cursor-pointer hover:border-cyan-500/50 ${
                    isCrit
                      ? 'bg-red-950/20 border-red-500/30 text-red-200'
                      : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="flex items-center gap-1.5 text-white">
                      <AlertTriangle className={`w-3.5 h-3.5 ${isCrit ? 'text-red-400' : 'text-amber-400'}`} />
                      {isFa ? finding.titleFa : finding.title}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                        isCrit ? 'bg-red-500/30 text-red-200' : 'bg-amber-500/30 text-amber-200'
                      }`}
                    >
                      {finding.severity}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 line-clamp-2 mb-2">
                    {isFa ? finding.evidenceSummaryFa : finding.evidenceSummary}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
                    <span className="font-mono text-cyan-300">{finding.ruleId}</span>
                    <span className="font-mono">
                      {isFa ? 'مشاهده:' : 'Obs:'} <strong className="text-white">{finding.observedValue}</strong> / {isFa ? 'حد:' : 'Limit:'} {finding.thresholdValue}
                    </span>
                    <span className="text-cyan-400 flex items-center gap-0.5 hover:underline">
                      {isFa ? 'شواهد کامل' : 'Details'} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab: All Rules (Configured & Gated) */}
      {activeTab === 'allRules' && (
        <div className="space-y-2">
          {rules.map((rule) => {
            const isConfigured = rule.status === 'enabled';
            return (
              <div
                key={rule.ruleId}
                onClick={() => handleOpenRule(rule)}
                className={`p-2.5 rounded border transition-colors cursor-pointer flex items-center justify-between text-xs ${
                  isConfigured
                    ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 text-slate-200'
                    : 'bg-slate-900/40 border-slate-800/60 hover:border-amber-500/40 text-slate-400'
                }`}
              >
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-cyan-400 font-bold">
                      {rule.ruleId}
                    </span>
                    <span className="font-medium text-white text-xs">
                      {isFa ? rule.nameFa : rule.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isConfigured ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {isFa ? 'پیکربندی‌شده و فعال' : 'Configured & Evaluated'}
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {isFa ? 'در انتظار پیش‌نیازها' : 'Gated / Prerequisites Pending'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      rule.severity === 'Critical'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {rule.severity}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Unconfigured Prerequisites Notice */}
      {unconfiguredRules.length > 0 && activeTab === 'findings' && (
        <div className="pt-2 border-t border-slate-800">
          <div className="p-2.5 rounded bg-slate-900/70 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {isFa
                  ? `${unconfiguredRules.length} قاعده به دلیل عدم تصویب رسمی آستانه غیرفعال است.`
                  : `${unconfiguredRules.length} rule(s) gated pending formal policy approval.`}
              </span>
            </span>
            <button
              onClick={() => setActiveTab('allRules')}
              className="text-cyan-400 hover:underline shrink-0 ml-2"
            >
              {isFa ? 'مشاهده پیش‌نیازها' : 'View Missing Gates'}
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedRule && (
        <WarningFindingModal
          rule={selectedRule}
          finding={selectedFinding}
          onClose={() => {
            setSelectedRule(null);
            setSelectedFinding(undefined);
          }}
        />
      )}
    </div>
  );
};
