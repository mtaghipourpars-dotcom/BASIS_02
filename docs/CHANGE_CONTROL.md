# Change Control and Impact Analysis

## Change classes

- **C1 — Local:** isolated component or copy change with no contract/API/shared-style impact.
- **C2 — Cross-component:** shared component, token, widget contract, route, data mapping, or test harness change.
- **C3 — Product/architecture:** page inventory, navigation order, fixed layout, framework, dependency family, security model, or data/metric semantics change.

C2 and C3 require explicit impact analysis before implementation. C3 requires an approved decision recorded in the repository before coding.

## Impact analysis template

For each change, record:
1. Intent and why it is needed.
2. Authoritative requirements/specifications.
3. Pages and routes affected.
4. Widgets and shared components affected.
5. Data contracts and metric definitions affected.
6. Styling tokens and responsive behavior affected.
7. Tests and fixtures to add/update.
8. Dependencies, security, and runtime risks.
9. Backward compatibility and rollback approach.
10. Acceptance criteria and evidence required.

## Conflict resolution

If documents disagree, do not let the LLM choose by recency, convenience, or plausibility. Identify the conflicting statements, propose a resolution, and update the authoritative artifact first. Then update references and tests.

## Decision records

Record nontrivial decisions with:
- ID and date;
- status: proposed / accepted / superseded;
- context and constraints;
- options considered;
- decision and rationale;
- consequences and trade-offs;
- validation/revisit trigger.

Do not preselect the frontend stack or chart library in the absence of repository inspection and explicit approval.

## Scope discipline

Every task lists permitted paths. Unrelated modifications must be reverted or separately proposed. Broad refactors should not be bundled with feature work. A failed test is evidence to investigate, not permission to reduce the acceptance criteria.

## Release note

For accepted changes, record the user-visible effect, migration/configuration impact if any, tests run, known issues, and the commit SHA.
