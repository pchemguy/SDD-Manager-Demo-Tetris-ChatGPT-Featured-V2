# UI layout delivery plan

## Delivery objective

Deliver [UL-01–UL-10](FEATURE-SPEC.md) as one bounded browser capability increment on the completed Phase8/v1.7.0 baseline. Preserve existing completed phases/tasks and static delivery. Phase9 changes presentation and view-local visibility, not rules, persistence formats or platform scope. Its complete integrated distribution is planned as v1.8.0; preparation does not change package version or establish a release.

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

## Dependencies, integration and release

Keep the feature campaign identity `008_b7c9813` and preparation branch `design-docs/008_b7c9813-ui-layout`. Whole-package preparation QC, verified explicit preparation merge/default publication, authorized implementation range and eligible phase projection precede creation/use of `feature/008_b7c9813-ui-layout`. The actual creation parent/integration target is refreshed `main` containing the accepted preparation. This plan performs none of those operations.

Partial implementation ranges publish and pause without integrating incomplete phase work. Each delivery milestone has code review/testing/repair/report/HANDOFF assigned to its final delivery task when there are fewer than four delivery tasks; a standalone review task applies only at the established lifecycle threshold. The final phase review milestone remains exactly one review task after both delivery milestone closures.

Versioned local artifacts and stable browser ZIP/checksum aliases retain existing policy. Finalize complete release notes/highlights through the actual default-branch release source, preserve raw commit/tag/provider body identity, and verify downloaded assets rather than treating upload metadata as byte acceptance. Native headed-window/actual HTTPS checks remain separately reported when unavailable; they do not become native-only blocker tasks. No Electron/extension artifact or UI framework is introduced.

## Contract and risk routing

| Contract/risk | Delivery route |
| --- | --- |
| UL01/02 wrong group-centered Board, overlap or breakpoint reset |9.1 real absolute bounding boxes/all8 combinations and responsive resize;9.2 complete deployed matrix/screenshots;9.3 final review. |
| UL03/04 duplicate controls, ambiguous pause/start or shortcut double-dispatch |9.1 semantic buttons/four states/native keys and focus;9.2 retained regression suites. |
| UL05/07/08 lost view state, focus pause or leaked listeners |9.1 ordinary-render/toggle behavior;9.2 real lifecycle/remount/disposal/two-view isolation and source-only seam supplements. |
| UL06 hidden transfer loss, stale errors or serialization drift |9.1 retained bindings;9.2 native both-format files/busy/error/hidden completion and six-field contract assertions. |
| UL09/10 source-only success, stale docs or missing archive assets |9.2 full source/built/extracted acceptance, strict/reproducible package and complete guides;9.3 current-doc incorporation, merged and published-release evidence. |

Two delivery milestones are intentional: a cohesive playable view first, followed by compatibility/lifetime and actual deployable acceptance. More milestones would fragment tightly related view behavior or split verification from the useful capability without reducing uncertainty. The one dedicated phase review milestone is excluded from this delivery count. Both milestones are narrow enough for task derivation; no unresolved behavioral choice blocks it after physical allocation assessment.

Physical allocation is assessed against the existing [layout](layout.md) before task derivation. Shared UI and browser host remain the owners; a new physical layout document is unnecessary.
