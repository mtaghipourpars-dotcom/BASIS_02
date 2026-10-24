# BASIS_02 — Explicit UI Reconstruction & Ten-Island Implementation Prompt

## Mission: inspect, implement, and verify

You are editing the existing BASIS_02 application imported from GitHub. Its ten operational islands are still predominantly list-based and materially differ from the approved operational cockpit design. Inspect the entire repository before editing: source code, routes, fixtures, shared context, styles, translations, tests, and these authoritative files:

- `specs/pages.yaml`
- `specs/widgets.yaml`
- `specs/data-contracts.yaml`
- `specs/metric-registry.yaml`
- `specs/i18n.yaml`
- `docs/VISUAL_ARCHITECTURE.md`
- `docs/PRODUCT_UI_SCRIPT.md`
- `docs/ISLANDS_VISUAL_SPEC.md`
- `docs/TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md`
- `docs/CROSS_PAGE_DATA_INTEGRITY_VALIDATION.md`
- `docs/SETTINGS_AND_PREFERENCES_SPEC.md`
- source-field mapping documents, existing page components, AppContext, fixtures, and test files.

**Implement the actual application directly. Do not stop after a plan, analysis, mockup, or documentation. Do not ask questions.** Use the repository specifications and requirements below; do not guess.

## 1. Non-negotiable constraints

1. Preserve the exact approved Sidebar order from `specs/pages.yaml`: Home; Landscape & Availability; Performance; Jobs & Processes; Database & Storage; Security & Authorization; Logs & Dumps; Interfaces & Connectivity; Transports & Changes; Backup & Recovery; System Operations; Reports; Settings.
2. Remove Overview completely as a user-facing destination: route, sidebar entry, page registration, links, obsolete translation entries, and tests. Do not recreate it under another name.
3. Exactly ten operational islands:
   01 Landscape & Availability — `/landscape`
   02 Performance & Workload — `/performance`
   03 Jobs & Background Processing — `/jobs-processes`
   04 Database & Storage — `/database`
   05 Security & Authorization — `/security`
   06 Logs, Dumps & Events — `/alerts-events`
   07 Interfaces & Connectivity — `/interfaces-connectivity`
   08 Transports & Changes — `/transports`
   09 Backup & Recovery — `/backup-recovery`
   10 System Operations — `/system-operations`
   Home, Reports, Settings are general destinations, not islands.
4. Phase 1 is read-only. Do not connect to SAP, call production endpoints, use credentials/secrets, or perform actual SAP/OS/network/database operations. Future execution affordances, if present, must remain disabled with an explanation.
5. **No user-facing “DEMO”, “demo environment”, “demo mode”, “sample app”, “mock data”, or “prototype” labels anywhere.** Remove such badges, banners, page titles, status labels, menus, and footer phrases. Do not replace them with “Live”, “Connected”, “Verified”, or similar claims unless real verified evidence supports the claim. Show source, observation timestamp, coverage, freshness and data-quality details where relevant without branding the product as a demo.
6. Never guess data fields, KPI formulas, units, thresholds, status mappings, trends, relationships, severity, source availability, or root cause. Use approved repository contracts and mapped evidence only. If prerequisites are absent, show a neutral “Unknown”, “Not configured”, “Unavailable”, “Partial”, or “Not supported” state. Do not invent substitute values.
7. The attached Home screenshot defines visual composition only. Never copy its names, timestamps, counts, percentages or operational statements as real data.
8. English LTR and Persian RTL must work across every page, chart, tooltip, modal, message, accessibility label and setting. Locale switching must preserve route, selected system, filters and entered form state.
9. Preserve the dark navy/blue enterprise design, cyan accents, compact information density, and restrained semantic status colors. Do not turn the application into a generic CRUD/admin template.
10. Existing source code is not authoritative where it contradicts approved specs. Inspect first, then correct the implementation.

## 2. Required transformation: not list-based pages

The current pages rely too heavily on ordinary stacked lists and tables. A table is the operational evidence layer, not the entire page design. Each island must have its own purposeful visual hierarchy and a combination of:
- compact KPI strip, only with validated definitions;
- a primary visualization, topology, timeline, capacity view, comparison chart, or matrix as specified below;
- supporting comparison/evidence panel;
- searchable, sortable operational records table;
- selected-record detail drawer/panel with source evidence;
- working filters and context-preserving navigation;
- localized loading, empty, partial, stale, unavailable, unsupported, and error states.

Do not add decorative charts, unsupported gauges, invented sparklines, redundant cards, or empty visualizations merely to fill space. Do not make all ten islands look identical. Reuse shared components, but honor each island’s specific composition.

## 3. Shared application shell

### Header
Compact header matching the Home reference: product identity, “Basis Operations Cockpit”, one consistent approved subtitle, global search over supported local records/routes, notification access only backed by actual alert records, Settings, language selector, and runtime clock/timezone only if correctly implemented. Do not invent profile identity, avatar, unread count, live connection, or current source freshness.

### Sidebar
Use the exact order in Section 1, active route styling, consistent icons, accessible keyboard focus, collapse/expand, responsive drawer, and proper Persian mirroring with CSS logical properties.

### Shared page structure
Unless overridden by the island specification:
1. Page title and concise purpose.
2. Compact context/filter strip: SID/system, instance, environment, time range and source only when supported.
3. Verified KPI strip.
4. Main visualization and secondary comparison/evidence panel.
5. Operational table with relevant search, sort, filters and pagination/virtualization.
6. Selected-record detail drawer with raw values, source, observation timestamp, data quality and supported related evidence.
7. Context-preserving links to related domains.

Use a 12-column desktop grid; when appropriate, primary visualization 8/12 and secondary evidence panel 4/12. Maintain enterprise density without clipping. Validate 1536×1024, 1280×800, 768×1024 and 390×844. Charts need meaningful title, units, axes/legend/tooltips, time scope and correct missing-value behavior. All visible controls must work.

## 4. Home — match the attached screenshot

Reproduce the screenshot’s overall composition, proportions, density, dark navy palette, header/sidebar, welcome banner, compact KPI row, three-column first content row, three-panel second row, four-panel bottom row and footer. Do not replace it with a generic dashboard.

**A. Header:** product identity/title/subtitle at left; global search centered; notification/help/settings/language controls at right as supported.

**B. Welcome banner:** wide server-room/cabinet visual, greeting and short operational subtitle on the left, three concise value statements on the right. Use approved local artwork or CSS fallback. No demo/live banner; no hardcoded date or invented user identity.

**C. Four KPI cards, one desktop row:**
1. Total Systems
2. Healthy
3. Warnings
4. Critical
Each has icon, primary value, concise secondary context, and ring/sparkline only when mathematically supported. Click opens the correct filtered destination. Counts must reconcile with the underlying records. Unknown/unavailable systems must not silently disappear from a denominator.

**D. Three-column main row:**
- Left/wider: **System Landscape & Availability** — compact inventory rows showing SID, reported state, availability only if explicitly defined, last observation, and navigation chevron. Clicking opens Island 01 with selected system preserved.
- Center: **Performance Overview** — compact CPU, memory, response-time and workload visualizations for implemented metrics; working time-range selector; actual time-series data required for trends.
- Right: **Priority Warnings** — prioritized alert rows with severity, title, target, source/category, timestamp and detail navigation. Use mapped records; preserve filters when opening Island 06.

**E. Three-panel middle row:**
- **Jobs & Background Processing:** distribution donut and time-bucketed trend only when validated job records support them; legend/counts reconcile with the job table.
- **Database & Storage:** meaningful capacity/health indicators only when defined and sourced; compact consumer table only for comparable records.
- **Security & Authorization:** concise supported session/lock/finding summaries; category distribution only with valid records and denominator.

**F. Four-panel lower row:**
- **Logs & Dumps:** source-backed event summary and trend only if timestamped history exists.
- **Interfaces & Connectivity:** supported RFC/IDoc/HTTP/queue summary only where evidence exists.
- **Transports & Changes:** pending/import/failure summaries based on mapped records.
- **Backup & Recovery:** latest observed backup result and separate recovery evidence; backup success is not proof of restore readiness.

**G. Footer:** compact, reference-consistent footer with no demo/mock/prototype wording and no false live claim.

Home acceptance: the reference composition is recognizable at first glance; no generic stacked list layout; all widgets navigate correctly with context; all counts reconcile; unsupported values show neutral states; no demo-related user-facing labels and no unverified live claims.

## 5. Island-specific page outputs

### Island 01 — Landscape & Availability (`/landscape`)
**Purpose:** establish which systems/instances are known, what state was reported, and when.
- KPI strip: distinct system count, distinct instance count, known/unavailable/unknown distribution, age of latest source observation. No overall availability percentage without approved denominator and observation policy.
- Main left 8/12: environment/system topology using inventory-backed names and actual system→instance→host relationships.
- Main right 4/12: selected-system summary and recent related events.
- Bottom full-width instance inventory table.
- Columns only where source fields exist: SID/system ID, environment, instance ID, host, reported state, observed-at, source, data state.
- Filters for environment, SID/system, instance and reported state.
- Selected system/instance opens evidence drawer and links to performance, jobs, database and events with context preserved.
Do not invent topology or infer whole-system availability from one source.

### Island 02 — Performance & Workload (`/performance`)
**Purpose:** analyze validated measures over time and by system/instance.
- KPI strip: approved workload/response/resource metrics with unit, scope and observation time.
- Main left 8/12: large metric time-series chart, metric selector restricted to implemented measures, explicit time buckets, missing-data gaps.
- Main right 4/12: per-instance comparison/ranked resources only when values are comparable.
- Bottom: work-process table or workload breakdown with row selection and detail panel.
- Filters for system, instance, metric and time range; all visuals update together.
Do not infer CPU/memory percentages from screenshots, convert SM50/SM66 snapshots into history, fabricate chart points, or mix units/time windows.

### Island 03 — Jobs & Background Processing (`/jobs-processes`)
- KPI strip: distinct jobs, mapped status counts, failed jobs and long-running jobs only when identity, status mapping, scope/window and required fields are validated.
- Main: full-width searchable, sortable, filterable jobs table; relevant validated failures first, then start time.
- Supporting status distribution/trend only after unique identity, deduplication, column alignment and status mapping pass validation.
- Detail drawer: job identity, raw/normalized status, start/end, duration, user, target/server, log/step evidence only where source fields exist.
- Related SM21/ST22/SM13 records only with deterministic identifiers or explicitly reviewed correlation rules; time proximity is a clue, not causation.
- Filters for status/time/user/name/system/client only when fields exist.
- No re-run/cancel/release controls.
Respect `docs/SM37_SOURCE_FIELD_MAPPING.md`. Existing mapped labels include JobName, Job CreatedBy, Status, Start date, Start Time, Duration(sec.), Delay and Cli. Reason for Delay, Spool and Job doc may lack row-level values; do not fabricate them.

### Island 04 — Database & Storage (`/database`)
- KPI strip: database identity/type, capacity, response/resource metrics only where fields and semantics are validated.
- Main left: capacity/storage trend only with multiple dated observations and consistent units.
- Main right: database/storage evidence panel with source, observation time and quality.
- Bottom: source-backed database/volume table and related backup evidence.
- Distinguish DB metrics from host filesystem/storage metrics; support actual database type, do not assume HANA.
Do not infer free-space percentage, growth, role, replication or response time from screenshots/labels. Backup completion does not prove restore readiness.

### Island 05 — Security & Authorization (`/security`)
- KPI strip: observed sessions, lock records and confirmed security events, each with distinct scope.
- Main left 8/12: user/session table from supported SM04 evidence.
- Main right 4/12: lock summary/list/detail from supported SM12 evidence.
- Bottom: available SM21 system-log/security evidence.
- Authorization/audit section shows neutral unsupported/unconfigured state until a suitable source exists.
- Filters for user, system/client, transaction and time only when mapped.
- Detail drawer shows the exact source record and available context.
Do not equate a session with a violation or invent failed logons, blocked users, roles, access changes, audit counts, or unlock actions.

### Island 06 — Logs, Dumps & Events (`/alerts-events`)
- KPI strip: source-backed event, dump and update-error counts within the selected window, each with its own counting rule.
- Main: prominent time-ordered timeline with time buckets and visible coverage gaps.
- Lower section: searchable event table and source filters/tabs for SM21, ST22, SM13, RZ20 only where records exist.
- Detail drawer: source record, timestamp, reported severity, technical context and supported related links.
- Filters: severity, source/type, system, time.
- Deduplicate only with stable identifiers or explicit rules; do not combine unlike event types without a defined count; do not infer root cause from time proximity.

### Island 07 — Interfaces & Connectivity (`/interfaces-connectivity`)
This must be a dedicated, full-detail page, not hidden inside Systems.
- KPI strip: gateway/connection counts and errors only when mapped SMGW or other sources expose the fields.
- Main: connection/partner table with a status distribution only if stable source records support it.
- Secondary: connection relationship visualization or status matrix only if actual relationships exist; otherwise use an evidence/coverage panel.
- Bottom: connectivity events from supported SMGW/SM21 evidence.
- Coverage panel for RFC, IDoc, qRFC, tRFC, HTTP and external endpoints; unsupported categories show Not connected/Not supported without invented counts.
- Filters and selected-row detail only for fields that exist.
Do not infer whole-network health from SMGW alone or invent destinations, queues, latency, packet loss, endpoints or status. No real connection test/network command.

### Island 08 — Transports & Changes (`/transports`)
- KPI strip: request/import counts by verified source status and time window.
- Main: transport queue/status visualization plus searchable table.
- Supporting import history/distribution only if multiple records and stable statuses exist.
- Detail drawer: request ID, source/target, timestamps, import messages/log/return code only where present.
- Filters for request, target, status and time only where supported.
- Related events only with supported IDs or reviewed correlation rules.
Read-only: no import, release, approval or execution actions. Do not invent IDs, owners, outcomes, routes or return codes.

### Island 09 — Backup & Recovery (`/backup-recovery`)
- KPI strip: latest backup evidence, last observed status, age and coverage only when source fields exist.
- Main: backup history table with adjacent status/timeline visualization only when multiple consistent timestamped records exist.
- Secondary: recovery-readiness evidence, explicitly separated from backup success.
- Detail drawer: source record, scope, timestamp, result/return code and restore-test evidence where present.
- Links to related DB/system records preserve context.
Do not infer restore success, RPO/RTO, replication, DR readiness or zero lag without approved fields/definitions. No restore/failover/backup execution.

### Island 10 — System Operations (`/system-operations`)
This is the cross-domain coordination workspace, not the deleted Overview page and not a generic list of ten links.
- Top: concise operational coordination summary from defined shared data.
- Main: visual cross-domain matrix with ten domains and columns for reported state, validated open findings, latest observation/freshness and evidence coverage where available.
- Secondary: prioritized cross-domain issue panel with affected system/domain, rule/evidence, time and next navigation target.
- Bottom: correlated issue/event workspace with filters and selected-record details.
- Every domain state links to its island while preserving filters.
- Use only a documented common state-aggregation rule. If the rule is not approved or inputs are incomplete, show Unknown/Partial, not Healthy.
Do not recreate the former Overview page under a new name or invent an overall-health formula.

## 6. Shared data and cross-page consistency

All Home and island widgets must consume one shared data layer and metric registry. For every KPI/chart/status, use existing approved definitions for metric/record ID, source/fields, business meaning/unit, aggregation/deduplication, time window/filter scope, null behavior, freshness, thresholds and status mapping. If a prerequisite is absent, render a neutral unavailable/unknown/not-configured state and document the exact missing dependency.

Keep these states distinct: UNKNOWN, STALE, PARTIAL, UNAVAILABLE, NOT_SUPPORTED, loading and error. These are data-quality states, not demo branding.
- Home counts must equal distinct detail records under equivalent filters.
- A metric uses the same formula, unit, source scope, status mapping and freshness rule everywhere.
- Missing values never become zero, green, 100%, or healthy.
- One snapshot never becomes a trend.
- Time proximity never proves causation.
- Filters update every dependent visual.
- Home card/alert clicks preserve SID, instance, time, status/severity and selected record where supported.
- Use existing URL/query or shared navigation state consistently; never lose context during navigation.

## 7. Localization, Settings, accessibility

Settings must actually change the whole UI: language, direction, theme, font scale, density, contrast, reduced motion and other already-approved preferences. Do not leave decorative controls that only change their own selected state.

Localize page headings, KPI labels/units, table columns, filters, status labels, chart axes/legends/tooltips, empty/unavailable/partial/stale/error states, drawers, dialogs, notifications, menus and accessibility text. Use CSS logical properties. Keep SAP IDs, SIDs, hostnames, job/database IDs and transaction codes LTR-isolated in Persian. Preserve keyboard navigation, visible focus, contrast and reduced-motion preferences.

## 8. Remove demo branding without claiming live operation

Search all user-facing components, strings, translations, tooltips and footers. Remove “DEMO”, “demo”, “mock”, “prototype” and equivalent labels. Do not replace them with “Live”, “Connected”, “Verified”, or similar unless actual verified evidence supports that statement. Use neutral source/observation/freshness/coverage/data-quality details. Internal engineering docs and test names may still accurately describe fixture data.

## 9. Execution order

1. Inspect and map existing code/specs to all requirements.
2. Resolve route/navigation inconsistencies and remove Overview.
3. Refactor shared UI primitives: KPI cards, chart panels, filter strip, tables, detail drawers, data states and context handling.
4. Rebuild Home to match the attached screenshot.
5. Rebuild all ten islands using the exact layouts above; do not merely restyle their current lists.
6. Connect widgets to shared contracts; remove UI-only hardcoded counts/statuses that bypass the data layer.
7. Finish language, RTL/LTR and settings behavior.
8. Add/update tests and docs, run checks, fix failures.
9. Do not pause for user approval or questions.

## 10. Required validation

Run available dependency validation/install, TypeScript, lint, automated tests and production build. Add tests where missing. Verify:
- exact Sidebar order and no Overview route/item/link;
- all ten islands have distinct, page-specific visualizations, not just lists/KPI cards;
- Home matches reference composition at desktop sizes;
- charts are omitted/disabled when source prerequisites are absent;
- counts reconcile with detail rows;
- filters and navigation preserve context;
- missing/stale data never becomes a healthy/zero result;
- no unsupported data or live claim is invented;
- no user-facing DEMO/demo/mock/prototype labels remain;
- no dead buttons, broken routes or console/build errors;
- English LTR and Persian RTL work on every route;
- settings affect the actual UI;
- responsive usability at 1536×1024, 1280×800, 768×1024 and 390×844.
If browser/screenshot tooling or a test runner is unavailable, report that limitation honestly and do not claim it passed. Execute all available checks.

## 11. Final report

Summarize files changed, the visual/functional change for each island, Overview removal, Home reference fidelity, tests/build actually executed, and remaining items blocked by missing approved source mappings or unavailable tooling.

**Implement these requirements in the existing application now. Do not stop at a plan, do not ask questions, and do not invent unspecified requirements.**