# AI-Assisted Development Workflow

## Purpose

Use an LLM to accelerate implementation without allowing it to invent requirements, silently broaden scope, or approve its own work.

## Workflow

### 0. Establish the baseline
Inspect the current branch, repository tree, package/build files, application entry points, and existing tests. Report what exists and what is missing. Do not overwrite or replace an existing app before understanding it.

### 1. Specify one coherent slice
A task must state:
- outcome and user-visible behavior;
- authoritative specification files;
- allowed files/paths and prohibited scope;
- input/output examples and data provenance;
- loading, empty, partial, stale, and error behavior as relevant;
- acceptance criteria with observable pass/fail conditions;
- commands/checks available to run.

If a required design or data fact is unknown, mark it blocked/pending rather than inventing it.

### 2. Analyze impact
Before editing, list impacted routes/pages, shared components, contracts, styles/tokens, fixtures, tests, and dependencies. Identify regression risks. If scope expands, stop and ask for approval.

### 3. Implement the smallest slice
Implement only the agreed scope. Prefer reuse of existing patterns. Do not add packages, new routes, global CSS changes, mock values, or alternate behavior without explicit authorization. Keep demo fixtures separate from live adapters.

### 4. Validate
Run the relevant checks from the repository's actual tooling. At minimum, review:
- specification/contract consistency;
- component behavior for success and failure states;
- calculations against known examples;
- layout at relevant viewports and with long/empty data;
- console/build/test errors;
- unintended changes outside scope.

If no test runner or app runtime exists yet, report that limitation; do not fabricate a passing result.

### 5. Review independently
Compare implementation to the specification and acceptance criteria. The same LLM may help prepare a review checklist, but its self-review is not independent approval. Human acceptance is required for product behavior and visual fidelity.

### 6. Record the result
Summarize files changed, rationale, test commands and exact outcomes, screenshots or evidence where available, unresolved risks, and follow-up work. Update specifications only when the requirement itself was intentionally changed.

## Task sizing

A task should normally produce one testable result, such as one shell component, one widget, one contract validator, or one state-handling improvement. Avoid asking the LLM to implement the whole dashboard in a single prompt.

## Stop conditions

Stop before coding if:
- two authoritative specifications conflict;
- source field meaning or metric formula is unknown;
- the reference design is missing for a visual-fidelity task;
- the requested change requires a new dependency or architecture decision not yet approved;
- the task would alter fixed navigation/layout outside the agreed scope;
- a security or data-integrity rule would be violated.

## Suggested task sequence

1. Inspect repository and identify current toolchain.
2. Validate and freeze the visual/page inventory.
3. Record technology decisions.
4. Establish tokens and reusable shell.
5. Implement one representative widget with fixture data.
6. Test widget states and visual behavior.
7. Replace fixture adapter with the user-supplied live-service contract.
8. Test contract mapping and failure behavior.
9. Repeat the pattern for the next widget.
