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

export interface ControlledAction {
  actionId: string; // e.g. ACT-LAN-001
  version: string;
  islandId: PageId;
  name: string;
  nameFa: string;
  description: string;
  descriptionFa: string;
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

export interface IslandMWEState {
  islandId: PageId;
  mActive: boolean;
  wStatus: 'Configured' | 'Gated' | 'Partial';
  eActive: boolean; // Always false in Phase 1
  rules: WarningRule[];
  actions: ControlledAction[];
}
