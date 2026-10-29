# Delivery plan

## Strategy and version coverage

Deliver the initial classic browser phase, modern extensions and conditional ghost visibility phases below. Phase 1 records the v1.0.0 delivery baseline. This is the simplest useful product in the accepted scope: a playable falling-block loop with score/levels, session controls and a deployable static package. Additional platforms remain outside all browser phases. Splitting rules, UI and packaging into separately released phases would release incomplete slices of this small product rather than useful application increments.

The initial completed browser release is version 1.0.0. The initial build metadata and deployment archive used that version. Current browser metadata/archive use v1.2.0; publication requires the phase review, integration and release checks below. Subsequent delivered changes use semantic version increments appropriate to their compatibility and scope. No release is published merely because a milestone is complete.

## Phase 1 — Classic browser game

Historical v1.0.0 scope: initial R-01 through R-12. Phase 2 below owns modern default changes; completed Phase 1 evidence remains unchanged. The outcome is a player-usable, keyboard-operable browser game distributed as static assets. The starting baseline contains project guidance and development documents, not an existing game.

Three delivery milestones establish and refine the integrated game, followed by one dedicated phase review milestone. Core/session code is exercised without a browser before UI integration. Browser provisioning evidence is established proactively and remains distinct from application compatibility evidence.

### Milestone 1.1 — Playable classic loop

Establish pinned TypeScript/build/test tooling and the isolated browser execution path. Implement piece/board rules, progression and deterministic session orchestration; integrate a minimal shared board/status view and browser host so a player can start, move, rotate, soft-drop, clear rows and reach game over. This is the earliest integrated gameplay demonstration, not a mocked skeleton.

Dependencies: accepted, reviewed and published preparation baseline plus eligible implementation-phase tracking. No later milestone supplies missing core-loop behavior.

Exit evidence: geometry/collision/lock/clear/score/spawn boundary tests; deterministic time/error/session tests; built app starts and supports basic actual keyboard play in the managed browser targets. Demonstrate that grounded movement remains possible before a failed downward attempt. Inspect the minimal board render. Whole-capability review and milestone report record findings and repairs before closure.

Decision evidence: the playable loop lets the human assess whether basic rules and handling match the agreed baseline, and choose continuation or an explicitly requested amendment. Authorized execution does not add a new approval pause automatically.

### Milestone 1.2 — Usable session controls

Integrate the complete keyboard/button eligibility, auto-pause and teardown behavior with the existing loop. Finish accessible status, visible control guidance, responsive layout and focus handling. Preserve the working gameplay baseline; do not add rules or persistent settings.

Dependencies: milestone 1.1 completed and closed. Session primitives already exist; this milestone completes host/view interaction and verifies their composed lifecycle.

Exit evidence: pause/resume timing, focus loss/hidden handling, restart/reload and repeated mount/context checks; native buttons do not double-dispatch shortcuts; screenshots and DOM checks at ordinary and 320 CSS-pixel widths; applicable regression suite. Whole-capability code review, blocker repairs, milestone report and HANDOFF update are assigned to the final delivery task unless TASKS establishes the lifecycle threshold for a standalone review.

Decision evidence: demonstrate complete controls and narrow-screen usability. Findings can inform a human-directed continue/amend/simplify/stop choice without silently expanding scope.

### Milestone 1.3 — Verified browser distribution

Produce the versioned static deployment archive and checksums, complete the two-browser acceptance run against built assets, and finalize installation/gameplay/development instructions and release notes. Verify a served path prefix and archive exclusions. Runtime remains independent of Node.js and remote services.

Dependencies: milestone 1.2 completed and closed. Packaging uses the already integrated application rather than a separate UI copy. Rebuild the final archive after documentation and release inputs are finalized.

Exit evidence: clean dependency/build path, extracted archive served by a static HTTP server under a prefix, asset integrity and exclusion checks, Chromium/Firefox gameplay and visual evidence, documented commands and remaining limits. The final delivery task owns the milestone review/report/HANDOFF when no standalone review task is required. Release preparation is complete, but hosted release publication waits for the phase's verified default-branch integration.

### Milestone 1.4 — Phase review

Exactly one phase code review/testing/report task follows all three delivery milestones. Review cross-component interactions, R-01 through R-12 coverage, dependency boundaries, final deployment contents and all milestone findings. Run feasible required checks and repair blockers. Include the phase report, HANDOFF and final implementation report with unresolved/deferred TODO aggregation. This special review milestone is separate from the delivery-milestone count.

Exit evidence: all delivery milestones and their issues are complete/closed; the phase's single review task and review milestone are verified, published and closed; full phase acceptance and persistence audit pass. Preserve a clean, fully inspectable phase result for explicit integration into main.

## Verification and environment

Use Node's test runner for deterministic compiled TypeScript unit tests and Playwright for assembled-browser checks. Pin development dependencies and a lockfile during tooling implementation; select compatible current versions using their official distribution information. Node.js/npm are build tools, not browser runtime requirements.

Follow the root browser policy and bundled Playwright recovery guidance. Use a dedicated absolute browser path and managed matching Chromium headless shell/Firefox revisions. Record provisioning, representative sessions and rendering separately from app acceptance. A diagnosed unavailable full/headed mode is excluded and reported under policy; failed feasible headless acceptance remains blocking. Native Windows Electron, signed installer and store checks are outside the delivered platform.

Select targeted checks within tasks, then complete meaningful regressions at milestone/phase exits. Preserve evidence of actual commands, versions, modes, failures, repairs and limits. Passing tests alone does not replace code review. No test, build, screenshot or compatibility pass is implied by this plan.

## Integration and release

After package QC is separately authorized, integrate the accepted documentation baseline into main and publish it before implementation branching. Execute Phase 1 on its recorded phase branch, with one verified task per commit and publication before each later task. Main-phase partial ranges remain unmerged.

After complete phase review, audit persistence and integrate the verified full phase into its recorded parent main with an explicit two-parent merge. Verify merged behavior, rebuild/inspect final release artifacts and publish/read back main. Only then create/publish the v1.0.0 tag and GitHub release with exact finalized notes, static deployment ZIP, SHA-256 checksum and installation instructions. Report unavailable checks distinctly. Release publication is a post-integration operation, not premature work inside a delivery milestone.

## Coverage and risks

| Contracts | Delivery route | Principal risk / exit control |
| --- | --- | --- |
| R-01–R-05 | 1.1, retained regressions in 1.2/1.3/1.4 | Grounding versus failed-attempt locking; exact clock, spawn and score boundaries. |
| R-06/R-08 | Session primitives in 1.1, integrated controls/lifecycle in 1.2 | Paused time, observer failures, duplicate listeners and partial state mutation. |
| R-07 | Minimal view/keyboard in 1.1, complete focus/accessibility/responsiveness in 1.2 | Native button/shortcut interaction and narrow layouts. |
| R-09 | Boundaries in 1.1, dependency review at each exit | Browser globals leaking into reusable core/session or duplication of UI. |
| R-10 | Provisioning and basic assembled checks in 1.1; full interactions in 1.2/1.3 | Download/runtime restrictions; bounded official recovery and accurate evidence limits. |
| R-11/R-12 | Packaging/acceptance in 1.3; complete review and release integration after 1.4 | Missing local assets, path-prefix failures, secret/development-file leakage, premature release claims. |

Physical ownership belongs to [layout](layout.md). Executable work, dependencies and progress belong to TASKS; this plan defines the delivery boundaries rather than a file-edit sequence.

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

## Phase 3 — Conditional ghost visibility

One delivery milestone plus one dedicated phase review milestone fits the cohesive scope. Separating predicate, selector and description into independently released milestones would expose incomplete presentation; a separate distribution milestone adds a handoff without an independent capability. Keep implementation integrated early, then finish delivery evidence. No padding to reach3–5 milestones. Additional modes, thresholds and platforms remain excluded.

| Milestone | Outcome and dependencies | Required exit evidence |
| --- | --- | --- |
| 3.1 — Conditional ghost and browser distribution | After accepted/QC/published preparation and eligible tracking, integrate the pure UI predicate, native selector, immediate state/description rendering and preference lifetime into the existing app; then finalize v1.2.0 docs/static delivery. | Independently calculated all-shape/orientation midline tests; both crossing directions, actual high-stack gameplay, paused edits, native focus/repeat/shortcut exclusion, restart/reload/remount and320px screenshots; unchanged canonical hard drop/timing/model regressions. Full source/built/extracted managed Chromium/Firefox acceptance, clean build/package/exclusion/integrity/reproducibility checks. Whole-milestone independent code review, repairs, demonstration and milestone report/HANDOFF belong to the final delivery task. |
| 3.2 — Phase review | After3.1 delivery tasks and hosted milestone close, assess complete G-01–G-05 and retained guarantees. | Exactly one dedicated code-review/testing/report task, independent inspection separate from test execution; appropriate fresh regression, accepted main-document incorporation/current QC, unique task ownership and eligible current-campaign archive; task-closing audit, phase/final reports and TODO aggregation before integration. |

The first implementation checkpoint is working conditional visibility in the real game, including selector and accessible description. It allows assessment of the chosen landing-edge boundary and retained Always default; feedback can inform explicit amendment without adding routine approval pauses to authorized execution. Distribution completes evidence for that same app, not a separate copy.

## Verification and integration

Use pure fixtures for the exact predicate, shared-view snapshots for boundary rendering and actual gameplay for shipped-browser crossings. Ensure both hidden and restored states are exercised in built/extracted apps. Preserve source-fixture exclusion and all existing model/lifecycle/packaging regressions. Browser resource policy and local diagnosed recovery remain unchanged; native headed focus is reported separately and Electron is outside delivery.

Keep the persistent feature/002_0adba6e-conditional-ghost-visibility branch created from its published preparation-containing main parent. At complete phase closure, incorporate the delivered accepted delta into current product owners, reassess affected document QC, transfer tasks once and archive eligible active campaign sources/adjacent QC under the recorded feature prefix. Preserve prior closed records. Reports stay under that prefix. Close verified task issues/milestones only after owning publication/readback.

Integrate the exact complete phase to its recorded main parent by explicit two-parent merge; run merged checks, rebuild/compare the final package and publish/read back main. Only then create the default-branch v1.2.0 release commit/tag with exact finalized notes. Publish/reconcile ZIP/checksum assets, read back source/body/latest/inventory and public download bytes. Record actual release outcomes in a task-owned parent-only evidence follow-up without moving the release tag. No implementation or release is claimed by this plan.
