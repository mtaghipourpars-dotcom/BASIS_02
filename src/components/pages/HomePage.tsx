import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Server,
  AlertTriangle,
  Clock,
  Gauge,
  CheckCircle2,
  Database,
  ShieldAlert,
  ArrowRight,
  HardDrive,
  Activity,
  Layers,
  Network,
} from 'lucide-react';
import { DEMO_SYSTEMS, DEMO_ALERTS, DEMO_DATABASE } from '../../data/fixtures';

export const HomePage: React.FC = () => {
  const { navigate, t } = useApp();

  return (
    <div id="homePage" className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('welcome')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('welcomeSub')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#14273b] border border-[#263a50] text-[#91a6bc]">
            {t('fixedHome')}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
            {t('demoBadge')}
          </span>
        </div>
      </div>

      {/* Hero / Status Band (Landscape At A Glance) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-3.5 card-dense flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#91a6bc] font-medium">{t('totalSystems')}</div>
            <div className="text-2xl font-bold text-white mt-1 tech-id">4</div>
            <div className="text-[10px] text-cyan-400 mt-0.5">PRD, QAS, DEV, SOL</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#153149] text-cyan-400 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-3.5 card-dense flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#91a6bc] font-medium">{t('criticalAlerts')}</div>
            <div className="text-2xl font-bold text-[#ff7f8b] mt-1 tech-id">1</div>
            <div className="text-[10px] text-[#ff7f8b] mt-0.5">ST22 TSV_PAGE</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#3a1a24] text-[#ff7f8b] flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-3.5 card-dense flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#91a6bc] font-medium">{t('openJobsCount')}</div>
            <div className="text-2xl font-bold text-[#55d6a1] mt-1 tech-id">5</div>
            <div className="text-[10px] text-[#91a6bc] mt-0.5">{t('sourceBacked')}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#14322a] text-[#55d6a1] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-3.5 card-dense flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#91a6bc] font-medium">{t('systemLoad')}</div>
            <div className="text-2xl font-bold text-white mt-1 tech-id">34%</div>
            <div className="text-[10px] text-[#55d6a1] mt-0.5">Normal (Peak 54%)</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#153149] text-blue-400 flex items-center justify-center">
            <Gauge className="w-5 h-5" />
          </div>
        </div>

        <div className="col-span-2 sm:col-span-4 lg:col-span-1 bg-[#101f31] border border-[#263a50] rounded-xl p-3.5 card-dense flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#55d6a1]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{t('statusHealthy')}</span>
          </div>
          <div className="text-[11px] text-[#91a6bc] mt-1 line-clamp-2">
            {t('stableSystems')}
          </div>
        </div>
      </div>

      {/* Featured Validation Journey: SM37 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#10283a] via-[#102033] to-[#172642] border border-[#263a50] rounded-2xl p-6 shadow-md">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
            {t('journey')}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t('heroTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-[#a7bfd2] leading-relaxed">
            {t('heroText')}
          </p>
          <div className="pt-2">
            <button
              type="button"
              id="openJobs"
              onClick={() => navigate('jobs-processes')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#123f53] hover:bg-[#1a556f] text-cyan-200 border border-[#25768b] text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <span>{t('openJobs')}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Core Monitoring & State Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Job Monitoring Card */}
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#263a50]/60">
            <h3 className="text-sm font-semibold text-white">{t('jobMonitoring')}</h3>
            <span className="p-1.5 rounded-lg bg-[#17384b] text-cyan-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="py-4">
            <div className="text-2xl font-bold text-white">—</div>
            <div className="text-xs text-[#91a6bc] mt-1">{t('countDisabled')}</div>
          </div>
          <button
            type="button"
            id="openJobs2"
            onClick={() => navigate('jobs-processes')}
            className="w-full py-2 px-3 rounded-lg bg-[#13283d] hover:bg-[#183654] border border-[#33516d] text-xs font-medium text-cyan-300 text-center transition-colors cursor-pointer"
          >
            {t('viewRecords')}
          </button>
        </div>

        {/* Data Quality Card */}
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#263a50]/60">
            <h3 className="text-sm font-semibold text-white">{t('dataQuality')}</h3>
            <span className="p-1.5 rounded-lg bg-[#2c2518] text-amber-400">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="py-4">
            <div className="text-lg font-bold text-[#f4c36a]">{t('partial')}</div>
            <div className="text-xs text-[#91a6bc] mt-1">{t('fieldLabels')}</div>
          </div>
          <div className="text-[11px] text-[#70869c] pt-2 border-t border-[#263a50]/40">
            Validation contract: <span className="ltr-isolate text-[#91a6bc]">specs/data-contracts.yaml</span>
          </div>
        </div>

        {/* Execution Controls Card */}
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#263a50]/60">
            <h3 className="text-sm font-semibold text-white">{t('execution')}</h3>
            <span className="p-1.5 rounded-lg bg-[#241c2c] text-purple-400">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>
          <div className="py-4">
            <div className="text-lg font-bold text-[#91a6bc]">{t('disabled')}</div>
            <div className="text-xs text-[#91a6bc] mt-1">{t('readOnly')}</div>
          </div>
          <div className="text-[11px] text-[#70869c] pt-2 border-t border-[#263a50]/40">
            {t('readOnlyActionDisabled')}
          </div>
        </div>
      </div>

      {/* Validation Path & Coverage Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Validation Path (8 cols) */}
        <div className="lg:col-span-8 bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#263a50]/60">
            <h3 className="text-sm font-semibold text-white">{t('validationPath')}</h3>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#13283d] text-cyan-300 border border-[#263a50]">
              Home → Detail
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 py-2">
            <span className="px-3 py-1.5 rounded-lg bg-[#0e1d2d] border border-[#263a50] text-xs text-[#a8bdd1]">
              01 · Home widget
            </span>
            <span className="text-cyan-400 font-bold rtl:rotate-180">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#0e1d2d] border border-[#263a50] text-xs text-[#a8bdd1]">
              02 · Filtered table
            </span>
            <span className="text-cyan-400 font-bold rtl:rotate-180">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#0e1d2d] border border-[#263a50] text-xs text-[#a8bdd1]">
              03 · Read-only detail drawer
            </span>
          </div>
          <p className="text-xs text-[#91a6bc] mt-3">
            {t('validationText')}
          </p>
        </div>

        {/* Evidence Coverage (4 cols) */}
        <div className="lg:col-span-4 bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#263a50]/60">
            <h3 className="text-sm font-semibold text-white">{t('coverage')}</h3>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#13283d] text-[#91a6bc] border border-[#263a50] ltr-isolate">
              SM37.md
            </span>
          </div>
          <p className="text-xs text-[#91a6bc] leading-relaxed">
            {t('coverageText')}
          </p>
        </div>
      </div>

      {/* Bottom Row: Systems Summary, Active Alerts, HANA DB quick overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Managed Systems */}
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#263a50]/60">
            <h3 className="text-sm font-semibold text-white">{t('topSystemsByHealth')}</h3>
            <button
              type="button"
              onClick={() => navigate('systems')}
              className="text-xs text-cyan-400 hover:underline"
            >
              {t('systems')} →
            </button>
          </div>
          <div className="space-y-2">
            {DEMO_SYSTEMS.map((sys) => (
              <div
                key={sys.sid}
                onClick={() => navigate('systems')}
                className="flex items-center justify-between p-2 rounded-lg bg-[#0c1a29] border border-[#203349] hover:border-cyan-500/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#153149] text-cyan-300 tech-id">
                    {sys.sid}
                  </span>
                  <span className="text-xs text-[#d9e6f3]">{sys.name}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    sys.status === 'Healthy'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {sys.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#263a50]/60">
            <h3 className="text-sm font-semibold text-white">{t('activeAlerts')}</h3>
            <button
              type="button"
              onClick={() => navigate('alerts-events')}
              className="text-xs text-cyan-400 hover:underline"
            >
              {t('alertsEvents')} →
            </button>
          </div>
          <div className="space-y-2">
            {DEMO_ALERTS.slice(0, 3).map((alt) => (
              <div
                key={alt.id}
                onClick={() => navigate('alerts-events')}
                className="p-2 rounded-lg bg-[#0c1a29] border border-[#203349] hover:border-cyan-500/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-[#ff7f8b] tech-id">{alt.source}</span>
                  <span className="text-[#70869c] text-[10px] ltr-isolate">{alt.timestamp}</span>
                </div>
                <div className="text-xs text-[#d9e6f3] truncate">{alt.message}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Database & Storage Status */}
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#263a50]/60">
            <h3 className="text-sm font-semibold text-white">{t('databaseStatus')}</h3>
            <button
              type="button"
              onClick={() => navigate('database')}
              className="text-xs text-cyan-400 hover:underline"
            >
              {t('database')} →
            </button>
          </div>
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#91a6bc]">SAP HANA Primary</span>
              <span className="font-semibold text-white tech-id">{DEMO_DATABASE.dbName} ({DEMO_DATABASE.sid})</span>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-[#91a6bc] mb-1">
                <span>HANA Memory ({DEMO_DATABASE.memoryUsedGb} / {DEMO_DATABASE.memoryTotalGb} GB)</span>
                <span className="text-cyan-400 font-semibold">79%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#14263a] overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '79%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-[#91a6bc] mb-1">
                <span>Data Volume ({DEMO_DATABASE.dataDiskUsedGb} / {DEMO_DATABASE.dataDiskTotalGb} GB)</span>
                <span className="text-emerald-400 font-semibold">69%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#14263a] overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '69%' }} />
              </div>
            </div>
            <div className="text-[11px] text-[#70869c] pt-1">
              Replication: <span className="text-[#55d6a1] font-medium">{DEMO_DATABASE.replicationStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
