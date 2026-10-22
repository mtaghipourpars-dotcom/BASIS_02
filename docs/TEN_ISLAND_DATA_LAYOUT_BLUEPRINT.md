# BASIS_02 — Ten-Island Data & Layout Blueprint

Status: Design proposal grounded in the current BASIS_01/SRC inventory; field-level validation remains pending.
Purpose: define what each of the ten operational islands displays, which evidence exists in BASIS_01/SRC, what is missing, and how all pages share one coherent data model. This is an MVP blueprint, not a promise to implement every SAP Basis function.

## Non-negotiable product rules

1. The application is one product and one shared operational picture, not ten data islands.
2. Reuse a shared entity identity and provenance model across Home and every detail page: system_id, instance_id, host_id (when evidenced), observed_at, timezone, source_id, mode (LIVE or DEMO), quality, and freshness.
3. No source field, metric, unit, threshold, timestamp, severity, correlation, or business meaning may be invented. If a source does not provide it, show Unknown / Not available or an explicitly labeled DEMO fixture.
4. A screenshot/PDF/XLSX/STAT file in BASIS_01/SRC is evidence of a captured transaction/report, not proof of a live API, continuous collection, current production state, or field-level semantic validation.
5. Do not calculate aggregate health, alert counts, percentages, trends, or correlations until formulas, denominator, time window, duplicates, and missing-data behavior are defined.
6. A source record used by a widget must retain its provenance and be drillable to its evidence/detail record. Cross-page navigation preserves system, time range, and applicable filters.
7. MVP is read-only Monitoring. Future E/Execution concepts may be shown as disabled/preview flows only; no operation is claimed to run against SAP unless a separately approved integration exists.
8. Visually distinguish LIVE, DEMO, STALE, PARTIAL, UNKNOWN and ERROR. Unknown must never look healthy.

## What is currently in BASIS_01/SRC

Repository path: BASIS_01/SRC

| Artifact | Evidence area | Confidence boundary |
|---|---|---|
| SM51.pdf | SAP application servers / instances list | Captured report only; validate identifiers and status fields |
| SM04.xlsx | Logged-on users / sessions | Captured workbook; not a live session feed |
| SM12.xlsx | Lock entries | Captured workbook; lock age/owner semantics require inspection |
| SM50.pdf, SM66.pdf | Work processes / system-wide process overview | Captured reports; snapshots are not time-series telemetry |
| ST03N.pdf, ST03N-01.pdf, ST03N-02.stats, ST03N-03.stats | Workload statistics | Reports/statistics exist; parse schema, periods, units, aggregation and system identity before use |
| ST06.pdf, ST06-01.pdf–ST06-03.pdf | Host/OS monitoring | Captured reports; operating-system fields and units require validation |
| SM21.pdf | SAP system log | Captured log/report; event timestamps, severity and message identifiers need mapping |
| RZ20.pdf | CCMS monitoring tree / monitoring values | Captured report; tree structure and status semantics need validation |
| ST22.pdf | ABAP runtime errors / dumps | Captured report; dump identity, timestamp and deduplication rules need validation |
| SM13.pdf | Update records/errors | Captured report; status and retention semantics need validation |
| SM37.pdf | Background jobs | Captured report; job key, status, planned/start/end times and logs need validation |
| SMGW.pdf | Gateway monitoring | Captured report; does not by itself establish RFC destination health |
| DB12.pdf, DB12-01.png–DB12-11.png | Backup/DB administration evidence | Captured reports/screens; DB platform, backup status semantics and recovery proof need validation |
| STMS.pdf | Transport management | Captured report; import queue/history/status mapping needs validation |
| dashboard.png | Existing dashboard visual reference | Design evidence only; not a data source |
| sapchart_dbg.txt, test.txt | Debug/test artifacts | Not operational evidence without further validation |

### Evidence not found in the current SRC directory listing

No explicit source artifact was found for: detailed authorization analysis / SU53 / user-role assignments / Security Audit Log; database performance and SQL plan/statement metrics; filesystem capacity beyond what is actually present in ST06/DB12; spool requests; certificate expiry; license state; HTTP/ICM services; enqueue-server health beyond evidence available in current reports; interface payloads such as IDoc/PI/CPI queues; HA/DR replication and a verified recovery test. These remain MISSING SOURCE EVIDENCE, not presumed zero/healthy.

## The ten operational islands

The sidebar's ten islands are stable product domains. Home is the cross-domain command center; Reports and Settings are shared utilities, not additional operational islands.

### 01 — Landscape & Availability
Purpose: answer “Which systems/instances exist, and what can we actually confirm about their current state?”
- Primary views: landscape map/list; system and instance table; availability/status strip; last-observed/source-quality column; selected system detail.
- Evidence available: SM51.pdf; supporting context from SM04.xlsx, SM21.pdf, RZ20.pdf.
- Missing / must not infer: continuous availability, uptime %, heartbeat freshness, host mapping, HA status, maintenance windows unless supplied by a validated source.
- Layout: top summary strip; center relationship view (system → instance, only if IDs support it); bottom dense sortable table and evidence drawer.
- MVP: display extracted fixture data with DEMO/source evidence labels; LIVE only after service/schema validation.

### 02 — Performance & Workload
Purpose: locate workload pressure and drill from aggregate statistics to supporting evidence.
- Primary views: workload trend; response-time/workload breakdown only where fields exist; top workload contributors; work-process snapshot; host-resource snapshot; period/system filters.
- Evidence available: ST03N.pdf, ST03N-01.pdf, ST03N-02.stats, ST03N-03.stats, ST06.pdf and variants, SM50.pdf, SM66.pdf.
- Missing / must not infer: continuous CPU/memory/response-time series, DB time, SQL expensive statements, thresholds, historical baselines unless verified in source payloads.
- Layout: large workload trend first; adjacent resource gauges with units and timestamp; lower ranked tables for workload/process evidence; right-side contextual drilldown.
- MVP: parse/normalize only verified statistics; no fabricated line charts from unrelated snapshots.

### 03 — Jobs & Background Processing
Purpose: identify failed/late/long-running jobs and inspect evidence.
- Primary views: job status distribution; recent failed/cancelled jobs; job list with name, user, status, start/end/duration only if present; job detail/log evidence; trend only if multiple comparable periods exist.
- Evidence available: SM37.pdf.
- Supporting evidence: SM21.pdf, ST22.pdf, SM13.pdf may help contextualize a time-correlated incident but do not prove a causal relationship.
- Missing: recurring schedule definitions, dependencies, business SLA, job chain, automatic rerun permissions, continuous job feed.
- Layout: urgent job queue at top; filterable jobs table in main canvas; side panel for selected job, execution timeline and available log evidence.
- MVP: read-only; rerun/reschedule buttons must be disabled or explicitly preview-only.

### 04 — Database & Storage
Purpose: show database-related evidence and capacity indicators actually present in source.
- Primary views: DB identity/platform when evidenced; backup/DB administration evidence; storage/capacity values only when source includes field, unit and observation time; database-related alerts.
- Evidence available: DB12.pdf, DB12-01.png–DB12-11.png; ST06 reports may contain host-level resource fields after validation.
- Missing: SQL statement analysis, HANA memory/thread samples, DB service health, tablespace/data/log volume time series, DB waits, database-specific metrics not present in these artifacts.
- Layout: database identity/health header; capacity trend only for validated time-series; compact capacity cards with units; evidence table and selected metric detail.
- MVP: do not label a DB “healthy” based solely on a backup report.

### 05 — Security & Authorization
Purpose: surface authorization/security evidence without implying a full security audit.
- Primary views: user sessions as operational context; lock entries as lock management context; security event table only if actual security log source is added; explicit source-coverage panel.
- Evidence available: SM04.xlsx (sessions), SM12.xlsx (locks), SM21.pdf (system log may include security-relevant messages, but is not a substitute for Security Audit Log).
- Missing: role/profile assignments, failed authorization checks/SU53, SUIM analysis, Security Audit Log, privileged-user inventory, password policy and certificate posture.
- Layout: source coverage / blind-spot banner; session/lock summary; event table when supported; clearly separate “operational locks” from “authorization failures”.
- MVP: no fabricated risk scores, role counts, unauthorized-user counts or security posture score. Keep missing controls visibly “Not connected”.

### 06 — Logs & Dumps
Purpose: give a unified, filterable view of recorded SAP errors with drilldown to original evidence.
- Primary views: system log events; ABAP dumps; update failures; event timeline; severity/category filters when supported; duplicate grouping only with stable event keys.
- Evidence available: SM21.pdf, ST22.pdf, SM13.pdf; RZ20.pdf for monitoring events.
- Missing: full Application Log (SLG1) export, source API, retention/collection guarantee, validated severity normalization.
- Layout: incident/event timeline on top; central event table; selected-event drawer showing original source, timestamp, message, and links to related pages only when keys/time support it.
- MVP: preserve raw source category and original severity; normalized severity requires documented mapping.

### 07 — Interfaces & Connectivity
Purpose: show technical connectivity evidence and explicitly expose coverage gaps.
- Primary views: gateway status/details from source; connectivity incidents from logs; RFC/interface queue cards only after those sources exist.
- Evidence available: SMGW.pdf; supporting events from SM21.pdf and RZ20.pdf.
- Missing: RFC destination test results/SM59, tRFC/qRFC/bgRFC queues, IDoc/PI/CPI message state, HTTP/ICM services, end-to-end interface monitoring.
- Layout: connectivity coverage matrix first; gateway snapshot; recent related events; interface inventory and queue views appear only when validated data is available.
- MVP: never equate gateway visibility with end-to-end RFC/interface health.

### 08 — Transports & Changes
Purpose: follow transport/import evidence and highlight failed or incomplete transitions.
- Primary views: import queue/history; request status; import logs and timestamps; recent change timeline if source provides it.
- Evidence available: STMS.pdf.
- Missing: ChaRM/change approval integration, transport-to-business-impact links, automated comparison of configuration snapshots, complete DEV→QAS→PRD route model unless evidenced.
- Layout: landscape route ribbon only if actual route data is available; import-status summary; transport table; selected request log drawer.
- MVP: no invented transport counts, route paths or “safe to import” recommendation.

### 09 — Backup & Recovery
Purpose: make backup evidence and recovery-readiness limitations visible.
- Primary views: backup history/status; last successful backup only when explicitly indicated; source timestamp; DB/system association; failures and duration where available.
- Evidence available: DB12.pdf and DB12-01.png–DB12-11.png.
- Missing: external backup tool status, offsite/immutable copy verification, restore-test results, RPO/RTO objectives, replication/DR status.
- Layout: latest evidenced backup as hero card; history table; timeline; separate recovery-test readiness panel marked “No evidence” until a restore test source exists.
- MVP: a backup record is not proof that restore works; do not show “Recovery ready” without test evidence.

### 10 — System Operations
Purpose: consolidate operational context and, in later phases, controlled actions.
- Primary views: current system/instance context; work processes; sessions/locks; update status; jobs and relevant logs; operations history only when an audit source exists.
- Evidence available: SM51.pdf, SM50.pdf, SM66.pdf, SM04.xlsx, SM12.xlsx, SM13.pdf, SM37.pdf, SMGW.pdf.
- Missing: authenticated command/service execution API, action authorization checks, approval workflow, immutable audit record, post-action verification.
- Layout: system selector and health context; read-only operational workbench with categorized panels; future actions in a clearly disabled “Planned” state until separately approved.
- MVP: read-only. Do not imply unlock/restart/rerun actions actually execute.

## Shared cross-page experience

- Global context: selected system/instance, time range, timezone and filters are preserved during drill-down when applicable.
- One canonical entity identity: source-specific identifiers are retained; cross-source joins are enabled only when a verified mapping exists.
- One event/incident representation can link to multiple source records, but correlation must be explicitly rule-based, time-proximity-only, or confirmed; time proximity alone is not root-cause proof.
- All cards, tables and charts use the same normalized values and aggregation definitions. Home summary totals must equal their corresponding filtered detail records for the same scope/time window.
- Each widget must expose source_id, mode, observed_at, quality, freshness, unit and a human-readable definition.
- Use consistent states: loading, success, empty, partial, stale, unknown, unavailable, error.
- The same entity uses the same display name, ID, status mapping, timestamp/timezone and severity semantics everywhere.

## Design inspiration — patterns to borrow, not copy

- SAP Focused Run Operations Dashboard: configurable tiles/list-detail views, severity/category filtering, live-oriented operations summary and drill-down.
- SAP Focused Run System Monitoring: object hierarchy across technical systems, instances, databases and hosts; metric history and context-sensitive drill-down.
- Dynatrace Problems: incident-centered overview, impact context, evidence-backed root-cause section and visual resolution path.
- BASIS_02 design adaptation: keep the approved dark navy/cyan dense cockpit; use a high-signal top summary, one dominant chart or queue per page, compact evidence tables, and a consistent right-side detail drawer. Do not reproduce competitor branding or imply unavailable AI correlation.

References:
- SAP Focused Run: https://support.sap.com/en/alm/sap-focused-run.html
- SAP Operations Dashboard: https://support.sap.com/en/alm/sap-focused-run/expert-portal/operations-dashboard.html
- SAP System Monitoring: https://support.sap.com/en/alm/sap-focused-run/expert-portal/system-monitoring.html
- Dynatrace Problems app: https://docs.dynatrace.com/docs/dynatrace-intelligence/problems-app

## Validation gates before calling any field LIVE

For each proposed field/widget, inspect the actual SRC artifact and record:
1. exact source artifact/page/worksheet and field label;
2. sample raw value and its type;
3. semantic definition and unit;
4. system/instance key and observation timestamp/timezone;
5. whether it is snapshot, historical aggregate, or continuous telemetry;
6. parsing/normalization and null/duplicate behavior;
7. acceptance fixture and cross-page consistency test;
8. explicit approval of the source mapping.

Until those gates pass, mark it EVIDENCE_FIXTURE or DEMO, not LIVE.
