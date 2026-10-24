# BASIS_02 — SM37 Home-to-Detail Validation Slice
Version: 1.1
Status: source labels partially confirmed from user-uploaded SM37.md; UI/runtime validation still blocked
Source artifact: https://github.com/mtaghipourpars-dotcom/BASIS_01/blob/main/SRC/SM37.pdf

## Goal
Validate one complete, traceable user journey from the existing Home Job Monitoring widget to the Jobs & Processes detail page, using the same job identity, status definition, time scope and data-quality state.

## Journey
1. Home renders Job Monitoring from the same normalized job dataset/contract used by `/jobs-processes`.
2. User clicks the failed-job segment/count or "View details".
3. Navigation opens `/jobs-processes` and carries only supported context: system, time window, selected status and selected job ID if one was selected.
4. The destination shows the same scope in its filter summary and selects the matching job row/detail drawer.
5. Detail drawer shows only fields present in the validated source/contract, with source provenance and observation time.
6. Related SM21/ST22/SM13 evidence is shown only when matching keys or a reviewed correlation rule exist. Otherwise show "No verified link" rather than inventing a relationship.
7. User returns Home; Home layout and the selected global locale remain unchanged.

## Proposed shared data contract
Names are application-level contract names, not claims about SM37 PDF column headers:
- `source_id`: `BASIS_01:SRC/SM37.pdf` for fixture evidence; use a service identifier only after a real connection is implemented.
- `record_id`: stable unique identifier from source; if absent, create a deterministic fixture ID and mark it as derived.
- `system_id`: system/SID only if source provides it or fixture metadata establishes it.
- `job_name`: source value if present.
- `job_status_raw`: source status label/code without lossy normalization.
- `job_status_normalized`: mapped category only after status mapping is approved.
- `start_at`, `end_at`, `duration_seconds`: only when source has enough information; duration may be derived only from validated timestamps.
- `user_id`, `target_server`: only when present.
- `observed_at`: timestamp of report snapshot/collection; do not substitute current time.
- `data_state`: DEMO, VALIDATED_SNAPSHOT, LIVE, STALE, PARTIAL, UNKNOWN or ERROR as applicable.
- `source_locator`: PDF page/report section or endpoint record key once inspected.

## Required UI behavior
- Home summary and detail page use one shared status mapping and identical filter scope.
- Missing values display as Unknown/Not provided; they do not become zero or healthy.
- Empty list is distinguished from collection unavailable.
- Counts reconcile with the detail result set under the same filters. If the source only provides a report snapshot, label the data as snapshot/demo rather than live.
- Sort order: verified failed jobs first, then newest relevant start/observation time; unknown status is not treated as successful.
- Search, sort, row selection and detail drawer are read-only.
- No re-run, cancel, release or other write control in Phase 1.
- Locale switching changes all labels, chart text, dates and direction while preserving route, system, status filter and selected record. Technical IDs remain unchanged and LTR-isolated.

## Acceptance checks
1. Clicking Home Job Monitoring opens `/jobs-processes` with the expected filter context.
2. The selected job ID/record is identical in Home context and detail drawer.
3. Summary count equals the number of matching normalized records after applying the same filters and deduplication rule.
4. Changing the time window updates both summary and table using the same boundary/timezone rule.
5. A missing status, timestamp or ID never becomes a fabricated value.
6. No relation to SM21/ST22/SM13 is asserted without deterministic keys or an approved, labeled correlation rule.
7. Snapshot/DEMO data is visibly labeled; no "Live" indicator is shown unless a live collector confirms freshness.
8. English↔Persian switch preserves filters and selection and correctly changes LTR/RTL layout.
9. Browser back returns to Home without changing the Home composition.
10. No execution/write action can be triggered from this path.

## Test data and current blocker
The user-uploaded `SM37.md` extraction exposes these report labels: `JobName`, `Job CreatedBy` (sometimes truncated), `Status`, `Start date`, `Start Time`, `Duration(sec.)`, `Delay`, `Cli`, `Reason for Delay`, `Spool` and `Job doc`. Observed row statuses include `Finished`, `Canceled`, `Released` and `Scheduled`. The report scope shown is 1405/07/25 through 1405/07/26 and the report states 8,062 records passed. This does not establish unique job-run count, stable row identity, delay unit, timezone, or a capture timestamp. Do not claim the UI or live service passed. Before calling this slice validated:
- reconcile the extracted labels to the original PDF pages and verify column alignment;
- define a stable row identity or approved DEMO-only derived key and deduplication rule;
- build a clearly labeled fixture from the inspected report;
- run the acceptance checks above in the actual app;
- record screenshots/test results and commit hash.
Until then, this is an agreed validation plan, not a completed UI test.


## Standalone visual prototype
Artifact: `prototypes/sm37-home-to-detail.html`
- Bilingual English/Persian shell with fixed sidebar and unchanged conceptual Home composition.
- The fixture is labelled with neutral reference provenance; status counts and charts remain disabled.
- Manual browser QA and integration into the application remain pending.
