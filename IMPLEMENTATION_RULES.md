# Implementation Rules — BASIS_02
Status: Baseline rules; product decisions remain subject to owner approval.

1. Read `MASTER_SPECIFICATION.md` first, then the specific page/widget contracts and `DEVELOPMENT_STANDARD.md`.
2. Do not implement any widget whose `specs/widgets.yaml` record is absent or not APPROVED.
3. Do not infer a field, endpoint, service parameter, KPI formula, unit, threshold, time window, sorting rule, image license, dependency, or interaction.
4. If a required detail is missing or contradictory, stop only the affected slice, record the question in `APPROVED_DECISIONS.md`, and ask the product owner.
5. Do not add/remove/reorder pages or widgets, change visual hierarchy, or add dependencies without explicit approval.
6. Do not make write/execute controls in Phase 1. All SAP operational data is read-only.
7. DEMO data must be clearly labeled. Never silently replace unavailable data with fake values, zero or a healthy status.
8. Keep user-facing text in centralized locale dictionaries. Never hard-code UI text in components.
9. Do not change unrelated files. Keep changes small and traceable.
10. After each approved slice, report files changed, behavior changed, checks actually run, results, and unresolved questions.
11. Never claim build/test success unless it was run and passed.
12. A Git commit or an LLM-generated proposal is not product-owner approval.
