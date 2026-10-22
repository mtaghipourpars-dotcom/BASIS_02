# SM37 Slice — Next-Stage Integration Gate

**Status:** Static validation script committed. Integrated application route and browser acceptance remain NOT RUN.

## Run now
From the repository root:

```bash
python3 scripts/validate_sm37_prototype.py
```

This checks fixture integrity, DEMO labeling, source-locator provenance, observed raw statuses, unknown metadata, bilingual affordances, read-only wording, and the Home-to-detail prototype's static controls. It is not a browser test.

## Required integration sequence
1. Inspect and record the actual application framework, build command, route registry, localization setup, and test runner before changing implementation.
2. Integrate the SM37 view as the Jobs & Processes detail route without changing Home composition or sidebar order.
3. Replace hard-coded prototype fixture access with the application's approved data adapter; keep the fixture behind an explicit DEMO mode.
4. Carry one shared filter/query state from the Home job widget to Jobs & Processes. Detail must show the same selected source scope and raw status filters.
5. Keep aggregate counts and charts disabled until stable SAP job-run identity, duplicate rules, complete extraction, column alignment, and status mapping are validated.
6. Run build/lint/unit tests, then browser acceptance at desktop and narrow viewport sizes, both English LTR and Persian RTL.
7. Record evidence and actual results in `tests/SM37_HOME_TO_DETAIL_ACCEPTANCE.md`; never mark a test PASS without execution evidence.

## Blocking data contract
The supplied extraction does not establish a native job-run ID, SAP SID, capture timestamp/timezone, end time, or delay unit/semantics. The displayed 8,062 is a report metadata value, not a validated unique-run count. Do not synthesize missing values.

## Acceptance exit criteria
- Home and detail agree on the selected data scope and filters.
- Every detail row traces to a source record; derived DEMO locators are never represented as SAP IDs.
- Missing and stale values remain unknown, not zero/healthy.
- Locale switching updates text, direction, and layout without changing data/filter semantics.
- No execution controls are available in Phase 1.
- Build and browser checks are run and their logs/results are recorded.
