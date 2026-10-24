import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_SYSTEMS } from '../../data/fixtures';
import { Server, Activity, Database, CheckCircle2, AlertTriangle } from 'lucide-react';

export const SystemsPage: React.FC = () => {
  const { t, navigate } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('systemsTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('systemsSub')}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
          {t('demoBadge')}
        </span>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_SYSTEMS.map((sys) => (
          <div
            key={sys.sid}
            className="bg-[#101f31] border border-[#263a50] rounded-xl p-4 space-y-4 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#153149] text-cyan-300 tech-id">
                    {sys.sid}
                  </span>
                  <span className="text-sm font-bold text-white">{sys.name}</span>
                </div>
                <div className="text-[11px] text-[#91a6bc] mt-1">{sys.role}</div>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  sys.status === 'Healthy'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}
              >
                {sys.status}
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-[#0c1a29] border border-[#203349]">
                <div className="text-[10px] text-[#91a6bc]">App Instances</div>
                <div className="font-bold text-white mt-0.5 tech-id">{sys.appInstances}</div>
              </div>
              <div className="p-2 rounded-lg bg-[#0c1a29] border border-[#203349]">
                <div className="text-[10px] text-[#91a6bc]">Work Processes</div>
                <div className="font-bold text-white mt-0.5 tech-id">
                  {sys.workProcessesActive} / {sys.workProcessesTotal}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[#0c1a29] border border-[#203349]">
                <div className="text-[10px] text-[#91a6bc]">Dialog Resp.</div>
                <div className="font-bold text-white mt-0.5 tech-id">{sys.dialogResponseMs} ms</div>
              </div>
            </div>

            {/* Technical Metadata */}
            <div className="space-y-1.5 text-xs text-[#91a6bc] pt-2 border-t border-[#263a50]/60">
              <div className="flex justify-between">
                <span>Release:</span>
                <span className="text-white tech-id">{sys.release}</span>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="text-white tech-id">{sys.dbType}</span>
              </div>
              <div className="flex justify-between">
                <span>DB Host:</span>
                <span className="text-white tech-id">{sys.dbHost}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Backup:</span>
                <span className="text-[#a0b5cb] tech-id">{sys.lastBackup}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
