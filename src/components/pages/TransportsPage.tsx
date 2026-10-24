import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_TRANSPORTS } from '../../data/fixtures';
import { ArrowUpRight, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export const TransportsPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('transportsTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('transportsSub')}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
          {t('demoBadge')}
        </span>
      </div>

      {/* Queue Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">Imported Successfully (RC0 / RC4)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">2</div>
          <div className="text-[10px] text-emerald-400 mt-1">Ready for PRD verification</div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">Pending in Queue (STMS)</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tech-id">1</div>
          <div className="text-[10px] text-[#91a6bc] mt-1">PRDK900430 (Target: PRD)</div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">Failed Transport Returns (RC8+)</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 tech-id">1</div>
          <div className="text-[10px] text-rose-400 mt-1">PRDK900388 (Syntax error RC8)</div>
        </div>
      </div>

      {/* STMS Queue Table */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
        <h2 className="text-sm font-semibold text-white mb-3">{t('queueTitle')}</h2>
        <div className="overflow-x-auto border border-[#263a50] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#0c1a29] border-b border-[#263a50] text-[#91a7bd]">
                <th className="py-2.5 px-3 text-start">REQUEST NO.</th>
                <th className="py-2.5 px-3 text-start">DESCRIPTION</th>
                <th className="py-2.5 px-3 text-start">OWNER</th>
                <th className="py-2.5 px-3 text-start">SOURCE → TARGET</th>
                <th className="py-2.5 px-3 text-start">RETURN CODE</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
                <th className="py-2.5 px-3 text-start">IMPORT DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#203349]">
              {DEMO_TRANSPORTS.map((tr) => (
                <tr key={tr.trNumber} className="hover:bg-[#13283b]">
                  <td className="py-2.5 px-3 font-semibold text-cyan-300 tech-id">{tr.trNumber}</td>
                  <td className="py-2.5 px-3 text-white">{tr.description}</td>
                  <td className="py-2.5 px-3 text-[#91a6bc] tech-id">{tr.owner}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">
                    {tr.sourceSystem} → {tr.targetSystem}
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tech-id ${
                        tr.returnCode === 'RC0'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : tr.returnCode === 'RC4'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : tr.returnCode === 'RC8'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {tr.returnCode}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#d9e6f3]">{tr.status}</td>
                  <td className="py-2.5 px-3 text-[#91a6bc] tech-id">{tr.importDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
