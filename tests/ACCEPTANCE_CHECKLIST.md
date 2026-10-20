# Acceptance Checklist

Use this checklist per task. Mark each item PASS, FAIL, BLOCKED, or N/A with a short evidence note. Do not mark unrun checks as PASS.

## Specification and scope
- [ ] Task has observable acceptance criteria.
- [ ] Authoritative specifications are identified and consistent.
- [ ] Impact analysis is complete.
- [ ] Changed files remain within approved scope.
- [ ] Any product/architecture decision is recorded and approved.

## Data and metrics (when applicable)
- [ ] Source, timestamp/timezone, quality, freshness, and mode are represented.
- [ ] Formula, unit, aggregation, filters, nulls, duplicates, and boundaries are defined.
- [ ] Normal, empty, partial, malformed, stale, timeout, and error cases are covered as applicable.
- [ ] Invalid or stale input cannot appear healthy.
- [ ] DEMO data is clearly labeled and cannot leak into LIVE mode.

## UI behavior (when applicable)
- [ ] Correct page, route, widget placement, title, and hierarchy.
- [ ] Loading/success/empty/partial/stale/error states work.
- [ ] Long labels, large values, and empty visualizations do not break layout.
- [ ] Target viewport(s) reviewed against approved reference.
- [ ] Keyboard/accessibility and visible error messaging reviewed.

## Engineering quality
- [ ] Available lint/type/build/test commands executed.
- [ ] No unexplained runtime or console errors.
- [ ] Dependencies and lockfile changes are justified.
- [ ] No secrets or sensitive production data committed.
- [ ] No unrelated changes or weakened tests.

## Acceptance record
- Commit SHA:
- Reviewer:
- Result: PASS / FAIL / BLOCKED
- Commands and results:
- Visual evidence:
- Known limitations:
