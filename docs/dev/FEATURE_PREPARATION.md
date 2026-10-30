# Session-only game configuration — preparation record

## Identity and request

Campaign003_3977abb; full baseline3977abbcb640490c2cf60f3365681f29067b3835, published main after v1.2.0 release evidence. Preparation branch design-docs/003_3977abb-session-only-game-configuration; creation parent/default preparation target main. Intended implementation branch feature/003_3977abb-session-only-game-configuration only after accepted preparation is integrated/verified/published. Reserved report/archive prefix docs/dev/features/003_3977abb-session-only-game-configuration. No implementation branch exists yet.

Original user request: Open a feature campaign for session-only game configuration with a settings panel controlling (1) ghost always hide/dynamically hide above midline/always show; (2) hard drop on/off; (3) next preview on/off; (4) hard-drop locking follow general/immediate; (5) general locking failed downward attempt/full gravity interval after grounding; (6) hold on/off. Use sensible defaults; keep values in the current page session with no persistence across reloads.

Accepted main baseline: PROJECT, ARCHITECTURE, DECOMPOSITION, SPEC with spec/modern-rules.md and spec/ghost-visibility.md, PLAN/layout/completed TASKS and v1.2.0 implementation. Inspect current SessionOptions/dispatch/advance and shared view/browser composition: immediateHardDropLock is currently a start/restart-only model option, ghost visibility a two-mode live view preference, and hard drop/hold/next are always enabled. No new requested toggle is claimed already implemented. Prior closed campaigns/releases are frozen history, not current-validation targets.

## Current control

Continue the user's project preference autodoc/onepass for this feature only. First FEATURE approval remains active. Subsequent necessary design-through-TASKS checkpoints are preapproved after brief acceptance, subject to technical QC. Current stop is first FEATURE review/acceptance; then the ordinary autodoc stop is FDOCS-008 before whole-package QC/integration/implementation unless explicitly selected later. No new product tasks are activated by opening the campaign. Preserve prior completed phase/task ranges; no future passes inferred.

Default reporting Standard (concise consequential decisions/results); Minimal/Explicit available. Tracking enabled by AGENTS policy. Native campaign milestone and all nine complete stage issue identities/briefs/markers/associations verified before repository writes. Reuse existing protected authentication/ignore rules and manual provenance scaffold without replaying setup or recording a transcript.

## Decisions and cross-scope applicability

| Topic | Source/status and rationale |
| --- | --- |
| Six controls and no reload persistence | User supplied. Current settings remain in page-session memory; no storage/cookie/URL/backend persistence. |
| Sensible defaults | Agent selection under explicit user delegation: ghost Always show, hard drop/next preview/hold On, hard drop Follow general, general Full gravity interval. Preserve v1.2.0 default gameplay. First brief acceptance still required. |
| When changes apply | Agent proposal pending brief acceptance: ghost/preview display immediately; hard drop/hold/general lock/hard-drop lock copied only on Start/Restart. Avoid ambiguous mid-piece timer, held-piece and enablement transitions. Keep pending versus active rules clear. |
| Failed-attempt hard drop | Agent proposal pending acceptance: Follow general places at canonical landing and waits for next failed gravity/soft-drop attempt; the drop itself is placement, not a synthetic failed step. Immediate always locks, including zero distance. |
| Disabled capabilities/dependencies | Agent proposal pending acceptance: disabled hard-drop/hold commands are no-ops with disabled buttons; preview Off conceals type/miniature but retains canonical bag/look-ahead. Hard-drop policy disabled/ignored when hard drop Off, retaining selected policy for reenablement; ghost independent of hard drop. |
| UI interaction | Agent proposal pending acceptance: one nonmodal native-control panel replaces existing separate settings; interaction within it does not itself restart/pause/resume. Preserve manual pause and external-focus auto-pause. |
| Page-session lifetime | User-supplied no-reload-persistence refined by agent proposal: retain selections across ordinary panel interaction, Start/Restart, pause/resume and game over in the current loaded page; fresh reload gets defaults. Separate pages/tabs independent. No Reset/presets/import/export feature added. |
| Existing ghost threshold | Retain accepted occupied-bottom-cell rule: rows1–10 upper/hidden,11–20 lower/shown, straddling visible. Extend with Always hide, preserve canonical projection regardless of display. |
| Version | Agent recommendation pending brief acceptance: additive browser1.3.0 after full verified phase integration; preserve prior tags/assets and unaffected API guarantees. |

Cross-scope decisions: none outside this one pass. Scope/timing/failed-drop proposals remain distinguishable from supplied requirements and delegated defaults; acceptance or explicit correction precedes dependent specification.

## Stage evidence

| Stage | Source/assessment and state |
| --- | --- |
| FDOCS-001 | Linux/bash usable clean main worktree, full published baseline/default identity, global campaign-sequence collision scan, governing instructions and existing auth/provenance reused. Nine-stage tracking gate passed. Initialization885555c29ff330f9d43095dcbce6c164dbe9902d source/control/checkoff/HANDOFF published/read back; issue54 closed/read back. |
| FDOCS-002 | FEATURE proposal assessed against the current session options/dispatch/advance, shared display preferences and browser host. All six controls, delegated defaults, preserved rules and proposed timing/failed-drop/dependency interactions covered; no material choice is silently adopted. Proposal SHA256 d76f3091f011d2e4fbd0a3bd7eddfb4efb0a6b28e658ffafd7883bc31dffecb5. First approval pending; FDOCS-002 remains unchecked. |
| FDOCS-003–009 | Pending ordered stage assessments after accepted brief. |

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

No reset. Publish/read back this FEATURE proposal with exact source identity and stop for first brief acceptance. Gameplay timing/failed-attempt hard-drop proposals remain pending acceptance or correction; no dependent specification or implementation yet. No application code/tests/version, canonical product root or release change at this opening checkpoint.
