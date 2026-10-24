# BASIS_02 — Ten Islands: KPI, Layout, Data and E/M/W Functional Specification

Document ID: BASIS02-10-ISLANDS-EMW-001  
Version: 1.0  
Status: **PROPOSED DESIGN BASELINE — not a claim of implementation or source approval**  
Scope: The ten operational islands only. The approved Home composition, global shell, fixed sidebar order and existing route IDs remain unchanged.

## 1. Purpose and decision rules

This document completes the page-level design package for the ten operational islands by defining layout, information model, candidate KPIs, and Monitoring (M), Warning (W) and Execution (E) capabilities. It is subordinate to `MASTER_SPECIFICATION.md`, `specs/pages.yaml`, `specs/widgets.yaml`, `specs/data-contracts.yaml`, `specs/metric-registry.yaml`, `docs/VISUAL_ARCHITECTURE.md`, and `docs/ISLANDS_VISUAL_SPEC.md`.

### 1.1 The three capability tracks

- **M — Monitoring:** observe, filter, compare, inspect evidence, see freshness/coverage, and navigate to the authoritative detail. Read-only.
- **W — Warning:** evaluate an explicitly versioned rule against validated observations, explain why it fired, rank by configured severity/impact/confidence, and track the alert lifecycle only where lifecycle data exists. A warning is not an action and not a root-cause assertion.
- **E — Execution:** a future controlled-operation capability. Design its affordances and contract now, but keep every SAP/OS mutation disabled in Phase 1. An E action may become active only after an approved action adapter, least-privilege authorization, precondition checks, impact preview, explicit confirmation/approval, idempotency/concurrency controls, audit record, timeout/error handling, and post-action verification are implemented and tested. A UI button alone never constitutes an execution capability.

These are capabilities embedded in the relevant page context, **not global modes, top-level navigation items, or three versions of each page**.

### 1.2 Universal data and safety rules

1. Preserve the Home screenshot/layout and the existing sidebar inventory/order. No extra sidebar entries.
2. Existing routes are authoritative: `/landscape`, `/performance`, `/jobs-processes`, `/database`, `/security`, `/alerts-events`, `/systems` (connectivity section), `/transports`, `/backup-recovery`, `/overview` (cross-domain operations). Do not rename routes.
3. Each data-bearing widget must expose source, system/scope, observation time, quality, freshness and mode where applicable.
4. Data modes: DEMO and LIVE are distinct. DEMO is always visibly labelled. LIVE is allowed only after a validated collector/service, field mapping and freshness policy exist.
5. Missing, stale, partial, invalid, unauthorized, unsupported and empty are different states. Missing is never zero and never healthy. A valid empty result is distinct from an unavailable source.
6. Never infer a field, unit, threshold, topology relationship, status mapping, causal link or unique record identity from a transaction name or screenshot.
7. Every KPI below is a **candidate definition**. The definition is stable enough to implement after its source fields and data-quality prerequisites pass; this document does not falsely approve unavailable data. Where source evidence is not sufficient, render **UNKNOWN / NOT_CONFIGURED / NOT_SUPPORTED**, not a fabricated value.
8. Use the common dark navy visual system, cyan/blue accents, compact cards, text+icon+color statuses, responsive layout, keyboard accessibility, and complete English LTR / Persian RTL localization. Technical identifiers remain LTR-isolated.
9. Global context is inherited where relevant: System/SID, instance, time range, data mode/state. A page may expose only filters supported by its source.
10. Cross-page navigation carries only supported filters and selection context. The Home aggregate and island detail must use the same metric definition, source scope, time boundaries, status mapping, deduplication rule and freshness state.

### 1.3 Shared page layout template

Unless a page-specific layout below overrides it:
1. Existing global header and sidebar.
2. Page title, concise purpose, and visible DEMO/live/coverage state.
3. Context strip: system, relevant instance, time range, last observation and source coverage.
4. Compact KPI row; unsupported metrics are shown as unavailable/unknown placeholders rather than synthetic values.
5. Main analytical visualization or topology at desktop 8/12 width, with a 4/12 evidence/priority panel where specified.
6. Searchable, sortable operational table or event list.
7. Row-selection detail drawer with source provenance, raw source values, quality/freshness and verified related evidence.
8. Contextual M/W/E affordances. Future E controls are visibly disabled with a localized reason.
9. Explicit loading, success, empty, partial, stale, unavailable/not-supported, unauthorized and error states.
10. Desktop baseline 1536×1024; also test 1280×800, tablet and mobile. Mobile stacks in semantic order without clipping or horizontal overflow.

## 2. KPI definition standard

Every metric implementation must record: ID, display name, business definition, formula, source contract and fields, unit, aggregation, time window, filters, null handling, duplicate handling, freshness policy, threshold/rule reference, test cases, and approval/implementation status.

### KPI formula patterns (apply only when prerequisites are satisfied)

- **Entity count:** count distinct validated entity IDs after applying the same filters as the detail table. Never equate raw rows to unique entities.
- **Status count:** count distinct validated records whose raw status maps to a documented normalized status; retain the raw status and mapping version.
- **Rate:** numerator / eligible denominator × 100. Display only when both are validated and share scope/window; do not divide by zero.
- **Age:** current observation time minus source observation time, with explicit timezone. Do not substitute UI load time for source observation time.
- **Duration:** validated end timestamp minus start timestamp, or a source duration field whose column alignment and unit have been verified. Do not mix derived and raw duration silently.
- **Trend:** comparable time buckets with same metric definition, unit, aggregation and scope. Missing buckets are gaps, not zero.
- **Threshold:** compare a validated measure to a documented, versioned threshold with owner, severity, evaluation window and reset/clear semantics. Thresholds remain NOT_CONFIGURED until policy is approved.
- **Correlation:** only deterministic identifiers or an explicitly reviewed correlation rule. Time proximity alone is a clue, not proof of causation.

## 3. Island 01 — Landscape & Availability

**Route:** `/landscape`  
**Goal:** establish which systems, instances and relationships are actually known, what their latest reported state is, and how complete/fresh the evidence is.  
**Evidence baseline:** SM51 artifact exists; SM04/SM21/RZ20 are supporting evidence, not proof of whole-system availability. Exact field mapping remains to be validated.

### Layout and widgets
- **Row 1 KPI cards:** Known systems; known instances; reported-state distribution (available/unavailable/unknown only if source semantics support those labels); oldest/latest observation age or source coverage.
- **Main left (8/12):** environment/system/instance/host topology cards. Draw only relationships present in source records.
- **Main right (4/12):** selected system evidence summary, latest observations and related verified events.
- **Bottom full width:** inventory table with only source-backed columns: SID/system ID, environment, instance ID, host, reported state, observed-at, source and data state.
- **Secondary panel:** inventory gaps, unlinked instances, unsupported source fields and stale collectors.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| LAN-01 | Known systems | Distinct validated system IDs; systems | Unique system identity + scoped inventory |
| LAN-02 | Known instances | Distinct validated instance IDs; instances | Unique instance identity + mapping to system where known |
| LAN-03 | Systems by reported state | Distinct systems grouped by raw-to-approved state mapping; systems | State semantics and mapping approved |
| LAN-04 | Inventory coverage | Observed required inventory fields / all required inventory fields × 100; % | Required-field set and denominator approved |
| LAN-05 | Observation age | Now − source observed_at; time | Source timestamp + timezone + freshness policy |
| LAN-06 | Stale inventory items | Distinct entities beyond approved freshness limit; entities | Freshness limit and collector timestamps approved |

Do not publish an overall availability percentage until denominator, sampling, missing-system policy and time window are approved.

### M / W / E capabilities
- **M:** filter environment/system; inspect system→instance→host only where evidenced; compare current source snapshots; show provenance and coverage; deep-link to Systems, Performance, Events and Database while preserving scope.
- **W:** candidate rules for missing inventory, stale observation, state explicitly reported as unavailable, and contradictory system/instance mappings. Each warning shows rule ID/version, evidence, observation time and coverage caveat. No warning from absence alone unless a source-coverage policy proves expected collection.
- **E:** future runbook affordances for approved diagnostic refresh or controlled service operations, disabled in Phase 1. Before activation require target identity, impact preview, role authorization, maintenance-window/precondition checks, confirmation, audit and post-action observation. Do not expose generic “restart” from an inventory card.

### Acceptance
Every topology edge maps to source evidence; counts reconcile to filtered table; no unsupported availability percentage; stale/unknown never shown as healthy; deep links preserve system scope.

## 4. Island 02 — Performance & Workload

**Route:** `/performance`  
**Evidence baseline:** ST03N, ST06 and SM50/SM66 artifacts exist; exact .stats schema, metrics, units and timestamp semantics require inspection. A single SM50/SM66 snapshot is not a trend.

### Layout and widgets
- **Row 1:** only verified workload, response-time, host-resource and work-process KPIs, each with unit, scope, observation time and freshness.
- **Main left (8/12):** selected metric time-series with explicit bucket size, aggregation and visible gaps.
- **Main right (4/12):** comparable per-instance/system snapshot comparison and threshold context.
- **Bottom:** Work Process snapshot table and/or workload breakdown; label snapshots clearly.
- **Side drawer:** selected point/process details, source evidence and related events if keys permit.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| PERF-01 | Workload volume | Source-defined workload count/sum per approved interval; source unit | ST03N field, unit and aggregation validated |
| PERF-02 | Response time | Source-defined response-time measure; ms or source unit | Exact source field/unit and aggregation validated |
| PERF-03 | CPU utilization | Source CPU measure with source unit; % only if source reports/defines % | ST06 schema/unit and host scope validated |
| PERF-04 | Memory utilization | Source memory measure; source unit or % only if supported | Memory total/used semantics validated |
| PERF-05 | Filesystem utilization | Used / total × 100 only with compatible validated capacity fields; % | Same filesystem, units and observation time |
| PERF-06 | Work processes by state | Distinct process records grouped by source-confirmed state; processes | SM50/SM66 row identity and state labels validated |
| PERF-07 | Metric observation age | Now − source observed_at; time | Timestamp/timezone available |
| PERF-08 | Threshold breaches | Count of evaluated observations over configured threshold; observations | Metric + threshold + window + dedupe policy approved |

### M / W / E capabilities
- **M:** metric selector limited to implemented measures; time window; per-instance comparison only for comparable units/scopes; point drill-down; raw source value and collection gaps.
- **W:** threshold breach, sustained high utilization, workload/response deviation, work-process saturation and missing metric collection only after semantics, baseline/window and threshold are approved. Avoid claiming root cause from coincident metrics.
- **E:** future controlled diagnostic capture or approved workload/service operation; disabled until action adapter, permissions, target resolution, safety checks, audit and result verification exist. Never add a tuning or restart action based solely on a chart spike.

### Acceptance
Axes/units match source; no false zero across missing buckets; no trend from one snapshot; comparisons require same metric/window/scope; alerts identify the exact rule and evidence.

## 5. Island 03 — Jobs & Background Processing

**Route:** `/jobs-processes`  
**Primary source:** SM37.pdf / extracted SM37.md. Observed labels: JobName, Job CreatedBy, Status, Start date, Start Time, Duration(sec.), Delay, Cli, Reason for Delay, Spool, Job doc. Observed row statuses: Finished, Canceled, Released, Scheduled. The report metadata “8,062 records passed” is not a validated unique job-run count. Stable job-run identity, SID, capture time/timezone, end time and Delay meaning/unit are not established.

### Layout and widgets
- **Row 1:** total jobs by validated status; canceled jobs; running/active jobs; long-running jobs. Each remains UNKNOWN/disabled until required identity, mapping, scope and freshness gates pass.
- **Main full width:** searchable job table; filters for system, time, status, creator and job name only when fields exist. Default sort: verified failures first, then newest relevant start time.
- **Secondary:** status distribution only after complete extraction, row uniqueness, deduplication and status normalization pass.
- **Right drawer:** raw source fields, selected record locator, source section, observation time and quality. Never label a derived DEMO locator as SAP-native job ID.
- **Related evidence strip:** SM21/ST22/SM13 only with deterministic keys or a reviewed and visibly labelled correlation rule.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| JOB-01 | Distinct job runs | Count distinct validated run IDs; runs | Native stable ID or approved composite identity + dedupe |
| JOB-02 | Finished jobs | Distinct runs mapped to Finished; runs | Complete rows and approved status mapping |
| JOB-03 | Canceled jobs | Distinct runs mapped to Canceled; runs | Same as above |
| JOB-04 | Cancellation rate | Canceled distinct runs / eligible terminal runs × 100; % | Complete terminal population and scope |
| JOB-05 | Active jobs | Distinct runs in validated active/running state; runs | Fresh live source and approved raw-to-state mapping |
| JOB-06 | Long-running jobs | Active runs whose verified duration exceeds configured threshold; runs | Start/now semantics, freshness and threshold approved |
| JOB-07 | Start delay | Source-defined delay; unit per source | Delay semantics/unit confirmed; otherwise NOT_CONFIGURED |
| JOB-08 | Job duration | Verified duration field or validated end−start; seconds | Column alignment or timestamps verified |
| JOB-09 | Repeat failure concentration | Distinct failed runs grouped by validated job definition; runs | Stable job definition/run IDs and history scope |
| JOB-10 | Job data freshness | Now − source observation time; time | Source observation timestamp and timezone |

### M / W / E capabilities
- **M:** read-only status and history inspection; name/creator/status/time filters; details and source traceability; preserve Home-to-detail context; distinguish raw from normalized status; expose source-data limitations.
- **W:** canceled job, threshold-confirmed long-running job, validated start delay, repeat failures and missing/stale collection. Each rule needs severity, evaluation window, duplicate suppression, clear/reset behavior and evidence. No threshold may be invented.
- **E:** future re-run/cancel/release actions only with SAP-authorized action APIs, job-run revalidation, authorization, precondition checks, duplicate-run/idempotency guard, impact confirmation, audit trail and post-execution verification. **All E controls disabled in Phase 1.** Do not represent the current prototype as executable or live.

### Acceptance
Home summary and detail reconcile exactly under identical scope; counts/charts stay disabled until identity/deduplication/status gates pass; raw Jalali date/time stays raw until calendar/timezone rules are approved; no execution control is callable.

## 6. Island 04 — Database & Storage

**Route:** `/database`  
**Evidence baseline:** DB12 reports/screenshots and relevant ST06 sources exist. Database technology, role, units, capacity semantics and response metrics must not be assumed from image appearance.

### Layout and widgets
- **Row 1:** configured database identity/type; reported state; validated capacity/free-space measures; last observation age. Unknown fields show UNKNOWN.
- **Main left (8/12):** capacity or performance trend only with multiple comparable timestamped observations.
- **Main right (4/12):** latest database/storage evidence, source status and related backup records.
- **Bottom:** source-backed database/volume table and evidence list.
- **Detail drawer:** database/volume identifier, linked system/host only if evidenced, raw values, unit, source and observation time.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| DB-01 | Known databases | Distinct validated database IDs; databases | Unique identity and system link validated |
| DB-02 | Reported database state | Count by approved source state; databases | State field and mapping validated |
| DB-03 | Used capacity | Source-reported amount; source unit | Exact field and unit validated |
| DB-04 | Free capacity | Source-reported amount; source unit | Exact field and unit validated |
| DB-05 | Capacity utilization | Used / total × 100; % | Used and total compatible and same scope/time |
| DB-06 | Capacity growth | Difference between comparable dated values / elapsed time; source unit per time | At least two comparable observations |
| DB-07 | Database observation age | Now − observed_at; time | Source timestamp/timezone |
| DB-08 | Database alerts | Count of validated database-specific event records; events | Event identity, scope and dedupe validated |

### M / W / E capabilities
- **M:** inspect database inventory, capacity and resource evidence; compare only compatible values; link to backup evidence without equating backup success to restore readiness.
- **W:** capacity threshold, rapid growth, missing/stale database telemetry and source-reported database event; activate only after units, policy, scope and evaluation window are approved.
- **E:** future approved diagnostic or capacity-management runbook; no delete, resize, restart or configuration mutation in Phase 1. Activation requires database-specific action adapter, authorization, impact/rollback plan, maintenance policy, audit and verification.

### Acceptance
Never assume HANA or another database type; all capacity figures have units; growth requires comparable timestamps; backup evidence and recovery proof remain distinct.

## 7. Island 05 — Security & Authorization

**Route:** `/security`  
**Evidence baseline:** SM04, SM12 and SM21 artifacts. These can support session, lock and system-log signals only as evidenced. They do not establish a complete authorization audit, intrusion detection system or security posture score.

### Layout and widgets
- **Row 1:** observed sessions, lock entries and confirmed security-relevant events as separate counts/scopes.
- **Main left (8/12):** session table from validated SM04 fields.
- **Main right (4/12):** lock list/detail from validated SM12 fields.
- **Bottom:** available SM21 evidence and explicit coverage matrix for unsupported roles/authorization objects/audit sources.
- **Detail drawer:** sanitized user/session/lock/event fields, observation time, source and access-controlled context.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| SEC-01 | Observed sessions | Count distinct validated session IDs; sessions | Stable session identity and snapshot time |
| SEC-02 | Distinct observed users | Count distinct validated user IDs; users | User field present, scope and dedupe approved |
| SEC-03 | Lock entries | Count distinct lock records; entries | Lock record identity and SM12 schema validated |
| SEC-04 | Long-held locks | Lock records older than configured age; entries | Lock age/timestamp and policy available |
| SEC-05 | Security-relevant events | Distinct source-confirmed event records by approved classification; events | Classification, IDs and dedupe approved |
| SEC-06 | Security source coverage | Connected validated required sources / approved required sources × 100; % | Required source inventory approved |
| SEC-07 | Session snapshot age | Now − observed_at; time | Timestamp/timezone validated |

### M / W / E capabilities
- **M:** inspect sessions and locks; filter by available user/system/time/transaction fields; show redaction and access limitations; distinguish session count from distinct-user count.
- **W:** policy-defined long-held locks, suspicious session patterns or security-relevant log records only when a security owner approves the rule and required evidence exists. Never treat a session alone as a violation.
- **E:** future controlled session termination or lock remediation only with security approval, strong authorization, target revalidation, user/business impact preview, confirmation, immutable audit and post-action verification. Disabled in Phase 1. No user unlock/termination action from a guessed signal.

### Acceptance
No unsupported security score; user data is minimized/redacted by role; sessions, users, locks and events remain separate entity types; missing authorization audit is visibly NOT_SUPPORTED.

## 8. Island 06 — Logs, Dumps & Events

**Route:** `/alerts-events`  
**Evidence baseline:** SM21, ST22, SM13 and RZ20 artifacts; exact schemas, timestamps, severity semantics and stable IDs require validation.

### Layout and widgets
- **Row 1:** source-backed system events, dumps and update errors within an explicit time window; separate counts per domain.
- **Main:** chronological event timeline with visible collection gaps.
- **Bottom:** searchable event table with source tabs/filters for SM21, ST22, SM13 and RZ20 when source is connected.
- **Right drawer:** raw source record, timestamp, source-reported severity, sanitized technical context and approved related links.
- **Correlation panel:** linked events only via deterministic identifiers or reviewed correlation policy; time-only correlation is labelled “temporal clue”.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| EVT-01 | System-log events | Distinct validated SM21 records; events | Stable event key or approved dedupe rule |
| EVT-02 | Dumps | Distinct validated ST22 dump records; dumps | Dump identity/time fields validated |
| EVT-03 | Update errors | Distinct validated SM13 records; errors | Update record identity/status mapping validated |
| EVT-04 | Events by reported severity | Distinct events grouped by source or approved normalized severity; events | Severity semantics/mapping approved |
| EVT-05 | Event recurrence | Repeated matching event fingerprints within window; occurrences | Fingerprint and suppression window approved |
| EVT-06 | Event source coverage | Sources collected successfully / approved expected sources; % | Expected-source list and collection outcomes |
| EVT-07 | Event observation lag | Ingest time − source event time; time | Both timestamps and timezone validated |

### M / W / E capabilities
- **M:** cross-source search, time ordering, severity/source/system filters, raw evidence drawer, collection coverage and safe navigation to Jobs, Performance, Security or Database.
- **W:** source-reported critical events, recurring dump/update-error patterns and rule-based event correlation only after classification, deduplication, time policy and evidence requirements are approved. Do not assert root cause from temporal proximity.
- **E:** future runbook recommendations and controlled remediation links; actions remain disabled until each runbook has explicit preconditions, permission model, approval, impact/rollback, idempotency, audit and verification. No “fix event” generic action.

### Acceptance
Unlike event types are not combined without an explicit rule; event IDs and dedupe rules are traceable; gaps are visible; correlation never overstates causality.

## 9. Island 07 — Interfaces & Connectivity

**Route:** `/systems` (connectivity section; preserve current route and sidebar).  
**Evidence baseline:** SMGW and SM21. These support only the fields shown by the source and do not prove whole-network or end-to-end integration health. RFC, IDoc, qRFC, tRFC and external endpoint queues remain NOT_CONNECTED/NOT_SUPPORTED until a suitable source is connected.

### Layout and widgets
- **Row 1:** validated gateway/connection counts and source-reported state only.
- **Main:** connection/partner table with stable source-backed fields and source status.
- **Bottom:** connectivity-related event list from supported SMGW/SM21 records.
- **Side coverage panel:** RFC/IDoc/qRFC/tRFC/external endpoint domains with explicit CONNECTED, NOT_CONNECTED, NOT_SUPPORTED or UNKNOWN state.
- **Detail drawer:** connection/partner attributes, evidence, source timestamp and related events.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| CON-01 | Observed gateway connections | Distinct validated connection IDs; connections | Stable source ID and SMGW field mapping |
| CON-02 | Connections by reported state | Distinct connections grouped by approved source state; connections | State semantics validated |
| CON-03 | Connectivity events | Distinct relevant SMGW/SM21 records; events | Event classification and dedupe approved |
| CON-04 | Connected domain coverage | Connected supported integration domains / approved expected domains; % | Expected-domain scope explicitly approved |
| CON-05 | Connection observation age | Now − source observed_at; time | Timestamp/timezone validated |
| CON-06 | Failed/abnormal connections | Distinct records in source-confirmed abnormal states; connections | Raw states and mapping approved |

### M / W / E capabilities
- **M:** search/filter source-confirmed gateway records; inspect connection detail; show unsupported integration domains and source coverage; link related events.
- **W:** source-confirmed abnormal connection states, recurring gateway events and stale collection; queue/partner failures only after a dedicated source is connected and its semantics validated.
- **E:** future controlled connection reinitialization or queue operation only after a domain-specific service, target checks, authorization, impact preview, duplicate/concurrency protection, approval, audit and post-action verification. Disabled in Phase 1.

### Acceptance
SMGW is not represented as whole-network health; unsupported queue domains are clearly labelled; connection counts reconcile to filtered records.

## 10. Island 08 — Transports & Changes

**Route:** `/transports`  
**Evidence baseline:** STMS artifact; request status, import execution result, target and timestamps must be mapped separately from actual source fields.

### Layout and widgets
- **Row 1:** requests/imports by verified state and time window; failed/blocked counts only when statuses are source-confirmed.
- **Main full width:** transport request/queue table with request ID, source/target, source status and timestamps where available.
- **Secondary:** import history or status distribution only with multiple complete records and validated mapping.
- **Detail drawer:** request identity, target, import log/messages and related events where evidence exists.
- **Coverage panel:** missing history/log/source fields and latest observation.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| TRN-01 | Distinct transport requests | Count distinct validated request IDs; requests | Stable request identifier |
| TRN-02 | Requests by status | Distinct requests grouped by approved raw-to-normalized mapping; requests | Status mapping validated |
| TRN-03 | Import outcomes | Distinct import executions grouped by source-confirmed result; executions | Import execution identity/result validated |
| TRN-04 | Failed imports | Distinct import executions with confirmed failure result; executions | Failure semantics and dedupe approved |
| TRN-05 | Pending age | Current time − validated request/import start time; time | Start timestamp, timezone and pending-state definition |
| TRN-06 | Transport observation age | Now − source observed_at; time | Source timestamp/timezone validated |

### M / W / E capabilities
- **M:** search requests, filter target/status/time, inspect import evidence, distinguish request lifecycle from import result, link to related events only with verified identifiers.
- **W:** source-confirmed import failure, blocked/pending beyond approved age, repeated failure to same target or stale source. Require rule, scope, severity, duplicate suppression and clear semantics.
- **E:** future release/import/re-import operations only with approved SAP integration, authorization, target/client validation, dependency/conflict checks, change window, impact preview, explicit confirmation/approval, audit and post-import verification. Disabled in Phase 1.

### Acceptance
Request state is not conflated with import result; counts reconcile; no release/import button is executable in Phase 1.

## 11. Island 09 — Backup & Recovery

**Route:** `/backup-recovery`  
**Evidence baseline:** DB12 reports/screenshots. Restore-test evidence, RPO/RTO and recovery readiness must be shown as UNKNOWN/NOT_PROVIDED unless actual records/policies exist.

### Layout and widgets
- **Row 1:** latest verified backup evidence, source-reported result and age if timestamps exist.
- **Main:** backup history table; trend only with multiple timestamped records and consistent status semantics.
- **Side panel:** restore-test evidence, configured RPO/RTO and recovery readiness separately; missing data remains UNKNOWN.
- **Bottom:** DB12 source evidence references and collection coverage.
- **Detail drawer:** backup identifier/type/target/time/result/log only when supplied by source.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| BAK-01 | Latest observed backup time | Maximum validated backup timestamp; datetime | Timestamp/timezone and record identity validated |
| BAK-02 | Backup age | Now − latest validated backup time; time | Timestamp/timezone available |
| BAK-03 | Backup outcomes | Distinct backup records grouped by source-confirmed result; backups | Result mapping and dedupe approved |
| BAK-04 | Failed backups | Distinct backup records with confirmed failure; backups | Failure semantics validated |
| BAK-05 | Backup policy compliance | Backups meeting approved schedule/retention policy / eligible scheduled backups × 100; % | Schedule, policy, expected runs and scope approved |
| BAK-06 | Restore-test coverage | Systems/databases with valid restore-test evidence / approved expected scope; % | Restore-test records and expected scope available |
| BAK-07 | RPO/RTO evidence | Recorded configured/observed value; time | Authoritative policy or test record exists |

### M / W / E capabilities
- **M:** inspect backup history and raw result; show backup age and source freshness; keep restore evidence, RPO and RTO as separate fields.
- **W:** failed/overdue backup or policy breach only after schedule, expected runs, retention, time zone and source status are validated. Missing restore test triggers “evidence missing” only if a policy requires it; never claim recovery failure merely because evidence is absent.
- **E:** future approved backup retry, verification or restore workflow. Restore is high impact: require change/incident approval, isolated target confirmation, preflight capacity/dependency checks, recovery point selection, explicit approval, audit and post-restore validation. Disabled in Phase 1.

### Acceptance
Successful backup is not labelled “recoverable” without restore evidence; RPO/RTO are not invented; overdue rules use an approved schedule.

## 12. Island 10 — System Operations (cross-domain overview)

**Route:** `/overview`  
**Goal:** present an evidence-backed operational queue across the other nine islands without creating a parallel or inconsistent health formula.

### Layout and widgets
- **Row 1:** cross-domain issue counts by severity/state and data-coverage summary. Each count traces to source records and a declared dedupe policy.
- **Main left (8/12):** prioritized issue queue: domain, system, timestamp, severity, evidence, rule ID/version, state and authoritative detail route.
- **Main right (4/12):** selected-system event timeline for the same time range.
- **Bottom full width:** readiness/coverage matrix across Landscape, Performance, Jobs, Database, Security, Events, Connectivity, Transports and Backup & Recovery.
- **Detail drawer:** source evidence, domain owner, related record IDs, freshness, correlation confidence and drill-down links.
- **Runbook area:** planned/disabled E affordances; no action runs from the aggregation page in Phase 1.

### Candidate KPIs
| ID | KPI | Formula / unit | Gate |
|---|---|---|---|
| OPS-01 | Open issues | Distinct active warning/incident IDs under approved lifecycle rule; issues | Stable issue identity and lifecycle state |
| OPS-02 | Issues by severity | Distinct issues grouped by approved severity; issues | Severity model and dedupe policy approved |
| OPS-03 | Critical issues by domain | Distinct qualifying issue IDs grouped by authoritative domain; issues | Domain mapping and critical rule approved |
| OPS-04 | Domain data coverage | Valid/expected source observations by domain under approved denominator; % | Expected source inventory and coverage semantics |
| OPS-05 | Stale domains | Domains with last observation beyond approved limit; domains | Per-source freshness policy |
| OPS-06 | Time to acknowledge/resolve | Lifecycle timestamps difference; time | Actual acknowledgement/resolution records exist |
| OPS-07 | Cross-domain correlation confidence | Rule-defined evidence strength; categorical score only if approved | Deterministic relation or reviewed correlation rule |

### M / W / E capabilities
- **M:** unified queue, shared filters, domain readiness matrix, event timeline and drill-down to authoritative island. All aggregates reuse the exact source metric/alert definitions from their owning island.
- **W:** prioritized queue built only from approved island warning rules; suppression and duplicate handling shared across Home and Overview; explain priority and confidence. No second “overall health” algorithm.
- **E:** future runbook catalog and controlled orchestration entry point, disabled in Phase 1. Orchestration must validate all child-action permissions/preconditions, dependency order, partial failure, rollback/compensation, approval and a complete audit trail. No multi-domain action until every participating operation has its own approved control.

### Acceptance
Every issue links to source evidence and an owning detail route; overview counts reconcile to island counts after the same dedupe/scope rules; no unsupported global health score; temporal proximity is not presented as cause.

## 13. Shared M/W/E feature and function requirements

### M — Monitoring shared functions
- Common filters and context propagation; preserve query state across routes and locale switches.
- Source adapters with schema/version and explicit data state.
- Raw-value preservation alongside approved normalized values.
- Freshness, source coverage, partial result and collection-error indicators.
- Search, sort, pagination/virtualization appropriate to expected volume.
- Detail drawer with provenance, observation time, raw fields, source locator and data-quality explanations.
- Consistent empty vs unavailable vs unsupported states.
- Metric/alert registry IDs visible in diagnostics and accessible UI context.
- Export is out of scope unless separately implemented and approved.

### W — Warning shared functions
- Versioned rule registry: rule ID, domain, description, inputs, threshold/window, severity, owner, enabled state, source prerequisites, evaluation cadence, suppression/deduplication key, clear/reset behavior and test cases.
- Explainable evaluation: observed value, threshold, unit, time window, evidence records, missing-data caveat and confidence/coverage.
- Distinct states: candidate, active, suppressed, cleared, stale/unknown; only implement lifecycle states supported by persistence.
- Avoid duplicate alerts across Home, Overview and island detail by sharing alert identity and rule version.
- Acknowledge/resolve controls are not available in Phase 1 unless an approved writable lifecycle service is separately in scope.
- Missing data can create a “collection gap” warning only if expected source/coverage policy is explicit; it must not be converted to a healthy result.

### E — Execution shared functions (future, disabled in Phase 1)
- Approved action catalog with action ID/version, domain, target type, permissions and implementation status.
- Re-fetch/revalidate target and preconditions at action time; never rely on stale UI state.
- Role/permission check and least privilege; separation of duties where required.
- Impact preview: target, scope, dependent systems/jobs, expected effect and known risks.
- Explicit confirmation; approval/maintenance window for high-impact actions.
- Idempotency/concurrency controls; duplicate-click protection and operation correlation ID.
- Execution lifecycle: requested → authorized → running → succeeded/failed/unknown; timeout does not imply failure or success.
- Immutable audit: actor, target, request, approval, timestamps, before/after evidence, result and correlation ID.
- Post-action verification against the source of truth; show “result unverified” when no confirming observation arrives.
- Safe failure and partial-result handling; rollback/compensation plan when supported.
- In Phase 1, show future capability only as disabled with a clear reason; no endpoint, mock or UI handler may mutate SAP/OS state.

## 14. Cross-page integrity and acceptance matrix

| Concern | Required invariant | Test evidence |
|---|---|---|
| Identity | Home KPI and detail rows refer to the same validated entity/run/event identity | Fixture tests + source reconciliation |
| Scope | System, instance, time window, status and mode are preserved | Deep-link and back-navigation tests |
| Aggregation | KPI formula and detail filter use the same population/deduplication | Reconciliation tests |
| Time | Boundaries, timezone and calendar handling are explicit | Boundary fixtures; raw values preserved when unresolved |
| Status | Raw value is retained; normalized state uses one shared mapping version | Mapping unit tests |
| Freshness | Same observation time/quality/freshness semantics on Home and detail | Stale/partial fixtures |
| Missing data | Null/unknown never becomes zero or healthy | Null, empty, unavailable and partial tests |
| Correlation | Related records require deterministic keys or labelled approved rule | Positive and negative match tests |
| Localization | Locale changes text and direction without changing selected record/filter meaning | EN/LTR and FA/RTL browser tests |
| Execution | Phase 1 has no callable write actions | UI interaction and API/network guard tests |
| Responsiveness | No clipping or horizontal overflow at desktop/tablet/mobile | Browser viewport tests |
| Accessibility | Keyboard navigation, focus, labels and non-color status cues work | Accessibility checklist |

## 15. Delivery status and gates

This is a complete **design proposal** for the ten islands, not a claim that widgets, source adapters, warning rules or execution handlers are implemented or approved.

- **Designed here:** page layouts, candidate KPI definitions, M/W/E feature requirements, cross-page invariants and acceptance conditions.
- **Still requires source validation:** exact field names/types/units, row identity, timestamps/timezone, source freshness, status normalization, source coverage and deduplication.
- **Still requires product/policy approval before activation:** numeric thresholds, warning severity/ownership/clear behavior, expected source inventory, RPO/RTO/schedules, security rules, and all execution actions.
- **Phase 1:** read-only Monitoring; Warning only when its source and rule gates are satisfied; Execution disabled.
- **Implementation readiness:** update `specs/widgets.yaml` and `specs/metric-registry.yaml` with stable IDs and links to this document as each source mapping is verified. Do not mark a proposed KPI APPROVED/IMPLEMENTED/VERIFIED merely because it appears here.

## 16. Related authoritative documents

- `MASTER_SPECIFICATION.md`
- `docs/ISLANDS_VISUAL_SPEC.md`
- `docs/PRODUCT_UI_SCRIPT.md`
- `specs/pages.yaml`
- `specs/widgets.yaml`
- `specs/data-contracts.yaml`
- `specs/metric-registry.yaml`
- `docs/CROSS_PAGE_DATA_INTEGRITY_VALIDATION.md`
- `docs/QUALITY_GATES.md`
- `tests/ACCEPTANCE_CHECKLIST.md`
- `tests/VISUAL_I18N_ACCEPTANCE.md`
