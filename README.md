# BASIS_02 — SAP Basis Dashboard UI Engineering

**Authoritative entry point:** [Master Specification](MASTER_SPECIFICATION.md). Read it first; unresolved or conflicting requirements block implementation.

**AI implementation work order:** [AI_IMPLEMENTATION_WORK_ORDER.md](AI_IMPLEMENTATION_WORK_ORDER.md) — proposed page-by-page widget inventory and evidence-driven rules.

**Purpose:** develop a bilingual SAP Basis Operations Cockpit using a visual-first, iterative co-creation workflow.

## Product direction
The target product selectively brings the most useful SAP Fiori capabilities for Basis operations into one coherent experience, extends them where useful, and organizes them into three layers:
- **Monitoring** — observe systems and technical health.
- **Warning** — identify actionable alerts, risks, and threshold breaches.
- **Execution** — controlled operations with authorization, confirmation, and auditability.

This is the target vision, not a claim that the Fiori app inventory has already been researched or that all three layers are implemented. **BASIS_02 Phase 1 remains read-only Monitoring.** The Fiori capability review should use the official SAP Fiori Apps Reference Library and SAP documentation, then produce a visually inspectable selection and page/widget mapping before implementation scope is changed.

## Start here
1. [Visual architecture](docs/VISUAL_ARCHITECTURE.md) — visual direction and Home composition based on the supplied reference.
2. [AI-assisted workflow](docs/AI_DEVELOPMENT_WORKFLOW.md) — visual-first collaboration loop and three-layer product direction.
3. [Development standard](DEVELOPMENT_STANDARD.md).
4. [Quality gates](docs/QUALITY_GATES.md).
5. [Change control](docs/CHANGE_CONTROL.md).
6. [Application contract](specs/application.yaml).
7. [Page/navigation contract](specs/pages.yaml).
8. [Bilingual/RTL contract](specs/i18n.yaml).
9. [Widget contract](specs/widgets.yaml).
10. [Metric registry](specs/metric-registry.yaml).
11. [Data contracts](specs/data-contracts.yaml).
12. [Implementation task template](prompts/IMPLEMENTATION_TASK_TEMPLATE.md).
13. [Acceptance checklist](tests/ACCEPTANCE_CHECKLIST.md).
14. [Visual and bilingual acceptance tests](tests/VISUAL_I18N_ACCEPTANCE.md).

## Non-negotiable product rules
- Phase 1 is Monitoring/read-only. No operational actions against SAP or operating systems.
- English and Persian are first-class locales. Switching changes all UI text/accessibility content and switches LTR/RTL layout.
- Sidebar inventory/order and Home widget placement are product-owned, not customer-configurable.
- Synthetic data is visibly labeled DEMO and never presented as live telemetry.
- Unknown, stale, partial, invalid, or unsupported data must not appear healthy.
- KPI formulas and semantics must be documented before implementation.
- LLM output is a proposal until reviewed and committed; it cannot approve its own work.
- Framework, build tool, chart library, icon library, and localization package require repository inspection and a recorded decision.

## Status
The React 18 + Vite + TypeScript application is fully implemented and running on port 3000.
The Home page is reconstructed to faithfully match the user reference image composition.
The deprecated Overview route has been completely removed.
All ten operational islands are implemented as dedicated, navigable views with unified data consistency.



- [M/W/E Implementation Prompt](GOOGLE_AI_STUDIO_EMW_IMPLEMENTATION_PROMPT.md) — page-by-page implementation contract for Monitoring, Warning, and Execution across all ten islands; Phase 1 keeps monitoring read-only and all execution actions disabled.

## Ten-island design package — KPI + Monitoring / Warning / Execution
- [Complete ten-island layout, data, KPI and E/M/W functional specification](docs/TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md) — proposed design baseline for all ten islands; includes KPI formulas and data gates, page layouts, Monitoring/Warning capabilities, future Execution controls, and cross-page acceptance rules.

## SM37 validation slice — current artifacts
- Source mapping: [docs/SM37_SOURCE_FIELD_MAPPING.md](docs/SM37_SOURCE_FIELD_MAPPING.md)
- DEMO fixture: [fixtures/sm37-extracted-snapshot.sample.json](fixtures/sm37-extracted-snapshot.sample.json)
- Interactive bilingual prototype: [prototypes/sm37-home-to-detail.html](prototypes/sm37-home-to-detail.html)
- Home-to-detail validation: [docs/SM37_HOME_TO_DETAIL_VALIDATION.md](docs/SM37_HOME_TO_DETAIL_VALIDATION.md)
- Cross-page integrity contract: [docs/CROSS_PAGE_DATA_INTEGRITY_VALIDATION.md](docs/CROSS_PAGE_DATA_INTEGRITY_VALIDATION.md)
- Acceptance record: [tests/SM37_HOME_TO_DETAIL_ACCEPTANCE.md](tests/SM37_HOME_TO_DETAIL_ACCEPTANCE.md)

The prototype is read-only and uses DEMO rows from the user-supplied extraction. It is not an integrated application route and does not represent live SAP data. Counts/charts remain gated pending row identity, deduplication, extraction alignment and status mapping validation.


## Settings and configuration-only SAP connection profiles
- [Settings & Preferences MVP specification](docs/SETTINGS_AND_PREFERENCES_SPEC.md) — language/RTL, typography, theme, density/layout, accessibility, dashboard preferences, DEMO data mode, and local SAP profile metadata. The MVP makes no SAP network requests.


## Google AI Studio — build the first working MVP
- [Build Guide](GOOGLE_AI_STUDIO_BUILD_GUIDE.md) — how to import this repository in AI Studio Build mode and run the build workflow.
- [Primary Build Prompt](GOOGLE_AI_STUDIO_PRIMARY_BUILD_PROMPT.md) — paste the complete prompt into AI Studio after importing the repo; it directs the agent to implement the complete UI without routine questions.
- [Continuation / Repair Prompt](GOOGLE_AI_STUDIO_CONTINUATION_PROMPT.md) — verification and repair prompt for a second pass.

These instructions authorize a web UI MVP with local DEMO fixtures only. Direct SAP connectivity and operational execution are out of scope for Phase 1.
