# Delivery plan

## Strategy and version coverage

Deliver one bounded phase: the classic browser game specified in [SPEC](SPEC.md). This is the simplest useful product in the accepted scope: a playable falling-block loop with score/levels, session controls and a deployable static package. No independent modern enhancement or additional platform belongs to this phase. Splitting rules, UI and packaging into separately released phases would release incomplete slices of this small product rather than useful application increments.

The initial completed browser release is version 1.0.0. Build metadata and the deployment archive use that version; publishing the version remains contingent on phase review, integration and release checks. Subsequent delivered changes use semantic version increments appropriate to their compatibility and scope. No release is published merely because a milestone is complete.

## Phase 1 — Classic browser game

Included scope: R-01 through R-12, preserving all exclusions in PROJECT. The outcome is a player-usable, keyboard-operable browser game distributed as static assets. The starting baseline contains project guidance and development documents, not an existing game.

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
