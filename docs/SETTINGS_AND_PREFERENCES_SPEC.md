# Settings & Preferences Specification — BASIS_02

**Status:** Product/UI specification for MVP; implementation pending.
**Scope:** /settings, user preferences and future SAP connection-profile configuration.
**Principle:** The MVP must be a polished, feature-rich demonstration without requiring direct SAP connectivity.

## 1. Product intent

Settings is a real application area, not a placeholder. It should make the dashboard feel like a configurable enterprise product while keeping the agreed Home baseline and fixed sidebar inventory/order unchanged. Settings must not make an unimplemented capability look active.

## 2. Page layout

Use the existing application shell, header, sidebar and footer. Do not redesign the Home page or change the established sidebar order.

- Page header: Settings & Preferences, concise description, current environment badge (DEMO / REFERENCE), and reset-to-defaults action with confirmation.
- Top summary strip: current language/direction, theme, font, density and data mode.
- Main content: responsive two-column card grid on desktop, single-column stack on narrow screens.
- Sections/cards, in this order: Language & Typography; Appearance & Theme; Dashboard & Layout; Data Source & Demo Mode; SAP Connection Profiles; Accessibility & Interaction; About & Diagnostics.
- Feedback: inline saved/unsaved state, field-level validation, clear disabled-state explanation and reset confirmation.
- Visual quality: consistent spacing, restrained accent colors, clear section icons, polished form controls, useful empty states and no placeholder lorem ipsum.

## 3. Preferences to support in MVP

### 3.1 Language and typography
- Primary UI language: English or Persian.
- Direction is derived from language: LTR for English, RTL for Persian. Do not allow a contradictory direction.
- Font family: bundled font when available, otherwise system-safe fallback. Include a Persian-capable option and an English-optimized option only if actual fonts are packaged/licensed.
- Base font size: supported stepped range with readable minimum/maximum; preserve hierarchy and prevent clipping.
- Numeric/date display preferences may be included only if formatting is implemented consistently. Never silently reinterpret source timestamps or raw dates.

### 3.2 Appearance
- Theme: Light, Dark, System.
- Accent color: small accessible predefined palette; do not expose arbitrary colors that can break status semantics.
- Density: Comfortable, Compact.
- Layout preference: Standard, Wide content, Focused content. This may adjust content width and spacing only; it must not reorder the fixed sidebar, change route inventory or violate the Home screenshot/baseline.
- Reduced motion: On/Off, respecting OS preference when set to System.
- High contrast: On/Off.
- Status display must use labels/icons as well as color.

### 3.3 Dashboard behavior
- Default landing page: Home by default; alternatives only among implemented routes.
- Default time window: predefined choices such as 1 hour, 24 hours, 7 days, 30 days only where the page/domain supports time filtering. Unsupported filters must be hidden/disabled, not silently ignored.
- Refresh interval: Off / supported interval choices. In Phase 1 this affects only local demo fixture refresh, if such refresh exists; it must not imply live polling.
- Table density: Comfortable/Compact, shared consistently.
- Reset to defaults with confirmation and a visible success/failure result.

### 3.4 Data mode
- MVP default is DEMO / REFERENCE.
- Display source provenance and last-updated/observation state when known.
- A live-data option may be displayed as a future capability but must be disabled with the reason: “A verified data connector is not configured in this MVP.”
- No control may mark data LIVE based on user preference alone. LIVE requires verified collector evidence and runtime source metadata.
- Missing, stale, partial, unavailable, unsupported and unauthorized remain distinct states.

## 4. SAP connection profiles — configuration only in MVP

The MVP does not need direct SAP access and must make no SAP network requests. Settings should nevertheless establish the future configuration UX.

### 4.1 Profile fields
- Profile name (required, unique within the local profile list).
- Environment label (e.g. Development, Quality, Production; labels only).
- SAP system ID (SID) and client.
- Connection type: Application Server or Message Server.
- Application-server host OR message-server host and group, as applicable.
- Instance number where applicable.
- Optional SAProuter route string.
- Authentication mode (future-supported options only; no credentials collected or persisted in MVP).
- Notes (optional, no secrets).

Validate format and required combinations locally. A locally valid profile is not proof of reachability or correctness.

### 4.2 MVP behavior
- Create, edit, duplicate and delete local profile metadata.
- Mark profile state as CONFIGURED_NOT_CONNECTED.
- Test Connection, Connect, Activate Live Data, credential entry and destructive actions are disabled in Phase 1.
- Explain disabled controls with a concise reason and future prerequisite.
- No HTTP/RFC/network call is made by saving, editing or deleting a profile.
- Never save passwords, SAP logon tickets, tokens, cookies, private keys, client secrets or other credentials in localStorage, sessionStorage, fixtures, logs or diagnostics.
- Do not implement fake success for a connection test.

### 4.3 Future connector prerequisites
Before enabling connection testing or live data, define and approve:
- Connector architecture and supported SAP products/releases.
- Authentication and secret management (server-side secret store; no browser-held secrets).
- TLS/certificate policy, host allowlists and network boundary.
- Least-privilege technical user and authorization matrix.
- Data contracts, field mappings, units, time zones and source timestamps.
- Timeout/retry/backoff/circuit-breaker behavior and rate limits.
- Audit, redaction, error handling and operational ownership.
- Runtime health, freshness and coverage signals.
- Security review and integration acceptance tests.

## 5. Persistence and reset
- Store only non-sensitive user preferences and non-secret profile metadata using the application's approved local persistence mechanism.
- If persistence is not implemented, clearly label preferences as session-only; do not claim saved across sessions.
- Version the preference schema and handle unknown/missing keys with safe defaults.
- Reset must remove only this application's preference/profile keys, not unrelated browser data.
- Never persist secrets.

## 6. M / W / E alignment
- **Monitoring (M):** settings reveal current configuration, app build/version when available, data mode, source coverage/freshness and feature availability. They do not modify monitoring evidence.
- **Warning (W):** show warnings for missing connector prerequisites, invalid local profile configuration, unsupported settings and unavailable data only when supported by explicit rules. A configured profile is not a failed connection; no connection attempt means connectivity is unknown/not tested.
- **Execution (E):** in MVP, only local preference/profile CRUD and reset are available. SAP actions, connection tests, credential changes and live-source activation remain disabled. Future connector actions require authorization, secure secrets, audit and explicit verification.

## 7. Accessibility, responsiveness and localization
- Keyboard-operable controls with visible focus, semantic labels and clear validation.
- Do not rely on color alone; ensure contrast in Light/Dark and High Contrast.
- Respect reduced motion.
- Correct RTL/LTR behavior for navigation, forms, drawers, tables and charts; keep technical identifiers and hostnames readable.
- Desktop layout should feel like a professional operations cockpit; tablet/mobile should reflow without horizontal page overflow.
- Font changes must not clip text or change the meaning/order of data.

## 8. Acceptance criteria
1. Settings route renders inside the existing app shell and active navigation state is correct.
2. Home visual baseline and fixed sidebar order are unchanged.
3. English/LTR and Persian/RTL are supported across the Settings page.
4. Theme, typography, density, content-width preference, contrast and reduced motion have working UI behavior once implemented.
5. Preferences are either genuinely persisted or explicitly session-only.
6. Reset is confirmed and scoped.
7. Connection profiles can be edited locally without network requests.
8. Connection test, Connect and Live mode cannot be activated in MVP.
9. No secrets are persisted or included in diagnostics.
10. DEMO/REFERENCE provenance remains visible; no live status is user-toggleable.
11. Empty, invalid, unavailable and disabled states explain what happened and what prerequisite is missing.
12. All controls are keyboard accessible and responsive.

## 9. Defaults to start MVP without blocking on more decisions
- Default language: English initially, with Persian/RTL fully supported.
- Theme: System.
- Density: Comfortable.
- Content layout: Standard.
- Data mode: DEMO/REFERENCE.
- Landing page: Home.
- SAP profiles: local metadata only, disconnected.
- No external dependency solely for preferences; use the existing project stack.

## 10. Related specifications
- MASTER_SPECIFICATION.md
- specs/pages.yaml
- specs/widgets.yaml
- specs/data-contracts.yaml
- docs/TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md
- docs/CROSS_PAGE_DATA_INTEGRITY_VALIDATION.md
- docs/QUALITY_GATES.md
