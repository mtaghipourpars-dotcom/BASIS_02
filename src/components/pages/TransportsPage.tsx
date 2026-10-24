import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TRANSPORT_RECORDS,
  TRANSPORTS_DATA,
} from '../../data/fixtures';
import {
  Package,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  X,
  ShieldAlert,
  GitCommit,
  Layers,
} from 'lucide-react';

export const TransportsPage: React.FC = () => {
  const { t } = useApp();
  const [returnCodeFilter, setReturnCodeFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransport, setSelectedTransport] = useState<(typeof TRANSPORT_RECORDS)[0] | null>(null);

  const filteredTransports = TRANSPORT_RECORDS.filter((tr) => {
    const matchesRC =
      returnCodeFilter === 'ALL' ||
      (returnCodeFilter === 'PENDING' ? tr.returnCode === 'PENDING' : tr.returnCode === returnCodeFilter);
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      tr.trNumber.toLowerCase().includes(q) ||
      tr.description.toLowerCase().includes(q) ||
      tr.owner.toLowerCase().includes(q);
    return matchesRC && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-cyan-400" />
            <span>{t('transportsTitle')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('transportsSub')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
            STMS Domain Controller (DEV01)
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Pending in Queue (STMS)</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tech-id">
            {TRANSPORTS_DATA.pendingImports} Pending
          </div>
          <div className="text-[10px] text-[#718aa6] mt-0.5">Target: PRD01 Client 800</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Imported in Last 24 Hours</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">2 Imported</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">RC0 / RC4 clean returns</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Failed Returns (RC8+)</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 tech-id">
            {TRANSPORTS_DATA.failedImports} Failed
          </div>
          <div className="text-[10px] text-rose-300 mt-0.5">PRDK900388 (Syntax error)</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Recent Transport Changes</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">
            {TRANSPORTS_DATA.recentChanges} Changes
          </div>
          <div className="text-[10px] text-cyan-300 mt-0.5">Last import: {TRANSPORTS_DATA.lastImportTime}</div>
        </div>
      </div>

      {/* Main 12-Column Grid: Transport Pipeline (8/12) + Return Code Distribution (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8/12: Visual Transport Queue Pipeline */}
        <div className="lg:col-span-8 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
          <div className="pb-3 border-b border-[#1b2b40]">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-cyan-400" />
              <span>Transport Management Route Flow (DEV → QAS → PRD)</span>
            </h2>
            <div className="text-[11px] text-[#7d96b2]">
              Configured transport routes and buffer states
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            {/* Step 1: DEV */}
            <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1b2f48] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white tech-id">DEV01</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-950 text-purple-300 border border-purple-800">
                  Development
                </span>
              </div>
              <div className="text-[11px] text-[#7d96b2]">Source System</div>
              <div className="text-[10px] text-[#55d6a1] font-mono">0 Transport exports pending</div>
            </div>

            {/* Step 2: QAS */}
            <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-[#1b2f48] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white tech-id">QAS01</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-950 text-blue-300 border border-blue-800">
                  Quality Staging
                </span>
              </div>
              <div className="text-[11px] text-[#7d96b2]">Test Verification Target</div>
              <div className="text-[10px] text-cyan-300 font-mono">Import buffer up-to-date</div>
            </div>

            {/* Step 3: PRD */}
            <div className="p-3.5 rounded-xl bg-[#0e1d2f] border border-amber-800/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white tech-id">PRD01</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 text-amber-300 border border-amber-800">
                  Production
                </span>
              </div>
              <div className="text-[11px] text-[#7d96b2]">Production Target Buffer</div>
              <div className="text-[10px] text-amber-300 font-mono">1 Request waiting in queue</div>
            </div>
          </div>
        </div>

        {/* Right 4/12: Return Code Distribution */}
        <div className="lg:col-span-4 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-[#1b2b40]">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Return Code Distribution</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">Status breakdown of recent transport imports</div>
            </div>

            <div className="space-y-3 pt-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">RC0 (Successful clean import)</span>
                  <span className="font-mono text-emerald-400 font-bold">50% (2)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#132338]">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">RC4 (Warning / Generated object)</span>
                  <span className="font-mono text-blue-400 font-bold">25% (1)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#132338]">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">RC8 (Syntax or Activation error)</span>
                  <span className="font-mono text-rose-400 font-bold">25% (1)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#132338]">
                  <div className="h-full bg-rose-400 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px]">
            <strong>Phase 1 Read-Only:</strong> Transport import execution, releasing requests, or modifying transport routes is disabled.
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Transport Table */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#1b2b40]">
          <div>
            <h2 className="text-sm font-semibold text-white">STMS Import Queue &amp; History</h2>
            <div className="text-xs text-[#7d96b2]">Showing {filteredTransports.length} transport requests</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute inset-y-0 start-2.5 my-auto w-3.5 h-3.5 text-[#5e7794] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search request or owner..."
                className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 ps-8 pe-3 text-xs text-white placeholder-[#5e7794] focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={returnCodeFilter}
              onChange={(e) => setReturnCodeFilter(e.target.value)}
              className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Return Codes</option>
              <option value="RC0">RC0 (Success)</option>
              <option value="RC4">RC4 (Warning)</option>
              <option value="RC8">RC8 (Failed)</option>
              <option value="PENDING">Pending In Queue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#18273b] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">REQUEST NO.</th>
                <th className="py-2.5 px-3 text-start">DESCRIPTION</th>
                <th className="py-2.5 px-3 text-start">OWNER</th>
                <th className="py-2.5 px-3 text-start">SOURCE → TARGET</th>
                <th className="py-2.5 px-3 text-start">RETURN CODE</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
                <th className="py-2.5 px-3 text-start">IMPORT DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {filteredTransports.map((tr) => (
                <tr
                  key={tr.trNumber}
                  onClick={() => setSelectedTransport(tr)}
                  className="hover:bg-[#102237] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-semibold text-cyan-300 tech-id">{tr.trNumber}</td>
                  <td className="py-2.5 px-3 text-white font-medium">{tr.description}</td>
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

      {/* Selected Transport Detail Drawer */}
      {selectedTransport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
          <div className="bg-[#0b1727] border-s border-[#1b2b40] w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2b40]">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    Transport Cofile Record · STMS
                  </div>
                  <h3 className="text-lg font-bold text-white tech-id mt-0.5">
                    {selectedTransport.trNumber}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTransport(null)}
                  className="p-1.5 rounded-lg text-[#718aa6] hover:text-white hover:bg-[#14263c] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1.5">
                  <div className="text-[11px] text-[#7d96b2] font-semibold">Transport Specifications</div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Description:</span>
                    <span className="text-white font-medium text-end max-w-[200px] truncate">{selectedTransport.description}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Request Owner:</span>
                    <span className="font-bold text-white tech-id">{selectedTransport.owner}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Route:</span>
                    <span className="font-mono text-cyan-300 font-bold">
                      {selectedTransport.sourceSystem} → {selectedTransport.targetSystem}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Return Code:</span>
                    <span className="font-mono font-bold text-white">{selectedTransport.returnCode}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#88a2bd]">Import Date:</span>
                    <span className="font-mono text-[#91a6bc]">{selectedTransport.importDate}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px]">
                  <strong>Phase 1 Read-Only:</strong> Transport import execution (import request into target system) is disabled.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTransport(null)}
              className="w-full py-2 rounded-lg bg-[#14263c] hover:bg-[#1a334f] text-cyan-200 text-xs font-semibold border border-[#233f5d] transition-colors"
            >
              Close Transport Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
