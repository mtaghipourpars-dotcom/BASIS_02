import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRIORITY_WARNINGS } from '../../data/fixtures';
import { PriorityWarningItem } from '../../types';
import { AlertTriangle, Filter, Search, FileCode, CheckCircle2, X, ShieldAlert } from 'lucide-react';

export const AlertsEventsPage: React.FC = () => {
  const { t, selectedSeverity, setSelectedSeverity } = useApp();
  const [selectedAlert, setSelectedAlert] = useState<PriorityWarningItem | null>(null);

  const filtered = PRIORITY_WARNINGS.filter((a) => {
    return !selectedSeverity || a.severity === selectedSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>{t('logsDumpsTitle')} &amp; Events</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">
            Authoritative event records from SM21 (System Log), ST22 (ABAP Dumps), and ST04/CCMS.
          </p>
        </div>
      </div>

      {/* Filter Header */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-[#91a6bc] font-medium">Severity:</span>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-[#091322] text-white border border-[#1b2b40] rounded-lg py-1 px-3 text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="Warning">Warning</option>
            <option value="Info">Info</option>
          </select>
        </div>
        <div className="text-xs text-[#718aa6] tech-id">
          Showing {filtered.length} priority events (SM21 / ST22 / ST04)
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
        <div className="overflow-x-auto border border-[#18273b] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">EVENT ID</th>
                <th className="py-2.5 px-3 text-start">SEVERITY</th>
                <th className="py-2.5 px-3 text-start">SYSTEM</th>
                <th className="py-2.5 px-3 text-start">TIME</th>
                <th className="py-2.5 px-3 text-start">TITLE</th>
                <th className="py-2.5 px-3 text-start">SOURCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {filtered.map((alt) => (
                <tr
                  key={alt.id}
                  onClick={() => setSelectedAlert(alt)}
                  className="hover:bg-[#102237] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-bold text-cyan-300 tech-id">{alt.id}</td>
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
                  <td className="py-2.5 px-3 font-semibold text-white tech-id">{alt.systemId}</td>
                  <td className="py-2.5 px-3 text-[#91a6bc] tech-id">{alt.time}</td>
                  <td className="py-2.5 px-3 text-white font-medium">{alt.title}</td>
                  <td className="py-2.5 px-3 text-[#7892ad] tech-id">{alt.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Alert Modal Drawer */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#18273b]">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider tech-id">
                  {selectedAlert.id} · {selectedAlert.systemId}
                </span>
                <h3 className="text-base font-bold text-white mt-1">{selectedAlert.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAlert(null)}
                className="p-1 rounded bg-[#102237] text-[#91a6bc] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#070e17] border border-[#19273a] space-y-1.5">
                <div className="text-[11px] text-[#718aa6]">Detailed Event Log:</div>
                <div className="text-white font-medium">{selectedAlert.description}</div>
              </div>

              <div className="flex gap-2">
                {selectedAlert.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[10px] bg-[#102237] text-cyan-300 border border-[#1b2b40]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="p-2.5 rounded-lg bg-[#070e17] border border-[#1b2b40] text-[#718aa6] text-[11px] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{t('readOnlyActionDisabled')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
