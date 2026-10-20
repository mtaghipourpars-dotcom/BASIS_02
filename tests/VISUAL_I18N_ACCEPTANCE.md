# Bilingual UI and Visual Acceptance Tests

Run these checks for every relevant implementation slice. The screenshot is a composition reference; metric values shown in it are not approved live data.

## Visual baseline
- [ ] Header, fixed sidebar, content canvas, dark navy palette, cyan outlines, compact cards, and visual hierarchy follow docs/VISUAL_ARCHITECTURE.md.
- [ ] Home dashboard contains the specified hero band and all specified widget groups in the approved order.
- [ ] At target desktop viewport, cards align without unintended gaps, overlap, clipping, or overflow.
- [ ] At narrower supported viewports, cards reflow in semantic order and critical alerts remain visible.
- [ ] Loading, empty, partial, stale, unavailable, and error states are distinguishable.
- [ ] Fixture-driven values are marked DEMO and never imply a live connection.

## Locale switch
- [ ] Language selector is available in the global header.
- [ ] English selection sets document language to en and direction to ltr.
- [ ] Persian selection sets document language to fa-IR and direction to rtl.
- [ ] Every sidebar item, page title, card title, KPI label, table header, chart title/axis/legend/tooltip, alert, event, button, form label, placeholder, menu, tooltip, toast, empty/error/loading message, and accessible name changes locale.
- [ ] Layout mirrors appropriately in RTL; logos, identifiers, and semantically directional data are not incorrectly mirrored.
- [ ] Route, filters, selected system, and unsaved form values survive language switching.
- [ ] Locale preference persists when supported by the chosen runtime.
- [ ] Persian glyph shaping, mixed Persian/Latin strings, dates, numbers, and long labels are legible.
- [ ] SAP transaction codes, hostnames, instance IDs, job IDs, and database identifiers are not translated.
- [ ] Automated test detects missing translation keys and hard-coded user-facing strings.
- [ ] No key, label, notification, chart annotation, or accessibility text remains in the previous language after switching.

## Evidence required
Record tested viewport(s), browser, locale, route, fixture/live provenance, test command and result, screenshots for both locales, and known limitations. Do not report success for checks that were not executed.
