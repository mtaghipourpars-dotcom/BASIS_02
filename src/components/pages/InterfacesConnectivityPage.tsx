import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CONNECTIVITY_DATA } from '../../data/fixtures';
import { Share2, Radio, Server, CheckCircle2, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';

interface InterfaceDetail {
  id: string;
  name: string;
  type: 'RFC' | 'IDoc' | 'HTTP' | 'WebSocket';
  targetHost: string;
  client: string;
  status: 'Online' | 'Error' | 'Degraded';
  avgLatencyMs: number;
  lastChecked: string;
  errorDetail?: string;
}

const DEMO_INTERFACES: InterfaceDetail[] = [
  {
    id: 'RFC-SM59-PRD-QAS',
    name: 'QAS_000_TRUSTED',
    type: 'RFC',
    targetHost: 'sap-qas01.corp.local',
    client: '000',
    status: 'Online',
    avgLatencyMs: 14,
    lastChecked: '14:30',
  },
  {
    id: 'RFC-SM59-PRD-SOL',
    name: 'SOL_700_BACK',
    type: 'RFC',
    targetHost: 'sap-sol01.corp.local',
    client: '700',
    status: 'Error',
    avgLatencyMs: 180,
    lastChecked: '14:02',
    errorDetail: 'RFC communication failure: connection refused on port 3300 (WSAECONNREFUSED)',
  },
  {
    id: 'IDOC-INBOUND-SALES',
    name: 'ORDERS05_INBOUND',
    type: 'IDoc',
    targetHost: 'sap-prd01.corp.local',
    client: '800',
    status: 'Online',
    avgLatencyMs: 8,
    lastChecked: '14:28',
  },
  {
    id: 'HTTP-SICF-OData',
    name: '/sap/opu/odata/IWFND/CATALOGSERVICE',
    type: 'HTTP',
    targetHost: 'sap-prd01.corp.local:44300',
    client: '800',
    status: 'Online',
    avgLatencyMs: 24,
    lastChecked: '14:25',
  },
  {
    id: 'MSG-PI-AEX',
    name: 'SAP_PO_INTEGRATION_PI01',
    type: 'WebSocket',
    targetHost: 'sap-po01.corp.local:50000',
    client: '001',
    status: 'Online',
    avgLatencyMs: 35,
    lastChecked: '14:20',
  },
];

export const InterfacesConnectivityPage: React.FC = () => {
  const { t } = useApp();
  const [selectedInterface, setSelectedInterface] = useState<InterfaceDetail | null>(null);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('interfacesConnTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">
            RFC destinations (SM59), IDoc inbound/outbound queues, HTTP/OData services (SICF).
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CONNECTIVITY_DATA.map((conn, idx) => (
          <div
            key={idx}
            className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 flex items-center justify-between"
          >
            <div>
              <div className="text-[11px] text-[#718aa6] font-medium">{conn.type}</div>
              <div className="text-2xl font-bold text-white mt-1 tech-id">{conn.total}</div>
              <div
                className={`text-[10px] font-semibold mt-0.5 ${
                  conn.errors > 0 ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {conn.errors > 0 ? `${conn.errors} Failed Destination` : 'All Available'}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0070f2]/10 border border-[#0070f2]/30 text-[#3894ff] flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Interface Detail Table */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-white">Authoritative Interface Directory</h2>
        <div className="overflow-x-auto border border-[#19273a] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">DESTINATION / SERVICE</th>
                <th className="py-2.5 px-3 text-start">TYPE</th>
                <th className="py-2.5 px-3 text-start">TARGET HOST</th>
                <th className="py-2.5 px-3 text-start">CLIENT</th>
                <th className="py-2.5 px-3 text-start">LATENCY</th>
                <th className="py-2.5 px-3 text-start">LAST CHECK</th>
                <th className="py-2.5 px-3 text-start">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {DEMO_INTERFACES.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedInterface(item)}
                  className="hover:bg-[#102237] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-semibold text-white tech-id">{item.name}</td>
                  <td className="py-2.5 px-3 text-[#9bb3cc] tech-id">{item.type}</td>
                  <td className="py-2.5 px-3 text-[#7892ad] tech-id">{item.targetHost}</td>
                  <td className="py-2.5 px-3 text-[#9bb3cc] tech-id">{item.client}</td>
                  <td className="py-2.5 px-3 text-[#9bb3cc] tech-id">{item.avgLatencyMs} ms</td>
                  <td className="py-2.5 px-3 text-[#7892ad] tech-id">{item.lastChecked}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Interface Drawer/Modal */}
      {selectedInterface && (
        <div className="p-4 rounded-xl bg-[#0e1d2f] border border-[#1b2b40] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2b40]">
            <div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider tech-id">
                {selectedInterface.id}
              </span>
              <h3 className="text-base font-bold text-white mt-0.5 tech-id">
                {selectedInterface.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setSelectedInterface(null)}
              className="px-2.5 py-1 rounded bg-[#15273d] hover:bg-[#1a3350] text-xs text-[#9bb3cc] hover:text-white"
            >
              Close
            </button>
          </div>

          {selectedInterface.errorDetail && (
            <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs">
              <strong>Error Trace:</strong> {selectedInterface.errorDetail}
            </div>
          )}

          <div className="p-3 rounded-lg bg-[#081321] border border-[#19273a] text-xs text-[#718aa6] flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Connection test / ping execution disabled in Phase 1 read-only monitoring.</span>
          </div>
        </div>
      )}
    </div>
  );
};
