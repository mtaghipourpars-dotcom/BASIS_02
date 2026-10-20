# BASIS_02 — SAP Basis Dashboard UI Engineering

**Purpose:** establish the controlled development standards for the SAP Basis Operations Dashboard before application implementation begins.

This repository is the product-development workspace. It is not a copy of BASIS_01 and does not yet assert a selected frontend framework, chart library, build tool, API implementation, or production readiness.

## Start here

1. [Development standard](DEVELOPMENT_STANDARD.md) — mandatory rules and decision authority.
2. [AI-assisted workflow](docs/AI_DEVELOPMENT_WORKFLOW.md) — how work is specified, implemented, and reviewed.
3. [Quality gates](docs/QUALITY_GATES.md) — test requirements and release blockers.
4. [Change control](docs/CHANGE_CONTROL.md) — impact analysis, scope, and decision records.
5. [Application contract](specs/application.yaml) — initial application-wide constraints.
6. [Pages contract](specs/pages.yaml) — fixed navigation and page inventory; intentionally pending validation.
7. [Widgets contract](specs/widgets.yaml) — widget definition schema and initial empty inventory.
8. [Metric registry](specs/metric-registry.yaml) — explicit KPI semantics; no unverified KPI is pre-approved.
9. [Data contracts](specs/data-contracts.yaml) — source, freshness, quality, and state conventions.
10. [Implementation task template](prompts/IMPLEMENTATION_TASK_TEMPLATE.md) — bounded, testable tasks for an LLM.
11. [Acceptance checklist](tests/ACCEPTANCE_CHECKLIST.md) — human and automated acceptance checks.

## Product constraints

- Phase 1 is **Monitoring / read-only**. No operational actions against SAP or operating systems.
- Navigation, page layout, header/footer, and widget placement are product-controlled and change only through reviewed code and a release.
- Synthetic data must be unmistakably labeled `DEMO`; it must never be represented as live system data.
- Unknown, stale, partial, invalid, or unsupported data must not be rendered as healthy.
- A displayed metric requires a documented definition, units, aggregation, null/duplicate handling, and tests.
- The LLM is an implementation assistant, never the authority that approves its own work.
- Repository contracts and tests, not chat history, are the durable project memory.
- Do not select a framework or library until the existing runtime/tooling and product needs have been inspected and the decision recorded.

## Baseline status

**Standards scaffold only.** Page inventory, visual reference, design tokens, technology stack, and metric definitions remain pending explicit confirmation. No claim is made that the app builds or tests pass until executable tooling and CI checks exist.

## Working rule

For every change: define acceptance criteria → analyze impact → implement the smallest coherent slice → run relevant checks → inspect the rendered behavior → record evidence and unresolved risks. A failed check must not be silenced by weakening the test without an explicit, justified decision.
