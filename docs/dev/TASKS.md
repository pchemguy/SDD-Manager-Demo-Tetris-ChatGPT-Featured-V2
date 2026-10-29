# Implementation tasks

This is the sole executable product-task owner. [PLAN](PLAN.md) owns delivery boundaries, [SPEC](SPEC.md) owns R-01 through R-12, and [layout](layout.md) owns physical placement. All tasks are initially unchecked; no product implementation is claimed.

## Verification command contract

T-001 establishes the following npm entry points. Until that task is verified, these are planned interfaces, not validated setup instructions: `npm ci`, `npm run typecheck`, `npm run check:boundaries`, `npm run test:unit`, `npm run build`, `npm run browsers:install`, `npm run test:environment`, `npm run test:browser`, `npm run package`, and `npm run verify:package`. Browser scripts use the same absolute dedicated cache location and local pinned Playwright. Package scripts require Python 3.11+. Browser test selection uses Playwright's project/grep options through the declared wrapper.

Each task includes meaningful tests and module/user documentation for its own change. Follow test-first behavior where applicable, record real commands/outcomes and repair failures before completion. Commit one verified task result, its evidence and its initial checkbox together; publish/read back before issue closure or later work. Required phase projection and accepted preparation integration precede implementation.

## Phase 1 — Classic browser game

- [ ] Phase 1 — Classic browser game
    - [ ] Milestone 1.1 — Playable classic loop
        - [ ] T-001 — Establish reproducible build and isolated verification tooling
            Scope: package/lockfile, compiler configurations, Vite/Playwright configuration, scripts/browser-env.mjs, boundary-check entry, CI skeleton, minimal index.html/browser bootstrap for an explicitly nonplayable toolchain smoke build, and owned ignore rules. T-005 supplies the actual game composition. Use version 1.0.0 as the planned release metadata. Pin compatible tool/browser versions from official distributions. Establish planned command interfaces; packaging entries may clearly fail until T-010 rather than produce empty artifacts.
            Depends on: verified preparation integration into main and eligible Phase 1 tracking; no product task prerequisite.
            Acceptance: repeatable dependency install, TypeScript compilation/Node test discovery and browser wrapper agree on their paths/versions. Exercise isolated Chromium headless shell/managed Firefox context-page-render-teardown cycles through the declared runner. Separate environment capability evidence from absent application acceptance. Apply bundled browser/Playwright diagnostics before dependent browser work; retain unavailable-mode limits honestly. Do not create fake game/test passes to make a skeleton green.
            Verification: `npm ci`, `npm run typecheck`, `npm run check:boundaries`, `npm run build`, `npm run browsers:install`, `npm run test:environment`; inspect pinned lockfile, ignored browser/generated paths and finite runner deadlines. Setup/check documentation records only commands actually exercised. References: R-09/R-10; C-06 tooling seams.
        - [ ] T-002 — Implement piece geometry and board transitions
            Scope: src/core/types.ts, pieces.ts, board.ts; focused unit tests and deterministic board fixtures. Implement seven definitions, no-kick rotation, legal placement, movement, atomic lock and simultaneous row compaction.
            Depends on: T-001.
            Acceptance: R-01/R-03 geometry/board portions and R-04 compaction are satisfied. Four turns recover non-O orientations, O is invariant, walls/floor/settled cells reject overlap, and zero through four simultaneous rows compact in order. Rule inputs are not mutated by rejected transitions; no DOM or random source enters the modules.
            Verification: focused `npm run test:unit` tests for pieces/board, `npm run typecheck`, `npm run check:boundaries`. References: C-01/C-02; R-01/R-03/R-04.
        - [ ] T-003 — Implement scoring level and gravity progression
            Scope: src/core/progression.ts, value types as needed, progression unit tests and module documentation.
            Depends on: T-002.
            Acceptance: score multipliers use the pre-clear level; total-line thresholds update level after the clear; soft-drop points are additive; interval reaches but does not cross the 100 ms floor. Zero-row locks add no clear award. Functions have explicit inputs without clock/UI dependencies.
            Verification: table-driven `npm run test:unit` progression cases at 0/1/2/3/4 rows, 9-to-10 and multi-threshold totals, first/high levels and soft-drop addition; typecheck/boundary checks. References: C-03; R-04/R-05.
        - [ ] T-004 — Implement deterministic session orchestration
            Scope: src/application/session.ts and session tests/fixtures. Compose rule modules with explicit randomness, lifecycle, elapsed time, snapshots and subscriptions.
            Depends on: T-002, T-003.
            Acceptance: R-02/R-03/R-05/R-06/R-08 model contracts hold. Cover independent piece draws and endpoints, blocked spawn after compaction, exact/sub-interval gravity, grounded escape and failed-attempt lock, manual-drop remainder, pause/resume/restart, residual-time discard, immutable snapshots, notification count, idempotent unsubscribe, reentrancy and throwing listener/random error containment. Bad integration inputs leave state unchanged.
            Verification: deterministic `npm run test:unit` session scenarios using exact durations and controlled random callbacks; `npm run typecheck` and `npm run check:boundaries`. Tests must distinguish ground contact from the failed downward attempt and make no browser-timing claim. References: C-04 and the collaborating C-01–C-03 contracts.
        - [ ] T-005 — Integrate a playable browser loop
            Scope: src/ui/game-view.ts/styles.css, src/platform/browser/main.ts, index.html and basic browser tests. Render the real session and provide start, board keyboard movement/rotation/soft drop and frame-driven play with score/lines/level/game-over status. Keep host and view responsibilities separate.
            Depends on: T-001, T-004.
            Acceptance: a real player can start and play the classic loop in the built app; the UI renders actual state rather than a parallel model. Active cells remain separate until lock. Minimal native controls and focusable board use the semantic session boundary. Apply the R-05 frame delta policy. Later interaction refinements do not defer basic play, scoring or game over.
            Verification: unit regression, build and basic assembled-app `npm run test:browser` on both managed targets; actual keyboard actions and board screenshot inspection. Exercise valid frame/session creation and cleanup through the runner. References: C-05/C-06; R-01–R-05 and minimal R-07/R-09/R-10/R-12.
        - [ ] T-006 — Review test and report the playable loop milestone
            Scope: whole Milestone 1.1 capability and dependencies, required blocker repairs, docs/dev/reports/phases/1/1.1.md and HANDOFF.
            Depends on: T-001 through T-005 completed, published and issues closed.
            Acceptance: perform code review independently of running tests; assess milestone exits and early gameplay demonstration. Confirm all core-loop contracts, ownership and tests; repair bugs/SPEC violations before completion. Record actual browser/tool versions and evidence limits, including environment versus application coverage. Report TODOs with None when empty and retain options/owner for any eligible non-critical deferral.
            Verification: typecheck/boundaries, unit regression, build, basic actual browser play and visual evidence. Commit review/report/HANDOFF and initial T-006 completion together; publish/read back, close its issue and only then close/read back Milestone 1.1. References: PLAN 1.1, R-01–R-05/R-08/R-09/R-10/R-12.
    - [ ] Milestone 1.2 — Usable session controls
        - [ ] T-007 — Complete browser input focus and time lifecycle
            Scope: src/platform/browser/main.ts and focused host integration tests; preserve the playable loop.
            Depends on: T-006 and verified Milestone 1.1 closure.
            Acceptance: implement complete shortcut eligibility, native repeat handling, scroll prevention, pause/resume/restart commands, focus-out/window-blur/hidden auto-pause, timestamp-baseline reset and owned frame/listener teardown. Buttons/editable elements never double-dispatch board shortcuts. Focus/visibility return requires explicit resume.
            Verification: focused browser keyboard/lifecycle tests and session regression. Exercise actual board focus/input; distinguish controlled visibility/blur handler tests from native window evidence. Check restart/resume initial delta zero and repeated mount teardown. References: C-06; R-05–R-10.
        - [ ] T-008 — Finish accessible responsive gameplay controls
            Scope: src/ui/game-view.ts/styles.css and view tests. Add complete native session buttons, visible control legend, restrained lifecycle status announcements, focus feedback and narrow-width layout.
            Depends on: T-007.
            Acceptance: all R-07 presentation/control contracts hold, including disabled status-ineligible controls, keyboard-operable buttons, board focus return and occupied-cell visibility independent of color. At 320 CSS pixels no horizontal page overflow hides controls/board. Use one shared view with no host scheduler or global-keyboard imports.
            Verification: focused browser assertions and screenshots at narrow/ordinary widths; keyboard traversal/button activation and unit regression. Inspect visible rendering rather than treating text presence as visual proof. References: C-05; R-07/R-09/R-12.
        - [ ] T-009 — Verify integrated session recovery and usability
            Scope: cross-view/host browser tests, relevant repairs/documentation, docs/dev/reports/phases/1/1.2.md and HANDOFF. This is the final delivery task with folded milestone review obligations.
            Depends on: T-007, T-008.
            Acceptance: pause preserves active state/remainder; resume has no catch-up; restart and reload reset; hidden/blurred sessions remain paused on return; native buttons do not rotate or double-dispatch. Repeated context/page and mount lifecycle leaves no duplicate event/frame work. Review the complete milestone code separately from tests; repair blockers and assess the usable controls demonstration.
            Verification: full unit suite and both-target control/recovery/browser tests, build/boundary checks, screenshot inspection. Include actual native versus modeled evidence limits, milestone report/TODOs and HANDOFF with T-009 completion; publish/read back before issue and Milestone 1.2 closure. References: PLAN 1.2; R-05–R-10/R-12.
    - [ ] Milestone 1.3 — Verified browser distribution
        - [ ] T-010 — Build and inspect the static deployment package
            Scope: scripts/package_browser.py, scripts/verify_package.py, build/package entry points, truthful initial docs/INSTALL.md and docs/CONTROLS.md required by the archive, and package-check fixtures; generated artifacts remain ignored.
            Depends on: T-009 and verified Milestone 1.2 closure.
            Acceptance: build relative static assets; produce classic-tetris-browser-v1.0.0.zip and its .zip.sha256 file under artifacts. Allowlist dist assets, LICENSE/required notices and installation/control documents. Reject unsafe paths/symlinks and exclude tokens, source tests, .agents, browser binaries/profiles, node_modules and caches. Verify checksum and extracted asset references; do not silently omit required final instructions.
            Verification: `npm run build`, `npm run package`, `npm run verify:package`; inspect ZIP members, digest and path-prefix asset routing. Negative fixtures cover secret-like entries, traversal/symlink and missing-asset rejection. The initial included instructions must be sufficient to deploy/play the current game; T-012 finalizes the complete guidance and rebuilds the archive. A verified package at this task is not a published release. References: R-09/R-11/R-12; layout delivery ownership.
        - [ ] T-011 — Verify built and extracted app acceptance in both browsers
            Scope: tests/browser, deterministic fixtures where justified, actual built/extracted static server configuration and acceptance evidence; fix discovered in-scope failures.
            Depends on: T-010.
            Acceptance: Chromium headless shell and managed Firefox exercise the assembled built app and extracted deployment path under a prefix. Cover start/play, rotation/soft drop, pause/resume/restart, controls, rendering, lifecycle and responsive layout; retain unit fixtures for exact clear/lock/time boundaries. Verify no remote asset/backend/runtime-Node dependency. Harnesses do not introduce shipped debug interfaces.
            Verification: unit regressions plus `npm run test:browser` for both projects against built/extracted targets, archive checks, screenshots and repeated isolated session cycles. Record exact binaries/modes/commands, required failures and diagnosed exclusions per policy. Synthetic fixture coverage does not substitute for actual delivery-app execution. References: R-01–R-12 acceptance interactions, especially R-10/R-11.
        - [ ] T-012 — Finalize deployer guidance and release inputs
            Scope: README, docs/INSTALL.md, docs/CONTROLS.md, docs/DEVELOPMENT.md, RELEASE-NOTES.md, validated AGENTS command navigation, final package inputs and CI completeness; docs/dev/reports/phases/1/1.3.md and HANDOFF.
            Depends on: T-010, T-011.
            Acceptance: documentation explains static deployment below a prefix, controls, planned-rule behavior, Node/npm/Python developer prerequisites and absence of player runtime dependencies. Notes match delivered version 1.0.0, tests/limits and deployable artifacts. Rebuild/inspect the archive after final instructions are present and rerun affected extracted-app checks. Do not publish a release/tag yet.
            Verification: follow documented commands from a clean dependency/build path, check links/included instructions, package digest/contents, full feasible browser acceptance and applicable regressions. Perform whole Milestone 1.3 code review and repairs, include report/TODOs/HANDOFF with T-012 completion, publish/read back and close issue before milestone closure. References: PLAN 1.3; R-09–R-12. Final delivery task owns folded review/report obligations.
    - [ ] Milestone 1.4 — Phase review
        - [ ] T-013 — Review test and report Phase 1
            Scope: whole phase cross-component code review, feasible acceptance/regressions, blocker repairs, docs/dev/reports/phases/1/PHASE-REPORT.md, docs/dev/reports/IMPLEMENTATION-REPORT.md and HANDOFF.
            Depends on: all tasks T-001 through T-012 complete/published; delivery Milestones 1.1, 1.2 and 1.3 and their issues closed/read back. Its own review milestone remains open until this task completes.
            Acceptance: verify all R-01 through R-12 and phase exits, dependency direction, actual final archive/source/version/notes agreement and complete per-task persistence evidence. Code review is distinct from tests. Aggregate milestone and phase TODOs with disposition/options/provenance; no unresolved contract violation or missing feasible check may be marked passed. Report unavailable native/full-browser behavior explicitly. Final report distinguishes implementation, verification, integration and release states.
            Verification: clean install/typecheck/boundaries/unit/build/package/verify-package and complete feasible two-browser acceptance against final assets; inspect screenshots, archive/digest and task persistence. Commit phase/final reports, HANDOFF and task status together; publish/read back, close task and review milestone. Complete phase parent claims only with their actual exit evidence. No extra tasks beyond the authorized range are implied.

## Post-phase integration and release

After the full phase is complete and reviewed, the coordinator audits persistence and explicitly integrates the verified phase into its recorded parent main. Verify merged state and publish/read back main; rebuild and verify release assets as needed. Then the release owner publishes v1.0.0 with the finalized release notes, static browser ZIP, checksum and installation instructions, verifying tag and hosted asset readback. This separately authorized post-integration operation is not part of an earlier task's completion claim. Preserve deployment artifacts and report actual release outcome; no Electron or store artifact is implied.
