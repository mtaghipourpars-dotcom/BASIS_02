# Decision Log

This log records decisions that affect architecture or product behavior. Keep proposed and accepted decisions distinct.

## ADR-000 — Technology stack
- **Status:** PENDING
- **Context:** frontend framework, build tool, package manager, chart library, and test runner have not yet been verified against the repository/runtime and product needs.
- **Decision:** none. Inspect repository/runtime and compare viable options before selecting.
- **Consequences:** implementation beyond technology-neutral specifications must wait for this decision.

## ADR-001 — Fixed page and widget structure
- **Status:** ACCEPTED as a product constraint; detailed inventory pending
- **Context:** page inventory, sidebar order, header/footer, and widget placements are product-controlled.
- **Decision:** end users cannot add/remove/reorder pages or widgets. Structural changes go through code review and release.
- **Consequences:** page and widget definitions must be version-controlled and tested.

## ADR-002 — Monitoring phase is read-only
- **Status:** ACCEPTED
- **Context:** first delivery is a monitoring dashboard.
- **Decision:** no operational actions against SAP or operating systems in Phase 1.
- **Consequences:** UI must not expose restart, cancellation, deletion, configuration change, or execution controls as functional actions.

## ADR-003 — Data quality is visible
- **Status:** ACCEPTED
- **Context:** a dashboard can mislead when stale, partial, invalid, or synthetic data looks healthy.
- **Decision:** preserve provenance, freshness, quality, and DEMO/LIVE mode in the presentation contract.
- **Consequences:** state-handling and contract tests are release requirements.
