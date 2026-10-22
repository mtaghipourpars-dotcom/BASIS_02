# Browser Acceptance — SM37 Home-to-Detail

**Scope:** current standalone HTML prototype only. This is not the integrated application and does not verify SAP connectivity.

## Run locally
```bash
npm install
npx playwright install chromium
npm run test:browser
```

GitHub Actions runs the same suite on relevant pushes, pull requests, or manual dispatch. A PASS must be read from an actual workflow run; committing the suite is not a test result.

## Scenarios
1. Home → Jobs & Processes; exactly five explicitly DEMO sample rows.
2. Raw status filtering, text search, empty state and filter reset.
3. Row selection opens read-only details with source provenance; no job execution controls.
4. English LTR ↔ Persian RTL, retaining selected record.
5. Narrow viewport navigation to Jobs & Processes.

## Integration limitation
The repository currently contains specifications, fixtures and standalone prototypes, but no application source entry point, package/build manifest, route registry or configured test runner. Therefore the current suite deliberately tests the prototype, not a fabricated “real app” route. Once the actual frontend is committed, move/adapt these tests to its real route and keep the same acceptance semantics.
