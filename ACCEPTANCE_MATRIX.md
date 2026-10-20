# Acceptance Matrix — BASIS_02
Status: Baseline matrix; a row passes only after the check is actually executed.

| Scope | Required verification | Evidence | Status |
|---|---|---|---|
| Shell | Header/sidebar/footer render on every route | Screenshots/test output | NOT_RUN |
| Routes | Exactly the approved 13 routes and correct active nav | Route test | NOT_RUN |
| Widget registry | Every visible widget has an APPROVED `specs/widgets.yaml` record | Registry audit | BLOCKED |
| Data mapping | Each widget data contract maps to an approved fixture/source | Catalog audit | BLOCKED |
| Metrics | Each numeric KPI maps to an approved metric definition | Metric registry audit | BLOCKED |
| Localization | No missing EN/FA keys; all states and accessibility strings translated | Automated i18n test | NOT_RUN |
| RTL/LTR | Persian layout mirrors shell, IDs remain LTR and exact | Visual test | NOT_RUN |
| Data quality | Missing/null, stale, partial, unsupported and error remain distinct | Fixture tests | NOT_RUN |
| DEMO/LIVE | DEMO is visible; no unapproved LIVE claim | UI and integration test | NOT_RUN |
| Responsive | 1536×1024, 1280×800, tablet and mobile checked | Screenshots/test output | NOT_RUN |
| Accessibility | Keyboard navigation, focus, accessible names, status not color-only | Accessibility test | NOT_RUN |
| Read-only | No unapproved write/execute actions in Phase 1 | Interaction audit | NOT_RUN |
| Build | Build command completed successfully | CI log | NOT_RUN |

Page-level acceptance details live in `specs/pages.yaml` and `tests/VISUAL_I18N_ACCEPTANCE.md`. This matrix summarizes release gates; it does not replace them.
