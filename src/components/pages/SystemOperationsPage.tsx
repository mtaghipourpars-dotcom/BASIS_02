import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Workflow,
  Server,
  Activity,
  Clock,
  Database,
  Shield,
  FileText,
  Share2,
  Package,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  X,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { PageId } from '../../types';
import { CapabilityTrackStatus } from '../common/CapabilityTrackStatus';
import { WarningRulePanel } from '../common/WarningRulePanel';
import { ControlledActionPanel } from '../common/ControlledActionPanel';
import { WARNING_RULES, CONTROLLED_ACTIONS } from '../../data/mweRegistry';
import { EntityDetailDrawer, EntityDetailData } from '../common/EntityDetailDrawer';

interface DomainMatrixItem {
  id: PageId;
  nameKey: string;
  domainNumber: string;
  icon: React.ReactNode;
  status: 'Healthy' | 'Attention' | 'Critical';
  summary: string;
  activeItemCount: string;
  freshness: string;
  coveragePct: number;
}

export const SystemOperationsPage: React.FC = () => {
  const { navigate, t, setSelectedSystem } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<DomainMatrixItem | null>(null);

  const domainMatrix: DomainMatrixItem[] = [
    {
      id: 'landscape',
      nameKey: 'landscape',
      domainNumber: 'Island 01',
      icon: <Server className="w-4 h-4 text-cyan-400" />,
      status: 'Attention',
      summary: '7 of 8 systems running; PRD02 reporting high CPU load.',
      activeItemCount: '8 Systems',
      freshness: '14:32:00',
      coveragePct: 100,
    },
    {
      id: 'performance',
      nameKey: 'performance',
      domainNumber: 'Island 02',
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      status: 'Healthy',
      summary: 'Dialog response times 410ms; Host CPU 54% across cluster.',
      activeItemCount: '4 Measures',
      freshness: '14:32:00',
      coveragePct: 95,
    },
    {
      id: 'jobs-processes',
      nameKey: 'jobsProcesses',
      domainNumber: 'Island 03',
      icon: <Clock className="w-4 h-4 text-cyan-400" />,
      status: 'Attention',
      summary: '1 batch job aborted (QM_REPET_INSP / REF-SM37-L2583).',
      activeItemCount: '5 Excerpts',
      freshness: '14:30:00',
      coveragePct: 80,
    },
    {
      id: 'database',
      nameKey: 'database',
      domainNumber: 'Island 04',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      status: 'Healthy',
      summary: 'HANA memory allocated 79%; HSR synchronous replication active.',
      activeItemCount: '98% Health',
      freshness: '14:32:10',
      coveragePct: 100,
    },
    {
      id: 'security',
      nameKey: 'security',
      domainNumber: 'Island 05',
      icon: <Shield className="w-4 h-4 text-cyan-400" />,
      status: 'Attention',
      summary: '1 certificate expiring in 7 days; 3 SM21 security events.',
      activeItemCount: '443 Sessions',
      freshness: '14:30:00',
      coveragePct: 85,
    },
    {
      id: 'alerts-events',
      nameKey: 'alertsEvents',
      domainNumber: 'Island 06',
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      status: 'Critical',
      summary: '1 ABAP dump (TSV_TNEW_PAGE_ALLOC_FAILED) requires memory tuning.',
      activeItemCount: '4 Events',
      freshness: '14:32:00',
      coveragePct: 100,
    },
    {
      id: 'interfaces-connectivity',
      nameKey: 'interfacesConnectivity',
      domainNumber: 'Island 07',
      icon: <Share2 className="w-4 h-4 text-cyan-400" />,
      status: 'Attention',
      summary: 'RFC QAS destination active; SOL destination unreachable.',
      activeItemCount: '1 Error',
      freshness: '14:30:00',
      coveragePct: 90,
    },
    {
      id: 'transports',
      nameKey: 'transports',
      domainNumber: 'Island 08',
      icon: <Package className="w-4 h-4 text-cyan-400" />,
      status: 'Attention',
      summary: '1 import failed with return code RC8; 4 requests pending in queue.',
      activeItemCount: '4 Pending',
      freshness: '14:20:00',
      coveragePct: 90,
    },
    {
      id: 'backup-recovery',
      nameKey: 'backupRecovery',
      domainNumber: 'Island 09',
      icon: <HardDrive className="w-4 h-4 text-cyan-400" />,
      status: 'Healthy',
      summary: 'HANA full database backup completed RC 0; log shipping active.',
      activeItemCount: 'RC 0 Verified',
      freshness: '14:15:00',
      coveragePct: 100,
    },
    {
      id: 'system-operations',
      nameKey: 'systemOperations',
      domainNumber: 'Island 10',
      icon: <Workflow className="w-4 h-4 text-cyan-400" />,
      status: 'Healthy',
      summary: 'Cross-domain telemetry synchronization operational.',
      activeItemCount: '10 Domains',
      freshness: 'Live Engine',
      coveragePct: 100,
    },
  ];

  const filteredMatrix = domainMatrix.filter((d) => {
    return filterStatus === 'ALL' || d.status === filterStatus;
  });

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Workflow className="w-6 h-6 text-cyan-400" />
            <span>{t('systemOperations')} · Coordination Workspace</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">
            Cross-domain operational coordination matrix tracking all ten operational islands.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <CapabilityTrackStatus
            islandName={t('systemOperations')}
            wStatus="Configured"
            activeFindingsCount={WARNING_RULES.filter((r) => r.islandId === 'system-operations').flatMap((r) => r.findings || []).length}
          />
        </div>
      </div>

      {/* Top: Operational Coordination Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Monitored Domains</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">10 Islands</div>
          <div className="text-[10px] text-cyan-300 mt-0.5">Authoritative spec compliance</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Normal / Healthy Domains</div>
          <div className="text-2xl font-bold text-[#55d6a1] mt-1 tech-id">4 Domains</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Performance, DB, Backup, Ops</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Attention / Warnings</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tech-id">5 Domains</div>
          <div className="text-[10px] text-amber-300 mt-0.5">Landscape, Jobs, Security, RFC, Transports</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Critical Action Finding</div>
          <div className="text-2xl font-bold text-rose-400 mt-1 tech-id">1 Domain</div>
          <div className="text-[10px] text-rose-300 mt-0.5">Island 06: TSV ABAP Dump</div>
        </div>
      </div>

      {/* Main 12-Column Grid: Cross-Domain Matrix (8/12) + Prioritized Issues Panel (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8/12: Visual Cross-Domain Matrix */}
        <div className="lg:col-span-8 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b2b40]">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Operational Health Matrix (10 Domains)</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">
                State-aggregation rule: lowest denominator reported finding
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All States</option>
                <option value="Critical">Critical Only</option>
                <option value="Attention">Attention Only</option>
                <option value="Healthy">Healthy Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-[#18273b] rounded-lg">
            <table className="w-full text-xs text-start border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                  <th className="py-2.5 px-3 text-start">DOMAIN</th>
                  <th className="py-2.5 px-3 text-start">REPORTED STATE</th>
                  <th className="py-2.5 px-3 text-start">VALIDATED SUMMARY FINDINGS</th>
                  <th className="py-2.5 px-3 text-start">FRESHNESS</th>
                  <th className="py-2.5 px-3 text-start">COVERAGE</th>
                  <th className="py-2.5 px-3 text-end">NAVIGATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#132235]">
                {filteredMatrix.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedDomain(item)}
                    className="hover:bg-[#102237] cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 font-semibold text-white">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <div>
                          <div className="text-white hover:text-cyan-300 transition-colors">
                            {t(item.nameKey)}
                          </div>
                          <div className="text-[10px] text-[#718aa6] tech-id">{item.domainNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === 'Critical'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : item.status === 'Attention'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] max-w-xs truncate">{item.summary}</td>
                    <td className="py-2.5 px-3 text-[#7d96b2] font-mono text-[11px]">{item.freshness}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-mono text-cyan-300 font-bold">{item.coveragePct}%</span>
                    </td>
                    <td className="py-2.5 px-3 text-end">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(item.id);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#13283f] hover:bg-[#1d3d5f] text-cyan-300 text-[11px] font-semibold border border-[#274e76] transition-colors"
                      >
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4/12: Prioritized Cross-Domain Issues Panel */}
        <div className="lg:col-span-4 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-[#1b2b40]">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Prioritized Cross-Domain Issues</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">
                Actionable findings with direct island navigation
              </div>
            </div>

            <div className="space-y-3 pt-3">
              {/* Finding 1: ST22 Dump */}
              <div
                onClick={() => navigate('alerts-events')}
                className="p-3 rounded-lg bg-rose-950/20 border border-rose-800/40 hover:border-rose-500 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-rose-300">Island 06 · Logs &amp; Dumps</span>
                  <span className="text-[10px] font-bold text-rose-400">13:12</span>
                </div>
                <div className="text-white font-medium text-xs">TSV_TNEW_PAGE_ALLOC_FAILED</div>
                <div className="text-[11px] text-[#91a6bc]">Internal table memory limit exceeded on ZSD_ORDER_EXTRACT.</div>
              </div>

              {/* Finding 2: RFC error */}
              <div
                onClick={() => navigate('interfaces-connectivity')}
                className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 hover:border-amber-500 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-300">Island 07 · Interfaces</span>
                  <span className="text-[10px] font-bold text-amber-400">14:02</span>
                </div>
                <div className="text-white font-medium text-xs">SOL_700_BACK WSAECONNREFUSED</div>
                <div className="text-[11px] text-[#91a6bc]">Solution Manager RFC port 3300 refused connection.</div>
              </div>

              {/* Finding 3: Transport RC8 */}
              <div
                onClick={() => navigate('transports')}
                className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 hover:border-amber-500 cursor-pointer transition-colors space-y-1"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-300">Island 08 · Transports</span>
                  <span className="text-[10px] font-bold text-amber-400">Apr 24</span>
                </div>
                <div className="text-white font-medium text-xs">PRDK900388 Import Failed (RC8)</div>
                <div className="text-[11px] text-[#91a6bc]">HCM Payroll Calculation syntax error in QA import.</div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#091522] border border-[#15283e] text-[11px] text-[#718aa6]">
            Cross-domain state rule: Lowest denominator status determines island health. All links preserve system context.
          </div>
        </div>
      </div>

      {/* M / W / E Capability Layer: Warning Rules & Controlled Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <WarningRulePanel
            rules={WARNING_RULES.filter((r) => r.islandId === 'system-operations')}
          />
        </div>
        <div className="lg:col-span-5">
          <ControlledActionPanel
            actions={CONTROLLED_ACTIONS.filter((a) => a.islandId === 'system-operations')}
            selectedEntityName={selectedDomain ? `${selectedDomain.domainNumber} (${selectedDomain.id})` : 'Landscape Incident Coordinator'}
          />
        </div>
      </div>

      {/* Selected Domain Detail Drawer via Unified EntityDetailDrawer */}
      <EntityDetailDrawer
        isOpen={!!selectedDomain}
        entity={
          selectedDomain
            ? {
                id: `DOM-${selectedDomain.id}`,
                name: `${selectedDomain.domainNumber}: ${t(selectedDomain.nameKey)}`,
                islandId: 'system-operations',
                entityType: 'Operational Island Domain',
                status: selectedDomain.status,
                attributes: {
                  'Domain Identifier': selectedDomain.domainNumber,
                  'Operational Island': t(selectedDomain.nameKey),
                  'Health Status': selectedDomain.status,
                  'Telemetry Freshness': selectedDomain.freshness,
                  'Evidence Coverage': `${selectedDomain.coveragePct}%`,
                  'Monitored Scope': selectedDomain.activeItemCount,
                  'Executive Summary': selectedDomain.summary,
                },
                sourceArtifact: 'SAP Solution Manager / Operations Coordinator Matrix',
                sourceLocator: `MATRIX_${selectedDomain.domainNumber}_${selectedDomain.id.toUpperCase()}`,
                observedAt: '1405-02-14 10:14:00 (Jalali)',
                confidence: 'High',
                provenanceNotes:
                  'Synthesized domain health status. Automated remediation sequences and landscape freeze triggers are strictly disabled in Phase 1.',
                provenanceNotesFa:
                  'ثبت هماهنگی عملیاتی جزیره. خودکارسازی توالی‌های اصلاحی و توقف سامانه در فاز اول غیرفعال است.',
                relatedRecords: [
                  { islandId: selectedDomain.id, title: t(selectedDomain.nameKey), id: `ISLAND_${selectedDomain.id}`, count: 1 },
                  { islandId: 'alerts-events', title: 'Correlated Warnings', id: 'CORR_WARN', count: 3 },
                ],
              }
            : null
        }
        onClose={() => setSelectedDomain(null)}
      />
    </div>
  );
};
