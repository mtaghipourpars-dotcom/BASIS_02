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
Visual architecture and navigation baseline are documented from the supplied reference. This is a specification update, not a claim that a running UI exists or that tests/builds have passed.
