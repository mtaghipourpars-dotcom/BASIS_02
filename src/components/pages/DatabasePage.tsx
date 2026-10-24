import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_DATABASE } from '../../data/fixtures';
import { Database, HardDrive, Cpu, CheckCircle2, RefreshCw } from 'lucide-react';

export const DatabasePage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('databaseTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('databaseSub')}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
          {t('demoBadge')}
        </span>
      </div>

      {/* Database Overview Card */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#263a50]">
          <div>
            <div className="text-xs text-[#91a6bc]">Primary In-Memory Database</div>
            <div className="text-lg font-bold text-white flex items-center gap-2 tech-id">
              <span>{DEMO_DATABASE.dbName}</span>
              <span className="text-xs text-cyan-400">({DEMO_DATABASE.sid})</span>
              <span className="text-xs font-normal text-[#70869c]">· v{DEMO_DATABASE.version}</span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{DEMO_DATABASE.replicationStatus}</span>
          </span>
        </div>

        {/* Capacity Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* HANA Memory */}
          <div className="p-3.5 rounded-lg bg-[#0c1a29] border border-[#203349] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#91a6bc] font-medium">{t('hanaMemory')}</span>
              <span className="font-bold text-cyan-400 tech-id">79%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#14263a] overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: '79%' }} />
            </div>
            <div className="text-[11px] text-[#70869c] flex justify-between tech-id">
              <span>Used: {DEMO_DATABASE.memoryUsedGb} GB</span>
              <span>Total: {DEMO_DATABASE.memoryTotalGb} GB</span>
            </div>
          </div>

          {/* Data Volume */}
          <div className="p-3.5 rounded-lg bg-[#0c1a29] border border-[#203349] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#91a6bc] font-medium">{t('dataVolume')}</span>
              <span className="font-bold text-emerald-400 tech-id">69%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#14263a] overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '69%' }} />
            </div>
            <div className="text-[11px] text-[#70869c] flex justify-between tech-id">
              <span>Used: {DEMO_DATABASE.dataDiskUsedGb} GB</span>
              <span>Total: {DEMO_DATABASE.dataDiskTotalGb} GB</span>
            </div>
          </div>

          {/* Log Volume */}
          <div className="p-3.5 rounded-lg bg-[#0c1a29] border border-[#203349] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#91a6bc] font-medium">{t('logVolume')}</span>
              <span className="font-bold text-blue-400 tech-id">43%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#14263a] overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full" style={{ width: '43%' }} />
            </div>
            <div className="text-[11px] text-[#70869c] flex justify-between tech-id">
              <span>Used: {DEMO_DATABASE.logDiskUsedGb} GB</span>
              <span>Total: {DEMO_DATABASE.logDiskTotalGb} GB</span>
            </div>
          </div>
        </div>

        {/* Operational Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs border-t border-[#263a50]/60">
          <div>
            <span className="text-[#91a6bc] block text-[11px]">Savepoint Duration:</span>
            <span className="font-bold text-white tech-id">{DEMO_DATABASE.savepointDurationSec} sec</span>
          </div>
          <div>
            <span className="text-[#91a6bc] block text-[11px]">Active Lock Waits:</span>
            <span className="font-bold text-[#55d6a1] tech-id">{DEMO_DATABASE.activeLockWaits} (Zero)</span>
          </div>
          <div>
            <span className="text-[#91a6bc] block text-[11px]">Last Full Backup:</span>
            <span className="font-bold text-white tech-id">{DEMO_DATABASE.lastFullBackup}</span>
          </div>
          <div>
            <span className="text-[#91a6bc] block text-[11px]">System Replication Mode:</span>
            <span className="font-bold text-cyan-300 tech-id">SYNCMEM (Tier 2 HSR)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
