import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CONNECTIVITY_DATA,
  INTERFACE_INVENTORY,
} from '../../data/fixtures';
import {
  Share2,
  Radio,
  Server,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  X,
  ExternalLink,
  Layers,
  Network,
} from 'lucide-react';
import { CapabilityTrackStatus } from '../common/CapabilityTrackStatus';
import { WarningRulePanel } from '../common/WarningRulePanel';
import { ControlledActionPanel } from '../common/ControlledActionPanel';
import { WARNING_RULES, CONTROLLED_ACTIONS } from '../../data/mweRegistry';

export const InterfacesConnectivityPage: React.FC = () => {
  const { t } = useApp();
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInterface, setSelectedInterface] = useState<(typeof INTERFACE_INVENTORY)[0] | null>(null);

  const filteredInterfaces = INTERFACE_INVENTORY.filter((item) => {
    const matchesType = typeFilter === 'ALL' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.targetHost.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q);
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-cyan-400" />
            <span>{t('interfacesConnTitle')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">
            RFC destinations (SM59), IDoc queues (WE02/SM58), Internet Communication Manager (SICF/ICM), and messaging interfaces.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <CapabilityTrackStatus
            islandName={t('interfacesConnTitle')}
            wStatus="Configured"
            activeFindingsCount={WARNING_RULES.filter((r) => r.islandId === 'interfaces-connectivity').flatMap((r) => r.findings || []).length}
          />
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {CONNECTIVITY_DATA.map((conn, idx) => (
          <div
            key={idx}
            className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <div className="text-[11px] text-[#7d96b2] font-medium">{conn.type}</div>
              <div className="text-2xl font-bold text-white mt-1 tech-id">{conn.total} Total</div>
              <div
                className={`text-[10px] mt-0.5 font-semibold ${
                  conn.errors > 0 ? 'text-amber-400' : 'text-[#55d6a1]'
                }`}
              >
                {conn.errors > 0 ? `${conn.errors} Destination Error` : '0 Errors · Operational'}
              </div>
            </div>
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                conn.errors > 0
                  ? 'bg-amber-950/60 text-amber-400 border border-amber-800'
                  : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
              }`}
            >
              {conn.errors > 0 ? (
                <AlertTriangle className="w-4 h-4" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main 12-Column Grid: Connection Topology Matrix (8/12) + Gateway Diagnostics (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8/12: Connection Relationship Visualization & Topology Matrix */}
        <div className="lg:col-span-8 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b2b40]">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-cyan-400" />
                <span>Inter-System Interface Topology Matrix</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">
                Active integration paths and communication protocols
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            {/* PRD to QAS Trusted RFC */}
            <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1b2f48] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">PRD01 → QAS01</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Online
                </span>
              </div>
              <div className="text-[11px] text-[#7d96b2]">Destination: <strong className="text-white">QAS_000_TRUSTED</strong></div>
              <div className="flex justify-between text-[10px] text-[#718aa6] font-mono">
                <span>CPIC/RFC · Port 3300</span>
                <span className="text-cyan-300">14 ms latency</span>
              </div>
            </div>

            {/* PRD to SOL RFC (Error) */}
            <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-amber-800/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">PRD01 → SOL01</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-800">
                  Error
                </span>
              </div>
              <div className="text-[11px] text-[#7d96b2]">Destination: <strong className="text-white">SOL_700_BACK</strong></div>
              <div className="flex justify-between text-[10px] text-amber-300 font-mono">
                <span>CPIC/RFC · Port 3300</span>
                <span>WSAECONNREFUSED</span>
              </div>
            </div>

            {/* IDoc Inbound Sales */}
            <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1b2f48] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">B2B Portal → PRD01</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Online
                </span>
              </div>
              <div className="text-[11px] text-[#7d96b2]">Queue: <strong className="text-white">ORDERS05_INBOUND</strong></div>
              <div className="flex justify-between text-[10px] text-[#718aa6] font-mono">
                <span>ALE/IDoc · Client 800</span>
                <span className="text-cyan-300">0 Queue backlog</span>
              </div>
            </div>

            {/* HTTP SICF OData */}
            <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1b2f48] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Fiori Frontend → PRD01</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Online
                </span>
              </div>
              <div className="text-[11px] text-[#7d96b2]">Service: <strong className="text-white">/sap/opu/odata/IWFND</strong></div>
              <div className="flex justify-between text-[10px] text-[#718aa6] font-mono">
                <span>HTTPS · Port 44300</span>
                <span className="text-cyan-300">24 ms latency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4/12: Gateway & Diagnostics Panel */}
        <div className="lg:col-span-4 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-[#1b2b40]">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <span>SAP Gateway (SMGW) Health</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">Active gateway connections &amp; listener</div>
            </div>

            <div className="py-3 space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1">
                <div className="text-[#88a2bd] text-[11px]">Gateway Daemon (sapgw00):</div>
                <div className="font-mono text-emerald-400 font-bold">LISTENING (Port 3300)</div>
                <div className="text-[10px] text-[#718aa6]">Host: sap-prd-ascs.corp.local</div>
              </div>

              <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1">
                <div className="text-[#88a2bd] text-[11px]">Security Parameter (secinfo/reginfo):</div>
                <div className="font-mono text-cyan-300 font-bold">Strict Rulebook Active</div>
                <div className="text-[10px] text-[#718aa6]">Unregistered external programs blocked</div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px]">
            <strong>Phase 1 Read-Only:</strong> Real network connection test ping (SM59 Connection Test) or resetting gateway handles is disabled.
          </div>
        </div>
      </div>

      {/* M / W / E Capability Layer: Warning Rules & Controlled Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <WarningRulePanel
            rules={WARNING_RULES.filter((r) => r.islandId === 'interfaces-connectivity')}
          />
        </div>
        <div className="lg:col-span-5">
          <ControlledActionPanel
            actions={CONTROLLED_ACTIONS.filter((a) => a.islandId === 'interfaces-connectivity')}
            selectedEntityName={selectedInterface ? selectedInterface.name : undefined}
          />
        </div>
      </div>

      {/* Bottom Full-Width Interface Inventory Table */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#1b2b40]">
          <div>
            <h2 className="text-sm font-semibold text-white">Managed Interface &amp; Queue Directory</h2>
            <div className="text-xs text-[#7d96b2]">
              Showing {filteredInterfaces.length} integration endpoints
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute inset-y-0 start-2.5 my-auto w-3.5 h-3.5 text-[#5e7794] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination or host..."
                className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 ps-8 pe-3 text-xs text-white placeholder-[#5e7794] focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Interface Types</option>
              <option value="RFC">RFC</option>
              <option value="IDoc">IDoc</option>
              <option value="HTTP">HTTP</option>
              <option value="Message Queue">Message Queue</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="Online">Online</option>
              <option value="Error">Error</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#18273b] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">DESTINATION / QUEUE</th>
                <th className="py-2.5 px-3 text-start">TYPE</th>
                <th className="py-2.5 px-3 text-start">TARGET HOST</th>
                <th className="py-2.5 px-3 text-start">PROTOCOL</th>
                <th className="py-2.5 px-3 text-start">LATENCY</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
                <th className="py-2.5 px-3 text-start">LAST CHECK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {filteredInterfaces.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedInterface(item)}
                  className="hover:bg-[#102237] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-bold text-white tech-id">{item.name}</td>
                  <td className="py-2.5 px-3 font-semibold text-cyan-300">{item.type}</td>
                  <td className="py-2.5 px-3 font-mono text-[#91a6bc] text-[11px]">{item.targetHost}</td>
                  <td className="py-2.5 px-3 font-mono text-[#d9e6f3]">{item.protocol}</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold">{item.latencyMs} ms</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'Online'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#7d96b2] tech-id">{item.lastChecked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Interface Detail Drawer */}
      {selectedInterface && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
          <div className="bg-[#0b1727] border-s border-[#1b2b40] w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2b40]">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    Interface Specification · {selectedInterface.type}
                  </div>
                  <h3 className="text-lg font-bold text-white tech-id mt-0.5">
                    {selectedInterface.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInterface(null)}
                  className="p-1.5 rounded-lg text-[#718aa6] hover:text-white hover:bg-[#14263c] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1.5">
                  <div className="text-[11px] text-[#7d96b2] font-semibold">Communication Parameters</div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Destination ID:</span>
                    <span className="font-mono text-cyan-300 font-bold">{selectedInterface.id}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Target Host:</span>
                    <span className="font-mono text-white text-[11px]">{selectedInterface.targetHost}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Target Port:</span>
                    <span className="font-mono text-white">{selectedInterface.port}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Protocol:</span>
                    <span className="font-bold text-white">{selectedInterface.protocol}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#88a2bd]">Operational State:</span>
                    <span
                      className={`font-semibold ${
                        selectedInterface.status === 'Online' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {selectedInterface.status}
                    </span>
                  </div>
                </div>

                {selectedInterface.errorText && (
                  <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/40 text-rose-200 text-xs space-y-1">
                    <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Reported Connection Error</span>
                    </div>
                    <p className="font-mono text-[11px] leading-relaxed">{selectedInterface.errorText}</p>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px]">
                  <strong>Phase 1 Read-Only:</strong> Triggering live connection test RFC echo or IDoc queue reprocessing is disabled.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedInterface(null)}
              className="w-full py-2 rounded-lg bg-[#14263c] hover:bg-[#1a334f] text-cyan-200 text-xs font-semibold border border-[#233f5d] transition-colors"
            >
              Close Interface Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
