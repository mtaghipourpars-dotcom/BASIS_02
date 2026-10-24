# GOOGLE AI STUDIO — PRIMARY BUILD PROMPT (BASIS_02)

Paste this entire file into Google AI Studio Build mode after importing this repository. The repository is the product specification. Implement the actual web app; do not stop at a plan, wireframe, static mockup, or documentation update.

## Mission and execution rule
Build the complete, polished, interactive first MVP of **Basis Operations Cockpit (BASIS_02)** from this repository. Do not ask the product owner questions. Use the explicit repository decisions and safe defaults in this prompt. Inspect the actual files before editing. Read at minimum: `MASTER_SPECIFICATION.md`, `APPROVED_DECISIONS.md`, `IMPLEMENTATION_RULES.md`, `DEVELOPMENT_STANDARD.md`, `specs/application.yaml`, `specs/pages.yaml`, `specs/widgets.yaml`, `specs/data-contracts.yaml`, `specs/metric-registry.yaml`, `specs/i18n.yaml`, `docs/VISUAL_ARCHITECTURE.md`, `docs/PRODUCT_UI_SCRIPT.md`, `docs/ISLANDS_VISUAL_SPEC.md`, `docs/TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md`, `docs/CROSS_PAGE_DATA_INTEGRITY_VALIDATION.md`, `docs/SETTINGS_AND_PREFERENCES_SPEC.md`, `DATA_SOURCE_CATALOG.md`, `ASSET_CATALOG.md`, and acceptance tests.

## Non-negotiable product boundaries
- Build a **web app**, not Android.
- Phase 1 is read-only Monitoring with deterministic local DEMO/REFERENCE fixtures. No direct SAP connection, RFC, OData, REST, browser network request to SAP, operating-system command, or production action.
- No server-side services, database, Firebase, authentication, or Gemini calls unless already explicitly required by repository specs. This MVP needs no secrets or external credentials.
- All synthetic data must visibly say DEMO. Never imply fixtures are LIVE or that an SAP system is connected.
- Never invent source facts, KPI values/formulas/units, telemetry, source timestamps, record IDs, or operational success. If a mapping/formula is unapproved, show UNKNOWN / NOT VALIDATED / NOT AVAILABLE, or a clearly identified DEMO example with explanation. Missing is not zero.
- W may show only rule-backed demo warnings with their demo status and evidence. E actions against SAP/OS remain disabled with reason. Local UI operations such as filters, drill-down, preference changes, and export of demo data may work.
- Preserve the exact Home composition and fixed sidebar inventory/order specified in repository files. Do not invent routes or rearrange pages/widgets for aesthetic reasons.
- If files conflict, obey the authority order in MASTER_SPECIFICATION.md and safety/product-owner decisions. Do not fabricate facts to close gaps.

## Technology defaults
Preserve any existing working stack. If no usable frontend exists, create a standard React + TypeScript web app with npm using the simplest build setup supported by AI Studio. Use the existing dependencies first; otherwise add only necessary conventional libraries (React Router for routing, Recharts for charts, Lucide React for icons). Avoid a heavy component framework. Use typed local fixture data behind a small repository/adapter layer so a future connector can be added without rewriting UI. No secrets/environment variables are needed.

## Pages and navigation
Implement every route and sidebar item in `specs/pages.yaml`, in the exact order specified. Every route must render a complete page, not a blank placeholder. Implement all ten operational islands from `docs/TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md`, using existing route IDs. Use appropriate KPI groups, charts, tables, filters, drill-downs and informative unknown/unavailable states. Implement working Home-to-detail navigation and preserve supported filters/context. Do not stop after Home or the SM37 prototype.

## Professional visual design
Follow `docs/VISUAL_ARCHITECTURE.md` and `docs/PRODUCT_UI_SCRIPT.md`: professional enterprise operations cockpit; dark navy/blue base; cyan/blue accents; restrained green/amber/red semantic status colors; subtle borders/glows; dense but readable information; consistent spacing, hierarchy, typography and icons. Keep header, fixed sidebar, content canvas and footer consistent. Home layout must match the approved reference.
Use polished KPI tiles, tables, charts, badges, tooltips, filters, search, breadcrumbs, empty/loading/stale/error states and responsive cards where specified. Avoid generic admin-template styling, excessive whitespace, decorative fake charts, emoji as icon substitutes, lorem ipsum, and remote assets. Use approved assets if present; otherwise CSS/vector UI and safe system fonts.
Target viewport sizes: 1536×1024 primary, plus 1280×800, 768×1024 and 390×844. No page-level horizontal overflow on mobile.

## Localization and Settings
Implement English (`en`, LTR) and Persian (`fa-IR`, RTL) as first-class languages. Centralize all UI strings in translation dictionaries; no hard-coded user-facing component strings. Switching language must update all routes, navigation, accessible labels, tooltips, charts, tables, validation, notifications and date/number formatting atomically while preserving route/filters/selection. Keep technical identifiers, SID, hostnames and transaction codes unchanged and LTR-isolated where needed.
Implement Settings per `docs/SETTINGS_AND_PREFERENCES_SPEC.md`: Light/Dark/System theme; language; font family/scale; comfortable/compact density; standard/wide/focused layout; high contrast; reduced motion; supported landing page; default time window only where applicable; refresh preference; reset-to-defaults; About/Diagnostics; local SAP connection-profile metadata.
Persist only non-sensitive preferences/profile metadata if implemented; otherwise clearly say session-only. Reset only this app's own keys. SAP connection profiles are configuration-only: Test Connection, Connect, credentials and Activate Live Data stay disabled with explanatory text. No network call to SAP. Never collect/store passwords, tokens, cookies, private keys or secrets.

## Data quality and cross-page integrity
Use typed models for source/mode, quality, freshness, scope, observation time/timezone, units and errors based on `specs/data-contracts.yaml`. Respect states: loading, success, empty, partial, stale, unavailable, not_supported, unauthorized, error. Unknown is not zero; stale/invalid/partial is not healthy. Centralize fixture data and KPI calculations; don't calculate the same KPI differently on different pages. A metric must map to an approved registry entry or be labelled DEMO / PROPOSED. Keep Home and detail values consistent by using the same selector/calculation and fixture scope. Preserve filters when navigating back. Only show source observation timestamps when fixture metadata actually supplies them. Stable demo locators must never be presented as native SAP IDs.
Charts need labels, units, legends, accessible tooltips and DEMO provenance. Do not draw a trend from unsourced measurements. Unknown source fields must result in informative unknown/unavailable widgets, not invented values.

## Interactions that must actually work
Sidebar and active-route state; global search over available local demo records; filters; tabs; sorting/pagination where useful; time-window controls only on supported pages; row selection; drill-down; breadcrumbs/back navigation; language; theme; font/scale; density/layout; Settings forms; reset; tooltips; accessible focus/keyboard behavior. Warnings must show DEMO and their rule/evidence. E operations against SAP remain disabled. Show a visible DEMO indicator and a truthful disconnected/not-connected state.

## Completion protocol
1. Implement all routes, all specified widget groups, Settings and shared shell.
2. Run available build/typecheck/test commands and fix implementation-caused failures. Never claim a check passed unless actually run.
3. Inspect the running preview route by route at desktop size, then inspect Persian RTL and a narrow viewport. Fix clipping, overflow, broken charts and inert controls.
4. Verify every sidebar route, active state, Settings, whole-app localization, Home-to-detail navigation, filter preservation and cross-page data consistency.
5. Search for fake LIVE status, fake connection success, unsourced KPI values, placeholder buttons, and untranslated user-facing text; correct them.
6. Do not change the approved Home layout, page order, metric semantics or source contracts to make implementation easier.
7. Finish with a concise, honest report listing routes/features implemented, files changed, build/tests actually run and results, and remaining limitations. Do not claim SAP integration.

## Definition of Done
The app runs in AI Studio preview; every route in `specs/pages.yaml` works; Home follows the approved reference; all ten islands have useful coherent layouts; Settings works for local preferences and disconnected profile metadata; English/Persian RTL/LTR work throughout; the UI is polished, responsive and accessible; data provenance and unknown/stale states are honest; there is no SAP connection or operational execution; cross-page navigation/data consistency are verified; test results and limitations are reported accurately.
