# BASIS_02 — AI IMPLEMENTATION WORK ORDER
Document ID: AI-WORK-ORDER-BASIS02-001
Version: 1.0
Status: PROPOSED — requires product-owner approval before implementation
Purpose: The implementation agent reads this file and updates the repository specifications for the proposed SAP Basis dashboard UI. This file is a work order, not permission to invent missing facts.

## 0. Mandatory execution protocol
1. Read `MASTER_SPECIFICATION.md`, `IMPLEMENTATION_RULES.md`, `APPROVED_DECISIONS.md`, `DEVELOPMENT_STANDARD.md`, `docs/PRODUCT_UI_SCRIPT.md`, `docs/VISUAL_ARCHITECTURE.md`, `specs/application.yaml`, `specs/pages.yaml`, `specs/widgets.yaml`, `specs/data-contracts.yaml`, `specs/metric-registry.yaml`, `specs/i18n.yaml`, `tests/VISUAL_I18N_ACCEPTANCE.md`, and the relevant BASIS_01/SRC evidence documents.
2. Inspect actual current repository files before editing. Do not assume the work order's description is more authoritative than an explicit product-owner decision.
3. Do not implement frontend code as part of this task. Update/prepare specifications and data mappings only, unless the product owner separately approves implementation.
4. Do not modify SAP backend, services, Agents, APIs, security, or data-generation logic.
5. Do not change the approved visual shell, routes, sidebar inventory, page order, or fixed widget layout. End users/admins cannot add, remove, or reorder widgets.
6. Do not invent fields, KPI formulas, thresholds, endpoints, refresh intervals, units, authentication details, assets, libraries, or live data.
7. Every new widget or data mapping starts as PROPOSED. Do not mark APPROVED unless the product owner has explicitly approved it. If a decision is missing, add an OPEN question to `APPROVED_DECISIONS.md` and stop that part.
8. Keep DEMO evidence clearly distinct from LIVE runtime sources. Sample files are not proof of a live connection.
9. Do not report tests as passed unless executed. In the completion report, list exact files changed, checks run, unresolved questions, and commit SHA.
10. If repository access, file content, or schema evidence is unavailable, report the blocker; never fabricate a successful change.

## 1. Product-wide widget rules
- Each widget must have a stable unique ID, one page ID, a fixed position, an explicit visualization type, a list of displayed fields, a data-contract reference, and acceptance criteria.
- Every numeric KPI or chart must refer to an approved metric definition including meaning, formula/aggregation, unit, time window and null behavior. If the meaning is not supported by evidence, leave the metric unresolved.
- Every data-bearing widget must reference a source mapping and data contract. Record the precise source file/section and field evidence when known. Do not infer column names from transaction names.
- Support loading, success, empty, partial, stale, unavailable/not-supported and error states as applicable. Missing data must never silently become zero or healthy.
- Use Persian RTL and English LTR. All labels, titles, legends, axes, tooltips, accessible names, loading/error/empty text and date/number formatting must be localized.
- Phase 1 is read-only monitoring. Do not add execution or mutation actions.
- A transaction's existence does not imply its output contains a particular field or that it is a suitable source for a metric.

## 2. Page-by-page proposed widget plan
This is a candidate design to encode in `specs/widgets.yaml`; it is not final approval of every metric or source. Preserve the existing page IDs and visual placement from `specs/pages.yaml`. If page IDs or layouts differ, do not rename/reorder them; flag the discrepancy for owner review.

### Home — executive operational snapshot
Proposed widget groups:
- Environment/instance inventory summary: count only from an approved inventory contract; distinguish systems from instances.
- Health/status distribution: count by explicitly defined states; do not invent health aggregation rules.
- Collection coverage and freshness: source coverage, last observation timestamp, stale/unknown status.
- High-priority events: events from approved mappings such as SM21/RZ20; include source, timestamp, system and approved severity.
- Performance summary/trend: only verified host/workload metrics from ST06/ST03N and other approved contracts; specify units/time windows.
- Work-process snapshot: verified SM50/SM66 fields, clearly labeled as snapshot rather than trend.
- User-session summary: verified SM04 fields; distinguish session count from distinct users.
- Backup evidence summary: verified DB12 fields, separating backup success from restore-test evidence.
- Recent events/activity and links to detail pages.
Do not add all groups if that conflicts with the already-approved Home screenshot/layout. Reconcile the proposed groups against the fixed layout and document any overflow/conflict rather than silently expanding the page.

### Overview — landscape-wide roll-up
- System and instance inventory.
- Status distribution, collection coverage, freshness.
- Important events and recent activity.
- Only aggregate values whose source scope and aggregation are explicitly defined.

### Systems — system and instance details
- Searchable system inventory (SID/environment/version/instance/host/status/last observation only where supplied by contracts).
- Instance list and verified work-process snapshot.
- User-session list/summary from SM04 only after field/schema validation.
- Selected-system details and related events.
- Keep systems, instances, sessions and distinct users as separate concepts.

### Landscape — relationships and coverage
- Environment selector using approved inventory.
- System/instance/host/database relationship diagram only where relationships are present in source data.
- Environment inventory and health matrix.
- Missing/unknown relationships and collection gaps.
- Do not infer topology from names.

### Alerts & Events
- Alert/event summary by approved severity and state.
- Unified event table with timestamp, system, source, event ID and sanitized description.
- Timeline and event details.
- Candidate sources: SM21, RZ20, ST22, SM13, subject to exact evidence/schema mapping.
- Define deduplication, severity, time window and sensitive-data handling before approval.

### Performance
- CPU, memory, disk/filesystem metrics only if exact fields and units are verified.
- ST03N workload/response-time metrics with defined aggregation and window.
- SM50/SM66 work-process state snapshot.
- Trend charts only where timestamped time-series data exists; do not turn a single snapshot into a trend.
- Show source and last observation.

### Jobs & Processes
- Job summary, history, failures and long-running jobs from verified SM37 evidence/data contract.
- Work-process state from SM50/SM66.
- Time range, system scope, duplicate/repeated-run treatment and long-running thresholds must be explicitly defined.
- Read-only only.

### Database
- Database inventory and availability based on verified inventory/health sources.
- Capacity/performance only where compatible source data and units exist.
- Database events and backup evidence only from validated sources.
- Do not assume every system uses HANA or that DB12 covers all database types.

### Transports
- Transport activity/history, source/target, timestamps and result only when verified from STMS evidence or an approved service contract.
- Distinguish transport request state from import execution result.
- No release/import execution actions.

### Security
- Rename/limit content to Security Signals & Access if evidence does not support a comprehensive security posture.
- Display only approved signals from sources such as SM04/SMGW and validated event sources.
- Do not claim comprehensive authorization analysis, intrusion detection, or security scoring without dedicated evidence.
- Sanitize sensitive values and enforce least privilege in the consuming app.

### Backup & Recovery
- Backup summary/history/last successful backup/backup age from verified DB12-compatible data.
- Display restore-test evidence separately, only if actual test records exist.
- Absence of restore evidence is not proof of failure or success.
- Scope source compatibility by database type.

### Reports
- Catalog of implemented reports only.
- Approved filters for system/environment/time.
- Preview tables/charts from approved contracts.
- Trend comparison only for comparable metrics, units and windows.
- Data-quality/freshness summary.
- Export only if implemented and approved; no claim of functionality from a placeholder.

### Settings
- Language selection Persian/English.
- Actual app/build version from runtime metadata.
- Source/collector health and freshness, if exposed through an approved contract.
- Read-only policy/metadata display and allowed display preferences.
- Never expose credentials, tokens or secrets.
- Do not offer page/widget add/remove/reorder controls.

## 3. Evidence sources and cautious mapping
BASIS_01/SRC reportedly includes artifacts associated with SM04, SM12, SM37, SM50, SM51, SM66, SM21, SM13, ST03N, ST06, ST22, RZ20, SMGW, STMS and DB12. Verify exact filenames, content, file type and repository path before using any artifact. Use the files' real field labels and values as evidence; do not treat the transaction name as a schema.
- SM04: sessions; distinct-user metrics require validated user identity and deduplication rules.
- SM50/SM66: work-process snapshots; do not imply historical trend unless timestamped series exists.
- SM51: instance inventory/status as supported by actual output.
- SM37: job history/status as supported by actual output.
- SM21/RZ20: system log/monitor alerts as supported by actual output.
- ST22/SM13: dump/update error evidence as supported by actual output.
- ST03N/ST06: workload/host statistics; exact metrics and units must be verified.
- DB12: backup-related evidence; do not infer restore success.
- STMS: transport-related evidence; distinguish request and import states.
- SMGW: gateway-related signals; not a complete security model.
- SM12: lock entries if output evidence supports it; do not conflate locks with user sessions.

## 4. Required machine-readable schema for each widget
Use the existing schema/style in `specs/widgets.yaml` if it exists. Add fields only compatibly and update the schema documentation. Minimum semantic properties:
- id
- page_id
- title_key
- purpose
- status: PROPOSED / NEEDS_OWNER_INPUT / APPROVED / IMPLEMENTED / VERIFIED / REJECTED
- placement: row, order, desktop span/columns and responsive behavior
- visual_type
- display_fields: source field ID, localized label key, format and unit when verified
- data_contract_ref
- source_mapping_ref
- metric_refs (when numeric)
- filters/sort/time_window (when applicable)
- state_behavior
- drilldown target (only existing approved route)
- acceptance_criteria
- evidence_ref / decision_ref

## 5. Data contracts and source mappings
For each widget proposed:
- Add a data-contract entry only when its field schema is grounded in inspected evidence or explicitly supplied by the owner.
- Add a source-catalog entry with exact file path, artifact type, evidence range, data mode DEMO/LIVE, schema version and owner approval state.
- Do not place credentials/secrets in repository documents.
- Where sample content has not been inspected or parsed reliably, mark NEEDS_OWNER_INPUT and identify the exact missing evidence.
- Do not create fake sample values that could be mistaken for real system values.

## 6. Metric registry
Only add a metric definition if the meaning can be stated precisely. Every definition must include:
- metric_id, display label keys, business/operational meaning
- source field(s), aggregation/formula
- unit, scope and time window
- null/partial/stale handling
- severity thresholds only when supplied/approved
- validation example and acceptance criteria
- status and decision reference
If a proposed metric is only a placeholder, record it as NEEDS_OWNER_INPUT, not as a finalized metric.

## 7. i18n and acceptance
- Add locale keys for every new widget and state, in both English and Persian.
- Preserve fixed sidebar order, route IDs and visual shell.
- Acceptance tests must cover data state variants, stale data, localization, RTL/LTR, responsive placement and no accidental write actions.
- Do not claim tests passed without execution.

## 8. Required result
After processing:
1. Update `specs/widgets.yaml` with the page-by-page proposed widget inventory without marking unapproved proposals as approved.
2. Update `specs/data-contracts.yaml`, `specs/metric-registry.yaml`, `DATA_SOURCE_CATALOG.md`, locale dictionaries and acceptance documents only where supported by evidence.
3. Update `docs/PRODUCT_UI_SCRIPT.md` only to remove contradictions with approved layout/specs; preserve the fixed visual shell.
4. Update `APPROVED_DECISIONS.md` with all unresolved choices and discrepancies.
5. Create `docs/WIDGET_DATA_MAPPING_REVIEW.md` containing page → widget → visual type → displayed fields → source evidence → contract/metric reference → status.
6. Run available schema/lint/build/tests if appropriate; report exact commands and results.
7. Do not commit or push changes that require product-owner decisions. If repository workflow permits committing proposed documentation, use a clearly marked proposal commit and report its SHA. Do not say "approved" or "verified" without evidence.

## 9. Product-owner review gates
The product owner must explicitly approve:
- Exact Home widget list and placements against the screenshot.
- Each widget's data fields and source mapping.
- KPI formulas, units, thresholds and aggregation windows.
- Any new visual type, dependency, route, asset, interaction or source endpoint.
Until then, records remain PROPOSED/NEEDS_OWNER_INPUT and must not be treated as final build instructions.
