# Visual Architecture — SAP Basis Operations Cockpit

**Status:** user-provided visual reference accepted as the baseline for visual direction. **Reference:** supplied image main_10.png (1536×1024). The image is a design reference, not evidence of live data or a source for approved KPI formulas.

## 1. Visual intent
- Dark navy/blue operations cockpit with cyan/blue borders and restrained green/amber/red status colors.
- Dense, information-rich desktop dashboard; high-resolution desktop is the primary target.
- Persistent top header, fixed left navigation rail, scrollable content canvas.
- Fine borders, compact cards, subtle blue glows, clear typography, consistent spacing, restrained iconography.
- Rebuild shell/widgets as responsive, accessible components; do not use the screenshot as the UI.
- Screenshot values are illustrative only, not approved product facts.

## 2. Application shell

### Header
Left: product mark area and product name “Basis Operations Cockpit”; subtitle “Monitor · Analyze · Keep SAP Running”.
Center: global search for systems, instances, hosts, and jobs.
Right: localized date/time, connection/live indicator, notifications, user/profile menu, role label, and settings.
All visible text, accessible names, tooltips, placeholders, date formats, and menu entries use the selected locale. Date/time comes from the application clock/data source, never hard-coded screenshot values.

### Sidebar — fixed product-owned order
1. Home
2. Overview
3. Systems
4. Landscape
5. Alerts & Events
6. Performance
7. Jobs & Processes
8. Database
9. Transports
10. Security
11. Backup & Recovery
12. Reports
13. Settings

Each item has a stable route, icon, localized label, keyboard-accessible focus/active state, and tooltip where labels are collapsed. Inventory/order is not user-configurable. Home is the initial reference composition; detailed layouts for other destinations are later approved slices.

### Home content grid
Use a 12-column responsive grid with explicit, stable widget placement at the primary desktop breakpoint. Preserve the reference hierarchy:
- **Hero/status band:** landscape-at-a-glance panel, Total Systems, Critical Alerts, Open Jobs, System Load, stable-systems illustration/panel.
- **Middle row:** Landscape Overview; System Health with overall health and trend; Active Alerts.
- **Metrics row:** Key Performance Metrics; System Resources; Top Systems by Health; Recent Events.
- **Bottom row:** SAP Stack Health; Job Monitoring; Database Status; Storage & Backup; Network & Connectivity.
- Narrower layouts reflow cards in the same semantic reading order. Never clip critical content or hide alerts to preserve the desktop grid.
- Widget placement is product-controlled and changes only through reviewed spec/code.

## 3. Widget behavior and data states
Every data-backed widget supports applicable states: loading, healthy/success, empty, partial, stale, unavailable, and error. State is visually and textually explicit; unknown data is never green by default. Critical alerts and stale/failed sources remain distinguishable without relying on color alone.

Reference counts, percentages, alert names, timestamps, hosts and job names are illustrative only. Seeded fixtures must be labeled DEMO in both data model and UI. They do not prove live integration.

## 4. Design tokens
Initial intent: deep navy background; dark-blue surfaces; thin blue/cyan borders; cyan/blue primary accent; green positive, amber warning, red critical, blue informational; near-white primary text and muted blue-grey secondary text; consistent spacing/radius/shadow scale.
Status meaning must also be conveyed through labels/icons/patterns, not color alone. Exact HEX values, font families, icon package, and responsive breakpoints remain PENDING until recorded in the design-token contract/ADR.

## 5. Bilingual and RTL/LTR contract
Persian (fa-IR) and English (en) are first-class supported locales.
- A single global language selector switches the whole application atomically.
- English sets lang=en and dir=ltr; Persian sets lang=fa-IR and dir=rtl.
- Direction applies to shell, sidebar, cards, tables, charts, menus, forms, dialogs, empty/error/loading states, tooltips, notifications, accessibility labels, and exports.
- In Persian, mirror layout-sensitive navigation and directional controls. Do not mirror universal symbols/logos or data visualizations where mirroring changes meaning.
- All UI copy comes from centralized locale dictionaries. No user-visible hard-coded strings in components.
- Switching locale preserves current route, filters, selected system, and unsaved input. Persist preference where runtime allows.
- Numeric telemetry and technical identifiers retain source meaning. Localize date/time and number presentation consistently; do not translate SAP transaction codes, hostnames, instance IDs, job IDs, database names, or other identifiers.
- Charts localize titles, axes, legends, tooltips, empty states, and accessible descriptions. RTL charts remain readable and values are not reversed incorrectly.
- Use complete localized messages and pluralization; avoid concatenating translated sentence fragments.
- Persian typography must support glyph shaping and legible digits; font choice is pending runtime/dependency review.
- Missing translations fail visibly in development and use a defined fallback in production; never silently show raw translation keys.

## 6. Accessibility and responsive behavior
Semantic landmarks/headings; keyboard-operable navigation; visible focus; accessible names; meaningful chart summaries; status text independent of color. Support zoom and long Persian labels without overlap, critical clipping, or horizontal overflow at supported breakpoints. Desktop screenshot is the visual baseline, not permission to sacrifice accessibility.

## 7. Implementation boundaries
This defines visual structure and behavior, not a technology choice. Framework, CSS strategy, chart library, icon library, and localization package require repository/tooling inspection and a recorded decision. Phase 1 remains read-only Monitoring: no SAP/OS execution controls.
