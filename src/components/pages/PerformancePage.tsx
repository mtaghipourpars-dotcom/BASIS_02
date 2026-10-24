import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  WORK_PROCESS_RECORDS,
  PERFORMANCE_HOURLY_SERIES,
  INSTANCE_RESOURCE_RANKING,
} from '../../data/fixtures';
import {
  Activity,
  Cpu,
  HardDrive,
  Clock,
  Gauge,
  Filter,
  Search,
  X,
  TrendingUp,
  AlertTriangle,
  Server,
  ChevronRight,
} from 'lucide-react';
import { CapabilityTrackStatus } from '../common/CapabilityTrackStatus';
import { WarningRulePanel } from '../common/WarningRulePanel';
import { ControlledActionPanel } from '../common/ControlledActionPanel';
import { WARNING_RULES, CONTROLLED_ACTIONS } from '../../data/mweRegistry';
import { EntityDetailDrawer, EntityDetailData } from '../common/EntityDetailDrawer';

export const PerformancePage: React.FC = () => {
  const { t, selectedSystem, setSelectedSystem } = useApp();
  const [selectedMetric, setSelectedMetric] = useState<'cpu' | 'memory' | 'responseTime' | 'wpLoad'>('cpu');
  const [timeBucket, setTimeBucket] = useState<'24h' | '12h' | '6h'>('24h');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedWP, setSelectedWP] = useState<(typeof WORK_PROCESS_RECORDS)[0] | null>(null);

  // Time series filtered by timeBucket
  const seriesData =
    timeBucket === '6h'
      ? PERFORMANCE_HOURLY_SERIES.slice(-3)
      : timeBucket === '12h'
      ? PERFORMANCE_HOURLY_SERIES.slice(-6)
      : PERFORMANCE_HOURLY_SERIES;

  // Filtered work processes
  const filteredWPs = WORK_PROCESS_RECORDS.filter((wp) => {
    const matchesType = typeFilter === 'ALL' || wp.type === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || wp.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const getMetricConfig = () => {
    switch (selectedMetric) {
      case 'responseTime':
        return {
          title: 'Dialog Response Time (ST03N)',
          unit: 'ms',
          target: '< 400 ms',
          color: '#38bdf8', // cyan
          fillColor: 'rgba(56, 189, 248, 0.15)',
          key: 'responseTime' as const,
          maxVal: 500,
        };
      case 'memory':
        return {
          title: 'Extended Memory Allocation (ST02)',
          unit: '%',
          target: '< 80%',
          color: '#818cf8', // indigo
          fillColor: 'rgba(129, 140, 248, 0.15)',
          key: 'memory' as const,
          maxVal: 100,
        };
      case 'wpLoad':
        return {
          title: 'Work Process Utilization (SM50)',
          unit: '%',
          target: '< 75%',
          color: '#34d399', // emerald
          fillColor: 'rgba(52, 211, 153, 0.15)',
          key: 'wpLoad' as const,
          maxVal: 100,
        };
      case 'cpu':
      default:
        return {
          title: 'Host CPU Utilization (ST06)',
          unit: '%',
          target: '< 70%',
          color: '#0070f2', // blue
          fillColor: 'rgba(0, 112, 242, 0.15)',
          key: 'cpu' as const,
          maxVal: 100,
        };
    }
  };

  const metricConfig = getMetricConfig();

  // SVG Chart points calculation
  const chartWidth = 720;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;

  const points = seriesData.map((d, idx) => {
    const x = paddingX + (idx / Math.max(1, seriesData.length - 1)) * usableWidth;
    const val = d[metricConfig.key];
    const y = paddingY + usableHeight - (val / metricConfig.maxVal) * usableHeight;
    return { x, y, val, time: d.time };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1]?.x || 0} ${
    paddingY + usableHeight
  } L ${points[0]?.x || 0} ${paddingY + usableHeight} Z`;

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto">
      {/* Page Title & Context */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            <span>{t('performanceOverviewTitle')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">
            Validated measures over time across instances: ST03N dialog profiles, ST06 CPU, ST02 memory buffers, and SM50 process states.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <CapabilityTrackStatus
            islandName={t('performanceOverviewTitle')}
            wStatus="Configured"
            activeFindingsCount={WARNING_RULES.filter((r) => r.islandId === 'performance').flatMap((r) => r.findings || []).length}
          />
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#718aa6]">Scoped System:</span>
            <span className="px-2.5 py-1 rounded-md bg-[#10233b] border border-[#1d3859] text-cyan-300 font-bold text-xs tech-id">
              {selectedSystem === 'ALL' ? 'PRD01 (Primary)' : selectedSystem}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Dialog Resp. Time (ST03N)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">410 ms</div>
          <div className="text-[10px] text-amber-400 mt-0.5">Threshold Target &lt; 400 ms (Observed 14:32)</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">CPU Utilization (ST06)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">54%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Normal (8 Cores Host Online)</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Extended Memory (ST02)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">68%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">42 GB allocated of 64 GB EM</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Work Process Load (SM50)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">38%</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">3 active of 8 configured processes</div>
        </div>
      </div>

      {/* Main 12-Column Grid: Metric Time-Series Chart (8/12) + Instance Comparison Ranking (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8/12: Large Metric Time-Series Chart */}
        <div className="lg:col-span-8 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b2b40]">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" />
                <span>{metricConfig.title}</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">
                Target: {metricConfig.target} · Observation window: {timeBucket}
              </div>
            </div>

            {/* Time Bucket Toggles */}
            <div className="flex items-center gap-1 bg-[#091524] p-1 rounded-lg border border-[#182a40]">
              {(['24h', '12h', '6h'] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setTimeBucket(b)}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    timeBucket === b ? 'bg-cyan-500 text-black font-bold' : 'text-[#7d96b2] hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'cpu', label: 'Host CPU %', val: '54%' },
              { id: 'memory', label: 'Memory %', val: '68%' },
              { id: 'responseTime', label: 'Response ms', val: '410 ms' },
              { id: 'wpLoad', label: 'WP Load %', val: '38%' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMetric(m.id as any)}
                className={`p-2.5 rounded-lg border text-start transition-all cursor-pointer ${
                  selectedMetric === m.id
                    ? 'bg-[#10233b] border-cyan-500 shadow-sm'
                    : 'bg-[#091524] border-[#182a40] hover:border-[#243e5e]'
                }`}
              >
                <div className="text-[10px] text-[#7d96b2] font-medium">{m.label}</div>
                <div className="text-sm font-bold text-white tech-id mt-0.5">{m.val}</div>
              </button>
            ))}
          </div>

          {/* SVG Line / Area Graph */}
          <div className="w-full overflow-hidden pt-2">
            <svg
              className="w-full h-56 stroke-none"
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              preserveAspectRatio="none"
            >
              {/* Background horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
                const y = paddingY + usableHeight * (1 - pct);
                return (
                  <g key={pct}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#142438"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={paddingX - 8}
                      y={y + 3}
                      fill="#506982"
                      fontSize="9"
                      textAnchor="end"
                      fontFamily="monospace"
                    >
                      {Math.round(metricConfig.maxVal * pct)}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill={metricConfig.fillColor} />

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke={metricConfig.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="3.5" fill="#0b1727" stroke={metricConfig.color} strokeWidth="2" />
                  <text
                    x={p.x}
                    y={chartHeight - 6}
                    fill="#70869c"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {p.time}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Right 4/12: Per-Instance Resource Ranking */}
        <div className="lg:col-span-4 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-[#1b2b40]">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>Per-Instance Resource Comparison</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">Ranked workload across cluster nodes</div>
            </div>

            <div className="space-y-3 pt-3">
              {INSTANCE_RESOURCE_RANKING.map((inst, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white tech-id">{inst.instance}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        inst.status === 'Attention'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {inst.status}
                    </span>
                  </div>

                  {/* CPU bar */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[10px] text-[#7d96b2]">
                      <span>CPU Load:</span>
                      <span className="font-mono text-white">{inst.cpu}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#14263a] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          inst.cpu > 80 ? 'bg-amber-400' : 'bg-cyan-400'
                        }`}
                        style={{ width: `${inst.cpu}%` }}
                      />
                    </div>
                  </div>

                  {/* Memory bar */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[10px] text-[#7d96b2]">
                      <span>Memory:</span>
                      <span className="font-mono text-white">{inst.memory}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#14263a] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-400"
                        style={{ width: `${inst.memory}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#091522] border border-[#15283e] text-[11px] text-[#718aa6]">
            Instance PRD-D02 (AAS) is currently carrying peak batch and dialog load from batch schedule /BUILD/REORG.
          </div>
        </div>
      </div>

      {/* M / W / E Capability Layer: Warning Rules & Controlled Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <WarningRulePanel
            rules={WARNING_RULES.filter((r) => r.islandId === 'performance')}
          />
        </div>
        <div className="lg:col-span-5">
          <ControlledActionPanel
            actions={CONTROLLED_ACTIONS.filter((a) => a.islandId === 'performance')}
            selectedEntityName={selectedWP ? `WP ${selectedWP.no} (${selectedWP.type})` : undefined}
          />
        </div>
      </div>

      {/* Bottom: Work Process Table (SM50 / SM66 Snapshot) */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#1b2b40]">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Work Process Table (SM50 / SM66 Operational Evidence)
            </h2>
            <div className="text-xs text-[#7d96b2]">
              Showing {filteredWPs.length} work processes across DIA, BTC, UPD, ENQ, and SPO types
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Types</option>
              <option value="DIA">DIA (Dialog)</option>
              <option value="BTC">BTC (Batch)</option>
              <option value="UPD">UPD (Update)</option>
              <option value="ENQ">ENQ (Enqueue)</option>
              <option value="SPO">SPO (Spool)</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="Running">Running</option>
              <option value="Waiting">Waiting</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#18273b] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">NO</th>
                <th className="py-2.5 px-3 text-start">TYPE</th>
                <th className="py-2.5 px-3 text-start">PID</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
                <th className="py-2.5 px-3 text-start">TIME (S)</th>
                <th className="py-2.5 px-3 text-start">PROGRAM</th>
                <th className="py-2.5 px-3 text-start">CLIENT</th>
                <th className="py-2.5 px-3 text-start">USER</th>
                <th className="py-2.5 px-3 text-start">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {filteredWPs.map((wp) => (
                <tr
                  key={wp.no}
                  onClick={() => setSelectedWP(wp)}
                  className="hover:bg-[#102237] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-semibold text-cyan-300 tech-id">{wp.no}</td>
                  <td className="py-2.5 px-3 font-bold text-white tech-id">{wp.type}</td>
                  <td className="py-2.5 px-3 text-[#91a6bc] tech-id">{wp.pid}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        wp.status === 'Running'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {wp.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{wp.time}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] font-mono">{wp.program || '—'}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{wp.client || '—'}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] font-semibold">{wp.user || '—'}</td>
                  <td className="py-2.5 px-3 text-[#91a6bc]">{wp.action || 'Idle'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Work Process Detail Drawer via Unified EntityDetailDrawer */}
      <EntityDetailDrawer
        isOpen={!!selectedWP}
        entity={
          selectedWP
            ? {
                id: `WP-${selectedWP.no}-${selectedWP.pid}`,
                name: `Work Process No. ${selectedWP.no} (${selectedWP.type})`,
                islandId: 'performance',
                entityType: 'Work Process (SM50)',
                status: selectedWP.status,
                attributes: {
                  'Process Number': `#${selectedWP.no}`,
                  'Process Type': selectedWP.type,
                  'OS PID': selectedWP.pid,
                  'Current Status': selectedWP.status,
                  'Execution Time': `${selectedWP.time} seconds`,
                  'Active Program': selectedWP.program || 'None (Idle)',
                  'Client / User': selectedWP.client
                    ? `Client ${selectedWP.client} (${selectedWP.user})`
                    : 'System Daemon',
                  'Action Description': selectedWP.action || 'Idle wait',
                },
                sourceArtifact: 'SAP SM50 / ST03N Work Process Snapshot',
                sourceLocator: `D11_WP_${selectedWP.no}_PID_${selectedWP.pid}`,
                observedAt: '1405-02-14 10:14:00 (Jalali)',
                confidence: 'High',
                provenanceNotes:
                  'Observed process state snapshot. Process termination and ABAP debug attaches are strictly gated in Phase 1.',
                provenanceNotesFa:
                  'ثبت وضعیت پردازش کاری SM50. خاتمه فرآیند یا اجرای اشکال‌زدایی در فاز اول غیرفعال است.',
                relatedRecords: [
                  { islandId: 'jobs-processes', title: 'Background Jobs (SM37)', id: 'SM37_JOBS', count: 12 },
                  { islandId: 'landscape', title: 'Instance D11', id: 'D11_INST', count: 1 },
                  { islandId: 'alerts-events', title: 'System Logs (SM21)', id: 'SM21_LOGS', count: 2 },
                ],
              }
            : null
        }
        onClose={() => setSelectedWP(null)}
      />
    </div>
  );
};
