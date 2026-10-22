# AI-Assisted Development Workflow — Visual Co-Creation

## Purpose
Develop the product through visible results and short feedback loops. The product owner often arrives with a mature mental concept and is seeking execution, not a text-first discovery exercise. Visual output is a thinking tool, not merely the final presentation.

## Default loop
1. **Inspect the real starting point:** existing app, repository, approved screenshots, and prior decisions. Do not assume a blank slate.
2. **Create the next useful visual result early:** a real page, dashboard, clickable prototype, or focused change to the current app. Do not block this on a large specification document when the available evidence is enough to proceed safely.
3. **Add independent creative value:** offer one concrete improvement beyond literal execution, while preserving approved references and constraints.
4. **Review visually and functionally:** use the owner's reaction to discover new ideas and correct misunderstandings.
5. **Refine in small steps:** retain working parts, change only the intended slice, and verify that related pages/data remain coherent.
6. **Document decisions when useful:** keep documents short and update them when they prevent a real ambiguity or regression.

## Product interpretation rule
Treat a request to build a dashboard as a product outcome, not merely a request to draw the requested widgets. Determine the relevant source capabilities, select the most useful ones for the target role, and express them as a coherent, visually inspectable experience. Do not ask the owner to enumerate every page or widget when research and product judgment can produce a strong first proposal. Do not claim research is complete until sources have actually been reviewed.

## BASIS Operations Cockpit — intended product direction
The product should selectively emulate and extend useful SAP Fiori capabilities for SAP Basis operations; it is not intended to copy every Fiori app indiscriminately. Research the SAP Fiori Apps Reference Library and relevant official SAP documentation, identify the most useful Basis-relevant apps/capabilities, and map them into three operational layers:

- **Monitoring:** observe systems, instances, services, jobs, performance, database, availability and technical health.
- **Warning:** surface actionable alerts, threshold breaches, anomalies, risks and their evidence; provide drill-down from summary to detail.
- **Execution:** provide controlled operational actions with explicit authorization, confirmation, auditability and safe failure handling.

The three layers describe the target product vision. The current BASIS_02 Phase 1 remains read-only Monitoring unless the owner explicitly approves a later phase; do not add live execution controls to the current phase. The Fiori app inventory and selection are a research task to perform, not a completed result or an assumed list.

## Implementation safeguards
- Inspect the current branch, repository tree, package/build files, application entry points, and existing tests before changing code.
- Keep the existing approved visual reference and navigation constraints unless the owner authorizes a change.
- Use REAL, DEMO, and UNKNOWN distinctly. Never present synthetic fixtures as live telemetry or invent source semantics, KPI formulas, thresholds, or endpoints.
- Keep changes incremental and scoped. Reuse existing patterns; do not rebuild the whole app for a local improvement.
- Check cross-page KPI definitions, filters, time windows, and drill-down behavior where relevant.
- Validate using actual available tools. Report exact checks and results; never invent a passing build or test.
- If a critical unknown blocks a safe or meaningful next step, ask one focused question. Otherwise state a reversible assumption and continue.

## Task sizing
Prefer one meaningful visual slice at a time. A slice may be a complete widget, page section, drill-down path, or visual comparison of candidate capabilities. The first output should help the owner see and judge the product.

## Completion note
Keep the report brief: what became visible or changed, what is genuinely verified, and the single best next step.
