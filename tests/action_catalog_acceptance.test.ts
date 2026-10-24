import { ACTION_REGISTRY, getJobActionsByCategory, getActionByCode } from '../src/data/actionRegistry';
import { PageId } from '../src/types';

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
console.log('BASIS_02 Central Action Catalog & M/W/E Acceptance Tests');
console.log('====================================================\n');

// 1. Total actions count & uniqueness
test('Action ID Uniqueness', () => {
  const ids = new Set<string>();
  for (const act of ACTION_REGISTRY) {
    assert(!ids.has(act.actionId), `Duplicate actionId found: ${act.actionId}`);
    ids.add(act.actionId);
  }
  assert(ids.size >= 25, `Expected at least 25 registered actions, got ${ids.size}`);
});

// 2. Strict M/W/E partition
test('Strict M/W/E Partition', () => {
  for (const act of ACTION_REGISTRY) {
    assert(
      act.mode === 'M' || act.mode === 'W' || act.mode === 'E',
      `Action ${act.actionId} has invalid mode: ${act.mode}`
    );
  }
});

// 3. Execution (E) Gating Invariant in Phase 1
test('100% of Execution (E) Actions are Strictly Disabled in Phase 1', () => {
  const eActions = ACTION_REGISTRY.filter((a) => a.mode === 'E');
  assert(eActions.length >= 10, `Expected at least 10 E actions, got ${eActions.length}`);
  for (const act of eActions) {
    assert(
      act.isExecutableInPhase1 === false,
      `Action ${act.actionId} (${act.actionCode}) must have isExecutableInPhase1 === false in Phase 1`
    );
    assert(
      act.disabledReason.length > 10,
      `Action ${act.actionId} must have an explicit disabledReason explaining unmet gates`
    );
    assert(
      act.disabledReasonFa.length > 10,
      `Action ${act.actionId} must have an explicit Persian disabledReasonFa`
    );
    assert(
      act.requiredPermissions.length > 0,
      `Action ${act.actionId} must document required SAP permissions`
    );
    assert(
      act.rollbackPlan.length > 5,
      `Action ${act.actionId} must have a documented rollback plan`
    );
  }
});

// 4. Job Definition vs Job Run Separation
test('Jobs & Processes: Strict Separation of Definition Actions vs Run Actions', () => {
  const defActions = getJobActionsByCategory('definition');
  const runActions = getJobActionsByCategory('run');

  assert(defActions.length >= 5, `Expected at least 5 Job Definition actions, found ${defActions.length}`);
  assert(runActions.length >= 3, `Expected at least 3 Job Run actions, found ${runActions.length}`);

  const defCodes = defActions.map((a) => a.actionCode);
  const runCodes = runActions.map((a) => a.actionCode);

  assert(defCodes.includes('RELEASE'), 'Job Definition actions must include RELEASE');
  assert(defCodes.includes('CHANGE_RESCHEDULE'), 'Job Definition actions must include CHANGE_RESCHEDULE');
  assert(defCodes.includes('DELETE_DEFINITION'), 'Job Definition actions must include DELETE_DEFINITION');
  assert(defCodes.includes('COPY'), 'Job Definition actions must include COPY');
  assert(defCodes.includes('CREATE_SCHEDULE'), 'Job Definition actions must include CREATE_SCHEDULE');
  assert(defCodes.includes('START_IMMEDIATELY'), 'Job Definition actions must include START_IMMEDIATELY');

  assert(runCodes.includes('STOP'), 'Job Run actions must include STOP');
  assert(runCodes.includes('CANCEL'), 'Job Run actions must include CANCEL');
  assert(runCodes.includes('REPEAT_RERUN'), 'Job Run actions must include REPEAT_RERUN');

  // Verify START_IMMEDIATELY targets job_definition
  const startImm = getActionByCode('START_IMMEDIATELY');
  assert(startImm !== undefined, 'START_IMMEDIATELY action must exist');
  assert(startImm?.entityType === 'job_definition', 'START_IMMEDIATELY must target job_definition entity');
});

// 5. STOP and CANCEL are Distinct Operations (Not Synonyms)
test('Jobs & Processes: STOP and CANCEL are Distinct Operations', () => {
  const stopAct = getActionByCode('STOP');
  const cancelAct = getActionByCode('CANCEL');

  assert(stopAct !== undefined, 'STOP action must exist');
  assert(cancelAct !== undefined, 'CANCEL action must exist');
  assert(stopAct?.actionId !== cancelAct?.actionId, 'STOP and CANCEL must have different actionIds');
  assert(stopAct?.actionCode !== cancelAct?.actionCode, 'STOP and CANCEL must have different actionCodes');
  assert(
    stopAct?.purpose !== cancelAct?.purpose,
    'STOP and CANCEL must have distinct operational purposes and semantics'
  );
});

// 6. Interfaces: TEST_CONNECTION is Execution (E) and Disabled
test('Interfaces & Connectivity: TEST_CONNECTION is Categorized as Execution (E)', () => {
  const testConn = getActionByCode('TEST_CONNECTION');
  assert(testConn !== undefined, 'TEST_CONNECTION action must exist');
  assert(
    testConn?.mode === 'E',
    'TEST_CONNECTION must be categorized as E (Execution) because it dispatches active network requests'
  );
  assert(
    testConn?.isExecutableInPhase1 === false,
    'TEST_CONNECTION must be disabled in Phase 1 read-only mode'
  );
});

// 7. All 10 Operational Islands Covered
test('All 10 Operational Islands are Covered in the Action Registry', () => {
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

  const coveredIslands = new Set(ACTION_REGISTRY.map((a) => a.islandId));
  for (const island of requiredIslands) {
    assert(coveredIslands.has(island), `Missing actions for operational island: ${island}`);
  }
});

// 8. Bilingual Completeness
test('Bilingual Completeness Across All Actions', () => {
  for (const act of ACTION_REGISTRY) {
    assert(act.name.length > 0 && act.nameFa.length > 0, `Action ${act.actionId} missing bilingual name`);
    assert(
      act.description.length > 0 && act.descriptionFa.length > 0,
      `Action ${act.actionId} missing bilingual description`
    );
    assert(
      act.purpose.length > 0 && act.purposeFa.length > 0,
      `Action ${act.actionId} missing bilingual purpose`
    );
    assert(
      act.expectedImpact.length > 0 && act.expectedImpactFa.length > 0,
      `Action ${act.actionId} missing bilingual expectedImpact`
    );
  }
});

// 9. Absence of Forbidden Terminology Invariant
test('Absence of Forbidden Terms in Action Registry', () => {
  const forbiddenRegex = /demo|extracted snapshot|دمو|تصویر استخراج‌شده/i;
  for (const act of ACTION_REGISTRY) {
    const textBlob = JSON.stringify(act);
    assert(
      !forbiddenRegex.test(textBlob),
      `Forbidden terminology detected in action ${act.actionId}: matches forbidden regex`
    );
  }
});

// 10. Warning Lifecycle Gating Invariant
test('Warning (W) Lifecycle Actions State Unconfigured Status in Phase 1', () => {
  const wActions = ACTION_REGISTRY.filter((a) => a.mode === 'W');
  assert(wActions.length > 0, 'Expected at least one W action');
  for (const act of wActions) {
    assert(
      act.isExecutableInPhase1 === false,
      `Warning action ${act.actionId} must not be executable in Phase 1 without persistent store`
    );
    assert(
      act.disabledReason.toLowerCase().includes('not configured'),
      `Warning action ${act.actionId} must declare Not Configured status in Phase 1`
    );
  }
});

console.log('\n====================================================');
const passedCount = results.filter((r) => r.passed).length;
const failedCount = results.filter((r) => !r.passed).length;
console.log(`TOTAL: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log('====================================================\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('All Central Action Catalog acceptance criteria passed successfully!');
}
