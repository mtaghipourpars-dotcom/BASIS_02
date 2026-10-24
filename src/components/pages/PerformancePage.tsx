import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_WORK_PROCESSES } from '../../data/fixtures';
import { Gauge, Cpu, HardDrive, Clock, Activity } from 'lucide-react';

export const PerformancePage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('performanceTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('performanceSub')}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
          {t('demoBadge')}
        </span>
      </div>

      {/* Response Time & Workload KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">Dialog Resp. Time (ST03N)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">410 ms</div>
          <div className="text-[10px] text-amber-400 mt-1">Target &lt; 400 ms (Threshold Warning)</div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">CPU Load (Host ST06)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">54%</div>
          <div className="text-[10px] text-emerald-400 mt-1">Normal (8 Cores online)</div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">Memory Usage (Extended)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">68%</div>
          <div className="text-[10px] text-emerald-400 mt-1">EM Allocated: 42 GB</div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">Active Work Processes (SM50)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">3 / 8</div>
          <div className="text-[10px] text-cyan-400 mt-1">DIA: 1, BTC: 1, ENQ: 1</div>
        </div>
      </div>

      {/* Work Process Table (SM50 Snapshot) */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
        <h2 className="text-sm font-semibold text-white mb-3">{t('workProcessTable')}</h2>
        <div className="overflow-x-auto border border-[#263a50] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-[#0c1a29] border-b border-[#263a50] text-[#91a7bd]">
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
            <tbody className="divide-y divide-[#203349]">
              {DEMO_WORK_PROCESSES.map((wp) => (
                <tr key={wp.no} className="hover:bg-[#13283b]">
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
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{wp.program || '—'}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{wp.client || '—'}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{wp.user || '—'}</td>
                  <td className="py-2.5 px-3 text-[#91a6bc]">{wp.action || 'Idle'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
