import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DATABASE_STATUS,
  DATABASE_STORAGE_TREND,
  DATABASE_VOLUMES,
  DATABASE_DATA,
} from '../../data/fixtures';
import {
  Database,
  HardDrive,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  X,
  TrendingUp,
  Activity,
  FileCheck,
} from 'lucide-react';
import { CapabilityTrackStatus } from '../common/CapabilityTrackStatus';
import { WarningRulePanel } from '../common/WarningRulePanel';
import { ControlledActionPanel } from '../common/ControlledActionPanel';
import { WARNING_RULES, CONTROLLED_ACTIONS } from '../../data/mweRegistry';
import { EntityDetailDrawer, EntityDetailData } from '../common/EntityDetailDrawer';

export const DatabasePage: React.FC = () => {
  const { t } = useApp();
  const [selectedVol, setSelectedVol] = useState<(typeof DATABASE_VOLUMES)[0] | null>(null);

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-cyan-400" />
            <span>{t('databaseTitle')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('databaseSub')}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <CapabilityTrackStatus
            islandName={t('databaseTitle')}
            wStatus="Configured"
            activeFindingsCount={WARNING_RULES.filter((r) => r.islandId === 'database').flatMap((r) => r.findings || []).length}
          />
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{DATABASE_STATUS.replicationStatus}</span>
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Database Identity &amp; Engine</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">{DATABASE_STATUS.sid}</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">{DATABASE_STATUS.dbName} (v{DATABASE_STATUS.version})</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Allocated Resident Memory</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">1,840 GB</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">79% of 2,328 GB Pool Limit</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Free Storage Space (Data)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">18% Free</div>
          <div className="text-[10px] text-amber-400 mt-0.5">960 GB remaining on /hana/data</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Buffer Cache Hit Ratio</div>
          <div className="text-2xl font-bold text-[#55d6a1] mt-1 tech-id">99.4%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Target &gt; 98% (ST04 Database Monitor)</div>
        </div>
      </div>

      {/* Main 12-Column Grid: Capacity Growth Trend (8/12) + DB Consumers & Evidence (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8/12: Storage Growth Trend */}
        <div className="lg:col-span-8 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b2b40]">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Capacity &amp; Storage Growth Trend (GB)</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">
                Monthly dated observations from database disk catalog
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500" /> Data Volume
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> Log Volume
              </span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> Backup Storage
              </span>
            </div>
          </div>

          {/* Monthly Growth Bar Chart */}
          <div className="grid grid-cols-6 gap-3 pt-3 items-end h-52">
            {DATABASE_STORAGE_TREND.map((item, idx) => {
              const maxVal = 2800;
              const dataH = (item.dataVolumeGb / maxVal) * 160;
              const logH = (item.logVolumeGb / maxVal) * 160;
              return (
                <div key={idx} className="flex flex-col items-center h-full justify-end gap-1.5">
                  <div className="text-[10px] font-mono text-cyan-300 font-bold">
                    {item.dataVolumeGb}
                  </div>
                  <div className="w-full max-w-[36px] flex items-end justify-center gap-1 h-40">
                    <div
                      className="w-1/2 bg-cyan-500 rounded-t transition-all"
                      style={{ height: `${dataH}px` }}
                      title={`Data: ${item.dataVolumeGb} GB`}
                    />
                    <div
                      className="w-1/2 bg-blue-500 rounded-t transition-all"
                      style={{ height: `${logH}px` }}
                      title={`Log: ${item.logVolumeGb} GB`}
                    />
                  </div>
                  <span className="text-xs font-semibold text-white">{item.month}</span>
                </div>
              );
            })}
          </div>

          {/* Storage Capacity Sub-Gauges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#18273b]">
            <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1">
              <div className="flex justify-between text-xs text-[#7d96b2]">
                <span>HANA In-Memory Pool</span>
                <span className="text-cyan-300 font-mono font-bold">79%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#132338]">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '79%' }} />
              </div>
              <div className="text-[10px] text-[#718aa6] font-mono">1,840 GB / 2,328 GB</div>
            </div>

            <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1">
              <div className="flex justify-between text-xs text-[#7d96b2]">
                <span>Persistent Data Disk</span>
                <span className="text-emerald-300 font-mono font-bold">69%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#132338]">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '69%' }} />
              </div>
              <div className="text-[10px] text-[#718aa6] font-mono">2,140 GB / 3,100 GB</div>
            </div>

            <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1">
              <div className="flex justify-between text-xs text-[#7d96b2]">
                <span>Redo Log Filesystem</span>
                <span className="text-blue-300 font-mono font-bold">43%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#132338]">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '43%' }} />
              </div>
              <div className="text-[10px] text-[#718aa6] font-mono">220 GB / 512 GB</div>
            </div>
          </div>
        </div>

        {/* Right 4/12: Top DB Consumers & Evidence Panel */}
        <div className="lg:col-span-4 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-[#1b2b40]">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Top Database Consumers</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">Resource usage by user / program thread</div>
            </div>

            <div className="space-y-2.5 pt-3">
              {DATABASE_DATA.topConsumers.map((c, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white tech-id">{c.userOrProgram}</span>
                    <span className="text-[10px] text-[#718aa6] font-mono">{c.time}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-[#8ca4be] mt-1">
                    <span>CPU: <strong className="text-cyan-300 font-mono">{c.cpuPercent}%</strong></span>
                    <span>Memory: <strong className="text-indigo-300 font-mono">{c.memoryGb} GB</strong></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Evidence details */}
            <div className="mt-4 pt-3 border-t border-[#1b2b40] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#8ca4be]">
                <span>Savepoint Duration:</span>
                <span className="font-mono text-white font-bold">{DATABASE_STATUS.savepointDurationSec} sec</span>
              </div>
              <div className="flex justify-between text-[#8ca4be]">
                <span>Active Lock Waits:</span>
                <span className="font-mono text-[#55d6a1] font-bold">{DATABASE_STATUS.activeLockWaits} (Zero)</span>
              </div>
              <div className="flex justify-between text-[#8ca4be]">
                <span>Last Full Data Backup:</span>
                <span className="font-mono text-white">{DATABASE_STATUS.lastFullBackup}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#091522] border border-[#15283e] text-[11px] text-[#718aa6]">
            HANA System Replication (HSR) tier 2 in SYNCMEM mode active to host hana-prd-02.corp.local.
          </div>
        </div>
      </div>

      {/* M / W / E Capability Layer: Warning Rules & Controlled Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <WarningRulePanel
            rules={WARNING_RULES.filter((r) => r.islandId === 'database')}
          />
        </div>
        <div className="lg:col-span-5">
          <ControlledActionPanel
            actions={CONTROLLED_ACTIONS.filter((a) => a.islandId === 'database')}
            selectedEntityName={selectedVol ? selectedVol.volumeName : DATABASE_STATUS.sid}
          />
        </div>
      </div>

      {/* Bottom Full-Width Storage Volumes & Mount Points Table */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#1b2b40]">
          <div>
            <h2 className="text-sm font-semibold text-white">Database Tablespace &amp; Volume Inventory</h2>
            <div className="text-xs text-[#7d96b2]">Source: SAP HANA Studio storage catalog &amp; OS df -h</div>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#18273b] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">VOLUME NAME</th>
                <th className="py-2.5 px-3 text-start">MOUNT POINT</th>
                <th className="py-2.5 px-3 text-start">TOTAL CAPACITY</th>
                <th className="py-2.5 px-3 text-start">USED SPACE</th>
                <th className="py-2.5 px-3 text-start">UTILIZATION %</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {DATABASE_VOLUMES.map((vol, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedVol(vol)}
                  className="hover:bg-[#102237] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-bold text-white tech-id">{vol.volumeName}</td>
                  <td className="py-2.5 px-3 font-mono text-[#91a6bc] text-[11px]">{vol.mountPoint}</td>
                  <td className="py-2.5 px-3 font-mono text-[#d9e6f3]">{vol.sizeGb} GB</td>
                  <td className="py-2.5 px-3 font-mono text-[#d9e6f3]">{vol.usedGb} GB</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-[#132338] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            vol.pct > 80 ? 'bg-amber-400' : 'bg-cyan-400'
                          }`}
                          style={{ width: `${vol.pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-white">{vol.pct}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {vol.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Volume Evidence Drawer via Unified EntityDetailDrawer */}
      <EntityDetailDrawer
        isOpen={!!selectedVol}
        entity={
          selectedVol
            ? {
                id: `DB-VOL-${selectedVol.volumeName}`,
                name: `Database Storage Volume: ${selectedVol.volumeName}`,
                islandId: 'database',
                entityType: 'Storage Volume (DB02 / HANA Studio)',
                status: selectedVol.status,
                attributes: {
                  'Volume Name': selectedVol.volumeName,
                  'Mount Path': selectedVol.mountPoint,
                  'Allocated Capacity': `${selectedVol.sizeGb} GB`,
                  'Used Capacity': `${selectedVol.usedGb} GB`,
                  'Utilization Ratio': `${selectedVol.pct}%`,
                  'Operational State': selectedVol.status,
                  'Database SID': DATABASE_STATUS.sid,
                  'Database Engine': `${DATABASE_STATUS.dbName} (v${DATABASE_STATUS.version})`,
                },
                sourceArtifact: 'SAP DB02 / OS Storage Catalog Volume Table',
                sourceLocator: `VOL_${selectedVol.volumeName}_MNT_${selectedVol.mountPoint}`,
                observedAt: '1405-02-14 10:14:00 (Jalali)',
                confidence: 'High',
                provenanceNotes:
                  'Observed database volume metrics. Tablespace resize, storage shrink, or datafile reorganization commands are strictly gated in Phase 1.',
                provenanceNotesFa:
                  'ثبت ظرفیت فضای ذخیره‌سازی پایگاه‌داده. افزایش ظرفیت جداول یا کوچک‌سازی فضای دیسک در فاز اول غیرفعال است.',
                relatedRecords: [
                  { islandId: 'backup-recovery', title: 'Backup History (DB13)', id: 'DB13_BK', count: 4 },
                  { islandId: 'performance', title: 'I/O Utilization (ST04)', id: 'ST04_IO', count: 1 },
                ],
              }
            : null
        }
        onClose={() => setSelectedVol(null)}
      />
    </div>
  );
};
