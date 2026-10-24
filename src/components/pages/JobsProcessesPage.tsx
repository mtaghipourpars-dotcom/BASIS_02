import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SM37_ROWS, SM37_EXTRACTED_METADATA } from '../../data/fixtures';
import { SM37JobRecord } from '../../types';
import { ArrowLeft, Search, Filter, X, ShieldAlert, FileText, Info } from 'lucide-react';

export const JobsProcessesPage: React.FC = () => {
  const { navigate, locale, selectedJobId, setSelectedJobId, t } = useApp();
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredRows = SM37_ROWS.filter((r) => {
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
            {locale === 'fa' ? t('statusFinished') : 'Finished'}
          </span>
        );
      case 'Canceled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950 text-rose-300 border border-rose-800">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            {locale === 'fa' ? t('statusCanceled') : 'Canceled'}
          </span>
        );
      case 'Released':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-950 text-blue-300 border border-blue-800">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {locale === 'fa' ? t('statusReleased') : 'Released'}
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950 text-amber-300 border border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {locale === 'fa' ? t('statusScheduled') : 'Scheduled'}
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
    <section id="jobsPage" className="space-y-6">
      {/* Title & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('jobsTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('jobsSub')}</p>
        </div>
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

      {/* Warning Notice Box */}
      <div className="p-3.5 rounded-xl bg-[#282317] border border-[#705b32] text-[#e9c982] text-xs leading-relaxed flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>{t('notice')}</div>
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
                placeholder={t('searchPlaceholder')}
                className="w-full bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-1.5 ps-8 pe-3 text-xs placeholder-[#70869c] focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              id="statusFilter"
              aria-label="Status filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="">{t('allStatuses')}</option>
              <option value="Finished">Finished</option>
              <option value="Canceled">Canceled</option>
              <option value="Released">Released</option>
              <option value="Scheduled">Scheduled</option>
            </select>

            <button
              type="button"
              id="clearFilters"
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-lg bg-[#13283d] hover:bg-[#1a3756] border border-[#33516d] text-xs text-[#91a6bc] hover:text-white transition-colors cursor-pointer"
            >
              {t('clearFilters')}
            </button>
          </div>
        </div>

        {/* Operational Records Table */}
        <div className="overflow-x-auto border border-[#263a50] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#0c1a29] border-b border-[#263a50] text-[#91a7bd]">
                <th className="py-2.5 px-3 font-semibold text-start">{t('thJob')}</th>
                <th className="py-2.5 px-3 font-semibold text-start">{t('thCreator')}</th>
                <th className="py-2.5 px-3 font-semibold text-start">{t('thStatus')}</th>
                <th className="py-2.5 px-3 font-semibold text-start">{t('thDate')}</th>
                <th className="py-2.5 px-3 font-semibold text-start">{t('thTime')}</th>
                <th className="py-2.5 px-3 font-semibold text-start">{t('thDuration')}</th>
                <th className="py-2.5 px-3 font-semibold text-start">{t('thDelay')}</th>
                <th className="py-2.5 px-3 font-semibold text-start">{t('thClient')}</th>
              </tr>
            </thead>
            <tbody id="jobsBody" className="divide-y divide-[#203349]">
              {filteredRows.map((r) => {
                const isSelected = r.id === selectedJobId;
                return (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedJobId(r.id)}
                    className={`cursor-pointer transition-colors hover:bg-[#13283b] ${
                      isSelected ? 'bg-[#12354a] border-s-4 border-cyan-400' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3">
                      <strong className="text-white font-semibold block tech-id">
                        {r.name}
                      </strong>
                      <div className="text-[10px] text-[#70869c] tech-id">{r.id}</div>
                    </td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{r.creator}</td>
                    <td className="py-2.5 px-3">{getStatusBadge(r.status)}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{r.date || '—'}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{r.time || '—'}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{r.duration}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{r.delay}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{r.client}</td>
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

        {/* Table Footer Guideline */}
        <div className="text-[11px] text-[#71879c] pt-1">
          {t('tableFoot')}
        </div>
      </div>

      {/* Side Drawer for Job Details */}
      <div
        id="detailDrawer"
        aria-label="Job detail drawer"
        className={`fixed inset-y-0 end-0 z-50 w-full sm:w-[440px] bg-[#0d1c2b] border-s border-[#35516a] shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          selectedJob ? 'open translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedJob && (
          <div className="space-y-6">
            {/* Drawer Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#263a50]">
              <div>
                <div className="text-[11px] font-semibold text-cyan-400 tracking-wider">
                  {t('detailEyebrow')}
                </div>
                <h2 id="detailJobName" className="text-lg font-bold text-white mt-1 tech-id">
                  {selectedJob.name}
                </h2>
                <div id="detailStatus" className="mt-2">
                  {getStatusBadge(selectedJob.status)}
                </div>
              </div>
              <button
                type="button"
                id="closeDrawer"
                onClick={() => setSelectedJobId(null)}
                aria-label="Close detail"
                className="p-1.5 rounded-lg bg-[#14263a] hover:bg-[#1a3754] text-[#91a6bc] hover:text-white border border-[#263a50] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Read-Only Notice regarding Actions */}
            <div className="p-3 rounded-lg bg-[#14202e] border border-[#263a50] flex items-center gap-2.5 text-xs text-[#91a6bc]">
              <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{t('readOnlyActionDisabled')}</span>
            </div>

            {/* Field Details Grid */}
            <div id="detailGrid" className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-lg bg-[#102235] border border-[#263a50]">
                <span className="block text-[10px] text-[#91a6bc] font-medium mb-1">
                  {t('creatorLabel')}
                </span>
                <span className="text-xs font-semibold text-white tech-id">
                  {selectedJob.creator || t('notProvided')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#102235] border border-[#263a50]">
                <span className="block text-[10px] text-[#91a6bc] font-medium mb-1">
                  {t('statusLabel')}
                </span>
                <span className="text-xs font-semibold text-white tech-id">
                  {selectedJob.status}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#102235] border border-[#263a50]">
                <span className="block text-[10px] text-[#91a6bc] font-medium mb-1">
                  {t('dateLabel')}
                </span>
                <span className="text-xs font-semibold text-white tech-id">
                  {selectedJob.date || t('notProvided')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#102235] border border-[#263a50]">
                <span className="block text-[10px] text-[#91a6bc] font-medium mb-1">
                  {t('timeLabel')}
                </span>
                <span className="text-xs font-semibold text-white tech-id">
                  {selectedJob.time || t('notProvided')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#102235] border border-[#263a50]">
                <span className="block text-[10px] text-[#91a6bc] font-medium mb-1">
                  {t('durationLabel')}
                </span>
                <span className="text-xs font-semibold text-white tech-id">
                  {selectedJob.duration || t('notProvided')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#102235] border border-[#263a50]">
                <span className="block text-[10px] text-[#91a6bc] font-medium mb-1">
                  {t('delayLabel')}
                </span>
                <span className="text-xs font-semibold text-white tech-id">
                  {selectedJob.delay || t('notProvided')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#102235] border border-[#263a50]">
                <span className="block text-[10px] text-[#91a6bc] font-medium mb-1">
                  {t('clientLabel')}
                </span>
                <span className="text-xs font-semibold text-white tech-id">
                  {selectedJob.client || t('notProvided')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#102235] border border-[#263a50]">
                <span className="block text-[10px] text-[#91a6bc] font-medium mb-1">
                  {t('idLabel')}
                </span>
                <span className="text-xs font-semibold text-cyan-300 tech-id">
                  {selectedJob.id}
                </span>
              </div>
            </div>

            {/* Provenance & Limitations Box */}
            <div className="p-4 rounded-xl bg-[#0b1623] border border-[#263a50] space-y-2 text-xs text-[#91a6bc]">
              <strong className="text-white block font-semibold">
                {t('provenance')}
              </strong>
              <p id="detailSource" className="tech-id text-[11px] text-[#a0b5cb]">
                {t('sourceLabel')}: {selectedJob.source}
              </p>
              <p className="text-[11px] leading-relaxed">
                {t('noNativeId')}
              </p>
              <p className="text-[11px] leading-relaxed">
                {t('noRelated')}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
