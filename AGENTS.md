# Agent instructions

## Specification-driven development

This project uses the SDD Manager plugin for specification-driven development. If not already in the context, load `PLUGIN.md` from installed location or from `.agents/plugins/sdd-manager/PLUGIN.md` and the coordinator skill entry it references. If neither source is available, report the missing plugin before dependent workflow work.

**Follow the applicable SDD Manager workflows, including human checkpoints, Git publication and integration, and the tracking policy below.**

## Initialization

Execute the [skill and plugin discovery protocol](SKILL_DISCOVERY_PROTOCOL.md).

## Windows shell

On **Windows execution hosts only**, follow [WINDOWS_SHELL_POLICY.md](.agents/plugins/sdd-manager/assets/WINDOWS_SHELL_POLICY.md): CMD syntax, unavailable PowerShell/pwsh, temporary files for script text and shell operations, and the documented tool probe/recovery. This repository policy is independent of the plugin.

## Browser development

When developing or testing browser-based applications or browser extensions, follow [BROWSER_DEV_POLICY.md](.agents/plugins/sdd-manager/assets/BROWSER_DEV_POLICY.md). Prioritize Chromium and include Firefox by default; project documents may specify other choices. Use dedicated, isolated environments.

## Environment diagnostics

When Playwright is selected, follow [Playwright environment guidance](.agents/plugins/sdd-manager/assets/playwright.md) before dependent setup and execution, and when provisioning or browser runtime blocks required checks.

When a Vite-served module worker fails to start, especially from a linked Windows checkout or with an HTML entry response, follow [Vite worker-loading diagnostics](.agents/plugins/sdd-manager/assets/vite-worker-loading.md). Diagnose the loading stage before applying a workaround; this guidance does not apply to every SQLite or worker failure.

## Workflow continuity

For continuation, read `docs/dev/HANDOFF.md` and use `sdd-manage`'s continuity subworkflow to reconstruct later work from current development records and Git. The handoff describes a checkpoint, not necessarily the branch tip. At startup, inspect unfinished workflow branches against their recorded parents and request the continuation branch unless already selected. Preserve the recovered scope, approvals and stopping boundary.

## Human checkpoints

Present each necessary new development document with concise substantive analysis and pause for acceptance before dependent work. Honor the user's requested implementation range and stop when it is complete.

The user may explicitly preapprove future checkpoints at any time. Retain the scope and conditions of that decision, including after interruption; do not repeat a covered approval request. Preapproval does not waive QC, resolve blockers or expand the authorized implementation range.

## Commits and publication

Keep each task's verified result, required evidence and completion checkbox in the same commit. Push every owned commit and verify remote containment before further work or another commit, unless the user explicitly directs local-only or deferred publication.

Use SDD Manager's integration procedure at the authorized complete boundary.

## GitHub tracking

Enable and maintain GitHub tracking for documentation preparation and implementation **by default**. The user may disable tracking, select local-only work or choose another supported backend. Preserve an established choice through interruptions and access failures; copying this template does not reset it.

Follow `sdd-manage`'s preparation and phase-activation workflows for required tracking readiness and lifecycle updates. Reconcile uncertain effects before retrying and report unmet prerequisites before dependent work.

## Project guidance

Maintain project-specific navigation and validated setup/check commands here as they become established. Do not invent commands, paths, requirements or completion claims.

The browser-game scope is defined in [PROJECT](docs/dev/PROJECT.md), with behavior in [SPEC](docs/dev/SPEC.md), logical design in [ARCHITECTURE](docs/dev/ARCHITECTURE.md) and [DECOMPOSITION](docs/dev/DECOMPOSITION.md), delivery strategy in [PLAN](docs/dev/PLAN.md), physical ownership in [layout](docs/dev/layout.md), and the main executable product task list in [TASKS](docs/dev/TASKS.md). These documents describe the intended product; their presence does not establish implementation completion. Recover the active preparation stage from [DOCS_PREPARATION](docs/dev/DOCS_PREPARATION.md) and the handoff above before selecting work.

Validated tooling commands and observed browser provisioning/recovery are in [DEVELOPMENT](docs/DEVELOPMENT.md). Use the local pinned Playwright through scripts/browser-env.mjs; SDD_FIREFOX_RECOVERY is opt-in for the diagnosed local test host only. Milestone evidence is under docs/dev/reports/phases/1; docs/dev/reports/IMPLEMENTATION-REPORT.md records completed phase integration and release. TASKS retains the executable work and its completion evidence.

Validated product checks: npm run typecheck, check:boundaries, test:unit, test:package, build, package, verify:package, and test:browser (source/built/extracted targets documented in DEVELOPMENT). Optional Python test tools install into .test-tools from requirements-dev.txt. Reports under docs/dev/reports/phases/1 retain milestone evidence and exact limitations. Release publication occurs only after full phase integration.

Modern rules are incorporated into docs/dev/SPEC.md and spec/modern-rules.md. docs/dev/TASKS.md is the sole executable task owner for completed Phase 1 and Phase 2. The historical accepted feature/preparation/QC package is under docs/dev/features/001_0882e5d-modern-rule-extensions; its checklists are non-executable. Phase 2 milestone/phase and final reports remain under that package. Recover actual integration/release state from HANDOFF.md.

Conditional ghost contracts are incorporated into docs/dev/SPEC.md and spec/ghost-visibility.md. Main TASKS alone owns T-001–T-026; feature002 accepted sources/preparation/QC are historical under docs/dev/features/002_0adba6e-conditional-ghost-visibility, with Phase3 milestone/phase/final reports. Recover actual integration/release state from HANDOFF.

Selected configuration contracts are incorporated into docs/dev/SPEC.md and spec/session-configuration.md with current modern/ghost children. Main TASKS alone owns T-001–T-032; campaign003 accepted sources/preparation/adjacent QC are historical under docs/dev/features/003_3977abb-session-only-game-configuration, with Phase4 milestone/phase/final reports. C-07 owns detached page memory; C-04 active rules; C-05 controlled six-setting panel; C-06 browser resources/projection. Recover actual integration/release state from HANDOFF.

Penetrator contracts are incorporated into current SPEC and spec/penetrator.md; main TASKS alone owns T001–T040. Eligible004 sources/preparation/adjacent QC are historical under docs/dev/features/004_1cadd99-penetrator-mode, with fixed5.1/5.2/phase/final reports. C02 owns deepest landing/guarded kicks/coupled appearance compaction; C04 bank/mode/mask/clocks; C05 white/bonus/mode/Hold presentation; C06 B. Six selected values remain C07. Recover actual integration/release state from HANDOFF.

Source-only penetrator-view/lifecycle fixtures never ship and are excluded from built/extracted targets. Expanded persistence source110/built94 suites measured218.5s/199.5s; all source/built/extracted suites use a finite300s global budget/360s wrapper. Full v1.5.0 extracted94-case acceptance is verified in T-045. Actual earned-gameplay traces use normal keys and controlled RNG/time, without production setters.

## Browser persistence ownership

Current [SPEC](docs/dev/SPEC.md) and [U-01–U-08](docs/dev/spec/configuration-persistence.md) own URL/cookie restoration and changed-key effects; main TASKS alone owns1–46. Campaign005 accepted sources/preparation/QC are historical under docs/dev/features/005_5153bbf-url-get-cookie-persistence; recover actual phase/integration/release state from HANDOFF and its phase/final reports.

C-07 owns canonical validation/defaults and pure detached memory. C-08 browser codec/effect modules wrap that same controller; C-06 alone binds document/window callbacks before initial mount. C-04/C-05 retain copied active rules/live display timing and reusable interfaces. Browser persistence adds no game save, seventh setting, singleton, polling, backend or platform. Source-only persisted remount fixtures never ship; direct persistence tests run on source/built/extracted targets. Finite budgets remain300s global/360s wrapper, with110 source/94 built/94 extracted cases observed. Keep original completed task ranges and frozen campaigns/tags/releases unchanged.

## Session leaderboard ownership

Current SPEC and spec/leaderboard.md L01–08 own page-session completed scores; main TASKS alone owns1–52. Eligible006 accepted sources/preparation/QC are historical under docs/dev/features/006_ea39055-leaderboard, with fixed7.1/7.2/phase/final reports. Recover actual task/integration/release state from HANDOFF.

C09 is pure validated ranking; C04 owns detached Snapshot.leaderboard with atomic final-score capture before observers and history-preserving Start/Restart. C05 only projects semantic rows; C06 optional fourth Session argument supports sequential retained-controller remount, while defaults and fresh pages create independent empty history. Injected controllers retain RNG/reporter; one live mount per controller. C08 still persists only six settings. No score storage, extra setting, key, backend or platform. Source-only leaderboard-view fixture never ships; actual completion/lifetime cases run on source/built/extracted.

Phase7 measured acceptance126 source/106 built/106 extracted Chromium/Firefox cases fits finite300s suite/360s wrapper. Keep dedicated managed headless browsers and opt-in local Firefox recovery; native headed focus/actual HTTPS cookie engine remain unverified. Phase7 browser package metadata1.6.0, stable ZIP/checksum asset names. Preserve original completed ranges/frozen001–005 and prior tags/releases.

## Manual file persistence ownership

Current SPEC and spec/file-persistence.md own File F01–12, distinct from modern-rule F IDs. Main TASKS alone owns1–61; campaign007 accepted sources/preparation/scoped QC are historical under docs/dev/features/007_5f955b0-file-persistence, with fixed8.1/8.2/phase/final reports. Recover actual integration/release status from HANDOFF. Prior phase measurements above are historical, not current suite limits.

C09 validates complete {id,score,timestamp} values; C04 receives explicit completion metadata callbacks and owns staged history replacement. C10 owns schema-backed JSON/shared validation. C11 file-persistence.ts is DOM-free checked restore; file-transfer.ts owns actual browser File/Worker/download resources; file-worker/sqlite-codec/sqlite-runtime own transient byte work. C08 stages checked all-six restore effects while native edits remain best effort. Six setting domains stay canonical in C07; no automatic score storage or unfinished-game save exists.

Validated1.7.0 distribution checks:457 units,18 package,2 environment,186 source/152 built/152 extracted Chromium/Firefox cases and actual native/schema/sqlite3 inspection. Finite600s suite/660s wrapper and25min CI job cover measured workload. Dedicated managed browsers and opt-in diagnosed local Firefox recovery remain; source-only fixtures never ship. Native headed focus/actual HTTPS limits remain explicit. Preserve frozen001–006, earlier original task ranges/tags/releases and stable public ZIP/checksum names.
