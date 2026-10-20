# BASIS_02 — Product UI Script
Version: 1.0
Status: UI specification baseline; not an implementation claim
Source analysis: BASIS_01 dashboard reference contract and build plan, plus the latest visual reference supplied by the product owner.
Purpose: Define page order, global header/footer, every page's widgets, widget behavior, and bilingual requirements. The latest user-provided image controls the Home composition; BASIS_01 supplies monitoring/data-integrity constraints.

## 1. Global rules
- Product: Basis Operations Cockpit. Subtitle: Monitor · Analyze · Keep SAP Running.
- Phase 1 is read-only Monitoring for SAP S/4HANA On-Premise and SAP ECC.
- English (en, LTR) and Persian (fa-IR, RTL) are first-class locales.
- A global language selector atomically changes all UI, accessible text, chart labels, messages, date formatting and direction; preserve route, selected system, filters and unsaved inputs.
- Technical identifiers (SID, hostname, instance/job/database IDs, SAP transaction codes) remain unchanged and use LTR isolation where needed.
- Synthetic values are visibly DEMO. No live connection is implied by opening the app.
- Missing/null is not zero. UNKNOWN, STALE, NOT_SUPPORTED, unauthorized, partial and collection failure are distinct states.
- Do not invent KPI formulas, thresholds, source semantics, endpoints or live status. No SAP/OS write actions, restart, unlock, job cancellation, transport import or remediation in Phase 1.
- Page/sidebar/widget order is product-owned and not customer-configurable.

## 2. Global visual system
- Full viewport, dark navy header and sidebar, dark-blue cards, thin cyan/blue borders, subtle glow/shadow, compact spacing, near-white primary text and muted blue-grey secondary text.
- Green=positive, amber=warning, red=critical, blue=informational; status always has text/icon as well as color.
- Desktop baseline 1536×1024; also validate 1280×800, tablet and mobile.
- Desktop preserves the specified hierarchy; tablet wraps cards; mobile stacks in semantic order. No critical clipping, overlap or horizontal overflow.
- Use consistent design tokens. Exact colors, fonts, icon/chart packages remain implementation decisions and must not be guessed.
- Use CSS logical properties. Persian typography must shape glyphs correctly.
- All data widgets support applicable loading, success, empty, partial, stale, unavailable/not-supported and error states.

## 3. Global header — every route
1. Product mark area using approved local asset or neutral typographic mark; never hotlink unlicensed artwork.
2. Product title and subtitle.
3. Global search for systems, instances, hosts and jobs. In DEMO mode search only DEMO records. Include clear and localized no-results state.
4. Runtime date/time with explicit timezone; never hard-code screenshot timestamps.
5. Collection/connection status: DEMO, Connected, Delayed or Unavailable only when evidence supports it. Never show Live merely because the page is open.
6. Notifications button and unread count only when backed by data; opens localized panel.
7. User/profile menu and role label only when supplied by runtime; do not invent authentication claims.
8. Settings shortcut.
9. Global language selector: English / فارسی.
All menus/dialogs are keyboard accessible, have visible focus and localized accessible names. Locale change updates every header element.

## 4. Global sidebar
Fixed product-owned order; localized labels, consistent line icons, active route highlight, keyboard focus and tooltips in collapsed mode. In Persian, mirror shell navigation to the right. Collapse to icon rail/drawer on narrow screens.
1. Home — /
2. Overview — /overview
3. Systems — /systems
4. Landscape — /landscape
5. Alerts & Events — /alerts-events
6. Performance — /performance
7. Jobs & Processes — /jobs-processes
8. Database — /database
9. Transports — /transports
10. Security — /security
11. Backup & Recovery — /backup-recovery
12. Reports — /reports
13. Settings — /settings
Sidebar footer/help card: compact illustration, localized short proactive-monitoring message. Do not imply live monitoring unless collection status confirms it. Use CSS illustration if no approved local asset exists.

## 5. Page: Home (/)
Purpose: high-density Basis Manager summary of landscape, health, alerts, performance, jobs, database, storage and connectivity.
### Hero/status band
- Landscape-at-a-glance title/message; in DEMO mode state visibly that the view is DEMO.
- Total Systems card: count and supported healthy/attention counts.
- Critical Alerts card: count and severity summary.
- Open Jobs card: counts only for a defined scope and time window.
- System Load card: value only when metric, unit, source and time window are approved; otherwise Unknown/Not configured.
- Stable Systems/server-room visual panel using approved local art or CSS fallback.
### Main row
- Landscape Overview: configured environments in approved order (DEV/QAS/PRD only if present in inventory); state, system/instance/database counts, freshness and coverage. Link to filtered Landscape/Systems.
- System Health: overall state visualization plus SAP Application, Database, File System, Network and Host/OS rows. Percentage only with approved formula/denominator/source/freshness. Trend chart has localized axes/legend/tooltips, explicit time window and gaps for missing data.
- Active Alerts: severity, title, target/component, environment, timestamp and detail link. View all opens Alerts & Events. Empty list is valid only when source coverage is confirmed.
### Performance/activity row
- Key Performance Metrics: CPU, Memory, Disk and Response Time slots; show value/unit, state, freshness and mini-trend. Change percentage only with a defined comparable period.
- System Resources: CPU, Memory, Disk and Network summaries plus trend chart; missing values remain gaps, not zero.
- Top Systems by Health: system ID, environment, state/evidence and freshness. UNKNOWN must not rank as healthy.
- Recent Events: severity/icon, title, target and timestamp; View all opens Alerts & Events.
### Lower row
- SAP Stack Health: SAP Application, Database, Work Processes and Services; state, source and freshness. No unapproved percentages.
- Job Monitoring: successful/failed/running/canceled counts for defined scope/window; trend and read-only link to Jobs & Processes.
- Database Status: actual configured database type/name, role/state and approved response/resource metrics; never assume HANA.
- Storage & Backup: source-backed capacity/free-space and last backup evidence. Backup success is not proof of restore capability.
- Network & Connectivity: supported path state, latency and packet-loss measures. “All links operational” only if the defined links were checked within freshness limits.
Desktop preserves the supplied reference hierarchy. Narrow layouts reflow in this order. All sample values must be labeled DEMO.

## 6. Page: Overview (/overview)
Widgets: (1) Landscape Summary—configured systems/instances/environments and coverage; (2) Status Distribution—HEALTHY, ATTENTION, CRITICAL, UNKNOWN, STALE, NOT_SUPPORTED counts; (3) Collection Coverage—confirmed/candidate/blocked/unsupported sources; (4) Freshness Overview—observation age by domain/collector; (5) Important Alerts; (6) Recent Events. No overall health percentage without an approved formula and coverage rule.

## 7. Page: Systems (/systems)
Widgets: (1) System inventory table—SID, configured description, environment, verified product/release, state, last observation and quality; (2) search/filters for environment/state/product/freshness; (3) instance summary—instance ID, host, reported state, last seen and source; (4) system detail with instances, related host/database and observations; (5) health evidence/rules; (6) related alerts/events. Unknown inventory fields remain Unknown, never fabricated.

## 8. Page: Landscape (/landscape)
Widgets: (1) environment cards/selectors using configured environments only; (2) relationship map for evidenced system→instance→host/database links; (3) environment inventory table; (4) domain matrix by environment for SAP Application, Database, File System, Network and Host/OS; (5) inventory/coverage gaps; (6) source provenance and last refresh. Do not imply topology discovery from static inventory.

## 9. Page: Alerts & Events (/alerts-events)
Widgets: (1) alert summary by severity/state and defined window; (2) event table with severity, title, target, component, environment, first/last observed times, state, source and freshness; (3) filters for severity/environment/system/component/time/type/status; (4) search; (5) detail panel with normalized summary, evidence, timestamps, rule version and redacted context; (6) related events only when deterministic relationship keys exist. No acknowledge/resolve/write controls in Phase 1.

## 10. Page: Performance (/performance)
Widgets: (1) metric/domain selector for supported CPU, memory, filesystem/disk, network, response/workload, work-process and database measures; (2) metric cards with value/unit/target/observed time/source/quality/freshness; (3) time-series chart with explicit range/units/legend/tooltips and gaps; (4) per-system comparison only for matching metric definition/unit/window; (5) approved threshold/rule context; (6) collection gaps. Advanced forecasting/correlation is out of scope unless separately approved.

## 11. Page: Jobs & Processes (/jobs-processes)
Widgets: (1) job-state summary for defined scope/window; (2) job table with ID/name/system/status/start/end/duration and supported metadata; (3) failed/long-running list using approved rules; (4) job detail with evidence/source/timestamps/redaction; (5) work-process counts by state where supported; (6) filters/search. No start, cancel, release, reprocess or modify controls.

## 12. Page: Database (/database)
Widgets: (1) database inventory—ID/type/related system/host/role/source/freshness; (2) availability/state and last successful observation; (3) data/log capacity and free space only with validated units/source; (4) approved performance metrics; (5) database alerts/events; (6) coverage and collection state. Never assume a database technology.

## 13. Page: Transports (/transports)
Widgets: (1) source-confirmed transport event summary; (2) transport list with request ID, source/target system, status, timestamps and source; (3) failed/blocked transport events with evidence; (4) recent transport activity; (5) source coverage. No import/release/modify controls.

## 14. Page: Security (/security)
Widgets: (1) approved security signal summary; (2) security event list with severity/target/time/source/state/redacted evidence; (3) access/authorization collection status and coverage; (4) configuration drift only with a defined baseline/source; (5) privacy/redaction notice. Never expose passwords, tokens, session secrets or unrestricted dump payloads. No user unlock/admin controls.

## 15. Page: Backup & Recovery (/backup-recovery)
Widgets: (1) source-confirmed backup summary; (2) backup history with target/type/start/end/result/source/freshness; (3) age indicator against approved policy; (4) failed vs missing evidence distinction; (5) restore-test evidence only if explicitly recorded; (6) systems lacking confirmed backup source. No execution controls; backup success does not prove restore capability.

## 16. Page: Reports (/reports)
Widgets: (1) catalog of implemented reports only; (2) localized time-range/scope selectors; (3) preview with source/environment/freshness/coverage/DEMO provenance; (4) export only for implemented formats with localized headings/timestamps; (5) no-data/partial-data explanation. Do not imply SLA/compliance without approved definitions and coverage.

## 17. Page: Settings (/settings)
Widgets: (1) language preference; (2) only approved display preferences—no page/widget reorder; (3) app version/build and runtime mode if available; (4) read-only data-source/collector status with last attempt/success/error category, never secrets; (5) About/limitations for Phase 1 scope and coverage; (6) privacy/security information. No secret editing, endpoint changes or adapter activation.

## 18. Global footer — every route
Footer appears after page content and never overlays charts/tables/alerts. Elements: (1) product name and version/build only when supplied by build metadata; (2) DEMO/configured-mode indicator, never false LIVE; (3) last successful refresh with timezone, or localized “No successful refresh” if none; (4) data-quality/coverage note or link; (5) About/Privacy/Help links only when those destinations exist; (6) organization/copyright only when supplied and approved. All elements localize and follow page direction.

## 19. Mandatory widget contract
Each widget must define: stable ID and page ID; localized title/description keys; exact placement and responsive span; purpose and fields; typed view-model/data contract; DEMO/LIVE provenance; units/aggregation/window/rule for each KPI; freshness and coverage; loading/success/empty/partial/stale/unavailable/error behavior; drill-down; translations; accessibility; acceptance tests. Widgets consume canonical normalized view models and one shared status/rule layer; they must not calculate competing health states.

## 20. Bilingual acceptance criteria
- Centralized translation dictionaries; no hard-coded user-facing strings inside components.
- Locale switch changes all titles, labels, table columns, filters, buttons, forms, placeholders, menus, dialogs, notifications, chart titles/axes/legends/tooltips, accessibility text and data-state messages.
- English sets document lang=en and dir=ltr; Persian sets lang=fa-IR and dir=rtl.
- Preserve route, selected system, filters and unsaved inputs across locale change.
- Localize dates, times, numbers and pluralization without changing telemetry meaning or units.
- Keep technical IDs exact and isolate them as LTR in Persian text.
- Mirror directional shell controls but do not mirror logos or reverse chart/data semantics.
- Missing translation keys fail automated tests and must not appear raw in production.
- Validate Persian glyph shaping, mixed-script labels and long labels at desktop/tablet/mobile widths.

## 21. Release acceptance checklist
- [ ] Header/footer consistent across all routes.
- [ ] Exactly 13 sidebar routes in the specified order; every route resolves and highlights correctly.
- [ ] Home matches the specified composition and responsive hierarchy.
- [ ] All visible/accessibility text changes with locale; lang/dir update correctly.
- [ ] Route, filters, selected system and unsaved values survive locale switching.
- [ ] No missing translations or previous-language remnants.
- [ ] Technical identifiers unchanged.
- [ ] All synthetic values visibly DEMO; no false LIVE status.
- [ ] UNKNOWN/STALE/NOT_SUPPORTED/partial/error states are explicit; null is not zero.
- [ ] No unapproved KPI formulas, thresholds, endpoints or source semantics.
- [ ] Charts show units/time windows and preserve gaps.
- [ ] No Phase 1 write/remediation controls.
- [ ] Keyboard/accessibility, desktop/tablet/mobile layout and no-overflow checks pass.
- [ ] Actual build/tests run and results are recorded; do not claim unexecuted tests passed.

## 22. Linked contracts
Visual architecture: docs/VISUAL_ARCHITECTURE.md
Page registry: specs/pages.yaml
Bilingual contract: specs/i18n.yaml
Widget inventory: specs/widgets.yaml
Metric registry: specs/metric-registry.yaml
Data contracts: specs/data-contracts.yaml
Visual/i18n tests: tests/VISUAL_I18N_ACCEPTANCE.md
Engineering standard: DEVELOPMENT_STANDARD.md

This file specifies intended UI structure and behavior. It does not claim that screens, integrations, builds or tests have already been implemented.