# Modern rules delivery plan

Historical accepted campaign snapshot. Non-executable; current product authority is [SPEC](../../SPEC.md) and task ownership is [TASKS](../../TASKS.md). Original reviews/checkoffs describe their recorded source identities.

## Objective and strategy

Deliver the approved [FEATURE](FEATURE.md) as browser v1.1.0 under [FEATURE-SPEC](FEATURE-SPEC.md). Preserve the completed main Phase 1 and use project-wide Phase 2 for this bounded feature. Keep the feature implementation on its persistent campaign branch, returning complete verified scope to its recorded parent main. Detailed executable units belong to FEATURE-TASKS; no implementation is claimed here.

One phase is appropriate because next/hold/bag share piece identity and transaction state, ghost/hard drop share landing, and all new actions must obey one landing-delay policy. Three capability milestones expose working increments and contain the change to the current game/session/view, rather than postponing basic integration to final packaging. Independent future scoring/control/platform features remain excluded. Shipping a second selectable classic engine is not part of this strategy.

## Phase 2 — Modern browser rules

Prerequisite: accepted complete feature preparation, whole-package QC, verified/published preparation integration and selected phase tracking. The baseline is the already playable browser game. The phase's final outcome includes all F-01–F-08, current documentation, verified static distribution and release readiness.

| Milestone | Working outcome and dependency | Required exit evidence |
| --- | --- | --- |
| 2.1 — Grounding and modern rotation | Pure kick/landing primitives and independent landing countdown integrated through actual browser rotation controls. Begins from the existing game. | All kick transitions/order/rejections, exact grounding/deadline/reset/pause semantics, unchanged clear/scoring/lifecycle behavior, actual both-direction rotation and timed-lock demonstration in both browsers. Review the whole milestone independently from its tests; repair blockers, write milestone report/HANDOFF. |
| 2.2 — Piece flow and planning aids | After 2.1 closure, integrate seven-bag, exactly one next preview, hold and ghost. | Bag order/refill/error atomicity, hold eligibility/consumption/top-out, actual matching miniatures/ghost and accessible 320px layout; prove ghost landing and continuous-support timing agree. Whole-milestone review, required repairs and report/HANDOFF. |
| 2.3 — Hard drop and browser distribution | After 2.2 closure, integrate hard-drop scoring/locking, next-game option and complete controls; finalize v1.1.0 static delivery. | Positive/zero-distance drops under both options, setting eligibility/restart/reload, no repeat/double-dispatch, full model/browser/package regression, user docs, reproducible ZIP/checksum, built and extracted-prefix acceptance in Chromium/Firefox. Whole-milestone review, repairs and report/HANDOFF. |
| 2.4 — Phase review | After all delivery milestones complete and selected hosted closures, assess the entire delivered feature. | Separate full-phase code review and verification; accepted main-document/task incorporation and eligible feature-source archive, reassessed affected main-doc QC, final feature report/TODO aggregation, task persistence audit and integration readiness. Exactly one phase review task. |

There are three delivery milestones plus the excluded mandatory review milestone. Each produces a usable/coherent checkpoint and reduces a distinct risk: timing/geometry, piece identity/presentation, then options/input/distribution. Demonstrations inform whether to continue unchanged or request a scoped amendment; they do not add routine approval gates to an authorized implementation range.

## Integration, verification and release gates

Each delivery task includes its own test-first checks and affected documentation. Assigned final milestone tasks include whole-milestone code review, testing, required repairs, report/TODOs and HANDOFF unless the later task count requires a separate review unit. The phase review is always explicit. Unit fixtures establish exact rules/time/errors; real assembled browser tests establish input/render/lifecycle and screenshots. Source-only state fixtures never ship. Tests cannot replace independent code review.

Complete the phase's accepted-document incorporation before its closing review task. Reconcile unique feature task ownership without copying an independently checked list; preserve completed Phase 1 evidence and frozen history. Archive only sources whose active dependencies are finished, under the reserved feature directory, with repaired active links and historical markers. Keep reports within that feature prefix.

Only after all exits and selected issue/milestone closures, merge the exact campaign source explicitly into main, verify merged regressions and push/read back. Prepare the default-branch release commit and v1.1.0 tag from that verified integrated source. Publish a draft with the stable browser ZIP/checksum names, validate inventory/digests, then publish/read back notes/source/latest/download bytes. Retain exact release body and source association; no CI duplicate publisher or tag movement.

## Risks and evidence limits

The principal risks are deadline event ordering, coordinate-sign mistakes, refill rollback, hold/preview mismatches and browser-focus reentry. Give them explicit model fixtures and assembled browser checks at their owning milestone. Update deterministic tests that encode superseded classic behavior without weakening unaffected assertions. Keep runtime/console-error guards through teardown.

Use the repository's isolated managed browsers and documented environment diagnostics. Restricted-host Firefox recovery is opt-in only when diagnosed. Native headed OS-window focus and Windows/Electron execution remain explicitly unverified/excluded rather than blocking browser artifacts. Packaging must reject unsafe paths/secrets and maintain relative prefix-hosted assets. No outstanding product decision blocks this plan.

## Physical ownership delta

Retain [layout](../../layout.md)'s dependency, tooling, browser-isolation, generated/secret and package-allowlist rules. The following allocation extends its existing owners; new paths are planned, not existing implementations. No FEATURE-LAYOUT document or duplicate main task list is created.

| Path | Logical owner / intended change |
| --- | --- |
| src/core/types.ts, src/core/pieces.ts | C-01 value/rotation direction and both-direction transforms; retain matrix/spawn definitions. |
| src/core/kicks.ts (new) | C-02 explicit ordered kick tables and `tryRotate`; imports board placement and geometry only. |
| src/core/board.ts | C-02 canonical `landing`; retain placement/lock/clear ownership. |
| src/core/bag.ts (new) | Pure six-draw `shuffleBag(random)` transformation; no persistent bag singleton. |
| src/core/progression.ts | C-03 unchanged clear/level/speed formulas; any shared score helper stays here. |
| src/application/session.ts | C-04 transaction-owned bag/hold/next/options/timers, extended actions/snapshots and ghost derivation. |
| src/ui/game-view.ts, src/ui/styles.css | C-05 next/hold miniatures, ghost, semantic controls and next-session checkbox; injected mount/callbacks only. |
| src/platform/browser/main.ts | C-06 new keyboard map and pending-options composition; retain owned frame/focus/disposal resources. |
| tests/unit/kicks.test.ts, bag.test.ts (new); board.test.ts, session.test.ts | Pure fixtures, exact clocks, sequence/hold/drop/options/errors. Files under tests/unit; shared fixtures remain tests/fixtures. |
| tests/browser/modern-rules.spec.ts (new), existing game/lifecycle/recovery/view/remount/deployment suites | Real actions/render/options and full source/built/extracted regression. A source-only modern fixture may be added under tests/fixtures and excluded from shipped assets and built/extracted selection. |
| docs/CONTROLS.md, README.md, docs/DEVELOPMENT.md, docs/INSTALL.md | Updated supported modern rules, controls, options and truthful verification/install guidance. |
| package.json, package-lock.json; scripts/package_browser.py, verify_package.py and package fixtures | v1.1.0 identity and dynamic version-sensitive assertions; preserve strict archive contents/checksums/extraction. No needless tooling replacement. |
| docs/dev/FEATURE-TASKS.md | Sole executable feature task owner until incorporation; main TASKS keeps completed Phase 1. |
| docs/dev/features/001_0882e5d-modern-rule-extensions/reports/phases/2/ | Planned 2.1.md, 2.2.md, 2.3.md and PHASE-REPORT.md implementation evidence. Feature-root IMPLEMENTATION-REPORT.md aggregates final outcomes/TODOs. |
| docs/dev/features/001_0882e5d-modern-rule-extensions/ | Eligible incorporated feature sources and adjacent QC archive; active authorities stay in docs/dev until eligible incorporation. |

Build artifacts remain ignored under artifacts with versioned local v1.1.0 names and stable release ZIP/checksum names. Release notes/highlights use existing retention/ignore rules. Do not include development authorities, fixtures, browsers, credentials or node_modules in the archive. Production imports never reference tests; bag/kicks modules remain DOM-free and covered by boundary/type checks.
