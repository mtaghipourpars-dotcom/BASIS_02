import React, { useState } from 'react';
import {
  X,
  Clock,
  FileText,
  Shield,
  Layers,
  Activity,
  AlertTriangle,
  RotateCw,
  ExternalLink,
  Lock,
  ChevronRight,
  Info,
  CheckCircle2,
  Database,
  ArrowRight,
  Server,
  FileCode,
  ListOrdered,
  Printer,
  Calendar,
  BookOpen,
} from 'lucide-react';
import { PageId } from '../../types';
import { ControlledAction, EntityMonitoringAction } from '../../types/mwe';
import { ActionPreflightModal } from './ActionPreflightModal';
import {
  ISLAND_MONITORING_ACTIONS,
  CONTROLLED_ACTIONS,
} from '../../data/mweRegistry';
import { useApp } from '../../context/AppContext';

export interface EntityStepItem {
  stepNumber: number;
  program: string;
  variant?: string;
  user?: string;
  language?: string;
  status?: string;
}

export interface EntityJobLogItem {
  timestamp: string;
  msgType: 'I' | 'W' | 'E' | 'S';
  msgId: string;
  msgNumber: string;
  messageText: string;
}

export interface EntitySpoolItem {
  spoolId: string;
  title: string;
  pages: number;
  format: string;
  createdAt: string;
}

export interface EntityStartCondition {
  type: string;
  details: string;
  periodic: boolean;
  nextRun?: string;
}

export interface EntityRelatedRecord {
  islandId: PageId;
  title: string;
  id: string;
  count?: number;
  description?: string;
  descriptionFa?: string;
}

export interface EntityWorkProcessItem {
  wpNo: number;
  type: string;
  pid: string;
  status: string;
  program: string;
  cpuSec: number;
}

export interface EntityDetailData {
  id: string;
  name: string;
  islandId: PageId;
  entityType: string;
  status?: string;
  statusBadge?: React.ReactNode;
  attributes: Record<string, React.ReactNode>;
  sourceLocator?: string;
  sourceArtifact: string;
  observedAt?: string;
  confidence?: 'High' | 'Medium' | 'Low';
  provenanceNotes?: string;
  provenanceNotesFa?: string;
  steps?: EntityStepItem[];
  jobLogs?: EntityJobLogItem[];
  spools?: EntitySpoolItem[];
  startCondition?: EntityStartCondition;
  documentation?: string;
  workProcesses?: EntityWorkProcessItem[];
  relatedRecords?: EntityRelatedRecord[];
  controlledActions?: ControlledAction[];
}

interface EntityDetailDrawerProps {
  entity: EntityDetailData | null;
  isOpen: boolean;
  onClose: () => void;
  customControlledActions?: ControlledAction[];
}

export const EntityDetailDrawer: React.FC<EntityDetailDrawerProps> = ({
  entity,
  isOpen,
  onClose,
  customControlledActions,
}) => {
  const { locale, navigate, t } = useApp();
  const isFa = locale === 'fa';
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedAction, setSelectedAction] = useState<ControlledAction | null>(null);
  const [refreshFeedback, setRefreshFeedback] = useState<string | null>(null);
  const [actionCategoryFilter, setActionCategoryFilter] = useState<string>('ALL');

  if (!isOpen || !entity) return null;

  // Retrieve monitoring actions for this island
  const monitoringActions = ISLAND_MONITORING_ACTIONS[entity.islandId] || [];
  const topToolbarActions = monitoringActions.slice(0, 4);

  // Retrieve controlled actions for this entity/island
  const availableControlledActions =
    customControlledActions ||
    entity.controlledActions ||
    CONTROLLED_ACTIONS.filter((a) => a.islandId === entity.islandId);

  // Group controlled actions by category (e.g. Job Definition vs Job Run)
  const actionCategories = Array.from(
    new Set(availableControlledActions.map((a) => a.category).filter(Boolean))
  ) as string[];

  const filteredControlledActions =
    actionCategoryFilter === 'ALL'
      ? availableControlledActions
      : availableControlledActions.filter((a) => a.category === actionCategoryFilter);

  const handleMonitoringAction = (action: EntityMonitoringAction) => {
    if (action.code === 'REFRESH') {
      setRefreshFeedback(
        isFa
          ? 'واکشی مجدد مشاهدات محلی با موفقیت انجام شد (بدون تغییر در سیستم SAP).'
          : 'Local telemetry refreshed from cache (no SAP write mutation).'
      );
      setTimeout(() => setRefreshFeedback(null), 3000);
    } else if (action.code === 'STATUS' || action.code.includes('DETAILS')) {
      setActiveTab('overview');
    } else if (action.code === 'STEP') {
      setActiveTab('steps');
    } else if (action.code === 'JOB_LOG') {
      setActiveTab('jobLog');
    } else if (action.code === 'SPOOL') {
      setActiveTab('spool');
    } else if (action.code === 'SCHEDULE_START_CONDITION') {
      setActiveTab('schedule');
    } else if (action.code === 'JOB_DOCUMENTATION') {
      setActiveTab('documentation');
    } else if (action.code === 'RELATED_EVENTS') {
      setActiveTab('related');
    }
  };

  const getLogTypeBadge = (type: 'I' | 'W' | 'E' | 'S') => {
    switch (type) {
      case 'E':
        return <span className="px-1 py-0.2 rounded bg-rose-950 text-rose-300 font-mono text-[9px] border border-rose-800">ERR</span>;
      case 'W':
        return <span className="px-1 py-0.2 rounded bg-amber-950 text-amber-300 font-mono text-[9px] border border-amber-800">WRN</span>;
      case 'S':
        return <span className="px-1 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono text-[9px] border border-emerald-800">SUC</span>;
      case 'I':
      default:
        return <span className="px-1 py-0.2 rounded bg-blue-950 text-blue-300 font-mono text-[9px] border border-blue-800">INF</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <aside
        id="detailDrawer"
        aria-label="Entity Detail Drawer"
        className="w-full sm:w-[560px] lg:w-[680px] bg-[#0c1a29] border-s border-[#23384f] shadow-2xl flex flex-col h-full animate-slideInRight"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#203349] bg-[#0e1f33] space-y-3 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 uppercase tracking-wider font-bold">
                  {entity.entityType}
                </span>
                {entity.statusBadge || (
                  entity.status && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {entity.status}
                    </span>
                  )
                )}
              </div>
              <h2 id="detailJobName" className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {entity.name}
              </h2>
              <div className="text-xs text-[#8ca4be] font-mono ltr-isolate">
                ID: {entity.id}
              </div>
            </div>

            <button
              type="button"
              id="closeDrawer"
              onClick={onClose}
              aria-label="Close detail"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#192c43] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Track M: Monitoring Toolbar Actions Strip */}
          {topToolbarActions.length > 0 && (
            <div className="pt-2 border-t border-[#1c2e43] flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] text-[#718aa6] font-medium flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>{isFa ? 'اقدامات پایش (Track M):' : 'Monitoring (Track M):'}</span>
              </span>

              <div className="flex items-center gap-1.5 flex-wrap">
                {topToolbarActions.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => handleMonitoringAction(act)}
                    title={isFa ? act.descriptionFa : act.description}
                    className="px-2.5 py-1 rounded bg-[#13283f] hover:bg-[#1b3552] border border-[#26415f] text-cyan-200 text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {act.code === 'REFRESH' && <RotateCw className="w-3 h-3 text-cyan-400" />}
                    <span>{isFa ? act.labelFa : act.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Refresh feedback toast */}
          {refreshFeedback && (
            <div className="p-2 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{refreshFeedback}</span>
            </div>
          )}
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#091421] border-b border-[#1b2b3d] overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium ${
              activeTab === 'overview'
                ? 'bg-[#152e4a] text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFa ? 'نمای کلی و وضعیت' : 'Overview & Status'}
          </button>

          {entity.steps && entity.steps.length > 0 && (
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium flex items-center gap-1 ${
                activeTab === 'steps'
                  ? 'bg-[#152e4a] text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>{isFa ? `گام‌ها (${entity.steps.length})` : `Steps (${entity.steps.length})`}</span>
            </button>
          )}

          {entity.jobLogs && entity.jobLogs.length > 0 && (
            <button
              onClick={() => setActiveTab('jobLog')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium flex items-center gap-1 ${
                activeTab === 'jobLog'
                  ? 'bg-[#152e4a] text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{isFa ? `لاگ کار (${entity.jobLogs.length})` : `Job Log (${entity.jobLogs.length})`}</span>
            </button>
          )}

          {entity.spools && (
            <button
              onClick={() => setActiveTab('spool')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium flex items-center gap-1 ${
                activeTab === 'spool'
                  ? 'bg-[#152e4a] text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isFa ? 'خروجی Spool' : 'Spool'}</span>
            </button>
          )}

          {entity.workProcesses && entity.workProcesses.length > 0 && (
            <button
              onClick={() => setActiveTab('workProcesses')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium flex items-center gap-1 ${
                activeTab === 'workProcesses'
                  ? 'bg-[#152e4a] text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isFa ? `پردازش‌های کاری (${entity.workProcesses.length})` : `Work Processes (${entity.workProcesses.length})`}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium ${
              activeTab === 'evidence'
                ? 'bg-[#152e4a] text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFa ? 'شواهد و اصالت منبع' : 'Source Evidence'}
          </button>

          {entity.relatedRecords && entity.relatedRecords.length > 0 && (
            <button
              onClick={() => setActiveTab('related')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium ${
                activeTab === 'related'
                  ? 'bg-[#152e4a] text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isFa ? `رویدادهای مرتبط (${entity.relatedRecords.length})` : `Related (${entity.relatedRecords.length})`}
            </button>
          )}

          {availableControlledActions.length > 0 && (
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium flex items-center gap-1 ${
                activeTab === 'actions'
                  ? 'bg-red-950/40 text-red-200 font-semibold border border-red-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lock className="w-3 h-3 text-red-400" />
              <span>{isFa ? `عملیات کنترل‌شده (${availableControlledActions.length})` : `Controlled Actions (${availableControlledActions.length})`}</span>
            </button>
          )}
        </div>

        {/* Drawer Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div id="detailGrid" className="grid grid-cols-2 gap-3">
                {Object.entries(entity.attributes).map(([label, val], idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#0f1d2e] border border-[#1d3148]">
                    <div className="text-[10px] text-[#718aa6] font-medium">{label}</div>
                    <div className="font-semibold text-white tech-id mt-0.5 font-mono">{val}</div>
                  </div>
                ))}
              </div>

              {/* Start Condition Summary if available */}
              <div className="p-3.5 rounded-lg bg-[#0f1d2e] border border-[#1d3148] space-y-1.5">
                <div className="font-semibold text-white flex items-center gap-1.5 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isFa ? 'شرایط شروع و زمان‌بندی (Start Condition):' : 'Start Condition & Schedule:'}</span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  {entity.startCondition ? (
                    <div>
                      <div><strong className="text-white">{isFa ? 'نوع ماشه:' : 'Trigger Type:'}</strong> {entity.startCondition.type}</div>
                      <div><strong className="text-white">{isFa ? 'جزئیات:' : 'Details:'}</strong> {entity.startCondition.details}</div>
                      <div><strong className="text-white">{isFa ? 'تکرار دوره‌ای:' : 'Periodic:'}</strong> {entity.startCondition.periodic ? (isFa ? 'بله' : 'Yes') : (isFa ? 'خیر' : 'No')}</div>
                    </div>
                  ) : (
                    <div>
                      {isFa
                        ? 'شروع فوری / تاریخ و زمان بر اساس زمان‌بندی اولیه در TBTCO.'
                        : 'Immediate / Planned Start Condition registered in TBTCO.'}
                    </div>
                  )}
                </div>
              </div>

              {/* Read-Only Safety Banner */}
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs flex items-center gap-2">
                <Shield className="w-4 h-4 shrink-0 text-amber-400" />
                <span>{t('readOnlyActionDisabled')}</span>
              </div>
            </div>
          )}

          {/* TAB: STEPS */}
          {activeTab === 'steps' && entity.steps && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1d3148]">
                <h3 className="font-semibold text-white text-xs flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4 text-cyan-400" />
                  <span>{isFa ? 'گام‌های اجرایی کار (Job Steps - SM37):' : 'Background Job Steps (SM37):'}</span>
                </h3>
                <span className="text-[10px] text-[#718aa6] font-mono">
                  Total: {entity.steps.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {entity.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-3.5 rounded-lg bg-[#0f1d2e] border border-[#1d3148] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center font-bold font-mono text-[11px]">
                          {step.stepNumber}
                        </span>
                        <span className="font-mono font-bold text-white text-xs">{step.program}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                        {step.status || 'Finished'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-[#1a2d42]">
                      <div>
                        <span className="text-[#718aa6] block">{isFa ? 'متغیر (Variant):' : 'Variant:'}</span>
                        <span className="font-mono text-cyan-300">{step.variant || '—'}</span>
                      </div>
                      <div>
                        <span className="text-[#718aa6] block">{isFa ? 'کاربر اجرا:' : 'User:'}</span>
                        <span className="font-mono text-white">{step.user || 'DDIC'}</span>
                      </div>
                      <div>
                        <span className="text-[#718aa6] block">{isFa ? 'زبان:' : 'Language:'}</span>
                        <span className="font-mono text-white">{step.language || 'EN'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: JOB LOG */}
          {activeTab === 'jobLog' && entity.jobLogs && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1d3148]">
                <h3 className="font-semibold text-white text-xs flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  <span>{isFa ? 'لاگ اجرای کار در SM37 (Job Log):' : 'Job Execution Messages (Job Log):'}</span>
                </h3>
                <span className="text-[10px] text-[#718aa6] font-mono">
                  {entity.jobLogs.length} entries
                </span>
              </div>

              <div className="space-y-2 font-mono text-[11px]">
                {entity.jobLogs.map((log, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded bg-[#0b1624] border border-[#1a2c42] flex items-start gap-2.5"
                  >
                    <span className="text-[#718aa6] shrink-0 text-[10px] pt-0.5">{log.timestamp}</span>
                    <span className="shrink-0">{getLogTypeBadge(log.msgType)}</span>
                    <span className="text-cyan-400 text-[10px] shrink-0">{log.msgId}({log.msgNumber})</span>
                    <span className="text-slate-200 text-xs flex-1 font-sans">{log.messageText}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SPOOL */}
          {activeTab === 'spool' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1d3148]">
                <h3 className="font-semibold text-white text-xs flex items-center gap-1.5">
                  <Printer className="w-4 h-4 text-cyan-400" />
                  <span>{isFa ? 'فهرست خروجی‌های Spool:' : 'Generated Spool Requests:'}</span>
                </h3>
              </div>

              {entity.spools && entity.spools.length > 0 ? (
                <div className="space-y-2">
                  {entity.spools.map((spool) => (
                    <div
                      key={spool.spoolId}
                      className="p-3 rounded-lg bg-[#0f1d2e] border border-[#1d3148] flex items-center justify-between"
                    >
                      <div>
                        <div className="font-mono font-bold text-white text-xs">{spool.spoolId}</div>
                        <div className="text-[11px] text-[#8ca4be]">{spool.title}</div>
                      </div>
                      <div className="text-end text-[11px] font-mono text-slate-300">
                        <div>{spool.pages} pages</div>
                        <div className="text-[10px] text-[#718aa6]">{spool.format}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-[#0e1d2f] border border-[#1d3148] text-slate-400 text-xs text-center space-y-1">
                  <p>{isFa ? 'هیچ رکورد خروجی Spool در گزارش استخراج‌شده وجود نداشت.' : 'No spool request numbers extracted in this SM37 excerpt.'}</p>
                  <p className="text-[11px] text-[#718aa6]">{isFa ? 'مشاهده خروجی چاپی نیازمند دسترسی به SP01 سیستم SAP است.' : 'Viewing full spool documents requires direct SP01 read authorization.'}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: WORK PROCESSES (SM50) */}
          {activeTab === 'workProcesses' && entity.workProcesses && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1d3148]">
                <h3 className="font-semibold text-white text-xs flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>{isFa ? 'پردازش‌های کاری نمونه‌برداری‌شده (SM50 Work Processes):' : 'Sampled Work Processes (SM50 Overview):'}</span>
                </h3>
              </div>
              <div className="overflow-x-auto rounded-lg border border-[#1d3148]">
                <table className="w-full text-left rtl:text-right text-[11px]">
                  <thead className="bg-[#0b1623] text-slate-400 font-mono">
                    <tr>
                      <th className="p-2 border-b border-[#1d3148]">No.</th>
                      <th className="p-2 border-b border-[#1d3148]">Type</th>
                      <th className="p-2 border-b border-[#1d3148]">PID</th>
                      <th className="p-2 border-b border-[#1d3148]">Status</th>
                      <th className="p-2 border-b border-[#1d3148]">Program / Report</th>
                      <th className="p-2 border-b border-[#1d3148] text-end">CPU (s)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#152538] font-mono">
                    {entity.workProcesses.map((wp) => (
                      <tr key={wp.wpNo} className="hover:bg-[#112338]">
                        <td className="p-2 text-cyan-300">#{wp.wpNo}</td>
                        <td className="p-2 font-semibold text-white">{wp.type}</td>
                        <td className="p-2 text-slate-300">{wp.pid}</td>
                        <td className="p-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                            wp.status === 'Running' || wp.status === 'On Hold'
                              ? 'bg-amber-950/60 text-amber-300 border border-amber-600/30'
                              : 'bg-emerald-950/60 text-emerald-300 border border-emerald-600/30'
                          }`}>
                            {wp.status}
                          </span>
                        </td>
                        <td className="p-2 text-slate-300 font-mono">{wp.program || '—'}</td>
                        <td className="p-2 text-end text-cyan-200">{wp.cpuSec}s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SOURCE EVIDENCE */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#0e1d2f] border border-[#1d334c] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#1a2d42]">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>{isFa ? 'شواهد استخراج‌شده از منبع:' : 'Source Extraction Evidence:'}</span>
                  </span>
                  <span className="font-mono text-[10px] text-cyan-300 px-1.5 py-0.5 rounded bg-[#13273e] border border-[#213d5e]">
                    {entity.confidence || 'High'} Confidence
                  </span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <div>
                    <span className="text-[#718aa6] text-[11px] block">{isFa ? 'سند / مصنوع منبع:' : 'Source Artifact:'}</span>
                    <span className="font-mono text-cyan-200 text-xs">{entity.sourceArtifact}</span>
                  </div>

                  {entity.sourceLocator && (
                    <div>
                      <span className="text-[#718aa6] text-[11px] block">{isFa ? 'موقعیت ردیف / شناسه مرجع:' : 'Extraction Locator:'}</span>
                      <span className="font-mono text-white text-xs">{entity.sourceLocator}</span>
                    </div>
                  )}

                  {entity.observedAt && (
                    <div>
                      <span className="text-[#718aa6] text-[11px] block">{isFa ? 'زمان ثبت مشاهده:' : 'Observation Timestamp:'}</span>
                      <span className="font-mono text-amber-300 text-xs">{entity.observedAt}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#1a2d42]">
                    <span className="text-[#718aa6] text-[11px] block mb-1">{isFa ? 'محدودیت‌ها و نکات اصالت داده:' : 'Data Limitations & Provenance Notes:'}</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {isFa
                        ? entity.provenanceNotesFa || 'تاریخ جلالی و زمان‌ها دقیقاً مطابق سند استخراجی نگهداری شده است. بر اساس استاندارد سیستم، از استنتاج وضعیت برخط پرهیز شده است.'
                        : entity.provenanceNotes || 'Jalali dates, times, and duration values are preserved as extracted. No synthetic live status is claimed.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Invariants Notice */}
              <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-200 text-[11px] space-y-1">
                <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isFa ? 'قوانین عدم تحریف داده‌ها:' : 'Data Integrity Invariant:'}</span>
                </div>
                <p>
                  {isFa
                    ? 'فیلدهای ناشناخته به صفر یا وضعیت سبز تبدیل نشده‌اند. مقادیر خام در کنار مقادیر استاندارد قابل ردیابی هستند.'
                    : 'Unknown fields are not converted to healthy zeros. Raw fields remain traceable beside normalized values.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB: RELATED CROSS-ISLAND RECORDS */}
          {activeTab === 'related' && entity.relatedRecords && (
            <div className="space-y-3">
              <p className="text-slate-400 text-[11px]">
                {isFa
                  ? 'رکوردهای همبسته در سایر جزایر عملیاتی بر اساس شناسه یا زمان رخداد:'
                  : 'Correlated records in other operational islands based on deterministic keys:'}
              </p>

              <div className="space-y-2">
                {entity.relatedRecords.map((link, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onClose();
                      navigate(link.islandId);
                    }}
                    className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1c3047] hover:border-cyan-500/50 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-xs">
                          {link.title}
                        </span>
                        {link.count !== undefined && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                            {link.count}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#7892ad]">
                        {isFa ? link.descriptionFa || `مشاهده جزیره ${link.islandId}` : link.description || `View ${link.islandId} workspace`}
                      </p>
                    </div>

                    <span className="text-cyan-400 flex items-center gap-1 text-[11px] font-medium shrink-0">
                      <span>{isFa ? 'انتقال' : 'Open'}</span>
                      <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TRACK E CONTROLLED ACTIONS (Separated by Definition vs Run) */}
          {activeTab === 'actions' && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 text-red-200 text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  {isFa
                    ? 'تمامی عملیات اجرایی در فاز ۱ غیرفعال هستند. برای هر اقدام پیش‌نیازها و گیت‌های مصوب را بررسی کنید.'
                    : 'All operational write commands are strictly disabled in Phase 1 read-only mode.'}
                </span>
              </div>

              {/* Category Pills (e.g. Job Definition vs Job Run) */}
              {actionCategories.length > 1 && (
                <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                  <button
                    onClick={() => setActionCategoryFilter('ALL')}
                    className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      actionCategoryFilter === 'ALL'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {isFa ? `همه (${availableControlledActions.length})` : `All (${availableControlledActions.length})`}
                  </button>
                  {actionCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActionCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        actionCategoryFilter === cat
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Actions List */}
              <div className="space-y-3">
                {filteredControlledActions.map((act) => {
                  const riskColor =
                    act.riskLevel === 'Critical'
                      ? 'bg-red-500/20 text-red-300 border-red-500/30'
                      : act.riskLevel === 'High'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/30';

                  return (
                    <div
                      key={act.actionId}
                      className="p-3.5 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10px] font-bold text-cyan-400">
                              {act.actionId}
                            </span>
                            {act.actionCode && (
                              <span className="text-[10px] font-mono px-1 rounded bg-[#13273e] text-cyan-200 border border-cyan-500/20 font-bold">
                                {act.actionCode}
                              </span>
                            )}
                            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold ${riskColor}`}>
                              {act.riskLevel}
                            </span>
                            {act.category && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                                {act.category}
                              </span>
                            )}
                          </div>
                          <h4 className="text-xs font-bold text-white">
                            {isFa ? act.nameFa : act.name}
                          </h4>
                        </div>

                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono shrink-0">
                          {act.targetEntityType}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#91a6bc] leading-relaxed">
                        {isFa ? act.purposeFa : act.purpose}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-[#1a2b3e]">
                        <button
                          type="button"
                          onClick={() => setSelectedAction(act)}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                        >
                          <Shield className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{isFa ? 'مشاهده چک‌لیست و پیش‌نیازها' : 'Preflight Checklist & Gates'}</span>
                          <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                        </button>

                        <button
                          disabled
                          title={isFa ? act.disabledReasonFa : act.disabledReason}
                          className="px-2.5 py-1 rounded bg-[#142335] border border-[#21354c] text-slate-500 text-[11px] font-medium cursor-not-allowed flex items-center gap-1"
                        >
                          <Lock className="w-3 h-3" />
                          <span>{isFa ? 'غیرفعال (فاز ۱)' : 'Disabled (Phase 1)'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#1c2e43] bg-[#0c1827] flex items-center justify-between text-xs shrink-0">
          <div className="text-[10px] text-[#718aa6] font-mono">
            ID: <span className="text-slate-300">{entity.id}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#14293f] hover:bg-[#1d3a5a] text-cyan-200 text-xs font-semibold border border-[#2c4e72] transition-colors cursor-pointer"
          >
            {isFa ? 'بستن پنل' : 'Close Drawer'}
          </button>
        </div>
      </aside>

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
