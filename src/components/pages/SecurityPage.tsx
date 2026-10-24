import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  SECURITY_SESSION_RECORDS,
  ENQUEUE_LOCKS,
  SECURITY_DATA,
} from '../../data/fixtures';
import {
  Shield,
  Users,
  Lock,
  Key,
  AlertTriangle,
  Search,
  Filter,
  X,
  ShieldAlert,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const { t } = useApp();
  const [userSearch, setUserSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('ALL');
  const [selectedSession, setSelectedSession] = useState<(typeof SECURITY_SESSION_RECORDS)[0] | null>(null);
  const [selectedLock, setSelectedLock] = useState<(typeof ENQUEUE_LOCKS)[0] | null>(null);

  const filteredSessions = SECURITY_SESSION_RECORDS.filter((s) => {
    const matchesClient = clientFilter === 'ALL' || s.client === clientFilter;
    const q = userSearch.toLowerCase();
    const matchesUser =
      !q ||
      s.user.toLowerCase().includes(q) ||
      s.tcode.toLowerCase().includes(q) ||
      s.terminal.toLowerCase().includes(q);
    return matchesClient && matchesUser;
  });

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto">
      {/* Page Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span>{t('securityTitle')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">{t('securitySub')}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800">
            STRUST PKI Monitored
          </span>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Active Dialog Logins (SM04)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">443 Users</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">PAS: 245 · AAS: 198</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Enqueue Lock Entries (SM12)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">{ENQUEUE_LOCKS.length} Locks</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">No orphaned enqueue records</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Security Audit Alerts (SM21)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">3 Events</div>
          <div className="text-[10px] text-amber-400 mt-0.5">Within normal threshold · Client 800</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Certificates Expiry in 7 Days</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tech-id">1 Expiry</div>
          <div className="text-[10px] text-amber-300 mt-0.5">SSL Server Standard PSE renewal</div>
        </div>
      </div>

      {/* Main 12-Column Grid: User Sessions (8/12) + Enqueue Locks (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8/12: Active User Sessions (SM04) */}
        <div className="lg:col-span-8 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b2b40]">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Active User Sessions (SM04 Evidence)</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">
                Observed active sessions across dispatchers. Select row to view privileges.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute inset-y-0 start-2.5 my-auto w-3.5 h-3.5 text-[#5e7794] pointer-events-none" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user or T-Code..."
                  className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 ps-8 pe-3 text-xs text-white placeholder-[#5e7794] focus:outline-none focus:border-cyan-500"
                />
              </div>

              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Clients</option>
                <option value="800">Client 800</option>
                <option value="000">Client 000</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-[#18273b] rounded-lg">
            <table className="w-full text-xs text-start border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                  <th className="py-2.5 px-3 text-start">CLIENT</th>
                  <th className="py-2.5 px-3 text-start">USER ID</th>
                  <th className="py-2.5 px-3 text-start">TERMINAL IP</th>
                  <th className="py-2.5 px-3 text-start">CURRENT T-CODE</th>
                  <th className="py-2.5 px-3 text-start">LOGON TIME</th>
                  <th className="py-2.5 px-3 text-start">SESSIONS</th>
                  <th className="py-2.5 px-3 text-start">MEMORY (KB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#132235]">
                {filteredSessions.map((sess, idx) => (
                  <tr
                    key={idx}
                    onClick={() => setSelectedSession(sess)}
                    className="hover:bg-[#102237] cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 font-semibold text-cyan-300 tech-id">{sess.client}</td>
                    <td className="py-2.5 px-3 font-bold text-white tech-id">{sess.user}</td>
                    <td className="py-2.5 px-3 text-[#91a6bc] font-mono text-[11px]">{sess.terminal}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400 tech-id">{sess.tcode}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{sess.time}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] tech-id">{sess.sessions}</td>
                    <td className="py-2.5 px-3 text-[#d9e6f3] font-mono">{sess.memoryKb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 4/12: Enqueue Locks (SM12) */}
        <div className="lg:col-span-4 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-[#1b2b40]">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Active Enqueue Locks (SM12)</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">Current lock table entries</div>
            </div>

            <div className="space-y-3 pt-3">
              {ENQUEUE_LOCKS.map((lock, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedLock(lock)}
                  className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] hover:border-cyan-500/50 cursor-pointer transition-colors space-y-1.5"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white tech-id">{lock.table}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                      {lock.mode}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-cyan-300 truncate">
                    {lock.lockArg}
                  </div>
                  <div className="flex justify-between text-[10px] text-[#718aa6]">
                    <span>User: <strong className="text-white">{lock.user}</strong> (Cli {lock.client})</span>
                    <span>{lock.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px]">
            <strong>Phase 1 Read-Only:</strong> Releasing or deleting lock entries via SM12 is disabled.
          </div>
        </div>
      </div>

      {/* Bottom: Risk Categories & Security Audit Summary */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
        <div className="pb-2 border-b border-[#1b2b40]">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>Risk Categories &amp; Security Findings Distribution</span>
          </h2>
          <div className="text-xs text-[#7d96b2]">
            Relative distribution of verified operational security observations
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {SECURITY_DATA.topRiskCategories.map((cat, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">{cat.category}</span>
                <span className="font-mono text-cyan-400 font-bold">{cat.percentage}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#132338]">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-[#091522] border border-[#15283e] text-xs text-[#718aa6] flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Detailed authorization role assignment audit (PFCG / SU01) shows neutral unconfigured state pending dedicated security catalog connection.
          </span>
        </div>
      </div>

      {/* Session Evidence Drawer */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
          <div className="bg-[#0b1727] border-s border-[#1b2b40] w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2b40]">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    Session Record · SM04
                  </div>
                  <h3 className="text-lg font-bold text-white tech-id mt-0.5">
                    User: {selectedSession.user}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSession(null)}
                  className="p-1.5 rounded-lg text-[#718aa6] hover:text-white hover:bg-[#14263c] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1.5">
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Client:</span>
                    <span className="font-bold text-white tech-id">{selectedSession.client}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Terminal Address:</span>
                    <span className="font-mono text-cyan-300">{selectedSession.terminal}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Active Transaction:</span>
                    <span className="font-bold text-emerald-400 font-mono">{selectedSession.tcode}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Logon Timestamp:</span>
                    <span className="font-mono text-white">{selectedSession.time}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#88a2bd]">Memory Consumption:</span>
                    <span className="font-mono text-white">{selectedSession.memoryKb} KB</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px]">
                  <strong>Phase 1 Read-Only:</strong> Session termination (delete session via SM04) or locking user accounts is disabled.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedSession(null)}
              className="w-full py-2 rounded-lg bg-[#14263c] hover:bg-[#1a334f] text-cyan-200 text-xs font-semibold border border-[#233f5d] transition-colors"
            >
              Close Session Detail
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
