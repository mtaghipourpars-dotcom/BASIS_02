# BASIS_02 Master Specification
Version: 1.0
Status: **AUTHORITATIVE CONTROL DOCUMENT — implementation must stop on unresolved conflicts**
Owner: Product owner
Scope: Frontend structure, visual presentation, page/widget placement, bilingual behavior, data-display contracts, and acceptance. SAP backend/Agent/API implementation is outside this document's scope.

## 1. Purpose and authority
This document defines how repository specifications fit together; it does not replace their detailed contracts.
- Product constraints and development/change-control rules: `DEVELOPMENT_STANDARD.md`, `docs/CHANGE_CONTROL.md`, `docs/QUALITY_GATES.md`.
- This document: authority order, approval rules, document map, and definition of complete UI specification.
- Application-wide fixed constraints: `specs/application.yaml`.
- Page identity, route, sidebar order and page-level acceptance: `specs/pages.yaml`.
- Global shell and visual composition: `docs/VISUAL_ARCHITECTURE.md`.
- Human-readable end-to-end page/widget narrative: `docs/PRODUCT_UI_SCRIPT.md`.
- Widget identity, exact placement, fields, visual type, states and data-contract reference: `specs/widgets.yaml`.
- Settings and preference behavior, including disconnected SAP profile configuration: `docs/SETTINGS_AND_PREFERENCES_SPEC.md`.
- Input/output shape and data quality/freshness/provenance: `specs/data-contracts.yaml`.
- Business meaning, formula, unit, aggregation and time window for numeric KPIs: `specs/metric-registry.yaml`.
- Locale and RTL/LTR behavior: `specs/i18n.yaml`.
- Approved local images/fonts/icons/sample assets: `ASSET_CATALOG.md` (if absent, assets remain unapproved; use neutral fallback).
- Source-to-widget mapping: `DATA_SOURCE_CATALOG.md` (if absent, no production source mapping is approved).
- Human approval, change workflow and no-guessing rules: `docs/CHANGE_CONTROL.md` and `IMPLEMENTATION_RULES.md`.
- Google AI Studio execution guide and authoritative paste-ready build prompt: `GOOGLE_AI_STUDIO_BUILD_GUIDE.md`, `GOOGLE_AI_STUDIO_PRIMARY_BUILD_PROMPT.md`, and `GOOGLE_AI_STUDIO_CONTINUATION_PROMPT.md`.
- Acceptance checks: `tests/ACCEPTANCE_CHECKLIST.md`, `tests/VISUAL_I18N_ACCEPTANCE.md`, and `ACCEPTANCE_MATRIX.md`.
- LLM task instructions: `prompts/IMPLEMENTATION_TASK_TEMPLATE.md`.

## 2. Conflict resolution
1. Safety/security and explicit product-owner decisions take precedence.
2. Fixed global constraints in `specs/application.yaml` take precedence over implementation defaults.
3. Page routes/order come only from `specs/pages.yaml`; widget identity/placement/presentation only from `specs/widgets.yaml`.
4. KPI semantics come only from an approved entry in `specs/metric-registry.yaml`; no screenshot or example value authorizes a formula.
5. Data fields/provenance/quality come only from `specs/data-contracts.yaml` plus the approved source mapping.
6. Visual reference and narrative explain intent but do not override structured contracts silently.
7. If structured documents disagree or a required field is missing, stop the affected work, document the conflict in `APPROVED_DECISIONS.md` as OPEN, and ask the owner. Do not pick a convenient interpretation.
8. A document status of pending/draft/template means it is not an approved implementation instruction.

## 3. How every page specifies its widgets
The UI is specified in two complementary forms:
- Human-readable: `docs/PRODUCT_UI_SCRIPT.md` explains the page's purpose and widget groups in reading order.
- Machine-readable: `specs/pages.yaml` identifies each page/route; `specs/widgets.yaml` must contain one record for every widget with a stable ID, page ID, exact placement/order, visual type, displayed fields, data-contract reference, state behavior and acceptance criteria.
- For data, each widget refers to a contract in `specs/data-contracts.yaml`; the contract names expected fields and provenance. Any numeric KPI additionally refers to `specs/metric-registry.yaml` for formula, unit, aggregation and time window.
- `DATA_SOURCE_CATALOG.md` maps a widget/data contract to an approved fixture or runtime endpoint. A file name, endpoint, service, parameter or field mapping cannot be inferred by the frontend implementer.
- Page placement is fixed by the widget's row/order and responsive span; end users cannot add, remove or reorder widgets.

**Current completeness finding:** `specs/widgets.yaml` contains machine-readable records for the existing island baseline and the Settings preference groups. The ten-island inventory and Settings inventory are design records, not proof that the UI is implemented; source mappings and runtime behavior remain gated. Until widget records and approved data mappings are added, an implementer cannot unambiguously know the exact gadget type, field mapping, visual options and source for every page. This is a documented gap, not something the LLM may fill by guessing.

## 4. Required widget record
Each widget record must provide, at minimum:
- `id`, `page_id`, `title_key`, `purpose`
- `placement`: row, order, desktop columns/span, tablet behavior, mobile order
- `visual_type`: e.g. KPI card, donut, line chart, bar chart, table, event list, topology/map, status matrix; exact type must be approved
- `display_fields`: field IDs, label keys, units and formatting
- `data_contract_ref` and `source_mapping_ref`
- `metric_refs` for all numeric KPIs/charts; empty only when not a metric
- `sort/filter/time_window` semantics where relevant
- `state_behavior`: loading, success, empty, partial, stale, unavailable/not-supported, error
- `drilldown`, `locale_keys`, `accessibility`, `acceptance_criteria`
- approval status and decision reference

## 5. Approval states
Use only these states:
- `PROPOSED`: generated or suggested, not implementable.
- `NEEDS_OWNER_INPUT`: missing business/data/visual decision; stop affected work.
- `APPROVED`: explicitly approved by product owner and ready to implement.
- `IMPLEMENTED`: implemented; this status alone does not imply tests passed.
- `VERIFIED`: implementation and stated acceptance tests were actually run and passed.
- `REJECTED`: not to be implemented.
A commit is not a product-owner approval. A test must not be marked passed unless executed.

## 6. Required process for each development slice
1. Identify the page/widget and current source files.
2. Compare relevant contracts and flag missing/conflicting decisions.
3. Propose the exact changes and acceptance criteria.
4. Wait for explicit owner approval when a product decision is needed.
5. Implement only approved changes; do not silently expand scope or add dependencies.
6. Run available checks and report the exact commands/results and remaining unverified items.
7. Update the structured contracts and narrative in the same change when the approved behavior changes.
8. Record significant decisions in `APPROVED_DECISIONS.md` or an ADR.

## 7. Bilingual acceptance
Every user-visible string, accessible name, tooltip, chart title/axis/legend/tooltip, empty/error/loading message, date/number format and footer/sidebar/header item must have English and Persian treatment. Locale switch preserves route, filters, selected system and unsaved input. English is LTR; Persian is RTL. Technical IDs stay exact and are isolated as LTR. Translation completeness is testable and missing keys fail acceptance.

## 8. Scope guardrails
- Fixed menu/page/widget inventory; no customer-driven add/remove/reorder.
- Phase 1 is read-only monitoring.
- Screenshot values are illustrative and never approve live metrics.
- No live endpoint or source is approved merely because the UI has a slot for it.
- Unknown/missing data must not be shown as zero or healthy.
- Backend agents, SAP services, API security and SAP-side implementation remain owned by the product owner and are not delegated to frontend LLM work.

## 9. Ten-island design package
`docs/TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md` now defines each of the ten islands' layouts, candidate KPI definitions/formulas, source-validation gates, Monitoring and Warning features, future Execution controls, and cross-page acceptance criteria. Candidate metrics remain non-approved until source mapping, units, scope, freshness, deduplication and applicable policy are validated. Phase 1 remains read-only; Execution remains disabled.

## 10. Current repository readiness
The repository has a useful narrative baseline and structured templates. It is **not yet a zero-ambiguity implementation package** because the widget registry is empty, metric registry has no approved metrics, and source mappings / asset approval / some runtime decisions remain pending. The next step is to complete and approve those registries page-by-page, beginning with Home, before asking an LLM to implement that slice.
