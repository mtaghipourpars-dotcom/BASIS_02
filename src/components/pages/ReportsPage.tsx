import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, CheckCircle2, FileCheck, Layers } from 'lucide-react';
import { SM37_ROWS, LANDSCAPE_SYSTEMS, PRIORITY_WARNINGS, DATABASE_STATUS } from '../../data/fixtures';

export const ReportsPage: React.FC = () => {
  const { t, locale } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const exportAuditJson = () => {
    const payload = {
      cockpit: 'BASIS_02 · SAP Basis Operations Cockpit',
      mode: 'READ_ONLY_OFFLINE_PROTOTYPE',
      extractedAt: new Date().toISOString(),
      systems: LANDSCAPE_SYSTEMS,
      database: DATABASE_STATUS,
      alerts: PRIORITY_WARNINGS,
      sm37SampleRows: SM37_ROWS,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `basis02-operational-audit-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('reportsTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('reportsSub')}</p>
        </div>
      </div>

      {/* Reports Checklist */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#263a50]">
          <div>
            <h2 className="text-sm font-semibold text-white">Daily SAP Basis Morning Checklist</h2>
            <div className="text-xs text-[#91a6bc]">Automated verification of core operational health gates</div>
          </div>
          <button
            type="button"
            onClick={exportAuditJson}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#123f53] hover:bg-[#1a556f] text-cyan-200 border border-[#25768b] text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{locale === 'fa' ? 'خروجی گزارش حسابرسی (JSON)' : 'Export Operational Audit (JSON)'}</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Audit dataset JSON file downloaded successfully.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-[#0c1a29] border border-[#203349] flex items-start gap-3">
            <FileCheck className="w-4 h-4 text-[#55d6a1] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">SM21 System Log Analysis</div>
              <div className="text-[11px] text-[#91a6bc] mt-0.5">
                No high-frequency lock or buffer overflow entries detected in last 24h.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#0c1a29] border border-[#203349] flex items-start gap-3">
            <FileCheck className="w-4 h-4 text-[#55d6a1] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">DB12 Backup Status</div>
              <div className="text-[11px] text-[#91a6bc] mt-0.5">
                All production full backups verified with return code 0.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#0c1a29] border border-[#203349] flex items-start gap-3">
            <FileCheck className="w-4 h-4 text-[#f4c36a] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">ST22 ABAP Dump Evaluation</div>
              <div className="text-[11px] text-[#91a6bc] mt-0.5">
                1 critical dump identified: TSV_TNEW_PAGE_ALLOC_FAILED during batch run.
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#0c1a29] border border-[#203349] flex items-start gap-3">
            <FileCheck className="w-4 h-4 text-[#55d6a1] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">SM04 & STMS Queue Compliance</div>
              <div className="text-[11px] text-[#91a6bc] mt-0.5">
                No locked import processes; user sessions operating within standard quotas.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
