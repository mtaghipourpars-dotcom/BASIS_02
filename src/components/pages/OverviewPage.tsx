import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, AlertTriangle, ArrowRight, CheckCircle2, Clock, Server } from 'lucide-react';
import { DEMO_SYSTEMS, DEMO_ALERTS } from '../../data/fixtures';

export const OverviewPage: React.FC = () => {
  const { navigate, t } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('overviewTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('overviewSub')}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
          {t('demoBadge')}
        </span>
      </div>

      {/* Shift Status Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#112338] to-[#16293f] border border-[#263a50]">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
          <Activity className="w-4 h-4" />
          <span>{t('shiftStatus')}</span>
        </div>
        <p className="text-xs text-[#d9e6f3] leading-relaxed">
          {t('shiftStatusDesc')}
        </p>
      </div>

      {/* Operational Status Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc] font-medium">S/4HANA Core (PRD)</div>
          <div className="text-lg font-bold text-[#f4c36a] mt-1">ATTENTION</div>
          <div className="text-xs text-[#91a6bc] mt-1">1 Critical Dump · 410ms Dialog</div>
          <button
            type="button"
            onClick={() => navigate('alerts-events')}
            className="mt-3 text-xs text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View Alerts</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc] font-medium">SAP HANA DB 2.0</div>
          <div className="text-lg font-bold text-[#55d6a1] mt-1">HEALTHY</div>
          <div className="text-xs text-[#91a6bc] mt-1">Sync Replication · 79% Memory</div>
          <button
            type="button"
            onClick={() => navigate('database')}
            className="mt-3 text-xs text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View DB Status</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc] font-medium">Background Processing</div>
          <div className="text-lg font-bold text-[#f4c36a] mt-1">PARTIAL</div>
          <div className="text-xs text-[#91a6bc] mt-1">1 Aborted Job (QM_REPET_INSP)</div>
          <button
            type="button"
            onClick={() => navigate('jobs-processes')}
            className="mt-3 text-xs text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View SM37 Jobs</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc] font-medium">Backup & DR Readiness</div>
          <div className="text-lg font-bold text-[#55d6a1] mt-1">HEALTHY</div>
          <div className="text-xs text-[#91a6bc] mt-1">Full Backup Verified · Logs Active</div>
          <button
            type="button"
            onClick={() => navigate('backup-recovery')}
            className="mt-3 text-xs text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>View DB12 Logs</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* Authoritative Detail Links */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-white">{t('operationalIssues')}</h2>
        <div className="divide-y divide-[#203349]">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-1 rounded bg-rose-950 text-rose-300 border border-rose-800">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-semibold text-white">
                  ABAP Dump: TSV_TNEW_PAGE_ALLOC_FAILED
                </div>
                <div className="text-[11px] text-[#91a6bc]">
                  Reported on PRD during batch run QM_REPET_INSP (Client 800)
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('alerts-events')}
              className="px-2.5 py-1 rounded bg-[#13283d] hover:bg-[#183654] text-xs text-cyan-300 border border-[#33516d]"
            >
              Inspect Dump →
            </button>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="p-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
                <Clock className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs font-semibold text-white">
                  Job Canceled: QM_REPET_INSP (DEMO-SM37-L2583)
                </div>
                <div className="text-[11px] text-[#91a6bc]">
                  Extracted from SM37.md (1405/07/25 13:13:03)
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('jobs-processes')}
              className="px-2.5 py-1 rounded bg-[#13283d] hover:bg-[#183654] text-xs text-cyan-300 border border-[#33516d]"
            >
              View SM37 Record →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
