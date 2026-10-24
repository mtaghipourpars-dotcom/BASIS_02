import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANDSCAPE_SYSTEMS } from '../../data/fixtures';
import { Network, Server, HardDrive, Globe, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const LandscapePage: React.FC = () => {
  const { t, selectedSystem, setSelectedSystem, navigate } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>{t('systemLandscapeTitle')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">
            System topology, instance directory (SM51), and availability health checks.
          </p>
        </div>
      </div>

      {/* Topology Blueprint Flow matching Cockpit */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>Communication & Instance Architecture</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1a2d45] text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">SAP Router & Gateway</div>
            <div className="text-[10px] text-[#718aa6] tech-id mt-0.5">10.20.1.5:3299</div>
            <span className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Online (100%)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1a2d45] text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center mb-2">
              <Server className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">Central Services (ASCS)</div>
            <div className="text-[10px] text-[#718aa6] tech-id mt-0.5">Enqueue & Message Server</div>
            <span className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Active Primary
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1a2d45] text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-950 text-indigo-400 flex items-center justify-center mb-2">
              <Network className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">App Servers Cluster</div>
            <div className="text-[10px] text-[#718aa6] tech-id mt-0.5">PRD01, PRD02, PRD03, PRD04</div>
            <span className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
              PRD02 Degraded (62%)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1a2d45] text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-purple-950 text-purple-400 flex items-center justify-center mb-2">
              <HardDrive className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">SAP HANA Database</div>
            <div className="text-[10px] text-[#718aa6] tech-id mt-0.5">HDB Primary + HSR Sync</div>
            <span className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Sync Active (98%)
            </span>
          </div>
        </div>
      </div>

      {/* Systems Directory Table matching 8 systems */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#18273b]">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Managed Landscape Systems Directory (8 Systems)
          </h2>
          {selectedSystem !== 'ALL' && (
            <button
              type="button"
              onClick={() => setSelectedSystem('ALL')}
              className="text-xs text-cyan-400 hover:underline"
            >
              Clear filter ({selectedSystem})
            </button>
          )}
        </div>

        <div className="overflow-x-auto border border-[#18273b] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">SYSTEM ID</th>
                <th className="py-2.5 px-3 text-start">DESCRIPTION</th>
                <th className="py-2.5 px-3 text-start">ROLE</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
                <th className="py-2.5 px-3 text-start">AVAILABILITY</th>
                <th className="py-2.5 px-3 text-start">LATENCY</th>
                <th className="py-2.5 px-3 text-start">HOST</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {LANDSCAPE_SYSTEMS.map((sys) => {
                const isSelected = selectedSystem === sys.id;
                return (
                  <tr
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys.id)}
                    className={`cursor-pointer transition-colors hover:bg-[#102237] ${
                      isSelected ? 'bg-[#122842] border-s-4 border-cyan-400' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-cyan-300 tech-id">{sys.id}</td>
                    <td className="py-2.5 px-3 font-medium text-white">{sys.name}</td>
                    <td className="py-2.5 px-3 text-[#9bb3cc]">{sys.role}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          sys.status === 'Running'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : sys.status === 'Warning'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            sys.status === 'Running'
                              ? 'bg-emerald-400'
                              : sys.status === 'Warning'
                              ? 'bg-amber-400'
                              : 'bg-rose-400'
                          }`}
                        />
                        <span>{sys.status}</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono tech-id text-[#9bb3cc]">
                      {sys.availabilityPercent}%
                    </td>
                    <td className="py-2.5 px-3 font-mono tech-id text-[#7892ad]">
                      {sys.latencyMs} ms
                    </td>
                    <td className="py-2.5 px-3 text-[#7892ad] tech-id">{sys.host}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
