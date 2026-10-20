# Quality Gates and Test Strategy

A gate is a release blocker only when its check is executable and its result is recorded. A checklist is not a test execution result.

## Gate A — Specification consistency
- Every page/widget ID is unique.
- Every widget placement references an existing page.
- Every metric reference resolves to a registry entry.
- Every data-backed widget defines expected states and source/provenance.
- No unresolved `PENDING` item is treated as approved behavior.
- Specifications do not contradict this standard.

## Gate B — Static and build checks
Once the toolchain is selected, configure deterministic commands for formatting/linting, type checking, build, and unit tests where supported. Pin dependencies and commit the lockfile. Record exact commands in the project scripts and CI. Do not claim these checks pass until executed.

## Gate C — Metric and contract tests
For every data mapping and metric:
- known normal input → expected output;
- empty input;
- null/missing fields;
- wrong types and malformed values;
- duplicate records;
- partial payload;
- boundary values and timezone/window boundaries;
- stale timestamp;
- source timeout/unavailable;
- unknown or unsupported source state.

Test that invalid or stale input cannot produce a healthy state. Validate units, rounding, aggregation, filters, and duplicate handling.

## Gate D — Component and integration tests
Verify:
- loading, success, empty, partial, stale, and error states;
- retries or refreshes do not duplicate data or leak old results;
- navigation opens the specified page and selected widget placement is stable;
- no fixture is accidentally used in live mode;
- source errors are visible and diagnosable without leaking secrets;
- responsive layout and long content do not overlap or disappear.

## Gate E — Visual acceptance
After the approved reference image and viewport targets are provided:
- compare shell, spacing, hierarchy, colors, typography, iconography, and widget placement;
- inspect the initial screen and every sidebar page;
- capture consistent screenshots at agreed viewport dimensions;
- inspect loading, empty, error, and long-data states, not only the happy path;
- use visual regression automation only after stable baselines and tolerances are agreed.

Visual similarity is not proven by a successful build.

## Gate F — Release readiness
Block release if:
- a critical test fails;
- an unexplained console/runtime error exists;
- a required page or widget is missing or misplaced;
- metric semantics are unverified but shown as authoritative;
- stale/invalid data appears healthy;
- demo data is not clearly labeled;
- a secret or sensitive export is present;
- a known regression or material risk is undisclosed.

## Evidence record

For each task/release record:
- commit SHA;
- changed files;
- test commands and pass/fail outcomes;
- visual review evidence and viewport;
- known limitations and unrun checks;
- reviewer/acceptance status.

Never report a test as passed when it was not run. Never delete or weaken a test to hide a defect; any test change needs a documented reason and review.
