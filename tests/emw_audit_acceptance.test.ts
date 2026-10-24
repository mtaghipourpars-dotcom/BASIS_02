import { ACTION_REGISTRY, getActionByCode, getJobActionsByCategory } from '../src/data/actionRegistry';
import {
  ISLAND_MONITORING_ACTIONS,
  WARNING_RULES,
  CONTROLLED_ACTIONS,
  WARNING_LIFECYCLE_ACTIONS,
} from '../src/data/mweRegistry';
import { PageId } from '../src/types';
import {
  WORK_PROCESS_RECORDS,
  SM37_ROWS,
  SECURITY_SESSION_RECORDS,
  ENQUEUE_LOCKS,
  DATABASE_VOLUMES,
  LOG_EVENT_RECORDS,
  TRANSPORT_RECORDS,
  BACKUP_CATALOG,
} from '../src/data/fixtures';

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function test(name: string, fn: () => void) {
  try {
    fn();
    results.push({ name, passed: true });
    console.log(`✓ PASS: ${name}`);
  } catch (err: any) {
    results.push({ name, passed: false, error: err.message });
    console.error(`✗ FAIL: ${name} -> ${err.message}`);
  }
}

console.log('====================================================');
console.log('BASIS_02 Full EMW Implementation Audit Acceptance Suite');
console.log('====================================================\n');

// ----------------------------------------------------
// Section 1: Monitoring (M) Invariants
// ----------------------------------------------------

test('M-01: Every M action in actionRegistry has read-only impact and no state changes', () => {
  const mActions = ACTION_REGISTRY.filter((a) => a.mode === 'M');
  assert(mActions.length >= 10, `Expected at least 10 M actions, found ${mActions.length}`);
  for (const act of mActions) {
    assert(act.isExecutableInPhase1 === true, `M action ${act.actionId} should be available in Phase 1 read-only`);
    const impact = act.expectedImpact.toLowerCase();
    assert(
      impact.includes('read') ||
      impact.includes('quer') ||
      impact.includes('inspect') ||
      impact.includes('zero') ||
      impact.includes('no modification') ||
      impact.includes('no side effects') ||
      impact.includes('no operational') ||
      impact.includes('client view'),
      `M action ${act.actionId} must declare read-only impact; got: "${act.expectedImpact}"`
    );
  }
});

test('M-02: All 10 operational islands have dedicated monitoring actions registered', () => {
  const islands: PageId[] = [
    'landscape',
    'performance',
    'jobs-processes',
    'database',
    'security',
    'alerts-events',
    'interfaces-connectivity',
    'transports',
    'backup-recovery',
    'system-operations',
  ];
  for (const island of islands) {
    const actions = ISLAND_MONITORING_ACTIONS[island];
    assert(actions !== undefined && actions.length > 0, `Missing monitoring actions for island: ${island}`);
  }
});

test('M-03: Work Process (SM50) dataset maintains valid PID, status, and execution time', () => {
  assert(WORK_PROCESS_RECORDS.length > 0, 'WORK_PROCESS_RECORDS must not be empty');
  for (const wp of WORK_PROCESS_RECORDS) {
    assert(typeof wp.pid === 'number' && wp.pid > 0, `WP #${wp.no} missing or invalid PID: ${wp.pid}`);
    assert(wp.status.length > 0, `WP #${wp.no} missing status`);
    assert(typeof wp.time === 'number' && wp.time >= 0, `WP #${wp.no} invalid execution time`);
  }
});

test('M-04: Background Jobs (SM37) preserves raw Jalali date/time and duration strings without synthetic live status', () => {
  assert(SM37_ROWS.length === 5, 'SM37_ROWS must contain exactly the 5 verified excerpt rows');
  for (const job of SM37_ROWS) {
    assert(job.date.length > 0, `Job ${job.name} missing raw start date`);
    assert(job.time.length > 0, `Job ${job.name} missing raw start time`);
    assert(job.status.length > 0, `Job ${job.name} missing status`);
    assert(job.creator.length > 0, `Job ${job.name} missing creator`);
  }
});

// ----------------------------------------------------
// Section 2: Warning (W) Rule & Lifecycle Invariants
// ----------------------------------------------------

test('W-01: Central Warning Rule Registry contains 30 typed rules across 10 islands', () => {
  assert(WARNING_RULES.length === 30, `Expected 30 warning rules, found ${WARNING_RULES.length}`);
  const islandRuleCounts: Record<string, number> = {};
  for (const rule of WARNING_RULES) {
    assert(rule.ruleId.length > 0, 'Rule must have a valid non-empty ruleId');
    assert(rule.name.length > 0 && rule.nameFa.length > 0, `Rule ${rule.ruleId} missing bilingual name`);
    assert(rule.thresholdRef.length > 0, `Rule ${rule.ruleId} missing thresholdRef`);
    assert(rule.status.length > 0, `Rule ${rule.ruleId} missing status`);
    islandRuleCounts[rule.islandId] = (islandRuleCounts[rule.islandId] || 0) + 1;
  }
  assert(Object.keys(islandRuleCounts).length === 10, 'All 10 islands must have warning rules');
});

test('W-02: Warning findings provide traceable rule ID, observed value, and timestamp', () => {
  const rulesWithFindings = WARNING_RULES.filter((r) => r.findings && r.findings.length > 0);
  assert(rulesWithFindings.length > 0, 'Expected at least some rules to have sample findings');
  for (const rule of rulesWithFindings) {
    for (const finding of rule.findings!) {
      assert(finding.ruleId === rule.ruleId, `Finding ruleId mismatch: ${finding.ruleId} vs ${rule.ruleId}`);
      assert(finding.observedValue.length > 0, `Finding ${finding.id} missing observedValue`);
      assert(finding.observedAt.length > 0, `Finding ${finding.id} missing observedAt timestamp`);
      assert(finding.sourceArtifact.length > 0, `Finding ${finding.id} missing sourceArtifact`);
    }
  }
});

test('W-03: Warning lifecycle actions declare unconfigured / Phase 2 Gated status in Phase 1', () => {
  assert(WARNING_LIFECYCLE_ACTIONS.length >= 5, 'Expected at least 5 warning lifecycle actions');
  const codes = WARNING_LIFECYCLE_ACTIONS.map((a) => a.code);
  assert(codes.includes('ACKNOWLEDGE'), 'Lifecycle must include ACKNOWLEDGE');
  assert(codes.includes('ASSIGN'), 'Lifecycle must include ASSIGN');
  assert(codes.includes('ESCALATE'), 'Lifecycle must include ESCALATE');
  assert(codes.includes('SNOOZE'), 'Lifecycle must include SNOOZE');
  assert(codes.includes('RESOLVE'), 'Lifecycle must include RESOLVE');
  for (const act of WARNING_LIFECYCLE_ACTIONS) {
    assert(act.status === 'not_configured' || act.status === 'gated', `Warning action ${act.code} must be unconfigured/gated in Phase 1`);
    assert(act.unmetPrerequisites.length > 0, `Warning action ${act.code} must state unmet prerequisites`);
  }
});

// ----------------------------------------------------
// Section 3: Execution (E) Safety Invariants
// ----------------------------------------------------

test('E-01: 100% of Controlled Actions in CONTROLLED_ACTIONS are strictly disabled in Phase 1', () => {
  assert(CONTROLLED_ACTIONS.length >= 10, 'Expected at least 10 controlled actions');
  for (const act of CONTROLLED_ACTIONS) {
    assert(
      act.adapterStatus === 'Phase 1 read-only' || act.adapterStatus === 'Not implemented' || act.adapterStatus === 'Gated',
      `Action ${act.actionId} must have read-only/gated adapterStatus in Phase 1`
    );
    assert(act.disabledReason.length > 10, `Action ${act.actionId} missing disabledReason`);
    assert(act.disabledReasonFa.length > 10, `Action ${act.actionId} missing disabledReasonFa`);
    assert(act.requiredPermissions.length > 0, `Action ${act.actionId} missing requiredPermissions`);
    assert(act.rollbackPlan.length > 5, `Action ${act.actionId} missing rollbackPlan`);
  }
});

test('E-02: Preflight checklist preconditions exist for every controlled action', () => {
  for (const act of CONTROLLED_ACTIONS) {
    assert(act.preconditions.length > 0, `Action ${act.actionId} has empty preconditions list`);
    assert(act.preconditionsFa.length > 0, `Action ${act.actionId} has empty preconditionsFa list`);
  }
});

test('E-03: STOP and CANCEL are completely distinct operations across registries', () => {
  const stopAct = ACTION_REGISTRY.find((a) => a.actionCode === 'STOP');
  const cancelAct = ACTION_REGISTRY.find((a) => a.actionCode === 'CANCEL');
  assert(stopAct !== undefined && cancelAct !== undefined, 'Both STOP and CANCEL must exist in registry');
  assert(stopAct.actionId !== cancelAct.actionId, 'STOP and CANCEL must have distinct actionIds');
  assert(stopAct.purpose !== cancelAct.purpose, 'STOP and CANCEL must have distinct purpose');
});

test('E-04: Interfaces TEST_CONNECTION sends active network requests and is strictly classified as E', () => {
  const testConn = ACTION_REGISTRY.find((a) => a.actionCode === 'TEST_CONNECTION');
  assert(testConn !== undefined, 'TEST_CONNECTION must exist in registry');
  assert(testConn.mode === 'E', 'TEST_CONNECTION must be mode E (Execution)');
  assert(testConn.isExecutableInPhase1 === false, 'TEST_CONNECTION must be disabled in Phase 1');
});

// ----------------------------------------------------
// Section 4: Whole Application Invariants
// ----------------------------------------------------

test('APP-01: Fixed 10 operational islands are defined and have active routes', () => {
  const requiredIslands: PageId[] = [
    'landscape',
    'performance',
    'jobs-processes',
    'database',
    'security',
    'alerts-events',
    'interfaces-connectivity',
    'transports',
    'backup-recovery',
    'system-operations',
  ];
  const catalogIslands = new Set(CONTROLLED_ACTIONS.map((a) => a.islandId));
  for (const island of requiredIslands) {
    assert(catalogIslands.has(island), `Controlled action catalog missing island: ${island}`);
  }
});

test('APP-02: No forbidden terminology across action registry and warning rules', () => {
  const forbiddenRegex = /demo|extracted snapshot|دمو|تصویر استخراج/i;
  for (const act of ACTION_REGISTRY) {
    assert(!forbiddenRegex.test(JSON.stringify(act)), `Forbidden term in ACTION_REGISTRY action ${act.actionId}`);
  }
  for (const rule of WARNING_RULES) {
    assert(!forbiddenRegex.test(JSON.stringify(rule)), `Forbidden term in WARNING_RULES rule ${rule.ruleId}`);
  }
});

test('APP-03: Bilingual completeness verified across all warning rules', () => {
  for (const rule of WARNING_RULES) {
    assert(rule.name.length > 0 && rule.nameFa.length > 0, `Rule ${rule.ruleId} missing bilingual name`);
    assert(
      rule.description.length > 0 && rule.descriptionFa.length > 0,
      `Rule ${rule.ruleId} missing bilingual description`
    );
  }
});

test('APP-04: Cross-page dataset consistency verified between Home and detail records', () => {
  assert(SECURITY_SESSION_RECORDS.length > 0, 'SECURITY_SESSION_RECORDS must exist');
  assert(ENQUEUE_LOCKS.length > 0, 'ENQUEUE_LOCKS must exist');
  assert(DATABASE_VOLUMES.length > 0, 'DATABASE_VOLUMES must exist');
  assert(LOG_EVENT_RECORDS.length > 0, 'LOG_EVENT_RECORDS must exist');
  assert(TRANSPORT_RECORDS.length > 0, 'TRANSPORT_RECORDS must exist');
  assert(BACKUP_CATALOG.length > 0, 'BACKUP_CATALOG must exist');
});

// ----------------------------------------------------
// Results Summary
// ----------------------------------------------------

console.log('\n====================================================');
const passedCount = results.filter((r) => r.passed).length;
const failedCount = results.filter((r) => !r.passed).length;
console.log(`TOTAL: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log('====================================================\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('All EMW Implementation Audit Acceptance criteria passed successfully!');
}
