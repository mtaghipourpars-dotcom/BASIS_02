import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_ALERTS } from '../../data/fixtures';
import { AlertRecord } from '../../types';
import { AlertTriangle, Filter, Search, FileCode, CheckCircle2, X } from 'lucide-react';

export const AlertsEventsPage: React.FC = () => {
  const { t, locale } = useApp();
  const [severityFilter, setSeverityFilter] = useState<string>('');
  const [selectedAlert, setSelectedAlert] = useState<AlertRecord | null>(null);

  const filtered = DEMO_ALERTS.filter((a) => {
    return !severityFilter || a.severity === severityFilter;
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('alertsTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('alertsSub')}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
          {t('demoBadge')}
        </span>
      </div>

      {/* Filter Header */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-[#91a6bc]">{t('filterSeverity')}:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-[#0b1928] text-white border border-[#2a4158] rounded-lg py-1 px-3 text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="">{t('allSeverities')}</option>
            <option value="Critical">Critical</option>
            <option value="Warning">Warning</option>
            <option value="Info">Info</option>
          </select>
        </div>
        <div className="text-xs text-[#70869c]">
          Showing {filtered.length} authoritative events (SM21 / ST22)
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
        <div className="overflow-x-auto border border-[#263a50] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#0c1a29] border-b border-[#263a50] text-[#91a7bd]">
                <th className="py-2.5 px-3 text-start">SOURCE</th>
                <th className="py-2.5 px-3 text-start">SEVERITY</th>
                <th className="py-2.5 px-3 text-start">TIMESTAMP</th>
                <th className="py-2.5 px-3 text-start">SID</th>
                <th className="py-2.5 px-3 text-start">MESSAGE</th>
                <th className="py-2.5 px-3 text-start">ERROR KEY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#203349]">
              {filtered.map((alt) => (
                <tr
                  key={alt.id}
                  onClick={() => setSelectedAlert(alt)}
                  className="hover:bg-[#13283b] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-bold text-cyan-300 tech-id">{alt.source}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        alt.severity === 'Critical'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : alt.severity === 'Warning'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {alt.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#91a6bc] tech-id">{alt.timestamp}</td>
                  <td className="py-2.5 px-3 font-semibold text-white tech-id">{alt.sid}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3]">{alt.message}</td>
                  <td className="py-2.5 px-3 text-[#70869c] tech-id">{alt.errorKey}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Alert Modal Drawer */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1d2d] border border-[#263a50] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#263a50]">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider tech-id">
                  {selectedAlert.source} · {selectedAlert.sid}
                </span>
                <h3 className="text-base font-bold text-white mt-1">Event Analysis & Evidence</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAlert(null)}
                className="p-1 rounded bg-[#14263a] text-[#91a6bc] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#081321] border border-[#203349] space-y-1.5">
                <div className="text-[11px] text-[#91a6bc]">Message:</div>
                <div className="text-white font-medium">{selectedAlert.message}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[#91a6bc]">
                <div className="p-2 rounded bg-[#081321] border border-[#203349]">
                  <span className="block text-[10px] text-[#70869c]">Program:</span>
                  <span className="text-white tech-id">{selectedAlert.program || 'N/A'}</span>
                </div>
                <div className="p-2 rounded bg-[#081321] border border-[#203349]">
                  <span className="block text-[10px] text-[#70869c]">User / Client:</span>
                  <span className="text-white tech-id">
                    {selectedAlert.user || 'SYSTEM'} ({selectedAlert.client || '000'})
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#14202e] border border-[#263a50] text-[#70869c] text-[11px]">
                {t('readOnlyActionDisabled')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
