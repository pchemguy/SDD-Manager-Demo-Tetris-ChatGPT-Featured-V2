# Delivery plan

## Strategy and version coverage

Deliver the initial classic browser phase, modern extensions, conditional ghost visibility and configuration, penetrator, browser persistence and session leaderboard phases below. Phase 1 records the v1.0.0 delivery baseline. This is the simplest useful product in the accepted scope: a playable falling-block loop with score/levels, session controls and a deployable static package. Additional platforms remain outside all browser phases. Splitting rules, UI and packaging into separately released phases would release incomplete slices of this small product rather than useful application increments.

The initial completed browser release is version 1.0.0. The initial build metadata and deployment archive used that version. Current browser metadata/archive use v1.6.0; publication requires the phase review, integration and release checks below. Subsequent delivered changes use semantic version increments appropriate to their compatibility and scope. No release is published merely because a milestone is complete.

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

One delivery milestone plus one dedicated phase review milestone fits the cohesive scope. Separating predicate, selector and description into independently released milestones would expose incomplete presentation; a separate distribution milestone adds a handoff without an independent capability. Keep implementation integrated early, then finish delivery evidence. No padding to reach3–5 milestones. Additional modes, thresholds and platforms are excluded from Phase3; Phase4 adds the approved third display mode without changing the threshold.

| Milestone | Outcome and dependencies | Required exit evidence |
| --- | --- | --- |
| 3.1 — Conditional ghost and browser distribution | After accepted/QC/published preparation and eligible tracking, integrate the pure UI predicate, native selector, immediate state/description rendering and preference lifetime into the existing app; then finalize v1.2.0 docs/static delivery. | Independently calculated all-shape/orientation midline tests; both crossing directions, actual high-stack gameplay, paused edits, native focus/repeat/shortcut exclusion, restart/reload/remount and320px screenshots; unchanged canonical hard drop/timing/model regressions. Full source/built/extracted managed Chromium/Firefox acceptance, clean build/package/exclusion/integrity/reproducibility checks. Whole-milestone independent code review, repairs, demonstration and milestone report/HANDOFF belong to the final delivery task. |
| 3.2 — Phase review | After3.1 delivery tasks and hosted milestone close, assess complete G-01–G-05 and retained guarantees. | Exactly one dedicated code-review/testing/report task, independent inspection separate from test execution; appropriate fresh regression, accepted main-document incorporation/current QC, unique task ownership and eligible current-campaign archive; task-closing audit, phase/final reports and TODO aggregation before integration. |

The first implementation checkpoint is working conditional visibility in the real game, including selector and accessible description. It allows assessment of the chosen landing-edge boundary and retained Always default; feedback can inform explicit amendment without adding routine approval pauses to authorized execution. Distribution completes evidence for that same app, not a separate copy.

## Verification and integration

Use pure fixtures for the exact predicate, shared-view snapshots for boundary rendering and actual gameplay for shipped-browser crossings. Ensure both hidden and restored states are exercised in built/extracted apps. Preserve source-fixture exclusion and all existing model/lifecycle/packaging regressions. Browser resource policy and local diagnosed recovery remain unchanged; native headed focus is reported separately and Electron is outside delivery.

Keep the persistent feature/002_0adba6e-conditional-ghost-visibility branch created from its published preparation-containing main parent. At complete phase closure, incorporate the delivered accepted delta into current product owners, reassess affected document QC, transfer tasks once and archive eligible active campaign sources/adjacent QC under the recorded feature prefix. Preserve prior closed records. Reports stay under that prefix. Close verified task issues/milestones only after owning publication/readback.

Integrate the exact complete phase to its recorded main parent by explicit two-parent merge; run merged checks, rebuild/compare the final package and publish/read back main. Only then create the default-branch v1.2.0 release commit/tag with exact finalized notes. Publish/reconcile ZIP/checksum assets, read back source/body/latest/inventory and public download bytes. Record actual release outcomes in a task-owned parent-only evidence follow-up without moving the release tag. No implementation or release is claimed by this plan.

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

## Phase 5 — Penetrator mode

| Milestone | Working outcome and dependency | Required exit evidence |
| --- | --- | --- |
| 5.1 — Playable earned penetrator loop | From accepted/QC/published preparation and eligible tracking, establish pure deepest-pocket traversal/kicks and coupled white compaction, game inventory/awards, active mode with both clock/drop policies, and real B activation with basic white board/ghost/bonus display. | Independent geometry and mixed-mask compaction fixtures, actual model four-line reward/spend/cap, guarded overlapping transit/valid lock, Hold inhibition, timer/disabled/drop/rollback/legacy regression; native source-browser earned activation and matching ghost/drop/basic white/indicator demonstration in both managed browsers. Whole-milestone independent code review, separate tests, blocker repairs and report/HANDOFF. |
| 5.2 — Complete presentation and browser distribution | After5.1 closure, complete accessible mode/bonus/Hold explanations, stale appearance clearing and full settings/focus/lifetime/presentation matrix; finalize v1.4.0 static package and accurate guides. | Source-only boundary fixtures plus actual earned-bonus gameplay cover visible/hidden ghost, disabled actions, both policies, white/normal/transit/row-clear state and indicator updates; native keyboard/repeat/teardown,320px/ordinary screenshots and full source/built/extracted-prefix Chromium/Firefox acceptance. Clean pinned install/type/boundary/unit/package/build, strict manifest/exclusion/checksum and byte-reproducibility evidence. Independent whole-milestone code review, repairs, demonstration/report/HANDOFF. |
| 5.3 — Phase review | After both delivery milestones and their issues close, review the complete feature and preserved contracts. | Exactly one dedicated phase code-review/testing/report task, separate from tests; fresh appropriate regression with source/artifact identity, current-document incorporation/QC, unique task transfer and eligible004 source/archive disposition, actual closing-diff audit, phase/final report and TODO aggregation. |

Two delivery milestones (phase review excluded) fit the real risk boundaries: one coherent playable bonus/movement/lock loop, then completed accessible interaction/lifetime and portable distribution. Splitting predicate, bonus counter, white cells and keys into separately released milestones would expose unusable fragments. A third packaging-only milestone adds no independent capability. This explicit small-group assessment retains two without padding.

The first demonstration lets a player earn a four-line bonus, activate with B and pass the current shape through a stack to the matching ghost landing. The second demonstrates complete native/settings/appearance/lifetime behavior and extracted installation. Feedback may support an explicit amendment; an authorized execution range has no added routine approval pause.

## Dependencies, verification and risks

Core placement/rotation and shared compaction precede session state changes; inventory/appearance precede active-mode traversal and timing; semantic model behavior precedes host/view input. Presentation completion depends on the playable integrated loop, and final packaging follows finalized shipped instructions. Keep independently computed geometry/time expectations, earned-bonus model traces and actual native browser acceptance distinct. Fixtures never replace shipped-app tests or become a production bonus/board setter.

Principal risks are sealed overlapping poses with no legal lock, divergent ghost/drop searches, mode-sensitive grounding and supported-delay resets, mask/board row drift, award/spend/refill rollback, stale white rendering and native key double-dispatch. Address each at its owning boundary and retain all ordinary gameplay/configuration regressions. Actual game traces must earn bonuses; do not add debug starts or shortcuts. Both general policies and all6 display choices receive representative penetrating integration coverage alongside exact model tests.

Use the existing dedicated managed Chromium/Firefox environment and documented provisioning/recovery, with current runner/binaries verified before browser-dependent work. Native headed OS focus unavailable on the host is an explicit evidence limit; Electron is excluded. Source-only fixtures remain excluded from built/extracted suites and packages. Physical ownership is assessed against [layout](layout.md) before task derivation.

Every delivery milestone has independent whole-boundary code review and test/report exits. The task list assigns a standalone review when the milestone has at least four implementation tasks and the phase has two delivery milestones; otherwise its final implementation task owns review/report/HANDOFF. The phase review always remains its own single final task. Reports stay under docs/dev/features/004_1cadd99-penetrator-mode/reports/phases/5/, with feature-root IMPLEMENTATION-REPORT.md for the final outcome.

## Phase 6 — URL GET and cookie persistence

| Milestone | Working outcome and dependency | Required exit evidence |
| --- | --- | --- |
| 6.1 — Restored and synchronized browser settings | After accepted, whole-package-QC-verified and published preparation plus eligible hosted phase activation, establish canonical format/precedence handling, fault-contained persisted configuration and actual browser-entry composition. All six native controls restore independently and save their edits to cookies/current URL. | Pure domain/format/resolution tests; injected source/write/atomic/no-op tests; actual six-control URL/cookie/default, explicit-default and omitted-parameter cases; native edit/reload demonstration with unchanged selected/active timing in managed Chromium and Firefox. Independent whole-milestone code review, separate tests/repairs, milestone report and HANDOFF belong to its final implementation task. |
| 6.2 — Persistence lifetime and browser distribution | After6.1 closes, complete actual reload/reopen/two-page/context and prefix-hosting/failure coverage, retained gameplay/focus regression and accurate v1.5.0 distribution/docs. | Actual source/built/extracted-prefix persistence acceptance in both browsers; supported cookie/path/expiry and history/state preservation, blocked-source effects and no game-state restore; same-context versus pure-context compatibility; full type/boundary/unit/package/build/browser checks and representative320px/native UI checks. Strict archive content/CRC/manifest/credential exclusion, checksum and byte reproducibility. Independent whole-milestone code review, repairs, demonstrated extracted installation, report/HANDOFF in its final implementation task. |
| 6.3 — Phase review | After both delivery milestones and their task issues close, assess U-01–U-08 and preserved gameplay/configuration guarantees. | Exactly one dedicated phase code-review/testing/report task; independent inspection separate from execution. Current main-document incorporation and QC, unique task transfer, eligible005 archive, actual task-closing-diff audit, phase/final reports and TODO aggregation. Fix required findings before closure. |

Two delivery milestones plus the excluded one-task phase review fit the narrow coherent outcome. The first delivers useful end-to-end restoration/edit behavior; the second proves lifetime, failure and portable distribution. Separating every setting, browser source or cookie write into milestones would fragment one precedence contract. A third packaging-only milestone adds no independent capability. This explicit 1–2 count assessment retains two; no unrelated feature or padding is added.

At6.1, demonstrate conflicting URL/cookie values, omitted settings retaining saved selections, an edit returning to default and reload into Ready with the correct settings. At6.2, demonstrate the extracted app under a non-root hosting prefix and a new page restoring cookies while game progress remains fresh. These checkpoints let the human assess the behavior and request an explicit amendment if needed; they add no routine permission pause to an authorized implementation range.

## Dependencies and contract coverage

| Contracts | Delivery route | Integration/regression evidence |
| --- | --- | --- |
| U-01–U-02 |6.1 canonical validation/codec and load resolution | All fields/defaults, strict booleans, duplicates/invalid inputs, mixed sources and explicit-default/omitted write distinctions. |
| U-03–U-04 |6.1 independent effects;6.2 actual browser/path failures | Cookie scope/attributes and history preservation, atomic patches/no-op behavior, independent throwing/denied sources and writes. |
| U-05–U-06 |6.1 page composition;6.2 lifetime | One selected authority, unchanged structural controller, Start/Restart capture/live displays, remount/reopen/page isolation and no restored game state. |
| U-07 |6.1 relevant regression;6.2 full docs/regression;6.3 incorporation | Pure boundaries, native input, current and pending rules, ordinary/penetrator acceptance, current canonical documents and frozen history. |
| U-08 |6.2 distribution;6.3 final review/integration; postintegration release | All three shipped targets, reproducible strict relative archive, provider source/body/assets/download checks and actual release-source CI. |

Canonical validation and pure format resolution precede effect composition; the persisted controller precedes browser entry wiring; lifecycle/distribution extends the same integrated app. Do not change the shared view API or add state subscriptions merely to observe settings. Keep initial explicit URL-to-cookie saves separate from edit-driven changed-key effects, preventing fallback defaults from overwriting saved cookies.

## Verification and principal risks

Use table-driven exact domain/source cases, injected callbacks with the real configuration controller for failure/atomicity, and normal native controls/reload/new pages for shipped-browser acceptance. Add persistence tests to all source/built/extracted targets; source-only lifecycle fixtures supplement context boundaries but cannot replace shipped acceptance. Keep current managed Chromium/Firefox and process-local diagnosed recovery policy. Measure suite durations and adjust only finite documented budgets as needed; never skip a required browser/target to fit a budget.

Review focus: explicit default/false values accidentally treated as absence; invalid first duplicates silently replaced by later values; cookie denial preventing URL updates or play; cookie/default fallback polluting URLs; persisted pending rules changing active gameplay; same-context remount rerunning restoration; unrelated URL/history.state loss; prefix cookie leakage. Each risk belongs to direct acceptance at its owning component and then representative assembled coverage. Actual HTTPS flags may be checked through injected serialization when no HTTPS server is available; distinguish that from observed native HTTPS cookie acceptance. Native headed OS focus remains an explicit existing limit, not a new blocking task.

## Integration and release

Use persistent `feature/005_5153bbf-url-get-cookie-persistence` created from its recorded published preparation-containing main parent. Preparation whole-package QC, explicit two-parent preparation merge/default publication and phase projection must precede product task execution. Partial task ranges push and pause on the feature branch. Close only verified/published task issues and milestone objects; phase review waits for both delivery milestone closures.

At the final phase boundary, incorporate delivered scope into current PROJECT/design/SPEC and its focused configuration child/PLAN/layout, reassess affected adjacent current QC, transfer new executable tasks exactly once into main TASKS, and archive eligible active005 feature/preparation/adjacent-QC sources under the reserved feature prefix. Preserve prior closed packages and original completed task evidence. Milestone reports stay at `docs/dev/features/005_5153bbf-url-get-cookie-persistence/reports/phases/6/6.1.md` and `6.2.md`; phase evidence at its `PHASE-REPORT.md`, final outcome at the feature-root `IMPLEMENTATION-REPORT.md`.

Integrate only the complete verified phase by explicit two-parent merge into its recorded main parent. Run merged-state checks and source/artifact identity comparisons, publish/read back main, then create the eligible default-branch v1.5.0 release commit/annotated tag with exact finalized notes. Publish stable ZIP/checksum assets and verify body/source/latest/inventory, actual public download bytes and release-source CI. Record actual release outcomes in an owning task's parent-only evidence followup without moving the release tag. Document preparation performs none of those implementation/release operations.

## Phase 7 — Session leaderboard

Outcome: a playable browser game shows its page-session top-ten final scores, retains them through new games and clears them on a fresh page. Version1.6.0 is a backward-compatible browser capability increment; version metadata changes with the verified distribution, not during preparation.

### Milestone 7.1 — Completed scores and visible leaderboard

Integrate pure ranking, atomic controller history, additive detached snapshots and the actual panel/host lifetime boundary. L01–L07 apply at reusable/component and real page-entry seams. Preserve existing three-argument mount calls, teardown and native-control focus/input behavior. The final delivery unit includes whole-milestone code review, focused regression, blocker repair, milestone report and HANDOFF; no standalone review-only task is needed for this small milestone.

Exit: controlled session traces prove final score and one result for both Game Over paths, rejected/failed transactions preserve history, all ranking/capacity/detachment fixtures pass, and actual managed source browsers show completion/new-game retention plus empty-state reset. Demonstrate empty/one/ten readable rows at320/1000px with stable focus and retained settings timing. The demonstration can inform whether to continue, amend presentation or simplify; it creates no extra human approval during an authorized implementation range. Source-only view/remount fixtures cannot substitute for page-entry completion coverage.

### Milestone 7.2 — Session lifetime and verified distribution

Depends on completion and hosted closure of7.1. Exercise real reload/new-page independence, retained explicit-controller remount and failure/regression coverage. Align player/developer guides, version metadata, package and release inputs with actual behavior. Produce the reproducible static1.6.0 archive and stable public ZIP/checksum aliases under existing package policy. L01–L08 are verified against both managed browsers and actual source/built/extracted targets; preserve settings cookie/URL behavior and ordinary/penetrator gameplay.

Exit: clean dependency install, type/boundary/unit/package/environment checks, all three target browser suites, inspected narrow/wide screenshots, strict manifest/member/relative-path/exclusion/checksum checks and repeated build/package byte identity pass. Use measured finite test budgets and dedicated browser resources. The final delivery unit owns whole-milestone review/testing/blocker repair/report and HANDOFF. This boundary demonstrates the actual deployable game and informs continue/amend/release readiness. No unavailable native-only check blocks browser artifact production; limits are reported explicitly.

### Milestone 7.3 — Phase review

Depends on completion/closure of7.1 and7.2. Exactly one review/testing/report unit performs whole-phase code/document/coverage review, fixes blockers in scope, runs applicable fresh final regressions, and records phase/final outcome and TODO aggregation. Reconcile affected canonical main product/design/contracts/PLAN/layout/TASKS and current adjacent QC; main TASKS becomes the sole executable owner when eligible006 sources/preparation/QC are archived. Preserve earlier frozen archives and original T001–046/Phase1–6 ranges. Keep phase evidence under the fixed006 package.

Exit: all phase contracts and prior regressions supported by actual evidence, all reviews Ready and required issues/milestones closed/read back. Integrate the completed feature using the explicit two-parent merge into its recorded creation parent/main, verify the merged game/package and publish/read back. Create the eligible default-branch1.6.0 release commit and annotated tag, publish the ZIP/checksum, verify exact note/commit/tag/provider body agreement, actual public-download bytes/latest selection and both actual release-source CI runs. Record actual provider outcomes in the owning parent-only report followup without moving the release tag.

## Leaderboard risk and verification routing

| Risk / contract group | Delivery and evidence |
| --- | --- |
| L01/L04 missed Hold top-out, duplicate submission or premature score |7.1 transaction tests and real completion;7.2 lifecycle/regression;7.3 whole-phase review. |
| L02/L03 incorrect tie/capacity or mutable snapshots |7.1 literal ranking and controller fixtures;7.2 overflow and deployed projection. |
| L05 reset/remount/reload confusion |7.1 host/controller seam;7.2 actual page isolation and settings-retained/leaderboard-empty reload. |
| L06 obscured panel/focus loss |7.1 semantic view/page assertions and width inspection;7.2 deployed layout checks. |
| L07 accidental RNG/clock/setting side effects |7.1 deterministic regression and source guards;7.2 complete existing suites. |
| L08 source-only success or leaked fixtures |7.2 actual built/extracted acceptance and strict archive;7.3 merged/public release verification. |

Two delivery milestones are intentionally retained: first the integrated playable capability, then lifecycle/deployable acceptance. Splitting pure helpers or administrative review into more milestones would delay an end-to-end useful result without reducing risk. The third milestone is the required excluded phase review unit. There are no unresolved product decisions or later capability phases hidden in this plan. [Main layout](layout.md) remains authoritative for repository placement; the leaderboard allocation is assessed before task derivation.

## Phase 8 — Manual file persistence

Deliver [File F-01–F-12](spec/file-persistence.md) after the Phase7 leaderboard. Metadata and one normalized contract precede checked restore; integrated JSON precedes the lazy SQLite runtime and distribution. Both formats form one capability and one v1.7.0 release after phase review/integration. No intermediate codec-only release, automatic history storage, unfinished-game serialization or additional host is included.

| Milestone | Outcome and dependencies | Exit evidence |
| --- | --- | --- |
| 8.1 — JSON snapshots and checked restore | Complete stable metadata and schema/semantic JSON validation, staged settings/history/effects and one native disclosure/Save/Restore flow. | Genuine completion metadata, invalid-file zero mutation, checked effect rollback, pending/live timing and accessible native JSON roundtrip. Independent code/coverage review, tests, report and HANDOFF. |
| 8.2 — Equivalent SQLite and deployable distribution | Depends on8.1. Exact metadata/tables/storage/row order, lazy local worker/WASM, both format choices, lifecycle/resource/failure coverage and complete static distribution. | Cross-format native interoperability and independent schema/sqlite3 checks; full source/built/extracted managed-browser acceptance, inspected narrow/wide layouts, strict archive/manifest/exclusion checks, required guides/licenses/schema, repeated bytes and stable alias/checksum equality. Independent whole-milestone review/report/HANDOFF. |
| 8.3 — Phase review | Depends on8.1/8.2. Review cross-milestone implementation, current contracts and unique task ownership; integrate the complete feature. | Fresh final scoped checks with retained-input equivalence, current-document QC, archived accepted sources, no unresolved blocker/TODO, tracking closure and explicit verified integration. Eligible default-branch1.7.0 release source/tag/notes/assets/public downloads/latest and both actual source CI runs verified. |

Two delivery milestones expose a usable JSON capability before SQL/platform risk, followed by exactly one excluded phase-review unit. Seven delivery tasks and two dedicated review/report tasks implement the bounded phase; T-060 owns the folded8.2 review. [layout](layout.md) owns physical paths.

| Risk / contract group | Required evidence |
| --- | --- |
| File F01/F02/F11 | Stable complete metadata, detached values, safe integer/date/identity domains, true top-out rollback and stable ties. |
| File F03/F04 | Published generated-schema freshness, strict JSON and exact SQLite structure/version/storage plus independent inspection/equivalence. |
| File F05–F08/F10 | Native single-pair transfers, checked complete replacement/all-six persistence, retained active gameplay, session lifetime and accessible narrow controls/errors. |
| File F09/F12 | Bounded transient resources, lazy-runtime failure isolation and actual relative packaged assets, reproducibility/manifest/notices/checksum and release-source identity. |

## Phase 9 — Centered UI layout

Outcome: a centered playable Board with adjacent Game info, three independently controlled supporting panels, accessible lifecycle controls, responsive stacking and preserved file/settings/gameplay behavior. Wide layout uses the specified1440px boundary; narrow layouts remain readable and scroll vertically. All ten UL contracts belong to this phase; no independent gameplay capability is bundled or deferred.

### Milestone 9.1 — Playable centered panels

Deliver the five-panel view, absolute Board centering, responsive arrangement and three independent accessible toggles. Integrate the two lifecycle buttons with existing actions, preserve native-control input/focus and keep Settings/file resources bound to the existing controllers. Reach an early working browser game with all eight visibility combinations rather than creating detached layout infrastructure.

Exit: managed source Chromium/Firefox demonstrate wide order, midpoint invariance, narrow no-overflow, true toggle keyboard behavior and the four-state lifecycle table. Existing settings/file controls, real game completion and active gameplay remain functional. Review the complete milestone code and focused regressions, repair/recheck blockers and record milestone report/HANDOFF. A demonstration of wide/asymmetric/narrow states informs whether the human wishes to continue, amend presentation or simplify; it adds no automatic extra approval inside an authorized task range.

### Milestone 9.2 — Lifecycle compatibility and deployable distribution

Depends on completion and hosted closure of9.1. Complete native Save/Restore and hidden-panel lifetime coverage, including busy/errors, remount/disposal, retained data, no visibility persistence and unchanged input/focus rules. Align player/developer guidance and distribution metadata. Produce and verify the reproducible v1.8.0 browser archive with existing stable asset names, schema/WASM/worker inclusion and strict exclusions.

Exit: fresh applicable type/boundary/schema/unit/package/environment checks and complete source/built/actual ZIP-extracted managed Chromium/Firefox suites pass. Inspect320px and1440px screenshots including long error text/ten large scores; assert midpoint/no-overlap geometry separately. Verify repeated build/package byte identity, stable/versioned alias/checksum identity and correct relative-prefix operation. Review the complete milestone implementation/docs/package, repair/recheck blockers and record milestone report/HANDOFF. Demonstrate the actual extracted game, not only source fixtures, for deployable acceptance and release readiness.

### Milestone 9.3 — Phase review

Depends on completion/closure of9.1 and9.2. Exactly one phase review/testing/report unit assesses all phase contracts, preserved regressions and task persistence. Incorporate the accepted delivered scope into affected current PROJECT/design/SPEC and a focused UI layout child, PLAN/layout/TASKS/navigation and adjacent current QC. Transfer new tasks exactly once to main TASKS and archive eligible campaign008 sources/preparation/scoped QC. Preserve original tasks1–61, closed001–007 records and prior tags/releases. Aggregate TODOs in the final outcome.

Exit: current implementation/doc/coverage reviews Ready; all required task/milestone publication and closures verified; exact package/source evidence retained. Integrate the complete feature into its recorded main parent with an explicit two-parent merge, verify merged state and publish/read back. Under authorized implementation/release scope, create eligible default-branch v1.8.0 source/tag/complete notes, publish stable ZIP/checksum, verify exact source/body/assets/latest and anonymous public download bytes, and inspect both release-source main/tag CI runs. Record actual provider outcomes without moving the release tag.


## UI layout integration and evidence

Two delivery milestones establish the playable view then full lifetime/distribution acceptance; the final dedicated review milestone has exactly one phase review unit. Fold milestone review/testing/repair/report/HANDOFF into the last delivery task when its group has fewer than4 tasks. Preserve earlier completed ranges and closed campaigns. Final phase incorporation transfers the seven UI tasks once to main TASKS, retains eligible008 sources as historical and reconciles current document conformance before complete verified integration and1.8.0 release. Static browser artifacts keep their stable ZIP/checksum names; native headed/HTTPS limits remain separately explicit.
