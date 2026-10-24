# BASIS_02 — Ten Operational Islands: Visual Specification
Version: 1.0
Status: proposed page-level baseline; Home is unchanged
Related: `docs/VISUAL_ARCHITECTURE.md`, `docs/PRODUCT_UI_SCRIPT.md`, `docs/TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md`, `specs/pages.yaml`, `specs/widgets.yaml`, `docs/SRC_WIDGET_FIELD_MAPPING.md`

For complete candidate KPI definitions, page layouts, data gates and the Monitoring / Warning / Execution capability matrix for all ten islands, see [`docs/TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md`](TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md). This is a proposed design baseline, not a claim that all data sources or features are live/approved.

## Non-negotiable product rules
- Preserve the existing Home composition and sidebar order.
- Monitoring, Warning and Execution are capability-development tracks, not application modes or top-level mode switches.
- Design the complete product vision, but activate each feature only when source data, implementation, permissions and validation support it.
- Phase 1 is read-only. Execution UI may be designed as a future capability, but actual operations must remain disabled.
- Never infer healthy from missing data; never present a PDF screenshot as live telemetry.
- Every chart, count and status must expose its source, scope, observation time and data-quality state where applicable.
- Shared filters: System/SID, Instance, time range and source/data state. Only show a filter when relevant to the page and supported by the source.
- Clicking a Home widget must open the appropriate detail page with its selection context preserved.
- Existing fixed navigation is retained. The ten islands below map to existing routes; no extra sidebar items are introduced.

## Shared page shell
1. Existing global header and sidebar.
2. Page title + concise purpose statement.
3. Context strip: selected system, relevant instance, time range, source freshness/coverage.
4. Compact KPI row (only KPIs with a verified definition and available fields).
5. Primary analytical visualization or topology.
6. Operational table/list with search, sorting and relevant filters.
7. Select-row detail drawer with raw evidence/provenance and related records.
8. Capability affordances are shown in their natural context; disabled future actions must say why unavailable and must not resemble successful execution.
9. All states localized in English and Persian: loading, success, empty, partial, stale, unavailable/not-supported, unauthorized and error.
10. Use the common dark navy visual system, cyan/blue accents, and text+icon+color status semantics. Preserve RTL/LTR behavior.

## Island 01 — Landscape & Availability
Route: `/landscape`
Purpose: answer which systems/instances are known, their reported state, and when the state was observed.
Layout:
- Row 1: system count; instance count; known/unavailable/unknown distribution; latest observation age. Do not show an overall availability percentage without an approved denominator and observation policy.
- Main left (8/12 desktop columns): environment/system topology cards using only inventory-backed environment names and system→instance→host links.
- Main right (4/12): selected system summary and recent related events.
- Bottom full width: instance inventory table.
Table columns (only when source fields exist): SID/system ID, environment, instance ID, host, reported state, observed-at, source, data state.
Features: system/environment filters; select system/instance; jump to Systems; coverage and stale-data visibility.
Evidence baseline: SM51 artifact exists. SM04/SM21/RZ20 are supporting evidence, not proof of whole-system availability. Exact source fields require extraction confirmation.

## Island 02 — Performance & Workload
Route: `/performance`
Layout:
- Row 1: verified workload/response-time/resource KPIs only.
- Main left (8/12): selected metric trend with explicit unit, interval and gaps for missing observations.
- Main right (4/12): per-instance resource/workload comparison where comparable records exist.
- Bottom: Work Process table and/or workload breakdown.
Sources: ST03N.pdf, ST03N-02.stats, ST03N-03.stats, ST06.pdf and ST06-01..03.pdf, SM50.pdf, SM66.pdf.
Features: metric selector limited to implemented measures; time window; instance comparison; outlier drill-down.
Do not assume the .stats schema or infer CPU/memory percentages until the file format and units are parsed. SM50/SM66 snapshots are not automatically a historical trend.

## Island 03 — Jobs & Background Processing
Route: `/jobs-processes`
Layout:
- Row 1: job totals by status, failed jobs and long-running jobs only if scope/window and required fields are validated.
- Main: full-width searchable job table; default sort is newest relevant failure first, then start time.
- Secondary: status distribution chart only if each row has a validated status and duplicates are handled.
- Detail drawer: job identity, status, start/end, duration, user, server/target, job log/step evidence only where present in source.
- Related evidence strip: links to SM21/ST22/SM13 records only when deterministic keys or reviewed time/system matching rules exist. Label time correlation as a clue, not causation.
Source artifact: SM37.pdf; user-uploaded SM37.md extraction reviewed. Confirmed labels include JobName, Job CreatedBy, Status, Start date, Start Time, Duration(sec.), Delay and Cli; Reason for Delay, Spool and Job doc labels are present but row-level values are incomplete. Observed row statuses: Finished, Canceled, Released, Scheduled. See docs/SM37_SOURCE_FIELD_MAPPING.md. Keep counts/charts disabled until unique row identity, deduplication, column alignment and normalized status mapping are validated.
Features: status/time/user/name filters; row selection; details; Home-to-detail deep link. Phase 1 has no re-run/cancel/release controls.

## Island 04 — Database & Storage
Route: `/database`
Layout:
- Row 1: database identity/type, available capacity and response/resource metrics only when present and semantically validated.
- Main left: capacity trend only if multiple dated observations exist.
- Main right: database/storage status evidence panel.
- Bottom: source-backed database/volume table and related backup evidence.
Sources: DB12.pdf, DB12-01..11.png, ST06 family where relevant.
Features: database/source selection, capacity filters, evidence details, links to Backup & Recovery.
Do not assume HANA, a database role, free-space percentage, growth rate or response time from screenshot art. Backup completion does not prove restore readiness.

## Island 05 — Security & Authorization
Route: `/security`
Layout:
- Row 1: observed sessions, lock records and confirmed security events, each with distinct scope.
- Main left: user/session table based on SM04 evidence.
- Main right: lock list/detail based on SM12 evidence.
- Bottom: available system-log evidence; a dedicated Authorization/Audit section remains NOT_SUPPORTED until a suitable source is connected.
Sources: SM04.xlsx, SM12.xlsx, SM21.pdf.
Features: user/session/transaction/time filters where fields exist; record detail; explicit coverage gap for roles/authorization objects/security audit log.
Never equate an active session with an authorization violation.

## Island 06 — Logs, Dumps & Events
Route: `/alerts-events`
Layout:
- Row 1: counts of source-backed events, dumps and update errors within the selected window.
- Main: time-ordered event timeline with visible gaps/coverage limits.
- Bottom: searchable event table; tabs/filters for SM21, ST22, SM13 and RZ20 records.
- Detail drawer: source record, timestamp, severity as reported, technical context and related links.
Sources: SM21.pdf, ST22.pdf, SM13.pdf, RZ20.pdf.
Features: severity/type/system/time filters; event details; deduplication only when stable identifiers or explicit rules exist.
Do not combine unlike event types into a single count without defining the counting rule. Do not assert root cause from temporal proximity alone.

## Island 07 — Interfaces & Connectivity
Route: `/systems` (connectivity section; preserve current sidebar/routes)
Layout:
- Row 1: Gateway/connection metrics only if exposed by the SMGW evidence.
- Main: connection/partner table where the source contains stable record fields.
- Bottom: connectivity event list from supported SMGW/SM21 evidence.
- Coverage panel: RFC, IDoc, qRFC, tRFC and external endpoint queues show NOT_CONNECTED/NOT_SUPPORTED until a source exists.
Sources: SMGW.pdf and SM21.pdf.
Features: search/filter supported connection fields; detail drawer; warning rules only after field semantics are verified.
Do not imply whole-network health from SMGW alone.

## Island 08 — Transports & Changes
Route: `/transports`
Layout:
- Row 1: request/import counts by verified status and time window.
- Main: transport queue/status table.
- Secondary: import history/status distribution only if the PDF provides multiple records and stable statuses.
- Detail drawer: request identifier, target, timestamps, import log/messages as present.
Source: STMS.pdf.
Features: request search, target filter, import detail and links to related events where keys support them.
Phase 1 is read-only; no import/approval/release action.

## Island 09 — Backup & Recovery
Route: `/backup-recovery`
Layout:
- Row 1: latest backup evidence, last observed status and age where the source contains them.
- Main: backup history table; a trend chart only when multiple timestamped records with consistent status exist.
- Side panel: evidence of restore testing, RPO/RTO and recovery readiness; show UNKNOWN/NOT_PROVIDED where absent.
- Bottom: DB12 source screenshots/report references.
Sources: DB12.pdf and DB12-01..11.png.
Features: time/status filters; backup record detail; warning on overdue/failed backup only after policy and source fields are confirmed.
Never equate successful backup with proven recovery.

## Island 10 — System Operations
Route: `/overview` (operational aggregation; preserve route and sidebar)
Layout:
- Row 1: cross-domain issue counts and data coverage; each count must trace to source rows and a declared deduplication rule.
- Main left: prioritized issue queue with domain, system, timestamp, evidence and status.
- Main right: event timeline for the selected system/time window.
- Bottom: domain readiness matrix across Landscape, Performance, Jobs, Database, Security, Logs, Connectivity, Transports and Backup.
Features: unified filters; drill-down to the authoritative domain page; evidence-based correlation only. Execution Runbooks may appear as planned/disabled affordances but must not invoke actions in Phase 1.
Sources: aggregate existing SRC only; do not create an independent parallel health calculation.

## Cross-page consistency rules
- Home is unchanged and is the summary entry point.
- Each Home KPI links to one authoritative detail definition/source. Reuse the same metric ID, unit, time scope, filters and status rules.
- Navigation context includes system, instance and time window when relevant.
- If detail rows do not reconcile to a summary, display the reason (window, filter, stale source, partial collection or deduplication rule); do not silently force matching totals.
- UNKNOWN and STALE records never count as healthy.
- Any metric without a validated formula/source/units is hidden or displayed as Not configured, not fabricated.
- All demo fixtures are labeled DEMO in both data and UI; the existence of SRC files does not mean a live connection exists.

## Validation status
This document establishes visual layout and intended behaviors. It does not claim that all source fields have been extracted, that live endpoints exist, or that browser/UI tests have passed. See `docs/SRC_WIDGET_FIELD_MAPPING.md` and `docs/SM37_HOME_TO_DETAIL_VALIDATION.md` for evidence and validation gates.


## SM37 prototype artifact
Standalone bilingual visual/interaction prototype: `prototypes/sm37-home-to-detail.html`. It demonstrates Home-to-detail navigation, sample-row search/status filtering and a read-only detail drawer. It is a prototype only, not the integrated application or live SAP monitoring.
