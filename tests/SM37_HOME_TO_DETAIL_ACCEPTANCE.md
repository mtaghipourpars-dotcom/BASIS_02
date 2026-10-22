# SM37 Home-to-Detail Acceptance Record

Status: BLOCKED — specification committed; runtime path not implemented or testable in the current repository snapshot.

## Why BLOCKED
- The repository currently contains specification/docs/scripts/tests and no application source/build manifest from which a browser route can be launched.
- `BASIS_01/SRC/SM37.pdf` is present, but its page text and exact headers/status values have not been extracted in this work session.
- No live SAP service is connected by this documentation change.
- Therefore, runtime, field-level and visual acceptance must not be marked PASS.

## Checks
| ID | Check | Status | Evidence / next action |
|---|---|---|---|
| SM37-01 | Home Job Monitoring links to `/jobs-processes` | BLOCKED | Implement route and click action, then browser-test |
| SM37-02 | Selected system/time/status filters persist | BLOCKED | Implement shared route context and test round trip |
| SM37-03 | Summary count equals filtered table rows | BLOCKED | Parse source fields, define status mapping/deduplication, then test |
| SM37-04 | Selected record ID remains identical in detail drawer | BLOCKED | Extract stable job identity or explicitly mark fixture IDs as derived |
| SM37-05 | Exact SM37 field names and status labels are documented | BLOCKED | Inspect PDF pages; record page number, header and observed values |
| SM37-06 | Snapshot/DEMO label is visible; no false LIVE status | SPECIFIED | Contract and page spec require explicit data state |
| SM37-07 | Missing fields stay UNKNOWN; no fake zero/healthy | SPECIFIED | Contract and acceptance requirements committed |
| SM37-08 | Persian/English switch preserves route and filters | BLOCKED | Requires running UI and locale test |
| SM37-09 | Browser back returns to unchanged Home | BLOCKED | Requires running UI and browser test |
| SM37-10 | No write/execution controls in Phase 1 | SPECIFIED | UI spec prohibits re-run/cancel/release actions |

## Exit criteria
Do not change this record to PASS until:
1. The PDF fields are inspected and source locators recorded.
2. A normalized fixture is built from actual inspected source rows and labeled as a snapshot/DEMO.
3. The app path is implemented.
4. All ten checks are run and evidence (test output/screenshots + commit) is attached.
