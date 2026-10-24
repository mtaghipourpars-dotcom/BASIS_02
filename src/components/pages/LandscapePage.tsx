import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LANDSCAPE_SYSTEMS,
  INSTANCE_DIRECTORY,
  SystemInstanceDetail,
} from '../../data/fixtures';
import { LandscapeSystemItem } from '../../types';
import {
  Network,
  Server,
  HardDrive,
  Globe,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Search,
  X,
  Activity,
  Layers,
  Database,
  ShieldAlert,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { CapabilityTrackStatus } from '../common/CapabilityTrackStatus';
import { WarningRulePanel } from '../common/WarningRulePanel';
import { ControlledActionPanel } from '../common/ControlledActionPanel';
import { WARNING_RULES, CONTROLLED_ACTIONS } from '../../data/mweRegistry';

export const LandscapePage: React.FC = () => {
  const { t, locale, selectedSystem, setSelectedSystem, navigate } = useApp();
  const [envFilter, setEnvFilter] = useState<string>('ALL');
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInstance, setSelectedInstance] = useState<SystemInstanceDetail | null>(null);

  // Filter instances
  const filteredInstances = INSTANCE_DIRECTORY.filter((inst) => {
    const matchesSys = selectedSystem === 'ALL' || inst.systemId === selectedSystem;
    const matchesEnv = envFilter === 'ALL' || inst.environment === envFilter;
    const matchesState = stateFilter === 'ALL' || inst.status === stateFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      inst.instanceId.toLowerCase().includes(q) ||
      inst.systemId.toLowerCase().includes(q) ||
      inst.host.toLowerCase().includes(q);
    return matchesSys && matchesEnv && matchesState && matchesSearch;
  });

  const activeSystemData: LandscapeSystemItem | undefined =
    selectedSystem !== 'ALL'
      ? LANDSCAPE_SYSTEMS.find((s) => s.id === selectedSystem)
      : LANDSCAPE_SYSTEMS[0];

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto">
      {/* Page Title & Context */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Network className="w-6 h-6 text-cyan-400" />
            <span>{t('systemLandscapeTitle')}</span>
          </h1>
          <p className="text-xs text-[#91a6bc] mt-1">
            Authoritative system &amp; instance directory (SM51), host bindings, and reported telemetry states.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <CapabilityTrackStatus
            islandName={t('systemLandscapeTitle')}
            wStatus="Configured"
            activeFindingsCount={WARNING_RULES.filter((r) => r.islandId === 'landscape').flatMap((r) => r.findings || []).length}
          />
          {selectedSystem !== 'ALL' && (
            <button
              type="button"
              onClick={() => setSelectedSystem('ALL')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14263c] border border-[#233f5d] text-cyan-300 text-xs font-semibold hover:bg-[#1a334f] transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Show All Systems ({selectedSystem})</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Distinct Systems Count</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">8 Systems</div>
          <div className="text-[10px] text-[#55d6a1] mt-0.5">Production: 4 · Quality: 1 · Dev/Test: 3</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Distinct Instances (SM51)</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">15 Registered</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">8 Key Monitored in Telemetry</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Reported States Distribution</div>
          <div className="text-2xl font-bold text-white mt-1 flex items-center gap-2 tech-id">
            <span className="text-[#55d6a1]">7 Running</span>
            <span className="text-xs text-[#718aa6]">|</span>
            <span className="text-amber-400">1 Attention</span>
          </div>
          <div className="text-[10px] text-[#718aa6] mt-0.5">0 Unknown · 1 Stopped (Sandbox)</div>
        </div>

        <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4">
          <div className="text-[11px] text-[#7d96b2] font-medium">Latest Source Observation</div>
          <div className="text-2xl font-bold text-white mt-1 tech-id">2m ago</div>
          <div className="text-[10px] text-cyan-300 mt-0.5 font-mono ltr-isolate">14:32:00 (SM51 / ST03N)</div>
        </div>
      </div>

      {/* Main 12-Column Grid: Topology (8/12) + Selected System Telemetry (4/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left 8/12: Visual Environment & Topology Architecture */}
        <div className="lg:col-span-8 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1b2b40]">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Environment &amp; System Topology</span>
              </h2>
              <div className="text-[11px] text-[#7d96b2]">
                Interactive system-to-instance architecture. Click any node to inspect telemetry.
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Running
              </span>
              <span className="inline-flex items-center gap-1 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Attention
              </span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-500" /> Stopped
              </span>
            </div>
          </div>

          {/* Topology Nodes Grid */}
          <div className="space-y-4">
            {/* PRD01 Cluster */}
            <div
              onClick={() => setSelectedSystem('PRD01')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedSystem === 'PRD01'
                  ? 'bg-[#10233b] border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-[#0e1d2f] border-[#1b2f48] hover:border-[#2a486e]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800 tech-id">
                    PRD01
                  </span>
                  <span className="text-xs font-bold text-white">S/4HANA Production Primary</span>
                  <span className="text-[10px] text-[#718aa6]">sap-prd01.corp.local</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Online (14ms latency)
                </span>
              </div>

              {/* Instances inside PRD01 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
                <div className="p-2.5 rounded-lg bg-[#0a1624] border border-[#192b42] text-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                    <span>ASCS00</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] text-[#718aa6] mt-0.5">Central Services</div>
                  <div className="text-[10px] text-cyan-300 mt-1 font-mono">Msg/Enq Server</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#0a1624] border border-[#192b42] text-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                    <span>PAS D01</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] text-[#718aa6] mt-0.5">Primary App Server</div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-mono">CPU 54% · Mem 68%</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#0a1624] border border-amber-800/60 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                    <span>AAS D02</span>
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                  <div className="text-[10px] text-[#718aa6] mt-0.5">Additional App Server</div>
                  <div className="text-[10px] text-amber-300 mt-1 font-mono">CPU 88% (High load)</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#0a1624] border border-[#192b42] text-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-white">
                    <span>HDB00</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] text-[#718aa6] mt-0.5">HANA In-Memory</div>
                  <div className="text-[10px] text-cyan-300 mt-1 font-mono">HSR Sync Active</div>
                </div>
              </div>
            </div>

            {/* QAS01 Cluster */}
            <div
              onClick={() => setSelectedSystem('QAS01')}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedSystem === 'QAS01'
                  ? 'bg-[#10233b] border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-[#0e1d2f] border-[#1b2f48] hover:border-[#2a486e]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800 tech-id">
                    QAS01
                  </span>
                  <span className="text-xs font-bold text-white">Quality Assurance &amp; Staging</span>
                  <span className="text-[10px] text-[#718aa6]">sap-qas01.corp.local</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Online (18ms latency)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-2 rounded-lg bg-[#0a1624] border border-[#192b42] text-xs">
                  <div className="text-white font-semibold text-[11px]">ASCS00 (Central Svc)</div>
                  <div className="text-[10px] text-emerald-400">Normal · Latency 18ms</div>
                </div>
                <div className="p-2 rounded-lg bg-[#0a1624] border border-[#192b42] text-xs">
                  <div className="text-white font-semibold text-[11px]">PAS D01 (App Server)</div>
                  <div className="text-[10px] text-emerald-400">CPU 32% · Mem 48%</div>
                </div>
                <div className="p-2 rounded-lg bg-[#0a1624] border border-[#192b42] text-xs">
                  <div className="text-white font-semibold text-[11px]">HDB00 (HANA DB)</div>
                  <div className="text-[10px] text-cyan-300">Standalone DB · Normal</div>
                </div>
              </div>
            </div>

            {/* DEV01 & TST01 Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div
                onClick={() => setSelectedSystem('DEV01')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedSystem === 'DEV01'
                    ? 'bg-[#10233b] border-cyan-500 ring-1 ring-cyan-500/30'
                    : 'bg-[#0e1d2f] border-[#1b2f48] hover:border-[#2a486e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 tech-id">
                    DEV01
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Running</span>
                </div>
                <div className="text-xs font-semibold text-white mt-1">Development Sandbox</div>
                <div className="text-[10px] text-[#718aa6] mt-0.5">D01 + HDB00 · sap-dev01.corp.local</div>
              </div>

              <div
                onClick={() => setSelectedSystem('TST01')}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedSystem === 'TST01'
                    ? 'bg-[#10233b] border-cyan-500 ring-1 ring-cyan-500/30'
                    : 'bg-[#0e1d2f] border-[#1b2f48] hover:border-[#2a486e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 tech-id">
                    TST01
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Running</span>
                </div>
                <div className="text-xs font-semibold text-white mt-1">Integration Test Cluster</div>
                <div className="text-[10px] text-[#718aa6] mt-0.5">D01 · sap-tst01.corp.local</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4/12: Selected System Summary & Context Links */}
        <div className="lg:col-span-4 bg-[#0b1727] border border-[#1b2b40] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-[#1b2b40]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                System Telemetry Summary
              </div>
              <div className="text-base font-bold text-white flex items-center gap-2 mt-1 tech-id">
                <span>{activeSystemData?.name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#13283f] text-cyan-300">
                  {activeSystemData?.id}
                </span>
              </div>
            </div>

            <div className="py-3 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#142336]">
                <span className="text-[#7d96b2]">Environment Role:</span>
                <span className="font-semibold text-white">{activeSystemData?.role}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#142336]">
                <span className="text-[#7d96b2]">Reported State:</span>
                <span
                  className={`font-semibold ${
                    activeSystemData?.status === 'Running'
                      ? 'text-[#55d6a1]'
                      : activeSystemData?.status === 'Warning'
                      ? 'text-amber-400'
                      : 'text-slate-400'
                  }`}
                >
                  {activeSystemData?.status}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#142336]">
                <span className="text-[#7d96b2]">App Host:</span>
                <span className="font-mono text-[#d9e6f3] text-[11px]">{activeSystemData?.host}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#142336]">
                <span className="text-[#7d96b2]">Database Host:</span>
                <span className="font-mono text-[#d9e6f3] text-[11px]">{activeSystemData?.dbHost}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#142336]">
                <span className="text-[#7d96b2]">Network Ping Latency:</span>
                <span className="font-mono text-cyan-300 font-bold">{activeSystemData?.latencyMs} ms</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#142336]">
                <span className="text-[#7d96b2]">Last Telemetry Poll:</span>
                <span className="font-mono text-[#91a6bc]">{activeSystemData?.lastUpdate}</span>
              </div>
            </div>

            {/* Context Actions with Preservation */}
            <div className="mt-4 pt-3 border-t border-[#1b2b40] space-y-2">
              <div className="text-[11px] font-semibold text-[#8ca4be]">
                Deep Dive in Other Operational Islands:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => navigate('performance', { system: activeSystemData?.id })}
                  className="p-2 rounded-lg bg-[#0e1d2f] hover:bg-[#152a42] border border-[#1b2f48] text-[11px] text-cyan-200 font-semibold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Performance</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('jobs-processes', { system: activeSystemData?.id })}
                  className="p-2 rounded-lg bg-[#0e1d2f] hover:bg-[#152a42] border border-[#1b2f48] text-[11px] text-cyan-200 font-semibold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Jobs (SM37)</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('database', { system: activeSystemData?.id })}
                  className="p-2 rounded-lg bg-[#0e1d2f] hover:bg-[#152a42] border border-[#1b2f48] text-[11px] text-cyan-200 font-semibold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Database</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('alerts-events', { system: activeSystemData?.id })}
                  className="p-2 rounded-lg bg-[#0e1d2f] hover:bg-[#152a42] border border-[#1b2f48] text-[11px] text-cyan-200 font-semibold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span>Logs &amp; Dumps</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#091522] border border-[#15283e] text-[11px] text-[#718aa6]">
            Phase 1 monitoring baseline · RFC ping test verified across configured routing tables.
          </div>
        </div>
      </div>

      {/* M / W / E Capability Layer: Warning Rules & Controlled Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <WarningRulePanel
            rules={WARNING_RULES.filter((r) => r.islandId === 'landscape')}
          />
        </div>
        <div className="lg:col-span-5">
          <ControlledActionPanel
            actions={CONTROLLED_ACTIONS.filter((a) => a.islandId === 'landscape')}
            selectedEntityName={selectedInstance?.instanceId || activeSystemData?.id}
          />
        </div>
      </div>

      {/* Bottom Full-Width Instance Inventory Table */}
      <div className="bg-[#0b1727] border border-[#1b2b40] rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#1b2b40]">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Instance Inventory &amp; Operational States (SM51)
            </h2>
            <div className="text-xs text-[#7d96b2]">
              Showing {filteredInstances.length} observed instances with raw source bindings
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute inset-y-0 start-2.5 my-auto w-3.5 h-3.5 text-[#5e7794] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search instance or host..."
                className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 ps-8 pe-3 text-xs text-white placeholder-[#5e7794] focus:outline-none focus:border-cyan-500"
              />
            </div>

            <select
              value={envFilter}
              onChange={(e) => setEnvFilter(e.target.value)}
              className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Environments</option>
              <option value="Production">Production</option>
              <option value="Quality">Quality</option>
              <option value="Development">Development</option>
              <option value="Test">Test</option>
            </select>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="bg-[#091322] border border-[#1b2b40] rounded-lg py-1 px-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All States</option>
              <option value="Running">Running</option>
              <option value="Degraded">Degraded</option>
              <option value="Stopped">Stopped</option>
            </select>
          </div>
        </div>

        {/* Table with Required Spec Columns: SID, Environment, Instance ID, Host, Reported State, Observed At, Source, Data State */}
        <div className="overflow-x-auto border border-[#18273b] rounded-lg">
          <table className="w-full text-xs text-start border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#091322] border-b border-[#1b2b40] text-[#7892ad]">
                <th className="py-2.5 px-3 text-start">SID / SYSTEM</th>
                <th className="py-2.5 px-3 text-start">ENVIRONMENT</th>
                <th className="py-2.5 px-3 text-start">INSTANCE ID</th>
                <th className="py-2.5 px-3 text-start">HOST</th>
                <th className="py-2.5 px-3 text-start">REPORTED STATE</th>
                <th className="py-2.5 px-3 text-start">OBSERVED AT</th>
                <th className="py-2.5 px-3 text-start">SOURCE</th>
                <th className="py-2.5 px-3 text-start">DATA STATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#132235]">
              {filteredInstances.map((inst) => (
                <tr
                  key={inst.instanceId}
                  onClick={() => setSelectedInstance(inst)}
                  className="hover:bg-[#102237] cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-bold text-cyan-300 tech-id">{inst.systemId}</td>
                  <td className="py-2.5 px-3 text-white">{inst.environment}</td>
                  <td className="py-2.5 px-3 font-semibold text-white tech-id">{inst.instanceId}</td>
                  <td className="py-2.5 px-3 text-[#91a6bc] font-mono text-[11px]">{inst.host}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        inst.status === 'Running'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : inst.status === 'Degraded'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {inst.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#91a6bc] tech-id">{inst.observedAt}</td>
                  <td className="py-2.5 px-3 text-[#7892ad] tech-id">{inst.source}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        inst.dataState === 'NORMAL'
                          ? 'bg-emerald-950/60 text-emerald-300'
                          : 'bg-amber-950/60 text-amber-300'
                      }`}
                    >
                      {inst.dataState}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Instance Evidence Drawer */}
      {selectedInstance && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-end">
          <div className="bg-[#0b1727] border-s border-[#1b2b40] w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2b40]">
                <div>
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    Source Evidence · Read Only
                  </div>
                  <h3 className="text-lg font-bold text-white tech-id mt-0.5">
                    {selectedInstance.instanceId}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInstance(null)}
                  className="p-1.5 rounded-lg text-[#718aa6] hover:text-white hover:bg-[#14263c] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1.5">
                  <div className="text-[11px] text-[#7d96b2] font-semibold">Instance Specifications</div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">System ID:</span>
                    <span className="font-bold text-white tech-id">{selectedInstance.systemId}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Instance Type:</span>
                    <span className="font-bold text-cyan-300">{selectedInstance.instanceType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Instance Number:</span>
                    <span className="font-mono text-white">{selectedInstance.instanceNumber}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Network Host:</span>
                    <span className="font-mono text-white text-[11px]">{selectedInstance.host}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#88a2bd]">Reported State:</span>
                    <span className="font-semibold text-emerald-400">{selectedInstance.status}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0e1d2f] border border-[#1b2f48] space-y-1.5">
                  <div className="text-[11px] text-[#7d96b2] font-semibold">Telemetry &amp; Resource Load</div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Current CPU Load:</span>
                    <span className="font-mono text-white font-bold">{selectedInstance.cpuPercent}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#16273c]">
                    <span className="text-[#88a2bd]">Memory Allocation:</span>
                    <span className="font-mono text-white font-bold">{selectedInstance.memoryPercent}%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#88a2bd]">Observed Timestamp:</span>
                    <span className="font-mono text-cyan-300">{selectedInstance.observedAt}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-amber-200 text-[11px]">
                  <strong>Phase 1 Read-Only:</strong> Instance operational commands (startsap, stopsap, restart) remain strictly disabled.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedInstance(null)}
              className="w-full py-2 rounded-lg bg-[#14263c] hover:bg-[#1a334f] text-cyan-200 text-xs font-semibold border border-[#233f5d] transition-colors"
            >
              Close Evidence Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
