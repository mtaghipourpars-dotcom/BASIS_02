import React from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_SECURITY_SESSIONS } from '../../data/fixtures';
import { Shield, Users, Lock, AlertTriangle, Key } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {t('securityTitle')}
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('securitySub')}</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2c2518] text-[#f4c36a] border border-[#8c6e35]">
          {t('demoBadge')}
        </span>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">Active Dialog Logins (SM04)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">443</div>
          <div className="text-[10px] text-cyan-400 mt-1">PAS: 245, AAS: 198</div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">Emergency Accounts (SAP* / DDIC)</div>
          <div className="text-2xl font-bold text-[#55d6a1] mt-1 tech-id">Locked</div>
          <div className="text-[10px] text-emerald-400 mt-1">login/no_automatic_user_sapstar = 1</div>
        </div>

        <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
          <div className="text-[11px] text-[#91a6bc]">Failed Logon Attempts Today</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tech-id">3</div>
          <div className="text-[10px] text-[#91a6bc] mt-1">Client 800 · Normal security threshold</div>
        </div>
      </div>

      {/* Active User Sessions Table */}
      <div className="bg-[#101f31] border border-[#263a50] rounded-xl p-4">
        <h2 className="text-sm font-semibold text-white mb-3">{t('activeSessions')}</h2>
        <div className="overflow-x-auto border border-[#263a50] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-[#0c1a29] border-b border-[#263a50] text-[#91a7bd]">
                <th className="py-2.5 px-3 text-start">CLIENT</th>
                <th className="py-2.5 px-3 text-start">USER</th>
                <th className="py-2.5 px-3 text-start">TERMINAL IP</th>
                <th className="py-2.5 px-3 text-start">CURRENT T-CODE</th>
                <th className="py-2.5 px-3 text-start">LOGON TIME</th>
                <th className="py-2.5 px-3 text-start">SESSIONS</th>
                <th className="py-2.5 px-3 text-start">MEMORY (KB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#203349]">
              {DEMO_SECURITY_SESSIONS.map((sess, idx) => (
                <tr key={idx} className="hover:bg-[#13283b]">
                  <td className="py-2.5 px-3 font-semibold text-cyan-300 tech-id">{sess.client}</td>
                  <td className="py-2.5 px-3 font-semibold text-white tech-id">{sess.user}</td>
                  <td className="py-2.5 px-3 text-[#91a6bc] tech-id">{sess.terminal}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400 tech-id">{sess.tcode}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{sess.time}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{sess.sessions}</td>
                  <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{sess.memoryKb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
