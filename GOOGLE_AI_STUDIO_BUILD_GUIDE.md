# Google AI Studio Build Guide — BASIS_02

## Official platform reference
Google's official Build-mode documentation: https://ai.google.dev/gemini-api/docs/aistudio-build-mode

Google AI Studio Build mode can import an existing GitHub repository, generate a web app with a React frontend and optional Node.js server runtime, show a live preview, and sync changes to GitHub. This MVP does not need server-side services because SAP connectivity and external data are out of scope.

## One-time workflow
1. Open Google AI Studio and enter **Build** mode.
2. Select **Web app**, not Android.
3. In the prompt composer, open **Add files (+)** and choose **Import from GitHub**; select `mtaghipourpars-dotcom/BASIS_02`. Authorize access if prompted.
4. Wait for repository import/context loading.
5. Open `GOOGLE_AI_STUDIO_PRIMARY_BUILD_PROMPT.md` from the imported repository and paste its entire contents into the Build prompt. Importing a repository alone does not guarantee the agent will follow all specs.
6. Let the agent implement the app and inspect the live preview. The prompt says not to ask routine questions and defines safe defaults.
7. Link/sync the AI Studio project to this same GitHub repository using the GitHub integration. Confirm the correct repository and branch and review the diff before pushing.
8. Use `GOOGLE_AI_STUDIO_CONTINUATION_PROMPT.md` for a second repair/verification pass if needed.

## Defaults already specified
- Web app; preserve existing working stack or use React + TypeScript/npm.
- Read-only Monitoring MVP with local DEMO/REFERENCE fixtures.
- No direct SAP requests, credentials, server connector, database, Firebase, live telemetry or operational actions.
- Exact page/sidebar inventory and Home visual baseline from the repo.
- Ten islands and KPI candidates from `docs/TEN_ISLANDS_EMW_KPI_FUNCTIONAL_SPEC.md`.
- English and Persian (`fa-IR`) with atomic RTL/LTR.
- Settings for language, typography, theme, density/layout, accessibility, demo mode and configuration-only SAP connection profiles.
- No questions for routine choices; use documented defaults and honest unknown/unavailable states.

## Important
- Do not add SAP credentials to AI Studio Secrets for this MVP.
- Do not enable SAP connectivity even if the platform suggests a server runtime or secrets store.
- Preserve an existing functional framework instead of rewriting it just to match a preferred stack.
- The deliverable is a working interactive app, not only specs or a static mockup.
- The agent must report actual build/test results and limitations. Never accept unverified claims that tests passed or that the app is connected/live.
