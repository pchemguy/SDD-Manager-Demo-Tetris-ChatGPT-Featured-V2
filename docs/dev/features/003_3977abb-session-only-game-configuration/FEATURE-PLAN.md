# Session-only configuration delivery plan

Historical accepted campaign snapshot. Non-executable; current product authority is [SPEC](../../SPEC.md), [configuration](../../spec/session-configuration.md) and sole task owner [TASKS](../../TASKS.md). Recorded source identities/reviews are historical.

## Strategy and scope

Deliver [FEATURE](FEATURE.md)/[FEATURE-SPEC](FEATURE-SPEC.md) S-01–S-08 as browser1.3.0. Preserve completed Phases1–3 and existing tasks. One bounded Phase4 implements the single configuration capability: reusable selected context and active policies, native next-game application, then complete display/unified panel and verified delivery. Core rules and UI cannot be released independently as the requested feature; milestones expose useful integrated checkpoints without premature releases.

## Phase 4 — Session-only game configuration

| Milestone | Working result/dependency | Required exits |
| --- | --- | --- |
| 4.1 — Session-configured gameplay | From accepted/QC/published preparation and eligible tracking, establish typed memory configuration, immutable active rules/legacy compatibility, both general policies and hard-drop/hold gating; integrate native next-game controls/current-versus-pending state with real gameplay. Existing display behavior remains usable. | Pure configuration validation/isolation,16-rule matrix and exact clock/drop/hold/error tests; actual default/failed-downward/immediate/disabled gameplay, pending-to-active restart behavior and native focus. Whole-milestone independent code review, repairs, demonstration and report/HANDOFF in the final delivery task. |
| 4.2 — Complete settings and browser distribution | After4.1 closure, complete live three-mode ghost and optional next preview in the unified six-control panel; verify full page-context retention/reload/teardown and finalize1.3.0 static distribution. | Six display combinations and retained canonical queue/landing, all six native controls and current/pending distinction, same-context remount/new-page defaults, no storage,320px/focus screenshots, full model/browser/package regression and source/built/extracted acceptance. Reproducible archive/strict exclusions/checksums, exact user docs/release inputs, independent whole-milestone review/repairs/report/HANDOFF in the final delivery task. |
| 4.3 — Phase review | After both delivery milestones close, assess complete S-01–S-08 and preserved default/legacy contracts. | Exactly one dedicated phase code-review/testing/report task, independent from tests; accepted current-document incorporation/QC, unique task transfer and eligible current-campaign archive, persistence audit, phase/final reports and TODO aggregation. |

There are2 delivery milestones (phase review excluded). Explicit small-group assessment retains them because configuration/rule correctness and full presentation/lifetime/distribution contain different integration risks with demonstrable user outcomes. Splitting six controls into separate milestones would fragment one panel; a third packaging-only milestone adds no independent behavior. No padding or unrelated future feature belongs in the phase.

The first demonstration lets a player configure next-game rule behavior and verify active-game stability. The second demonstrates complete live displays and page lifetime. Feedback can support an explicit amendment; no routine approval pause is added to an authorized range. Prerequisite configuration tasks are enabling work, not a claim of a finished settings UI.

## Verification, integration and release

Use deterministic settings/model fixtures for96 selected values/16 active rules, invalid inputs, exact time and rollback; actual browser play for control focus, copied-rule changes, disabled inputs and display/lifetime. Keep source-only fixtures separate from shipped source/built/extracted behavior. Preserve managed-browser/provisioning policy, process-local diagnosed recovery and native headed-focus limits; Electron remains outside scope.

Execute on persistent feature/003_3977abb-session-only-game-configuration from its verified published preparation-containing main parent. Milestone exits require publication/issue closure before dependent work. Before final phase review closes, incorporate delivered scope into affected canonical owners, reassess adjacent current QC, transfer tasks once and archive eligible current sources/reports under the reserved campaign prefix. Preserve prior closed campaigns and completed task evidence.

Explicitly two-parent merge the exact complete verified phase into its recorded main parent; verify merged regressions/source/artifact identity and publish/read back. Only then create the actual default-branch1.3.0 release commit/tag with exact finalized notes and ZIP/checksum; verify provider source/body/latest/inventory/public download bytes and CI. Record actual outcomes in a task-owned parent-only follow-up without moving the tag. Preparation does not execute those operations.

## Physical ownership

The existing [layout](../../layout.md) remains the baseline. The following map extends the existing owners; no FEATURE-LAYOUT root is required.


| Path | Owner/change |
| --- | --- |
| src/application/configuration.ts (new) | C-07 types/defaults, detached memory factory/update validation and pure RuleOptions projection; no DOM/RNG/storage. |
| src/application/session.ts | C-04 complete/legacy input normalization, copied active rules, both locking policies and command gating. |
| src/ui/ghost-visibility.ts | Pure three-mode predicate; shared mode type re-export, canonical geometry unchanged. |
| src/ui/game-view.ts, src/ui/styles.css | Unified native panel, selected-context binding/refresh, active/pending summary, live concealed displays and owned cleanup. |
| src/platform/browser/main.ts | Page context creation/passing and Start/Restart rule projection; retain key/frame/focus/disposal ownership. |
| tests/unit/configuration.test.ts (new), session.test.ts, ghost-visibility.test.ts, tsconfig.test.json | Pure defaults/patch/rule matrix/legacy/timing/disabled/visibility fixtures and DOM-free compilation. |
| tests/browser/configuration.spec.ts (new), ghost/lifecycle/remount/view/deployment suites | Actual controls, selected/active changes, both policies/off actions, displays, native focus/page lifetime and regression. |
| tests/fixtures/configuration.html and supporting source-only module if needed | Real shared components with explicit contexts/boundary states; excluded from production and built/extracted-only selection. No production injection API. |
| README.md, docs/CONTROLS.md, docs/DEVELOPMENT.md, docs/INSTALL.md | Six defaults/labels, immediate versus next-game rules, policy semantics/disabled behavior, no-persistence and install/check guidance. |
| package.json, package-lock.json, version-sensitive tests |1.3.0 identity using existing toolchain/manifest/allowlist. |
| docs/dev/FEATURE-TASKS.md | Sole executable feature delta until eligible reconciliation into main TASKS. |
| docs/dev/features/003_3977abb-session-only-game-configuration/reports/phases/4/ |4.1.md,4.2.md,PHASE-REPORT.md; feature-root IMPLEMENTATION-REPORT.md final outcome. |
| docs/dev/features/003_3977abb-session-only-game-configuration/ | Eligible current source/preparation/adjacent-QC historical archive; earlier campaigns unchanged. |

Versioned local ZIP/checksum use classic-tetris-browser-v1.3.0 names under artifacts; stable release copies remain classic-tetris-browser.zip and matching checksum. Retain ignored exact RELEASE-NOTES/highlights policy, static relative assets, credential/development/browser/fixture exclusions and dependency direction. No storage adapter, backend or generic settings framework is allocated.
