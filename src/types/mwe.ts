import { PageId } from './index';

export type CapabilityTrack = 'M' | 'W' | 'E';

export type RuleStatus =
  | 'proposed'
  | 'not_configured'
  | 'ready'
  | 'enabled'
  | 'disabled'
  | 'not_evaluated'
  | 'error';

export type ActionRiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface WarningFinding {
  id: string;
  ruleId: string;
  islandId: PageId;
  title: string;
  titleFa: string;
  severity: 'Critical' | 'Warning' | 'Info';
  observedValue: string;
  thresholdValue: string;
  evaluationWindow: string;
  sourceEntity: string;
  sourceArtifact: string;
  observedAt: string;
  confidence: 'High' | 'Medium' | 'Low';
  evidenceSummary: string;
  evidenceSummaryFa: string;
  missingDataCaveat?: string;
}

export interface WarningRule {
  ruleId: string; // e.g. RULE-LAN-001
  version: string; // e.g. 1.0.0
  islandId: PageId;
  name: string;
  nameFa: string;
  description: string;
  descriptionFa: string;
  status: RuleStatus;
  severity: 'Critical' | 'Warning' | 'Info';
  requiredSourceContracts: string[];
  inputMetric: string;
  thresholdRef: string;
  evaluationWindow: string;
  scope: string;
  owner: string;
  dedupKey: string;
  missingPrerequisites?: string[];
  missingPrerequisitesFa?: string[];
  findings?: WarningFinding[];
}

export type ActionCategory =
  | 'Job Definition'
  | 'Job Run'
  | 'Service Management'
  | 'Instance Management'
  | 'Workload Management'
  | 'Storage & Volumes'
  | 'Security & Users'
  | 'Log & Updates'
  | 'Connection & Queues'
  | 'Transport & Objects'
  | 'Backup & DR'
  | 'Orchestration';

export interface ControlledAction {
  actionId: string; // e.g. ACT-LAN-001
  actionCode?: string; // e.g. RELEASE, STOP, CANCEL, RERUN, RESTART
  version: string;
  islandId: PageId;
  name: string;
  nameFa: string;
  description: string;
  descriptionFa: string;
  category?: ActionCategory;
  targetEntityType: string;
  purpose: string;
  purposeFa: string;
  expectedImpact: string;
  expectedImpactFa: string;
  riskLevel: ActionRiskLevel;
  preconditions: string[];
  preconditionsFa: string[];
  requiredPermissions: string[];
  approvalRequired: boolean;
  changeWindowRequired: boolean;
  adapterStatus: 'Not implemented' | 'Phase 1 read-only' | 'Gated';
  disabledReason: string;
  disabledReasonFa: string;
  rollbackPlan: string;
  rollbackPlanFa: string;
  verificationCriteria: string;
  verificationCriteriaFa: string;
}

export interface EntityMonitoringAction {
  id: string;
  code: string; // e.g. JOB_DETAILS, STATUS, REFRESH, STEP, JOB_LOG, SPOOL
  label: string;
  labelFa: string;
  iconName?: string;
  description: string;
  descriptionFa: string;
  isAvailable: boolean;
  unavailabilityReason?: string;
  unavailabilityReasonFa?: string;
}

export interface WarningLifecycleAction {
  code: 'ACKNOWLEDGE' | 'ASSIGN' | 'ESCALATE' | 'SNOOZE' | 'SUPPRESS' | 'RESOLVE';
  label: string;
  labelFa: string;
  status: 'not_configured' | 'gated';
  unmetPrerequisites: string[];
  unmetPrerequisitesFa: string[];
}

export interface IslandMWEState {
  islandId: PageId;
  mActive: boolean;
  wStatus: 'Configured' | 'Gated' | 'Partial';
  eActive: boolean; // Always false in Phase 1
  rules: WarningRule[];
  actions: ControlledAction[];
  monitoringActions?: EntityMonitoringAction[];
}
