# Acceptance Checklist & M/W/E Acceptance Matrix

**Repository:** `mtaghipourpars-dotcom/BASIS_02`  
**Execution Date:** 2026-10-24  
**Audit Standard:** `docs/EMW_IMPLEMENTATION_AUDIT.md`  

---

## 1. Specification and Scope
- [x] **Task has observable acceptance criteria:** PASS — Automated test suites verify all 25 M/W/E criteria.
- [x] **Authoritative specifications are identified and consistent:** PASS — Reconciled with `MASTER_SPECIFICATION.md`, `specs/pages.yaml`, and `specs/data-contracts.yaml`.
- [x] **Impact analysis is complete:** PASS — Zero regressions on Home composition, 10-island layouts, and unified drawer bindings.
- [x] **Changed files remain within approved scope:** PASS — Changes constrained to action registry, test suites, and audit artifacts.
- [x] **Any product/architecture decision is recorded and approved:** PASS — Legacy `/systems` route reconciled in `specs/pages.yaml`.

---

## 2. Data and Metrics
- [x] **Source, timestamp/timezone, quality, freshness, and mode are represented:** PASS — Jalali timestamps preserved in SM37, observation locators traceable.
- [x] **Formula, unit, aggregation, filters, nulls, duplicates, and boundaries are defined:** PASS — CPU (%), Response Time (ms), Free Space (GB/%) clearly defined.
- [x] **Normal, empty, partial, malformed, stale, timeout, and error cases are covered:** PASS — Empty filter states handled cleanly.
- [x] **Invalid or stale input cannot appear healthy:** PASS — Unhealthy or missing states preserved without zeroing.
- [x] **Absence of forbidden terminology:** PASS — Zero occurrences of forbidden terms in UI and action catalog.

---

## 3. UI Behavior
- [x] **Correct page, route, widget placement, title, and hierarchy:** PASS — 10 islands preserve approved routes (`/landscape` to `/system-operations`).
- [x] **Unified slide-over drawer:** PASS — `EntityDetailDrawer` connected across all 10 pages with M/W/E tabs, work processes, and source evidence.
- [x] **Bilingual support (English LTR / Persian RTL):** PASS — Complete bilingual strings for all actions, rules, and profile headers.
- [x] **Fixed sidebar order (13 items):** PASS — Home, 10 Islands, Reports, Settings maintained.
- [x] **Execution preflight modal:** PASS — `ActionPreflightModal` triggered on action click; no write handlers.

---

## 4. Engineering Quality & Verification
- [x] **Lint & Typecheck:** PASS — `npm run lint` (`tsc --noEmit`) returned 0 errors.
- [x] **Production Build:** PASS — `npm run build` (`vite build`) compiled cleanly.
- [x] **Automated Test Suite:** PASS — `npm test` executed 25 tests with 25 PASSED, 0 FAILED.
- [x] **No runtime exceptions or console errors:** PASS — Verified in running dev environment.

---

## 5. Explicit Ten-Island M/W/E Acceptance Matrix

| Island # | Island Name & Route | Track M (Monitoring) | Track W (Warning) | Track E (Execution) | Overall Status |
|---|---|---|---|---|---|
| **01** | Landscape & Availability (`/landscape`) | **PASS** — SM51 instances, heartbeat status, SM50 processes in drawer. | **PASS** — Rule RULE-LAN-001 active; W actions declare Phase 2 Gated. | **PASS** — Restart action disabled with preflight checklist. | **VERIFIED** |
| **02** | Performance & Workload (`/performance`) | **PASS** — ST03N response times, CPU, SM50 work process drill-down. | **PASS** — High dialog time rule with traceable evidence. | **PASS** — Process termination disabled in Phase 1. | **VERIFIED** |
| **03** | Jobs & Background Processing (`/jobs-processes`) | **PASS** — SM37 5-row excerpt, steps, job log, and spools displayed truthfully. | **PASS** — Aborted job rule flags `QM_REPET_INSP` failure. | **PASS** — Definition vs Run separated; STOP & CANCEL distinct & disabled. | **VERIFIED** |
| **04** | Database & Storage (`/database`) | **PASS** — DB SID, memory allocation, storage volume drawer wired. | **PASS** — Free space warning (<20%) flags `/hana/data/PRD`. | **PASS** — Tablespace resize and shrink operations disabled. | **VERIFIED** |
| **05** | Security & Authorization (`/security`) | **PASS** — SM04 active sessions and SM12 enqueue locks in unified drawer. | **PASS** — STRUST SSL certificate expiry rule active. | **PASS** — Session termination and lock deletion disabled. | **VERIFIED** |
| **06** | Logs, Dumps & Events (`/alerts-events`) | **PASS** — SM21, ST22, SM13 timeline and event parameters inspected. | **PASS** — Critical ABAP runtime dump detection rule active. | **PASS** — Dump purge and log clearing disabled. | **VERIFIED** |
| **07** | Interfaces & Connectivity (`/interfaces-connectivity`) | **PASS** — RFC destinations, qRFC queues, HTTP services inspected. | **PASS** — RFC host unreachable warning rule active. | **PASS** — `TEST_CONNECTION` categorized as E and disabled. | **VERIFIED** |
| **08** | Transports & Changes (`/transports`) | **PASS** — STMS transport queue, return codes (RC0/RC4/RC8/PENDING) inspected. | **PASS** — Failed transport rule flags RC8 syntax error. | **PASS** — Import request & task release disabled. | **VERIFIED** |
| **09** | Backup & Recovery (`/backup-recovery`) | **PASS** — DB12/DB13 catalog, backup age, archive size, recovery readiness. | **PASS** — Backup age rule flags overdue backup window. | **PASS** — Database restore and recovery operations disabled. | **VERIFIED** |
| **10** | System Operations (`/system-operations`) | **PASS** — 10-island coordination matrix with direct detail navigation. | **PASS** — Aggregated incident findings without second rule engine. | **PASS** — Automated remediation runbooks disabled. | **VERIFIED** |

---

## 6. Acceptance Record
- **Review Date:** 2026-10-24
- **Result:** **PASS** (100% of acceptance criteria verified)
- **Commands Executed:**
  - `npm test` -> 25 passed, 0 failed
  - `npm run lint` -> 0 errors
  - `npm run build` -> Build succeeded
  - `grep -rnEi "demo|extracted snapshot|دمو|تصویر استخراج" src/` -> 0 matches
