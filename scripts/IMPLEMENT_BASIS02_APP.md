# BASIS_02 Application Implementation Script
# Source analysis: mtaghipourpars-dotcom/BASIS_01, main
# Execution mode: coding agent / Google AI Studio Build
# Objective: implement the first deterministic, bilingual, read-only DEMO UI slice.

You are the implementation agent. Treat repository contracts as authoritative. Do not merely describe the work: inspect the current repository, implement the application, run the available checks, fix failures, and report exact evidence. Work in small, verifiable commits.

## A. Required preflight — do not skip
1. Inspect the entire current BASIS_02 tree and git history. Read README.md, DEVELOPMENT_STANDARD.md, docs/AI_DEVELOPMENT_WORKFLOW.md, docs/QUALITY_GATES.md, docs/CHANGE_CONTROL.md, docs/VISUAL_ARCHITECTURE.md, specs/application.yaml, specs/pages.yaml, specs/i18n.yaml, specs/widgets.yaml, specs/metric-registry.yaml, specs/data-contracts.yaml and tests/*.
2. Inspect BASIS_01 as a source reference. Read:
   - docs/01-architecture.md
   - docs/02-phase1-requirements.md
   - docs/04-data-contract.md
   - docs/05-security.md
   - docs/06-collection-and-deployment.md
   - docs/07-testing-and-acceptance.md
   - docs/12-phase1-target-design.md
   - docs/14-phase1-implementation-slice.md
   - docs/15-idempotent-ingestion.md
   - docs/16-dashboard-build-plan.md
   - docs/17-dashboard-reference-contract.md
   - docs/09-decisions-and-open-questions.md
   - inspect SRC/dashboard.png and source-evidence files only as needed; the image is visual evidence, not runtime data.
3. Inventory the actual files, framework, package manager, lockfile, commands, entry point, test runner, and deployment assumptions. Record factual results in docs/implementation-inventory.md.
4. Preserve existing runtime conventions if present. If no app runtime exists, choose the smallest suitable frontend stack only after documenting the decision in docs/decisions/ADR-001-frontend-runtime.md. Do not pretend a stack already exists.
5. Before editing, identify exact paths to create/change and map each to acceptance criteria. Do not delete or overwrite user work.

## B. Product rules
- Product: SAP Basis Operations Cockpit, Monitoring Phase 1, read-only.
- UI must follow docs/VISUAL_ARCHITECTURE.md and the locked composition in BASIS_01 docs/17-dashboard-reference-contract.md, adapted to the latest user-provided reference where explicitly different.
- Two first-class locales: English (en, LTR) and Persian (fa-IR, RTL). Default to Persian for the first view unless current repository requirements explicitly supersede this.
- One global language selector in the header. Switching locale updates all visible UI text and accessible text, direction, navigation, tooltips, menus, charts, legends, forms, empty/error/loading/stale states, notifications and placeholders atomically.
- Preserve route, selected system, filters and unsaved input across language switching. Persist preference only with an approved runtime-safe mechanism.
- Keep technical identifiers (SIDs, hostnames, SAP transaction codes, instance/job/database IDs) unchanged and isolate mixed-script identifiers as LTR where needed.
- Never translate numbers into a different measurement or change source meaning. Format localized dates/times consistently and identify timezone.
- DEMO fixture values must be labelled DEMO and must never imply live telemetry. No live connection is configured by default.
- Phase 1 has no SAP/OS writes, no restart, no job cancel/release, no unlock, no transport import and no remediation.
- Unknown, stale, partial, unavailable, invalid, unauthorized, and NOT_SUPPORTED are distinct from healthy and from numeric zero.
- No KPI/ring/availability percentage without approved formula, unit, aggregation, time window, source and freshness policy. Where not approved, show unavailable/unknown in the reserved visual slot.
- Do not create a second status calculation in widgets; consume a shared status/data mapping layer.
- No arbitrary RFC/table reader, direct undocumented database access, GUI scraping, remote shell or secret in client code.
- Every visible DEMO value must trace to a sanitized fixture; every future LIVE value must carry provenance and freshness.

## C. Initial implementation scope
Build the complete app shell and Home page only, plus working navigation placeholders for all 13 routes defined in specs/pages.yaml. Do not invent detailed content for unfinished routes.

### App shell
- Full viewport, dark navy top header and left sidebar.
- Header: product title “Basis Operations Cockpit”, tagline, global search control (search may be local DEMO filtering only), localized clock/date if runtime clock is available, DEMO/connection state, notifications control, profile/role menu and settings route.
- Fixed sidebar order from specs/pages.yaml: Home, Overview, Systems, Landscape, Alerts & Events, Performance, Jobs & Processes, Database, Transports, Security, Backup & Recovery, Reports, Settings.
- Current route active state, keyboard navigation, visible focus, semantic landmarks and accessible labels.
- Sidebar footer/help card at desktop as in the reference; may collapse into drawer/icon rail at narrower widths.
- Never use an unlicensed external hotlink for hero art. Prefer approved local asset if available; otherwise use CSS gradient/abstract server-room motif.

### Home composition
Follow docs/VISUAL_ARCHITECTURE.md:
1. Hero/status band: landscape-at-a-glance message, Total Systems, Critical Alerts, Open Jobs, System Load, stable-systems panel.
2. Middle row: Landscape Overview, System Health + trend, Active Alerts.
3. Metrics row: Key Performance Metrics, System Resources, Top Systems by Health, Recent Events.
4. Bottom row: SAP Stack Health, Job Monitoring, Database Status, Storage & Backup, Network & Connectivity.
5. Preserve desktop information hierarchy; use responsive reflow in semantic order.
6. No screenshot sample values are treated as real. Any seeded values are conspicuously DEMO.

### Data architecture
Create a typed, single-source DEMO data model and view-model mapping layer. Widgets must not embed their own independent business values or compute separate health status. Model records must carry, where applicable:
- schema version and stable record ID;
- environment DEMO/TEST/LIVE;
- target/system ID and component;
- metric/event ID and definition version;
- value + unit or normalized event fields;
- source adapter ID/version/type;
- observed and received timestamps;
- quality state, freshness, coverage and evidence reference.
Missing values remain null/unavailable, never zero by default. Add a single status vocabulary: HEALTHY, ATTENTION, CRITICAL, UNKNOWN, STALE, NOT_SUPPORTED. Event severity is not equivalent to target health.

Do not connect to live APIs in this slice. Keep API integration behind a typed interface and explicit configuration, default disabled. Do not expose secrets in the browser.

## D. Localization implementation requirements
- Use centralized translation dictionaries, not conditional strings scattered through components.
- Translation key coverage must include all UI copy and accessibility text.
- Set document language and direction from locale state.
- Mirror directional layout in RTL, but do not mirror logos or reverse chart/data meaning.
- Use CSS logical properties (inline-start/end) rather than left/right-specific styling where possible.
- Chart titles, axes, legends, tooltips, units, empty states and accessible summaries must localize.
- Date/time and number formatters must use the selected locale; preserve exact technical IDs.
- Provide pluralization/complete messages rather than concatenated fragments.
- Add automated checks for missing keys and both locales.
- No untranslated keys or remnants of the previous locale after switching.

## E. Visual quality
- Establish tokenized colors, spacing, radii, typography and status states; avoid arbitrary per-card styling.
- Primary visual target: 1536×1024 desktop reference. Also inspect 1280×800 and tablet/mobile widths.
- Dense dashboard must remain legible; no overlap, clipped labels, broken chart legends or horizontal overflow.
- Status cannot be conveyed by color alone; include label/icon/text.
- Loading, empty, partial, stale, unavailable and error states must be implemented, not replaced by plausible-looking values.
- Use accessible semantic controls and visible keyboard focus.
- Avoid unnecessary dependencies; justify and pin each added dependency.

## F. Test gates
Use actual test tooling discovered in preflight. Add/execute tests for:
1. Locale switch updates every translation and document lang/dir.
2. Persian layout RTL and English layout LTR.
3. Route/filter/selected-system/unsaved inputs survive locale switch.
4. Missing translation keys are detected.
5. Technical identifiers remain unchanged.
6. DEMO values are clearly labelled and cannot be represented as LIVE by default.
7. Explicit zero differs from missing/null.
8. UNKNOWN/STALE/NOT_SUPPORTED never receive healthy styling.
9. Every sidebar route resolves and active item is correct.
10. No broken controls, console errors, runtime exceptions or missing keys.
11. Desktop composition and responsive reflow pass visual/layout checks.
12. No write/action controls are available in Phase 1.
13. Charts preserve gaps and do not fabricate values.
14. API disabled/error/timeout states remain explicit if API client scaffolding is present.

Do not claim tests pass unless commands were run and their actual output checked. Fix failures; do not weaken tests to manufacture a pass. If browser/visual testing is unavailable, record that limitation explicitly and do not claim visual acceptance.

## G. Execution order
1. Preflight inventory + architecture decision.
2. Define token/localization/data-model contracts and route registry.
3. Implement shell, locale selector, RTL/LTR behavior.
4. Implement responsive Home grid using DEMO fixtures.
5. Implement route placeholders and active navigation.
6. Add translation/data-state/accessibility tests.
7. Run format/lint/typecheck/unit/build/e2e/visual checks available.
8. Fix failures and re-run affected suites.
9. Update README and docs/implementation-inventory.md with exact status, commands, results, screenshots/evidence and known blockers.
10. Commit only the coherent verified slice. Do not push secrets or user data.

## H. Definition of done for this slice
- App starts using documented commands.
- Home shell and composition are implemented, not just a screenshot.
- English/Persian switch works across all implemented UI, with correct LTR/RTL.
- All 13 sidebar destinations resolve; unfinished pages show localized “Not implemented / هنوز پیاده‌سازی نشده است” placeholders.
- All displayed data is explicitly DEMO.
- No false LIVE claims, unsupported KPI formulas or Phase 1 write actions.
- Tests and build run; results and limitations are accurately recorded.
- No unrequested scope expansion.

## I. Final response format for the implementation agent
Return only:
- changed file paths;
- exact commands executed and pass/fail results;
- app run command;
- commit SHA;
- remaining blockers (if any).
Do not say “complete” when required checks have not run.
