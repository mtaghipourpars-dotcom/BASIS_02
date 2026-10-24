import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Server,
  Activity,
  AlertTriangle,
  Clock,
  Database,
  Shield,
  FileText,
  Share2,
  Package,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  User,
  Key,
  ShieldAlert,
  FileCheck,
  ChevronRight,
  Radio,
} from 'lucide-react';
import {
  DEMO_HEADER_INFO,
  LANDSCAPE_SYSTEMS,
  TOP_KPIS,
  PERFORMANCE_METRICS,
  PRIORITY_WARNINGS,
  JOBS_BREAKDOWN,
  DATABASE_DATA,
  SECURITY_DATA,
  LOGS_DUMPS_DATA,
  CONNECTIVITY_DATA,
  TRANSPORTS_DATA,
  BACKUP_DATA,
} from '../../data/fixtures';

export const HomePage: React.FC = () => {
  const { navigate, t } = useApp();

  return (
    <div id="homePage" className="space-y-4 max-w-[1720px] mx-auto">
      {/* Top KPI Row (4 Cards) matching reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Total Systems */}
        <div
          onClick={() => navigate('landscape')}
          className="bg-[#0b1727] hover:bg-[#0e1d32] border border-[#1b2b40] rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-sm group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#0070f2]/20 border border-[#0070f2]/40 text-[#3894ff] flex items-center justify-center">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-[#7d96b2] font-medium">{t('totalSystems')}</div>
              <div className="text-2xl font-bold text-white tracking-tight tech-id">
                {TOP_KPIS.totalSystems}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>{t('runningStopped')}</span>
              </div>
            </div>
          </div>
          {/* Sparkline curve */}
          <div className="w-16 h-8 flex items-center justify-end text-cyan-400">
            <svg className="w-14 h-6 stroke-cyan-400 fill-none" viewBox="0 0 60 25">
              <path
                d="M 2 20 Q 15 5, 30 18 T 58 8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Healthy */}
        <div
          onClick={() => navigate('landscape')}
          className="bg-[#0b1727] hover:bg-[#0e1d32] border border-[#1b2b40] rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-[#7d96b2] font-medium">{t('healthy')}</div>
              <div className="text-2xl font-bold text-white tracking-tight tech-id">
                {TOP_KPIS.healthyCount}
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold tech-id">
                {TOP_KPIS.healthyPercent}%
              </div>
            </div>
          </div>
          {/* Ring Indicator */}
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#13253b]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400"
                strokeDasharray="75, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>

        {/* Card 3: Warnings */}
        <div
          onClick={() => navigate('alerts-events')}
          className="bg-[#0b1727] hover:bg-[#0e1d32] border border-[#1b2b40] rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-[#7d96b2] font-medium">{t('warnings')}</div>
              <div className="text-2xl font-bold text-white tracking-tight tech-id">
                {TOP_KPIS.warningsCount}
              </div>
              <div className="text-[10px] text-amber-400 font-semibold tech-id">
                {TOP_KPIS.warningsPercent}%
              </div>
            </div>
          </div>
          {/* Ring Indicator */}
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#13253b]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-400"
                strokeDasharray="12, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>

        {/* Card 4: Critical */}
        <div
          onClick={() => navigate('alerts-events')}
          className="bg-[#0b1727] hover:bg-[#0e1d32] border border-[#1b2b40] rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-sm"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-400 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-[#7d96b2] font-medium">{t('critical')}</div>
              <div className="text-2xl font-bold text-white tracking-tight tech-id">
                {TOP_KPIS.criticalCount}
              </div>
              <div className="text-[10px] text-rose-400 font-semibold tech-id">
                {TOP_KPIS.criticalPercent}%
              </div>
            </div>
          </div>
          {/* Ring Indicator */}
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#13253b]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-rose-500"
                strokeDasharray="12, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Row (3 Panels) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left: System Landscape & Availability (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[#18273b]">
              <div>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                    {t('systemLandscapeTitle')}
                  </h2>
                </div>
                <div className="text-[10px] text-[#718aa6] mt-0.5">
                  {t('systemLandscapeSubtitle')}
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('landscape')}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t('viewDetails')}
              </button>
            </div>

            {/* Systems Table matching reference */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start border-collapse">
                <thead>
                  <tr className="text-[10px] text-[#5e7794] border-b border-[#18273b]">
                    <th className="py-1.5 px-2 text-start font-semibold">{t('systemCol')}</th>
                    <th className="py-1.5 px-2 text-start font-semibold">{t('statusCol')}</th>
                    <th className="py-1.5 px-2 text-start font-semibold">{t('availabilityCol')}</th>
                    <th className="py-1.5 px-2 text-start font-semibold">{t('lastUpdateCol')}</th>
                    <th className="py-1.5 px-2 text-end font-semibold">{t('latencyCol')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#132235]">
                  {LANDSCAPE_SYSTEMS.map((sys) => (
                    <tr
                      key={sys.id}
                      onClick={() => navigate('landscape', { system: sys.id })}
                      className="hover:bg-[#102237] cursor-pointer transition-colors group"
                    >
                      <td className="py-1.5 px-2 font-bold text-white tech-id">{sys.id}</td>
                      <td className="py-1.5 px-2">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              sys.status === 'Running'
                                ? 'bg-emerald-400'
                                : sys.status === 'Warning'
                                ? 'bg-amber-400'
                                : 'bg-rose-500'
                            }`}
                          />
                          <span
                            className={
                              sys.status === 'Running'
                                ? 'text-emerald-400'
                                : sys.status === 'Warning'
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }
                          >
                            {sys.status}
                          </span>
                        </span>
                      </td>
                      <td className="py-1.5 px-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#9bb3cc] w-7 tech-id">
                            {sys.availabilityPercent}%
                          </span>
                          <div className="w-14 h-1.5 rounded-full bg-[#15273d] overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                sys.availabilityPercent >= 95
                                  ? 'bg-emerald-400'
                                  : sys.availabilityPercent >= 80
                                  ? 'bg-amber-400'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${sys.availabilityPercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-1.5 px-2 text-[11px] text-[#7892ad] tech-id">
                        {sys.lastUpdate}
                      </td>
                      <td className="py-1.5 px-2 text-end text-[11px] text-[#7892ad] tech-id group-hover:text-cyan-300">
                        {sys.latencyMs}ms &gt;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Center: Performance Overview (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#18273b]">
              <div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                    {t('performanceOverviewTitle')}
                  </h2>
                </div>
                <div className="text-[10px] text-[#718aa6] mt-0.5">
                  {t('performanceOverviewSubtitle')}
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#13243a] text-[#7d97b3] border border-[#1f344f]">
                {t('last24Hours')}
              </span>
            </div>

            {/* 2x2 Performance Cards */}
            <div className="grid grid-cols-2 gap-3">
              {PERFORMANCE_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate('performance')}
                  className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1a2d45] hover:border-cyan-500/50 cursor-pointer transition-all"
                >
                  <div className="text-[10px] text-[#7d97b3] font-medium">{metric.name}</div>
                  <div className="text-xl font-bold text-white mt-0.5 tech-id">
                    {metric.value} {metric.unit}
                  </div>
                  <div
                    className={`text-[10px] font-semibold flex items-center gap-1 mt-0.5 ${
                      metric.isPositive ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    <span>
                      {metric.changePercent > 0 ? '↑ +' : '↑ '}
                      {metric.changePercent}%
                    </span>
                  </div>
                  {/* Mini Area Chart */}
                  <div className="w-full h-7 mt-2">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path
                        d="M0,25 Q20,10 40,18 T80,12 T100,20 L100,30 L0,30 Z"
                        fill={idx === 2 ? 'rgba(168,85,247,0.15)' : idx === 3 ? 'rgba(245,158,11,0.15)' : 'rgba(0,112,242,0.15)'}
                      />
                      <path
                        d="M0,25 Q20,10 40,18 T80,12 T100,20"
                        stroke={idx === 2 ? '#a855f7' : idx === 3 ? '#f59e0b' : '#38bdf8'}
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Priority Warnings (3 Cols) */}
        <div className="lg:col-span-3 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#18273b]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('priorityWarningsTitle')}
                </h2>
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  3
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('alerts-events')}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t('viewAll')}
              </button>
            </div>

            {/* Warnings List matching reference */}
            <div className="space-y-2.5">
              {PRIORITY_WARNINGS.map((warn) => (
                <div
                  key={warn.id}
                  onClick={() => navigate('alerts-events', { severity: warn.severity })}
                  className="p-2.5 rounded-lg bg-[#0e1d2f] border border-[#1a2d45] hover:border-cyan-500/50 cursor-pointer transition-all space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          warn.severity === 'Critical'
                            ? 'bg-rose-500'
                            : warn.severity === 'Warning'
                            ? 'bg-amber-400'
                            : 'bg-blue-400'
                        }`}
                      />
                      <span className="text-xs font-bold text-white truncate max-w-[160px]">
                        {warn.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#718aa6] tech-id">{warn.time}</span>
                  </div>
                  <p className="text-[11px] text-[#8fa8c4] leading-tight line-clamp-1">
                    {warn.description}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1">
                      {warn.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-[#14263c] text-[#87a2be] border border-[#1f354f]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ChevronRight className="w-3 h-3 text-[#556e87] group-hover:text-cyan-300 rtl:rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Second Dashboard Row (3 Panels) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Left: Jobs & Background Processing */}
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#18273b]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('jobsProcessingTitle')}
                </h3>
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>
              <button
                type="button"
                id="openJobs"
                onClick={() => navigate('jobs-processes')}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t('viewAll')}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              {/* Donut Chart with Total Jobs */}
              <div className="flex items-center justify-center relative">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#13253b]"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-emerald-400"
                    strokeDasharray="88, 100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-400"
                    strokeDashoffset="-88"
                    strokeDasharray="5, 100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-[9px] text-[#718aa6]">{t('totalJobs')}</div>
                  <div className="text-base font-bold text-white tech-id">
                    {JOBS_BREAKDOWN.totalJobs}
                  </div>
                </div>
              </div>

              {/* Legend matching reference */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#a0b8d2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{t('successful')}</span>
                  </span>
                  <span className="font-mono text-white text-[11px] tech-id">215 88%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#a0b8d2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{t('delayed')}</span>
                  </span>
                  <span className="font-mono text-white text-[11px] tech-id">12 5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#a0b8d2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{t('failed')}</span>
                  </span>
                  <span className="font-mono text-white text-[11px] tech-id">8 9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#a0b8d2]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{t('cancelled')}</span>
                  </span>
                  <span className="font-mono text-white text-[11px] tech-id">10 9%</span>
                </div>
              </div>
            </div>

            {/* Stacked Bars Status Trend */}
            <div className="mt-3 pt-2 border-t border-[#18273b]">
              <div className="text-[10px] text-[#718aa6] mb-1.5">{t('jobStatusTrend')}</div>
              <div className="flex items-end justify-between h-14 px-1 gap-1">
                {JOBS_BREAKDOWN.hourlyTrend.map((t, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col-reverse rounded-t overflow-hidden bg-[#15273d] h-10">
                      <div
                        className="w-full bg-emerald-400"
                        style={{ height: `${(t.success / 60) * 100}%` }}
                      />
                      <div
                        className="w-full bg-amber-400"
                        style={{ height: `${(t.delayed / 60) * 100}%` }}
                      />
                      <div
                        className="w-full bg-rose-500"
                        style={{ height: `${(t.failed / 60) * 100}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-[#556e87] font-mono">{t.hour}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Database & Storage */}
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#18273b]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('databaseStorageTitle')}
                </h3>
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center">
                  1
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('database')}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t('viewDetails')}
              </button>
            </div>

            {/* Gauges (DB Health & Free Space) */}
            <div className="grid grid-cols-2 gap-2 text-center pb-3">
              <div className="p-2 rounded-lg bg-[#0e1d2f] border border-[#192c42] flex flex-col items-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#13253b]"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-400"
                      strokeDasharray="98, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-bold text-white tech-id">98%</span>
                </div>
                <span className="text-[10px] text-[#8ea4be] font-semibold mt-1">
                  {t('dbHealth')}
                </span>
                <span className="text-[9px] text-emerald-400">Good</span>
              </div>

              <div className="p-2 rounded-lg bg-[#0e1d2f] border border-[#192c42] flex flex-col items-center">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#13253b]"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-amber-400"
                      strokeDasharray="18, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-bold text-white tech-id">18%</span>
                </div>
                <span className="text-[10px] text-[#8ea4be] font-semibold mt-1">
                  {t('freeSpace')}
                </span>
                <span className="text-[9px] text-amber-400">Low</span>
              </div>
            </div>

            {/* Top DB Consumers Table */}
            <div className="pt-2 border-t border-[#18273b]">
              <div className="text-[10px] text-[#718aa6] mb-1 font-semibold">
                {t('topDbConsumers')}
              </div>
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="text-[9px] text-[#556e87] border-b border-[#18273b]">
                    <th className="py-1 text-start">{t('userProgramCol')}</th>
                    <th className="py-1 text-center">{t('cpuCol')}</th>
                    <th className="py-1 text-center">{t('memoryCol')}</th>
                    <th className="py-1 text-end">{t('timeCol')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#132235]">
                  {DATABASE_DATA.topConsumers.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#102237]">
                      <td className="py-1 text-white font-medium tech-id">{item.userOrProgram}</td>
                      <td className="py-1 text-center text-[#9bb3cc] tech-id">{item.cpuPercent}%</td>
                      <td className="py-1 text-center text-[#9bb3cc] tech-id">
                        {item.memoryGb} GB
                      </td>
                      <td className="py-1 text-end text-[#718aa6] tech-id">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Security & Authorization */}
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#18273b]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('securityAuthTitle')}
                </h3>
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('security')}
                className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {t('viewAll')}
              </button>
            </div>

            {/* List Metrics matching reference */}
            <div className="space-y-1.5 text-xs">
              <div
                onClick={() => navigate('security')}
                className="flex items-center justify-between p-1.5 rounded bg-[#0e1d2f] hover:bg-[#13253b] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-[#b0c4db]">
                  <User className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t('blockedUsers')}</span>
                </div>
                <span className="font-bold text-white tech-id">
                  {SECURITY_DATA.blockedUsers} &gt;
                </span>
              </div>

              <div
                onClick={() => navigate('security')}
                className="flex items-center justify-between p-1.5 rounded bg-[#0e1d2f] hover:bg-[#13253b] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-[#b0c4db]">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('failedLogonAttempts')}</span>
                </div>
                <span className="font-bold text-white tech-id">
                  {SECURITY_DATA.failedLogonAttempts} &gt;
                </span>
              </div>

              <div
                onClick={() => navigate('security')}
                className="flex items-center justify-between p-1.5 rounded bg-[#0e1d2f] hover:bg-[#13253b] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-[#b0c4db]">
                  <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t('sensitiveAccessChanges')}</span>
                </div>
                <span className="font-bold text-white tech-id">
                  {SECURITY_DATA.sensitiveAccessChanges} &gt;
                </span>
              </div>

              <div
                onClick={() => navigate('security')}
                className="flex items-center justify-between p-1.5 rounded bg-[#0e1d2f] hover:bg-[#13253b] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2 text-[#b0c4db]">
                  <FileCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t('certificateExpiry')}</span>
                </div>
                <span className="font-bold text-white tech-id">
                  {SECURITY_DATA.certificateExpiry7Days} &gt;
                </span>
              </div>
            </div>

            {/* Top Risk Categories */}
            <div className="mt-3 pt-2 border-t border-[#18273b] space-y-1.5">
              <div className="text-[10px] text-[#718aa6] mb-1 font-semibold">
                {t('topRiskCategories')}
              </div>
              {SECURITY_DATA.topRiskCategories.map((cat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between text-[10px] text-[#8ea4be]">
                    <span>{cat.category}</span>
                    <span className="font-mono text-white tech-id">{cat.percentage}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-[#15273d] overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Dashboard Row (4 Panels) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Panel 1: Logs & Dumps */}
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#18273b]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('logsDumpsTitle')}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => navigate('alerts-events')}
                className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300"
              >
                {t('viewAll')}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-[#0e1d2f] border border-[#192c42]">
                <div className="text-[10px] text-[#8ea4be] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>{t('systemLogErrors')}</span>
                </div>
                <div className="text-lg font-bold text-white mt-1 tech-id">
                  {LOGS_DUMPS_DATA.systemLogErrors}
                </div>
              </div>

              <div className="p-2 rounded bg-[#0e1d2f] border border-[#192c42]">
                <div className="text-[10px] text-[#8ea4be] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{t('securityAuditLog')}</span>
                </div>
                <div className="text-lg font-bold text-white mt-1 tech-id">
                  {LOGS_DUMPS_DATA.securityAuditLog}
                </div>
              </div>

              <div className="p-2 rounded bg-[#0e1d2f] border border-[#192c42]">
                <div className="text-[10px] text-[#8ea4be] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>{t('abapDumps')}</span>
                </div>
                <div className="text-lg font-bold text-white mt-1 tech-id">
                  {LOGS_DUMPS_DATA.abapDumps}
                </div>
              </div>

              <div className="p-2 rounded bg-[#0e1d2f] border border-[#192c42]">
                <div className="text-[10px] text-[#8ea4be] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>{t('applicationLog')}</span>
                </div>
                <div className="text-lg font-bold text-white mt-1 tech-id">
                  {LOGS_DUMPS_DATA.applicationLog}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Interfaces & Connectivity */}
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#18273b]">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('interfacesConnTitle')}
                </h4>
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                  1
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('interfaces-connectivity')}
                className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300"
              >
                {t('viewAll')}
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              {CONNECTIVITY_DATA.map((conn, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate('interfaces-connectivity')}
                  className="flex items-center justify-between p-1.5 rounded bg-[#0e1d2f] hover:bg-[#13253b] cursor-pointer transition-colors"
                >
                  <span className="text-[#9bb3cc]">{conn.type}</span>
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="text-white tech-id">{conn.total}</span>
                    <span
                      className={`font-semibold ${
                        conn.errors > 0 ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {conn.errors > 0 ? `${conn.errors} Error >` : '0 Error >'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 3: Transports & Changes */}
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#18273b]">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('transportsChangesTitle')}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => navigate('transports')}
                className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300"
              >
                {t('viewAll')}
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div
                onClick={() => navigate('transports')}
                className="flex items-center justify-between p-1.5 rounded bg-[#0e1d2f] hover:bg-[#13253b] cursor-pointer transition-colors"
              >
                <span className="text-[#9bb3cc]">{t('pendingImports')}</span>
                <span className="font-bold text-amber-400 tech-id">
                  {TRANSPORTS_DATA.pendingImports} &gt;
                </span>
              </div>
              <div
                onClick={() => navigate('transports')}
                className="flex items-center justify-between p-1.5 rounded bg-[#0e1d2f] hover:bg-[#13253b] cursor-pointer transition-colors"
              >
                <span className="text-[#9bb3cc]">{t('lastImport')}</span>
                <span className="font-mono text-emerald-400 text-[11px] tech-id">
                  {TRANSPORTS_DATA.lastImportTime} &gt;
                </span>
              </div>
              <div
                onClick={() => navigate('transports')}
                className="flex items-center justify-between p-1.5 rounded bg-[#0e1d2f] hover:bg-[#13253b] cursor-pointer transition-colors"
              >
                <span className="text-[#9bb3cc]">{t('failedImports')}</span>
                <span className="font-bold text-rose-400 tech-id">
                  {TRANSPORTS_DATA.failedImports} &gt;
                </span>
              </div>
              <div
                onClick={() => navigate('transports')}
                className="flex items-center justify-between p-1.5 rounded bg-[#0e1d2f] hover:bg-[#13253b] cursor-pointer transition-colors"
              >
                <span className="text-[#9bb3cc]">{t('recentChanges')}</span>
                <span className="font-bold text-white tech-id">
                  {TRANSPORTS_DATA.recentChanges} &gt;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 4: Backup & Recovery */}
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#18273b]">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t('backupRecoveryTitle')}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => navigate('backup-recovery')}
                className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300"
              >
                {t('viewAll')}
              </button>
            </div>

            <div className="space-y-2 text-xs pt-1">
              <div>
                <span className="text-[10px] text-[#718aa6] block">{t('lastBackup')}</span>
                <span className="text-white font-mono text-[11px] flex items-center gap-1 mt-0.5 tech-id">
                  <span className="text-cyan-400 text-[10px]">◆</span>
                  <span>{BACKUP_DATA.lastBackupTime}</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#718aa6] block">{t('backupStatus')}</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                  <span className="text-emerald-400 text-[10px]">◆</span>
                  <span>{BACKUP_DATA.backupStatus}</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#718aa6] block">
                  {t('recoveryReadiness')}
                </span>
                <span className="text-cyan-300 font-semibold flex items-center gap-1 mt-0.5 tech-id">
                  <span className="text-cyan-400 text-[10px]">◆</span>
                  <span>{BACKUP_DATA.recoveryReadinessPercent}%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
