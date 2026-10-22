# BASIS_02 — Cross-Page Data Integrity & Consistency Validation
Version: 1.0
Status: validation contract defined; automated/runtime checks pending
Scope: Home summary widgets ↔ authoritative detail routes
Related: specs/pages.yaml, specs/widgets.yaml, specs/data-contracts.yaml, docs/SM37_HOME_TO_DETAIL_VALIDATION.md

## Non-negotiable rule
Home and detail pages must consume the same normalized dataset, filters, metric definitions and data-quality state. Do not implement separate Home-only formulas. A Home card is a filtered view of the authoritative detail contract, not a second source of truth.

## Shared identity and filter contract
- System/SID and instance are carried only when present in the source.
- Time window carries raw start/end boundaries, calendar interpretation and timezone policy. If timezone/calendar is unknown, retain source strings and do not silently convert.
- Status/severity filters use the same mapping version on Home and detail.
- Every displayed record has source identity or an explicitly DEMO-only derived key.
- Every aggregate declares scope, deduplication policy, denominator and observation time.
- DEMO, LIVE, PARTIAL, STALE, UNKNOWN, UNAVAILABLE and ERROR are distinct data states; none may silently become healthy/zero.
- Locale changes presentation only; it must not change the underlying selection or filters.

## Cross-page validation matrix

| ID | Home widget / summary | Authoritative detail | Identity / reconciliation key | Current state |
|---|---|---|---|---|
| CPI-01 | Landscape Overview | /landscape + /systems | Same system/instance IDs and observation scope | BLOCKED — source fields pending |
| CPI-02 | Active Alerts / Recent Events | /alerts-events | Same event ID or documented deduplication key, time window and severity mapping | BLOCKED — source mapping pending |
| CPI-03 | Performance Metrics / System Resources | /performance | Same metric ID, unit, host/instance, interval and aggregation | BLOCKED — source schema pending |
| CPI-04 | Job Monitoring / Open Jobs | /jobs-processes | Same job-row identity, raw/normalized status mapping, date window and deduplication | PARTIAL — DEMO prototype exists; stable source identity pending |
| CPI-05 | Database Status | /database | Same database identity, metric, unit and observation time | BLOCKED — source fields pending |
| CPI-06 | Storage & Backup | /backup-recovery + /database | Backup record identity kept separate from storage metric identity | BLOCKED — source fields pending |
| CPI-07 | Connectivity | /systems connectivity section | Same gateway/connection identity and observation scope | BLOCKED — source fields pending |
| CPI-08 | Transport status | /transports | Same transport request ID and target system | BLOCKED — source fields pending |
| CPI-09 | Security/session summaries | /security | Same session/lock identity and snapshot time; distinct entity types remain separate | BLOCKED — workbook fields pending |

## Mandatory acceptance checks
1. Single-source parity: Home and detail use the same contract/query adapter; no duplicate status or health formula.
2. Filter round trip: clicking a Home card carries only supported system, instance, date range, status and selected record context.
3. Aggregate parity: count/chart total equals the matching detail result set after the same filters and deduplication.
4. Stable selection: selected row identity remains unchanged when opening the detail drawer and switching locale.
5. Raw-to-normalized traceability: each normalized status/severity points to the original raw value and mapping version.
6. Unknown handling: missing source values remain Unknown/Not provided, never zero, success or healthy.
7. Freshness parity: Home and detail show the same source observation time, freshness and data state.
8. Empty vs unavailable: no records is different from failed/unavailable collection.
9. No false correlation: related records require a deterministic key or an explicitly approved and labeled correlation rule.
10. Browser navigation: Back returns to the same Home context without altering the fixed Home layout.
11. Locale invariance: Persian/English changes labels and RTL/LTR presentation, not filters, row identity or metric values.
12. Read-only phase: no execution/write actions are available in Phase 1.

## SM37 concrete checks
- Home Job Monitoring opens /jobs-processes with data_state=DEMO for the current fixture.
- Home does not show a numeric total from the five-row sample or the report's 8,062 metadata as a unique-job count.
- The detail table and drawer preserve job_name, job_created_by, raw Status, raw Jalali date/time, raw duration/delay and Cli only where present.
- DEMO-SM37-* identifiers are visibly demo-derived; never described as native SAP job IDs.
- Status charts remain disabled until complete row extraction, source-column alignment, uniqueness/deduplication and status normalization are validated.
- Delay is not assigned a unit or used for ranking until its semantics are confirmed.

## Evidence required to mark PASS
For each check, record the build/commit, test input, expected result, actual result and evidence (screenshot/log). A specification or static source file is not a runtime PASS. The current standalone prototype is a design/interaction artifact; browser execution and integration into the actual app remain pending.
