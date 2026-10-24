import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_LANDSCAPE_NODES } from '../../data/fixtures';
import { Network, Server, HardDrive, Cpu, Activity, Globe } from 'lucide-react';

export const LandscapePage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('landscapeTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('landscapeSub')}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
          {t('demoBadge')}
        </span>
      </div>

      {/* Topology Blueprint Visualizer */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-6">
        <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Network className="w-4 h-4 text-cyan-400" />
          <span>{t('topologyMap')}</span>
        </h2>

        {/* High Level Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
          {/* SAP Router */}
          <div className="p-3.5 rounded-xl bg-[#0c1a29] border border-[#263a50] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center mb-2">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">SAP Router</div>
            <div className="text-[10px] text-[#91a6bc] tech-id mt-0.5">10.20.1.5:3299</div>
            <span className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Online
            </span>
          </div>

          {/* Central Services (ASCS) */}
          <div className="p-3.5 rounded-xl bg-[#0c1a29] border border-[#263a50] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center mb-2">
              <Server className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">ASCS Instance 00</div>
            <div className="text-[10px] text-[#91a6bc] tech-id mt-0.5">Message / Enqueue</div>
            <span className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Online
            </span>
          </div>

          {/* Application Servers (PAS/AAS) */}
          <div className="p-3.5 rounded-xl bg-[#0c1a29] border border-[#263a50] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-indigo-950 text-indigo-400 flex items-center justify-center mb-2">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">App Servers (PAS + AAS)</div>
            <div className="text-[10px] text-[#91a6bc] tech-id mt-0.5">Instances 01, 02 (443 Users)</div>
            <span className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Balanced
            </span>
          </div>

          {/* HANA Database Host */}
          <div className="p-3.5 rounded-xl bg-[#0c1a29] border border-[#263a50] flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-purple-950 text-purple-400 flex items-center justify-center mb-2">
              <HardDrive className="w-5 h-5" />
            </div>
            <div className="text-xs font-bold text-white">SAP HANA HDB00</div>
            <div className="text-[10px] text-[#91a6bc] tech-id mt-0.5">Primary + HSR Sync</div>
            <span className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Sync Active
            </span>
          </div>
        </div>
      </div>

      {/* Verified Node Table */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
        <h2 className="text-sm font-semibold text-white mb-3">Known Instance Inventory (SM51 Evidence)</h2>
        <div className="overflow-x-auto border border-[#263a50] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#0c1a29] border-b border-[#263a50] text-[#91a7bd]">
                <th className="py-2.5 px-3 text-start">SID</th>
                <th className="py-2.5 px-3 text-start">INSTANCE NAME</th>
                <th className="py-2.5 px-3 text-start">ROLE / TYPE</th>
                <th className="py-2.5 px-3 text-start">HOST / IP</th>
                <th className="py-2.5 px-3 text-start">CPU / MEM</th>
                <th className="py-2.5 px-3 text-start">ACTIVE USERS</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#203349]">
              {DEMO_LANDSCAPE_NODES.map((node) => (
                <tr key={node.id} className="hover:bg-[#13283b]">
                  <td className="py-2.5 px-3 font-semibold text-cyan-300 tech-id">{node.sid}</td>
                  <td className="py-2.5 px-3 font-semibold text-white tech-id">{node.instanceName}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{node.type}</td>
                  <td className="py-2.5 px-3 text-[#91a6bc] tech-id">
                    {node.host} <span className="text-[#647c94]">({node.ip})</span>
                  </td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">
                    {node.cpuUsage}% / {node.memUsage}%
                  </td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{node.activeUsers}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {node.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
