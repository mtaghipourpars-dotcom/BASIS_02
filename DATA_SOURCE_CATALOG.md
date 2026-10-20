# Data Source Catalog — BASIS_02
Status: Template; no live source mapping is approved by this document.

This catalog maps a UI widget to an owner-provided fixture or service contract. The frontend team/LLM must not infer source endpoints, authentication, query parameters, field names, units or semantics.

| Source ID | Mode | Artifact/contract | Owner | Schema/version | Refresh/freshness | Status |
|---|---|---|---|---|---|---|
| SRC-DEMO-HOME-001 | DEMO | TBD | Product owner | TBD | Fixture-defined | NEEDS_OWNER_INPUT |
| SRC-LIVE-SM04-001 | LIVE | TBD; do not infer from name | Product owner | TBD | TBD | NEEDS_OWNER_INPUT |

For every approved mapping, record:
- Source ID and mode (DEMO/LIVE)
- Exact file path or endpoint contract reference
- Schema version and example payload
- Widget IDs that may consume it
- Field-by-field mapping and transformation rules
- Units, timezone, sorting, filters, aggregation and null/duplicate handling
- Authentication/authorization assumptions visible to the frontend (never store secrets in this catalog)
- Timeout, partial response, stale response and error behavior
- Owner approval and test fixture

A source being listed here does not authorize access until its status is APPROVED.
