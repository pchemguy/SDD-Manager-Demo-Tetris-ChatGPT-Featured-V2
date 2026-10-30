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

Session-only configuration contracts are incorporated into docs/dev/SPEC.md and spec/session-configuration.md with current modern/ghost children. Main TASKS alone owns T-001–T-032; campaign003 accepted sources/preparation/adjacent QC are historical under docs/dev/features/003_3977abb-session-only-game-configuration, with Phase4 milestone/phase/final reports. C-07 owns detached page memory; C-04 active rules; C-05 controlled six-setting panel; C-06 browser resources/projection. Recover actual integration/release state from HANDOFF.
