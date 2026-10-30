# Leaderboard delivery plan

## Objective and boundaries

Deliver the complete [accepted leaderboard](FEATURE.md), [L-01–L-08](FEATURE-SPEC.md) and [component delta](FEATURE_DECOMPOSITION.md) as one bounded Phase7 increment on the working v1.5.0 browser game. Earlier phases/task ranges remain unchanged. Session history is useful only when completion capture, ranking and a visible panel work together; persistence, identities and online competition are excluded. No separate infrastructure phase or native-platform expansion is needed.

## Phase 7 — Session leaderboard

Outcome: a playable browser game shows its page-session top-ten final scores, retains them through new games and clears them on a fresh page. Planned version1.6.0 is a backward-compatible browser capability increment; version metadata changes with the verified distribution, not during preparation.

### Milestone 7.1 — Completed scores and visible leaderboard

Integrate pure ranking, atomic controller history, additive detached snapshots and the actual panel/host lifetime boundary. L01–L07 apply at reusable/component and real page-entry seams. Preserve existing three-argument mount calls, teardown and native-control focus/input behavior. The final delivery unit includes whole-milestone code review, focused regression, blocker repair, milestone report and HANDOFF; no standalone review-only task is needed for this small milestone.

Exit: controlled session traces prove final score and one result for both Game Over paths, rejected/failed transactions preserve history, all ranking/capacity/detachment fixtures pass, and actual managed source browsers show completion/new-game retention plus empty-state reset. Demonstrate empty/one/ten readable rows at320/1000px with stable focus and retained settings timing. The demonstration can inform whether to continue, amend presentation or simplify; it creates no extra human approval during an authorized implementation range. Source-only view/remount fixtures cannot substitute for page-entry completion coverage.

### Milestone 7.2 — Session lifetime and verified distribution

Depends on completion and hosted closure of7.1. Exercise real reload/new-page independence, retained explicit-controller remount and failure/regression coverage. Align player/developer guides, version metadata, package and release inputs with actual behavior. Produce the reproducible static1.6.0 archive and stable public ZIP/checksum aliases under existing package policy. L01–L08 are verified against both managed browsers and actual source/built/extracted targets; preserve settings cookie/URL behavior and ordinary/penetrator gameplay.

Exit: clean dependency install, type/boundary/unit/package/environment checks, all three target browser suites, inspected narrow/wide screenshots, strict manifest/member/relative-path/exclusion/checksum checks and repeated build/package byte identity pass. Use measured finite test budgets and dedicated browser resources. The final delivery unit owns whole-milestone review/testing/blocker repair/report and HANDOFF. This boundary demonstrates the actual deployable game and informs continue/amend/release readiness. No unavailable native-only check blocks browser artifact production; limits are reported explicitly.

### Milestone 7.3 — Phase review

Depends on completion/closure of7.1 and7.2. Exactly one review/testing/report unit performs whole-phase code/document/coverage review, fixes blockers in scope, runs applicable fresh final regressions, and records phase/final outcome and TODO aggregation. Reconcile affected canonical main product/design/contracts/PLAN/layout/TASKS and current adjacent QC; main TASKS becomes the sole executable owner when eligible006 sources/preparation/QC are archived. Preserve earlier frozen archives and original T001–046/Phase1–6 ranges. Keep phase evidence under the fixed006 package.

Exit: all phase contracts and prior regressions supported by actual evidence, all reviews Ready and required issues/milestones closed/read back. Integrate the completed feature using the explicit two-parent merge into its recorded creation parent/main, verify the merged game/package and publish/read back. Create the eligible default-branch1.6.0 release commit and annotated tag, publish the ZIP/checksum, verify exact note/commit/tag/provider body agreement, actual public-download bytes/latest selection and both actual release-source CI runs. Record actual provider outcomes in the owning parent-only report followup without moving the release tag. No implementation or publication success is implied by this plan.

## Risk and verification routing

| Risk / contract group | Delivery and evidence |
| --- | --- |
| L01/L04 missed Hold top-out, duplicate submission or premature score |7.1 transaction tests and real completion;7.2 lifecycle/regression;7.3 whole-phase review. |
| L02/L03 incorrect tie/capacity or mutable snapshots |7.1 literal ranking and controller fixtures;7.2 overflow and deployed projection. |
| L05 reset/remount/reload confusion |7.1 host/controller seam;7.2 actual page isolation and settings-retained/leaderboard-empty reload. |
| L06 obscured panel/focus loss |7.1 semantic view/page assertions and width inspection;7.2 deployed layout checks. |
| L07 accidental RNG/clock/setting side effects |7.1 deterministic regression and source guards;7.2 complete existing suites. |
| L08 source-only success or leaked fixtures |7.2 actual built/extracted acceptance and strict archive;7.3 merged/public release verification. |

Two delivery milestones are intentionally retained: first the integrated playable capability, then lifecycle/deployable acceptance. Splitting pure helpers or administrative review into more milestones would delay an end-to-end useful result without reducing risk. The third milestone is the required excluded phase review unit. There are no unresolved product decisions or later capability phases hidden in this plan. [Main layout](layout.md) remains authoritative for repository placement; the leaderboard allocation is assessed before task derivation.
