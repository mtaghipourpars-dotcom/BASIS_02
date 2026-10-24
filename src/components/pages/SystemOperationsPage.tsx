import React from 'react';
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
} from 'lucide-react';
import { PageId } from '../../types';

interface DomainMatrixItem {
  id: PageId;
  nameKey: string;
  domainNumber: string;
  status: 'Healthy' | 'Attention' | 'Critical';
  summary: string;
  activeItemCount: string;
}

export const SystemOperationsPage: React.FC = () => {
  const { navigate, t } = useApp();

  const domainMatrix: DomainMatrixItem[] = [
    {
      id: 'landscape',
      nameKey: 'landscape',
      domainNumber: 'Island 01',
      status: 'Attention',
      summary: '7 of 8 systems running; PRD02 reporting critical degradation.',
      activeItemCount: '8 Systems',
    },
    {
      id: 'performance',
      nameKey: 'performance',
      domainNumber: 'Island 02',
      status: 'Healthy',
      summary: 'Dialog response times 128ms; CPU 32% across cluster.',
      activeItemCount: '4 Metrics',
    },
    {
      id: 'jobs-processes',
      nameKey: 'jobsProcesses',
      domainNumber: 'Island 03',
      status: 'Attention',
      summary: '1 batch job aborted (QM_REPET_INSP / DEMO-SM37-L2583).',
      activeItemCount: '245 Jobs',
    },
    {
      id: 'database',
      nameKey: 'database',
      domainNumber: 'Island 04',
      status: 'Healthy',
      summary: 'HANA memory allocated 79%; HSR synchronous replication active.',
      activeItemCount: '98% Health',
    },
    {
      id: 'security',
      nameKey: 'security',
      domainNumber: 'Island 05',
      status: 'Attention',
      summary: '2 blocked users; 18 failed logon attempts within normal thresholds.',
      activeItemCount: '2 Blocked',
    },
    {
      id: 'alerts-events',
      nameKey: 'alertsEvents',
      domainNumber: 'Island 06',
      status: 'Critical',
      summary: '1 ABAP dump (TSV_TNEW_PAGE_ALLOC_FAILED) requires memory tuning.',
      activeItemCount: '4 Events',
    },
    {
      id: 'interfaces-connectivity',
      nameKey: 'interfacesConnectivity',
      domainNumber: 'Island 07',
      status: 'Attention',
      summary: 'RFC QAS connection active; SOL destination currently unreachable.',
      activeItemCount: '1 Error',
    },
    {
      id: 'transports',
      nameKey: 'transports',
      domainNumber: 'Island 08',
      status: 'Attention',
      summary: '1 import failed with return code RC8; 4 requests pending in queue.',
      activeItemCount: '4 Pending',
    },
    {
      id: 'backup-recovery',
      nameKey: 'backupRecovery',
      domainNumber: 'Island 09',
      status: 'Healthy',
      summary: 'Full daily backup completed successfully (RC 0); log shipment verified.',
      activeItemCount: '98% DR Ready',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-cyan-400" />
            <span>{t('systemOperations')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">
            Consolidated operational coordination matrix across all ten Basis engineering domains.
          </p>
        </div>
      </div>

      {/* Cross-Domain Operational Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domainMatrix.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.id)}
            className="bg-[#0b1727] hover:bg-[#0e1d32] border border-[#1b2b40] rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all hover:border-cyan-500/50 space-y-3 group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider tech-id">
                  {item.domainNumber}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    item.status === 'Healthy'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : item.status === 'Attention'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1 group-hover:text-cyan-300 transition-colors">
                {t(item.nameKey)}
              </h3>
              <p className="text-xs text-[#8ea4be] mt-1 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#18273b] text-xs">
              <span className="text-[11px] font-mono text-[#718aa6] tech-id">
                {item.activeItemCount}
              </span>
              <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform rtl:group-hover:-translate-x-0.5">
                <span>View Domain</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Operational Shift Handovers & Safety Guardrails */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-semibold text-white">Daily Operational Governance</h2>
        <div className="text-xs text-[#8ea4be] leading-relaxed">
          The System Operations matrix reconciles shared evidence across all operational domains.
          Phase 1 is strictly read-only: no SAP instance restarts, database failovers, transport imports,
          or background job terminations are triggered.
        </div>
      </div>
    </div>
  );
};
