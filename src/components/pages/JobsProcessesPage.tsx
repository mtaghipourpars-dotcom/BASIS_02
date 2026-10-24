import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SM37_ROWS, SM37_EXTRACTED_METADATA, JOBS_BREAKDOWN } from '../../data/fixtures';
import { SM37JobRecord } from '../../types';
import {
  Clock,
  ArrowLeft,
  Search,
  Filter,
  X,
  ShieldAlert,
  FileText,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  BarChart3,
  PieChart,
} from 'lucide-react';
import { CapabilityTrackStatus } from '../common/CapabilityTrackStatus';
import { WarningRulePanel } from '../common/WarningRulePanel';
import { ControlledActionPanel } from '../common/ControlledActionPanel';
import { WARNING_RULES, CONTROLLED_ACTIONS } from '../../data/mweRegistry';

export const JobsProcessesPage: React.FC = () => {
  const { navigate, locale, selectedJobId, setSelectedJobId, t } = useApp();
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Sort failed/canceled jobs to the top as requested in spec
  const sortedRows = [...SM37_ROWS].sort((a, b) => {
    if (a.status === 'Canceled') return -1;
    if (b.status === 'Canceled') return 1;
    return 0;
  });

  const filteredRows = sortedRows.filter((r) => {
    const matchesStatus = !statusFilter || r.status === statusFilter;
    const query = searchInput.toLowerCase();
    const matchesSearch =
      !query ||
      r.name.toLowerCase().includes(query) ||
      r.creator.toLowerCase().includes(query) ||
      r.id.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const selectedJob = SM37_ROWS.find((r) => r.id === selectedJobId) || null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Finished':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {status}
          </span>
        );
      case 'Canceled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            {status}
          </span>
        );
      case 'Released':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-950 text-blue-300 border border-blue-800">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {status}
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950 text-amber-300 border border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {status}
          </span>
        );
    }
  };

  const clearFilters = () => {
    setSearchInput('');
    setStatusFilter('');
  };

  return (
    <section id="jobsPage" className="space-y-6 max-w-[1720px] mx-auto">
      {/* Title & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-cyan-400" />
            <span>{t('jobsTitle')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('jobsSub')}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <CapabilityTrackStatus
            islandName={t('jobsTitle')}
            wStatus="Configured"
            activeFindingsCount={WARNING_RULES.filter((r) => r.islandId === 'jobs-processes').flatMap((r) => r.findings || []).length}
          />
          <button
            type="button"
            id="backHome"
            onClick={() => navigate('home')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#13283d] hover:bg-[#1a3551] border border-[#33516d] text-xs font-semibold text-cyan-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{t('backHome')}</span>
          </button>
        </div>
      </div>

      {/* Context Metadata Strip */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2.5 py-1 rounded-md bg-[#0e1d2d] border border-[#263a50] text-[#a8bdd1] ltr-isolate">
          Source: SM37.md
        </span>
        <span className="px-2.5 py-1 rounded-md bg-[#0e1d2d] border border-[#263a50] text-[#a8bdd1]">
          {t('dateRange')}
        </span>
        <span className="px-2.5 py-1 rounded-md bg-[#0e1d2d] border border-[#263a50] text-[#a8bdd1]">
          {t('recordsMeta')}
        </span>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Total Report Scope</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">8,062</div>
          <div className="text-[10px] text-[#718aa6] mt-0.5">Metadata passed (not unique run count)</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Extracted Sample Rows</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1 tech-id">5 Rows</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Source-backed verified excerpt</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Observed Canceled / Aborted</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 tech-id">1 Job</div>
          <div className="text-[10px] text-rose-300 mt-0.5">QM_REPET_INSP (Client 800)</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Observed Finished / Released</div>
          <div className="text-2xl font-bold text-[#55d6a1] mt-1 tech-id">4 Jobs</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Finished: 3 · Released: 1</div>
        </div>
      </div>

      {/* Visual Analysis Row: Status Breakdown (6/12) + Execution Trend (6/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-6 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2b40]">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-cyan-400" />
              <span>Status Distribution Breakdown</span>
            </h2>
            <span className="text-[11px] text-[#7d96b2]">Extracted Excerpt Scope</span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Finished (Normal completion)</span>
                <span className="font-mono text-emerald-400 font-bold">3 (60%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#132338] overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Canceled (Aborted failure)</span>
                <span className="font-mono text-rose-400 font-bold">1 (20%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#132338] overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Released / Scheduled</span>
                <span className="font-mono text-blue-400 font-bold">1 (20%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#132338] overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2b40]">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>24h Background Job Execution Volume</span>
            </h2>
            <span className="text-[11px] text-[#7d96b2]">Hourly Bucket Trend</span>
          </div>

          <div className="grid grid-cols-6 gap-2 pt-2 items-end h-32">
            {JOBS_BREAKDOWN.hourlyTrend.map((t, idx) => (
              <div key={idx} className="flex flex-col items-center h-full justify-end gap-1">
                <div className="w-full flex flex-col justify-end items-center gap-0.5 h-24">
                  {t.failed > 0 && (
                    <div
                      className="w-full bg-rose-500 rounded-t"
                      style={{ height: `${t.failed * 8}px` }}
                      title={`Failed: ${t.failed}`}
                    />
                  )}
                  <div
                    className="w-full bg-emerald-500 rounded-b"
                    style={{ height: `${(t.success / 60) * 60}px` }}
                    title={`Success: ${t.success}`}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#718aa6]">{t.hour}:00</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* M / W / E Capability Layer: Warning Rules & Controlled Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <WarningRulePanel
            rules={WARNING_RULES.filter((r) => r.islandId === 'jobs-processes')}
          />
        </div>
        <div className="lg:col-span-5">
          <ControlledActionPanel
            actions={CONTROLLED_ACTIONS.filter((a) => a.islandId === 'jobs-processes')}
            selectedEntityName={selectedJob ? `${selectedJob.name} (${selectedJob.id})` : undefined}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 space-y-4">
        {/* Table Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#263a50]/60">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white">{t('jobTable')}</h2>
            <span id="resultCount" className="text-xs text-[#91a6bc]">
              {t('sampleRows', { n: filteredRows.length })}
            </span>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute inset-y-0 start-2.5 my-auto w-3.5 h-3.5 text-[#70869c] pointer-events-none" />
              <input
                id="searchInput"
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('searchJobs')}
                className="w-full bg-[#0c1a29] border border-[#263a50] rounded-lg py-1.5 ps-8 pe-3 text-xs text-white placeholder-[#70869c] focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Status filter"
              className="bg-[#0c1a29] border border-[#263a50] rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="">{t('allStatuses')}</option>
              <option value="Finished">Finished</option>
              <option value="Canceled">Canceled</option>
              <option value="Released">Released</option>
              <option value="Scheduled">Scheduled</option>
            </select>

            <button
              id="clearFilters"
              type="button"
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-lg bg-[#14293f] hover:bg-[#1c3856] border border-[#2f4f73] text-xs font-semibold text-cyan-300 transition-colors cursor-pointer"
            >
              {t('clearFilters')}
            </button>
          </div>
        </div>

        {/* Operational Table */}
        <div className="overflow-x-auto border border-[#263a50] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#0c1a29] border-b border-[#263a50] text-[#91a7bd]">
                <th className="py-2.5 px-3 text-start font-semibold">{t('thJob')}</th>
                <th className="py-2.5 px-3 text-start font-semibold">{t('thCreator')}</th>
                <th className="py-2.5 px-3 text-start font-semibold">{t('thStatus')}</th>
                <th className="py-2.5 px-3 text-start font-semibold">{t('thDate')}</th>
                <th className="py-2.5 px-3 text-start font-semibold">{t('thTime')}</th>
                <th className="py-2.5 px-3 text-start font-semibold">{t('thDuration')}</th>
                <th className="py-2.5 px-3 text-start font-semibold">{t('thDelay')}</th>
                <th className="py-2.5 px-3 text-start font-semibold">{t('thClient')}</th>
              </tr>
            </thead>
            <tbody id="jobsBody" className="divide-y divide-[#203349]">
              {filteredRows.map((row) => {
                const isSelected = selectedJobId === row.id;
                return (
                  <tr
                    key={row.id}
                    onClick={() => setSelectedJobId(row.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#163554] border-s-2 border-cyan-400'
                        : 'hover:bg-[#13283b]'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-semibold text-white">
                      <div className="text-cyan-300 hover:underline">{row.name}</div>
                      <div className="text-[10px] text-[#70869c] font-mono ltr-isolate">
                        {row.id}
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{row.creator}</td>
                    <td className="py-2.5 px-3">{getStatusBadge(row.status)}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{row.date}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{row.time}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{row.duration}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{row.delay}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{row.client}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredRows.length === 0 && (
            <div id="emptyState" className="p-8 text-center text-xs text-[#91a6bc]">
              {t('noResults')}
            </div>
          )}
        </div>

        <div className="text-[11px] text-[#70869c]">{t('tableFoot')}</div>
      </div>

      {/* Selected Job Evidence Drawer (Slide-Over) */}
      <aside
        id="detailDrawer"
        aria-label="Job detail drawer"
        className={`fixed top-0 end-0 z-50 h-full w-full sm:w-[440px] bg-[#0c1a29] border-s border-[#263a50] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out ${
          selectedJob ? 'translate-x-0 open' : 'translate-x-full rtl:-translate-x-full'
        }`}
      >
        {selectedJob && (
          <div className="space-y-5">
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#263a50]">
              <div>
                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  {t('detailEyebrow')}
                </div>
                <h2 id="detailJobName" className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {selectedJob.name}
                </h2>
                <div id="detailStatus" className="mt-1">
                  {getStatusBadge(selectedJob.status)}
                </div>
              </div>
              <button
                type="button"
                id="closeDrawer"
                onClick={() => setSelectedJobId(null)}
                aria-label="Close detail"
                className="p-1 rounded-lg text-[#70869c] hover:text-white hover:bg-[#16273b] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of source-backed fields */}
            <div id="detailGrid" className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-[#101f31] border border-[#203349]">
                <div className="text-[10px] text-[#70869c]">{t('creatorLabel')}</div>
                <div className="font-semibold text-white tech-id mt-0.5">{selectedJob.creator}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101f31] border border-[#203349]">
                <div className="text-[10px] text-[#70869c]">{t('statusLabel')}</div>
                <div className="font-semibold text-white tech-id mt-0.5">{selectedJob.status}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101f31] border border-[#203349]">
                <div className="text-[10px] text-[#70869c]">{t('dateLabel')}</div>
                <div className="font-semibold text-white tech-id mt-0.5">{selectedJob.date}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101f31] border border-[#203349]">
                <div className="text-[10px] text-[#70869c]">{t('timeLabel')}</div>
                <div className="font-semibold text-white tech-id mt-0.5">{selectedJob.time}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101f31] border border-[#203349]">
                <div className="text-[10px] text-[#70869c]">{t('durationLabel')}</div>
                <div className="font-semibold text-white tech-id mt-0.5">{selectedJob.duration}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101f31] border border-[#203349]">
                <div className="text-[10px] text-[#70869c]">{t('delayLabel')}</div>
                <div className="font-semibold text-white tech-id mt-0.5">{selectedJob.delay}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101f31] border border-[#203349]">
                <div className="text-[10px] text-[#70869c]">{t('clientLabel')}</div>
                <div className="font-semibold text-white tech-id mt-0.5">{selectedJob.client}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#101f31] border border-[#203349]">
                <div className="text-[10px] text-[#70869c]">{t('idLabel')}</div>
                <div className="font-semibold text-cyan-300 tech-id mt-0.5 font-mono">
                  {selectedJob.id}
                </div>
              </div>
            </div>

            {/* Provenance and limitations */}
            <div className="p-3.5 rounded-lg bg-[#101f31] border border-[#203349] space-y-2 text-xs">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('provenance')}</span>
              </div>
              <p id="detailSource" className="text-[#91a6bc] text-[11px] font-mono ltr-isolate">
                {t('sourceLabel')}: {selectedJob.source}
              </p>
              <p className="text-[#91a6bc] text-[11px]">{t('noNativeId')}</p>
              <p className="text-[#91a6bc] text-[11px]">{t('noRelated')}</p>
            </div>

            {/* Phase 1 Read-only notice */}
            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{t('readOnlyActionDisabled')}</span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#263a50]">
          <button
            type="button"
            onClick={() => setSelectedJobId(null)}
            className="w-full py-2 rounded-lg bg-[#14293f] hover:bg-[#1d3a5a] text-cyan-200 text-xs font-semibold border border-[#2c4e72] transition-colors"
          >
            Close Drawer
          </button>
        </div>
      </aside>
    </section>
  );
};
