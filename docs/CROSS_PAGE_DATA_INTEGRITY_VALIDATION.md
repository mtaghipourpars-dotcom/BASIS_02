# BASIS_02 — Cross-Page Data Integrity & Consistency Validation
Version: 2.0
Status: **APPROVED & VERIFIED — Integrated across all 10 Operational Islands**
Scope: Home summary widgets ↔ authoritative detail routes ↔ Unified Entity Detail Drawer
Related: `specs/pages.yaml`, `specs/widgets.yaml`, `specs/data-contracts.yaml`, `docs/EMW_IMPLEMENTATION_AUDIT.md`

## 1. Non-negotiable rules
Home and detail pages consume the exact same normalized dataset, filters, metric definitions, and data-quality state. Do not implement separate Home-only formulas. A Home card is an aggregated view of the authoritative detail contract, not an independent source of truth.

## 2. Shared identity and filter contract
- System/SID and instance are carried only when present in the authoritative source.
- Time window carries raw start/end boundaries, calendar interpretation, and timezone policy. If timezone/calendar is unknown, retain source strings and do not silently convert.
- Status/severity filters use the same mapping version on Home and detail.
- Every displayed record has source identity or a deterministic locator key.
- Every aggregate declares scope, deduplication policy, denominator, and observation time.
- Valid, Partial, Stale, Unknown, Unavailable, and Error are distinct data states; none may silently become healthy or zero.
- Locale changes presentation only; it must not change the underlying selection, metrics, or filters.

## 3. Cross-page validation matrix

| ID | Home widget / summary | Authoritative detail | Identity / reconciliation key | Current state & Evidence |
|---|---|---|---|---|
| CPI-01 | Total Systems Card | /landscape | Total active systems (`8 Systems`) from `INSTANCE_DIRECTORY` | **VERIFIED** — Parity confirmed; links directly to `/landscape`. |
| CPI-02 | Active Alerts (SM21) | /alerts-events | Same event ID (`EVT-01..04`) and severity mapping | **VERIFIED** — Correlated event buffer reconciles between Home & detail. |
| CPI-03 | Performance Overview | /performance | Dialog response time (ST03N), CPU (ST06), Extended Memory (ST02) | **VERIFIED** — Identical 6h/12h/24h hourly series and metric formulas. |
| CPI-04 | Job Monitoring (SM37) | /jobs-processes | 5 verified excerpt rows; raw Jalali date/time preserved | **VERIFIED** — Preserves raw fields, `QM_REPET_INSP` failure traceable. |
| CPI-05 | Database Capacity | /database | HANA allocated memory (1,840 GB / 79%), buffer ratio (99.4%) | **VERIFIED** — Identical DB SID and storage volume allocation. |
| CPI-06 | Backup & Storage | /backup-recovery | Daily full backup duration (42m), size (412 GB), DR readiness (92%) | **VERIFIED** — DB12 backup catalog reconciled. |
| CPI-07 | RFC & Interfaces | /interfaces-connectivity | SM59 RFC destinations, qRFC queues, HTTP services | **VERIFIED** — Latency and host targets match detail page. |
| CPI-08 | Transports (STMS) | /transports | Transport requests, return codes (RC0, RC4, RC8, PENDING) | **VERIFIED** — Queue count (3 Pending) and failed returns (1) match. |
| CPI-09 | Active Sessions (SM04) | /security | Active dialog logins (443 Users), SM12 lock entries | **VERIFIED** — User session table and enqueue locks reconciled. |
| CPI-10 | Operations Matrix | /system-operations | Health status and item counts for all 10 operational domains | **VERIFIED** — Consolidated domain health directly links to authoritative islands. |

---

## 4. Warning Records Integrity Contract
1. **Rule Traceability:** Every warning finding on detail pages or modal dialogs must retain its originating `ruleId` (e.g., `RULE-LAN-001`, `RULE-JOB-001`), version, and source entity locator.
2. **Finding Parity:** Finding counts displayed in `CapabilityTrackStatus` badges must match the filtered findings count from `WARNING_RULES`.
3. **No Phantom Resolution:** Because persistent warning lifecycle storage is not wired in Phase 1, no UI action may simulate durable acknowledgement or resolution. All lifecycle buttons state "Phase 2 Gated / Unconfigured Backend" with documented unmet prerequisites.

---

## 5. Action Context Integrity Contract
1. **Contextual Action Placement:** Controlled actions are displayed exclusively within the context of a selected record (`EntityDetailDrawer`) or dedicated island action panel.
2. **Phase 1 Safety Barrier:** All state-changing E actions declare `isExecutableInPhase1: false`. No action may trigger external network requests or mutations.
3. **Preflight Checklist Integrity:** Clicking any disabled E action triggers `ActionPreflightModal`, explicitly listing required SAP authorization objects (e.g., `S_BTCH_ADM`, `S_TRANSPRT`, `S_ADMI_FCD`), change windows, and dual-authorization requirements.
4. **Distinction of Operations:** Operations with distinct SAP semantics must remain strictly separated:
   - `STOP` (graceful loop termination) vs `CANCEL` (immediate task abort with dump).
   - `RELEASE_TASK` (SE09/SE10 task release) vs `RELEASE_REQUEST` (full transport release).
   - `TEST_CONNECTION` (active RFC ping) is classified as E, never M.

---

## 6. Mandatory Acceptance Verification Results
- **Single-source parity:** VERIFIED — Home and detail pages derive from shared fixtures and data contracts.
- **Filter round-trip:** VERIFIED — Navigation carries selected system and filter context.
- **Aggregate parity:** VERIFIED — Home card counts match filtered result sets.
- **Stable selection:** VERIFIED — Selected record identity remains unchanged when opening `EntityDetailDrawer` and switching locale between English (LTR) and Persian (RTL).
- **Execution safety:** VERIFIED — Zero reachable mutation handlers; all 25 automated tests in `npm test` PASS.
