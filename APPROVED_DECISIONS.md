# Approved Decisions and Open Questions — BASIS_02
Purpose: durable decision register. An entry is approved only when the product owner explicitly confirms it.

## Approved baseline decisions
- The application is the bilingual SAP Basis Operations Cockpit.
- English and Persian are required; English is LTR and Persian is RTL.
- Page/sidebar inventory and widget placement are fixed, not customer-configurable.
- The supplied screenshot defines visual direction and Home hierarchy; its displayed values are illustrative only.
- Phase 1 is read-only monitoring; no SAP/OS execution or remediation controls.
- SAP backend agents/APIs and their security/validation are owned by the product owner.

## Open decisions — implementation must not guess
- [OPEN] Exact widget-by-widget visual type, fields, and placement: populate and approve `specs/widgets.yaml`.
- [OPEN] Which exact sample fixture or service contract feeds each widget: populate and approve `DATA_SOURCE_CATALOG.md`.
- [OPEN] KPI definitions, formula, unit, aggregation and time windows: approve each metric in `specs/metric-registry.yaml`.
- [OPEN] Runtime frontend framework and chart/table component libraries, if not already fixed in application/engineering standards.
- [OPEN] Locale preference persistence mechanism; `specs/i18n.yaml` currently marks it pending.
- [OPEN] Exact thresholds and health aggregation rules, if any.
- [OPEN] Approved logo, fonts, background artwork, icon set and licensing/provenance.
- [OPEN] Live-mode activation and connection status rules.

## Decision entry template
### DEC-XXX — short title
- Status: OPEN | APPROVED | REJECTED
- Date:
- Question:
- Options:
- Product-owner decision:
- Rationale:
- Affected files:
- Acceptance impact:
