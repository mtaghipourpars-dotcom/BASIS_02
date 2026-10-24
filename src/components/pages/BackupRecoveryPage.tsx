import React from 'react';
import { useApp } from '../../context/AppContext';
import { RefreshCw, CheckCircle2, ShieldCheck, Database, HardDrive, AlertCircle } from 'lucide-react';

export const BackupRecoveryPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('backupTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('backupSub')}</p>
        </div>
      </div>

      {/* Backup Readiness Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#91a6bc]">
            <span>Daily Full Backup (DB12)</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified</span>
            </span>
          </div>
          <div className="text-lg font-bold text-white tech-id">SUCCESS · RC 0</div>
          <div className="text-[11px] text-[#70869c] tech-id">
            Completed: 1405/07/26 02:00:00 (Duration: 42 min)
          </div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#91a6bc]">
            <span>HANA Redo Log Shipping</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active</span>
            </span>
          </div>
          <div className="text-lg font-bold text-white tech-id">15-min Intervals</div>
          <div className="text-[11px] text-[#70869c] tech-id">
            Last segment shipped: 1405/07/26 14:15:00
          </div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#91a6bc]">
            <span>Disaster Recovery (Secondary Site)</span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SYNCMEM</span>
            </span>
          </div>
          <div className="text-lg font-bold text-white tech-id">Lag: 0 ms</div>
          <div className="text-[11px] text-[#70869c] tech-id">
            Secondary host: hana-prd-02.corp.local
          </div>
        </div>
      </div>

      {/* Backup Schedule & Logs */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-white">{t('backupSchedule')}</h2>
        <div className="overflow-x-auto border border-[#263a50] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-[#0c1a29] border-b border-[#263a50] text-[#91a7bd]">
                <th className="py-2.5 px-3 text-start">SID</th>
                <th className="py-2.5 px-3 text-start">BACKUP TYPE</th>
                <th className="py-2.5 px-3 text-start">START TIME</th>
                <th className="py-2.5 px-3 text-start">DURATION</th>
                <th className="py-2.5 px-3 text-start">SIZE</th>
                <th className="py-2.5 px-3 text-start">DESTINATION</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#203349]">
              <tr className="hover:bg-[#13283b]">
                <td className="py-2.5 px-3 font-semibold text-cyan-300 tech-id">PRD</td>
                <td className="py-2.5 px-3 font-semibold text-white">Complete Data Backup</td>
                <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">1405/07/26 02:00</td>
                <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">42m 12s</td>
                <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">412 GB</td>
                <td className="py-2.5 px-3 text-[#91a6bc] tech-id">/backup/data/PRD_data_full</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Successful
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#13283b]">
                <td className="py-2.5 px-3 font-semibold text-cyan-300 tech-id">QAS</td>
                <td className="py-2.5 px-3 font-semibold text-white">Complete Data Backup</td>
                <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">1405/07/26 03:00</td>
                <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">28m 40s</td>
                <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">215 GB</td>
                <td className="py-2.5 px-3 text-[#91a6bc] tech-id">/backup/data/QAS_data_full</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Successful
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-[#13283b]">
                <td className="py-2.5 px-3 font-semibold text-cyan-300 tech-id">PRD</td>
                <td className="py-2.5 px-3 font-semibold text-white">Log Segment Backup</td>
                <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">1405/07/26 14:15</td>
                <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">14s</td>
                <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">1.2 GB</td>
                <td className="py-2.5 px-3 text-[#91a6bc] tech-id">/backup/log/PRD_log_seg48</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Successful
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
