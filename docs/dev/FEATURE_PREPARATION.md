# Session-only game configuration — preparation record

## Identity and request

Campaign003_3977abb; full baseline3977abbcb640490c2cf60f3365681f29067b3835, published main after v1.2.0 release evidence. Preparation branch design-docs/003_3977abb-session-only-game-configuration; creation parent/default preparation target main. Intended implementation branch feature/003_3977abb-session-only-game-configuration only after accepted preparation is integrated/verified/published. Reserved report/archive prefix docs/dev/features/003_3977abb-session-only-game-configuration. No implementation branch exists yet.

Original user request: Open a feature campaign for session-only game configuration with a settings panel controlling (1) ghost always hide/dynamically hide above midline/always show; (2) hard drop on/off; (3) next preview on/off; (4) hard-drop locking follow general/immediate; (5) general locking failed downward attempt/full gravity interval after grounding; (6) hold on/off. Use sensible defaults; keep values in the current page session with no persistence across reloads.

Accepted main baseline: PROJECT, ARCHITECTURE, DECOMPOSITION, SPEC with spec/modern-rules.md and spec/ghost-visibility.md, PLAN/layout/completed TASKS and v1.2.0 implementation. Inspect current SessionOptions/dispatch/advance and shared view/browser composition: immediateHardDropLock is currently a start/restart-only model option, ghost visibility a two-mode live view preference, and hard drop/hold/next are always enabled. No new requested toggle is claimed already implemented. Prior closed campaigns/releases are frozen history, not current-validation targets.

## Current control

Continue the user's project preference autodoc/onepass for this feature only. User accepted the published FEATURE and timing/locking proposals with “y”; the first brief checkpoint is complete. Subsequent necessary design-through-TASKS checkpoints are preapproved after brief acceptance, subject to technical QC. The active autodoc stop is FDOCS-008 before whole-package QC/integration/implementation unless explicitly selected later. No new product tasks are activated by opening the campaign. Preserve prior completed phase/task ranges; no future passes inferred.

Default reporting Standard (concise consequential decisions/results); Minimal/Explicit available. Tracking enabled by AGENTS policy. Native campaign milestone and all nine complete stage issue identities/briefs/markers/associations verified before repository writes. Reuse existing protected authentication/ignore rules and manual provenance scaffold without replaying setup or recording a transcript.

## Decisions and cross-scope applicability

| Topic | Source/status and rationale |
| --- | --- |
| Six controls and no reload persistence | User supplied. Current settings remain in page-session memory; no storage/cookie/URL/backend persistence. |
| Sensible defaults | Agent selection under explicit user delegation: ghost Always show, hard drop/next preview/hold On, hard drop Follow general, general Full gravity interval. Preserve v1.2.0 default gameplay. Accepted with the brief. |
| When changes apply | Accepted with the brief: ghost/preview display immediately; hard drop/hold/general lock/hard-drop lock copied only on Start/Restart. Avoid ambiguous mid-piece timer, held-piece and enablement transitions. Keep pending versus active rules clear. |
| Failed-attempt hard drop | Accepted with the brief: Follow general places at canonical landing and waits for next failed gravity/soft-drop attempt; the drop itself is placement, not a synthetic failed step. Immediate always locks, including zero distance. |
| Disabled capabilities/dependencies | Accepted with the brief: disabled hard-drop/hold commands are no-ops with disabled buttons; preview Off conceals type/miniature but retains canonical bag/look-ahead. Hard-drop policy disabled/ignored when hard drop Off, retaining selected policy for reenablement; ghost independent of hard drop. |
| UI interaction | Accepted with the brief: one nonmodal native-control panel replaces existing separate settings; interaction within it does not itself restart/pause/resume. Preserve manual pause and external-focus auto-pause. |
| Page-session lifetime | Accepted page-session interpretation: retain selections across ordinary panel interaction, Start/Restart, pause/resume and game over in the current loaded page; fresh reload gets defaults. Separate pages/tabs independent. No Reset/presets/import/export feature added. |
| Existing ghost threshold | Retain accepted occupied-bottom-cell rule: rows1–10 upper/hidden,11–20 lower/shown, straddling visible. Extend with Always hide, preserve canonical projection regardless of display. |
| Version | Accepted with the brief: additive browser1.3.0 after full verified phase integration; preserve prior tags/assets and unaffected API guarantees. |

Cross-scope decisions: none outside this one pass. User accepted scope/timing/failed-drop/dependency choices with “y”; preserve their provenance separately from delegated defaults.

## Stage evidence

| Stage | Source/assessment and state |
| --- | --- |
| FDOCS-001 | Linux/bash usable clean main worktree, full published baseline/default identity, global campaign-sequence collision scan, governing instructions and existing auth/provenance reused. Nine-stage tracking gate passed. Initialization885555c29ff330f9d43095dcbce6c164dbe9902d source/control/checkoff/HANDOFF published/read back; issue54 closed/read back. |
| FDOCS-002 | FEATURE proposal assessed against the current session options/dispatch/advance, shared display preferences and browser host. All six controls, delegated defaults, preserved rules and proposed timing/failed-drop/dependency interactions covered; no material choice is silently adopted. Proposal SHA256 d76f3091f011d2e4fbd0a3bd7eddfb4efb0a6b28e658ffafd7883bc31dffecb5. User “y” accepts the presented brief/proposals; product wording now expresses the accepted timing and locking rule. Exact accepted source below. |
| FDOCS-003–009 | Pending ordered downstream assessments under retained autodoc preapproval. |

## Hosted preparation mapping

Native milestone #14 (sdd-docs-003_3977abb), open/read back.

| Stage | Verified issue |
| --- | --- |
| FDOCS-001 | [#54](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/54) |
| FDOCS-002 | [#55](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/55) |
| FDOCS-003 | [#56](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/56) |
| FDOCS-004 | [#57](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/57) |
| FDOCS-005 | [#58](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/58) |
| FDOCS-006 | [#59](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/59) |
| FDOCS-007 | [#60](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/60) |
| FDOCS-008 | [#61](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/61) |
| FDOCS-009 | [#62](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Featured-V2/issues/62) |

## Pending transitions

No reset. Persist/publish/read back FDOCS-002 acceptance and close55, then continue FDOCS-003–008 with required scoped QC; stop before FDOCS-009. No application code/tests/version, canonical product root or release change at this opening checkpoint.

## FDOCS-002 completion

User y accepted the exact published six-control brief/defaults and proposed immediate display versus next-game rules, failed-attempt follow-general hard-drop behavior, disabled-feature dependencies and page-session-only lifetime. Target1.3.0. Downstream necessary design-through-task checkpoints retain autodoc preapproval, with stop before FDOCS-009/package QC/implementation.

Source identities (SHA-256):
- docs/dev/FEATURE.md: b9937e48c83785814defb76a14684a7dc4270b971d09d13c830409c0f6345d14

Publish/read back this coherent completion before closing/readback of issue #55 or dependent work.

## FDOCS-003 completion

Necessary architecture delta separates DOM-free selected page configuration from copied active session rules and controlled shared presentation. No storage/global singleton or duplicated gameplay; explicit retained context supports remount while fresh page defaults. Preserve legacy model entry points and host resource ownership. Reviewed dependency/state/lifetime boundaries under approved autodoc scope.

Source identities (SHA-256):
- docs/dev/FEATURE_ARCHITECTURE.md: 45fd94b02dc441cd3a69a46f329f625dfc43501d07641ed4a3401c66c780a5c0

Publish/read back this coherent completion before closing/readback of issue #56 or dependent work.

## FDOCS-004 completion

C-07 owns detached validated selected values/rule projection; C-04 copies/enforces active rules with legacy compatibility; C-05 uses explicit context/refresh and active versus pending presentation; C-06 retains page context and platform resources. Reviewed state/error/lifecycle and verification seams; no DOM/application dependency inversion or persisted setting. Autodoc preapproval covers necessary decomposition.

Source identities (SHA-256):
- docs/dev/FEATURE_DECOMPOSITION.md: 1620f8d75dcd50ef1b52ccbab591fb39c79bf4f46809dddaa70a225ca2b63dcb

Publish/read back this coherent completion before closing/readback of issue #57 or dependent work.

## FDOCS-005 completion

S-01–S-08 define all6 selected values/defaults, exact update and legacy/complete-rule contracts, frozen active rules, both general/hard-drop policy semantics, disabled action invariants, concealed displays, native pending state and page/no-storage lifetime. Scoped SPEC/design QC Ready with current identities and96/16/6 coverage rationale; no unresolved choice. No implementation or tests claimed.

Source identities (SHA-256):
- docs/dev/FEATURE-SPEC.md: a17b63731e323c9f0e9b16d848bcb394200f94e010736d0ef8f100c6ba2a6326
- docs/dev/FEATURE-SPEC-REVIEW-REPORT.md: 48b36d3ae038ced6b0b2164abe0a7343866f69c8fa89f6d8fd90efb67262991c

Publish/read back this coherent completion before closing/readback of issue #58 or dependent work.
