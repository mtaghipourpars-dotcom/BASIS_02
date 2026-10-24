import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BACKUP_CATALOG,
  BACKUP_DATA,
} from '../../data/fixtures';
import {
  HardDrive,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  Database,
  AlertCircle,
  Search,
  Filter,
  X,
  ShieldAlert,
  Clock,
  Layers,
  FileCheck,
} from 'lucide-react';

export const BackupRecoveryPage: React.FC = () => {
  const { t } = useApp();
  const [sidFilter, setSidFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBackup, setSelectedBackup] = useState<(typeof BACKUP_CATALOG)[0] | null>(null);

  const filteredCatalog = BACKUP_CATALOG.filter((b) => {
    const matchesSid = sidFilter === 'ALL' || b.sid === sidFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      b.backupId.toLowerCase().includes(q) ||
      b.type.toLowerCase().includes(q) ||
      b.destination.toLowerCase().includes(q);
    return matchesSid && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-cyan-400" />
            <span>{t('backupTitle')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('backupSub')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Catalog Consistency Verified</span>
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Daily Full Backup (DB12)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">SUCCESS · RC 0</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Duration 42 min · 412 GB</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Redo Log Backup Shipping</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">15-min Intervals</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Last segment: 14:15 (0 Lag)</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Disaster Recovery Readiness</div>
          <div className="text-2xl font-bold text-[#55d6a1] mt-1 tech-id">
            {BACKUP_DATA.recoveryReadinessPercent}% Readiness
          </div>
          <div className="text-[10px] text-[#718aa6] mt-0.5">Separated from backup execution</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Point-in-Time Recovery Window</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">7 Days Valid</div>
          <div className="text-[10px] text-[#718aa6] mt-0.5">Continuous log chain unbroken</div>
        </div>
      </div>

      {/* Main 12-Column Grid: Backup History Timeline (8/12) + Recovery Readiness Panel (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8/12: Backup History Timeline Visualization */}
        <div className="lg:col-span-8 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b2b40]">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Backup Schedule &amp; Execution Timeline</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">
                Verified execution windows across database instances
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Full Data (02:00)
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500" /> Differential (14:00)
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> Redo Logs (Cont.)
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {/* PRD Timeline row */}
            <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1b2f48] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white tech-id">PRD (Production Primary)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-800">
                    HANA 2.0
                  </span>
                </div>
                <span className="text-emerald-400 text-xs font-bold font-mono">RC 0 (Verified)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#132338] flex overflow-hidden">
                <div className="w-1/4 h-full bg-emerald-500" title="Full Backup: 02:00" />
                <div className="w-1/4 h-full bg-[#132338]" />
                <div className="w-1/4 h-full bg-cyan-500" title="Diff Backup: 14:00" />
                <div className="w-1/4 h-full bg-blue-500" title="Log Archive: Cont." />
              </div>
              <div className="flex justify-between text-[10px] text-[#718aa6] font-mono">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>

            {/* QAS Timeline row */}
            <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1b2f48] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white tech-id">QAS (Quality Staging)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-950 text-blue-300 border border-blue-800">
                    HANA 2.0
                  </span>
                </div>
                <span className="text-emerald-400 text-xs font-bold font-mono">RC 0 (Verified)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#132338] flex overflow-hidden">
                <div className="w-1/3 h-full bg-[#132338]" />
                <div className="w-1/4 h-full bg-emerald-500" title="Full Backup: 03:00" />
                <div className="w-5/12 h-full bg-blue-500" title="Log Archive: Cont." />
              </div>
              <div className="flex justify-between text-[10px] text-[#718aa6] font-mono">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4/12: Recovery Readiness Evidence */}
        <div className="lg:col-span-4 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-[#1b2b40]">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Recovery Readiness Evidence</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">
                Audit evidence separated from backup completion
              </div>
            </div>

            <div className="py-3 space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1">
                <div className="text-[#88a2bd] text-[11px]">Last Restore Drill Verification:</div>
                <div className="font-bold text-white">Apr 15, 2025 · Test Sandbox System</div>
                <div className="text-[10px] text-emerald-400">Restore verification passed in 1h 24m</div>
              </div>

              <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1">
                <div className="text-[#88a2bd] text-[11px]">HANA System Replication (HSR):</div>
                <div className="font-mono text-cyan-300 font-bold">SYNCMEM Active · 0 ms Lag</div>
                <div className="text-[10px] text-[#718aa6]">Secondary Site: hana-prd-02.corp.local</div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px]">
            <strong>Phase 1 Read-Only:</strong> Database recovery, point-in-time restore, or taking ad-hoc database backups is disabled.
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Backup Catalog Table */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#1b2b40]">
          <div>
            <h2 className="text-sm font-semibold text-white">Database Backup Catalog (DB12 / hdbbackupdiag)</h2>
            <div className="text-xs text-[#7d96b2]">Showing {filteredCatalog.length} cataloged backup entries</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute inset-y-0 start-2.5 my-auto w-3.5 h-3.5 text-[#5e7794] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search backup ID or destination..."
                className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 ps-8 pe-3 text-xs text-white placeholder-[#5e7794] focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={sidFilter}
              onChange={(e) => setSidFilter(e.target.value)}
              className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All SIDs</option>
              <option value="PRD">PRD</option>
              <option value="QAS">QAS</option>
              <option value="DEV">DEV</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#18273b] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">SID</th>
                <th className="py-2.5 px-3 text-start">BACKUP TYPE</th>
                <th className="py-2.5 px-3 text-start">START TIME</th>
                <th className="py-2.5 px-3 text-start">DURATION</th>
                <th className="py-2.5 px-3 text-start">SIZE</th>
                <th className="py-2.5 px-3 text-start">DESTINATION</th>
                <th className="py-2.5 px-3 text-start">CHECKSUM</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {filteredCatalog.map((b) => (
                <tr
                  key={b.backupId}
                  onClick={() => setSelectedBackup(b)}
                  className="hover:bg-[#102237] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-bold text-cyan-300 tech-id">{b.sid}</td>
                  <td className="py-2.5 px-3 font-semibold text-white">{b.type}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{b.startTime}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{b.duration}</td>
                  <td className="py-2.5 px-3 font-mono text-[#d9e6f3] font-bold">{b.sizeGb} GB</td>
                  <td className="py-2.5 px-3 font-mono text-[#91a6bc] text-[11px] truncate max-w-xs">{b.destination}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Backup Detail Drawer */}
      {selectedBackup && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
          <div className="bg-[#0b1727] border-s border-[#1b2b40] w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2b40]">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    Backup Catalog Record · DB12
                  </div>
                  <h3 className="text-lg font-bold text-white tech-id mt-0.5">
                    {selectedBackup.backupId}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBackup(null)}
                  className="p-1.5 rounded-lg text-[#718aa6] hover:text-white hover:bg-[#14263c] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1.5">
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Database SID:</span>
                    <span className="font-bold text-white tech-id">{selectedBackup.sid}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Backup Type:</span>
                    <span className="font-bold text-cyan-300">{selectedBackup.type}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Execution Duration:</span>
                    <span className="font-mono text-white">{selectedBackup.duration}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Compressed Size:</span>
                    <span className="font-mono text-white font-bold">{selectedBackup.sizeGb} GB</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#88a2bd]">Storage Target:</span>
                    <span className="font-mono text-cyan-300 text-[11px] text-end">{selectedBackup.destination}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px]">
                  <strong>Phase 1 Read-Only:</strong> Initiating database restore, disaster recovery drill failover, or backup deletion is disabled.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedBackup(null)}
              className="w-full py-2 rounded-lg bg-[#14263c] hover:bg-[#1a334f] text-cyan-200 text-xs font-semibold border border-[#233f5d] transition-colors"
            >
              Close Backup Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
