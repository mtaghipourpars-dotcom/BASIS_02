import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LOGS_DUMPS_DATA,
  LOG_EVENT_RECORDS,
  PRIORITY_WARNINGS,
} from '../../data/fixtures';
import {
  FileText,
  AlertTriangle,
  Filter,
  Search,
  X,
  Clock,
  ShieldAlert,
  Info,
  CheckCircle2,
  BarChart3,
  ExternalLink,
} from 'lucide-react';
import { CapabilityTrackStatus } from '../common/CapabilityTrackStatus';
import { WarningRulePanel } from '../common/WarningRulePanel';
import { ControlledActionPanel } from '../common/ControlledActionPanel';
import { WARNING_RULES, CONTROLLED_ACTIONS } from '../../data/mweRegistry';
import { EntityDetailDrawer, EntityDetailData } from '../common/EntityDetailDrawer';

export const AlertsEventsPage: React.FC = () => {
  const { t, selectedSeverity, setSelectedSeverity, navigate } = useApp();
  const [sourceTab, setSourceTab] = useState<'ALL' | 'SM21' | 'ST22' | 'SM13'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<(typeof LOG_EVENT_RECORDS)[0] | null>(null);

  const filteredEvents = LOG_EVENT_RECORDS.filter((ev) => {
    const matchesSource = sourceTab === 'ALL' || ev.source === sourceTab;
    const matchesSeverity = !selectedSeverity || ev.severity === selectedSeverity;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      ev.message.toLowerCase().includes(q) ||
      ev.code.toLowerCase().includes(q) ||
      ev.program.toLowerCase().includes(q) ||
      ev.user.toLowerCase().includes(q);
    return matchesSource && matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-400" />
            <span>{t('logsDumpsTitle')} &amp; Events</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">
            Correlated event logs from SM21 (System Log), ST22 (ABAP Runtime Dumps), and SM13 (Update Task Errors).
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <CapabilityTrackStatus
            islandName={`${t('logsDumpsTitle')} & Events`}
            wStatus="Configured"
            activeFindingsCount={WARNING_RULES.filter((r) => r.islandId === 'alerts-events').flatMap((r) => r.findings || []).length}
          />
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">System Log Errors (SM21)</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tech-id">
            {LOGS_DUMPS_DATA.systemLogErrors} Errors
          </div>
          <div className="text-[10px] text-[#718aa6] mt-0.5">Last 24h · 1 connection reset error</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">ABAP Dumps (ST22)</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 tech-id">
            {LOGS_DUMPS_DATA.abapDumps} Critical
          </div>
          <div className="text-[10px] text-rose-300 mt-0.5">TSV_TNEW_PAGE_ALLOC_FAILED</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Update Errors (SM13)</div>
          <div className="text-2xl font-bold text-[#55d6a1] mt-1 tech-id">0 Errors</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">All V1/V2 records posted clean</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Security Audit Log (SM20)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">
            {LOGS_DUMPS_DATA.securityAuditLog} Events
          </div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Filtered by severity: High</div>
        </div>
      </div>

      {/* Main Top: Prominent Time-Ordered Hourly Volume Timeline Chart */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b2b40]">
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Event Volume Timeline (Last 24h Hourly Distribution)</span>
            </h2>
            <div className="text-[11px] text-[#7d96b2]">
              Time-ordered event density with explicit error, warning, and info buckets
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-rose-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Errors / Dumps
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Warnings
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500" /> Operational Info
            </span>
          </div>
        </div>

        {/* Timeline Bar Chart */}
        <div className="grid grid-cols-6 gap-3 pt-2 items-end h-44">
          {LOGS_DUMPS_DATA.timeline.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center h-full justify-end gap-1.5">
              <div className="w-full max-w-[48px] flex flex-col justify-end items-center gap-0.5 h-32">
                <div
                  className="w-full bg-rose-500 rounded-t"
                  style={{ height: `${item.error * 5}px` }}
                  title={`Errors: ${item.error}`}
                />
                <div
                  className="w-full bg-amber-500"
                  style={{ height: `${item.warning * 2}px` }}
                  title={`Warnings: ${item.warning}`}
                />
                <div
                  className="w-full bg-cyan-600 rounded-b"
                  style={{ height: `${item.info * 0.8}px` }}
                  title={`Info: ${item.info}`}
                />
              </div>
              <span className="text-xs font-mono text-[#7d96b2]">{item.time}:00</span>
            </div>
          ))}
        </div>
      </div>

      {/* M / W / E Capability Layer: Warning Rules & Controlled Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <WarningRulePanel
            rules={WARNING_RULES.filter((r) => r.islandId === 'alerts-events')}
          />
        </div>
        <div className="lg:col-span-5">
          <ControlledActionPanel
            actions={CONTROLLED_ACTIONS.filter((a) => a.islandId === 'alerts-events')}
            selectedEntityName={selectedEvent ? `Event: ${selectedEvent.code} (${selectedEvent.source})` : undefined}
          />
        </div>
      </div>

      {/* Lower Section: Searchable Event Table with Source Filter Tabs */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b2b40]">
          {/* Source Tabs */}
          <div className="flex items-center gap-1 bg-[#091524] p-1 rounded-lg border border-[#182a40]">
            {(['ALL', 'SM21', 'ST22', 'SM13'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSourceTab(tab)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  sourceTab === tab
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-[#7d96b2] hover:text-white'
                }`}
              >
                {tab === 'ALL' ? 'All Sources' : tab}
              </button>
            ))}
          </div>

          {/* Severity & Search Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute inset-y-0 start-2.5 my-auto w-3.5 h-3.5 text-[#5e7794] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search error message, code or user..."
                className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 ps-8 pe-3 text-xs text-white placeholder-[#5e7794] focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="Error">Error</option>
              <option value="Warning">Warning</option>
              <option value="Info">Info</option>
            </select>
          </div>
        </div>

        {/* Event Records Table */}
        <div className="overflow-x-auto border border-[#18273b] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">EVENT ID</th>
                <th className="py-2.5 px-3 text-start">SOURCE</th>
                <th className="py-2.5 px-3 text-start">SEVERITY</th>
                <th className="py-2.5 px-3 text-start">ERROR CODE</th>
                <th className="py-2.5 px-3 text-start">MESSAGE TEXT</th>
                <th className="py-2.5 px-3 text-start">PROGRAM</th>
                <th className="py-2.5 px-3 text-start">USER</th>
                <th className="py-2.5 px-3 text-start">TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {filteredEvents.map((ev) => (
                <tr
                  key={ev.id}
                  onClick={() => setSelectedEvent(ev)}
                  className="hover:bg-[#102237] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-bold text-cyan-300 tech-id">{ev.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-white">{ev.source}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        ev.severity === 'Critical'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : ev.severity === 'Error'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80'
                          : ev.severity === 'Warning'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {ev.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-white text-[11px]">{ev.code}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] max-w-xs truncate">{ev.message}</td>
                  <td className="py-2.5 px-3 font-mono text-[#91a6bc]">{ev.program}</td>
                  <td className="py-2.5 px-3 font-semibold text-white tech-id">{ev.user}</td>
                  <td className="py-2.5 px-3 text-[#7d96b2] tech-id">{ev.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Event Details via Unified EntityDetailDrawer */}
      <EntityDetailDrawer
        isOpen={!!selectedEvent}
        entity={
          selectedEvent
            ? {
                id: selectedEvent.id,
                name: `${selectedEvent.code} (${selectedEvent.source})`,
                islandId: 'alerts-events',
                entityType: `System Log / Dump Event (${selectedEvent.source})`,
                status: selectedEvent.severity,
                attributes: {
                  'Event ID': selectedEvent.id,
                  'Subsystem': `${selectedEvent.source} (${selectedEvent.type})`,
                  'Severity': selectedEvent.severity,
                  'Event Code': selectedEvent.code,
                  'Program / Transaction': selectedEvent.program,
                  'User / Client': `${selectedEvent.user} (Client ${selectedEvent.client})`,
                  'Observation Timestamp': selectedEvent.time,
                  'Message Summary': selectedEvent.message,
                },
                sourceArtifact: `SAP ${selectedEvent.source} Operational Log Buffer`,
                sourceLocator: `EVT_${selectedEvent.id}_${selectedEvent.code}`,
                observedAt: '1405-02-14 10:14:00 (Jalali)',
                confidence: 'High',
                provenanceNotes:
                  'Observed log or dump event. Log deletion, dump cleanup, and alert suppression require Phase 2 validation.',
                provenanceNotesFa:
                  'ثبت رویداد لاگ یا دامپ. پاک‌سازی گزارش‌ها یا بی‌صدا کردن هشدارها نیازمند اعتبارسنجی فاز دوم است.',
                relatedRecords: [
                  { islandId: 'performance', title: 'Work Processes (SM50)', id: 'SM50_EVT', count: 1 },
                  { islandId: 'jobs-processes', title: 'Background Jobs (SM37)', id: 'SM37_EVT', count: 2 },
                ],
              }
            : null
        }
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};
